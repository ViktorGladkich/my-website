"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";

// Types for Timeline Data
interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
}

const timelineData: TimelineItem[] = [
  {
    id: "1",
    date: "Januar 2020",
    title: "Gründung von BrightEdge",
    description:
      "Startschuss mit der Vision, digitales Marketing durch innovative Strategien und Spitzentechnologie neu zu definieren.",
    image: "/images/about/about_story_small.png",
  },
  {
    id: "2",
    date: "Juli 2021",
    title: "Ganzheitliches Branding",
    description:
      "Erweiterung unseres Angebots um Branding-Lösungen. Wir schaffen Identitäten, die im Gedächtnis bleiben.",
    image: "/branding_showcase.jpeg",
  },
  {
    id: "3",
    date: "Mai 2023",
    title: "High-End Webentwicklung",
    description:
      "Fokus auf modernste Webtechnologien. Wir entwickeln performante, skalierbare und visuell beeindruckende Plattformen.",
    image: "/images/services/service_web_real.png",
  },
  {
    id: "4",
    date: "Februar 2025",
    title: "Digital Marketing Expansion",
    description:
      "Integration datengetriebener Marketing-Strategien für maximales Wachstum und Sichtbarkeit unserer Kunden.",
    image: "/images/services/marketing.png",
  },
  {
    id: "5",
    date: "November 2026",
    title: "Zukunftsvision & Skalierung",
    description:
      "Ein Meilenstein, der für sich spricht. Wir expandieren international und setzen neue Maßstäbe in der Branche.",
    image: "/images/about/about-global.png",
  },
];

export function JourneyTimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"],
  });

  return (
    <section
      ref={containerRef}
      className="w-full py-24 bg-black text-white relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-900/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <motion.span
            className="text-purple-400 font-medium mb-4 flex items-center justify-center gap-2 uppercase tracking-wider text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Zap className="w-4 h-4" />
            UNSERE REISE
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Meilensteine unseres Wachstums
          </motion.h2>
        </div>

        <div className="relative">
          {/* Vertical Line - Background */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 transform -translate-x-1/2" />

          {/* Animated Progress Line */}
          <motion.div
            className="absolute left-8 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500 transform -translate-x-1/2 origin-top"
            style={{
              height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
            }}
          />

          <div className="flex flex-col gap-16 md:gap-32">
            {timelineData.map((item, index) => (
              <TimelineRow key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineRow({ item, index }: { item: TimelineItem; index: number }) {
  // Alternating layout
  const isEve = index % 2 === 0;

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row items-center justify-between w-full relative",
        !isEve && "md:flex-row-reverse",
      )}
    >
      {/* Date Column (Opposite Side) */}
      <div
        className={cn(
          "w-full md:w-5/12 hidden md:flex",
          isEve ? "justify-end pr-16" : "justify-start pl-16",
        )}
      >
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          {item.date}
        </span>
      </div>

      {/* Mobile Date & Dot Wrapper */}
      <div className="flex md:hidden w-full mb-6 pl-20 relative">
        <span className="text-xl font-bold text-purple-400">{item.date}</span>
      </div>

      {/* Center Dot */}
      <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-black border-2 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.5)] z-20 transform -translate-x-1/2" />

      {/* Content Column */}
      <div
        className={cn(
          "w-full md:w-5/12 pl-20 md:pl-0",
          isEve ? "md:pl-16" : "md:pr-16",
        )}
      >
        <motion.div
          initial={{ opacity: 0, x: isEve ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ margin: "-20%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="group relative"
        >
          <div className="mb-6">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">
              {item.title}
            </h3>
            <p className="text-neutral-400 text-lg leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="w-full aspect-video relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white/5">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
