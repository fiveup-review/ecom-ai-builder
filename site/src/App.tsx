import { Nav } from "@/sections/Nav"
import { Hero } from "@/sections/Hero"
import { Pipeline } from "@/sections/Pipeline"
import { DownloadBar } from "@/sections/DownloadBar"
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
        <Pipeline />
        <Testimonials />
        <DownloadBar />
        <Team />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}

export default App
