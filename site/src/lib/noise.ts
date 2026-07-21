// Bruit de Perlin classique 2D (permutation + fade quintique) : assez pour un
// fbm animé, pas besoin de simplex. Permutation générée une fois au chargement
// du module via un PRNG à seed fixe -> motif déterministe, stable entre reloads.
const PERM_SIZE = 256
const perm = new Uint8Array(PERM_SIZE * 2)

function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rand = mulberry32(1337)
const base = Array.from({ length: PERM_SIZE }, (_, i) => i)
for (let i = PERM_SIZE - 1; i > 0; i--) {
  const j = Math.floor(rand() * (i + 1))
  ;[base[i], base[j]] = [base[j], base[i]]
}
for (let i = 0; i < PERM_SIZE * 2; i++) perm[i] = base[i % PERM_SIZE]

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10)
}

function lerp(a: number, b: number, t: number): number {
  return a + t * (b - a)
}

// 8 directions cardinales/diagonales : suffisant pour un gradient noise 2D lisse.
function grad(hash: number, x: number, y: number): number {
  switch (hash & 7) {
    case 0:
      return x + y
    case 1:
      return x - y
    case 2:
      return -x + y
    case 3:
      return -x - y
    case 4:
      return x
    case 5:
      return -x
    case 6:
      return y
    default:
      return -y
  }
}

/** Bruit de Perlin 2D, sortie approximativement dans [-1.4, 1.4]. */
export function noise2D(x: number, y: number): number {
  const X = Math.floor(x) & 255
  const Y = Math.floor(y) & 255
  const xf = x - Math.floor(x)
  const yf = y - Math.floor(y)
  const u = fade(xf)
  const v = fade(yf)

  const aa = perm[perm[X] + Y]
  const ab = perm[perm[X] + Y + 1]
  const ba = perm[perm[X + 1] + Y]
  const bb = perm[perm[X + 1] + Y + 1]

  const x1 = lerp(grad(aa, xf, yf), grad(ba, xf - 1, yf), u)
  const x2 = lerp(grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1), u)
  return lerp(x1, x2, v) * 1.8
}
