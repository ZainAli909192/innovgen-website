import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  className,
  as: Heading = "h2",
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <Heading id={id} className="text-[length:var(--text-h2)]">
        {title}
      </Heading>
      {description ? (
        <p className="mt-5 max-w-[65ch] text-lg text-muted">{description}</p>
      ) : null}
    </div>
  );
}
