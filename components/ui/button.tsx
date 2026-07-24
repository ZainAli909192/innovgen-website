import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonStyleProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: ButtonStyleProps = {}) {
  return cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-semibold transition-[color,background-color,border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-out)] disabled:pointer-events-none disabled:opacity-45",
    variant === "primary" &&
      "bg-primary text-white shadow-[0_10px_28px_rgb(47_130_245_/_22%)] hover:bg-[var(--primary-hover)]",
    variant === "secondary" &&
      "border border-border bg-surface-elevated text-foreground hover:border-blue-300/50 hover:bg-[var(--color-navy-800)]",
    variant === "ghost" && "text-foreground hover:bg-white/8",
    size === "sm" && "px-4 py-2 text-sm",
    size === "md" && "px-5 py-2.5",
    size === "lg" && "px-7 py-3 text-lg",
    className,
  );
}

type ButtonProps = ButtonStyleProps & {
  children: React.ReactNode;
  loading?: boolean;
  loadingLabel?: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  target?: string;
  rel?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  loadingLabel = "Loading",
  className,
  children,
  href,
  onClick,
  target,
  rel,
  disabled,
  type = "button",
}: ButtonProps) {
  const styles = buttonStyles({ variant, size, className });
  const content = loading ? (
    <>
      <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
      <span>{loadingLabel}</span>
    </>
  ) : (
    children
  );

  if (href) {
    return (
      <Link
        href={href}
        className={styles}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        target={target}
        rel={rel}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={styles}
      type={type}
      disabled={loading || disabled}
      aria-busy={loading || undefined}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
    >
      {content}
    </button>
  );
}
