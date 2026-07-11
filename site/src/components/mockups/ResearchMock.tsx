import { TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const ROWS = [
  { name: "Correcteur de posture", niche: "Bien-être", score: 92, trend: "+318%", margin: "x4.2", winner: true },
  { name: "Lampe sunset projector", niche: "Déco", score: 81, trend: "+142%", margin: "x3.1", winner: false },
  { name: "Brosse vapeur textile", niche: "Maison", score: 74, trend: "+96%", margin: "x2.8", winner: false },
  { name: "Gourde infuseur fruits", niche: "Sport", score: 66, trend: "+61%", margin: "x2.4", winner: false },
]

export function ResearchMock() {
  return (
    <div className="flex flex-col gap-2 p-4 font-mono text-xs">
      <div className="flex items-center justify-between px-3 pb-2 text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>Produit</span>
        <span>Score / Tendance / Marge</span>
      </div>
      {ROWS.map((row) => (
        <div
          key={row.name}
          className={cn(
            "flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5",
            row.winner ? "border-primary/40 bg-primary/5" : "bg-secondary/50"
          )}
        >
          <div className="flex min-w-0 items-center gap-2">
            <span className="truncate font-sans text-sm text-foreground">{row.name}</span>
            <span className="hidden shrink-0 rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline">
              {row.niche}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <div className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-white/10 sm:block">
              <div className="h-full bg-primary" style={{ width: `${row.score}%` }} />
            </div>
            <span className="flex items-center gap-1 text-accent-soft">
              <TrendingUp className="size-3" />
              {row.trend}
            </span>
            <span className="text-muted-foreground">{row.margin}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
