import Image from "next/image";
import { threeConfig } from "@/config/three";
import type { ThreePauseReason } from "@/types/three";
import { cn } from "@/lib/utils";

export function CanvasFallback({
  className,
  description = threeConfig.fallback.description,
  posterSrc = threeConfig.fallback.posterSrc,
  reason,
  title = threeConfig.fallback.title,
}: {
  className?: string;
  description?: string;
  posterSrc?: string;
  reason?: ThreePauseReason;
  title?: string;
}) {
  return (
    <figure
      className={cn(
        "relative isolate h-[22rem] overflow-hidden rounded-xl border border-border bg-surface md:h-[30rem]",
        className,
      )}
      data-canvas-fallback={reason ?? "static"}
    >
      <Image
        src={posterSrc}
        alt=""
        fill
        priority={false}
        sizes="(max-width: 768px) 100vw, 1200px"
        className="object-cover"
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(transparent,rgb(7_20_38_/_92%))] p-6 pt-20 text-white md:p-8 md:pt-28">
        <p className="font-semibold">{title}</p>
        <p className="mt-2 max-w-2xl text-sm text-white/75">{description}</p>
      </figcaption>
    </figure>
  );
}
