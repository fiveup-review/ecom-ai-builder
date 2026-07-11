# Landing v2 — Superset Visuals + Sections Réintégrées Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Donner aux features le traitement visuel superset.sh (blobs dither + fake UIs HTML) et réintégrer les 4 sections manquantes de l'ancienne landing (stats, équipe, offre, download).

**Architecture:** Extension de la SPA `site/` livrée en v1. Nouveau primitif `DitherBlob` (SVG committé), `SectionHeading` revu (eyebrow premier mot surligné), 4 composants mockup dans `site/src/components/mockups/`, 4 nouvelles sections dans `site/src/sections/`, contenu étendu dans `site/src/lib/content.ts`.

**Tech Stack:** Existant (React, TS, Vite, Tailwind v4, shadcn/ui, lucide-react, Motion). Aucune dépendance nouvelle.

## Global Constraints

- **Interdits : Lenis et GSAP.** Scroll natif. Animations : Motion + CSS uniquement.
- Palette verbatim : fond `#050607`, texte `#eafff1`, accent `#39ff5a`, claire `#7dffa0`, sourde `#3c6e52`, secondaire `#93a89c`. Tokens existants (`text-primary`, `text-accent-dim`, `text-accent-soft`, `text-muted-foreground`, `font-display`, `font-mono`).
- Un seul rayon système : `--radius: 0.75rem`.
- Texture points/dither : hero, CTA final et **blobs derrière les fenêtres Features** uniquement.
- Tout le travail dans `site/`. Ne pas toucher `index.html` racine, `/outils`, `/outils-backend`, `vercel.json`.
- Copy de page en français, centralisée dans `site/src/lib/content.ts`. Exception : le micro-texte interne des mockups (noms fictifs, labels d'UI) vit dans les composants mockup.
- Liens verbatim (déjà dans `LINKS` de `content.ts`) : macSilicon, macIntel, windows, discord — ne pas les dupliquer en dur.
- Pas de suite de tests. Cycle par task : `npm run build` exit 0 + screenshots dev server (1440 et 390) lus et vérifiés + commit.
- Screenshots : `npx capture-website-cli http://localhost:5173 --output=<scratchpad>/check-v2-<task>.png --width=1440 --full-page --overwrite` (et `--width=390`). Scratchpad : `/private/tmp/claude-501/-Users-matteo-dev-landing-ecom-ai-builder/4e5babf5-6908-4491-b467-320ae3d97086/scratchpad`. LIRE chaque image après capture.
- Dev server : port 5173, normalement déjà lancé (`curl -sI http://localhost:5173` ; sinon `cd site && npm run dev` en arrière-plan).

---

### Task 1: DitherBlob + SectionHeading v2 (eyebrow superset)

**Files:**
- Create: `site/src/components/DitherBlob.tsx`
- Modify: `site/src/components/SectionHeading.tsx`

**Interfaces:**
- Consumes: `cn()` de `@/lib/utils`, tokens v1.
- Produces: `DitherBlob({ className?: string, variant?: 0 | 1 | 2 | 3 })` — SVG décoratif absolu, `aria-hidden`, coloré par `currentColor` (l'appelant met `text-accent-dim`), `variant` = rotation 0/90/180/270°. `SectionHeading` garde sa signature v1 (`{ eyebrow, title, description?, align? }`) mais rend le premier mot de l'eyebrow surligné.

- [ ] **Step 1: DitherBlob**

`site/src/components/DitherBlob.tsx` :

```tsx
import { useId } from "react"
import { cn } from "@/lib/utils"

const ROTATIONS = [0, 90, 180, 270] as const

export function DitherBlob({
  className,
  variant = 0,
}: {
  className?: string
  variant?: 0 | 1 | 2 | 3
}) {
  const id = useId()
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 600"
      className={cn("pointer-events-none absolute", className)}
    >
      <defs>
        <pattern id={`${id}-s`} width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="2.5" height="2.5" fill="currentColor" />
        </pattern>
        <pattern id={`${id}-m`} width="9" height="9" patternUnits="userSpaceOnUse">
          <rect width="2.5" height="2.5" fill="currentColor" />
        </pattern>
        <pattern id={`${id}-d`} width="5" height="5" patternUnits="userSpaceOnUse">
          <rect width="2" height="2" fill="currentColor" />
        </pattern>
      </defs>
      <g transform={`rotate(${ROTATIONS[variant]} 300 300)`}>
        <path
          fill={`url(#${id}-s)`}
          d="M317 41c96-27 214 24 240 128 26 104-38 168-15 252 23 84-77 148-183 137C253 547 96 522 62 424 28 326 116 270 92 186 68 102 221 68 317 41Z"
        />
        <path
          fill={`url(#${id}-m)`}
          d="M322 121c72-20 158 22 176 98 18 76-30 124-12 186 18 62-56 108-134 100-78-8-192-27-217-99-25-72 40-114 22-176-18-62 93-89 165-109Z"
        />
        <path
          fill={`url(#${id}-d)`}
          d="M328 208c48-13 102 17 113 66 11 49-21 79-9 119 12 40-37 69-88 63-51-6-124-19-140-65-16-46 27-73 15-113-12-40 61-57 109-70Z"
        />
      </g>
    </svg>
  )
}
```

- [ ] **Step 2: SectionHeading v2**

Remplacer `site/src/components/SectionHeading.tsx` par :

```tsx
import { cn } from "@/lib/utils"

export function Eyebrow({ text }: { text: string }) {
  const [first, ...rest] = text.split(" ")
  return (
    <span className="font-mono text-xs font-medium uppercase tracking-[0.2em]">
      <span className="bg-primary/20 px-1.5 py-0.5 text-primary">{first}</span>
      {rest.length > 0 ? (
        <span className="ml-2 text-muted-foreground">{rest.join(" ")}</span>
      ) : null}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string
  title: string
  description?: string
  align?: "center" | "left"
}) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center"
      )}
    >
      <Eyebrow text={eyebrow} />
      <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-lg text-muted-foreground text-pretty">{description}</p>
      ) : null}
    </div>
  )
}
```

Appliquer le même traitement aux deux autres endroits qui rendent un eyebrow
« à la main » avec les mêmes classes (`font-mono text-xs ... text-primary`) :
dans `site/src/sections/Features.tsx` (eyebrow de chaque bloc feature),
remplacer le `<span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary">{feature.eyebrow}</span>` par le même markup que `Eyebrow`
ci-dessus. Pour éviter la duplication : exporter `Eyebrow` depuis
`SectionHeading.tsx` (`export function Eyebrow...`) et l'importer dans
`Features.tsx`.

