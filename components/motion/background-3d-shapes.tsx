"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Boxes,
  Braces,
  Cloud,
  Code2,
  Cpu,
  Database,
  Network,
  ShieldCheck,
} from "lucide-react";
import { motion, type TargetAndTransition } from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { cn } from "@/lib/utils";

export type Background3DShapesVariant =
  | "technology"
  | "services-blue"
  | "orbits"
  | "geometry"
  | "network";

type FloatingShapeProps = {
  children?: ReactNode;
  className: string;
  active: boolean;
  animate: TargetAndTransition;
  duration: number;
};

function FloatingShape({
  active,
  animate,
  children,
  className,
  duration,
}: FloatingShapeProps) {
  return (
    <motion.span
      className={className}
      animate={active ? animate : undefined}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: active ? Infinity : 0,
      }}
    >
      {children}
    </motion.span>
  );
}

function TechnologyShapes({ active }: { active: boolean }) {
  return (
    <>
      <FloatingShape
        active={active}
        duration={8.5}
        className="absolute left-[7%] top-[18%] text-accent/25 drop-shadow-[0_0_18px_rgb(228_196_119_/_18%)]"
        animate={{
          y: [0, -18, 0],
          rotateY: [-14, 18, -14],
          scale: [0.94, 1.06, 0.94],
        }}
      >
        <Cpu className="size-12 md:size-16" strokeWidth={1.1} />
      </FloatingShape>
      <FloatingShape
        active={active}
        duration={10}
        className="absolute right-[7%] top-[20%] text-blue-300/20"
        animate={{ x: [0, -18, 0], y: [0, 12, 0], rotateZ: [-6, 7, -6] }}
      >
        <Cloud className="size-14 md:size-20" strokeWidth={1} />
      </FloatingShape>
      <FloatingShape
        active={active}
        duration={7.4}
        className="absolute bottom-[10%] left-[20%] text-accent/20"
        animate={{ y: [0, -14, 0], rotateX: [0, 18, 0], opacity: [0.4, 0.9, 0.4] }}
      >
        <Database className="size-11 md:size-14" strokeWidth={1.1} />
      </FloatingShape>
      <FloatingShape
        active={active}
        duration={9.2}
        className="absolute bottom-[15%] right-[18%] text-blue-300/18"
        animate={{ x: [0, 16, 0], rotateY: [-16, 22, -16], z: [-20, 24, -20] }}
      >
        <Code2 className="size-12 md:size-16" strokeWidth={1} />
      </FloatingShape>
      <FloatingShape
        active={active}
        duration={11}
        className="absolute left-[48%] top-[8%] hidden text-accent/15 sm:block"
        animate={{ y: [0, 16, 0], rotate: [-5, 6, -5] }}
      >
        <ShieldCheck className="size-10 md:size-14" strokeWidth={1} />
      </FloatingShape>
    </>
  );
}

