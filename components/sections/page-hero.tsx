import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { HomeHero } from "@/components/sections/home-hero";
import { Reveal } from "@/components/motion/reveal";
import { SceneSection } from "@/components/three/scene-section";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import type { ThreeSceneId } from "@/types/three";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  approvalRequired?: boolean;
  breadcrumbs?: { label: string; href?: string }[];
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  sceneId?: ThreeSceneId;
};

export function PageHero({
  eyebrow,
  title,
  description,
  approvalRequired,
  breadcrumbs,
  primaryAction = { label: "Get free consultation", href: "/consultation" },
  secondaryAction,
  sceneId,
}: PageHeroProps) {
  if (sceneId === "home-hero") {
    return (
      <HomeHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
      />
    );
  }

  const content = (
    <Container size="wide">
      {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {eyebrow}
          </p>
          {approvalRequired ? (
            <Badge variant="gold" className="mt-4">
              Client approval required
            </Badge>
          ) : null}
          <h1 className="mt-5 max-w-4xl text-[length:var(--text-h1)] font-semibold">
            {title}
          </h1>
          <p className="mt-6 max-w-[65ch] text-lg text-muted md:text-xl">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={primaryAction.href} size="lg">
              {primaryAction.label}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
            {secondaryAction ? (
              <Button href={secondaryAction.href} variant="secondary" size="lg">
                {secondaryAction.label}
              </Button>
            ) : null}
          </div>
        </Reveal>
        <Reveal delay={0.08} className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-border bg-surface shadow-[0_30px_100px_rgb(0_0_0_/_35%)]">
            <div className="absolute inset-8 rounded-full border border-blue-300/20" />
            <div className="absolute inset-16 rounded-full border border-gold-300/15" />
            <Image
              src="/logo_mark.gif"
              alt="InnovGen brand mark"
              fill
              priority
              sizes="(max-width: 1023px) 80vw, 36vw"
              className="object-contain p-16 opacity-90"
            />
          </div>
        </Reveal>
      </div>
    </Container>
  );

  if (sceneId) {
    return (
      <SceneSection
        className="relative overflow-hidden py-24 md:py-32"
        sceneId={sceneId}
      >
        {content}
      </SceneSection>
    );
  }

  return (
    <Section className="relative overflow-hidden" spacing="spacious">
      {content}
    </Section>
  );
}
