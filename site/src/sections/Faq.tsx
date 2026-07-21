import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { FAQ_ITEMS } from "@/lib/content"

// JSON-LD FAQPage dérivé de FAQ_ITEMS : reste synchro avec l'accordéon affiché.
const FAQ_JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
})

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: FAQ_JSON_LD }}
      />
      <SectionHeading
        eyebrow="FAQ"
        title="Tout ce que tu te demandes avant de te lancer."
      />
      <Reveal className="mt-12">
        <Accordion type="single" collapsible className="w-full">
          {FAQ_ITEMS.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger className="text-left font-display text-base font-bold">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}
