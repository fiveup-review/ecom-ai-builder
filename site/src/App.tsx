import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <Badge variant="outline" className="font-mono uppercase tracking-widest">
        Design system ok
      </Badge>
      <h1 className="font-display text-5xl font-bold">ECOM AI BUILDER</h1>
      <p className="text-muted-foreground">Corps de texte Inter.</p>
      <Button size="lg">Télécharger l'app</Button>
    </main>
  )
}

export default App
