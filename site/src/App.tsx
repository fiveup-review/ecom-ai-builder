import { Nav } from "@/sections/Nav"
import { Hero } from "@/sections/Hero"
import {
  KillerFeatures,
  BeforeAfter,
  DemoResult,
  Stats,
  HowItWorks,
  Offer,
  DownloadSection,
} from "@/sections/Placeholders"
import { Testimonials } from "@/sections/Testimonials"
import { Team } from "@/sections/Team"
import { Faq } from "@/sections/Faq"
import { FinalCta } from "@/sections/FinalCta"
import { Footer } from "@/sections/Footer"

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <KillerFeatures />
        <BeforeAfter />
        <DemoResult />
        <Stats />
        <Testimonials />
        <HowItWorks />
        <Offer />
        <Team />
        <Faq />
        <DownloadSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}

export default App
