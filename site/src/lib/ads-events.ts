// Events pixels (Meta fbq + TikTok ttq, chargés par les snippets de index.html).
// Porté de l'ancienne landing :
//   - clic vers Whop -> Purchase / CompletePayment (19,99 €).
//     ⚠️ ATTENTION (hérité) : l'event part au CLIC, pas au vrai paiement -> les
//     plateformes optimisent sur le clic et gonflent le ROAS. Pour un suivi
//     fiable, coller les pixels dans Whop : Dashboard > Checkout.
//   - NOUVEAU : clic download (/i/dl/*) -> Download (event standard TikTok,
//     custom Meta) — signal de conversion intermédiaire propre.
// Module CLIENT uniquement (importé par main.tsx). Délégation globale : survit
// aux re-renders React.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    ttq?: { track: (...args: unknown[]) => void }
  }
}

export function bindAdsEvents(): void {
  document.addEventListener("click", (e) => {
    const a = (e.target as Element | null)?.closest?.("a[href]")
    if (!a) return
    const href = a.getAttribute("href") ?? ""
    if (href.startsWith("/i/dl/")) {
      window.fbq?.("trackCustom", "Download", { content_name: href.slice(6).split("?")[0] })
      window.ttq?.track("Download", { content_name: href.slice(6).split("?")[0] })
    } else if (href.startsWith("https://whop.com/")) {
      window.fbq?.("track", "Purchase", { content_name: "whop_join", value: 19.99, currency: "EUR" })
      window.ttq?.track("CompletePayment", { content_name: "whop_join", value: 19.99, currency: "EUR" })
    }
  })
}
