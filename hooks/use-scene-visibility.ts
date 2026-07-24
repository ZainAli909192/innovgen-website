"use client";

import { useEffect, useRef, useState } from "react";
import { threeConfig } from "@/config/three";

export function useSceneVisibility<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      {
        threshold: threeConfig.visibility.threshold,
        rootMargin: threeConfig.visibility.rootMargin,
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
