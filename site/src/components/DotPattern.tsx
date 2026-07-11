import { useId } from "react"
import { cn } from "@/lib/utils"

export function DotPattern({ className }: { className?: string }) {
  const id = useId()
  return (
    <svg
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full text-accent-dim/50",
        "[mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]",
        className
      )}
    >
      <defs>
        <pattern id={id} width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="2" height="2" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}
