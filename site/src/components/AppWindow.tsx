import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function AppWindow({
  title,
  children,
  className,
}: {
  title?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border bg-card shadow-2xl shadow-black/60",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        {title ? (
          <span className="ml-3 rounded-md bg-white/5 px-2 py-0.5 font-mono text-xs text-muted-foreground">
            {title}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  )
}
