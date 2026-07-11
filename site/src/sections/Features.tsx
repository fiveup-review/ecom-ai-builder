import { AppWindow } from "@/components/AppWindow"
import { Reveal } from "@/components/Reveal"
import { Eyebrow, SectionHeading } from "@/components/SectionHeading"
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
                <Eyebrow text={feature.eyebrow} />
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
