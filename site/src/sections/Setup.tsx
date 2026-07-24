import type { ComponentType } from "react"
import { Check, Download, Rocket } from "lucide-react"
import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { SETUP_STEPS } from "@/lib/content"
import { cn } from "@/lib/utils"

// Connecteurs affichés dans l'artefact de l'étape 2 — mêmes logos que dans l'app.
const CONNECTORS = [
  { name: "Claude", icon: "/connectors/claude.svg", required: true },
  { name: "Higgsfield", icon: "/connectors/higgsfield.png", required: false },
  { name: "TrendTrack", icon: "/connectors/trendtrack.png", required: false },
]

function DownloadArt() {
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 p-4">
      <div className="flex items-center justify-between gap-3 rounded-lg border bg-secondary/50 px-3 py-2.5">
        <span className="flex min-w-0 items-center gap-2 font-mono text-xs text-foreground">
          <Download className="size-3.5 shrink-0 text-primary" />
          <span className="truncate">ECOM-AI-BUILDER.dmg</span>
        </span>
        <Check className="size-3.5 shrink-0 text-primary" />
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-full bg-primary" />
      </div>
      <div className="flex flex-wrap gap-1.5 font-mono text-[10px] uppercase tracking-widest">
        <span className="rounded bg-white/5 px-1.5 py-0.5 text-muted-foreground">macOS</span>
        <span className="rounded bg-white/5 px-1.5 py-0.5 text-muted-foreground">Windows</span>
        <span className="rounded bg-primary/15 px-1.5 py-0.5 text-primary">Sans carte</span>
      </div>
    </div>
  )
}

function ConnectArt() {
  return (
    <div className="flex h-full flex-col justify-center gap-2 p-4">
      {CONNECTORS.map((c) => (
        <div
          key={c.name}
          className={cn(
            "flex items-center gap-2.5 rounded-lg border px-3 py-2",
            c.required ? "border-primary/40 bg-primary/5" : "bg-secondary/50"
          )}
        >
          <img src={c.icon} alt="" className="size-4 shrink-0 rounded-[3px]" />
          <span className="font-sans text-sm text-foreground">{c.name}</span>
          {c.required ? (
            <span className="ml-auto flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-primary">
              <Check className="size-3" />
              Connecté
            </span>
          ) : (
            <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Optionnel
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

const LAUNCH_STAGES = [
  { label: "Marché", state: "done" },
  { label: "Noms", state: "done" },
  { label: "Charte", state: "active" },
  { label: "Logo", state: "todo" },
  { label: "Images", state: "todo" },
] as const

function LaunchArt() {
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 p-4">
      <div className="flex items-center gap-2">
        <span className="min-w-0 flex-1 truncate rounded-lg border bg-secondary/50 px-3 py-2 font-mono text-[11px] text-muted-foreground">
          aliexpress.com/item/1005006…
        </span>
        <span className="flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 py-2 font-mono text-xs font-medium text-primary-foreground">
          <Rocket className="size-3.5" />
          Lancer
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
        {LAUNCH_STAGES.map((s) => (
          <span
            key={s.label}
            className={cn(
              "flex items-center gap-1 rounded px-1.5 py-0.5",
              s.state === "done" && "bg-primary/15 text-primary",
              s.state === "active" && "border border-primary/40 text-foreground",
              s.state === "todo" && "bg-white/5 text-muted-foreground"
            )}
          >
            {s.state === "done" ? <Check className="size-2.5" /> : null}
            {s.label}
            {s.state === "active" ? "…" : ""}
          </span>
        ))}
      </div>
    </div>
  )
}

const STEP_ARTS: ComponentType[] = [DownloadArt, ConnectArt, LaunchArt]

export function Setup() {
  return (
    <section id="setup" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="En 3 étapes"
        title="Installée en 2 minutes."
        description="Aucun frais en plus de tes abonnements."
      />
      <div className="mt-16 grid gap-5 lg:grid-cols-3">
        {SETUP_STEPS.map((step, i) => {
          const Art = STEP_ARTS[i]
          return (
            <Reveal key={step.number} delay={i * 0.06}>
              <div className="flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary/40">
                <div className="min-h-40 flex-1 border-b bg-secondary/20">
                  <Art />
                </div>
                <div className="flex flex-col gap-2 p-5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-sm font-medium text-primary">
                      {step.number}
                    </span>
                    <h3 className="font-display text-lg font-bold tracking-tight">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground text-pretty">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
