"use client";

import { useCallback, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useMotionValueEvent } from "motion/react";
import { SceneSpatialItem } from "@/components/motion/scene-spatial-item";
import { MobileStackCarousel } from "@/components/motion/mobile-stack-carousel";
import {
  CylindricalItem,
  CylindricalStage,
  GoldenDepthShapes,
  useContinuousCylinder,
} from "@/components/motion/cylindrical-stage";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { ServiceCard } from "@/components/home/service-card";
import { GlobalCanvas } from "@/components/three/global-canvas";
import {
  SceneSection,
  useSceneActivation,
} from "@/components/three/scene-section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { homeServices } from "@/config/home-services";

function ServicesScrollCoordinator({
  onStoryServiceChange,
}: {
  onStoryServiceChange: (serviceId: string | null) => void;
}) {
  const { progress } = useSceneActivation();
  const reduced = usePrefersReducedMotion();
  const previousIndexRef = useRef(-2);

  useMotionValueEvent(progress, "change", (latest) => {
    if (reduced || latest < 0.42 || latest > 0.82) {
      if (previousIndexRef.current !== -1) {
        previousIndexRef.current = -1;
        onStoryServiceChange(null);
      }
      return;
    }

    const index = Math.min(
      homeServices.length - 1,
      Math.max(
        0,
        Math.floor(((latest - 0.42) / 0.4) * homeServices.length),
      ),
    );
    if (index !== previousIndexRef.current) {
      previousIndexRef.current = index;
      onStoryServiceChange(homeServices[index].id);
    }
  });

  return null;
}

function ServicesCylinder({
  activeServiceId,
  onActiveChange,
}: {
  activeServiceId: string | null;
  onActiveChange: (serviceId: string | null) => void;
}) {
  const { isSceneVisible, progress } = useSceneActivation();
  const cursor = useContinuousCylinder(
    progress,
    homeServices.length,
    isSceneVisible,
    4800,
  );

  return (
    <CylindricalStage
      className="mt-12 hidden md:block"
      label="InnovGen service capabilities"
    >
      {homeServices.map((service, index) => (
        <CylindricalItem
          key={service.id}
          count={homeServices.length}
          cursor={cursor}
          index={index}
          progress={progress}
          spacing={96}
        >
          <ServiceCard
            active={activeServiceId === service.id}
            onActiveChange={onActiveChange}
            service={service}
          />
        </CylindricalItem>
      ))}
    </CylindricalStage>
  );
}

function MobileServicesStack({
  activeServiceId,
  onActiveChange,
}: {
  activeServiceId: string | null;
  onActiveChange: (serviceId: string | null) => void;
}) {
  return (
    <MobileStackCarousel
      items={homeServices}
      label="InnovGen service capabilities"
      renderCard={(service) => (
        <ServiceCard
            active={activeServiceId === service.id}
            onActiveChange={onActiveChange}
            service={service}
        />
      )}
    />
  );
}

export function ServicesPreviewSection() {
  const [hoveredServiceId, setHoveredServiceId] = useState<string | null>(null);
  const [storyServiceId, setStoryServiceId] = useState<string | null>(null);
  const activeServiceId = hoveredServiceId ?? storyServiceId;
  const handleStoryServiceChange = useCallback((serviceId: string | null) => {
    setStoryServiceId(serviceId);
  }, []);

  return (
    <SceneSection
      aria-labelledby="services-preview-heading"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--color-navy-900),var(--color-navy-950))] py-24 pb-28 md:py-32"
      interactionId={activeServiceId}
      sceneId="services-ecosystem"
      scrollOffset={["start end", "end start"]}
    >
      <ServicesScrollCoordinator
        onStoryServiceChange={handleStoryServiceChange}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-45 max-md:opacity-15"
      >
        <GlobalCanvas
          className="!absolute !inset-0 !h-full !rounded-none !border-0 !bg-transparent !shadow-none [&_figcaption]:hidden"
          fallbackPosterSrc="/services-ecosystem-poster.svg"
          fallbackTitle="InnovGen connected services ecosystem"
          fallbackDescription="A static view of the connected technology core and service modules."
          reducedMotionBehavior="minimal"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_18%_0%,rgb(47_130_245_/_10%),transparent_48rem)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_48%,rgb(228_196_119_/_5%),transparent_34rem),radial-gradient(circle_at_18%_72%,rgb(47_130_245_/_7%),transparent_30rem)]"
      />
      <GoldenDepthShapes className="opacity-30 md:opacity-80" />
      <Container size="wide" className="relative">
        <SceneSpatialItem>
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="services-preview-heading"
              eyebrow="What we do"
              title="End-to-end capabilities for digital transformation."
              description="From strategy and software to cloud, data, security, and infrastructure, InnovGen brings together the capabilities required to build and evolve modern digital platforms."
              className="max-w-3xl max-md:rounded-[1.5rem] max-md:border max-md:border-blue-300/25 max-md:bg-[linear-gradient(135deg,rgb(21_57_96_/_78%),rgb(8_20_38_/_90%))] max-md:p-5 max-md:shadow-[inset_0_1px_0_rgb(255_255_255_/_11%),0_18px_40px_rgb(0_0_0_/_16%)]"
            />
            <Button
              href="/services"
              variant="secondary"
              className="group w-fit shrink-0"
            >
              Explore all services
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1 motion-reduce:transform-none"
              />
            </Button>
          </div>
        </SceneSpatialItem>

        <SceneSpatialItem index={1}>
          <MobileServicesStack
            activeServiceId={activeServiceId}
            onActiveChange={setHoveredServiceId}
          />
          <ServicesCylinder
            activeServiceId={activeServiceId}
            onActiveChange={setHoveredServiceId}
          />
        </SceneSpatialItem>
      </Container>
    </SceneSection>
  );
}
