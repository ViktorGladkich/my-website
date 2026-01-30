"use client";

import React, {
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";

// --- Types ---

export type Section = {
  id?: string;
  background: string;
  leftLabel?: React.ReactNode;
  title: string | React.ReactNode;
  rightLabel?: React.ReactNode;
};

export type FullScreenFXAPI = {
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  getIndex: () => number;
};

export type FullScreenFXProps = {
  sections: Section[];
  className?: string;
  onIndexChange?: (index: number) => void;
  initialIndex?: number;
  apiRef?: React.Ref<FullScreenFXAPI>;
};

// --- Sub-components for cleaner structure ---

const BackgroundLayer = ({
  sections,
  currentIndex,
}: {
  sections: Section[];
  currentIndex: number;
}) => {
  return (
    <div className="absolute inset-0 z-0 bg-black">
      <AnimatePresence mode="popLayout" initial={false}>
        {sections.map(
          (section, idx) =>
            idx === currentIndex && (
              <motion.div
                key={section.id || idx}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <div className="absolute inset-0 bg-black/40 z-10" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={section.background}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ),
        )}
      </AnimatePresence>
    </div>
  );
};

const CenterTitle = ({ title }: { title: string | React.ReactNode }) => {
  const isString = typeof title === "string";

  if (!isString) {
    return (
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center"
      >
        {title}
      </motion.div>
    );
  }

  const words = (title as string).split(" ");

  return (
    <div className="overflow-hidden flex flex-wrap justify-center gap-[0.2em]">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 0.5,
              delay: i * 0.05,
              ease: [0.33, 1, 0.68, 1],
            }}
            className="inline-block text-white font-black text-5xl md:text-7xl lg:text-9xl uppercase tracking-tighter"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
};

// --- Main Component ---

export const FullScreenScrollFX = forwardRef<HTMLDivElement, FullScreenFXProps>(
  ({ sections, className, onIndexChange, initialIndex = 0, apiRef }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end end"],
    });

    // Smooth spring for progress bar
    const smoothProgress = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001,
    });

    // Sync scroll progress to current index
    // Sync scroll progress to current index
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
      const totalSections = sections.length;
      // Calculate index based on scroll position (0 to 1) -> (0 to total-1)
      // using a slightly smaller multiplier to properly catch the last item
      const rawIndex = latest * (totalSections - 0.01);
      const newIndex = Math.min(Math.floor(rawIndex), totalSections - 1);

      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
        onIndexChange?.(newIndex);
      }
    });

    const goTo = (index: number) => {
      // We can't easily scroll a 'scroll-element' with framer motion's useScroll
      // unless we rely on window scroll. Since we are using standard sticky scrolling
      // we can just scroll the window to the correct percentage height.
      if (typeof window !== "undefined") {
        // Fallback if the calculation is tricky:
        // Just using simple math based on container height is better if we assume
        // the component takes up the whole page.
        // Container height = sections.length * 100vh
        const sectionHeight = window.innerHeight;
        window.scrollTo({ top: index * sectionHeight, behavior: "smooth" });
      }
    };

    // API Handling
    useImperativeHandle(apiRef, () => ({
      next: () => goTo(Math.min(currentIndex + 1, sections.length - 1)),
      prev: () => goTo(Math.max(currentIndex - 1, 0)),
      goTo,
      getIndex: () => currentIndex,
    }));

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full [--vh-multiplier:85vh] md:[--vh-multiplier:100vh]",
          className,
        )}
        style={{ height: `calc(var(--vh-multiplier) * ${sections.length})` }} // Make the page tall enough to scroll
      >
        <div
          ref={containerRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Sticky Viewport */}
        <div className="sticky top-0 h-svh w-full overflow-hidden flex flex-col items-center justify-center">
          {/* 1. Background Layer */}
          <BackgroundLayer sections={sections} currentIndex={currentIndex} />

          {/* 2. Content Grid */}
          <div className="relative z-20 w-full h-full max-w-[1800px] mx-auto px-6 grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1fr] items-center pointer-events-auto">
            {/* Left Column - List */}
            <div className="hidden md:flex flex-col gap-4 text-white/40 text-lg font-bold">
              {sections.map((section, idx) => (
                <button
                  key={`left-${idx}`}
                  onClick={() => goTo(idx)}
                  className={cn(
                    "text-left transition-all duration-300 hover:text-white flex items-center gap-4",
                    currentIndex === idx &&
                      "text-white scale-105 origin-left pl-4",
                  )}
                >
                  {currentIndex === idx && (
                    <motion.div
                      layoutId="active-dot-left"
                      className="w-2 h-2 bg-white rounded-full"
                    />
                  )}
                  {section.leftLabel}
                </button>
              ))}
            </div>

            {/* Center Column - Active Title */}
            <div className="flex items-center justify-center min-h-[200px]">
              <AnimatePresence mode="wait">
                <div key={currentIndex}>
                  <CenterTitle title={sections[currentIndex].title} />
                </div>
              </AnimatePresence>
            </div>

            {/* Right Column - List */}
            <div className="hidden md:flex flex-col gap-4 text-white/40 text-lg font-bold items-end text-right">
              {sections.map((section, idx) => (
                <button
                  key={`right-${idx}`}
                  onClick={() => goTo(idx)}
                  className={cn(
                    "text-right transition-all duration-300 hover:text-white flex items-center gap-4 flex-row-reverse",
                    currentIndex === idx &&
                      "text-white scale-105 origin-right pr-4",
                  )}
                >
                  {currentIndex === idx && (
                    <motion.div
                      layoutId="active-dot-right"
                      className="w-2 h-2 bg-white rounded-full"
                    />
                  )}
                  {section.rightLabel}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Progress Bar & Footer */}
          <div className="absolute bottom-8 w-full px-8 flex flex-col items-center z-30 text-white">
            {/* Simple footer tex */}
            <div className="mb-4 text-xs tracking-[0.2em] font-medium opacity-70">
              SCROLLEN ZUM ENTDECKEN
            </div>

            {/* Bar */}
            <div className="w-[200px] h-[2px] bg-white/20 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-white"
                style={{ scaleX: smoothProgress, originX: 0 }}
              />
            </div>
            {/* Numbers */}
            <div className="w-[200px] flex justify-between text-[10px] mt-2 font-mono opacity-80">
              <span>{String(currentIndex + 1).padStart(2, "0")}</span>
              <span>{String(sections.length).padStart(2, "0")}</span>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

FullScreenScrollFX.displayName = "FullScreenScrollFX";