function ServicesBlueShapes({ active }: { active: boolean }) {
  return (
    <>
      <FloatingShape
        active={active}
        duration={7.5}
        className="absolute right-[8%] top-[12%] size-20 rounded-full border border-blue-300/35 bg-blue-500/[0.08] shadow-[inset_10px_10px_28px_rgb(255_255_255_/_7%),inset_-12px_-12px_28px_rgb(5_28_68_/_38%),0_18px_55px_rgb(47_130_245_/_15%)] md:size-28"
        animate={{ y: [0, 18, 0], rotateX: [0, 16, 0], rotateY: [0, -22, 0] }}
      />
      <FloatingShape
        active={active}
        duration={9}
        className="absolute bottom-[8%] left-[5%] size-16 rounded-[1.35rem] border border-blue-300/28 bg-[linear-gradient(145deg,rgb(131_185_255_/_14%),rgb(47_130_245_/_3%))] shadow-[inset_8px_8px_20px_rgb(255_255_255_/_6%),inset_-10px_-10px_24px_rgb(3_22_56_/_34%),0_20px_55px_rgb(47_130_245_/_12%)] md:size-24"
        animate={{ y: [0, -15, 0], rotate: [-10, 7, -10], z: [-20, 28, -20] }}
      />
      <FloatingShape
        active={active}
        duration={10.5}
        className="absolute left-[14%] top-[16%] h-10 w-28 rounded-full border border-blue-300/24 bg-[linear-gradient(145deg,rgb(131_185_255_/_12%),rgb(47_130_245_/_2%))] shadow-[inset_6px_6px_16px_rgb(255_255_255_/_5%),inset_-8px_-8px_18px_rgb(3_22_56_/_30%),0_14px_42px_rgb(47_130_245_/_10%)]"
        animate={{ x: [0, 22, 0], y: [0, -9, 0], rotateZ: [-7, 5, -7] }}
      />
      <FloatingShape
        active={active}
        duration={8.5}
        className="absolute bottom-[18%] right-[18%] size-14 rounded-full border-[10px] border-blue-300/15 shadow-[inset_0_0_20px_rgb(131_185_255_/_12%),0_0_32px_rgb(47_130_245_/_12%)] md:size-20 md:border-[14px]"
        animate={{ y: [0, -18, 0], rotateX: [18, -12, 18], rotateY: [-16, 18, -16] }}
      />
      <FloatingShape
        active={active}
        duration={4.8}
        className="absolute left-[45%] top-[34%] size-4 rounded-full bg-blue-300/70 shadow-[0_0_28px_rgb(131_185_255_/_55%)]"
        animate={{ scale: [0.8, 1.25, 0.8], opacity: [0.3, 0.85, 0.3] }}
      />
      <FloatingShape
        active={active}
        duration={8.8}
        className="absolute left-[7%] top-[42%] text-blue-300/25 drop-shadow-[0_0_16px_rgb(131_185_255_/_22%)]"
        animate={{ y: [0, -18, 0], rotateY: [-12, 20, -12], scale: [0.9, 1.08, 0.9] }}
      >
        <Cpu className="size-12 md:size-16" strokeWidth={1.1} />
      </FloatingShape>
      <FloatingShape
        active={active}
        duration={10.2}
        className="absolute right-[5%] top-[46%] text-blue-300/20 drop-shadow-[0_0_18px_rgb(131_185_255_/_20%)]"
        animate={{ x: [0, -16, 0], y: [0, 11, 0], rotateZ: [-5, 7, -5] }}
      >
        <Cloud className="size-14 md:size-20" strokeWidth={1} />
      </FloatingShape>
      <FloatingShape
        active={active}
        duration={7.6}
        className="absolute bottom-[6%] left-[24%] text-blue-300/20"
        animate={{ y: [0, -12, 0], rotateX: [0, 18, 0], opacity: [0.35, 0.85, 0.35] }}
      >
        <Database className="size-10 md:size-14" strokeWidth={1.1} />
      </FloatingShape>
      <FloatingShape
        active={active}
        duration={9.4}
        className="absolute right-[31%] top-[7%] hidden text-blue-300/20 sm:block"
        animate={{ x: [0, 12, 0], rotateY: [0, -24, 0], opacity: [0.3, 0.8, 0.3] }}
      >
        <Network className="size-10 md:size-14" strokeWidth={1.05} />
      </FloatingShape>
      <FloatingShape
        active={active}
        duration={8.2}
        className="absolute bottom-[12%] right-[7%] hidden text-blue-300/25 sm:block"
        animate={{ y: [0, 14, 0], rotateZ: [-8, 5, -8], scale: [0.92, 1.06, 0.92] }}
      >
        <Braces className="size-11 md:size-16" strokeWidth={1.1} />
      </FloatingShape>
    </>
  );
}

function OrbitShapes({ active }: { active: boolean }) {
  return (
    <>
      <FloatingShape
        active={active}
        duration={12}
        className="absolute -right-16 top-[8%] size-56 rounded-full border border-blue-300/15 shadow-[inset_0_0_55px_rgb(47_130_245_/_8%)] md:size-80"
        animate={{ rotateX: [58, 72, 58], rotateY: [-12, 18, -12], scale: [0.95, 1.04, 0.95] }}
      />
      <FloatingShape
        active={active}
        duration={9}
        className="absolute right-[4%] top-[20%] size-32 rounded-full border border-accent/25 [transform:rotateX(68deg)] md:size-48"
        animate={{ rotateZ: [0, 360], y: [0, 12, 0] }}
      />
      <FloatingShape
        active={active}
        duration={10.5}
        className="absolute -left-20 bottom-[4%] size-44 rounded-full border-[14px] border-accent/[0.08] shadow-[0_0_42px_rgb(201_154_50_/_8%)] md:size-64 md:border-[20px]"
        animate={{ y: [0, -20, 0], rotateX: [12, -14, 12], rotateY: [-18, 16, -18] }}
      />
      <FloatingShape
        active={active}
        duration={5.2}
        className="absolute left-[43%] top-[24%] size-3 rounded-full bg-accent/65 shadow-[0_0_24px_rgb(228_196_119_/_52%)]"
        animate={{ scale: [0.7, 1.35, 0.7], opacity: [0.3, 0.9, 0.3] }}
      />
      <FloatingShape
        active={active}
        duration={6.4}
        className="absolute bottom-[22%] right-[39%] size-2 rounded-full bg-blue-300/75 shadow-[0_0_22px_rgb(131_185_255_/_48%)]"
        animate={{ x: [-12, 14, -12], y: [8, -10, 8] }}
      />
    </>
  );
}

