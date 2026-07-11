import { Nav } from "@/sections/Nav"
import { Hero } from "@/sections/Hero"
import { Features } from "@/sections/Features"
import { Testimonials } from "@/sections/Testimonials"
import { HowItWorks } from "@/sections/HowItWorks"

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <HowItWorks />
      </main>
    </>
  )
}

export default App
