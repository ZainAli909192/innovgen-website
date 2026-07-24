import { cn } from "@/lib/utils";

type ContainerProps = React.ComponentPropsWithoutRef<"div"> & {
  size?: "standard" | "wide" | "full";
};

export function Container({
  className,
  size = "standard",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-[var(--page-gutter)]",
        size === "standard" && "max-w-[var(--container-standard)]",
        size === "wide" && "max-w-[var(--container-wide)]",
        size === "full" && "max-w-none",
        className,
      )}
      {...props}
    />
  );
}
