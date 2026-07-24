import {
  Clapperboard,
  Film,
  Frame,
  Images,
  Magnet,
  Package,
  Palette,
  Percent,
  QrCode,
  ShoppingCart,
  Shrink,
  Star,
  TrendingUp,
  Trophy,
  type LucideIcon,
} from "lucide-react"

// Hub /outils : mêmes outils que l'ancienne landing (outils/*.html, servis en
// statique sur le domaine), re-présentés dans le design du nouveau site.
export type ToolBadge = "beta" | "new"

export type Tool = {
  icon: LucideIcon
  name: string
  description: string
  href: string
  badge?: ToolBadge
}

export const TOOL_CATEGORIES: { label: string; tools: Tool[] }[] = [
  {
    label: "Recherche produit & scraping",
    tools: [
      {
        icon: Clapperboard,
        name: "Téléchargeur de vidéos",
        description: "TikTok sans filigrane, Reels & YouTube",
        href: "/outils/video-downloader.html",
        badge: "beta",
      },
      {
        icon: Images,
        name: "Images d'un site",
        description: "Extrais tous les visuels d'une page",
        href: "/outils/image-scraper.html",
        badge: "beta",
      },
      {
        icon: Trophy,
        name: "Produit gagnant",
        description: "Valide le potentiel de ton produit",
        href: "/outils/produit-gagnant.html",
      },
    ],
  },
  {
    label: "Finance & rentabilité",
    tools: [
      {
        icon: Percent,
        name: "Marge & profit",
        description: "Marge brute, nette, markup et profit réel",
        href: "/outils/calculateur-marge-profit.html",
      },
      {
        icon: TrendingUp,
        name: "ROAS Break-Even",
        description: "Ton seuil de rentabilité publicitaire",
        href: "/outils/calculateur-roas-break-even.html",
      },
      {
        icon: Package,
        name: "Dropshipping Profit",
        description: "Profit net réel produit + pub + fees",
        href: "/outils/calculateur-dropshipping-profit.html",
      },
      {
        icon: ShoppingCart,
        name: "Coût d'abandon de panier",
        description: "Combien tu perds, combien tu récupères",
        href: "/outils/cout-abandon-panier.html",
      },
    ],
  },
  {
    label: "Média & design",
    tools: [
      {
        icon: Palette,
        name: "Éditeur d'images",
        description: "Mini-Canva : calques texte, prix, logo sur tes visuels",
        href: "/outils/editeur-images.html",
        badge: "new",
      },
      {
        icon: Film,
        name: "Vidéo en GIF",
        description: "Convertis un extrait vidéo en GIF",
        href: "/outils/gif-maker.html",
        badge: "new",
      },
      {
        icon: Shrink,
        name: "Compresseur d'images",
        description: "Allège tes visuels, sans upload",
        href: "/outils/compresseur-image.html",
      },
      {
        icon: QrCode,
        name: "QR Code Generator",
        description: "QR codes pour packaging & promo",
        href: "/outils/qr-code-generator.html",
      },
      {
        icon: Star,
        name: "Favicon Generator",
        description: "Favicon multi-format en 1 clic",
        href: "/outils/favicon-generator.html",
      },
      {
        icon: Frame,
        name: "Safe Zone réseaux",
        description: "Formats & zones sûres Insta/TikTok",
        href: "/outils/safe-zone-reseaux.html",
      },
    ],
  },
  {
    label: "Contenu & ads",
    tools: [
      {
        icon: Magnet,
        name: "Hook Generator",
        description: "Accroches qui stoppent le scroll",
        href: "/outils/generateur-hooks.html",
      },
    ],
  },
]
