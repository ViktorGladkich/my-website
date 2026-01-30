"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ApproachStep {
  number: string;
  title: string;
  description: string;
}

const approachSteps: ApproachStep[] = [
  {
    number: "1",
    title: "Ihre Vision verstehen",
    description:
      "Wir beginnen mit einem ausführlichen Gespräch über Ihre Ziele, Zielgruppe und Erwartungen, um sicherzustellen, dass unser Ansatz perfekt mit Ihrer Vision übereinstimmt.",
  },
  {
    number: "2",
    title: "Strategisch planen",
    description:
      "Wir analysieren Trends, Wettbewerber und Chancen, um eine maßgeschneiderte Strategie für Ihre Bedürfnisse zu entwickeln.",
  },
  {
    number: "3",
    title: "Ideen visualisieren",
    description:
      "Kreative Konzepte werden zum Leben erweckt, während wir benutzerfreundliche und visuell ansprechende Lösungen gestalten.",
  },
  {
    number: "4",
    title: "Umsetzung realisieren",
    description:
      "Mit modernsten Technologien entwickeln und implementieren wir Ihr Projekt mit Präzision und Sorgfalt.",
  },
  {
    number: "5",
    title: "Erfolg sichern",
    description:
      "Nach einem reibungslosen Launch bieten wir fortlaufende Unterstützung und Optimierung für langfristigen Erfolg.",
  },
];

function TimelineStep({
  step,
  index,
  isLast,
}: {
  step: ApproachStep;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-6 md:gap-8 bg-transparent"
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Timeline column */}
      <div className="flex flex-col items-center">
        {/* Circle with number */}
        <motion.div
          className={cn(
            "relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-500",
            isInView
              ? "border-purple-500 bg-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
              : "border-white/20 bg-black",
          )}
          animate={isInView ? { scale: 1 } : { scale: 0.9 }}
        >
          <span
            className={cn(
              "text-lg font-bold transition-colors duration-500",
              isInView ? "text-purple-400" : "text-neutral-500",
            )}
          >
            {step.number}
          </span>
        </motion.div>

        {/* Timeline line */}
        {!isLast && (
          <div className="relative h-full w-0.5 bg-white/10">
            <motion.div
              className="absolute left-0 top-0 w-full bg-linear-to-b from-purple-500 to-blue-500"
              initial={{ height: "0%" }}
              animate={isInView ? { height: "100%" } : { height: "0%" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-12 md:pb-16">
        <motion.h3
          className={cn(
            "mb-2 text-xl font-semibold transition-colors duration-500 md:text-2xl",
            isInView ? "text-white" : "text-neutral-500",
          )}
        >
          {step.title}
        </motion.h3>
        <motion.p
          className={cn(
            "text-base leading-relaxed transition-colors duration-500 md:text-lg",
            isInView ? "text-neutral-400" : "text-neutral-600",
          )}
        >
          {step.description}
        </motion.p>
      </div>
    </motion.div>
  );
}

// Helper for the smooth liquid corner effect (same as in TeamSection)
const StickyCorner = ({
  className,
  style,
  fill = "currentColor",
}: {
  className?: string;
  style?: React.CSSProperties;
  fill?: string;
}) => (
  <div className={className} style={style}>
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full block"
    >
      <path d="M40 40V0C40 22.0914 22.0914 40 0 40H40Z" fill={fill}></path>
    </svg>
  </div>
);

export function ApproachSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const headerInView = useInView(containerRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black py-24 md:py-32"
    >
      {/* Background Ambience - matching other sections */}
      <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-900/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Header & Image */}
          <div className="flex flex-col gap-8">
            {/* Section Label - matching Services style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-purple-500 font-medium mb-4 tracking-widest uppercase text-sm">
                Unser Ansatz
              </h3>
            </motion.div>

            {/* Headline - matching Services style */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.95]"
            >
              <span className="text-white">STRATEGISCHE SCHRITTE</span>
              <br />
              <span className="text-neutral-500">
                ZU WIRKUNGSVOLLEN ERGEBNISSEN
              </span>
            </motion.h2>

            {/* Image with sticky corners */}
            <motion.div
              ref={imageRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={headerInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mt-4 block overflow-hidden rounded-[40px]"
              style={{ y: imageY }}
            >
              <div className="aspect-[4/3.4] w-full relative">
                <Image
                  src="/images/services/service_strategy_funnel.png"
                  alt="Unser Ansatz"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Overlay Gradient - matching other images */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              </div>

              {/* Sticky 'Sticker' Corner Effect - Bottom Right */}
              <div className="absolute bottom-0 right-0 z-20">
                {/* Top Connector: Sits on top of the black block, aligned right. Creates top-right inner radius. */}
                <StickyCorner
                  className="absolute -top-10 right-0 w-10 h-10 md:-top-16 md:w-16 md:h-16"
                  fill="#000000"
                  style={{ transform: "rotate(0deg)" }}
                />

                {/* Left Connector: Sits to the left of the black block, aligned bottom. Creates bottom-left inner radius. */}
                <StickyCorner
                  className="absolute bottom-0 -left-10 w-10 h-10 md:-left-16 md:w-16 md:h-16"
                  fill="#000000"
                  style={{ transform: "rotate(0deg)" }}
                />

                {/* The visual Block itself - extended to look like part of the background */}
                <div className="bg-black w-24 h-24 rounded-tl-[40px] md:w-36 md:h-36 md:rounded-tl-[60px]" />
              </div>
            </motion.div>
          </div>

          {/* Right Column - Timeline */}
          <div className="flex flex-col">
            {approachSteps.map((step, index) => (
              <TimelineStep
                key={step.number}
                step={step}
                index={index}
                isLast={index === approachSteps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
