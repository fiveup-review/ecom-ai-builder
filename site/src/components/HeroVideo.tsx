import { useState } from "react"
import { Play } from "lucide-react"
import { HERO_VIDEO_URL } from "@/lib/content"

// Lecteur vidéo du Hero : poster local (frame extraite de la vidéo) + bouton
// play custom dans la DA du site. La vidéo (50 Mo, R2) n'est chargée qu'AU
// CLIC — zéro octet vidéo sur le chemin critique du LCP.
export function HeroVideo() {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <video
        src={HERO_VIDEO_URL}
        autoPlay
        controls
        playsInline
        className="aspect-video w-full bg-black object-contain"
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label="Lire la vidéo de présentation"
      className="group relative block aspect-video w-full cursor-pointer overflow-hidden bg-secondary/30"
    >
      <img
        src="/landing/hero-poster.jpg"
        alt=""
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/20" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_40px_rgba(57,255,90,0.45)] ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-110 sm:size-20">
          <Play className="ml-1 size-7 fill-current sm:size-8" />
        </span>
      </span>
    </button>
  )
}
