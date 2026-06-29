// Téléchargement vidéo via le binaire standalone yt-dlp (voir ./ytdlp.js).
// Supporte TikTok (sans filigrane), Instagram Reels, YouTube / Shorts + ~1000 sites.
import { ytdlpJson, ytdlpStream } from './ytdlp.js';

// Formats progressifs (mp4 son+image) → pas besoin de ffmpeg pour fusionner
const FORMAT = {
  hd: 'best[ext=mp4][vcodec!=none][acodec!=none]/best[ext=mp4]/best',
  sd: 'worst[ext=mp4][height>=480]/best[ext=mp4]/best'
};

export async function getVideoInfo(url) {
  return ytdlpJson(url);
}

export async function streamVideo(url, quality, res) {
  res.setHeader('Content-Type', 'video/mp4');
  res.setHeader('Content-Disposition', `attachment; filename="video-${Date.now()}.mp4"`);

  const sub = ytdlpStream(url, FORMAT[quality] || FORMAT.hd);
  sub.stdout.pipe(res);
  sub.stderr.on('data', () => {});                 // évite de saturer les logs
  sub.on('error', e => { if (!res.headersSent) res.status(502).end('yt-dlp: ' + e.message); });
  sub.on('close', () => { if (!res.writableEnded) res.end(); });

  res.on('close', () => { try { sub.kill('SIGKILL'); } catch {} });
}
