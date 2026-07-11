import { SectionHeading } from "@/components/SectionHeading"

function PlaceholderBox({ children }: { children: string }) {
  return (
    <div className="mx-auto mt-12 flex min-h-48 max-w-4xl items-center justify-center rounded-xl border border-dashed border-accent-dim/60 bg-secondary/30 px-6 py-12">
      <p className="max-w-xl text-center font-mono text-sm text-muted-foreground text-pretty">
        {children}
      </p>
    </div>
  )
}

export function KillerFeatures() {
  return (
    <section id="killer-features" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Killer features"
        title="Ce que l'app fait pour toi."
        description="La grosse section qui présente les killer features."
      />
      <PlaceholderBox>
        [PLACEHOLDER] Grille ou blocs des killer features — format à définir
        (bento, blocs alternés, cards…). Contenu : les 4-6 capacités phares de
        l'app avec visuel par feature.
      </PlaceholderBox>
    </section>
  )
}

export function BeforeAfter() {
  return (
    <section id="avant-apres" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Le problème"
        title="Tester un produit ne devrait pas prendre deux semaines."
      />
      <PlaceholderBox>
        [PLACEHOLDER] Comparatif avant/après en deux colonnes — « Sans l'app » :
        2 semaines, graphiste, thème à configurer… vs « Avec l'app » : 28
        minutes, tout généré, tu valides sur Discord.
      </PlaceholderBox>
    </section>
  )
}

export function DemoResult() {
  return (
    <section id="demo" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Le résultat"
        title="Voilà ce qui sort de l'app."
      />
      <PlaceholderBox>
        [PLACEHOLDER] Captures d'une vraie boutique générée (fiche produit,
        visuels IA, logo) et/ou lien vers une boutique démo live.
      </PlaceholderBox>
    </section>
  )
}

export function Stats() {
  return (
    <section id="proof" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <PlaceholderBox>
        [PLACEHOLDER] Bandeau 4 stats — 7 étapes automatisées · 9 marchés ·
        0 ligne de code · 1-clic push Shopify (ou vrais compteurs).
      </PlaceholderBox>
    </section>
  )
}

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Comment ça marche"
        title="Démarre en quelques minutes."
      />
      <PlaceholderBox>
        [PLACEHOLDER] 3 étapes : télécharge l'app → connecte Discord/Shopify →
        lance un build. Format à définir (timeline, terminal animé, stepper…).
      </PlaceholderBox>
    </section>
  )
}

export function Offer() {
  return (
    <section id="offer" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="L'offre"
        title="Ce que tu obtiens, sans engagement."
      />
      <PlaceholderBox>
        [PLACEHOLDER] Inclus dans ton accès (Discord privé + bot, app desktop,
        pipeline complet, mises à jour) + prix affiché + zéro risque
        (résiliation Whop 1 clic) + tes données restent chez toi.
      </PlaceholderBox>
    </section>
  )
}

export function DownloadSection() {
  return (
    <section id="download" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="Télécharger" title="Télécharge l'app." />
      <PlaceholderBox>
        [PLACEHOLDER] 2 cards : macOS (.dmg, boutons Apple Silicon + Intel) et
        Windows (.exe) avec notes d'installation.
      </PlaceholderBox>
    </section>
  )
}
