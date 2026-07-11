import { Nav } from "@/sections/Nav"
import { Hero } from "@/sections/Hero"
import { Features } from "@/sections/Features"
import { Testimonials } from "@/sections/Testimonials"
import { HowItWorks } from "@/sections/HowItWorks"
import { Faq } from "@/sections/Faq"
import { FinalCta } from "@/sections/FinalCta"
import { Footer } from "@/sections/Footer"

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <HowItWorks />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}

export default App
