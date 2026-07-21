import { ArrowUpRight } from "lucide-react"
import { Nav } from "@/sections/Nav"
import { Footer } from "@/sections/Footer"
import { FinalCta } from "@/sections/FinalCta"
import { DotPattern } from "@/components/DotPattern"
import { Reveal } from "@/components/Reveal"
import { Eyebrow } from "@/components/SectionHeading"
import { TOOL_CATEGORIES, type ToolBadge } from "@/lib/tools"

function Badge({ badge }: { badge: ToolBadge }) {
  if (badge === "new") {
    return (
      <span className="rounded bg-primary/15 px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-widest text-primary">
        New
      </span>
    )
  }
  return (
    <span className="rounded bg-[#ffb547]/10 px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-widest text-[#ffb547]">
      Beta
    </span>
  )
}

export default function Outils() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-40 pb-16">
          <DotPattern />
          <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center sm:px-6">
            <Reveal delay={0.05}>
              <Eyebrow text="Free tools" />
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="max-w-3xl font-display text-4xl font-bold tracking-tight text-balance sm:text-6xl">
                La boîte à outils e-commerce{" "}
                <span className="text-muted-foreground">gratuite.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="max-w-xl text-lg text-muted-foreground text-pretty">
                Des outils pensés par des e-commerçants, pour des e-commerçants.
                Aucune inscription, 100 % gratuits.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Catégories d'outils */}
        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          {TOOL_CATEGORIES.map((cat) => (
            <div key={cat.label} className="mt-14 first:mt-0">
              <Reveal>
                <div className="flex items-center gap-4">
                  <h2 className="m-0">
                    <Eyebrow text={cat.label} />
                  </h2>
                  <span aria-hidden className="h-px flex-1 bg-border" />
                </div>
              </Reveal>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cat.tools.map((tool, i) => (
                  <Reveal key={tool.href} delay={i * 0.04} className="h-full">
                    <a
                      href={tool.href}
                      className="group flex h-full items-start gap-4 rounded-xl border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40"
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-lg border bg-secondary/50 text-primary">
                        <tool.icon className="size-5" />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col gap-1">
                        <h3 className="m-0 flex flex-wrap items-center gap-2 font-display text-base font-bold tracking-tight">
                          {tool.name}
                          {tool.badge ? <Badge badge={tool.badge} /> : null}
                        </h3>
                        <span className="text-sm text-muted-foreground text-pretty">
                          {tool.description}
                        </span>
                      </span>
                      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Même fin de page que la landing */}
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
