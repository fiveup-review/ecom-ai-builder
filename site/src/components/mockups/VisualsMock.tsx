import { Loader2, Sparkles } from "lucide-react"

const TILES = [
  "from-emerald-900/80 to-emerald-600/40",
  "from-teal-900/80 to-emerald-700/40",
  "from-green-950/90 to-teal-700/40",
  "from-emerald-950/90 to-green-600/30",
  "from-teal-950/80 to-green-700/40",
]

export function VisualsMock() {
  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="grid grid-cols-3 gap-2">
        {TILES.map((g, i) => (
          <div
            key={g}
            className={`flex aspect-square items-center justify-center rounded-lg border bg-gradient-to-br ${g}`}
          >
            <span className="font-mono text-[10px] text-white/40">IMG_{i + 1}</span>
          </div>
        ))}
        <div className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-primary/40">
          <Loader2 className="size-4 animate-spin text-primary" />
          <div className="h-1 w-10 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-2/3 bg-primary" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2 font-mono text-[11px] text-muted-foreground">
        <Sparkles className="size-3.5 shrink-0 text-primary" />
        <span className="truncate">packshot studio, fond crème, ombre douce, 4:5…</span>
      </div>
    </div>
  )
}
