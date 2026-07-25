import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  imageClassName?: string;
  size?: number;
  priority?: boolean;
};

export function Logo({
  className,
  imageClassName,
  size = 56,
  priority = false,
}: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="InnovGen IT Software Solutions"
      className={cn(
        "inline-flex min-h-11 shrink-0 items-center rounded-full bg-white",
        className,
      )}
    >
      <video
        width={size}
        height={size}
        aria-hidden="true"
        autoPlay
        disablePictureInPicture
        loop
        muted
        playsInline
        preload="auto"
        className={cn("size-auto shrink-0 object-contain", imageClassName)}
      >
        <source src="/logo_video.mp4" type="video/mp4" />
      </video>
    </Link>
  );
}
