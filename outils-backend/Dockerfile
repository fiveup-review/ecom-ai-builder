# Image prête à déployer. yt-dlp standalone (Python embarqué) téléchargé au build via postinstall.
FROM node:20-slim

# ffmpeg = fusions vidéo éventuelles ; ca-certificates = HTTPS
RUN apt-get update \
  && apt-get install -y --no-install-recommends ffmpeg ca-certificates \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
COPY scripts ./scripts
RUN npm install --omit=dev    # déclenche le postinstall qui télécharge yt-dlp_linux
COPY . .

ENV PORT=8787
EXPOSE 8787
CMD ["node", "server.js"]
