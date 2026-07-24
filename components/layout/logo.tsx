import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="InnovGen home"
      className={cn("inline-flex min-h-11 items-center gap-3 font-display", className)}
    >
      <span
        aria-hidden="true"
        className="grid size-9 place-items-center rounded-lg bg-primary font-bold text-white shadow-[0_0_24px_rgb(47_130_245_/_30%)]"
      >
        IG
      </span>
      <span className="text-xl font-semibold tracking-tight">InnovGen</span>
    </Link>
  );
}
