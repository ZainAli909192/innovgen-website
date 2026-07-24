import { cn } from "@/lib/utils";

type BadgeProps = React.ComponentPropsWithoutRef<"span"> & {
  variant?: "blue" | "gold" | "neutral";
};

export function Badge({
  className,
  variant = "blue",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider",
        variant === "blue" && "border-blue-300/30 bg-blue-600/15 text-blue-300",
        variant === "gold" && "border-gold-300/30 bg-gold-500/10 text-accent",
        variant === "neutral" && "border-border bg-white/5 text-muted",
        className,
      )}
      {...props}
    />
  );
}
