"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  wrap,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
  className?: string;
}

function ParallaxText({
  children,
  baseVelocity = 100,
  className,
}: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  /**
   * This is a magic wrapping for the length of the text - you might have to
   * adjust this for very long text options.
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap">
      <motion.div
        className={cn("flex whitespace-nowrap gap-10", className)}
        style={{ x }}
      >
        {/* Repeat children 4 times to ensure seamless infinite scroll */}
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
}

export function VelocityScroll({
  defaultVelocity = 5,
  className,
  rows = [],
}: {
  defaultVelocity?: number;
  className?: string;
  rows?: { text: React.ReactNode; velocity: number }[];
}) {
  return (
    <section className={cn("relative w-full py-10", className)}>
      {rows.map((row, idx) => (
        <ParallaxText
          key={idx}
          baseVelocity={row.velocity}
          className={className}
        >
          {row.text}
        </ParallaxText>
      ))}
    </section>
  );
}
