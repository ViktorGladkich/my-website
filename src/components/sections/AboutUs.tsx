"use client";

import React, { useEffect, useRef } from "react";
import {
  Rocket,
  LayoutTemplate,
  Terminal,
  Search,
  Share2,
  Gauge,
  Zap,
  CheckCircle2,
  Trophy,
  Users,
  Timer,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  Variants,
} from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function AboutUsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 });

  // Parallax effect for decorative elements
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const webServices = [
    {
      icon: <LayoutTemplate className="w-6 h-6" />,
      title: "Website & Onlineshop",
      description:
        "Maßgeschneiderte Webauftritte und E-Commerce Lösungen, die konvertieren.",
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Relaunch & Funnels",
      description:
        "Modernisierung bestehender Systeme und verkaufspsychologische Funnelsysteme.",
    },
    {
      icon: <Terminal className="w-6 h-6" />,
      title: "Programmierung",
      description:
        "Individuelle Softwarelösungen und saubere Code-Strukturen für Ihr Business.",
    },
  ];

  const marketingServices = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "SEO & Sichtbarkeit",
      description:
        "Suchmaschinenoptimierung für nachhaltiges organisches Wachstum.",
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Social Media",
      description:
        "Strategisches Social Media Marketing und Community Management.",
    },
    {
      icon: <Gauge className="w-6 h-6" />,
      title: "Performance",
      description:
        "Ladezeitoptimierung und kontinuierlicher Support für maximale Leistung.",
    },
  ];

  const stats = [
    { icon: <CheckCircle2 />, value: 150, label: "Projekte", suffix: "+" },
    { icon: <Users />, value: 98, label: "Zufriedenheit", suffix: "%" },
    { icon: <Timer />, value: 12, label: "Jahre Erfahrung", suffix: "" },
    { icon: <Trophy />, value: 24, label: "Awards", suffix: "" },
  ];

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="w-full py-24 px-4 bg-black text-white overflow-hidden relative"
    >
      {/* Decorative background elements - Adapted for Dark Mode */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl pointer-events-none"
        style={{ y: y1, rotate: rotate1 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"
        style={{ y: y2, rotate: rotate2 }}
      />

      {/* Floating particles */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-2 h-2 rounded-full bg-purple-500/30"
        animate={{
          y: [0, -15, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="container mx-auto max-w-7xl relative z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div
          className="flex flex-col items-center mb-16"
          variants={itemVariants}
        >
          <motion.span
            className="text-purple-400 font-medium mb-4 flex items-center gap-2 uppercase tracking-wider text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Zap className="w-4 h-4" />
            VON DER VISION ZUR REALITÄT
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-center bg-clip-text text-transparent bg-linear-to-b from-white to-white/60">
            Unsere Expertise
          </h2>
          <motion.div
            className="w-24 h-1 bg-linear-to-r from-purple-500 to-blue-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <motion.p
          className="text-center max-w-3xl mx-auto mb-20 text-neutral-400 text-lg leading-relaxed"
          variants={itemVariants}
        >
          Wir sind ein Team aus digitalen Architekten und Strategen. Wir
          verbinden technologische Exzellenz mit kreativem Marketing, um Marken
          nicht nur sichtbar, sondern unvergesslich zu machen.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative items-center">
          {/* Left Column - Webentwicklung */}
          <div className="space-y-12 order-2 lg:order-1">
            <h3 className="text-2xl font-bold text-center lg:text-right mb-8 text-neutral-200 uppercase tracking-widest hidden lg:block">
              Webentwicklung
            </h3>
            {webServices.map((service, index) => (
              <ServiceItem
                key={`web-${index}`}
                icon={service.icon}
                title={service.title}
                description={service.description}
                variants={itemVariants}
                delay={index * 0.2}
                direction="left"
              />
            ))}
          </div>

          {/* Center Image */}
          <div className="flex justify-center items-center order-1 lg:order-2 mb-12 lg:mb-0 relative">
            <motion.div
              className="relative w-full max-w-sm aspect-3/4"
              variants={itemVariants}
            >
              <motion.div
                className="absolute inset-0 bg-linear-to-tr from-purple-500/20 to-blue-500/20 rounded-2xl transform rotate-3"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 3 }}
                transition={{ duration: 1, delay: 0.4 }}
              />
              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-2xl h-full border border-white/10"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
                  alt="Digital Technology"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end justify-center p-6"></div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Marketing */}
          <div className="space-y-12 order-3">
            <h3 className="text-2xl font-bold text-center lg:text-left mb-8 text-neutral-200 uppercase tracking-widest hidden lg:block">
              Marketing
            </h3>
            {marketingServices.map((service, index) => (
              <ServiceItem
                key={`marketing-${index}`}
                icon={service.icon}
                title={service.title}
                description={service.description}
                variants={itemVariants}
                delay={index * 0.2}
                direction="right"
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          className="mt-32 grid grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate={isStatsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <StatCounter
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={index * 0.1}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

interface ServiceItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  variants: Variants;
  delay: number;
  direction: "left" | "right";
}

function ServiceItem({
  icon,
  title,
  description,
  variants,
  delay,
  direction,
}: ServiceItemProps) {
  return (
    <motion.div
      className={cn(
        "flex flex-col group relative",
        direction === "left"
          ? "lg:items-end lg:text-right"
          : "lg:items-start lg:text-left",
        "items-center text-center",
      )}
      variants={variants}
      transition={{ delay }}
    >
      <div
        className={cn(
          "flex items-center gap-4 mb-3",
          direction === "left" ? "lg:flex-row-reverse" : "lg:flex-row",
        )}
      >
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-purple-400 group-hover:text-white group-hover:bg-purple-600/20 transition-all duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors duration-300">
          {title}
        </h3>
      </div>
      <p className="text-neutral-500 text-sm leading-relaxed max-w-xs group-hover:text-neutral-300 transition-colors duration-300">
        {description}
      </p>
    </motion.div>
  );
}

interface StatCounterProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix: string;
  delay: number;
}

function StatCounter({ icon, value, label, suffix, delay }: StatCounterProps) {
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: true }); // Animation only happens once

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 10,
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  const displayValue = useTransform(springValue, (latest) =>
    Math.floor(latest),
  );

  return (
    <motion.div
      className="bg-white/5 border border-white/5 backdrop-blur-sm p-8 rounded-2xl flex flex-col items-center text-center group hover:bg-white/10 transition-colors duration-300"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay },
        },
      }}
    >
      <div className="mb-4 text-neutral-500 group-hover:text-purple-400 transition-colors duration-300">
        {React.cloneElement(
          icon as React.ReactElement<{ size?: number; className?: string }>,
          {
            size: 32,
          },
        )}
      </div>
      <div
        ref={countRef}
        className="text-4xl font-bold text-white flex items-center mb-2"
      >
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </div>
      <p className="text-neutral-400 text-sm uppercase tracking-wider">
        {label}
      </p>
    </motion.div>
  );
}
