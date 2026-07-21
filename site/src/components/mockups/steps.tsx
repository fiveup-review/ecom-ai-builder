import type { ComponentType } from "react"
import { AppWindow } from "@/components/AppWindow"
import { ResearchMock } from "@/components/mockups/ResearchMock"
import { BrandMock } from "@/components/mockups/BrandMock"
import { VisualsMock } from "@/components/mockups/VisualsMock"
import { ShopifyMock } from "@/components/mockups/ShopifyMock"

// Artefacts partagés par les 3 variantes de la page /pipeline :
// mockups placeholder en attendant les vrais visuels de l'app.
export const STEP_VISUALS: { window: string; Mock: ComponentType }[] = [
  { window: "recherche-produit", Mock: ResearchMock },
  { window: "identite-de-marque", Mock: BrandMock },
  { window: "images-ia", Mock: VisualsMock },
  { window: "push-shopify", Mock: ShopifyMock },
]

export function StepWindow({ index, className }: { index: number; className?: string }) {
  const { window: title, Mock } = STEP_VISUALS[index]
  return (
    <AppWindow title={title} className={className}>
      <Mock />
    </AppWindow>
  )
}
