import type { PhoneTint } from "@/components/gallery/PhoneMock"

// Boutiques RÉELLES générées par l'app (captures dans public/galerie/).
// Ajout : 1 image 640px de large dans public/galerie/ + 1 ligne ici.
// L'éventail desktop affiche les 5 (centre devant) ; le mobile scrolle tout.
export type Store = {
  name: string
  niche: string
  tint: PhoneTint
  src?: string
}

export const GALLERY_STORES: Store[] = [
  { name: "Soreva", niche: "Pilates à la maison", tint: "violet", src: "/galerie/soreva.jpg" },
  { name: "Velora", niche: "Soins cheveux", tint: "teal", src: "/galerie/velora.jpg" },
  { name: "Fresk", niche: "Ventilateur portable", tint: "amber", src: "/galerie/fresk.jpg" },
  { name: "Lumera", niche: "Skincare", tint: "amber", src: "/galerie/lumera.jpg" },
  { name: "Yavia", niche: "Box Pilates", tint: "violet", src: "/galerie/yavia.jpg" },
]
