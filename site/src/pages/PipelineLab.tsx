import { Nav } from "@/sections/Nav"
import { Footer } from "@/sections/Footer"
import { Eyebrow } from "@/components/SectionHeading"
import { FeatureRows } from "@/components/pipeline/variants"

// Page interne de preview du design retenu pour la section Pipeline (non listée,
// non prerendue). Feature rows dans le style de la réf : texte / fenêtre alternés,
// fenêtres macOS + texture. Contenu = nos 4 étapes ecom, mockups réutilisés.
const VARIANTS = [
  {
    id: "A",
    name: "Feature rows",
    tradeoff:
      "Texte / fenêtre alternés, une étape par ligne. La réf. Narratif, aéré, chaque étape respire.",
    Comp: FeatureRows,
  },
]

export default function PipelineLab() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6">
        <div className="flex max-w-2xl flex-col gap-4">
          <Eyebrow text="Pipeline Preview" />
          <h1 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Design retenu.
          </h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Feature rows dans l'esprit de la réf : texte / fenêtre alternés, une
            étape par ligne. Même contenu (les 4 étapes), mockups d'app réutilisés.
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            En prod, le titre « Le pipeline · Une boutique complète, en 4 étapes »
            reste au-dessus. Dis-moi quand l'installer sur la home.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-8">
          {VARIANTS.map(({ id, name, tradeoff, Comp }) => (
            <section key={id} className="rounded-2xl border bg-card/40 p-5 sm:p-8">
              <div className="mb-8 flex items-start gap-4 border-b pb-5">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/15 font-mono text-sm font-bold text-primary">
                  {id}
                </span>
                <div className="flex flex-col gap-1">
                  <h2 className="font-display text-xl font-bold tracking-tight">{name}</h2>
                  <p className="text-sm text-muted-foreground text-pretty">{tradeoff}</p>
                </div>
              </div>
              <div className="py-4">
                <Comp />
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
