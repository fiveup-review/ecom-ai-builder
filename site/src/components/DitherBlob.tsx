import { useId } from "react"
import { cn } from "@/lib/utils"

const ROTATIONS = [0, 90, 180, 270] as const

export function DitherBlob({
  className,
  variant = 0,
}: {
  className?: string
  variant?: 0 | 1 | 2 | 3
}) {
  const id = useId()
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 600"
      className={cn("pointer-events-none absolute", className)}
    >
      <defs>
        <pattern id={`${id}-s`} width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="2.5" height="2.5" fill="currentColor" />
        </pattern>
        <pattern id={`${id}-m`} width="9" height="9" patternUnits="userSpaceOnUse">
          <rect width="2.5" height="2.5" fill="currentColor" />
        </pattern>
        <pattern id={`${id}-d`} width="5" height="5" patternUnits="userSpaceOnUse">
          <rect width="2" height="2" fill="currentColor" />
        </pattern>
      </defs>
      <g transform={`rotate(${ROTATIONS[variant]} 300 300)`}>
        <path
          fill={`url(#${id}-s)`}
          d="M317 41c96-27 214 24 240 128 26 104-38 168-15 252 23 84-77 148-183 137C253 547 96 522 62 424 28 326 116 270 92 186 68 102 221 68 317 41Z"
        />
        <path
          fill={`url(#${id}-m)`}
          d="M322 121c72-20 158 22 176 98 18 76-30 124-12 186 18 62-56 108-134 100-78-8-192-27-217-99-25-72 40-114 22-176-18-62 93-89 165-109Z"
        />
        <path
          fill={`url(#${id}-d)`}
          d="M328 208c48-13 102 17 113 66 11 49-21 79-9 119 12 40-37 69-88 63-51-6-124-19-140-65-16-46 27-73 15-113-12-40 61-57 109-70Z"
        />
      </g>
    </svg>
  )
}
