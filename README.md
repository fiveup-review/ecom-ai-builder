# ECOM AI BUILDER — Landing

Site vitrine statique, **déployé sur Vercel**, séparé du bot/serveur (repo
`shopify-ai-builder`). On le redéploie sans jamais redémarrer le bot.

## Structure

```
public/
  index.html        page unique (placeholders __API_BASE__ / __META_PIXEL_ID__ / __TIKTOK_PIXEL_ID__)
  icon.png
  images/           photos avis + vidéos démo
build.mjs           copie public/ -> dist/ + résout les placeholders depuis l'env
vercel.json         buildCommand=node build.mjs, outputDirectory=dist
```

## Ce qui reste sur le serveur fly (PAS ici)

La landing ne sert PAS les binaires. Les boutons « Télécharger » et l'appel de
version pointent vers le serveur via `__API_BASE__` :

- `__API_BASE__/download/mac` · `__API_BASE__/download/win`
- `__API_BASE__/api/latest`

## Variables d'env (Vercel → Project Settings → Environment Variables)

| Variable          | Défaut                        | Rôle                                            |
| ----------------- | ----------------------------- | ----------------------------------------------- |
| `API_BASE`        | `https://ecom-ai-builder.fly.dev` | domaine du serveur fly (download + version) — la landing occupe `ecom-ai-builder.com`, donc ce base pointe ailleurs |
| `META_PIXEL_ID`   | _(vide)_                      | pixel Meta — vide = pixel non chargé            |
| `TIKTOK_PIXEL_ID` | _(vide)_                      | pixel TikTok — vide = pixel non chargé          |

## Dev local

```
npm run dev      # build dans dist/ puis sert en local
```

## ⚠️ Note CORS (version affichée)

`fetch(__API_BASE__/api/latest)` est cross-origin. Si le serveur fly ne renvoie
pas `Access-Control-Allow-Origin`, l'appel échoue silencieusement et le numéro
de version ne s'affiche pas (le téléchargement, lui, marche : ce sont de
simples liens). Pour réactiver l'affichage : ajouter le header CORS sur
`/api/latest` côté serveur, ou faire lire `latest.json` depuis R2 (public).
