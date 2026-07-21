import { renderToString } from "react-dom/server"
import App from "./App"
import Outils from "./pages/Outils"
import PipelineLab from "./pages/PipelineLab"

// Rendu SSR utilisé UNIQUEMENT par scripts/prerender.mjs au build :
// le HTML complet est injecté dans dist/<route>/index.html pour que les
// crawlers sans JS (GPTBot, ClaudeBot, PerplexityBot…) voient le contenu.
// La résolution par pathname doit rester alignée avec src/main.tsx.
export function render(path: string): string {
  const normalized = path.replace(/\/+$/, "")
  const Page =
    normalized === "/outils" ? Outils : normalized === "/pipeline" ? PipelineLab : App
  return renderToString(<Page />)
}
