// Events pixels (Meta fbq + TikTok ttq, chargés par les snippets de index.html).
// LA conversion de la landing = le DOWNLOAD de l'app : chaque clic /i/dl/* tire
// Purchase (Meta) + CompletePayment (TikTok) — c'est l'event sur lequel les
// campagnes optimisent (même logique que l'ancienne landing, déplacée du CTA
// Whop vers le download). Module CLIENT uniquement (importé par main.tsx).
// Délégation globale : survit aux re-renders React.

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
    if (!href.startsWith("/i/dl/")) return
    const platform = href.slice(6).split("?")[0]
    window.fbq?.("track", "Purchase", { content_name: `download_${platform}`, value: 34.99, currency: "EUR" })
    window.ttq?.track("CompletePayment", { content_name: `download_${platform}`, value: 34.99, currency: "EUR" })
  })
}
