import type { CSSProperties, ReactNode } from "react"
import { useEffect, useRef } from "react"

// Reveal CSS-only, VISIBLE au SSR (aucun opacity:0 sérialisé au prerender).
// Le contenu above-the-fold (ex. H1 = LCP) est rendu visible dès le 1er paint.
// Seuls les éléments SOUS la ligne de flottaison au chargement sont masqués
// côté client puis animés à l'entrée dans le viewport. Respecte reduced-motion.
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // Déjà (au moins partiellement) visible au chargement -> on ne touche à rien.
    if (el.getBoundingClientRect().top < window.innerHeight) return

    // Sous la ligne de flottaison -> masquer puis animer à l'entrée.
    el.classList.add("reveal-init")
    const io = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-in")
          obs.disconnect()
        }
      },
      { rootMargin: "0px 0px -80px 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const style = delay
    ? ({ "--reveal-delay": `${delay}s` } as CSSProperties)
    : undefined

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}
