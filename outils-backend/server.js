// =====================================================================
// ECOM AI BUILDER — Free Tools API
// Backend clé en main : téléchargeur vidéos (TikTok/Reels/YouTube) + scraper images.
// Démarrage :  npm install  &&  npm start
// =====================================================================
import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getVideoInfo, streamVideo } from './lib/video.js';
import { scrapeImages, zipImages } from './lib/images.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 8787;

// --- CORS : autorise tes pages de tools à appeler l'API ---
// En prod, remplace "*" par la liste de tes domaines via la variable ALLOWED_ORIGINS
const origins = (process.env.ALLOWED_ORIGINS || '*').split(',').map(s => s.trim());
app.use(cors({ origin: origins.includes('*') ? true : origins }));
app.use(express.json({ limit: '1mb' }));

// --- Mini rate-limit en mémoire (anti-abus simple, sans dépendance) ---
const hits = new Map();
app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.ip;
  const now = Date.now(), win = 60_000, max = 40;
  const arr = (hits.get(ip) || []).filter(t => now - t < win);
  arr.push(now); hits.set(ip, arr);
  if (arr.length > max) return res.status(429).json({ error: 'Trop de requêtes, réessaie dans une minute.' });
  next();
});

// --- Health check ---
app.get('/healthz', (_req, res) => res.json({ ok: true, service: 'ecom-ai-builder-tools-api' }));

// =====================================================================
// 1) TÉLÉCHARGEUR DE VIDÉOS
// =====================================================================
// Renvoie les métadonnées + des liens de téléchargement (qui pointent vers /api/stream)
app.post('/api/download', async (req, res) => {
  try {
    const { url, platform } = req.body || {};
    if (!url || !/^https?:\/\//.test(url)) return res.status(400).json({ error: 'URL invalide.' });
    const info = await getVideoInfo(url);
    const base = `${req.headers['x-forwarded-proto'] || req.protocol}://${req.get('host')}`;
    const link = q => `${base}/api/stream?url=${encodeURIComponent(url)}&q=${q}`;
    res.json({
      title: info.title || 'Vidéo',
      author: info.uploader || info.channel || '',
      thumbnail: info.thumbnail || '',
      formats: [
        { label: 'Vidéo HD' + (platform === 'tiktok' ? ' (sans filigrane)' : ''), quality: 'hd', ext: 'mp4', url: link('hd') },
        { label: 'Vidéo légère', quality: 'sd', ext: 'mp4', url: link('sd') }
      ]
    });
  } catch (e) {
    res.status(502).json({ error: 'Impossible de récupérer cette vidéo. ' + (e.shortMessage || e.message || '') });
  }
});

// Stream le fichier directement au client (force le téléchargement)
app.get('/api/stream', async (req, res) => {
  try {
    const { url, q } = req.query;
    if (!url || !/^https?:\/\//.test(url)) return res.status(400).send('URL invalide.');
    await streamVideo(String(url), String(q || 'hd'), res);
  } catch (e) {
    if (!res.headersSent) res.status(502).send('Erreur de téléchargement : ' + (e.message || ''));
  }
});

// =====================================================================
// 2) SCRAPER D'IMAGES
// =====================================================================
app.post('/api/images', async (req, res) => {
  try {
    const { url } = req.body || {};
    if (!url || !/^https?:\/\//.test(url)) return res.status(400).json({ error: 'URL invalide.' });
    const images = await scrapeImages(url);
    res.json({ images });
  } catch (e) {
    res.status(502).json({ error: 'Impossible d\'analyser cette page. ' + (e.message || '') });
  }
});

// Téléchargement groupé en .zip
app.post('/api/zip', async (req, res) => {
  try {
    const { srcs } = req.body || {};
    if (!Array.isArray(srcs) || !srcs.length) return res.status(400).json({ error: 'Aucune image fournie.' });
    await zipImages(srcs.slice(0, 200), res);
  } catch (e) {
    if (!res.headersSent) res.status(502).json({ error: 'Erreur ZIP : ' + (e.message || '') });
  }
});

// --- Sert les pages des tools (même origine que l'API → zéro problème CORS/cache) ---
app.use(express.static(path.join(__dirname, '..')));

app.listen(PORT, () => {
  console.log(`✅ ECOM AI BUILDER tools → http://localhost:${PORT}/index.html`);
  console.log(`   (API sur la même origine : /api/...)`);
});
