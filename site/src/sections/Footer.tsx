import { Separator } from "@/components/ui/separator"
import { DiscordIcon } from "@/components/DiscordIcon"
import { LINKS } from "@/lib/content"

const COLUMNS = [
  {
    title: "Produit",
    links: [
      { label: "Avis", href: "/#avis" },
      { label: "Télécharger", href: LINKS.macSilicon },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Outils",
    links: [{ label: "Outils gratuits", href: "/outils/" }],
  },
  {
    title: "Communauté",
    links: [{ label: "Discord", href: LINKS.discord }],
  },
]

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="flex max-w-xs flex-col gap-3">
            <a href="/" className="flex items-center gap-2.5">
              <img src="/logo.png" alt="" width={28} height={28} className="size-7 rounded-md" />
              <span className="font-display text-sm font-bold tracking-wide">
                ECOM AI BUILDER
              </span>
            </a>
            <p className="text-sm text-muted-foreground">
              De l'idée produit à une boutique Shopify complète, piloté par l'IA.
            </p>
            <a
              href={LINKS.discord}
              className="mt-2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Discord"
            >
              <DiscordIcon className="size-5" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {col.title}
                </span>
                {col.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <Separator className="my-10" />
        <p className="font-mono text-xs text-muted-foreground">
          © 2026 ECOM AI BUILDER. Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}
