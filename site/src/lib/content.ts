import { Zap, Palette, Clock } from "lucide-react"

export const LINKS = {
  macSilicon:
    "https://github.com/fiveup-review/ecom-ai-builder/releases/latest/download/ECOM-AI-BUILDER-macOS-AppleSilicon.dmg",
  macIntel:
    "https://github.com/fiveup-review/ecom-ai-builder/releases/latest/download/ECOM-AI-BUILDER-macOS-Intel.dmg",
  windows:
    "https://github.com/fiveup-review/ecom-ai-builder/releases/latest/download/ECOM-AI-BUILDER-Windows.exe",
  discord: "https://whop.com/joined/ecom-ai-builder/",
}

export const TESTIMONIALS = [
  {
    quote:
      "javais jamais cru qu'on pouvait sortir une boutique aussi vite franchement. la première était en ligne en meme pas 30min, du coup jai pu test genre 8 produits dans la semaine au lieu d'un seul. enorme",
    stat: "8 produits testés / semaine",
    statIcon: Zap,
    name: "Jules",
    handle: "jules",
    avatar: "/avatars/avis-jules.jpg",
  },
  {
    quote:
      "le truc ouf cest les visuels, ca sort direct propre. avant je payais un graphiste a chaque test la jai plus besoin. ca m'a clairement fait economiser pas mal",
    stat: "0 € de graphiste",
    statIcon: Palette,
    name: "Ruben",
    handle: "ruben",
    avatar: "/avatars/avis-ruben.jpg",
  },
  {
    quote:
      "jaime bien le fait de valider chaque etape sur discord, tu gardes la main et le support repond super vite quand tas une question. le temps que ca fait gagner cest pas croyable",
    stat: "~1 semaine de boulot gagnée",
    statIcon: Clock,
    name: "Mathis",
    handle: "mathis",
    avatar: "/avatars/avis-mathis.jpg",
  },
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

export const FAQ_ITEMS = [
  {
    question: "Faut-il savoir coder ?",
    answer:
      "Non. Tout se pilote depuis l'app. Aucune ligne de code à écrire.",
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
      "Oui. Chaque étape du pipeline attend ta validation dans l'app avant de continuer.",
  },
  {
    question: "Comment j'annule ?",
    answer: "Depuis ton espace Whop, en deux clics, quand tu veux.",
  },
]
