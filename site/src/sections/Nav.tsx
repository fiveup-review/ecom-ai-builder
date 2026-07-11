import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LINKS } from "@/lib/content"

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2.5">
          <img src="/icon.png" alt="" className="size-7 rounded-md" />
          <span className="font-display text-sm font-bold tracking-wide">
            ECOM AI BUILDER
          </span>
        </a>
        <div className="flex items-center gap-8">
          <div className="hidden items-center gap-8 font-mono text-xs uppercase tracking-widest text-muted-foreground md:flex">
            <a href="#avis" className="transition-colors hover:text-foreground">
              Avis
            </a>
            <a href="/outils/" className="transition-colors hover:text-foreground">
              Outils
            </a>
            <a href="#faq" className="transition-colors hover:text-foreground">
              FAQ
            </a>
          </div>
          <Button asChild size="sm">
            <a href={LINKS.macSilicon}>
              <Download />
              Télécharger
            </a>
          </Button>
        </div>
      </nav>
    </header>
  )
}
