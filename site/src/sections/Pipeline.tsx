import { Suspense, lazy, useEffect, useRef, useState } from "react"
import { useReducedMotion } from "motion/react"
import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { PIPELINE_STEPS } from "@/lib/content"

// three.js pèse lourd : chargé seulement quand la section approche du viewport
const DitherWaves = lazy(() => import("@/components/DitherWaves"))

function useNearViewport<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [near, setNear] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          observer.disconnect()
        }
      },
      { rootMargin: "400px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return { ref, near }
}

export function Pipeline() {
  const reduced = useReducedMotion()
  const { ref, near } = useNearViewport<HTMLDivElement>()

  return (
    <section id="pipeline" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Le pipeline"
        title="Une boutique complète, en 4 étapes."
        description="L'app enchaîne tout le travail à ta place. Toi, tu valides."
      />
      <Reveal className="mt-16">
        <div
          ref={ref}
          className="relative overflow-hidden rounded-xl border bg-card"
        >
          <div aria-hidden className="absolute inset-0">
            {near ? (
              <Suspense fallback={null}>
                <DitherWaves
                  disableAnimation={!!reduced}
                  waveSpeed={0.03}
                  waveFrequency={2.6}
                  waveAmplitude={0.32}
                  pixelSize={2}
                />
              </Suspense>
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background/80" />
          </div>
          <div className="relative grid gap-4 p-6 sm:p-10 lg:grid-cols-4 lg:gap-5">
            {PIPELINE_STEPS.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.06}>
                <div className="flex h-full flex-col gap-3 rounded-lg border border-white/10 bg-background/75 p-5 backdrop-blur-md transition-colors hover:border-primary/40">
                  <span className="font-mono text-sm font-medium text-primary">
                    {step.number}
                  </span>
                  <h3 className="font-display text-lg font-bold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-pretty">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
