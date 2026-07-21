import { Check, FileArchive, FileSpreadsheet } from "lucide-react"

// Fichiers livrés par le build — équilibre aussi la hauteur de la fenêtre
// face au mockup images-ia dans la grille du pipeline.
const FILES = [
  { icon: FileArchive, name: "theme-posturea.zip", size: "4,2 Mo" },
  { icon: FileSpreadsheet, name: "produits-posturea.csv", size: "18 Ko" },
]

export function ShopifyMock() {
  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1">
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
      <div className="flex flex-col gap-2 border-t pt-3">
        {FILES.map((f) => (
          <div
            key={f.name}
            className="flex items-center gap-2.5 rounded-lg border bg-secondary/50 px-3 py-2 font-mono text-xs"
          >
            <f.icon className="size-3.5 shrink-0 text-primary" />
            <span className="min-w-0 truncate text-foreground">{f.name}</span>
            <span className="ml-auto shrink-0 text-muted-foreground">{f.size}</span>
          </div>
        ))}
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
