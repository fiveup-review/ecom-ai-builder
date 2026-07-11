# Landing Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reconstruire la landing ECOM AI BUILDER en React avec un niveau d'exécution
"dev tool premium" (références : onorca.dev, superset.sh), en conservant l'identité
verte/terminal existante.

**Architecture:** SPA statique Vite + React + TS dans `site/` à la racine du repo.
L'ancien `index.html` reste intact. Une page unique composée de 8 sections, un
design system en tokens CSS (Tailwind v4 + shadcn/ui), tout le contenu placeholder
centralisé dans `site/src/lib/content.ts` (le texte sera réécrit plus tard).

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS v4, shadcn/ui,
lucide-react, Motion (`motion/react`), @fontsource (Inter, Space Grotesk,
JetBrains Mono).

## Global Constraints

- **Interdits : Lenis et GSAP.** Scroll natif. Animations : Motion + CSS uniquement.
- Palette conservée verbatim : fond `#050607`, texte `#eafff1`, accent `#39ff5a`,
  nuance claire `#7dffa0`, nuance sourde `#3c6e52`, texte secondaire `#93a89c`.
- Typo : Space Grotesk (titres), Inter (corps), JetBrains Mono (eyebrows/labels).
- Un seul rayon système : `--radius: 0.75rem` (`rounded-xl` et dérivés shadcn).
- Texture points : **hero et CTA final uniquement**.
- Tout le travail dans `site/`. Ne pas toucher `index.html`, `/outils`,
  `/outils-backend`, `vercel.json` (cutover hors périmètre).
- Copy en français, placeholder, centralisée dans `site/src/lib/content.ts`.
- Liens verbatim :
  - macOS Apple Silicon : `https://github.com/fiveup-review/ecom-ai-builder/releases/latest/download/ECOM-AI-BUILDER-macOS-AppleSilicon.dmg`
  - macOS Intel : `https://github.com/fiveup-review/ecom-ai-builder/releases/latest/download/ECOM-AI-BUILDER-macOS-Intel.dmg`
  - Windows : `https://github.com/fiveup-review/ecom-ai-builder/releases/latest/download/ECOM-AI-BUILDER-Windows.exe`
  - Discord/Whop : `https://whop.com/joined/ecom-ai-builder/`
- Pas de suite de tests sur ce projet (spec). Cycle de vérification par task :
  `npm run build` sans erreur + screenshot du dev server (1440 et 390 de large)
  vérifié visuellement contre les critères listés dans la task + commit.
