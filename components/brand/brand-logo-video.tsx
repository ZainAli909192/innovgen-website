"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { cn } from "@/lib/utils";

export function BrandLogoVideo({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "120px 0px", threshold: 0.05 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updatePlayback = () => {
      if (
        reducedMotion ||
        !visible ||
        document.visibilityState !== "visible"
      ) {
        video.pause();
        if (reducedMotion) video.currentTime = 0;
        return;
      }

      void video.play().catch(() => {
        // The browser keeps the first video frame visible if autoplay is blocked.
      });
    };

    updatePlayback();
    document.addEventListener("visibilitychange", updatePlayback);
    return () => document.removeEventListener("visibilitychange", updatePlayback);
  }, [reducedMotion, visible]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <video
        ref={videoRef}
        aria-hidden="true"
        autoPlay={!reducedMotion}
        disablePictureInPicture
        loop
        muted
        playsInline
        preload="auto"
        className="size-full object-contain"
      >
        <source src="/logo_video.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
