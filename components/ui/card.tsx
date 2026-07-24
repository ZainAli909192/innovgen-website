import { cn } from "@/lib/utils";

type CardProps = React.ComponentPropsWithoutRef<"div"> & {
  interactive?: boolean;
};

export function Card({ className, interactive = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface p-6 shadow-[0_20px_60px_rgb(0_0_0_/_16%)]",
        interactive &&
          "transition-[border-color,background-color,box-shadow] duration-[var(--duration-standard)] hover:border-blue-300/40 hover:bg-surface-elevated",
        className,
      )}
      {...props}
    />
  );
}
