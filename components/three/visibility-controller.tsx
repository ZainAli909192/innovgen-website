"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

export function VisibilityController({ active }: { active: boolean }) {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    if (active) invalidate();
  }, [active, invalidate]);

  return null;
}
