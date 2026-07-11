import { Nav } from "@/sections/Nav"
import { Hero } from "@/sections/Hero"
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
