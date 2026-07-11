import { Check } from "lucide-react"

export function ShopifyMock() {
  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="font-display text-base font-bold">
            Correcteur de posture Posturea™
          </span>
          <span className="font-mono text-sm text-accent-soft">29,90 €</span>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
          <span className="size-1.5 rounded-full bg-primary" />
          En ligne
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="h-2 w-full rounded bg-white/10" />
        <div className="h-2 w-4/5 rounded bg-white/10" />
        <div className="h-2 w-3/5 rounded bg-white/10" />
      </div>
      <div className="flex items-center justify-between gap-3 border-t pt-3">
        <span className="rounded-md bg-primary px-3 py-1.5 font-mono text-xs font-medium text-primary-foreground">
          Publier
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
          <Check className="size-3.5 text-primary" />
          Validé dans l'app
        </span>
      </div>
    </div>
  )
}
