"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, type PanInfo } from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { cn } from "@/lib/utils";

type StackItem = { id: string };

type MobileStackCarouselProps<T extends StackItem> = {
  items: readonly T[];
  label: string;
  renderCard: (item: T) => React.ReactNode;
  compact?: boolean;
};

function wrappedOffset(index: number, activeIndex: number, count: number) {
  const raw = index - activeIndex;
  if (raw > count / 2) return raw - count;
  if (raw < -count / 2) return raw + count;
  return raw;
}

export function MobileStackCarousel<T extends StackItem>({
  items,
  label,
  renderCard,
  compact = false,
}: MobileStackCarouselProps<T>) {
  const reducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = items.length;

  const move = useCallback(
    (direction: -1 | 1) => {
      setActiveIndex((current) => (current + direction + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (reducedMotion || paused || count < 2) return;
    const interval = window.setInterval(() => move(1), 5000);
    return () => window.clearInterval(interval);
  }, [count, move, paused, reducedMotion]);

  function handleDragEnd(_: PointerEvent, info: PanInfo) {
    if (Math.abs(info.offset.x) < 48) return;
    move(info.offset.x > 0 ? -1 : 1);
  }

  return (
    <section
      aria-label={label}
      className={cn(
        "mobile-stack-carousel relative mx-auto md:hidden",
        compact
          ? "mt-8 w-[calc(100%-4rem)] max-w-[22rem]"
          : "mt-12 w-[calc(100%-2.5rem)] max-w-[32rem]",
      )}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onWheel={(event) => {
        if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) || !event.deltaX) {
          return;
        }
        event.preventDefault();
        move(event.deltaX > 0 ? 1 : -1);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          move(-1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          move(1);
        }
      }}
      tabIndex={0}
    >
      <div
        className={cn(
          "relative touch-pan-y [perspective:1200px]",
          compact ? "h-[18rem] sm:h-[19rem]" : "h-[24rem] sm:h-[25rem]",
        )}
      >
        {items.map((item, index) => {
          const offset = wrappedOffset(index, activeIndex, count);
          const active = offset === 0;
          const visible = Math.abs(offset) <= 1;
          const x = offset === 0 ? "0%" : `${offset * 58}%`;

          return (
            <motion.div
              key={item.id}
              aria-hidden={!active}
              inert={!active || undefined}
              drag={active && !reducedMotion ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={handleDragEnd}
              animate={{
                x,
                scale: active ? 1 : visible ? 0.945 : 0.89,
                rotateY: offset * -5,
                rotateZ: offset * -2.5,
                opacity: active ? 1 : visible ? 0.58 : 0,
              }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 210, damping: 28, mass: 0.78 }
              }
              className={cn(
                "absolute inset-0 will-change-transform",
                active ? "z-20 cursor-grab active:cursor-grabbing" : "z-10 pointer-events-none",
                !visible && "-z-10",
              )}
            >
              {renderCard(item)}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex gap-2" aria-label="Carousel controls">
          <button
            type="button"
            aria-label="Previous card"
            onClick={() => move(-1)}
            className="grid size-11 place-items-center rounded-full border border-blue-300/35 bg-[rgb(19_60_101_/_70%)] text-blue-300 shadow-[inset_0_1px_0_rgb(255_255_255_/_13%)] transition-colors hover:bg-[rgb(27_79_130_/_82%)]"
          >
            <ChevronLeft aria-hidden="true" className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next card"
            onClick={() => move(1)}
            className="grid size-11 place-items-center rounded-full border border-blue-300/35 bg-[rgb(19_60_101_/_70%)] text-blue-300 shadow-[inset_0_1px_0_rgb(255_255_255_/_13%)] transition-colors hover:bg-[rgb(27_79_130_/_82%)]"
          >
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
        </div>
        <div aria-label={`Card ${activeIndex + 1} of ${count}`} className="flex gap-1.5">
          {items.map((item, index) => (
            <span
              key={item.id}
              aria-hidden="true"
              className={cn(
                "h-1.5 rounded-full transition-[width,background-color] duration-[var(--duration-standard)]",
                index === activeIndex ? "w-7 bg-accent" : "w-1.5 bg-blue-300/35",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
