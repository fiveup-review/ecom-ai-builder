import { useEffect, useRef, useState, type ReactNode } from "react"
import DitherWaves from "@/components/DitherWaves"
import { cn } from "@/lib/utils"

export function useNearViewport<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [near, setNear] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          observer.disconnect()
        }
      },
      { rootMargin: "800px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return { ref, near }
}

/** Visibilité continue (avec marge) : pilote la pause de la boucle de rendu
 *  quand le panneau sort du viewport. */
function useInViewport(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "200px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
  return visible
}

/** Fondu d'apparition du canvas au montage — évite le « snap » quand le
 *  panneau entre dans la zone des 800px. */
function WavesFade({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 40)
    return () => clearTimeout(t)
  }, [])
  return (
    <div
      className={cn(
        "h-full w-full transition-opacity duration-700 ease-out",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      {children}
    </div>
  )
}

/** Panneau avec le fond dither animé (Canvas 2D, cf. DitherWaves) + overlay
 *  de lisibilité. */
export function WavesPanel({
  children,
  className,
  overlayClassName,
}: {
  children?: ReactNode
  className?: string
  overlayClassName?: string
}) {
  const { ref, near } = useNearViewport<HTMLDivElement>()
  const visible = useInViewport(ref)

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <div aria-hidden className="absolute inset-0">
        {near ? (
          <WavesFade>
            <DitherWaves
              waveSpeed={0.04}
              waveFrequency={2.6}
              waveAmplitude={0.32}
              pixelSize={2}
              paused={!visible}
            />
          </WavesFade>
        ) : null}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-b from-background/60 via-background/25 to-background/70",
            overlayClassName
          )}
        />
      </div>
      <div className="relative h-full w-full">{children}</div>
    </div>
  )
}
