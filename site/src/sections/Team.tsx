import { Card, CardContent } from "@/components/ui/card"
import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { TEAM } from "@/lib/content"

export function Team() {
  return (
    <section id="equipe" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Qui est derrière"
        title="C'est pas un bot sorti de nulle part."
        description="Deux mecs, des vrais comptes, des vraies têtes. On utilise nous-mêmes l'outil tous les jours, et on est joignables."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {TEAM.map((member, i) => (
          <Reveal key={member.name} delay={i * 0.05}>
            <Card className="h-full">
              <CardContent className="flex h-full flex-col gap-5 p-6">
                <div className="flex items-center gap-4">
                  <img
                    src={member.photo}
                    alt={member.name}
                    width={112}
                    height={112}
                    loading="lazy"
                    className="size-14 rounded-full border object-cover"
                  />
                  <div>
                    <p className="font-display text-lg font-bold">{member.name}</p>
                    <p className="font-mono text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-pretty">{member.bio}</p>
                <div className="mt-auto flex flex-wrap gap-4">
                  {member.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener"
                      className="font-mono text-xs uppercase tracking-widest text-accent-soft underline-offset-4 transition-colors hover:text-foreground hover:underline"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
