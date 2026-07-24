import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { DotPattern } from "@/components/DotPattern"
import { FanVariant } from "@/components/gallery/variants"

// Section « Galerie » : exemples de boutiques générées par l'app (mode wireframe).
// Layout retenu = Éventail (FanVariant). Le tel central affiche une vraie capture
// (public/galerie/ohmysmile.webp) ; les latéraux restent wireframe en attendant.
// Fond en points verts (DotPattern, full-bleed) pour casser le flat, comme le Hero.
export function Gallery() {
  return (
    <section id="galerie" className="relative overflow-hidden py-24">
      {/* Fondu vertical par-dessus le masque radial du DotPattern : évite la
          ligne nette où les points s'arrêtent en haut/bas de la section. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,#000_18%,#000_82%,transparent)]"
      >
        <DotPattern />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Nos boutiques"
          title="Des boutiques prêtes à vendre."
          description="Générées à 100 % par l'app. Lance ta pipeline pour obtenir le même résultat."
        />
        <Reveal className="mt-16">
          <FanVariant />
        </Reveal>
      </div>
    </section>
  )
}
