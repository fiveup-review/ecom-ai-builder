import { Nav } from "@/sections/Nav"
import { Hero } from "@/sections/Hero"
// SWITCH PIPELINE : « Studio » (onglets autoplay, actif) vs « Feature rows » (essai).
// Pour tester les rows : commenter Pipeline + <Pipeline />, décommenter PipelineRows
// + <PipelineRows />. Garder les deux paires cohérentes (import + usage).
import { Pipeline } from "@/sections/Pipeline"
// import { PipelineRows } from "@/sections/PipelineRows"
import { Setup } from "@/sections/Setup"
import { Gallery } from "@/sections/Gallery"
import { DownloadBar } from "@/sections/DownloadBar"
import { Testimonials } from "@/sections/Testimonials"
// import { Team } from "@/sections/Team"
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
        {/* <PipelineRows /> */}
        <Setup />
        <Gallery />
        <DownloadBar />
        <Testimonials />
        {/* <Team /> */}
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}

export default App
