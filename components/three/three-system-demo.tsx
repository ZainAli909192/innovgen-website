"use client";

import { useCallback, useState } from "react";
import { CanvasFallback } from "@/components/three/canvas-fallback";
import {
  GlobalCanvas,
  type GlobalCanvasStatus,
} from "@/components/three/global-canvas";
import { SceneSection } from "@/components/three/scene-section";
import { MotionPreferenceOverride } from "@/components/providers/motion-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { threeConfig, threeQualityPresets } from "@/config/three";
import { useDocumentVisibility } from "@/hooks/use-document-visibility";
import type { ThreeQualityLevel } from "@/types/three";

type QualitySelection = "auto" | ThreeQualityLevel;

const initialStatus: GlobalCanvasStatus = {
  isDocumentVisible: true,
  isSceneVisible: false,
  pauseReason: "offscreen",
  quality: threeConfig.performance.initialQuality,
  webgl: "checking",
};

export function ThreeSystemDemo() {
  const [forceFallback, setForceFallback] = useState(false);
  const [simulateReducedMotion, setSimulateReducedMotion] = useState(false);
  const [qualitySelection, setQualitySelection] =
    useState<QualitySelection>("auto");
  const [status, setStatus] = useState(initialStatus);
  const documentVisible = useDocumentVisibility();
  const handleStatusChange = useCallback(
    (nextStatus: GlobalCanvasStatus) => setStatus(nextStatus),
    [],
  );

  return (
    <>
      <Section
        spacing="spacious"
        className="bg-navy-950 text-white"
      >
        <Container>
          <Badge variant="gold">Development foundation</Badge>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold text-white md:text-6xl">
            Shared 3D system
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-white/70">
            A technical test surface for one shared canvas, adaptive quality,
            visibility pausing, reduced motion, and accessible static fallbacks.
            This is not final page artwork.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Runtime controls"
            title="Test the reusable foundation"
            description="Controls remain in the HTML layer, are keyboard accessible, and are available only on this development route."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-[20rem_1fr]">
            <Card className="h-fit p-6">
              <div className="space-y-6">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold">
                    Quality preset
                  </span>
                  <select
                    className="min-h-11 w-full rounded-md border border-border bg-background px-3"
                    value={qualitySelection}
                    onChange={(event) =>
                      setQualitySelection(
                        event.target.value as QualitySelection,
                      )
                    }
                  >
                    <option value="auto">Automatic</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </label>

                <label className="flex min-h-11 items-center gap-3">
                  <input
                    type="checkbox"
                    checked={simulateReducedMotion}
                    onChange={(event) =>
                      setSimulateReducedMotion(event.target.checked)
                    }
                  />
                  <span className="text-sm font-semibold">
                    Simulate reduced motion
                  </span>
                </label>

                <Button
                  variant="secondary"
                  className="w-full"
                  aria-pressed={forceFallback}
                  onClick={() => setForceFallback((current) => !current)}
                >
                  {forceFallback
                    ? "Restore WebGL detection"
                    : "Force poster fallback"}
                </Button>

                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <dt className="text-muted">WebGL</dt>
                  <dd data-testid="webgl-status">{status.webgl}</dd>
                  <dt className="text-muted">Quality</dt>
                  <dd data-testid="quality-status">{status.quality}</dd>
                  <dt className="text-muted">Scene</dt>
                  <dd data-testid="scene-status">
                    {status.isSceneVisible ? "visible" : "offscreen"}
                  </dd>
                  <dt className="text-muted">Document</dt>
                  <dd data-testid="document-status">
                    {documentVisible ? "visible" : "hidden"}
                  </dd>
                  <dt className="text-muted">Rendering</dt>
                  <dd data-testid="pause-status">
                    {status.pauseReason === "none"
                      ? "active"
                      : status.pauseReason}
                  </dd>
                </dl>
              </div>
            </Card>

            <SceneSection sceneId="placeholder">
              <div className="relative">
                <MotionPreferenceOverride reduced={simulateReducedMotion}>
                  <GlobalCanvas
                    forceFallback={forceFallback}
                    qualityOverride={
                      qualitySelection === "auto" ? null : qualitySelection
                    }
                    onStatusChange={handleStatusChange}
                  />
                </MotionPreferenceOverride>
                <div className="pointer-events-none absolute start-4 top-4">
                  <Badge variant="neutral">Decorative canvas</Badge>
                </div>
              </div>
              <p className="mt-4 max-w-3xl text-sm text-muted">
                The placeholder uses one central geometry, one orbit ring, and
                capped particles. All meaningful explanation remains selectable
                HTML outside WebGL.
              </p>
            </SceneSection>
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHeading
            eyebrow="Preset definitions"
            title="Stable quality boundaries"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {(Object.keys(threeQualityPresets) as ThreeQualityLevel[]).map(
              (level) => {
                const preset = threeQualityPresets[level];
                return (
                  <Card key={level} className="p-6">
                    <h2 className="text-xl font-semibold capitalize">{level}</h2>
                    <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      <dt className="text-muted">DPR</dt>
                      <dd>{preset.dpr.join("–")}</dd>
                      <dt className="text-muted">Particles</dt>
                      <dd>{preset.particleLimit}</dd>
                      <dt className="text-muted">Antialias</dt>
                      <dd>{preset.antialias ? "On" : "Off"}</dd>
                      <dt className="text-muted">Shadows</dt>
                      <dd>{preset.shadows ? "On" : "Off"}</dd>
                      <dt className="text-muted">Post effects</dt>
                      <dd>{preset.postProcessing ? "Allowed" : "Off"}</dd>
                    </dl>
                  </Card>
                );
              },
            )}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Fallback preview"
            title="The HTML experience remains available"
            description="This reusable poster appears when WebGL is unsupported, fallback is forced, or reduced motion requests a static alternative."
          />
          <div className="mt-10">
            <CanvasFallback />
          </div>
        </Container>
      </Section>

      <div className="h-[120vh]" aria-hidden="true" />
    </>
  );
}
