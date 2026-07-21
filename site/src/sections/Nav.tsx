import { useState } from "react"
import { Download, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LINKS } from "@/lib/content"

const NAV_LINKS = [
  { label: "Avis", href: "/#avis" },
  { label: "Outils", href: "/outils/" },
  { label: "FAQ", href: "/#faq" },
]

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="/" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="" width={28} height={28} className="size-7 rounded-md" />
          <span className="font-display text-sm font-bold tracking-wide">
            ECOM AI BUILDER
          </span>
        </a>
        <div className="flex items-center gap-3 md:gap-8">
          <div className="hidden items-center gap-8 font-mono text-xs uppercase tracking-widest text-muted-foreground md:flex">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-foreground">
                {l.label}
              </a>
            ))}
          </div>
          <Button asChild className="h-10">
            <a href={LINKS.macSilicon}>
              <Download />
              Télécharger
            </a>
          </Button>
          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid size-10 place-items-center rounded-md border text-muted-foreground transition-colors hover:text-foreground md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
      {/* Menu mobile */}
      {open ? (
        <div className="border-t bg-background/95 backdrop-blur-md md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b py-4 font-mono text-sm uppercase tracking-widest text-muted-foreground transition-colors last:border-b-0 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
