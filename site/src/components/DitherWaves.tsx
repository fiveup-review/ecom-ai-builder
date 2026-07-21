// Fond dither animé — Canvas 2D pur (aucune dépendance WebGL/three.js).
// Même logique visuelle que la version reactbits d'origine : bruit fbm
// (déformation de domaine, façon "billowy") + tramage ordonné Bayer 8x8 +
// quantification des couleurs. Reproduite ici en JS/Canvas pour le coût :
// three + @react-three/fiber + postprocessing pesaient ~250 Ko gzip et
// tournaient un shader à pleine résolution ; ce composant calcule sur une
// grille réduite (résolution interne = la grille de tramage, mise à l'échelle
// via CSS + image-rendering:pixelated) et amortit le bruit sur une grille
// encore plus grossière, interpolée — le budget par frame reste de l'ordre du
// million d'opérations quel que soit la taille du panneau.
import { useEffect, useRef } from "react"
import { noise2D } from "@/lib/noise"

// Matrice de Bayer 8x8 (identique à la version shader, déjà divisée par 64).
const BAYER_8X8 = [
  0, 48 / 64, 12 / 64, 60 / 64, 3 / 64, 51 / 64, 15 / 64, 63 / 64,
  32 / 64, 16 / 64, 44 / 64, 28 / 64, 35 / 64, 19 / 64, 47 / 64, 31 / 64,
  8 / 64, 56 / 64, 4 / 64, 52 / 64, 11 / 64, 59 / 64, 7 / 64, 55 / 64,
  40 / 64, 24 / 64, 36 / 64, 20 / 64, 43 / 64, 27 / 64, 39 / 64, 23 / 64,
  2 / 64, 50 / 64, 14 / 64, 62 / 64, 1 / 64, 49 / 64, 13 / 64, 61 / 64,
  34 / 64, 18 / 64, 46 / 64, 30 / 64, 33 / 64, 17 / 64, 45 / 64, 29 / 64,
  10 / 64, 58 / 64, 6 / 64, 54 / 64, 9 / 64, 57 / 64, 5 / 64, 53 / 64,
  42 / 64, 26 / 64, 38 / 64, 22 / 64, 41 / 64, 25 / 64, 37 / 64, 21 / 64,
]

const OCTAVES = 4
// Cellules de tramage max par frame (borne le coût quelle que soit la taille
// du panneau) et pas de la grille de bruit (grossière, interpolée en bilinéaire
// vers la grille de tramage — le bruit lui-même n'a pas besoin de résolution fine).
const MAX_DITHER_CELLS = 90_000
const NOISE_STEP = 4

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v
}

interface DitherWavesProps {
  waveSpeed?: number
  waveFrequency?: number
  waveAmplitude?: number
  waveColor?: [number, number, number]
  colorNum?: number
  pixelSize?: number
  disableAnimation?: boolean
  enableMouseInteraction?: boolean
  mouseRadius?: number
  /** true = boucle de rendu coupée (section hors viewport) : 0 CPU/GPU. */
  paused?: boolean
}

