"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  motion,
  motionValue,
  useTransform,
  type HTMLMotionProps,
  type MotionValue,
} from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { useSectionProgress } from "@/hooks/use-section-progress";
import { useMobileLayout } from "@/hooks/use-mobile-layout";
import { cn } from "@/lib/utils";

type SpatialContextValue = {
  active: boolean;
  mobile: boolean;
  progress: MotionValue<number>;
  reduced: boolean;
};

const SpatialContext = createContext<SpatialContextValue>({
  active: false,
  mobile: false,
  progress: motionValue(0.5),
  reduced: false,
});

export function SpatialSection({
  children,
  className,
  spacing = "default",
  ...props
}: {
  children: ReactNode;
  className?: string;
  spacing?: "compact" | "default" | "spacious";
} & Omit<HTMLMotionProps<"section">, "children">) {
  const { ref, progress } = useSectionProgress<HTMLElement>();
  const prefersReducedMotion = usePrefersReducedMotion();
  const mobile = useMobileLayout();
  const reduced = prefersReducedMotion;
  const [active, setActive] = useState(false);
  const opacity = useTransform(
    progress,
    [0, 0.16, 0.78, 1],
    [0.74, 1, 1, 0.8],
  );
  const y = useTransform(progress, [0, 0.2, 0.78, 1], [26, 0, 0, -20]);
  const scale = useTransform(
    progress,
    [0, 0.2, 0.78, 1],
    [0.98, 1, 1, 0.985],
  );
  const rotateX = useTransform(
    progress,
    [0, 0.2, 0.78, 1],
    [2, 0, 0, -1.25],
  );
  const mobileOpacity = useTransform(progress, [0, 0.16, 0.78, 1], [0.86, 1, 1, 0.92]);
  const mobileY = useTransform(progress, [0, 0.2, 0.78, 1], [18, 0, 0, -12]);
  const mobileScale = useTransform(progress, [0, 0.2, 0.78, 1], [0.985, 1, 1, 0.99]);
  const mobileRotateX = useTransform(progress, [0, 0.2, 0.78, 1], [1.2, 0, 0, -0.7]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const update = (visible: boolean) => {
      setActive(visible && document.visibilityState === "visible");
    };
    const observer = new IntersectionObserver(
      ([entry]) => update(entry.isIntersecting),
      { rootMargin: "100px 0px", threshold: 0.05 },
    );
    const handleVisibility = () => {
      update(element.getBoundingClientRect().bottom > 0);
    };
    observer.observe(element);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [ref]);

  return (
    <SpatialContext.Provider value={{ active, mobile, progress, reduced }}>
      <motion.section
        ref={ref}
        className={cn(
          spacing === "compact" && "py-12 md:py-16",
          spacing === "default" && "py-16 md:py-24",
          spacing === "spacious" && "py-24 md:py-32",
          className,
        )}
        style={
          reduced
            ? undefined
            : {
                opacity: mobile ? mobileOpacity : opacity,
                y: mobile ? mobileY : y,
                scale: mobile ? mobileScale : scale,
                rotateX: mobile ? mobileRotateX : rotateX,
                transformPerspective: 1400,
                transformOrigin: "50% 50%",
              }
        }
        {...props}
      >
        {children}
      </motion.section>
    </SpatialContext.Provider>
  );
}

export function SpatialItem({
  children,
  className,
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  const { mobile, progress, reduced } = useContext(SpatialContext);
  return (
    <SpatialProgressItem
      className={className}
      index={index}
      progress={progress}
      reduced={reduced}
      mobile={mobile}
    >
      {children}
    </SpatialProgressItem>
  );
}

export function SpatialProgressItem({
  children,
  className,
  index = 0,
  progress,
  reduced,
  mobile = false,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
  progress: MotionValue<number>;
  reduced: boolean;
  mobile?: boolean;
}) {
  const entranceStart = Math.min(0.12 + index * 0.022, 0.26);
  const entranceEnd = Math.min(entranceStart + 0.14, 0.4);
  const exitStart = Math.min(0.76 + index * 0.008, 0.84);
  const opacity = useTransform(
    progress,
    [0, entranceStart, entranceEnd, exitStart, 1],
    [0.58, 0.72, 1, 1, 0.76],
  );
  const y = useTransform(
    progress,
    [0, entranceStart, entranceEnd, exitStart, 1],
    [18, 12, 0, 0, -12],
  );
  const z = useTransform(
    progress,
    [0, entranceStart, entranceEnd, exitStart, 1],
    [-56, -34, 0, 0, -42],
  );
  const scale = useTransform(
    progress,
    [0, entranceStart, entranceEnd, exitStart, 1],
    [0.96, 0.975, 1, 1, 0.975],
  );
  const mobileOpacity = useTransform(
    progress,
    [0, entranceStart, entranceEnd, exitStart, 1],
    [0.82, 0.94, 1, 1, 0.9],
  );
  const mobileY = useTransform(
    progress,
    [0, entranceStart, entranceEnd, exitStart, 1],
    [14, 8, 0, 0, -8],
  );
  const mobileZ = useTransform(
    progress,
    [0, entranceStart, entranceEnd, exitStart, 1],
    [-30, -16, 0, 0, -22],
  );
  const mobileScale = useTransform(
    progress,
    [0, entranceStart, entranceEnd, exitStart, 1],
    [0.98, 0.99, 1, 1, 0.99],
  );

  return (
    <motion.div
      className={className}
      style={
        reduced
          ? undefined
          : mobile
            ? { opacity: mobileOpacity, y: mobileY, z: mobileZ, scale: mobileScale }
            : { opacity, y, z, scale }
      }
    >
      {children}
    </motion.div>
  );
}

export function SpatialConnector({ className }: { className?: string }) {
  const { active, progress, reduced } = useContext(SpatialContext);
  const pathLength = useTransform(progress, [0.08, 0.55], [0, 1]);
  const opacity = useTransform(
    progress,
    [0.05, 0.22, 0.76, 0.96],
    [0, 0.38, 0.38, 0.06],
  );

  return (
    <motion.svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 1200 220"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M0 174C178 174 196 48 392 48S610 178 792 178 1008 78 1200 78"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        style={
          reduced
            ? { opacity: 0.2, pathLength: 1 }
            : { opacity, pathLength }
        }
      />
      <motion.path
        d="M0 174C178 174 196 48 392 48S610 178 792 178 1008 78 1200 78"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        initial={false}
        animate={
          active && !reduced
            ? { opacity: [0.02, 0.24, 0.02] }
            : { opacity: 0.04 }
        }
        transition={{
          duration: 3.6,
          ease: "easeInOut",
          repeat: active && !reduced ? Infinity : 0,
        }}
      />
    </motion.svg>
  );
}
