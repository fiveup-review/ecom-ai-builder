import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { WavesPanel } from "@/components/WavesPanel"
import { PIPELINE_STEPS } from "@/lib/content"
import { StepWindow } from "@/components/mockups/steps"
import { cn } from "@/lib/utils"

const AUTOPLAY_MS = 6000

// Design « Studio » : onglets d'étapes auto-play au-dessus d'un viewer unique
// sur fond dither. Fenêtres SUPERPOSÉES (grid) -> hauteur stable, pas de CLS.
// Transitions en CSS (plus de framer-motion). Autoplay coupé sous
// prefers-reduced-motion, mis en pause au focus clavier, + bouton pause (WCAG 2.2.2).
export function Pipeline() {
  const [active, setActive] = useState(0)
  const [cycle, setCycle] = useState(0)
  const [focusPaused, setFocusPaused] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  const running = !reduced && !focusPaused

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setActive((a) => (a + 1) % PIPELINE_STEPS.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [cycle, running])

  const goTo = (i: number) => {
    setActive(i)
    setCycle((c) => c + 1)
  }

  const barFrozen = focusPaused

  return (
    <section
      id="pipeline"
      className="mx-auto max-w-6xl px-4 py-24 sm:px-6"
      onFocusCapture={() => setFocusPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocusPaused(false)
      }}
    >
      <SectionHeading
        eyebrow="La pipeline"
        title="Une boutique complète, en 4 étapes."
        description="L'app te guide étape par étape. Toi, tu te concentres sur ce qui vend."
      />

      <div className="mt-16 overflow-hidden rounded-xl border bg-card">
        {/* Onglets */}
        <div className="grid grid-cols-2 border-b lg:grid-cols-4">
          {PIPELINE_STEPS.map((step, i) => (
            <button
              key={step.number}
              type="button"
              onClick={() => goTo(i)}
              aria-current={active === i ? "step" : undefined}
              aria-controls="pipeline-viewer"
              className={cn(
                "relative flex flex-col gap-1 border-r px-5 py-4 text-left outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/50",
                "last:border-r-0 max-lg:even:border-r-0 max-lg:[&:nth-child(-n+2)]:border-b",
                active === i ? "bg-secondary/60" : "hover:bg-secondary/30"
              )}
            >
              <span
                className={cn(
                  "font-mono text-xs font-medium",
                  active === i ? "text-primary" : "text-muted-foreground"
                )}
              >
                {step.number}
              </span>
              <span
                className={cn(
                  "font-display text-sm font-bold tracking-tight sm:text-base",
                  active === i ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.title}
              </span>
              {/* Progression auto-play (CSS) */}
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-white/5">
                {active === i && !reduced ? (
                  <span
                    key={`${active}-${cycle}`}
                    className="block h-full bg-primary"
                    style={{
                      width: 0,
                      animation: `pipeline-progress ${AUTOPLAY_MS}ms linear forwards`,
                      animationPlayState: barFrozen ? "paused" : "running",
                    }}
                  />
                ) : null}
              </span>
            </button>
          ))}
        </div>

        {/* Viewer — hauteur fixe (fenêtres superposées). Décoratif -> aria-hidden. */}
        <WavesPanel className="px-5 py-10 sm:px-10 sm:py-14">
          <div id="pipeline-viewer" aria-hidden className="grid items-center">
            {PIPELINE_STEPS.map((step, i) => (
              <div
                key={step.number}
                className={cn(
                  "col-start-1 row-start-1 w-full min-w-0 transition-opacity duration-300 motion-reduce:transition-none",
                  active === i ? "opacity-100" : "pointer-events-none opacity-0"
                )}
              >
                <StepWindow index={i} className="mx-auto max-w-xl shadow-2xl shadow-black/60" />
              </div>
            ))}
          </div>
        </WavesPanel>

        {/* Description de l'étape active — superposée (hauteur stable, pas de CLS) */}
        <div className="border-t bg-background/90 px-5 py-5 sm:px-10">
          <div aria-hidden className="grid items-center">
            {PIPELINE_STEPS.map((step, i) => (
              <p
                key={step.number}
                className={cn(
                  "col-start-1 row-start-1 mx-auto max-w-2xl text-center text-sm text-muted-foreground text-pretty transition-opacity duration-200 motion-reduce:transition-none sm:text-base",
                  active === i ? "opacity-100" : "opacity-0"
                )}
              >
                <span className="mr-2 font-mono text-primary">{step.number}</span>
                {step.description}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Annonce lecteur d'écran uniquement (les descriptions visuelles sont aria-hidden). */}
      <span className="sr-only" aria-live="polite">
        Étape {PIPELINE_STEPS[active].number} : {PIPELINE_STEPS[active].title}.{" "}
        {PIPELINE_STEPS[active].description}
      </span>

      <Reveal className="mt-10 flex justify-center">
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
