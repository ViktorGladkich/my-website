"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function BrandMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of this specific section
  // We make the section tall (300vh) to force a long scroll period
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Row 1 moves Left
  // We move significantly further (-100%) to ensure all content scrolls through
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  // Row 2 moves Right
  const x2 = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center gap-10 md:gap-20 overflow-hidden">
        {/* Row 1 - Moves Left */}
        <motion.div
          style={{ x: x1 }}
          className="flex items-center gap-4 md:gap-10 whitespace-nowrap w-max pl-4 md:pl-10"
        >
          <div className="flex items-center gap-4 md:gap-10">
            <span className="text-5xl md:text-[8rem] font-black uppercase tracking-tighter text-white leading-none">
              Identität
            </span>
            <div className="h-16 w-28 md:h-40 md:w-64 overflow-hidden rounded-xl md:rounded-2xl relative shrink-0 border border-white/10">
              <Image
                src="/marquee/marquee_texture_1.png"
                alt="Identity"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <span className="text-5xl md:text-[8rem] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-blue-500 leading-none">
              Verfeinern
            </span>
            <span className="text-5xl md:text-[8rem] font-black uppercase tracking-tighter text-white stroke-text-white leading-none">
              Bauen
            </span>
            <div className="h-16 w-28 md:h-40 md:w-64 overflow-hidden rounded-xl md:rounded-2xl relative shrink-0 border border-white/10">
              <Image
                src="/marquee/marquee_3_laptop.png"
                alt="Programming"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <span className="text-5xl md:text-[8rem] font-black uppercase tracking-tighter text-white/50 leading-none">
              Zukunft
            </span>
          </div>
        </motion.div>

        {/* Row 2 - Moves Right */}
        <motion.div
          style={{ x: x2 }}
          className="flex items-center gap-4 md:gap-10 whitespace-nowrap w-max pr-4 md:pr-10"
        >
          <div className="flex items-center gap-4 md:gap-10">
            <span className="text-5xl md:text-[8rem] font-black uppercase tracking-tighter text-white/50 leading-none">
              Global
            </span>
            <span className="text-5xl md:text-[8rem] font-black uppercase tracking-tighter text-white leading-none">
              Inverta
            </span>
            <div className="h-16 w-28 md:h-40 md:w-64 overflow-hidden rounded-xl md:rounded-2xl relative shrink-0 border border-white/10">
              <Image
                src="/marquee/marquee_texture_2.png"
                alt="Texture"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <span className="text-5xl md:text-[8rem] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-500 leading-none">
              Agentur
            </span>
            <span className="text-5xl md:text-[8rem] font-black uppercase tracking-tighter text-white leading-none">
              Digital
            </span>
          </div>
        </motion.div>

        {/* Footer Logo & Text (Absolute positioning at bottom of sticky container for effect) */}
        <div className="absolute bottom-5 left-0 right-0 flex flex-col items-center justify-center gap-4 text-center opacity-80">
          <div className="flex items-center justify-center "></div>
          <p className="max-w-md text-sm md:text-base text-gray-300 font-light tracking-wide uppercase">
            Wo Branding über das Visuelle hinausgeht — es geht darum, eine
            Geschichte zu schaffen, die berührt.
          </p>
        </div>
      </div>
    </section>
  );
}
