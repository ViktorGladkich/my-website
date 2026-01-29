"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants, useInView, animate } from "framer-motion";

// Sticky Corner Component
// SVG corner component for smoothing connections between blocks
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

const Counter = ({ from, to }: { from: number; to: number }) => {
  const nodeRef = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  React.useEffect(() => {
    if (isInView) {
      const node = nodeRef.current;
      const controls = animate(from, to, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          if (node) node.textContent = Math.floor(value).toString();
        },
      });
      return () => controls.stop();
    }
  }, [from, to, isInView]);

  return <span ref={nodeRef} />;
};

export function AboutStory() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="bg-black py-24 md:py-32 h-\[min-content\]"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-16 md:mb-24 flex flex-col md:flex-row gap-12 md:items-end justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div className="max-w-3xl" variants={itemVariants}>
            <span className=" text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-blue-500 font-bold tracking-wider uppercase mb-6 block">
              Über uns
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]">
              Wir verwandeln{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-500">
                Visionen
              </span>{" "}
              <br className="hidden md:block" />
              in <span className="text-neutral-500">digitale Realität.</span>
            </h2>
          </motion.div>
          <motion.p
            className="text-neutral-400 text-lg max-w-lg leading-relaxed mb-2"
            variants={itemVariants}
          >
            Entdecken Sie unsere Geschichte und erfahren Sie, was uns antreibt,
            außergewöhnliche digitale Erlebnisse zu schaffen, die Marken stärken
            und Unternehmen wachsen lassen – mit Fokus auf Wirkung statt Worte.
          </motion.p>
        </motion.div>

        {/* Main Grid Content */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[2.2fr_1fr] gap-10 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {/* Left Column: Large Image */}
          <motion.div
            className="relative rounded-[40px] overflow-hidden h-[400px] lg:h-[570px] group"
            variants={itemVariants}
          >
            <div className="absolute inset-0 w-full h-full">
              <Image
                src="/images/about/about_story_large.png"
                fill
                alt="Our Story Visual"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Bottom-left Overlay */}
            <div className="absolute bottom-0 left-0 z-20">
              {/* Top Connector */}
              <StickyCorner
                className="absolute -top-[40px] left-0 w-10 h-10"
                fill="#000000"
                style={{ transform: "rotate(90deg)" }}
              />

              {/* Overlay Content */}
              <div className="bg-[#000000] rounded-tr-[40px] p-2 relative">
                <div className="w-32 h-32 md:w-35 md:h-35 relative flex items-center justify-center">
                  <div className="absolute inset-0 animate-spin-slow">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <path
                        id="curve"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        fill="transparent"
                      />
                      <text className="fill-white text-[11px] font-bold uppercase tracking-[0.2em]">
                        <textPath href="#curve" startOffset="0%">
                          Kreieren • Idee • Einblick • Lösung •
                        </textPath>
                      </text>
                    </svg>
                  </div>
                  <div className="relative z-10 w-12 h-12 md:w-14 md:h-14">
                    <Image
                      src="/logo.png"
                      fill
                      alt="Logo"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Right Connector */}
              <StickyCorner
                className="absolute bottom-0 -right-[40px] w-10 h-10"
                fill="#000000"
                style={{ transform: "rotate(90deg)" }}
              />
            </div>
          </motion.div>

          {/* Right Column: Text & Secondary Image */}
          <motion.div
            className="flex flex-col-reverse lg:flex-col h-auto lg:h-[570px] gap-10"
            variants={itemVariants}
          >
            {/* Text Block with Overlay */}
            <div className="bg-neutral-900  rounded-[40px] p-6 md:p-5 pt-32 md:pt-35 relative">
              {/* Top-left Overlay */}
              <div className="absolute top-0 left-0 z-20">
                {/* Bottom Connector */}
                <StickyCorner
                  className="absolute -bottom-[40px] left-0 w-10 h-10"
                  fill="#000000"
                  style={{ transform: "rotate(180deg)" }}
                />

                {/* Сам черный блок оверлея */}
                <div className="bg-[#000000] rounded-br-[40px] py-10 px-10">
                  <p className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-blue-500 font-medium text-2xl">
                    Unser Ansatz
                  </p>
                </div>

                {/* Right Connector */}
                <StickyCorner
                  className="absolute top-0 -right-[40px] w-10 h-10"
                  fill="#000000"
                  style={{ transform: "rotate(180deg)" }}
                />
              </div>

              <p className="text-gray-400 text-xl md:text-xl leading-relaxed font-medium">
                Bei INVERTA Studio spezialisieren wir uns auf maßgeschneiderte
                Weblösungen – von Branding und Webdesign bis hin zu Entwicklung
                und Marketing – perfekt abgestimmt auf Ihre geschäftlichen
                Bedürfnisse.
              </p>
            </div>

            {/* Bottom Image */}
            <div className="relative w-full h-[300px] lg:h-[350px] rounded-[40px] overflow-hidden group">
              <Image
                src="/images/about/about_story_small.png"
                fill
                alt="Workspace"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Corner Accent */}
              <StickyCorner
                className="absolute top-0 right-0 w-10 h-10 rotate-180 z-10"
                fill="#000000"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 md:mt-24 border-t border-neutral-800 pt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {[
            { value: 10, suffix: "+", label: "Jahre Erfahrung" },
            { value: 481, suffix: "+", label: "Projekte" },
            { value: 258, suffix: "+", label: "Zufriedene Kunden" },
            { value: 93, suffix: "%", label: "Kundenzufriedenheit" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center md:text-left"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-1">
                <Counter from={0} to={stat.value} />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-500">
                  {stat.suffix}
                </span>
              </h3>
              <p className="text-neutral-500 text-sm md:text-base uppercase tracking-wider font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