function GeometryShapes({ active }: { active: boolean }) {
  return (
    <>
      <FloatingShape
        active={active}
        duration={9.5}
        className="absolute -left-8 top-[12%] size-28 rotate-12 border border-accent/22 bg-accent/[0.035] shadow-[inset_12px_12px_30px_rgb(255_255_255_/_3%),0_24px_60px_rgb(201_154_50_/_8%)] md:size-40"
        animate={{ y: [0, 18, 0], rotateX: [8, -18, 8], rotateY: [-12, 22, -12] }}
      />
      <FloatingShape
        active={active}
        duration={11}
        className="absolute right-[8%] top-[14%] h-20 w-36 rounded-[45%] border border-blue-300/18 bg-blue-500/[0.035] md:h-28 md:w-52"
        animate={{ x: [0, -22, 0], rotateZ: [-8, 6, -8], z: [-30, 30, -30] }}
      />
      <FloatingShape
        active={active}
        duration={8.2}
        className="absolute bottom-[8%] right-[14%] size-24 border border-accent/20 [clip-path:polygon(50%_0%,100%_100%,0%_100%)] md:size-36"
        animate={{ y: [0, -18, 0], rotateY: [-20, 24, -20], scale: [0.92, 1.05, 0.92] }}
      />
      <FloatingShape
        active={active}
        duration={10}
        className="absolute bottom-[16%] left-[27%] hidden text-blue-300/16 sm:block"
        animate={{ rotate: [-8, 10, -8], y: [0, 12, 0] }}
      >
        <Boxes className="size-14 md:size-20" strokeWidth={0.9} />
      </FloatingShape>
    </>
  );
}

function NetworkShapes({ active }: { active: boolean }) {
  return (
    <>
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 500"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full text-blue-300/15"
      >
        <motion.path
          d="M0 350 C170 350 180 90 390 90 S630 390 820 310 1010 90 1200 140"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          animate={active ? { pathLength: [0.25, 1, 0.25], opacity: [0.12, 0.42, 0.12] } : undefined}
          transition={{ duration: 8, ease: "easeInOut", repeat: active ? Infinity : 0 }}
        />
      </svg>
      <FloatingShape
        active={active}
        duration={9}
        className="absolute left-[12%] top-[20%] text-accent/20"
        animate={{ y: [0, -16, 0], rotateY: [-12, 18, -12] }}
      >
        <Network className="size-14 md:size-20" strokeWidth={1} />
      </FloatingShape>
      {[
        "left-[34%] top-[34%]",
        "left-[58%] top-[16%]",
        "right-[16%] bottom-[25%]",
        "left-[45%] bottom-[14%]",
      ].map((position, index) => (
        <FloatingShape
          key={position}
          active={active}
          duration={5.5 + index}
          className={cn(
            "absolute size-3 rounded-full border border-accent/50 bg-accent/25 shadow-[0_0_24px_rgb(228_196_119_/_28%)]",
            position,
            index > 1 && "hidden sm:block",
          )}
          animate={{ y: [0, index % 2 === 0 ? -13 : 13, 0], scale: [0.8, 1.25, 0.8] }}
        />
      ))}
    </>
  );
}

const shapeSets = {
  technology: TechnologyShapes,
  "services-blue": ServicesBlueShapes,
  orbits: OrbitShapes,
  geometry: GeometryShapes,
  network: NetworkShapes,
} satisfies Record<
  Background3DShapesVariant,
  ({ active }: { active: boolean }) => ReactNode
>;

export function Background3DShapes({
  className,
  intensity = "medium",
  variant = "technology",
}: {
  className?: string;
  intensity?: "subtle" | "medium" | "strong";
  variant?: Background3DShapesVariant;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const ShapeSet = shapeSets[variant];

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;

    const updateVisibility = (isIntersecting: boolean) => {
      setVisible(isIntersecting && document.visibilityState === "visible");
    };
    const observer = new IntersectionObserver(
      ([entry]) => updateVisibility(entry.isIntersecting),
      { rootMargin: "120px 0px", threshold: 0.01 },
    );
    const handleDocumentVisibility = () => {
      updateVisibility(element.getBoundingClientRect().bottom > 0);
    };

    observer.observe(element);
    document.addEventListener("visibilitychange", handleDocumentVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleDocumentVisibility);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden [perspective:1100px] [transform-style:preserve-3d]",
        intensity === "subtle" && "opacity-40",
        intensity === "medium" && "opacity-65",
        intensity === "strong" && "opacity-90",
        className,
      )}
    >
      <ShapeSet active={visible && !reducedMotion} />
    </div>
  );
}
