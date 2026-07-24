import { cn } from "@/lib/utils";

type SectionProps = React.ComponentPropsWithoutRef<"section"> & {
  spacing?: "compact" | "default" | "spacious";
  tone?: "default" | "surface";
};

export function Section({
  className,
  spacing = "default",
  tone = "default",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        spacing === "compact" && "py-12 md:py-16",
        spacing === "default" && "py-16 md:py-24",
        spacing === "spacious" && "py-24 md:py-32",
        tone === "surface" && "border-y border-border bg-surface",
        className,
      )}
      {...props}
    />
  );
}