export default function DitherWaves({
  waveSpeed = 0.04,
  waveFrequency = 3,
  waveAmplitude = 0.3,
  // Vert sourd de la marque (#3c6e52), le noir reste dominant
  waveColor = [0.24, 0.43, 0.32],
  colorNum = 4,
  pixelSize = 2,
  disableAnimation = false,
  enableMouseInteraction = false,
  mouseRadius = 0.8,
  paused = false,
}: DitherWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const controlsRef = useRef<{ start: () => void; stop: () => void } | null>(null)

  // Les derniers props sont lus par la boucle de rendu via cette ref : on évite
  // de recréer tout le setup (canvas, ResizeObserver) à chaque changement de prop.
  const propsRef = useRef({
    waveSpeed,
    waveFrequency,
    waveAmplitude,
    waveColor,
    colorNum,
    pixelSize,
    disableAnimation,
    enableMouseInteraction,
    mouseRadius,
  })
  propsRef.current = {
    waveSpeed,
    waveFrequency,
    waveAmplitude,
    waveColor,
    colorNum,
    pixelSize,
    disableAnimation,
    enableMouseInteraction,
    mouseRadius,
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return
    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    const reducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false

    let gridW = 0
    let gridH = 0
    let noiseGridW = 0
    let noiseGridH = 0
    let imageData: ImageData | null = null
    let noiseCache: Float32Array | null = null

    const mouse = { x: 0, y: 0, active: false }
    const timeRef = { value: 0 }
    const rafRef = { id: 0 }
    const lastTsRef = { value: null as number | null }

    function resize() {
      const rect = parent!.getBoundingClientRect()
      const cssW = Math.max(1, Math.round(rect.width))
      const cssH = Math.max(1, Math.round(rect.height))

      let ps = propsRef.current.pixelSize
      let w = Math.max(1, Math.round(cssW / ps))
      let h = Math.max(1, Math.round(cssH / ps))
      const cells = w * h
      if (cells > MAX_DITHER_CELLS) {
        ps *= Math.sqrt(cells / MAX_DITHER_CELLS)
        w = Math.max(1, Math.round(cssW / ps))
        h = Math.max(1, Math.round(cssH / ps))
      }

      gridW = w
      gridH = h
      noiseGridW = Math.max(2, Math.ceil(gridW / NOISE_STEP) + 1)
      noiseGridH = Math.max(2, Math.ceil(gridH / NOISE_STEP) + 1)
      canvas!.width = gridW
      canvas!.height = gridH
      imageData = ctx!.createImageData(gridW, gridH)
      noiseCache = new Float32Array(noiseGridW * noiseGridH)
    }

    // fbm(p) = somme de |bruit(p)| sur OCTAVES octaves, amplitude/fréquence
    // pilotées par les props -> même structure que le fbm GLSL d'origine.
    function fbmAt(x: number, y: number): number {
      let value = 0
      let amp = 1
      const freq = propsRef.current.waveFrequency
      let px = x
      let py = y
      for (let i = 0; i < OCTAVES; i++) {
        value += amp * Math.abs(noise2D(px, py))
        px *= freq
        py *= freq
        amp *= propsRef.current.waveAmplitude
      }
      return value
    }

    // pattern(p) = fbm(p + fbm(p - time*vitesse)) : déformation de domaine,
    // même formule que le shader d'origine.
    function patternAt(x: number, y: number, time: number): number {
      const speed = propsRef.current.waveSpeed
      const warp = fbmAt(x - time * speed, y - time * speed)
      return fbmAt(x + warp, y + warp)
    }

    function draw(time: number) {
      if (!imageData || !noiseCache || gridW === 0 || gridH === 0) return
      const { waveColor, colorNum, enableMouseInteraction, mouseRadius } = propsRef.current
      const aspect = gridW / gridH

      // 1) bruit sur la grille grossière
      for (let ny = 0; ny < noiseGridH; ny++) {
        for (let nx = 0; nx < noiseGridW; nx++) {
          let u = (nx * NOISE_STEP) / gridW - 0.5
          const v = (ny * NOISE_STEP) / gridH - 0.5
          u *= aspect
          noiseCache[ny * noiseGridW + nx] = patternAt(u, v, time)
        }
      }

      // 2) tramage + quantification par cellule, avec interpolation bilinéaire
      // de la grille de bruit vers la grille de tramage (fine).
      const data = imageData.data
      const [wr, wg, wb] = waveColor
      const step = 1 / (colorNum - 1)
      const bias = 0.2

      for (let y = 0; y < gridH; y++) {
        const gy = y / NOISE_STEP
        const y0 = Math.min(noiseGridH - 1, Math.floor(gy))
        const y1 = Math.min(noiseGridH - 1, y0 + 1)
        const fy = gy - y0
        const by = y & 7

        for (let x = 0; x < gridW; x++) {
          const gx = x / NOISE_STEP
          const x0 = Math.min(noiseGridW - 1, Math.floor(gx))
          const x1 = Math.min(noiseGridW - 1, x0 + 1)
          const fx = gx - x0

          const n00 = noiseCache[y0 * noiseGridW + x0]
          const n10 = noiseCache[y0 * noiseGridW + x1]
          const n01 = noiseCache[y1 * noiseGridW + x0]
          const n11 = noiseCache[y1 * noiseGridW + x1]
          const nx0 = n00 + (n10 - n00) * fx
          const nx1 = n01 + (n11 - n01) * fx
          let f = nx0 + (nx1 - nx0) * fy

          if (enableMouseInteraction && mouse.active) {
            let u = x / gridW - 0.5
            const v = y / gridH - 0.5
            u *= aspect
            const dist = Math.hypot(u - mouse.x, v - mouse.y)
            const t = clamp01(1 - dist / mouseRadius)
            f -= 0.5 * t * t * (3 - 2 * t)
          }

          const threshold = BAYER_8X8[by * 8 + (x & 7)] - 0.25

          const idx = (y * gridW + x) * 4
          data[idx] =
            Math.floor(
              (clamp01(wr * f + threshold * step - bias) * (colorNum - 1) + 0.5)
            ) *
            step *
            255
          data[idx + 1] =
            Math.floor(
              (clamp01(wg * f + threshold * step - bias) * (colorNum - 1) + 0.5)
            ) *
            step *
            255
          data[idx + 2] =
            Math.floor(
              (clamp01(wb * f + threshold * step - bias) * (colorNum - 1) + 0.5)
            ) *
            step *
            255
          data[idx + 3] = 255
        }
      }
      ctx!.putImageData(imageData, 0, 0)
    }

    function loop(ts: number) {
      if (lastTsRef.value == null) lastTsRef.value = ts
      const dt = (ts - lastTsRef.value) / 1000
      lastTsRef.value = ts
      if (!propsRef.current.disableAnimation && !reducedMotion) {
        timeRef.value += dt
      }
      draw(timeRef.value)
      rafRef.id = requestAnimationFrame(loop)
    }

    function start() {
      if (rafRef.id) return
      const staticFrame = propsRef.current.disableAnimation || reducedMotion
      if (staticFrame) {
        draw(timeRef.value)
        return
      }
      lastTsRef.value = null
      rafRef.id = requestAnimationFrame(loop)
    }

    function stop() {
      if (rafRef.id) {
        cancelAnimationFrame(rafRef.id)
        rafRef.id = 0
      }
    }

    function handlePointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      const aspect = gridW / gridH
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * aspect
      mouse.y = (e.clientY - rect.top) / rect.height - 0.5
      mouse.active = true
    }
    function handlePointerLeave() {
      mouse.active = false
    }

    resize()
    draw(timeRef.value)
    controlsRef.current = { start, stop }

    const ro = new ResizeObserver(() => {
      resize()
      draw(timeRef.value)
    })
    ro.observe(parent)

    canvas.addEventListener("pointermove", handlePointerMove)
    canvas.addEventListener("pointerleave", handlePointerLeave)

    if (!paused) start()

    return () => {
      stop()
      ro.disconnect()
      canvas.removeEventListener("pointermove", handlePointerMove)
      canvas.removeEventListener("pointerleave", handlePointerLeave)
      controlsRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- setup mount-only, `paused` géré par l'effet ci-dessous
  }, [])

  // `paused` pilote juste start/stop de la boucle déjà en place (pas de
  // re-setup du canvas/ResizeObserver à chaque bascule viewport).
  useEffect(() => {
    if (!controlsRef.current) return
    if (paused) controlsRef.current.stop()
    else controlsRef.current.start()
  }, [paused])

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      style={{ imageRendering: "pixelated" }}
    />
  )
}
