import { cn } from "@/lib/utils"

// Téléphone wireframe réutilisable. Écran = placeholder skeleton d'une hero
// de boutique Shopify mobile (barre promo, header, hero, titre, CTA, réassurance).
// Le jour où les vraies captures existent : passer `src` -> l'img remplace le
// skeleton, zéro autre changement.

export type PhoneTint = "none" | "violet" | "teal" | "amber"

const TINTS: Record<
  PhoneTint,
  { bar: string; hero: string; strip: string; accent: string }
> = {
  none: {
    bar: "rgba(234,255,241,0.14)",
    hero: "linear-gradient(180deg, rgba(234,255,241,0.06), rgba(234,255,241,0.01))",
    strip: "rgba(234,255,241,0.03)",
    accent: "rgba(234,255,241,0.55)",
  },
  violet: {
    bar: "rgba(139,92,246,0.55)",
    hero: "linear-gradient(180deg, rgba(139,92,246,0.22), rgba(139,92,246,0.02))",
    strip: "rgba(139,92,246,0.10)",
    accent: "rgba(167,139,250,0.7)",
  },
  teal: {
    bar: "rgba(45,212,191,0.5)",
    hero: "linear-gradient(180deg, rgba(45,212,191,0.20), rgba(45,212,191,0.02))",
    strip: "rgba(45,212,191,0.10)",
    accent: "rgba(94,234,212,0.7)",
  },
  amber: {
    bar: "rgba(251,191,36,0.5)",
    hero: "linear-gradient(180deg, rgba(251,191,36,0.20), rgba(251,191,36,0.02))",
    strip: "rgba(251,191,36,0.10)",
    accent: "rgba(252,211,77,0.75)",
  },
}

// Largeurs de titre variées par index -> les 3 tels ne semblent pas dupliqués.
const TITLE_WIDTHS = [
  ["w-11/12", "w-3/4"],
  ["w-full", "w-2/3"],
  ["w-10/12", "w-4/6"],
]

function Bar({ className }: { className?: string }) {
  return <span className={cn("block rounded-full bg-white/25", className)} />
}

function WireScreen({ tint, index }: { tint: PhoneTint; index: number }) {
  const t = TINTS[tint]
  const [w1, w2] = TITLE_WIDTHS[index % TITLE_WIDTHS.length]
  return (
    <div className="flex h-full flex-col">
      {/* barre promo défilante */}
      <div className="h-4 w-full shrink-0" style={{ background: t.bar }} />

      {/* header : menu / logo / panier */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex flex-col gap-[3px]">
          <Bar className="h-[2px] w-3.5" />
          <Bar className="h-[2px] w-3.5" />
          <Bar className="h-[2px] w-3.5" />
        </div>
        <Bar className="h-2 w-14 bg-white/35" />
        <div className="size-3.5 rounded-[3px] border border-white/30" />
      </div>

      {/* hero image + copy en overlay bas */}
      <div className="relative flex-1 overflow-hidden" style={{ background: t.hero }}>
        {/* glyphe "image" au centre du hero */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex size-9 items-center justify-center rounded-lg border border-white/15">
            <svg viewBox="0 0 24 24" className="size-4 text-white/25" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          </div>
        </div>

        {/* dégradé pour asseoir la copy */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-3">
          {/* pill "formulé avec…" */}
          <span
            className="h-3.5 w-24 rounded-full border border-white/15"
            style={{ background: t.strip }}
          />
          {/* titre serif (2 lignes) */}
          <Bar className={cn("h-3 bg-white/75", w1)} />
          <Bar className={cn("h-3 bg-white/75", w2)} />
          {/* sous-titre */}
          <Bar className="h-1.5 w-full bg-white/25" />
          <Bar className="h-1.5 w-5/6 bg-white/25" />
          {/* CTA */}
          <div className="mt-1 grid h-7 w-full place-items-center rounded-full bg-white/85">
            <Bar className="h-1.5 w-1/2 bg-black/30" />
          </div>
          {/* réassurance : étoiles + note */}
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="size-1.5 rounded-[1px]"
                  style={{ background: t.accent }}
                />
              ))}
            </div>
            <Bar className="h-1.5 w-16 bg-white/25" />
          </div>
        </div>
      </div>

      {/* bandeau logos presse */}
      <div
        className="flex shrink-0 items-center justify-around px-3 py-2.5"
        style={{ background: t.strip }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <Bar key={i} className="h-1.5 w-8 bg-white/20" />
        ))}
      </div>
    </div>
  )
}

export function PhoneMock({
  src,
  alt = "",
  tint = "none",
  index = 0,
  className,
}: {
  src?: string
  alt?: string
  tint?: PhoneTint
  index?: number
  className?: string
}) {
  return (
    <div className={cn("relative aspect-[9/19] w-full select-none", className)}>
      {/* châssis */}
      <div className="absolute inset-0 rounded-[2.1rem] border border-white/[0.14] bg-[#0a0d0b] p-[3px] shadow-[0_35px_70px_-25px_rgba(0,0,0,0.9)] ring-1 ring-inset ring-white/[0.04]">
        {/* écran */}
        <div className="relative h-full w-full overflow-hidden rounded-[1.85rem] bg-[#080a09]">
          {src ? (
            <img
              src={src}
              alt={alt}
              width={640}
              height={1388}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <WireScreen tint={tint} index={index} />
          )}

          {/* dynamic island */}
          <div className="absolute left-1/2 top-2 z-10 h-4 w-14 -translate-x-1/2 rounded-full bg-black/85" />

          {/* reflet écran */}
          <div className="pointer-events-none absolute inset-0 rounded-[1.85rem] bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.06]" />
        </div>
      </div>
    </div>
  )
}
