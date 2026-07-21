import { WavesPanel } from "@/components/WavesPanel"
import { StepWindow } from "@/components/mockups/steps"
import { PIPELINE_STEPS } from "@/lib/content"
import { PIPELINE_EYEBROWS } from "@/components/pipeline/data"
import { cn } from "@/lib/utils"

// Eyebrow : « 01 / PRODUITS GAGNANTS »
function Eyebrow({ index }: { index: number }) {
  return (
    <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
      <span className="text-primary">{PIPELINE_STEPS[index].number}</span>
      <span className="mx-2 text-white/20">/</span>
      {PIPELINE_EYEBROWS[index]}
    </span>
  )
}

// Fenêtre macOS posée sur le fond de vagues animées (WavesPanel/DitherWaves),
// masqué en radial pour se fondre sur les bords + halo vert.
function MockStage({ index, className }: { index: number; className?: string }) {
  return (
    <div className={cn("relative isolate flex justify-center p-4 sm:p-8", className)}>
      <WavesPanel className="absolute inset-0 -z-10 rounded-2xl [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,#000_35%,transparent)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]"
      />
      <StepWindow index={index} className="w-full max-w-lg" />
    </div>
  )
}

/* Feature rows — texte / fenêtre alternés, une étape par ligne (la réf). */
export function FeatureRows() {
  return (
    <div className="flex flex-col gap-20 sm:gap-28">
      {PIPELINE_STEPS.map((step, i) => {
        const reverse = i % 2 === 1
        return (
          <div key={step.number} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <div className={cn("flex flex-col gap-4", reverse && "lg:order-2")}>
              <Eyebrow index={i} />
              <h3 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                {step.title}
              </h3>
              <p className="max-w-md text-lg text-muted-foreground text-pretty">
                {step.description}
              </p>
            </div>
            <div className={cn(reverse && "lg:order-1")}>
              <MockStage index={i} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
