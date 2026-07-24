import type { PhoneTint } from "@/components/gallery/PhoneMock"

// 3 boutiques placeholder — noms/niches inventés pour donner de la variété.
// Remplace `src` par tes vraies captures hero quand elles seront prêtes.
export type Store = {
  name: string
  niche: string
  tint: PhoneTint
  src?: string
}

export const GALLERY_STORES: Store[] = [
  { name: "Nova", niche: "Skincare", tint: "violet" },
  { name: "Fresk", niche: "Ventilateur portable", tint: "amber", src: "/galerie/fresk.jpg" },
  { name: "Maison Lure", niche: "Déco maison", tint: "amber" },
]
