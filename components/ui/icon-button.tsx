import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type IconButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  label: string;
  variant?: "default" | "ghost";
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      label,
      variant = "default",
      className,
      children,
      type = "button",
      ...props
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        aria-label={label}
        className={cn(
          "inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-[var(--duration-fast)] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-45",
          variant === "default" &&
            "border border-border bg-surface-elevated hover:border-blue-300/50",
          variant === "ghost" && "hover:bg-white/8",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
