"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    id: "webdesign",
    number: "01",
    title: "Webdesign",
    subtitle: "UI / UX Design",
    description:
      "Wir gestalten nicht nur Websites, sondern digitale Erlebnisse. Jedes Pixel ist darauf ausgerichtet, Ihre Marke zu stärken und Ihre Besucher zu begeistern. Von der ersten Skizze bis zum finalen Interface.",
    features: [
      "Responsive Design",
      "User Experience (UX)",
      "User Interface (UI)",
      "Interaktive Prototypen",
    ],
    imageUrl: "/images/services/webdesign.png",
  },
  {
    id: "relaunch",
    number: "02",
    title: "Relaunch",
    subtitle: "Modernisierung",
    description:
      "Bringen Sie Ihre digitale Präsenz auf das nächste Level. Wir analysieren Ihre bestehende Seite und transformieren sie in eine moderne, hochperformante Verkaufsmaschine.",
    features: [
      "Performance Audit",
      "SEO-Optimierung",
      "Content Migration",
      "Technologie-Upgrade",
    ],
    imageUrl: "/images/services/relaunch.png",
  },
  {
    id: "funnels",
    number: "03",
    title: "Funnelsystem",
    subtitle: "Leadgenerierung",
    description:
      "Verwandeln Sie Besucher in loyale Kunden. Unsere automatisierten Sales-Funnel arbeiten rund um die Uhr für Sie, um qualifizierte Leads zu generieren und Verkäufe abzuschließen.",
    features: [
      "Conversion Optimierung",
      "Email Automation",
      "Landing Page Design",
      "A/B Testing",
    ],
    imageUrl: "/images/services/funnel.png",
  },
  {
    id: "coding",
    number: "04",
    title: "Programmierung",
    subtitle: "Entwicklung",
    description:
      "Maßgeschneiderte Softwarelösungen für komplexe Anforderungen. Wir entwickeln skalierbare, sichere und zukunftssichere Anwendungen mit modernsten Technologien.",
    features: [
      "Full Stack Development",
      "API Integration",
      "Datenbank-Architektur",
      "Cloud Solutions",
    ],
    imageUrl: "/images/services/coding.png",
  },
  {
    id: "marketing",
    number: "05",
    title: "Marketing",
    subtitle: "Wachstum",
    description:
      "Sichtbarkeit ist die Währung des digitalen Zeitalters. Wir platzieren Ihre Marke dort, wo Ihre Zielgruppe ist, und sorgen für nachhaltiges Wachstum.",
    features: [
      "SEO & SEA",
      "Social Media Strategy",
      "Content Marketing",
      "Analytics & Reporting",
    ],
    imageUrl: "/images/services/marketing.png",
  },
];

export function Services() {
  const [activeId, setActiveId] = useState<string | null>("webdesign");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="bg-black py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <h3 className="text-purple-500 font-medium mb-4 tracking-widest uppercase text-sm">
              Unsere Expertise
            </h3>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9]">
              ENTDECKEN SIE <br />
              <span className="text-neutral-500">UNSERE LEISTUNGEN</span>
            </h2>
          </div>
          <div className="hidden lg:block relative max-w-xs text-right">
            <p className="text-white/60 text-lg leading-relaxed">
              Wir verwandeln komplexe Herausforderungen in elegante digitale
              Lösungen. Präzises Design trifft auf moderne Technologie.
            </p>
          </div>
        </div>

        <div className="flex flex-col border-t border-white/10">
          {SERVICES.map((service) => (
            <ServiceItem
              key={service.id}
              service={service}
              isOpen={activeId === service.id}
              onClick={() =>
                setActiveId(activeId === service.id ? null : service.id)
              }
              onHover={() => setHoveredId(service.id)}
              onLeave={() => setHoveredId(null)}
            />
          ))}
        </div>
      </div>

      <FloatingImage services={SERVICES} hoveredId={hoveredId} />
    </section>
  );
}

