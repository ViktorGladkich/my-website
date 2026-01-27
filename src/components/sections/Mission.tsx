"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Trophy, Quote, Star } from "lucide-react";
import { useInView, useSpring, useMotionValue } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

function Counter({
  value,
  direction = "up",
  className,
}: {
  value: number;
  direction?: "up" | "down";
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 50,
  });
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(direction === "down" ? 0 : value);
    } else {
      // Reset to 0 when out of view so it can animate up again
      motionValue.set(direction === "down" ? value : 0);
    }
  }, [isInView, motionValue, direction, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("de-DE").format(
          Number(latest.toFixed(0)),
        );
      }
    });
  }, [springValue]);

  return <span ref={ref} className={className} />;
}

export function Mission() {
  return (
    <section className="bg-black py-24 text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <ScrollReveal
          variant="fadeUp"
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
        >
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Unsere Mission
          </h2>
          <p className="max-w-md text-gray-400 text-sm md:text-base leading-relaxed text-right">
            Wir helfen visionären Marken, ihre digitale Identität zu definieren.
            Durch Strategie, Design und Code verwandeln wir komplexe
            Herausforderungen in elegante, skalierbare Lösungen.
          </p>
        </ScrollReveal>

        {/* Bento Grid layout - 12 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* LEFT COLUMN (Image + Satisfied Strip) - Spans 4/12 */}
          <div className="md:col-span-4 flex flex-col gap-4">
            {/* 1. Large Image Card */}
            <ScrollReveal
              variant="scaleUp"
              delay={0.1}
              className="relative group overflow-hidden rounded-3xl bg-neutral-900 border border-white/10 flex-1 min-h-[400px]"
            >
              <div className="w-full h-full relative">
                <Image
                  src="/portfolio/mission_helmet.png"
                  alt="Future Vision"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
              </div>
              <div className="absolute bottom-4 left-4">
                <div className="bg-white/10 backdrop-blur-md rounded-full p-3 border border-white/20">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-4 h-4 text-white"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
              </div>
            </ScrollReveal>

            {/* 6. Satisfied Clients Strip (Made bigger p-6) */}
            <ScrollReveal
              variant="slideRight"
              delay={0.2}
              className="bg-neutral-900 border border-white/10 rounded-3xl p-6 flex items-center justify-between min-h-[140px]"
            >
              <div className="flex -space-x-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-12 h-12 rounded-full border-2 border-black bg-neutral-${i * 200} flex items-center justify-center overflow-hidden`}
                  >
                    <div className="w-full h-full bg-linear-to-br from-purple-500 to-blue-500 opacity-80" />
                  </div>
                ))}
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold flex justify-end items-center">
                  <Counter value={107} />+
                </p>
                <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">
                  Projekte geliefert
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT COLUMN (Grid of 4 Cards) - Spans 8/12 */}
          <div className="md:col-span-8 flex flex-col gap-4">
            {/* Row 1: Quote (Longer) + Awards */}
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              {/* 2. Quote Card (Wider ~60%) */}
              <ScrollReveal
                variant="fadeUp"
                delay={0.2}
                className="md:w-[60%] bg-white text-black p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden group min-h-[260px]"
              >
                <Quote className="w-10 h-10 text-neutral-200 absolute top-4 right-4 fill-current" />
                <p className="text-lg font-medium relative z-10 leading-snug">
                  &quot;Inverta hat nicht nur ein Produkt gebaut; sie haben
                  unsere gesamte Wachstumsmaschine entwickelt. Der ROI war
                  sofort spürbar.&quot;
                </p>
                <div className="mt-6">
                  <p className="font-bold text-sm">Alex V.</p>
                  <p className="text-neutral-500 text-xs">Gründer, TechSpace</p>
                </div>
              </ScrollReveal>

              {/* 3. Awards Card (Narrower ~40%) */}
              <ScrollReveal
                variant="scaleUp"
                delay={0.3}
                className="md:w-[40%] bg-neutral-900 border border-white/10 p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between group hover:border-white/20 transition-colors min-h-[260px]"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-neutral-800 rounded-full translate-x-10 -translate-y-10 group-hover:bg-neutral-700 transition-colors" />

                <div>
                  <h3 className="text-5xl font-bold bg-clip-text text-transparent bg-linear-to-b from-white to-gray-500 flex items-center">
                    <Counter value={12} />+
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Internationale Auszeichnungen
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                  <div className="flex items-center gap-1 text-[10px]">
                    <Star className="w-3 h-3 fill-white" /> CSSDA
                  </div>
                  <div className="flex items-center gap-1 text-[10px]">
                    <Trophy className="w-3 h-3" /> Awwwards
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Row 2: Retention + Blue (Longer) */}
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              {/* 4. Client Retention (Narrower ~35%) */}
              <ScrollReveal
                variant="fadeUp"
                delay={0.3}
                className="md:w-[45%] bg-neutral-100 text-black p-8 rounded-3xl flex flex-col justify-center gap-2 relative group overflow-hidden min-h-[260px]"
              >
                <h3 className="text-6xl font-bold tracking-tighter flex items-center">
                  <Counter value={91} />%
                </h3>
                <p className="font-semibold text-sm">Kundenbindung</p>
                <p className="text-neutral-500 text-xs max-w-[20ch]">
                  Partnerschaften aufbauen, die Jahre halten.
                </p>
              </ScrollReveal>

              {/* 5. Blue Action Card (Wider ~65%) */}
              <ScrollReveal
                variant="slideRight"
                delay={0.4}
                className="md:w-[55%] bg-blue-600 p-8 rounded-3xl flex flex-col justify-between text-white relative group overflow-hidden min-h-[260px]"
              >
                <div className="absolute top-4 left-4 bg-blue-500/50 p-2 rounded-full">
                  <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                </div>

                <div className="mt-12 space-y-4">
                  <p className="text-xl font-medium leading-snug">
                    Bereit, Ihren Markt zu dominieren? Lassen Sie uns etwas
                    Außergewöhnliches bauen.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Footer Spectrum */}
        <ScrollReveal
          variant="fadeUp"
          delay={0.5}
          className="mt-20 text-center space-y-6"
        >
          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="animate-spin-slow object-contain"
              unoptimized
            />
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-widest text-white">
            Spektrum erweitern
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Wir beschränken uns nicht auf einen Stil oder ein Medium — wir leben
            von Vielseitigkeit.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
