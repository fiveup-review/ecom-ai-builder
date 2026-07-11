import { BadgeCheck, Star } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { TESTIMONIALS } from "@/lib/content"

function Stars() {
  return (
    <div className="flex gap-0.5 text-primary">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-3.5 fill-current" />
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section id="avis" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Ils l'utilisent"
        title="Des boutiques en ligne toutes les 30 minutes."
        description="Pas une démo, pas une promesse : un vrai outil que les membres lancent au quotidien. La boutique sort propre en 30 minutes, et eux gardent leur énergie pour le seul truc qui compte vraiment, aller chercher des clients."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => {
          const StatIcon: LucideIcon = t.statIcon
          return (
            <Reveal key={t.handle} delay={i * 0.05}>
              <Card className="h-full">
                <CardContent className="flex h-full flex-col gap-6 p-6">
                  <div className="flex items-center justify-between">
                    <Stars />
                    <span className="flex items-center gap-1 font-mono text-[11px] text-accent-soft">
                      <BadgeCheck className="size-3.5" />
                      Membre vérifié
                    </span>
                  </div>
                  <p className="flex-1 text-pretty text-foreground/90">
                    &laquo; {t.quote} &raquo;
                  </p>
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 font-mono text-xs text-primary">
                    <StatIcon className="size-3.5" />
                    {t.stat}
                  </span>
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt=""
                      className="size-10 rounded-full object-cover"
                    />
                    <p className="text-sm">
                      <span className="font-medium">{t.name}</span>
                      <span className="text-muted-foreground"> · @{t.handle}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
