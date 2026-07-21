import { StrictMode } from 'react'
import type { ComponentType } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Pas de router : pages résolues par pathname (même logique que entry-server).
// Home = App (statique, hydratée au prerender). Les pages secondaires sont
// code-splittées (import dynamique) -> elles ne pèsent plus sur le bundle home.
const path = window.location.pathname.replace(/\/+$/, '')

async function resolvePage(): Promise<ComponentType> {
  if (path === '/outils') return (await import('./pages/Outils.tsx')).default
  if (path === '/pipeline') return (await import('./pages/PipelineLab.tsx')).default
  return App
}

const root = document.getElementById('root')!

resolvePage().then((Page) => {
  const app = (
    <StrictMode>
      <Page />
    </StrictMode>
  )
  // Build de prod : HTML prerendu (scripts/prerender.mjs) -> hydratation.
  // Dev / pages non prerendues : root vide -> rendu client classique.
  if (root.firstElementChild) {
    hydrateRoot(root, app)
  } else {
    createRoot(root).render(app)
  }
})
