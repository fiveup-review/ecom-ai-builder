import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DotPattern } from "@/components/DotPattern"
import { Reveal } from "@/components/Reveal"
import { DiscordIcon } from "@/components/DiscordIcon"
import { LINKS } from "@/lib/content"

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-32">
      <DotPattern className="[mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]" />
      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-8 px-4 text-center sm:px-6">
        <Reveal>
          <h2 className="font-display text-4xl font-bold tracking-tight text-balance sm:text-6xl">
            Prêt à inonder le marché ?
          </h2>
        </Reveal>
        <Reveal delay={0.05} className="flex w-full max-w-md flex-col items-center gap-4">
          <Button asChild size="lg" className="h-14 w-full text-base">
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
          <Button asChild variant="secondary" size="lg" className="gap-2">
            <a href={LINKS.discord}>
              <DiscordIcon className="size-5" />
              Rejoindre la communauté Discord
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
