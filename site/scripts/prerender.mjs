// Prerender post-build : rend chaque route en HTML statique (react-dom/server,
// pas besoin de navigateur) et l'écrit dans dist/<route>/index.html avec ses
// balises meta propres. Ajoute aussi le preload de la fonte du H1 (LCP).
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { createServer } from "vite"

const root = path.dirname(fileURLToPath(new URL("../package.json", import.meta.url)))
const dist = path.join(root, "dist")

const ROUTES = [
  { path: "/", out: "index.html" },
  {
    path: "/outils",
    out: path.join("outils", "index.html"),
    title: "Outils gratuits e-commerce — ECOM AI BUILDER",
    description:
      "Boîte à outils e-commerce gratuite : téléchargeur de vidéos TikTok, calculateurs de marge et ROAS, éditeur d'images, QR codes et plus. Sans inscription.",
    canonical: "https://ecom-ai-builder.com/outils/",
  },
]

const vite = await createServer({
  root,
  server: { middlewareMode: true },
  appType: "custom",
})

try {
  const { render } = await vite.ssrLoadModule("/src/entry-server.tsx")
  const shell = await fs.readFile(path.join(dist, "index.html"), "utf8")

  // Preload de la fonte du H1 (Space Grotesk 700, subset latin) — nom hashé.
  const assets = await fs.readdir(path.join(dist, "assets"))
  const h1Font = assets.find(
    (f) => f.startsWith("space-grotesk-latin-700-normal") && f.endsWith(".woff2")
  )

  for (const route of ROUTES) {
    const appHtml = render(route.path)
    if (!appHtml || appHtml.length < 1000) {
      throw new Error(`prerender suspect pour ${route.path} (${appHtml?.length ?? 0} chars)`)
    }

    let html = shell
    const marker = '<div id="root"></div>'
    if (!html.includes(marker)) throw new Error("marker #root introuvable dans dist/index.html")
    html = html.replace(marker, `<div id="root">${appHtml}</div>`)

    if (h1Font) {
      html = html.replace(
        "</title>",
        `</title>\n    <link rel="preload" as="font" type="font/woff2" href="/assets/${h1Font}" crossorigin />`
      )
    }

    // Meta spécifiques à la route (le shell porte celles de la home).
    if (route.title) {
      html = html
        .replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
        .replace(
          /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
          `$1${route.title}$2`
        )
        .replace(
          /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,
          `$1${route.title}$2`
        )
    }
    if (route.description) {
      // name= ET og:/twitter: description (sinon la page hérite du social de la home).
      html = html
        .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${route.description}$2`)
        .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${route.description}$2`)
        .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, `$1${route.description}$2`)
    }
    if (route.canonical) {
      html = html
        .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${route.canonical}$2`)
        .replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/, `$1${route.canonical}$2`)
    }

    const outFile = path.join(dist, route.out)
    await fs.mkdir(path.dirname(outFile), { recursive: true })
    await fs.writeFile(outFile, html)
    console.log(`prerender OK ${route.path} -> ${route.out} (${appHtml.length} chars)`)
  }
} finally {
  await vite.close()
}
