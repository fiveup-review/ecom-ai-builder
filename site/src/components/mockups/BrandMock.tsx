import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const NAMES = [
  { name: "Posturea", selected: true },
  { name: "AlignCo", selected: false },
  { name: "Vertebra", selected: false },
]

const SWATCHES = ["#1a2e22", "#39ff5a", "#7dffa0", "#eafff1", "#93a89c"]

export function BrandMock() {
  return (
    <div className="grid gap-3 p-4 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Nom de marque
        </span>
        {NAMES.map((n) => (
          <div
            key={n.name}
            className={cn(
              "flex items-center justify-between rounded-lg border px-3 py-2 font-display text-sm font-bold",
              n.selected ? "border-primary/40 bg-primary/5 text-foreground" : "text-muted-foreground"
            )}
          >
            {n.name}
            {n.selected ? <Check className="size-3.5 text-primary" /> : null}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Palette
          </span>
          <div className="flex gap-1.5">
            {SWATCHES.map((c) => (
              <span key={c} className="size-7 rounded-md border" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Typographie
          </span>
          <span className="font-display text-lg font-bold">Space Grotesk</span>
          <span className="text-xs text-muted-foreground">Aa Bb Cc — 0123456789</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border bg-secondary/50 px-3 py-2">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary font-display text-sm font-bold text-primary-foreground">
            P
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Logo généré
          </span>
        </div>
      </div>
    </div>
  )
}
