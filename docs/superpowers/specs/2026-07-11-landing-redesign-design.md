# Spec — Refonte design landing ECOM AI BUILDER

Date : 2026-07-11
Branche : `worktree-redesign`

## Contexte et objectif

La landing actuelle (`index.html` statique, ~2500 lignes) convertit mal. Diagnostic
retenu : le design est perçu comme amateur, ce qui casse la confiance. L'objectif du
projet est un redesign complet au niveau d'exécution des références
[onorca.dev](https://www.onorca.dev/) et [superset.sh](https://superset.sh/) —
esthétique "dev tool" premium, sombre, dense, très soignée.

**Conversion prioritaire : le téléchargement de l'app desktop.** Le Discord/Whop est
le CTA secondaire.

**Le contenu (textes) sera entièrement retravaillé plus tard.** Ce projet livre le
design avec un contenu placeholder dérivé de l'existant. Le texte n'est pas un
livrable ; la structure et les composants le sont.

## Périmètre

- **Inclus** : nouvelle landing mono-page en React, design system complet,
  composants, responsive, contenu placeholder.
- **Exclus** : `/outils`, `/outils-backend` (intouchés), réécriture du contenu,
  cutover Vercel/DNS (étape séparée après validation), SEO avancé.

## Identité visuelle (conservée, exécution refaite)

- **Couleurs** : fond quasi noir (`#050607` / `#000`), accent vert conservé —
  `#39ff5a` (vif, CTA/highlights), `#7dffa0` (nuance claire), `#3c6e52` (nuance
  sourde, textures), `#eafff1` (texte clair). Déclinées en tokens Tailwind/shadcn
  (CSS variables) avec une échelle de gris neutre pour les surfaces et bordures.
- **Typographie** : `Space Grotesk` pour les titres (bold/black, échelle stricte),
  `JetBrains Mono` pour les eyebrows uppercase, labels techniques et chiffres.
  Corps de texte : `Inter`.
- **Logo** : `icon.png` existant conservé.
- **Rayons/espacements** : un seul rayon de bordure système (`rounded-xl`),
  grille d'espacement base 4/8 px stricte, rythme vertical homogène entre sections.
- **Texture ASCII/pointillés** : motif de points en vert sourd (`#3c6e52` à faible
  opacité) en arrière-plan, généré en SVG/canvas (pas d'image bitmap). Présent sur
  **le hero et le CTA final uniquement**. Les sections de contenu dense restent sur
  fond uni.

## Patterns repris des références

- Hero : eyebrow/badge au-dessus du titre, titre XL bold (hiérarchisation par le
  gris sur une partie du texte possible), sous-titre gris 2 lignes max, CTA primaire
  plein + CTA secondaire outline côte à côte, note plateformes en dessous
  ("macOS · Windows").
- Le produit est le visuel : maquettes de fenêtres d'app (ronds macOS, tabs,
  chrome sombre) encadrant les captures/vidéos, jamais d'illustration abstraite.
- Eyebrows monospace uppercase par section (ex. `RECHERCHE PRODUIT`).
- CTA final dupliqué avant le footer, boutons **empilés** : Download en grand
  bouton plein pleine largeur (blanc ou vert), note plateformes, puis bouton
  Discord plus discret (fond sombre, icône Discord) juste en dessous — pattern de
  l'image de référence fournie.
- Fond avec grille/texture très discrète, sections aérées, aucun gradient flashy.

## Stack technique

- **React 18 + TypeScript + Vite** — SPA statique au build (pas de Next.js, inutile
  pour une mono-page).
- **Tailwind CSS v4 + shadcn/ui** — composants utilisés : Button, Card, Accordion,
  Badge, Tabs (si besoin pour les features), Separator.
- **lucide-react** pour toutes les icônes (+ icône Discord custom en SVG,
  absente de lucide).
- **Motion** (`motion/react`) pour les reveals au scroll et micro-interactions.
  Interdits explicites : **Lenis, GSAP**. Le scroll reste natif.
- Vidéos existantes (`images/*.mp4`) réutilisées, recadrées dans les maquettes de
  fenêtre d'app.

### Emplacement dans le repo

La nouvelle app vit dans **`site/`** à la racine du repo. L'ancien `index.html`
reste intact sur la branche pendant tout le développement (référence + rollback
trivial). Le remplacement de la racine par le build de `site/` (et l'ajustement de
`vercel.json`) est une étape de cutover hors périmètre de ce spec.

```
site/
  src/
    components/ui/      # shadcn
    components/         # composants métier (AppWindow, SectionHeading, DotPattern…)
    sections/           # Nav, Hero, Features, Testimonials, HowItWorks, Faq, FinalCta, Footer
    lib/
    App.tsx
  public/               # assets copiés (vidéos, logo)
```

## Structure de la page (haut → bas)

1. **Nav** — logo + nom à gauche ; liens centraux minimaux (placeholder : Features,
   Outils, FAQ) ; à droite bouton Download plein. Sticky, fond noir translucide +
   blur, bordure basse 1px.
2. **Hero** — texture points en fond. Badge eyebrow, titre XL, sous-titre, CTA
   Download (primaire) + Discord (secondaire outline), note "macOS · Windows".
   En dessous : grande maquette fenêtre d'app contenant une des vidéos existantes.
3. **Features** — 4 blocs (recherche produit, marque, visuels, Shopify — mappés sur
   les 4 vidéos existantes). Alternance texte/visuel gauche-droite, eyebrow mono +
   titre court + description 2 lignes, visuel en maquette fenêtre.
4. **Preuve sociale** — cards témoignages (avatar, nom, rôle, citation) en grille,
   avatars existants (`avis-*.jpg`) en placeholder.
5. **How it works** — stepper/timeline vertical ou horizontal, 3-4 étapes
   (télécharger → connecter Discord → valider les étapes → boutique livrée).
6. **FAQ** — accordion shadcn, questions reprises de l'existant en placeholder.
7. **CTA final** — texture points en fond. Titre XL, bouton Download pleine
   largeur, note plateformes, bouton Discord empilé dessous.
8. **Footer** — logo/tagline, colonnes de liens (Produit, Outils, Légal,
   Communauté), réseaux, copyright.

## Responsive

Mobile-first. Points de rupture Tailwind par défaut. Sur mobile : nav réduite
(logo + bouton Download, liens dans un menu), features en pile simple, maquettes
d'app pleine largeur, CTA empilés (déjà le cas par design).

## Animations

- Reveals au scroll : fade + translate léger via Motion (`whileInView`), une seule
  fois, durées courtes (200-400 ms), pas d'effet spectaculaire.
- Micro-interactions : hover states sur boutons/cards (transitions CSS), focus
  visibles.
- `prefers-reduced-motion` respecté (Motion le gère, à vérifier).

## Gestion d'erreurs / cas limites

- Vidéos : `preload="metadata"`, `muted autoplay loop playsinline`, poster si
  possible ; la page reste correcte si une vidéo ne charge pas (la maquette de
  fenêtre a un fond propre).
- Liens de téléchargement : URLs GitHub Releases existantes conservées telles
  quelles.
- Pas de JS critique : la page est lisible et les CTA cliquables même si Motion
  échoue (contenu visible par défaut, animations en enhancement).

## Tests / validation

Pas de suite de tests automatisée sur ce projet. Validation :

- `npm run build` passe sans erreur ni warning TypeScript.
- Vérification visuelle systématique par screenshots (desktop 1440, mobile 390)
  section par section pendant le développement.
- Lighthouse : pas de régression majeure de performance vs l'actuel (budget
  raisonnable : LCP < 2.5 s en local build).

## Critère de réussite

Un visiteur qui connaît onorca.dev ou superset.sh doit percevoir le même niveau
d'exécution. Aucune section ne doit trahir un assemblage rapide : espacements
réguliers, hiérarchie typographique nette, composants cohérents entre eux.
