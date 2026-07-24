"use client";

import { useCallback, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useMotionValueEvent } from "motion/react";
import { SceneSpatialItem } from "@/components/motion/scene-spatial-item";
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

export function ServicesPreviewSection() {
  const [hoveredServiceId, setHoveredServiceId] = useState<string | null>(null);
  const [storyServiceId, setStoryServiceId] = useState<string | null>(null);
  const activeServiceId = hoveredServiceId ?? storyServiceId;
  const handleStoryServiceChange = useCallback((serviceId: string | null) => {
    setStoryServiceId(serviceId);
  }, []);
  const featuredService =
    homeServices.find((service) => service.featured) ?? homeServices[0];
  const supportingServices = homeServices.filter(
    (service) => service.id !== featuredService.id,
  );

  return (
    <SceneSection
      aria-labelledby="services-preview-heading"
      className="relative isolate overflow-hidden bg-[var(--color-navy-950)] py-24 pb-28 md:py-32"
      interactionId={activeServiceId}
      sceneId="services-ecosystem"
      scrollOffset={["start end", "end start"]}
    >
      <ServicesScrollCoordinator
        onStoryServiceChange={handleStoryServiceChange}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-45"
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
      <Container size="wide" className="relative">
        <SceneSpatialItem>
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="services-preview-heading"
              eyebrow="What we do"
              title="End-to-end capabilities for digital transformation."
              description="From strategy and software to cloud, data, security, and infrastructure, InnovGen brings together the capabilities required to build and evolve modern digital platforms."
              className="max-w-3xl"
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

        <div className="mt-12 grid gap-4 [perspective:1200px] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-5">
          <SceneSpatialItem className="h-full" index={1}>
            <ServiceCard
              active={activeServiceId === featuredService.id}
              onActiveChange={setHoveredServiceId}
              service={featuredService}
            />
          </SceneSpatialItem>
          <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
            {supportingServices.map((service, index) => (
              <SceneSpatialItem key={service.id} index={index + 2}>
                <ServiceCard
                  active={activeServiceId === service.id}
                  onActiveChange={setHoveredServiceId}
                  service={service}
                />
              </SceneSpatialItem>
            ))}
          </div>
        </div>
      </Container>
    </SceneSection>
  );
}
