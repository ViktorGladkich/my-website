"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
  Rocket,
  LayoutTemplate,
  Terminal,
  Search,
  Share2,
  Gauge,
  Zap,
} from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Types
type ServiceCategory = "web" | "marketing" | "design";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  icon: React.ElementType;
  gradient: string;
  image: string;
}

// Data - German Content with Images
const serviceItems: ServiceItem[] = [
  {
    id: "1",
    title: "Website & Onlineshop",
    description:
      "Maßgeschneiderte Webauftritte und E-Commerce Lösungen, die konvertieren. Von Landingpages bis zu komplexen Shopsystemen.",
    category: "web",
    icon: LayoutTemplate,
    gradient: "from-purple-500 to-indigo-600",
    image: "/images/services/service_web_real.png",
  },
  {
    id: "4",
    title: "SEO & Sichtbarkeit",
    description:
      "Suchmaschinenoptimierung für nachhaltiges organisches Wachstum. Werden Sie gefunden, wenn es darauf ankommt.",
    category: "marketing",
    icon: Search,
    gradient: "from-orange-400 to-red-500",
    image: "/images/services/service_seo_real_placeholder.png",
  },
  {
    id: "2",
    title: "Programmierung",
    description:
      "Individuelle Softwarelösungen und saubere Code-Strukturen für Ihr Business. React, Next.js, Node.js Experten.",
    category: "web",
    icon: Terminal,
    gradient: "from-blue-400 to-cyan-500",
    image: "/images/services/service_coding_real.png",
  },
  {
    id: "5",
    title: "Social Media",
    description:
      "Strategisches Social Media Marketing und Community Management. Bauen Sie eine echte Beziehung zu Ihrer Zielgruppe auf.",
    category: "marketing",
    icon: Share2,
    gradient: "from-pink-500 to-rose-500",
    image: "/images/services/service_social_real_placeholder.png",
  },
  {
    id: "6",
    title: "Performance",
    description:
      "Ladezeitoptimierung und kontinuierlicher Support für maximale Leistung. High-End Hosting und Wartung.",
    category: "web",
    icon: Gauge,
    gradient: "from-emerald-400 to-green-600",
    image: "/images/services/service_performance_real_placeholder.png",
  },
  {
    id: "3",
    title: "Relaunch & Funnels",
    description:
      "Modernisierung bestehender Systeme und verkaufspsychologische Funnelsysteme für maximalen Umsatz.",
    category: "marketing",
    icon: Rocket,
    gradient: "from-amber-400 to-orange-600",
    image: "/images/services/service_relaunch_real_placeholder.jpg",
  },
];

export function AboutUsSection() {
  const [activeCard, setActiveCard] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white w-full py-24"
    >
      {/* Header */}
      <div className="container mx-auto px-4 text-center mb-24 md:mb-32">
        <motion.span
          className="text-purple-400 font-medium mb-4 flex items-center justify-center gap-2 uppercase tracking-wider text-sm"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Zap className="w-4 h-4" />
          VON DER VISION ZUR REALITÄT
        </motion.span>
        <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-linear-to-b from-white to-white/60">
          Unsere Expertise
        </h2>
        <p className="max-w-3xl mx-auto text-neutral-400 text-lg leading-relaxed mt-4">
          Wir sind ein Team aus digitalen Architekten und Strategen. Entdecken
          Sie unser Universum an Dienstleistungen.
        </p>
      </div>

      {/* 3-Column Layout */}
      <div className="container mx-auto px-4">
        {/* Mobile: Simple Stack */}
        <div className="md:hidden flex flex-col gap-12">
          {serviceItems.map((item) => (
            <div key={item.id} className="relative group">
              <div
                className={cn(
                  "w-full h-64 rounded-2xl mb-6 flex items-center justify-center overflow-hidden relative border border-white/10",
                  item.gradient,
                )}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                />
                {React.createElement(item.icon, {
                  className:
                    "w-16 h-16 text-white relative z-10 drop-shadow-lg",
                })}
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-neutral-400">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Desktop: 3-Col Sticky Grid */}
        <div className="hidden md:grid grid-cols-12 gap-8 relative items-start">
          {/* Left Column (Text for Evens) */}
          <div className="col-span-4 flex flex-col pt-[20vh] pb-[20vh]">
            {serviceItems.map((item, index) => {
              if (index % 2 !== 0)
                return <div key={item.id} className="h-[80vh]" />; // Spacer for right-side items
              return (
                <ServiceScrollItem
                  key={item.id}
                  item={item}
                  index={index}
                  setActiveCard={setActiveCard}
                  align="left"
                />
              );
            })}
          </div>

          {/* Center Column (Sticky Image) */}
          <div className="col-span-4 sticky top-24 h-[90vh] flex items-center justify-center z-0">
            <div className="relative w-full aspect-[3/4] max-h-[700px] rounded-[3rem] overflow-hidden border border-white/10 bg-black shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCard}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  {/* Real Image */}
                  <Image
                    src={serviceItems[activeCard].image}
                    alt={serviceItems[activeCard].title}
                    fill
                    className="object-cover opacity-90"
                  />

                  {/* Subtle Gradient Overlay */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/80",
                    )}
                  />

                  {/* Central Content (Icon + Title overlay) */}
                  <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end p-8 text-center pb-16">
                    <div
                      className={cn(
                        "w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-white/10 backdrop-blur-md border border-white/20 shadow-xl",
                      )}
                    >
                      {React.createElement(serviceItems[activeCard].icon, {
                        className: "w-10 h-10 text-white",
                      })}
                    </div>
                    <h3 className="text-3xl font-bold mb-2 text-white drop-shadow-md">
                      {serviceItems[activeCard].title}
                    </h3>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column (Text for Odds) */}
          <div className="col-span-4 flex flex-col pt-[20vh] pb-[20vh]">
            {serviceItems.map((item, index) => {
              if (index % 2 === 0)
                return <div key={item.id} className="h-[80vh]" />; // Spacer for left-side items
              return (
                <ServiceScrollItem
                  key={item.id}
                  item={item}
                  index={index}
                  setActiveCard={setActiveCard}
                  align="right"
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// Move component outside to fix scope
function ServiceScrollItem({
  item,
  index,
  setActiveCard,
  align,
}: {
  item: ServiceItem;
  index: number;
  setActiveCard: (idx: number) => void;
  align: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (isInView) {
      setActiveCard(index);
    }
  }, [isInView, index, setActiveCard]);

  return (
    <div
      ref={ref}
      className={cn(
        "h-[80vh] flex flex-col justify-center relative z-20",
        align === "left" ? "text-left pr-8" : "text-left pl-8",
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ margin: "-20%" }}
      >
        <div className="md:hidden w-full h-48 relative mb-6 rounded-2xl overflow-hidden border border-white/10">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>
        <h3 className="text-3xl font-bold mb-6 text-white leading-tight">
          {item.title}
        </h3>
        <p className="text-lg text-neutral-400 leading-relaxed">
          {item.description}
        </p>
      </motion.div>
    </div>
  );
}
