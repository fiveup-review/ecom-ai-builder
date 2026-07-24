import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { FeatureRows } from "@/components/pipeline/variants"

// Section « Pipeline » — variante Feature rows (le design retenu dans /pipeline).
// Texte / fenêtre macOS alternés, une étape par ligne. Testée à la place du
// design « Studio » (onglets autoplay) de Pipeline.tsx. Mêmes titre/eyebrow/CTA
// que l'ancienne section pour garder l'ancre #pipeline et le lien /outils/.
export function PipelineRows() {
  return (
    <section id="pipeline" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="La pipeline"
        title="Une boutique complète, en 4 étapes."
        description="L'app te guide étape par étape. Toi, tu te concentres sur ce qui vend."
      />

      <Reveal className="mt-16 sm:mt-20">
        <FeatureRows />
      </Reveal>

      <Reveal className="mt-16 flex justify-center">
        <Button asChild variant="outline" size="lg" className="h-12 px-7 text-base">
          <a href="/outils/">
            Nos outils gratuits
            <ArrowRight />
          </a>
        </Button>
      </Reveal>
    </section>
  )
}
