// Post-build Vercel : le deploy sert UNIQUEMENT site/dist (outputDirectory).
// On y copie les statiques historiques du repo qui doivent rester servis :
//   - outils/            pages HTML des outils gratuits (SEO) + leurs assets.
//                        SAUF outils/index.html : la page React /outils
//                        (prerendue par prerender.mjs) remplace l'ancien hub.
//   - assets/            site-header.js/css référencés par les pages outils.
//   - icon.png           favicon historique référencé par les pages outils.
//   - .well-known/       apple-developer-merchantid-domain-association.
// images/ (visuels de l'ANCIENNE landing) n'est volontairement pas copié.
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const site = path.dirname(fileURLToPath(new URL("../package.json", import.meta.url)))
const repo = path.dirname(site)
const dist = path.join(site, "dist")

async function copyDir(src, dest, { skip = [] } = {}) {
  await fs.mkdir(dest, { recursive: true })
  for (const entry of await fs.readdir(src, { withFileTypes: true })) {
    if (skip.includes(entry.name)) continue
    const from = path.join(src, entry.name)
    const to = path.join(dest, entry.name)
    if (entry.isDirectory()) await copyDir(from, to)
    else await fs.copyFile(from, to)
  }
}

await copyDir(path.join(repo, "outils"), path.join(dist, "outils"), { skip: ["index.html"] })
await copyDir(path.join(repo, "assets"), path.join(dist, "assets"))
await fs.copyFile(path.join(repo, "icon.png"), path.join(dist, "icon.png"))
await copyDir(path.join(repo, ".well-known"), path.join(dist, ".well-known"))
console.log("[copy-static] outils/ + assets/ + icon.png + .well-known/ copiés dans dist")
