// Affiliation : ?ref=<code> -> cookie eab_aff (90 j, .ecom-ai-builder.com)
// + beacon VISIT vers /i/e (proxifié serveur ; nom neutre, « track » est filtré
// par les adblockers). Le cookie est relu par le serveur au download (/i/dl/*)
// et au login de l'app (même navigateur, même domaine) -> attribution
// first-touch du compte, puis du paiement Whop. Fallback : le code est ajouté
// en ?ref= aux liens /i/dl/* au clic (cookie bloqué/expiré), et le serveur
// re-pose le cookie en HTTP (Safari ITP plafonne le JS à 7 j).
// Module CLIENT uniquement (importé par main.tsx, jamais par entry-server).

const CODE_RE = /^[a-z0-9_-]{2,32}$/

function readCookieCode(): string | null {
  const m = document.cookie.match(/(?:^|;\s*)eab_aff=([^;]+)/)
  if (!m) return null
  try {
    const code = decodeURIComponent(m[1]).trim().toLowerCase()
    return CODE_RE.test(code) ? code : null
  } catch {
    return null
  }
}

/** Capture au chargement : pose/rafraîchit le cookie, beacon VISIT si arrivée
 *  via ?ref=, et ajoute ?ref= aux liens /i/dl/* au clic (délégation globale,
 *  survit aux re-renders React). Best-effort intégral. */
export function captureAffiliate(): void {
  try {
    const fromUrl = new URLSearchParams(location.search).get("ref")
    const cleaned = (fromUrl ?? "").trim().toLowerCase()
    const code = (CODE_RE.test(cleaned) ? cleaned : null) ?? readCookieCode()
    if (!code) return

    let cookie = `eab_aff=${encodeURIComponent(code)}; max-age=7776000; path=/; SameSite=Lax`
    if (/ecom-ai-builder\.com$/.test(location.hostname))
      cookie += "; domain=.ecom-ai-builder.com; Secure"
    document.cookie = cookie

    // Fallback query sur les downloads si le cookie saute côté navigateur.
    document.addEventListener("click", (e) => {
      const a = (e.target as Element | null)?.closest?.('a[href^="/i/dl/"]')
      if (a && !a.getAttribute("href")!.includes("?"))
        a.setAttribute("href", `${a.getAttribute("href")}?ref=${encodeURIComponent(code)}`)
    })

    // Beacon VISIT uniquement sur une vraie arrivée via lien affilié.
    if (fromUrl) {
      const payload = JSON.stringify({ code })
      if (navigator.sendBeacon) navigator.sendBeacon("/i/e", payload)
      else void fetch("/i/e", { method: "POST", body: payload, keepalive: true }).catch(() => {})
    }
  } catch {
    /* le tracking ne doit jamais casser la page */
  }
}
