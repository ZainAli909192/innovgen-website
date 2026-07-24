import { Suspense, type ReactNode } from "react";

export function AssetLoader({ children }: { children: ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}
