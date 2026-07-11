import { cn } from "@/lib/utils"

export function Eyebrow({ text }: { text: string }) {
  const [first, ...rest] = text.split(" ")
  return (
    <span className="font-mono text-xs font-medium uppercase tracking-[0.2em]">
      <span className="bg-primary/20 px-1.5 py-0.5 text-primary">{first}</span>
      {rest.length > 0 ? (
        <span className="ml-2 text-muted-foreground">{rest.join(" ")}</span>
      ) : null}
    </span>
  )
}

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
      <Eyebrow text={eyebrow} />
      <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-lg text-muted-foreground text-pretty">{description}</p>
      ) : null}
    </div>
  )
}
