import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AppWindow } from "@/components/AppWindow"
import { DotPattern } from "@/components/DotPattern"
import { Reveal } from "@/components/Reveal"
import { DiscordIcon } from "@/components/DiscordIcon"
import { LINKS } from "@/lib/content"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-24">
      <DotPattern />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 text-center sm:px-6">
        <Reveal delay={0.05}>
          <h1 className="max-w-4xl font-display text-5xl font-bold tracking-tight text-balance sm:text-7xl">
            Pendant qu'ils testent 1 produit,{" "}
            <span className="text-muted-foreground">t'en testes 10.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-2xl text-lg text-muted-foreground text-pretty sm:text-xl">
            De la recherche produit à ta boutique Shopify complète, piloté par
            l'IA. Tu valides chaque étape, elle fait le reste.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="flex flex-col items-center gap-3">
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 px-7 text-base">
              <a href={LINKS.macSilicon}>
                <Download />
                Télécharger pour Mac
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-7 text-base">
              <a href={LINKS.discord}>
                <DiscordIcon className="size-5" />
                Rejoindre le Discord
              </a>
            </Button>
          </div>
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
        </Reveal>
        <Reveal delay={0.2} className="mt-8 w-full">
          <AppWindow title="ecom-ai-builder" className="w-full">
            <div className="flex aspect-[16/10] w-full items-center justify-center bg-secondary/30">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Aperçu de l'app à venir
              </span>
            </div>
          </AppWindow>
        </Reveal>
      </div>
    </section>
  )
}
