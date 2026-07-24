"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { CanvasFallback } from "@/components/three/canvas-fallback";

type CanvasErrorBoundaryState = {
  hasError: boolean;
};

export class CanvasErrorBoundary extends Component<
  { children: ReactNode },
  CanvasErrorBoundaryState
> {
  state: CanvasErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): CanvasErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.error("InnovGen 3D canvas failed.", error, info.componentStack);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <CanvasFallback
          title="3D preview unavailable"
          description="The interactive preview could not start. The rest of the page remains fully available."
        />
      );
    }

    return this.props.children;
  }
}
