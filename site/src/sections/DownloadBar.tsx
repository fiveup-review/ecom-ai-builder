import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/Reveal"
import { LINKS } from "@/lib/content"

export function DownloadBar() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-8 rounded-xl border bg-secondary/40 p-8 sm:p-10 md:flex-row md:items-center">
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Télécharge l'app maintenant.
            </h2>
            <p className="text-muted-foreground text-pretty">
              macOS et Windows. Le pipeline tourne sur ta machine.
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-2 md:items-end">
            <Button
              asChild
              size="lg"
              className="h-12 bg-white px-7 text-base text-black hover:bg-white/90"
            >
              <a href={LINKS.macSilicon}>
                <Download />
                Télécharger pour Mac
              </a>
            </Button>
            <p className="font-mono text-xs text-muted-foreground">
              Aussi pour{" "}
              <a href={LINKS.macIntel} className="underline underline-offset-4 hover:text-foreground">
                Mac Intel
              </a>{" "}
              ·{" "}
              <a href={LINKS.windows} className="underline underline-offset-4 hover:text-foreground">
                Windows
              </a>
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
