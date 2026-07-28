"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { useSceneActivation } from "@/components/three/scene-section";
import { useDocumentVisibility } from "@/hooks/use-document-visibility";

export function HeroLogoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();
  const documentVisible = useDocumentVisibility();
  const { isSceneVisible } = useSceneActivation();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reduced) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    if (isSceneVisible && documentVisible) {
      void video.play().catch(() => {
        // The poster remains visible if a browser blocks autoplay.
      });
    } else {
      video.pause();
    }
  }, [documentVisible, isSceneVisible, reduced]);

  return (
    <video
      ref={videoRef}
      aria-hidden="true"
      autoPlay={!reduced}
      className="absolute inset-0 size-full object-contain"
      disablePictureInPicture
      loop
      muted
      playsInline
      preload="auto"
    >
      <source src="/logo_video.mp4" type="video/mp4" />
    </video>
  );
}
