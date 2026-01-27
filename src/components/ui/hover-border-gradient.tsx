"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

const DIRECTIONS: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];

const MOVING_MAP: Record<Direction, string> = {
  TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  BOTTOM:
    "radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  RIGHT:
    "radial-gradient(16.2% 41.2% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
};

const HIGHLIGHT =
  "radial-gradient(75% 181.16% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)";

interface HoverBorderGradientProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  containerClassName?: string;
  className?: string;
  duration?: number;
  clockwise?: boolean;
}

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  duration = 1,
  clockwise = true,
  ...props
}: HoverBorderGradientProps) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  const rotateDirection = useCallback(
    (current: Direction): Direction => {
      const index = DIRECTIONS.indexOf(current);
      return clockwise
        ? DIRECTIONS[(index - 1 + DIRECTIONS.length) % DIRECTIONS.length]
        : DIRECTIONS[(index + 1) % DIRECTIONS.length];
    },
    [clockwise],
  );

  useEffect(() => {
    if (hovered) return;

    const interval = setInterval(() => {
      setDirection((prev) => rotateDirection(prev));
    }, duration * 1000);

    return () => clearInterval(interval);
  }, [hovered, duration, rotateDirection]);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex w-fit items-center justify-center rounded-full border border-white/10 bg-black/20 p-px transition hover:bg-black/10 dark:bg-white/20",
        containerClassName,
      )}
      {...props}
    >
      {/* Content */}
      <div
        className={cn(
          "relative z-10 rounded-[inherit] bg-black px-4 py-2 text-white",
          className,
        )}
      >
        {children}
      </div>

      {/* Animated border */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
        style={{ filter: "blur(2px)" }}
        initial={{ background: MOVING_MAP[direction] }}
        animate={{
          background: hovered
            ? [MOVING_MAP[direction], HIGHLIGHT]
            : MOVING_MAP[direction],
        }}
        transition={{ ease: "linear", duration }}
      />

      {/* Inner mask */}
      <div className="absolute inset-[2px] rounded-[inherit] bg-black" />
    </button>
  );
}