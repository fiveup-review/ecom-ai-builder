import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { TESTIMONIALS } from "@/lib/content"

export function Testimonials() {
  return (
    <section id="avis" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Ils l'utilisent"
        title="Des boutiques en ligne toutes les 30 minutes."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => {
          const StatIcon: LucideIcon = t.statIcon
          return (
            <Reveal key={t.handle} delay={i * 0.05}>
              <Card className="h-full">
                <CardContent className="flex h-full flex-col gap-6 p-6">
                  <p className="flex-1 text-pretty text-foreground/90">{t.quote}</p>
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 font-mono text-xs text-primary">
                    <StatIcon className="size-3.5" />
                    {t.stat}
                  </span>
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      width={96}
                      height={96}
                      loading="lazy"
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
