# Backend — Free Tools ECOM AI BUILDER

API qui alimente 2 tools : **téléchargeur de vidéos** (TikTok/Reels/YouTube) et **scraper d'images**.
Tout est prêt. Le dev a juste à **déployer** puis **coller l'URL** dans 2 fichiers HTML.

---

## ✅ Pour le dev : 3 étapes, c'est tout

### 1. Lancer en local (test)
```bash
cd backend
npm install        # télécharge aussi le binaire yt-dlp automatiquement
npm start          # → http://localhost:8787
```
Les 2 pages HTML pointent déjà sur `http://localhost:8787` → elles marchent immédiatement en local.

### 2. Déployer (choisir UNE option)

**Option A — Render (le plus simple, lit `render.yaml` tout seul)**
1. Pousser ce dossier sur un repo Git.
2. Sur https://render.com → **New + → Blueprint** → sélectionner le repo.
3. Render build le `Dockerfile` et met en ligne. Récupérer l'URL publique (ex : `https://xxx.onrender.com`).

**Option B — Railway / Fly.io / VPS Docker**
```bash
docker build -t eab-tools-api ./backend
docker run -p 8787:8787 eab-tools-api
```
(Le `Dockerfile` installe déjà Node + Python + ffmpeg.)

### 3. Brancher le front
Dans **`video-downloader.html`** et **`image-scraper.html`**, remplacer la ligne :
```js
const API_BASE = "http://localhost:8787";
```
par l'URL de prod, ex :
```js
const API_BASE = "https://xxx.onrender.com";
```
Et dans la variable d'env `ALLOWED_ORIGINS`, mettre le(s) domaine(s) des tools (sécurité CORS).

**C'est fini.** 🎉

---

## Endpoints (déjà implémentés)

| Méthode | Route | Body / Query | Réponse |
|---|---|---|---|
| POST | `/api/download` | `{ url, platform }` | `{ title, author, thumbnail, formats:[{label,quality,ext,url}] }` |
| GET  | `/api/stream` | `?url=&q=hd\|sd` | flux vidéo `.mp4` (téléchargement) |
| POST | `/api/images` | `{ url }` | `{ images:[{src,alt,width,height}] }` |
| POST | `/api/zip` | `{ srcs:[...] }` | flux `.zip` des images |
| GET  | `/` | — | health check |

## Sous le capot
- **Vidéos** : [`yt-dlp`](https://github.com/yt-dlp/yt-dlp) (binaire **standalone** auto-téléchargé, Python embarqué). Gère TikTok sans filigrane, Reels, YouTube/Shorts + ~1000 sites. Le flux est *streamé* au client, rien n'est stocké sur le serveur.
  - **Instagram** : les Reels **publics** marchent. Pour les contenus restreints, Instagram exige une session connectée → ajouter des cookies : passer `--cookies /chemin/cookies.txt` (ou `--cookies-from-browser`) dans les args de `lib/ytdlp.js`. TikTok et YouTube ne nécessitent rien.
- **Images** : `fetch` côté serveur + `cheerio`. Récupère `img/srcset/lazy-load/og:image` et upscale les URLs Shopify (retire `_100x`, `_small`…).
- **Anti-abus** : rate-limit mémoire 40 req/min/IP.

## Maintenance
yt-dlp évolue vite (les plateformes changent). Pour mettre à jour le binaire :
```bash
npm update youtube-dl-exec
```
(ou planifier un rebuild régulier de l'image Docker).

## ⚖️ Légal
Usage prévu : **analyse concurrentielle / inspiration**. Ne pas republier de contenu tiers sans droits. Respecter le `robots.txt` et les CGU des plateformes.
