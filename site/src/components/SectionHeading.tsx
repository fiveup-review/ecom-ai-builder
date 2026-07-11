import { cn } from "@/lib/utils"

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string
  title: string
  description?: string
  align?: "center" | "left"
}) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center"
      )}
    >
      <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary">
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-lg text-muted-foreground text-pretty">{description}</p>
      ) : null}
    </div>
  )
}
