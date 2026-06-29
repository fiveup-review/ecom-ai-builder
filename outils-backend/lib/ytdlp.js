// Wrapper autour du binaire standalone yt-dlp (dans ./bin). Aucune dépendance Python système.
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BIN = process.env.YTDLP_PATH ||
  path.join(__dirname, '..', 'bin', process.platform === 'win32' ? 'yt-dlp.exe' : 'yt-dlp');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
// YouTube bloque les IP datacenter (« confirm you're not a bot »). Les clients
// mobiles/TV de l'API interne YouTube passent souvent SANS cookies. N'affecte que
// l'extracteur youtube ; TikTok/Reels l'ignorent. Si YouTube reste bloqué, seul
// un fichier cookies (--cookies) ou un proxy résidentiel règle définitivement.
const COMMON = [
  '--no-warnings', '--no-playlist', '--no-check-certificates',
  '--user-agent', UA,
  '--extractor-args', 'youtube:player_client=android,tv,ios,web',
];

// Renvoie les métadonnées JSON de la vidéo
export function ytdlpJson(url) {
  return new Promise((resolve, reject) => {
    const p = spawn(BIN, ['--dump-single-json', ...COMMON, url]);
    let out = '', err = '';
    p.stdout.on('data', d => out += d);
    p.stderr.on('data', d => err += d);
    p.on('error', e => reject(new Error(e.code === 'ENOENT' ? 'yt-dlp introuvable (lance: npm run postinstall)' : e.message)));
    p.on('close', code => {
      if (code === 0) { try { resolve(JSON.parse(out)); } catch (e) { reject(e); } }
      else reject(new Error((err.split('\n').filter(Boolean).pop() || 'exit ' + code).slice(0, 300)));
    });
  });
}

// Renvoie un process dont stdout = le flux vidéo (.mp4)
export function ytdlpStream(url, format) {
  return spawn(BIN, ['-o', '-', '-f', format, ...COMMON, url], { stdio: ['ignore', 'pipe', 'pipe'] });
}
