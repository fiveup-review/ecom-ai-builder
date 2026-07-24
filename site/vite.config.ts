import fs from "node:fs"
import path from "node:path"
import { defineConfig, type Plugin } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// DEV uniquement : sert les statiques historiques du repo (outils/, assets/,
// icon.png) qui, en prod, sont copiés dans dist par scripts/copy-static.mjs.
// Sans ça, les liens /outils/*.html sont morts sur le dev server.
function repoStatics(): Plugin {
  const repo = path.resolve(__dirname, "..")
  const MIME: Record<string, string> = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".mp4": "video/mp4",
  }
  return {
    name: "repo-statics",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? "").split("?")[0]
        if (!/^\/(outils\/|assets\/|icon\.png$)/.test(url) || url.includes("..")) return next()
        // /outils = page React du dev server, pas l'ancien hub statique.
        if (url === "/outils/" || url === "/outils/index.html") return next()
        const file = path.join(repo, decodeURIComponent(url))
        if (!fs.existsSync(file) || !fs.statSync(file).isFile()) return next()
        res.setHeader("Content-Type", MIME[path.extname(file)] ?? "application/octet-stream")
        fs.createReadStream(file).pipe(res)
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), repoStatics()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // DEV : /i/* (tracking affiliation + redirects download) est servi par le
    // serveur fly en prod (rewrite Vercel) -> on proxifie vers la prod pour que
    // les boutons download marchent aussi en local.
    proxy: {
      "/i": { target: "https://ecom-ai-builder.com", changeOrigin: true },
    },
  },
})
