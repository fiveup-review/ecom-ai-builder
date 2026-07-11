# Spec — Landing v2 : visuels superset + sections réintégrées

Date : 2026-07-11
Branche : `worktree-redesign` (s'appuie sur la landing v1 livrée, spec `2026-07-11-landing-redesign-design.md` qui reste valable pour tout ce qui n'est pas contredit ici)

## Contexte

Retour utilisateur sur la v1 : (1) les « visuels ASCII » attendus se limitaient à la
texture de points discrète — la référence réelle est **superset.sh** : taches
organiques ditherées (halftone) débordant derrière les maquettes, eyebrow avec
premier mot surligné ; (2) quatre sections de l'ancienne landing (`index.html`
racine) manquent : stats, équipe, offre, téléchargement.

## Décisions validées

1. **Fake UI HTML** pour les 4 features (plus de vidéos dans Features). La vidéo
   du hero est conservée. Les mp4 non utilisés sont supprimés de `site/public/videos/`.
2. **Texture dither** : SVG pré-généré committé (pas de bitmap, pas de canvas
   runtime). Composant `DitherBlob` — blobs organiques remplis de motifs de
   points à densités étagées, `currentColor` (vert sourd), variantes par rotation.
3. **Eyebrow superset** : premier mot surligné (`bg-primary/20 text-primary`),
   reste en mono gris. Appliqué via `SectionHeading` partout.
4. **Sections réintégrées** (contenu repris de l'ancienne landing, placeholder,
   centralisé dans `content.ts`) :
   - `Proof` — bandeau 4 stats (7 étapes · 9 marchés · 0 ligne de code · 1-clic push Shopify), après Features.
   - `Team` — « C'est pas un bot sorti de nulle part », 2 cards (Lucas Cotelle
     photo + YouTube/Instagram/TikTok ; Paul photo + YouTube), photos copiées
     dans `site/public/team/`.
   - `Offer` — « Ce que tu obtiens, sans engagement » : grande card « Inclus dans
     ton accès » (5 items) + cards « Zéro risque » et « Tes données restent chez toi ».
   - `Download` (`id="download"`) — cards macOS (boutons Silicon + Intel) et
     Windows, notes d'installation. Pas de fetch de version dynamique.
5. **Ordre de page** : Hero → Features → Proof → HowItWorks → Testimonials →
   Team → Offer → FAQ → Download → FinalCta → Footer. La Nav et le Footer
   pointent « Télécharger » vers `#download`.

## Fake UIs (contenu des 4 maquettes, dans des `AppWindow`)

1. **Recherche produit** — mini-dashboard : 4 lignes produit (nom, badge niche,
   barre de score, tendance, marge estimée), une ligne surlignée « gagnant ».
2. **Marque & identité** — brand board : 3 propositions de nom (une sélectionnée),
   5 pastilles de palette, spécimen typo, tuile logo.
3. **Visuels** — grille 6 tuiles d'images générées (dégradés placeholder), une
   tuile « génération… » avec barre de progression, ligne de prompt en pied.
4. **Shopify** — admin fiche produit : titre, prix, badge « En ligne », lignes de
   description, bouton « Publier », barre « ✓ Validé sur Discord » en pied.

**Exception copy** : le micro-texte interne des maquettes (noms de produits
fictifs, prix, labels d'UI) vit dans chaque composant mockup, pas dans
`content.ts` — c'est de la décoration de design, pas de la copy de page. Les
textes de section (eyebrow, titres, descriptions) restent dans `content.ts`.

## Contraintes reconduites de la v1

Palette, typo, radius, interdits (Lenis/GSAP), copy française centralisée,
liens verbatim, travail uniquement dans `site/`, vérification par
`npm run build` + screenshots 1440/390, pas de suite de tests.

## Critère de réussite

Les sections Features évoquent immédiatement superset.sh (blob dither vert
débordant derrière la fenêtre, fake UI nette, eyebrow surligné), et tout le
contenu de l'ancienne landing a un équivalent dans la nouvelle.
