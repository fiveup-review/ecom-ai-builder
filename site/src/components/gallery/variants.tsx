import { useEffect, useRef } from "react"
import { PhoneMock } from "@/components/gallery/PhoneMock"
import { GALLERY_STORES, type Store } from "@/components/gallery/stores"
import { cn } from "@/lib/utils"

// Alt descriptif uniquement quand une vraie capture est branchée (sinon wireframe).
const storeAlt = (s: Store) =>
  s.src ? `Boutique Shopify ${s.name} — ${s.niche}, générée par l'app` : ""

// Lueur verte de fond.
function Glow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]",
        className
      )}
    />
  )
}

// Rangée scrollable (mobile) : les 3 tels, centrée sur le tel du milieu au
// chargement (peek gauche/droite visible). Pas de label — juste les captures.
function MobileScroller() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const mid = track.children[Math.floor(track.children.length / 2)] as
      | HTMLElement
      | undefined
    if (!mid) return
    // Centre le tel du milieu dans le viewport (scroll instantané, snap le fige).
    track.scrollLeft = mid.offsetLeft - (track.clientWidth - mid.clientWidth) / 2
  }, [])

  return (
    <div
      ref={trackRef}
      className="flex snap-x snap-mandatory gap-4 overflow-x-auto scrollbar-none px-4 pb-2 sm:hidden"
    >
      {GALLERY_STORES.map((s, i) => (
        <div key={s.name} className="w-[62%] shrink-0 snap-center">
          <PhoneMock src={s.src} alt={storeAlt(s)} tint={s.tint} index={i} />
        </div>
      ))}
    </div>
  )
}

/* Éventail — tel central droit devant, 2 inclinés derrière, 2 extérieurs encore
   derrière (5 boutiques), fondu bas dans l'ombre. */
export function FanVariant() {
  const [farLeft, left, center, right, farRight] = GALLERY_STORES
  return (
    <div className="relative">
      <Glow />
      {/* desktop : éventail */}
      <div className="group relative hidden items-end justify-center py-6 sm:flex">
        <div className="z-0 hidden w-[176px] origin-bottom -rotate-[17deg] opacity-75 transition-transform duration-500 group-hover:-translate-x-9 group-hover:-rotate-[19deg] md:block md:w-[194px]">
          <PhoneMock src={farLeft.src} alt={storeAlt(farLeft)} tint={farLeft.tint} index={0} className="translate-y-12" />
        </div>
        <div className="z-10 -mx-6 w-[231px] origin-bottom -rotate-[9deg] opacity-90 transition-transform duration-500 group-hover:-translate-x-6 group-hover:-rotate-[11deg] md:w-[259px]">
          <PhoneMock src={left.src} alt={storeAlt(left)} tint={left.tint} index={1} className="translate-y-6" />
        </div>
        <div className="z-30 -mx-8 w-[253px] md:w-[286px]">
          <PhoneMock src={center.src} alt={storeAlt(center)} tint={center.tint} index={2} />
        </div>
        <div className="z-10 -mx-6 w-[231px] origin-bottom rotate-[9deg] opacity-90 transition-transform duration-500 group-hover:translate-x-6 group-hover:rotate-[11deg] md:w-[259px]">
          <PhoneMock src={right.src} alt={storeAlt(right)} tint={right.tint} index={3} className="translate-y-6" />
        </div>
        <div className="z-0 hidden w-[176px] origin-bottom rotate-[17deg] opacity-75 transition-transform duration-500 group-hover:translate-x-9 group-hover:rotate-[19deg] md:block md:w-[194px]">
          <PhoneMock src={farRight.src} alt={storeAlt(farRight)} tint={farRight.tint} index={4} className="translate-y-12" />
        </div>
        {/* fondu : les tels s'enfoncent dans l'ombre en bas.
            -bottom-12 pour couvrir les latéraux (translate-y + rotation les
            descendent sous la base, sinon leurs bas dépassent).
            PAS de stop intermédiaire (via-*) : sur les captures claires, le
            changement de pente au stop dessinait une ligne de démarcation. */}
        {/* -inset-x-16 (pas inset-x-0) : au hover les tels extérieurs glissent
            au-delà de la div -> le bord vertical du fondu se voyait dessus. */}
        <div className="pointer-events-none absolute -inset-x-16 -bottom-12 z-40 h-52 bg-gradient-to-t from-background to-transparent" />
      </div>
      <MobileScroller />
    </div>
  )
}
