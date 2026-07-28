"use client";

import {
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  useAnimationFrame,
  useMotionValue,
  useSpring,
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Braces, Cloud, Cpu, Database, Network } from "lucide-react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { cn } from "@/lib/utils";

export function CylindricalStage({
  children,
  className,
  label,
}: {
  children: ReactNode;
  className?: string;
  label: string;
}) {
  return (
    <ul
      aria-label={label}
      className={cn(
        "grid gap-4 sm:grid-cols-2 md:relative md:block md:h-[25rem] md:[perspective:1500px] md:[transform-style:preserve-3d] lg:h-[28rem]",
        className,
      )}
    >
      {children}
    </ul>
  );
}

export function CylindricalItem({
  children,
  className,
  count,
  progress,
  index,
  cursor,
  spacing = 82,
}: {
  children: ReactNode;
  className?: string;
  count: number;
  index: number;
  cursor: MotionValue<number>;
  progress: MotionValue<number>;
  spacing?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const [wide, setWide] = useState(false);
  const position = useTransform(cursor, (value) => {
    const raw = index - value;
    return ((((raw + count / 2) % count) + count) % count) - count / 2;
  });
  const x = useTransform(
    position,
    (value) => `calc(-50% + ${value * spacing}%)`,
  );
  const z = useTransform(position, (value) => -Math.abs(value) * 118);
  const rotateY = useTransform(position, (value) => value * -13);
  const rotateX = useTransform(position, (value) =>
    Math.min(Math.abs(value) * 1.2, 3.5),
  );
  const arcScale = useTransform(position, (value) =>
    Math.max(0.82, 1 - Math.abs(value) * 0.055),
  );
  const arcOpacity = useTransform(position, (value) =>
    Math.max(0.16, 1 - Math.max(0, Math.abs(value) - 1.25) * 0.36),
  );
  const entranceScale = useTransform(
    progress,
    [0.02, 0.2, 0.84, 1],
    [0, 1, 1, 0.86],
    { clamp: true },
  );
  const entranceOpacity = useTransform(
    progress,
    [0.02, 0.15, 0.88, 1],
    [0, 1, 1, 0.45],
    { clamp: true },
  );
  const scale = useTransform(
    () => arcScale.get() * entranceScale.get(),
  );
  const opacity = useTransform(
    () => arcOpacity.get() * entranceOpacity.get(),
  );

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setWide(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <motion.li
      className={cn(
        "min-w-0 [transform-style:preserve-3d] md:absolute md:left-1/2 md:top-0 md:h-full md:w-[clamp(17rem,28vw,24rem)]",
        className,
      )}
      style={
        reduced
          ? undefined
          : !wide
            ? { opacity: entranceOpacity, scale: entranceScale }
          : {
              x,
              z,
              rotateX,
              rotateY,
              scale,
              opacity,
              transformOrigin: "50% 50%",
            }
      }
    >
      {children}
    </motion.li>
  );
}

export function useContinuousCylinder(
  progress: MotionValue<number>,
  count: number,
  active = true,
  speedMs = 6200,
  manualOffset?: MotionValue<number>,
) {
  const reduced = usePrefersReducedMotion();
  const autoCursor = useMotionValue(0);
  const defaultManualOffset = useMotionValue(0);
  const smoothManualOffset = useSpring(
    manualOffset ?? defaultManualOffset,
    reduced
      ? { duration: 0 }
      : { stiffness: 145, damping: 25, mass: 0.72 },
  );
  const scrollCursor = useTransform(
    progress,
    [0.08, 0.3, 0.7, 0.94],
    [0, 0.7, 1.55, 2.25],
    { clamp: true },
  );
  const cursor = useTransform(
    () =>
      (autoCursor.get() + scrollCursor.get() + smoothManualOffset.get()) %
      count,
  );

  useAnimationFrame((_, delta) => {
    if (
      reduced ||
      !active ||
      document.visibilityState !== "visible" ||
      window.innerWidth < 768
    ) {
      return;
    }

    autoCursor.set((autoCursor.get() + delta / speedMs) % count);
  });

  return cursor;
}

export function GoldenDepthShapes({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden [perspective:1100px]",
        className,
      )}
    >
      <motion.span
        className="absolute right-[8%] top-[12%] size-20 rounded-full border border-accent/30 bg-accent/[0.07] shadow-[inset_10px_10px_28px_rgb(255_255_255_/_8%),inset_-12px_-12px_28px_rgb(73_44_2_/_34%),0_18px_55px_rgb(201_154_50_/_12%)] md:size-28"
        animate={
          reduced
            ? undefined
            : {
                y: [0, 18, 0],
                rotateX: [0, 16, 0],
                rotateY: [0, -22, 0],
              }
        }
        transition={{ duration: 7.5, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.span
        className="absolute bottom-[8%] left-[5%] h-16 w-16 rounded-[1.35rem] border border-accent/25 bg-[linear-gradient(145deg,rgb(228_196_119_/_12%),rgb(201_154_50_/_2%))] shadow-[inset_8px_8px_20px_rgb(255_255_255_/_6%),inset_-10px_-10px_24px_rgb(61_37_2_/_28%),0_20px_55px_rgb(201_154_50_/_9%)] md:h-24 md:w-24"
        animate={
          reduced
            ? undefined
            : {
                y: [0, -15, 0],
                rotate: [-10, 7, -10],
                z: [-20, 28, -20],
              }
        }
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.span
        className="absolute left-[45%] top-[34%] size-4 rounded-full bg-accent/60 shadow-[0_0_28px_rgb(228_196_119_/_48%)]"
        animate={
          reduced ? undefined : { scale: [0.8, 1.25, 0.8], opacity: [0.3, 0.8, 0.3] }
        }
        transition={{ duration: 4.8, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.span
        className="absolute left-[14%] top-[16%] h-10 w-28 rounded-full border border-accent/20 bg-[linear-gradient(145deg,rgb(228_196_119_/_10%),rgb(201_154_50_/_2%))] shadow-[inset_6px_6px_16px_rgb(255_255_255_/_5%),inset_-8px_-8px_18px_rgb(61_37_2_/_25%),0_14px_42px_rgb(201_154_50_/_8%)]"
        animate={
          reduced
            ? undefined
            : { x: [0, 22, 0], y: [0, -9, 0], rotateZ: [-7, 5, -7] }
        }
        transition={{ duration: 10.5, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.span
        className="absolute bottom-[18%] right-[18%] size-14 rounded-full border-[10px] border-accent/10 shadow-[inset_0_0_20px_rgb(228_196_119_/_10%),0_0_32px_rgb(201_154_50_/_8%)] md:size-20 md:border-[14px]"
        animate={
          reduced
            ? undefined
            : {
                y: [0, -18, 0],
                rotateX: [18, -12, 18],
                rotateY: [-16, 18, -16],
              }
        }
        transition={{ duration: 8.5, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.span
        className="absolute left-[30%] top-[8%] size-2 rounded-full bg-accent/70 shadow-[0_0_18px_rgb(228_196_119_/_55%)]"
        animate={reduced ? undefined : { y: [0, 15, 0], opacity: [0.25, 0.9, 0.25] }}
        transition={{ duration: 5.2, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.span
        className="absolute bottom-[28%] left-[42%] size-3 rounded-full bg-accent/45 shadow-[0_0_22px_rgb(228_196_119_/_42%)]"
        animate={reduced ? undefined : { x: [0, -13, 0], scale: [0.7, 1.2, 0.7] }}
        transition={{ duration: 6.4, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.span
        className="absolute left-[7%] top-[42%] text-accent/20 drop-shadow-[0_0_16px_rgb(228_196_119_/_18%)]"
        animate={
          reduced
            ? undefined
            : { y: [0, -18, 0], rotateY: [-12, 20, -12], scale: [0.9, 1.08, 0.9] }
        }
        transition={{ duration: 8.8, ease: "easeInOut", repeat: Infinity }}
      >
        <Cpu className="size-12 md:size-16" strokeWidth={1.1} />
      </motion.span>
      <motion.span
        className="absolute right-[5%] top-[46%] text-accent/15 drop-shadow-[0_0_18px_rgb(228_196_119_/_16%)]"
        animate={
          reduced
            ? undefined
            : { x: [0, -16, 0], y: [0, 11, 0], rotateZ: [-5, 7, -5] }
        }
        transition={{ duration: 10.2, ease: "easeInOut", repeat: Infinity }}
      >
        <Cloud className="size-14 md:size-20" strokeWidth={1} />
      </motion.span>
      <motion.span
        className="absolute bottom-[6%] left-[24%] text-accent/15"
        animate={
          reduced
            ? undefined
            : { y: [0, -12, 0], rotateX: [0, 18, 0], opacity: [0.35, 0.8, 0.35] }
        }
        transition={{ duration: 7.6, ease: "easeInOut", repeat: Infinity }}
      >
        <Database className="size-10 md:size-14" strokeWidth={1.1} />
      </motion.span>
      <motion.span
        className="absolute right-[31%] top-[7%] text-accent/15"
        animate={
          reduced
            ? undefined
            : { x: [0, 12, 0], rotateY: [0, -24, 0], opacity: [0.3, 0.75, 0.3] }
        }
        transition={{ duration: 9.4, ease: "easeInOut", repeat: Infinity }}
      >
        <Network className="size-10 md:size-14" strokeWidth={1.05} />
      </motion.span>
      <motion.span
        className="absolute bottom-[12%] right-[7%] text-accent/20"
        animate={
          reduced
            ? undefined
            : { y: [0, 14, 0], rotateZ: [-8, 5, -8], scale: [0.92, 1.06, 0.92] }
        }
        transition={{ duration: 8.2, ease: "easeInOut", repeat: Infinity }}
      >
        <Braces className="size-11 md:size-16" strokeWidth={1.1} />
      </motion.span>
    </div>
  );
}
