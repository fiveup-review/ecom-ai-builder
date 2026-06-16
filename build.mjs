// Build statique de la landing pour Vercel.
//
// Copie public/ -> dist/ et résout 3 placeholders dans index.html depuis l'env
// (réglés dans les Project Settings Vercel) :
//
//   __API_BASE__        domaine du serveur fly qui sert /download/* et /api/latest.
//                       La landing occupe ecom-ai-builder.com -> ce base DOIT pointer
//                       ailleurs (sinon les liens download bouclent sur la landing).
//                       Défaut = le fallback fly ecom-ai-builder.fly.dev (sert déjà les
//                       binaires) ; override en env Vercel vers un sous-domaine type
//                       app.ecom-ai-builder.com. PAS de slash final.
//   __META_PIXEL_ID__   pixel Meta   (vide = le pixel ne se charge pas)
//   __TIKTOK_PIXEL_ID__ pixel TikTok (vide = le pixel ne se charge pas)
//
// Ces deux derniers reproduisent à l'identique l'injection que faisait l'ancien
// serveur (site.ts). Les pixel IDs ne sont pas secrets ; on les garde en env
// Vercel pour ne pas les committer et pouvoir les changer sans toucher au HTML.

import fs from "node:fs";
import path from "node:path";

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const SRC = path.join(ROOT, "public");
const OUT = path.join(ROOT, "dist");

const API_BASE = (process.env.API_BASE || "https://ecom-ai-builder.fly.dev").replace(/\/+$/, "");
const META = process.env.META_PIXEL_ID || "";
const TIKTOK = process.env.TIKTOK_PIXEL_ID || "";

fs.rmSync(OUT, { recursive: true, force: true });
fs.cpSync(SRC, OUT, { recursive: true });

const indexPath = path.join(OUT, "index.html");
const html = fs
  .readFileSync(indexPath, "utf-8")
  .replaceAll("__API_BASE__", API_BASE)
  .replaceAll("__META_PIXEL_ID__", META)
  .replaceAll("__TIKTOK_PIXEL_ID__", TIKTOK);
fs.writeFileSync(indexPath, html);

console.log(`[build] dist/ prêt — API_BASE=${API_BASE} meta=${META ? "set" : "—"} tiktok=${TIKTOK ? "set" : "—"}`);