- [ ] **Step 3: Vérifier build + screenshot**

```bash
cd site && npm run build
```
Attendu : exit 0.

Screenshot full-page 1440. Vérifier : tous les eyebrows de section (Pipeline
complet, Ils l'utilisent, Comment ça marche, FAQ, et ceux des 4 features) ont
leur premier mot surligné en vert sur fond vert translucide, le reste en gris
mono. Aucune régression de layout.

- [ ] **Step 4: Commit**

```bash
git add site/ && git commit -m "feat(site): DitherBlob + eyebrows superset (premier mot surligné)"
```

---

### Task 2: Les 4 composants mockup (fake UIs)

**Files:**
- Create: `site/src/components/mockups/ResearchMock.tsx`
- Create: `site/src/components/mockups/BrandMock.tsx`
- Create: `site/src/components/mockups/VisualsMock.tsx`
- Create: `site/src/components/mockups/ShopifyMock.tsx`

**Interfaces:**
- Consumes: `cn()` si besoin, tokens, `lucide-react` (icônes : `TrendingUp`, `Check`, `Loader2`, `Sparkles`).
- Produces: 4 composants sans props, chacun rendant un contenu de fenêtre autonome (fond `bg-card` fourni par `AppWindow` en Task 3 — les mocks ne rendent PAS la fenêtre, seulement son contenu, avec un padding propre). Hauteur naturelle ~aspect-video.

- [ ] **Step 1: ResearchMock**

`site/src/components/mockups/ResearchMock.tsx` :

```tsx
import { TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const ROWS = [
  { name: "Correcteur de posture", niche: "Bien-être", score: 92, trend: "+318%", margin: "x4.2", winner: true },
  { name: "Lampe sunset projector", niche: "Déco", score: 81, trend: "+142%", margin: "x3.1", winner: false },
  { name: "Brosse vapeur textile", niche: "Maison", score: 74, trend: "+96%", margin: "x2.8", winner: false },
  { name: "Gourde infuseur fruits", niche: "Sport", score: 66, trend: "+61%", margin: "x2.4", winner: false },
]

export function ResearchMock() {
  return (
    <div className="flex flex-col gap-2 p-4 font-mono text-xs">
      <div className="flex items-center justify-between px-3 pb-2 text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>Produit</span>
        <span>Score / Tendance / Marge</span>
      </div>
      {ROWS.map((row) => (
        <div
          key={row.name}
          className={cn(
            "flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5",
            row.winner ? "border-primary/40 bg-primary/5" : "bg-secondary/50"
          )}
        >
          <div className="flex min-w-0 items-center gap-2">
            <span className="truncate font-sans text-sm text-foreground">{row.name}</span>
            <span className="hidden shrink-0 rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline">
              {row.niche}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <div className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-white/10 sm:block">
              <div className="h-full bg-primary" style={{ width: `${row.score}%` }} />
            </div>
            <span className="flex items-center gap-1 text-accent-soft">
              <TrendingUp className="size-3" />
              {row.trend}
            </span>
            <span className="text-muted-foreground">{row.margin}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: BrandMock**

`site/src/components/mockups/BrandMock.tsx` :

```tsx
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const NAMES = [
  { name: "Posturea", selected: true },
  { name: "AlignCo", selected: false },
  { name: "Vertebra", selected: false },
]

const SWATCHES = ["#1a2e22", "#39ff5a", "#7dffa0", "#eafff1", "#93a89c"]

export function BrandMock() {
  return (
    <div className="grid gap-3 p-4 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Nom de marque
        </span>
        {NAMES.map((n) => (
          <div
            key={n.name}
            className={cn(
              "flex items-center justify-between rounded-lg border px-3 py-2 font-display text-sm font-bold",
              n.selected ? "border-primary/40 bg-primary/5 text-foreground" : "text-muted-foreground"
            )}
          >
            {n.name}
            {n.selected ? <Check className="size-3.5 text-primary" /> : null}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Palette
          </span>
          <div className="flex gap-1.5">
            {SWATCHES.map((c) => (
              <span key={c} className="size-7 rounded-md border" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Typographie
          </span>
          <span className="font-display text-lg font-bold">Space Grotesk</span>
          <span className="text-xs text-muted-foreground">Aa Bb Cc — 0123456789</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border bg-secondary/50 px-3 py-2">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary font-display text-sm font-bold text-primary-foreground">
            P
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Logo généré
          </span>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: VisualsMock**

`site/src/components/mockups/VisualsMock.tsx` :

```tsx
import { Loader2, Sparkles } from "lucide-react"

const TILES = [
  "from-emerald-900/80 to-emerald-600/40",
  "from-teal-900/80 to-emerald-700/40",
  "from-green-950/90 to-teal-700/40",
  "from-emerald-950/90 to-green-600/30",
  "from-teal-950/80 to-green-700/40",
]

export function VisualsMock() {
  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="grid grid-cols-3 gap-2">
        {TILES.map((g, i) => (
          <div
            key={g}
            className={`flex aspect-square items-center justify-center rounded-lg border bg-gradient-to-br ${g}`}
          >
            <span className="font-mono text-[10px] text-white/40">IMG_{i + 1}</span>
          </div>
        ))}
        <div className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-primary/40">
          <Loader2 className="size-4 animate-spin text-primary" />
          <div className="h-1 w-10 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-2/3 bg-primary" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2 font-mono text-[11px] text-muted-foreground">
        <Sparkles className="size-3.5 shrink-0 text-primary" />
        <span className="truncate">packshot studio, fond crème, ombre douce, 4:5…</span>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: ShopifyMock**

`site/src/components/mockups/ShopifyMock.tsx` :

```tsx
import { Check } from "lucide-react"

export function ShopifyMock() {
  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="font-display text-base font-bold">
            Correcteur de posture Posturea™
          </span>
          <span className="font-mono text-sm text-accent-soft">29,90 €</span>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
          <span className="size-1.5 rounded-full bg-primary" />
          En ligne
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="h-2 w-full rounded bg-white/10" />
        <div className="h-2 w-4/5 rounded bg-white/10" />
        <div className="h-2 w-3/5 rounded bg-white/10" />
      </div>
      <div className="flex items-center justify-between gap-3 border-t pt-3">
        <span className="rounded-md bg-primary px-3 py-1.5 font-mono text-xs font-medium text-primary-foreground">
          Publier
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
          <Check className="size-3.5 text-primary" />
          Validé sur Discord
        </span>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Vérifier build**

```bash
cd site && npm run build
```
Attendu : exit 0 (`tsc -b` type-checke les mocks même pas encore importés).

- [ ] **Step 6: Commit**

```bash
git add site/ && git commit -m "feat(site): 4 mockups fake UI (recherche, marque, visuels, shopify)"
```

---

### Task 3: Features v2 — mocks + DitherBlob, suppression des vidéos

**Files:**
- Modify: `site/src/sections/Features.tsx`
- Modify: `site/src/lib/content.ts` (FEATURES : retirer `video`)
- Delete: `site/public/videos/recherche.mp4`, `site/public/videos/marque.mp4`, `site/public/videos/visuels.mp4` (garder `shopify.mp4`, utilisé par le hero)

**Interfaces:**
- Consumes: `DitherBlob` (Task 1), `Eyebrow` (Task 1), les 4 mocks (Task 2), `AppWindow`, `Reveal`, `SectionHeading`, `FEATURES`.
- Produces: `Features()` inchangé vu de l'extérieur (`id="features"`, monté dans App).

- [ ] **Step 1: content.ts — retirer les vidéos de FEATURES**

Dans `site/src/lib/content.ts`, supprimer la clé `video` des 4 entrées de
`FEATURES` (les champs `eyebrow`, `title`, `description` restent identiques).

- [ ] **Step 2: Features.tsx v2**

Remplacer `site/src/sections/Features.tsx` par :

```tsx
import type { ComponentType } from "react"
import { AppWindow } from "@/components/AppWindow"
import { DitherBlob } from "@/components/DitherBlob"
import { Reveal } from "@/components/Reveal"
import { Eyebrow, SectionHeading } from "@/components/SectionHeading"
import { ResearchMock } from "@/components/mockups/ResearchMock"
import { BrandMock } from "@/components/mockups/BrandMock"
import { VisualsMock } from "@/components/mockups/VisualsMock"
import { ShopifyMock } from "@/components/mockups/ShopifyMock"
import { FEATURES } from "@/lib/content"
import { cn } from "@/lib/utils"

const MOCKS: ComponentType[] = [ResearchMock, BrandMock, VisualsMock, ShopifyMock]
const WINDOW_TITLES = ["recherche-produit", "marque-identite", "studio-visuels", "push-shopify"]

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Pipeline complet"
        title="De la recherche produit à ta boutique Shopify."
        description="Chaque étape est automatisée par l'IA et validée par toi, directement dans Discord."
      />
      <div className="mt-20 flex flex-col gap-24">
        {FEATURES.map((feature, i) => {
          const Mock = MOCKS[i]
          return (
            <Reveal key={feature.eyebrow}>
              <div
                className={cn(
                  "flex flex-col items-center gap-10 lg:gap-16",
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                )}
              >
                <div className="flex flex-1 flex-col gap-4">
                  <Eyebrow text={feature.eyebrow} />
                  <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-pretty">
                    {feature.description}
                  </p>
                </div>
                <div className="relative w-full flex-1">
                  <DitherBlob
                    variant={(i % 4) as 0 | 1 | 2 | 3}
                    className={cn(
                      "-top-16 h-[calc(100%+8rem)] w-[calc(100%+6rem)] text-accent-dim/60",
                      i % 2 === 0 ? "-left-16" : "-right-16"
                    )}
                  />
                  <AppWindow title={WINDOW_TITLES[i]} className="relative">
                    <Mock />
                  </AppWindow>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Supprimer les vidéos inutilisées**

```bash
git rm site/public/videos/recherche.mp4 site/public/videos/marque.mp4 site/public/videos/visuels.mp4
```
Vérifier avant : `grep -rn "recherche.mp4\|marque.mp4\|visuels.mp4" site/src/` → aucune occurrence attendue après le Step 1.

- [ ] **Step 4: Vérifier build + screenshots**

```bash
cd site && npm run build
```
Attendu : exit 0.

Screenshots full-page 1440 + 390. Vérifier : chaque feature montre une fake UI
dans sa fenêtre macOS (dashboard produits / brand board / grille visuels /
admin Shopify), un blob dither vert déborde derrière chaque fenêtre (côté
extérieur), l'alternance gauche/droite est conservée, rien ne déborde
horizontalement sur mobile (les blobs sont en `overflow` de la section —
vérifier qu'aucune scrollbar horizontale n'apparaît ; si oui, ajouter
`overflow-hidden` sur la `<section>`).

- [ ] **Step 5: Commit**

```bash
git add -A site/ && git commit -m "feat(site): features v2 — fake UIs + blobs dither, vidéos retirées"
```

---

### Task 4: Sections Proof (stats) + Team

**Files:**
- Modify: `site/src/lib/content.ts` (ajouter STATS, TEAM)
- Create: `site/src/sections/Proof.tsx`
- Create: `site/src/sections/Team.tsx`
- Create: `site/public/team/lucas.jpg`, `site/public/team/paul.jpg` (copies)
- Modify: `site/src/App.tsx`

**Interfaces:**
- Consumes: `SectionHeading`, `Reveal`, `Card`/`CardContent`, tokens.
- Produces: `Proof()` (id="proof") et `Team()` (id="equipe") montés dans App ; `STATS: { value: string; label: string }[]` et `TEAM: { name: string; role: string; bio: string; photo: string; links: { label: string; href: string }[] }[]` dans content.ts.

- [ ] **Step 1: Copier les photos**

```bash
mkdir -p site/public/team
cp images/lucas.jpg site/public/team/lucas.jpg
cp images/paul.jpg site/public/team/paul.jpg
```

- [ ] **Step 2: content.ts — STATS et TEAM**

Ajouter à `site/src/lib/content.ts` :

```ts
export const STATS = [
  { value: "7", label: "étapes automatisées" },
  { value: "9", label: "marchés supportés" },
  { value: "0", label: "ligne de code à écrire" },
  { value: "1-clic", label: "push Shopify" },
]

export const TEAM = [
  {
    name: "Lucas Cotelle",
    role: "Fondateur · 3 ans d'e-commerce",
    bio: "3 ans que je suis dans l'e-commerce : des dizaines de boutiques lancées, testées, scalées. Le testing produit me bouffait des semaines à chaque fois. J'ai construit ECOM AI BUILDER pour faire en 28 minutes ce que je faisais à la main. Et je documente tout, sans filtre, sur mes réseaux.",
    photo: "/team/lucas.jpg",
    links: [
      { label: "YouTube", href: "https://www.youtube.com/@lucascotelle" },
      { label: "Instagram", href: "https://www.instagram.com/lucascotelle_ecom/" },
      { label: "TikTok", href: "https://www.tiktok.com/@lucascotelle" },
    ],
  },
  {
    name: "Paul",
    role: "Co-builder · Automatisation & IA",
    bio: "L'automatisation et l'IA, c'est mon terrain. Avec Lucas, on a fait d'ECOM AI BUILDER une vraie infra qui tourne, pas un prompt ChatGPT déguisé. Chaque brique est testée pour sortir un résultat propre, à chaque build.",
    photo: "/team/paul.jpg",
    links: [{ label: "YouTube", href: "https://www.youtube.com/@paulautomatIA" }],
  },
]
```

- [ ] **Step 3: Proof.tsx**

`site/src/sections/Proof.tsx` :

```tsx
import { Reveal } from "@/components/Reveal"
import { STATS } from "@/lib/content"

export function Proof() {
  return (
    <section id="proof" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <Reveal>
        <div className="grid grid-cols-2 divide-y divide-border overflow-hidden rounded-xl border md:grid-cols-4 md:divide-x md:divide-y-0">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 px-4 py-6 text-center">
              <span className="font-display text-3xl font-bold text-primary sm:text-4xl">
                {stat.value}
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
```

Note : la grille 2x2 mobile avec `divide-y` n'est pas parfaite (la 2e cellule de
la 1re ligne n'a pas de bordure gauche) — si le screenshot montre une asymétrie
gênante, remplacer par `border` sur chaque cellule via
`class="border-b md:border-b-0 md:border-r last:border-0"` ajusté au rendu.

- [ ] **Step 4: Team.tsx**

`site/src/sections/Team.tsx` :

```tsx
import { Card, CardContent } from "@/components/ui/card"
import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { TEAM } from "@/lib/content"

export function Team() {
  return (
    <section id="equipe" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Qui est derrière"
        title="C'est pas un bot sorti de nulle part."
        description="Deux mecs, des vrais comptes, des vraies têtes. On utilise nous-mêmes l'outil tous les jours, et on est joignables."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {TEAM.map((member, i) => (
          <Reveal key={member.name} delay={i * 0.05}>
            <Card className="h-full">
              <CardContent className="flex h-full flex-col gap-5 p-6">
                <div className="flex items-center gap-4">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="size-14 rounded-full border object-cover"
                  />
                  <div>
                    <p className="font-display text-lg font-bold">{member.name}</p>
                    <p className="font-mono text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-pretty">{member.bio}</p>
                <div className="mt-auto flex flex-wrap gap-4">
                  {member.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener"
                      className="font-mono text-xs uppercase tracking-widest text-accent-soft underline-offset-4 transition-colors hover:text-foreground hover:underline"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Monter dans App**

Dans `site/src/App.tsx` : `<Proof />` juste après `<Features />` ;
`<Team />` juste après `<Testimonials />`. (Ordre cible complet de la page,
atteint en Task 5 : Hero, Features, Proof, HowItWorks, Testimonials, Team,
Offer, Faq, DownloadSection, FinalCta.)

- [ ] **Step 6: Vérifier build + screenshots**

```bash
cd site && npm run build
```
Attendu : exit 0.

Screenshots full-page 1440 + 390. Vérifier : bandeau 4 stats sous les features
(chiffres verts en display, labels mono), section équipe avec 2 cards (photos
rondes 56px, nom, rôle mono, bio, liens sociaux en mono vert clair), 2x2 puis
pile sur mobile, pas de débordement.

- [ ] **Step 7: Commit**

```bash
git add site/ && git commit -m "feat(site): sections proof (stats) + équipe"
```

---

### Task 5: Sections Offer + Download, liens Nav/Footer

**Files:**
- Modify: `site/src/lib/content.ts` (ajouter OFFER, DOWNLOAD_CARDS)
- Create: `site/src/sections/Offer.tsx`
- Create: `site/src/sections/DownloadSection.tsx`
- Modify: `site/src/sections/Nav.tsx`, `site/src/sections/Footer.tsx`, `site/src/App.tsx`

**Interfaces:**
- Consumes: `SectionHeading`, `Reveal`, `Card`/`CardContent`, `Button`, `LINKS`, lucide `Check`, `Download`.
- Produces: `Offer()` (id="offer") et `DownloadSection()` (id="download") montés dans App ; `OFFER: { included: string[]; cards: { title: string; description: string }[] }` et `DOWNLOAD_CARDS` dans content.ts.

- [ ] **Step 1: content.ts — OFFER et DOWNLOAD_CARDS**

Ajouter à `site/src/lib/content.ts` (après TEAM) :

```ts
export const OFFER = {
  included: [
    "Accès au Discord privé + au bot complet",
    "L'app desktop (macOS & Windows)",
    "Le pipeline complet : recherche produit → marque → charte → logo → images IA → push Shopify",
    "Le contrôle à chaque étape : tu valides sur Discord avant publication",
    "Les mises à jour incluses, en continu",
  ],
  cards: [
    {
      title: "Zéro risque",
      description:
        "Abonnement géré par Whop : tu résilies en 1 clic, quand tu veux. Pas de prise de tête.",
    },
    {
      title: "Tes données restent chez toi",
      description:
        "Tout tourne sur ta machine, avec ton propre Claude et tes propres clés. On ne stocke rien à ta place.",
    },
  ],
}

export const DOWNLOAD_CARDS = [
  {
    title: "macOS",
    subtitle: ".dmg · Apple Silicon & Intel",
    note: "Apple Silicon (M1+) ou Intel. Ouvre le .dmg, glisse l'app dans Applications.",
    buttons: [
      { label: "Mac Apple Silicon (M1+)", href: LINKS.macSilicon, primary: true },
      { label: "Mac Intel", href: LINKS.macIntel, primary: false },
    ],
  },
  {
    title: "Windows",
    subtitle: ".exe · installeur",
    note: "Windows 10/11 (x64). Lance l'installeur .exe et suis les étapes.",
    buttons: [{ label: "Télécharger pour Windows", href: LINKS.windows, primary: true }],
  },
]
```

(`LINKS` est déjà défini plus haut dans le même fichier — `DOWNLOAD_CARDS` doit
être déclaré après lui.)

- [ ] **Step 2: Offer.tsx**

`site/src/sections/Offer.tsx` :

```tsx
import { Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { OFFER } from "@/lib/content"

export function Offer() {
  return (
    <section id="offer" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="L'offre"
        title="Ce que tu obtiens, sans engagement."
        description="Un accès complet, pas un cours théorique. Tu installes, tu lances, tu testes — dès aujourd'hui."
      />
      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <Card className="h-full border-primary/25">
            <CardContent className="flex h-full flex-col gap-4 p-6">
              <span className="font-mono text-xs uppercase tracking-widest text-primary">
                Inclus dans ton accès
              </span>
              <ul className="flex flex-col gap-3">
                {OFFER.included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground/90">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Reveal>
        <div className="flex flex-col gap-6">
          {OFFER.cards.map((card, i) => (
            <Reveal key={card.title} delay={(i + 1) * 0.05} className="flex-1">
              <Card className="h-full">
                <CardContent className="flex h-full flex-col gap-3 p-6">
                  <h3 className="font-display text-lg font-bold">{card.title}</h3>
                  <p className="text-sm text-muted-foreground text-pretty">{card.description}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: DownloadSection.tsx**

`site/src/sections/DownloadSection.tsx` :

```tsx
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { DOWNLOAD_CARDS } from "@/lib/content"

export function DownloadSection() {
  return (
    <section id="download" className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="Télécharger" title="Télécharge l'app." />
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {DOWNLOAD_CARDS.map((card, i) => (
          <Reveal key={card.title} delay={i * 0.05}>
            <Card className="h-full">
              <CardContent className="flex h-full flex-col gap-4 p-6">
                <div>
                  <h3 className="font-display text-xl font-bold">{card.title}</h3>
                  <p className="font-mono text-xs text-muted-foreground">{card.subtitle}</p>
                </div>
                <div className="flex flex-col gap-2.5">
                  {card.buttons.map((btn) => (
                    <Button
                      key={btn.label}
                      asChild
                      variant={btn.primary ? "default" : "outline"}
                      className="w-full"
                    >
                      <a href={btn.href}>
                        <Download />
                        {btn.label}
                      </a>
                    </Button>
                  ))}
                </div>
                <p className="mt-auto text-xs text-muted-foreground text-pretty">{card.note}</p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Nav + Footer vers #download**

Dans `site/src/sections/Nav.tsx` : ajouter `<a href="#download" className="transition-colors hover:text-foreground">Télécharger</a>` dans le bloc de liens centraux (après FAQ).
Dans `site/src/sections/Footer.tsx` : dans la colonne « Produit », remplacer `{ label: "Télécharger", href: LINKS.macSilicon }` par `{ label: "Télécharger", href: "#download" }`.

- [ ] **Step 5: App.tsx — assemblage final**

`site/src/App.tsx` :

```tsx
import { Nav } from "@/sections/Nav"
import { Hero } from "@/sections/Hero"
import { Features } from "@/sections/Features"
import { Proof } from "@/sections/Proof"
import { HowItWorks } from "@/sections/HowItWorks"
import { Testimonials } from "@/sections/Testimonials"
import { Team } from "@/sections/Team"
import { Offer } from "@/sections/Offer"
import { Faq } from "@/sections/Faq"
import { DownloadSection } from "@/sections/DownloadSection"
import { FinalCta } from "@/sections/FinalCta"
import { Footer } from "@/sections/Footer"

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <Proof />
        <HowItWorks />
        <Testimonials />
        <Team />
        <Offer />
        <Faq />
        <DownloadSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}

export default App
```

- [ ] **Step 6: Vérifier build + screenshots**

```bash
cd site && npm run build
```
Attendu : exit 0.

Screenshots full-page 1440 + 390. Vérifier : ordre des sections conforme au
Step 5, offer en 2 colonnes (grande card verte bordée + 2 cards empilées),
download en 2 cards avec boutons pleins/outline, lien « Télécharger » dans la
nav, pile propre sur mobile.

- [ ] **Step 7: Commit**

```bash
git add site/ && git commit -m "feat(site): sections offre + téléchargement, liens nav/footer"
```

---

### Task 6: Passe cohérence + vérification finale prod

**Files:**
- Modify (si écarts détectés) : n'importe quel fichier de `site/src/`

**Interfaces:**
- Consumes: page complète (Tasks 1-5).
- Produces: page vérifiée aux deux breakpoints, build prod validé.

- [ ] **Step 1: Passe de cohérence**

Screenshots full-page dev à 1440 et 390. Passer chaque section contre cette
checklist et corriger les écarts :

- Rythme vertical homogène (`py-24` sections, `py-32` CTA final ; `Proof` en
  `pb-24` collé sous Features est voulu).
- Aucun débordement horizontal sur mobile (blobs dither compris).
- Un seul style d'eyebrow partout (premier mot surligné) — aucun eyebrow v1
  résiduel.
- Textures : DotPattern sur hero + CTA final ; DitherBlob sur features
  uniquement.
- Les 4 fake UIs lisibles à 390px (les colonnes internes passent en pile via
  leurs classes `sm:` — vérifier visuellement).
- Focus clavier visible sur les nouveaux liens/boutons (outline global).

- [ ] **Step 2: Vérification finale prod**

```bash
cd site && npm run build && npm run preview
```
Attendu : build exit 0. Screenshots full-page de `http://localhost:4173` (1440
et 390), rendu identique au dev. Arrêter le preview après.

- [ ] **Step 3: Commit**

```bash
git add site/ && git commit -m "feat(site): passe cohérence v2, page complète"
```