function ServiceItem({
  service,
  isOpen,
  onClick,
  onHover,
  onLeave,
}: {
  service: (typeof SERVICES)[0];
  isOpen: boolean;
  onClick: () => void;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <div className="group border-b border-white/10 relative transition-colors duration-500">
      <button
        onClick={onClick}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        className="w-full text-left py-8 md:py-12 flex items-start md:items-center justify-between gap-6 relative z-20 outline-hidden"
      >
        <div className="flex items-baseline gap-4 md:gap-12 pl-4 md:pl-8">
          <span className="text-sm md:text-base font-mono font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-blue-500 transition-colors duration-300">
            {service.number}
          </span>
          <div>
            <div className="relative">
              <h3
                className={cn(
                  "text-3xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter transition-opacity duration-500",
                  isOpen
                    ? "opacity-0"
                    : "text-white/80 opacity-100 group-hover:opacity-0",
                )}
              >
                {service.title}
              </h3>
              <h3
                className={cn(
                  "absolute inset-0 text-3xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-blue-500 transition-opacity duration-500",
                  isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                )}
              >
                {service.title}
              </h3>
            </div>
            <span
              className={cn(
                "block mt-2 text-sm md:text-lg tracking-wide transition-opacity duration-300",
                isOpen
                  ? "text-purple-400 opacity-100"
                  : "text-white/40 opacity-0 group-hover:opacity-100",
              )}
            >
              {service.subtitle}
            </span>
          </div>
        </div>

        <div className="pr-4 md:pr-8">
          <div
            className={cn(
              "w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border transition-all duration-300",
              isOpen
                ? "border-transparent bg-linear-to-r from-purple-500 to-blue-500 text-white rotate-180"
                : "border-white/20 text-white group-hover:border-white group-hover:rotate-90",
            )}
          >
            {isOpen ? (
              <Minus className="w-5 h-5 md:w-6 md:h-6" />
            ) : (
              <Plus className="w-5 h-5 md:w-6 md:h-6" />
            )}
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-12 md:pb-16 pl-4 md:pl-[calc(2rem+3rem+1rem)] lg:pl-[calc(2rem+3rem+3rem)] pr-4 md:pr-12 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
              <div className="flex-1">
                <p className="text-base md:text-xl leading-relaxed text-gray-300 max-w-2xl">
                  {service.description}
                </p>
              </div>

              <div className="flex-1 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-12">
                <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">
                  Features
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  {service.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-gray-400"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="mt-10 group/btn flex items-center gap-2 text-white border-b border-white/30 pb-1 hover:border-white transition-colors">
                  <span className="uppercase tracking-widest text-sm font-medium">
                    Mehr erfahren
                  </span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FloatingImage({
  services,
  hoveredId,
}: {
  services: typeof SERVICES;
  hoveredId: string | null;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const activeService = services.find((s) => s.id === hoveredId);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (hoveredId) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hoveredId]);

  return (
    <motion.div
      className="fixed z-50 pointer-events-none hidden lg:block"
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      transition={{
        type: "spring",
        mass: 0.6,
        stiffness: 100,
        damping: 15,
      }}
      style={{
        top: 0,
        left: 0,
      }}
    >
      <AnimatePresence>
        {activeService && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -20, borderRadius: 24 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 12,
              y: -100,
              x: 20,
              borderRadius: 24,
            }}
            exit={{ opacity: 0, scale: 0.5, rotate: 20, borderRadius: 24 }}
            transition={{ duration: 0.3, ease: "backOut" }}
            style={{ borderRadius: 24 }}
            className="overflow-hidden rounded-3xl shadow-2xl border border-white/20 w-[280px] h-[200px] bg-neutral-900 absolute top-0 left-0"
          >
            <AnimatePresence>
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 overflow-hidden rounded-3xl"
              >
                <Image
                  src={activeService.imageUrl}
                  alt={activeService.title}
                  fill
                  className="object-cover rounded-3xl"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-black/60 backdrop-blur-md px-2 py-1 rounded-md">
                    {activeService.subtitle}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