- Screenshots : `npx capture-website-cli http://localhost:5173 --output=<scratchpad>/check-<task>.png --width=1440 --overwrite` (ajouter `--height=900` pour l'above-the-fold, `--full-page` pour la page entière, `--width=390` pour mobile). Lire l'image après capture.
- Dev server : `cd site && npm run dev` en arrière-plan (port 5173), le laisser
  tourner entre les tasks.

---

### Task 1: Scaffold Vite + Tailwind v4 + assets

**Files:**
- Create: `site/` (scaffold Vite complet)
- Modify: `site/vite.config.ts`, `site/tsconfig.json`, `site/tsconfig.app.json`
- Create: `site/public/videos/*.mp4`, `site/public/avatars/*.jpg`, `site/public/icon.png` (copies)

**Interfaces:**
- Produces: app Vite démarrable (`npm run dev`), alias `@/` → `site/src/`,
  plugin Tailwind v4 actif, assets publics disponibles sous `/videos/`,
  `/avatars/`, `/icon.png`.

- [ ] **Step 1: Scaffold Vite**

```bash
npm create vite@latest site -- --template react-ts
cd site && npm install
```

- [ ] **Step 2: Installer Tailwind v4**

```bash
cd site && npm install tailwindcss @tailwindcss/vite
npm install -D @types/node
```

- [ ] **Step 3: Configurer vite.config.ts (plugin + alias)**

Remplacer `site/vite.config.ts` par :

```ts
import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

- [ ] **Step 4: Ajouter les paths TS**

Dans `site/tsconfig.json`, ajouter au niveau racine du JSON :

```json
"compilerOptions": {
  "baseUrl": ".",
  "paths": { "@/*": ["./src/*"] }
}
```

Dans `site/tsconfig.app.json`, ajouter dans `compilerOptions` existant :

```json
"baseUrl": ".",
"paths": { "@/*": ["./src/*"] }
```

- [ ] **Step 5: Nettoyer le scaffold et brancher Tailwind**

Supprimer `site/src/App.css` et `site/src/assets/react.svg`.
Remplacer `site/src/index.css` par (provisoire, complété en Task 2) :

```css
@import "tailwindcss";
```

Remplacer `site/src/App.tsx` par :

```tsx
function App() {
  return (
    <main className="min-h-screen bg-black text-white">
      <h1 className="p-8 text-2xl font-bold">site ok</h1>
    </main>
  )
}

export default App
```

Dans `site/index.html` : remplacer le `<title>` par
`ECOM AI BUILDER — Boutiques Shopify générées par IA`, remplacer le favicon
`/vite.svg` par `/icon.png`, ajouter `class="dark"` sur `<html>` et
`lang="fr"`. Supprimer `site/public/vite.svg`.

- [ ] **Step 6: Copier les assets**

```bash
mkdir -p site/public/videos site/public/avatars
cp images/*.mp4 site/public/videos/
cp images/avis-*.jpg site/public/avatars/
cp icon.png site/public/icon.png
```

- [ ] **Step 7: Vérifier build + dev server**

```bash
cd site && npm run build
```
Attendu : exit 0, pas d'erreur TS.

```bash
cd site && npm run dev
```
(en arrière-plan) puis `curl -sI http://localhost:5173 | head -3` → `200 OK`.

- [ ] **Step 8: Commit**

```bash
git add site/ && git commit -m "feat(site): scaffold Vite + React + Tailwind v4, assets copiés"
```

---

### Task 2: shadcn/ui + design tokens + fonts

**Files:**
- Create: `site/components.json`, `site/src/lib/utils.ts`, `site/src/components/ui/{button,card,accordion,badge,separator}.tsx`
- Modify: `site/src/index.css`

**Interfaces:**
- Consumes: alias `@/` (Task 1).
- Produces: composants `Button`, `Card`, `CardContent`, `Accordion`,
  `AccordionItem`, `AccordionTrigger`, `AccordionContent`, `Badge`, `Separator`
  importables depuis `@/components/ui/*` ; `cn()` depuis `@/lib/utils` ; tokens
  Tailwind : `bg-background`, `text-foreground`, `text-muted-foreground`,
  `bg-primary`, `border-border`, `text-accent-dim`, `text-accent-soft`,
  `font-display`, `font-mono`, `font-sans`.

- [ ] **Step 1: Init shadcn et ajouter les composants**

```bash
cd site && npx shadcn@latest init --base-color neutral --yes
npx shadcn@latest add button card accordion badge separator --yes
npm install lucide-react motion
npm install @fontsource/inter @fontsource/space-grotesk @fontsource/jetbrains-mono
```

- [ ] **Step 2: Brander les tokens dans index.css**

Le init de shadcn a réécrit `site/src/index.css`. Le modifier ainsi :

En tête du fichier, après `@import "tailwindcss";` (et l'éventuel
`@import "tw-animate-css";` ajouté par shadcn, à conserver) :

```css
@import "@fontsource/inter/400.css";
@import "@fontsource/inter/500.css";
@import "@fontsource/space-grotesk/500.css";
@import "@fontsource/space-grotesk/700.css";
@import "@fontsource/jetbrains-mono/400.css";
@import "@fontsource/jetbrains-mono/500.css";
```

Remplacer le contenu du bloc `:root { ... }` généré par shadcn par (conserver
toute variable générée non listée ici, ex. `--chart-*`, `--sidebar-*`) :

```css
:root {
  --radius: 0.75rem;
  --background: #050607;
  --foreground: #eafff1;
  --card: #0a0d0b;
  --card-foreground: #eafff1;
  --popover: #0a0d0b;
  --popover-foreground: #eafff1;
  --primary: #39ff5a;
  --primary-foreground: #041008;
  --secondary: #0f1512;
  --secondary-foreground: #eafff1;
  --muted: #0f1512;
  --muted-foreground: #93a89c;
  --accent: #0f1512;
  --accent-foreground: #eafff1;
  --destructive: #ff5f57;
  --border: rgba(234, 255, 241, 0.08);
  --input: rgba(234, 255, 241, 0.12);
  --ring: #39ff5a;
}
```

Copier les mêmes valeurs dans le bloc `.dark { ... }` (thème unique sombre).

Dans le bloc `@theme inline { ... }` généré par shadcn, ajouter :

```css
  --color-accent-dim: #3c6e52;
  --color-accent-soft: #7dffa0;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Space Grotesk", var(--font-sans);
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
```

En fin de fichier, s'assurer que la base layer contient :

```css
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground font-sans antialiased;
  }
}
```

- [ ] **Step 3: Smoke test des tokens**

Remplacer `site/src/App.tsx` par :

```tsx
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <Badge variant="outline" className="font-mono uppercase tracking-widest">
        Design system ok
      </Badge>
      <h1 className="font-display text-5xl font-bold">ECOM AI BUILDER</h1>
      <p className="text-muted-foreground">Corps de texte Inter.</p>
      <Button size="lg">Télécharger l'app</Button>
    </main>
  )
}

export default App
```

- [ ] **Step 4: Vérifier build + screenshot**

```bash
cd site && npm run build
```
Attendu : exit 0.

Screenshot `http://localhost:5173` (1440x900). Vérifier : fond quasi noir,
titre en Space Grotesk bold, badge en JetBrains Mono, bouton vert `#39ff5a`
avec texte sombre, texte secondaire gris-vert.

- [ ] **Step 5: Commit**

```bash
git add site/ && git commit -m "feat(site): shadcn/ui + tokens de marque + fonts self-hosted"
```

---

### Task 3: Primitives (DotPattern, AppWindow, SectionHeading, Reveal, DiscordIcon) + contenu centralisé

**Files:**
- Create: `site/src/components/DotPattern.tsx`
- Create: `site/src/components/AppWindow.tsx`
- Create: `site/src/components/SectionHeading.tsx`
- Create: `site/src/components/Reveal.tsx`
- Create: `site/src/components/DiscordIcon.tsx`
- Create: `site/src/lib/content.ts`

**Interfaces:**
- Consumes: `cn()` de `@/lib/utils`, tokens Task 2.
- Produces (signatures exactes utilisées par les tasks 4-8) :
  - `DotPattern({ className?: string })` — texture points absolue, `aria-hidden`.
  - `AppWindow({ title?: string, children: ReactNode, className?: string })`.
  - `SectionHeading({ eyebrow: string, title: string, description?: string, align?: "center" | "left" })`.
  - `Reveal({ children: ReactNode, delay?: number, className?: string })`.
  - `DiscordIcon({ className?: string })`.
  - `content.ts` exporte : `LINKS` (`{ macSilicon, macIntel, windows, discord }`,
    valeurs verbatim des Global Constraints), `FEATURES`
    (`{ eyebrow, title, description, video }[]`), `TESTIMONIALS`
    (`{ quote, name, role, avatar }[]`), `STEPS` (`{ title, description }[]`),
    `FAQ_ITEMS` (`{ question, answer }[]`).

- [ ] **Step 1: DotPattern**

`site/src/components/DotPattern.tsx` :

```tsx
import { useId } from "react"
import { cn } from "@/lib/utils"

export function DotPattern({ className }: { className?: string }) {
  const id = useId()
  return (
    <svg
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full text-accent-dim/50",
        "[mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]",
        className
      )}
    >
      <defs>
        <pattern id={id} width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="2" height="2" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}
```

- [ ] **Step 2: AppWindow**

`site/src/components/AppWindow.tsx` :

```tsx
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function AppWindow({
  title,
  children,
  className,
}: {
  title?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border bg-card shadow-2xl shadow-black/60",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        {title ? (
          <span className="ml-3 rounded-md bg-white/5 px-2 py-0.5 font-mono text-xs text-muted-foreground">
            {title}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  )
}
```

- [ ] **Step 3: SectionHeading**

`site/src/components/SectionHeading.tsx` :

```tsx
import { cn } from "@/lib/utils"

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
      <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary">
        {eyebrow}
      </span>
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

- [ ] **Step 4: Reveal**

`site/src/components/Reveal.tsx` :

```tsx
import type { ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 5: DiscordIcon**

`site/src/components/DiscordIcon.tsx` :

```tsx
export function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}
```

- [ ] **Step 6: Contenu centralisé**

`site/src/lib/content.ts` :

```ts
export const LINKS = {
  macSilicon:
    "https://github.com/fiveup-review/ecom-ai-builder/releases/latest/download/ECOM-AI-BUILDER-macOS-AppleSilicon.dmg",
  macIntel:
    "https://github.com/fiveup-review/ecom-ai-builder/releases/latest/download/ECOM-AI-BUILDER-macOS-Intel.dmg",
  windows:
    "https://github.com/fiveup-review/ecom-ai-builder/releases/latest/download/ECOM-AI-BUILDER-Windows.exe",
  discord: "https://whop.com/joined/ecom-ai-builder/",
}

export const FEATURES = [
  {
    eyebrow: "Recherche produit",
    title: "Des produits gagnants, détectés pour toi.",
    description:
      "L'IA analyse les tendances du marché et te propose des produits à fort potentiel, avec les données pour décider.",
    video: "/videos/recherche.mp4",
  },
  {
    eyebrow: "Marque & identité",
    title: "Nom, persona, charte, logo.",
    description:
      "Analyse du marché, persona client, propositions de noms, couleurs, typographies et logo générés sur mesure.",
    video: "/videos/marque.mp4",
  },
  {
    eyebrow: "Visuels",
    title: "Des visuels prêts à vendre.",
    description:
      "Packshots, images d'ambiance et visuels de bénéfices générés par IA pour tout ton catalogue.",
    video: "/videos/visuels.mp4",
  },
  {
    eyebrow: "Mise en ligne Shopify",
    title: "Boutique livrée, thème et pages inclus.",
    description:
      "Fiches produits complètes, thème configuré, pages légales : ta boutique est en ligne, prête à encaisser.",
    video: "/videos/shopify.mp4",
  },
]

export const TESTIMONIALS = [
  {
    quote:
      "J'ai lancé trois boutiques la première semaine. Le temps gagné sur la partie marque et visuels est juste énorme.",
    name: "Jules",
    role: "E-commerçant",
    avatar: "/avatars/avis-jules.jpg",
  },
  {
    quote:
      "Le pipeline complet depuis Discord, c'est ce qui change tout. Je valide chaque étape sans toucher à rien d'autre.",
    name: "Mathis",
    role: "Dropshipper",
    avatar: "/avatars/avis-mathis.jpg",
  },
  {
    quote:
      "La qualité des fiches produits m'a surpris. C'est le premier outil qui sort un résultat que je mettrais en ligne tel quel.",
    name: "Ruben",
    role: "Media buyer",
    avatar: "/avatars/avis-ruben.jpg",
  },
]

export const STEPS = [
  {
    title: "Télécharge l'app",
    description: "macOS ou Windows. Le pipeline tourne sur ta machine.",
  },
  {
    title: "Connecte tes outils",
    description: "Discord, Shopify et tes accès IA, en quelques clics.",
  },
  {
    title: "Lance un build",
    description:
      "Tu valides chaque étape depuis Discord, l'IA fait le reste jusqu'à la boutique en ligne.",
  },
]

export const FAQ_ITEMS = [
  {
    question: "Faut-il savoir coder ?",
    answer:
      "Non. Tout se pilote depuis Discord et l'app. Aucune ligne de code à écrire.",
  },
  {
    question: "Ça me coûte quoi en plus de l'abonnement ?",
    answer:
      "Tes propres accès (Shopify, APIs IA). Tu gardes le contrôle total sur tes coûts.",
  },
  {
    question: "C'est safe pour ma boutique Shopify ?",
    answer:
      "Oui. L'app utilise les APIs officielles Shopify et tu valides chaque action avant qu'elle soit exécutée.",
  },
  {
    question: "Combien de boutiques je peux générer ?",
    answer: "Autant que tu veux. Aucune limite imposée par l'app.",
  },
  {
    question: "Sur quel système ça tourne ?",
    answer: "macOS (Apple Silicon et Intel) et Windows x64.",
  },
  {
    question: "Je garde le contrôle sur le résultat ?",
    answer:
      "Oui. Chaque étape du pipeline attend ta validation dans Discord avant de continuer.",
  },
  {
    question: "Comment j'annule ?",
    answer: "Depuis ton espace Whop, en deux clics, quand tu veux.",
  },
]
```

- [ ] **Step 7: Vérifier build**

```bash
cd site && npm run build
```
Attendu : exit 0. Le script build lance `tsc -b` qui type-checke tout `src/`,
y compris les fichiers pas encore importés dans `App.tsx` — les nouveaux
composants sont donc bien vérifiés.

- [ ] **Step 8: Commit**

```bash
git add site/ && git commit -m "feat(site): primitives design system + contenu placeholder centralisé"
```

---

### Task 4: Nav + Hero

**Files:**
- Create: `site/src/sections/Nav.tsx`
- Create: `site/src/sections/Hero.tsx`
- Modify: `site/src/App.tsx`

**Interfaces:**
- Consumes: `Button`, `Badge`, `AppWindow`, `DotPattern`, `Reveal`,
  `DiscordIcon`, `LINKS` (Task 3).
- Produces: composants `Nav()` et `Hero()` sans props, montés dans `App`.
  `App.tsx` devient l'assemblage final — chaque task suivante y ajoute sa section.

- [ ] **Step 1: Nav**

`site/src/sections/Nav.tsx` :

```tsx
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LINKS } from "@/lib/content"

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2.5">
          <img src="/icon.png" alt="" className="size-7 rounded-md" />
          <span className="font-display text-sm font-bold tracking-wide">
            ECOM AI BUILDER
          </span>
        </a>
        <div className="hidden items-center gap-8 font-mono text-xs uppercase tracking-widest text-muted-foreground md:flex">
          <a href="#features" className="transition-colors hover:text-foreground">
            Features
          </a>
          <a href="/outils/" className="transition-colors hover:text-foreground">
            Outils
          </a>
          <a href="#faq" className="transition-colors hover:text-foreground">
            FAQ
          </a>
        </div>
        <Button asChild size="sm">
          <a href={LINKS.macSilicon}>
            <Download />
            Télécharger
          </a>
        </Button>
      </nav>
    </header>
  )
}
```

- [ ] **Step 2: Hero**

`site/src/sections/Hero.tsx` :

```tsx
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AppWindow } from "@/components/AppWindow"
import { DotPattern } from "@/components/DotPattern"
import { Reveal } from "@/components/Reveal"
import { DiscordIcon } from "@/components/DiscordIcon"
import { LINKS } from "@/lib/content"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-24">
      <DotPattern />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 text-center sm:px-6">
        <Reveal>
          <Badge
            variant="outline"
            className="gap-2 border-primary/30 bg-primary/5 px-3 py-1 font-mono text-xs uppercase tracking-widest text-primary"
          >
            <span className="size-1.5 rounded-full bg-primary" />
            Piloté depuis Discord
          </Badge>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="max-w-4xl font-display text-5xl font-bold tracking-tight text-balance sm:text-7xl">
            Pendant qu'ils testent 1 produit,{" "}
            <span className="text-muted-foreground">t'en testes 10.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-2xl text-lg text-muted-foreground text-pretty sm:text-xl">
            De la recherche produit à ta boutique Shopify complète, piloté par
            l'IA. Tu valides chaque étape, elle fait le reste.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="flex flex-col items-center gap-3">
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 px-7 text-base">
              <a href={LINKS.macSilicon}>
                <Download />
                Télécharger pour Mac
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-7 text-base">
              <a href={LINKS.discord}>
                <DiscordIcon className="size-5" />
                Rejoindre le Discord
              </a>
            </Button>
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            Aussi pour{" "}
            <a href={LINKS.macIntel} className="underline underline-offset-4 hover:text-foreground">
              Mac Intel
            </a>{" "}
            ·{" "}
            <a href={LINKS.windows} className="underline underline-offset-4 hover:text-foreground">
              Windows
            </a>
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-8 w-full">
          <AppWindow title="ecom-ai-builder" className="mx-auto max-w-4xl">
            <video
              src="/videos/shopify.mp4"
              className="block aspect-video w-full object-cover"
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
            />
          </AppWindow>
        </Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Assembler dans App**

`site/src/App.tsx` :

```tsx
import { Nav } from "@/sections/Nav"
import { Hero } from "@/sections/Hero"

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
      </main>
    </>
  )
}

export default App
```

- [ ] **Step 4: Vérifier build + screenshots**

```bash
cd site && npm run build
```
Attendu : exit 0.

Screenshots 1440x900 et 390 de large. Vérifier : nav sticky avec blur et bordure
basse, badge eyebrow vert, titre XL avec seconde partie grisée, deux CTA côte à
côte (empilés sur mobile), note plateformes en mono, fenêtre d'app avec ronds
macOS et vidéo, texture points visible mais discrète derrière le hero.

- [ ] **Step 5: Commit**

```bash
git add site/ && git commit -m "feat(site): nav sticky + hero avec maquette produit"
```

---

### Task 5: Features

**Files:**
- Create: `site/src/sections/Features.tsx`
- Modify: `site/src/App.tsx`

**Interfaces:**
- Consumes: `SectionHeading`, `AppWindow`, `Reveal`, `FEATURES` (Task 3).
- Produces: `Features()` monté dans `App` après `Hero`.

- [ ] **Step 1: Features**

`site/src/sections/Features.tsx` :

```tsx
import { AppWindow } from "@/components/AppWindow"
import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { FEATURES } from "@/lib/content"
import { cn } from "@/lib/utils"

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Pipeline complet"
        title="De la recherche produit à ta boutique Shopify."
        description="Chaque étape est automatisée par l'IA et validée par toi, directement dans Discord."
      />
      <div className="mt-20 flex flex-col gap-24">
        {FEATURES.map((feature, i) => (
          <Reveal key={feature.eyebrow}>
            <div
              className={cn(
                "flex flex-col items-center gap-10 lg:gap-16",
                i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              )}
            >
              <div className="flex flex-1 flex-col gap-4">
                <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary">
                  {feature.eyebrow}
                </span>
                <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-pretty">
                  {feature.description}
                </p>
              </div>
              <AppWindow className="w-full flex-1">
                <video
                  src={feature.video}
                  className="block aspect-video w-full object-cover"
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                />
              </AppWindow>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Monter dans App**

Dans `site/src/App.tsx`, ajouter `import { Features } from "@/sections/Features"`
et `<Features />` après `<Hero />`.

- [ ] **Step 3: Vérifier build + screenshots**

```bash
cd site && npm run build
```
Attendu : exit 0.

Screenshot full-page 1440 + mobile 390. Vérifier : alternance gauche/droite des
4 blocs, eyebrows mono verts, vidéos dans des fenêtres d'app, pile simple sur
mobile, espacements réguliers entre blocs.

- [ ] **Step 4: Commit**

```bash
git add site/ && git commit -m "feat(site): section features en alternance texte/maquette"
```

---

### Task 6: Testimonials + How it works

**Files:**
- Create: `site/src/sections/Testimonials.tsx`
- Create: `site/src/sections/HowItWorks.tsx`
- Modify: `site/src/App.tsx`

**Interfaces:**
- Consumes: `Card`, `CardContent`, `SectionHeading`, `Reveal`, `TESTIMONIALS`,
  `STEPS` (Task 3).
- Produces: `Testimonials()` et `HowItWorks()` montés dans `App` après
  `Features`.

- [ ] **Step 1: Testimonials**

`site/src/sections/Testimonials.tsx` :

```tsx
import { Card, CardContent } from "@/components/ui/card"
import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { TESTIMONIALS } from "@/lib/content"

export function Testimonials() {
  return (
    <section id="avis" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Ils l'utilisent"
        title="Des boutiques en ligne toutes les 30 minutes."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.05}>
            <Card className="h-full">
              <CardContent className="flex h-full flex-col justify-between gap-6 p-6">
                <p className="text-pretty text-foreground/90">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt=""
                    className="size-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {t.role}
                    </p>
                  </div>
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

- [ ] **Step 2: HowItWorks**

`site/src/sections/HowItWorks.tsx` :

```tsx
import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { STEPS } from "@/lib/content"

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Comment ça marche"
        title="Démarre en quelques minutes."
      />
      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.05}>
            <div className="flex flex-col gap-4 border-t pt-6">
              <span className="font-mono text-sm text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl font-bold">{step.title}</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                {step.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Monter dans App**

Dans `site/src/App.tsx`, ajouter les imports et `<Testimonials />` puis
`<HowItWorks />` après `<Features />`.

- [ ] **Step 4: Vérifier build + screenshots**

```bash
cd site && npm run build
```
Attendu : exit 0.

Screenshot full-page 1440 + mobile 390. Vérifier : grille de 3 cards de même
hauteur avec avatars ronds, stepper 3 colonnes avec numéros mono verts et
bordure haute, pile simple sur mobile.

- [ ] **Step 5: Commit**

```bash
git add site/ && git commit -m "feat(site): témoignages en cards + stepper how-it-works"
```

---

### Task 7: FAQ + CTA final

**Files:**
- Create: `site/src/sections/Faq.tsx`
- Create: `site/src/sections/FinalCta.tsx`
- Modify: `site/src/App.tsx`

**Interfaces:**
- Consumes: `Accordion*`, `Button`, `DotPattern`, `Reveal`, `SectionHeading`,
  `DiscordIcon`, `FAQ_ITEMS`, `LINKS` (Task 3).
- Produces: `Faq()` et `FinalCta()` montés dans `App` après `HowItWorks`.

- [ ] **Step 1: Faq**

`site/src/sections/Faq.tsx` :

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { FAQ_ITEMS } from "@/lib/content"

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="FAQ"
        title="Tout ce que tu te demandes avant de te lancer."
      />
      <Reveal className="mt-12">
        <Accordion type="single" collapsible className="w-full">
          {FAQ_ITEMS.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger className="text-left font-display text-base font-bold">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}
```

- [ ] **Step 2: FinalCta**

`site/src/sections/FinalCta.tsx` :

```tsx
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DotPattern } from "@/components/DotPattern"
import { Reveal } from "@/components/Reveal"
import { DiscordIcon } from "@/components/DiscordIcon"
import { LINKS } from "@/lib/content"

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-32">
      <DotPattern className="[mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]" />
      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-8 px-4 text-center sm:px-6">
        <Reveal>
          <h2 className="font-display text-4xl font-bold tracking-tight text-balance sm:text-6xl">
            Prêt à inonder le marché ?
          </h2>
        </Reveal>
        <Reveal delay={0.05} className="flex w-full max-w-md flex-col items-center gap-4">
          <Button asChild size="lg" className="h-14 w-full text-base">
            <a href={LINKS.macSilicon}>
              <Download />
              Télécharger pour Mac
            </a>
          </Button>
          <p className="font-mono text-xs text-muted-foreground">
            Aussi pour{" "}
            <a href={LINKS.macIntel} className="underline underline-offset-4 hover:text-foreground">
              Mac Intel
            </a>{" "}
            ·{" "}
            <a href={LINKS.windows} className="underline underline-offset-4 hover:text-foreground">
              Windows
            </a>
          </p>
          <Button asChild variant="secondary" size="lg" className="gap-2">
            <a href={LINKS.discord}>
              <DiscordIcon className="size-5" />
              Rejoindre la communauté Discord
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Monter dans App**

Dans `site/src/App.tsx`, ajouter les imports et `<Faq />` puis `<FinalCta />`
après `<HowItWorks />`.

- [ ] **Step 4: Vérifier build + screenshots**

```bash
cd site && npm run build
```
Attendu : exit 0.

Screenshot full-page 1440 + mobile 390. Vérifier : accordion fonctionnel
(bordures fines, chevrons), CTA final avec texture points, bouton Download
pleine largeur, note plateformes, bouton Discord empilé dessous plus discret —
pattern de l'image de référence.

- [ ] **Step 5: Commit**

```bash
git add site/ && git commit -m "feat(site): FAQ accordion + CTA final empilé"
```

---

### Task 8: Footer + passe responsive/polish + vérification finale

**Files:**
- Create: `site/src/sections/Footer.tsx`
- Modify: `site/src/App.tsx`
- Modify (si écarts détectés) : n'importe quel fichier de `site/src/`

**Interfaces:**
- Consumes: `Separator`, `DiscordIcon`, `LINKS` (Tasks 2-3).
- Produces: page complète assemblée, vérifiée aux deux breakpoints.

- [ ] **Step 1: Footer**

`site/src/sections/Footer.tsx` :

```tsx
import { Separator } from "@/components/ui/separator"
import { DiscordIcon } from "@/components/DiscordIcon"
import { LINKS } from "@/lib/content"

const COLUMNS = [
  {
    title: "Produit",
    links: [
      { label: "Features", href: "#features" },
      { label: "Télécharger", href: LINKS.macSilicon },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Outils",
    links: [{ label: "Outils gratuits", href: "/outils/" }],
  },
  {
    title: "Communauté",
    links: [{ label: "Discord", href: LINKS.discord }],
  },
]

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="flex max-w-xs flex-col gap-3">
            <a href="#" className="flex items-center gap-2.5">
              <img src="/icon.png" alt="" className="size-7 rounded-md" />
              <span className="font-display text-sm font-bold tracking-wide">
                ECOM AI BUILDER
              </span>
            </a>
            <p className="text-sm text-muted-foreground">
              De l'idée produit à une boutique Shopify complète, piloté par l'IA.
            </p>
            <a
              href={LINKS.discord}
              className="mt-2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Discord"
            >
              <DiscordIcon className="size-5" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {col.title}
                </span>
                {col.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <Separator className="my-10" />
        <p className="font-mono text-xs text-muted-foreground">
          © 2026 ECOM AI BUILDER. Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Monter dans App (assemblage final)**

`site/src/App.tsx` final :

```tsx
import { Nav } from "@/sections/Nav"
import { Hero } from "@/sections/Hero"
import { Features } from "@/sections/Features"
import { Testimonials } from "@/sections/Testimonials"
import { HowItWorks } from "@/sections/HowItWorks"
import { Faq } from "@/sections/Faq"
import { FinalCta } from "@/sections/FinalCta"
import { Footer } from "@/sections/Footer"

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <HowItWorks />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}

export default App
```

- [ ] **Step 3: Passe responsive et cohérence**

Screenshots full-page à 1440 et 390 de large. Passer chaque section contre
cette checklist et corriger les écarts dans les fichiers concernés :

- Rythme vertical homogène (`py-24` sections, `py-32` CTA final).
- Aucun débordement horizontal sur mobile (vérifier les vidéos et la nav).
- Hiérarchie typographique : un seul style d'eyebrow, échelle h1 > h2 > h3
  cohérente.
- Tous les hover/focus states visibles au clavier (`outline-ring`).
- Textures points uniquement sur hero et CTA final.

- [ ] **Step 4: Vérification finale**

```bash
cd site && npm run build && npm run preview
```
Attendu : build exit 0. Screenshot full-page de `http://localhost:4173` (build
de prod, 1440 et 390). Vérifier le rendu identique au dev. Arrêter le preview.

- [ ] **Step 5: Commit**

```bash
git add site/ && git commit -m "feat(site): footer + passe responsive, page complète"
```
