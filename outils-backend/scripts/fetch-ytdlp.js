// Télécharge le binaire STANDALONE de yt-dlp (Python embarqué → aucune dépendance système).
// Exécuté automatiquement au `npm install` (postinstall).
import { writeFile, chmod, mkdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const binDir = path.join(__dirname, '..', 'bin');

const ASSET = { linux: 'yt-dlp_linux', darwin: 'yt-dlp_macos', win32: 'yt-dlp.exe' };
const asset = ASSET[process.platform] || 'yt-dlp_linux';
const outName = process.platform === 'win32' ? 'yt-dlp.exe' : 'yt-dlp';
const dest = path.join(binDir, outName);
const URL = `https://github.com/yt-dlp/yt-dlp/releases/latest/download/${asset}`;

try {
  await mkdir(binDir, { recursive: true });
  try { if ((await stat(dest)).size > 1_000_000) { console.log('yt-dlp déjà présent, skip.'); process.exit(0); } } catch {}

  console.log(`⬇  Téléchargement de yt-dlp (${asset})…`);
  const r = await fetch(URL, { redirect: 'follow' });
  if (!r.ok) throw new Error('HTTP ' + r.status);
  const buf = Buffer.from(await r.arrayBuffer());
  await writeFile(dest, buf);
  if (process.platform !== 'win32') await chmod(dest, 0o755);
  console.log(`✅ yt-dlp installé (${(buf.length / 1048576).toFixed(1)} Mo) → ${dest}`);
} catch (e) {
  // On ne bloque pas l'install : on prévient juste.
  console.warn('⚠  yt-dlp non téléchargé (' + e.message + '). Le scraper d\'images fonctionnera, mais le téléchargeur vidéo nécessitera yt-dlp. Relance: npm run postinstall');
}
