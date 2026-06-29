// Scraper d'images : récupère le HTML côté serveur (pas de blocage CORS) et extrait
// toutes les images (img, srcset, lazy-load, og:image, CDN Shopify…).
import { load } from 'cheerio';
import archiver from 'archiver';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

export async function scrapeImages(pageUrl) {
  const r = await fetch(pageUrl, { headers: { 'User-Agent': UA, 'Accept': 'text/html,*/*' }, redirect: 'follow' });
  if (!r.ok) throw new Error('Statut ' + r.status);
  const html = await r.text();
  const $ = load(html);
  const set = new Set();

  const add = raw => {
    if (!raw) return;
    let u = raw.trim().split(/\s+/)[0];                 // enlève le descripteur srcset (" 2x")
    if (!u || u.startsWith('data:')) return;
    try {
      const abs = new URL(u, pageUrl).href;
      if (/^https?:\/\//.test(abs)) set.add(abs);
    } catch {}
  };
  const addSrcset = ss => { if (ss) ss.split(',').forEach(part => add(part)); };

  $('img').each((_, el) => {
    const a = $(el);
    add(a.attr('src')); add(a.attr('data-src')); add(a.attr('data-original')); add(a.attr('data-lazy'));
    addSrcset(a.attr('srcset')); addSrcset(a.attr('data-srcset'));
  });
  $('source').each((_, el) => addSrcset($(el).attr('srcset')));
  $('meta[property="og:image"], meta[name="twitter:image"]').each((_, el) => add($(el).attr('content')));
  // Shopify : versions haute résolution (retire les suffixes _100x, _small…)
  const out = [...set].map(src => ({
    src,
    hi: src.replace(/_(\d+x\d*|small|medium|large|grande|compact|pico|icon|thumb)\b/i, ''),
    alt: '', width: 0, height: 0
  }));
  // dédoublonne en privilégiant la version "hi"
  const seen = new Set(), final = [];
  for (const o of out) { const key = o.hi; if (!seen.has(key)) { seen.add(key); final.push({ src: o.hi, alt: o.alt, width: 0, height: 0 }); } }
  return final;
}

export async function zipImages(srcs, res) {
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename="images.zip"');
  const archive = archiver('zip', { zlib: { level: 6 } });
  archive.on('error', () => { try { res.end(); } catch {} });
  archive.pipe(res);

  let i = 0;
  for (const src of srcs) {
    i++;
    try {
      const r = await fetch(src, { headers: { 'User-Agent': UA } });
      if (!r.ok) continue;
      const buf = Buffer.from(await r.arrayBuffer());
      const m = (src.split('?')[0].match(/\.(jpe?g|png|webp|gif|avif|svg)$/i) || [, 'jpg'])[1];
      archive.append(buf, { name: `img-${String(i).padStart(3, '0')}.${m.toLowerCase()}` });
    } catch {}
  }
  await archive.finalize();
}
