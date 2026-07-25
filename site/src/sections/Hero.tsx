import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AppWindow } from "@/components/AppWindow"
import { DotPattern } from "@/components/DotPattern"
import { Reveal } from "@/components/Reveal"
import { Eyebrow } from "@/components/SectionHeading"
import { DiscordIcon } from "@/components/DiscordIcon"
import { LINKS } from "@/lib/content"
import { HeroVideo } from "@/components/HeroVideo"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-24">
      <DotPattern />
      <div className="relative mx-auto flex max-w-[100rem] flex-col items-center gap-8 px-4 text-center sm:px-6">
        <Reveal delay={0.05} className="hero-rise">
          <Eyebrow text="Boutiques Shopify par IA" />
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="max-w-4xl font-display text-5xl font-bold tracking-tight text-balance sm:text-7xl">
            De la recherche produit à ta boutique Shopify complète,{" "}
            <span className="text-muted-foreground">pilotée par l'IA.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.12} className="hero-rise">
          <p className="max-w-2xl text-lg text-muted-foreground text-pretty sm:text-xl">
            Lance ta boutique Shopify en 10 minutes chrono.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="hero-rise flex flex-col items-center gap-3">
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
            <a href={LINKS.macIntel} className="inline-block py-2 underline underline-offset-4 hover:text-foreground">
              Mac Intel
            </a>{" "}
            ·{" "}
            <a href={LINKS.windows} className="inline-block py-2 underline underline-offset-4 hover:text-foreground">
              Windows
            </a>
          </p>
        </Reveal>
        <Reveal delay={0.28} className="hero-rise mt-8 w-full">
          <AppWindow title="ecom-ai-builder" className="w-full">
            <HeroVideo />
          </AppWindow>
        </Reveal>
      </div>
    </section>
  )
}
