# ECOM AI BUILDER — Landing

Site vitrine **statique pur** (aucun build), déployé sur **Vercel**, séparé du
bot/serveur (repo `shopify-ai-builder`). On le redéploie sans jamais redémarrer
le bot.

## Structure

```
index.html        page unique
icon.png
images/           photos avis + vidéos démo
vercel.json       static (cleanUrls + cache headers), pas de build
```

Vercel sert les fichiers tels quels (Framework Preset = « Other », pas de build
command). Tout est en clair côté client — il n'y a aucun secret ici.

## Ce qui reste sur le serveur fly (PAS ici)

La landing ne sert PAS les binaires. Les boutons « Télécharger » et l'appel de
version pointent en dur vers le serveur fly :

- `https://ecom-ai-builder.fly.dev/download/mac` · `.../download/win`
- `https://ecom-ai-builder.fly.dev/api/latest`

> La landing occupe `ecom-ai-builder.com`, donc ces liens visent le **fallback
> fly** `ecom-ai-builder.fly.dev`. Si tu mets fly derrière un sous-domaine custom
> (ex. `app.ecom-ai-builder.com`), remplace les 3 URLs dans `index.html`.

## Pixels Meta / TikTok

Hardcodés dans `index.html` (cherche `var PIXEL_ID = ""`). Colle ton ID Meta et
ton ID TikTok. Vide = le pixel ne se charge pas. Ce ne sont **pas** des secrets
(visibles dans le HTML client), donc inutile de passer par des env vars.

## Dev local

```
npm run dev      # sert le dossier en local
```

## ⚠️ Note CORS (version affichée)

`fetch("https://ecom-ai-builder.fly.dev/api/latest")` est cross-origin. Si le
serveur fly ne renvoie pas `Access-Control-Allow-Origin`, l'appel échoue
silencieusement et le numéro de version ne s'affiche pas (le téléchargement, lui,
marche : ce sont de simples liens). Pour réactiver : ajouter le header CORS sur
`/api/latest` côté serveur, ou lire `latest.json` depuis R2 (public).
