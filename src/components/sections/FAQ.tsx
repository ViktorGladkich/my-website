"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Shared Sticky Corner Component
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

// FAQ Data
const faqs = [
  {
    question: "Was beinhalten Ihre Branding-Dienstleistungen?",
    answer:
      "Unsere Branding-Services umfassen eine umfassende Markenstrategie, Logo-Design, visuelle Identitätssysteme (Farben, Typografie), Brand Guidelines und Design-Assets für verschiedene Kanäle. Wir sorgen dafür, dass Ihre Marke konsistent und wirkungsvoll auftritt.",
  },
  {
    question: "Wie lange dauert ein typisches Projekt?",
    answer:
      "Die Dauer hängt vom Umfang des Projekts ab. Ein Branding-Projekt dauert in der Regel 4-6 Wochen, während eine komplexe Website-Entwicklung 8-12 Wochen in Anspruch nehmen kann. Wir erstellen zu Beginn einen detaillierten Zeitplan.",
  },
  {
    question: "Bieten Sie mobile-first Designs an?",
    answer:
      "Ja, absolut. Alle unsere Webdesigns folgen dem Mobile-First-Ansatz, um sicherzustellen, dass Ihre Website auf Smartphones, Tablets und Desktops gleichermaßen hervorragend aussieht und funktioniert.",
  },
  {
    question: "Entwickeln Sie maßgeschneiderte Lösungen?",
    answer:
      "Ja, wir spezialisieren uns auf maßgeschneiderte Webentwicklung. Wir nutzen keine Standard-Templates, sondern entwickeln individuelle Lösungen, die genau auf Ihre geschäftlichen Anforderungen zugeschnitten sind.",
  },
  {
    question: "Kann ich meine Website später selbst aktualisieren?",
    answer:
      "Selbstverständlich. Wir integrieren benutzerfreundliche CMS-Systeme (wie WordPress, Sanity oder Strapi), die es Ihnen ermöglichen, Texte, Bilder und Inhalte einfach selbst zu verwalten, ohne Programmierkenntnisse.",
  },
  {
    question: "Wie messen Sie den Erfolg von Marketingkampagnen?",
    answer:
      "Wir setzen auf datengestütztes Marketing. Wir implementieren Tracking-Tools und Analytics, um wichtige KPIs zu überwachen. Sie erhalten regelmäßige Berichte über Traffic, Conversions und ROI Ihrer Kampagnen.",
  },
];

const AccordionItem = ({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="border-b border-neutral-800 last:border-none">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between py-6 text-left focus:outline-none group"
      >
        <span
          className={cn(
            "text-lg md:text-xl font-medium transition-colors duration-300",
            isOpen ? "text-white" : "text-neutral-400 group-hover:text-white",
          )}
        >
          {question}
        </span>
        <div
          className={cn(
            "relative flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ml-4 shrink-0",
            isOpen
              ? "border-white bg-white text-black rotate-45"
              : "border-neutral-700 text-neutral-400 group-hover:border-neutral-500 group-hover:text-white",
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-base md:text-lg text-neutral-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-black py-24 md:py-32 w-full">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-8 md:mb-12">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-blue-500 font-bold tracking-wider uppercase w-fit">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
            Klare Antworten auf <br />
            <span className="text-neutral-500">Ihre Fragen.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column: Image */}
          <div className="sticky top-24">
            {/* Image with Sticky Corner */}
            <div className="relative w-full max-w-[500px] aspect-square rounded-[40px] overflow-hidden hidden lg:block group">
              <Image
                src="/images/about/about-vision.png" // Placeholder - using existing image
                alt="FAQ Visual"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Sticky Corner Effect - Bottom Left */}
              <div className="absolute bottom-0 left-0 z-20">
                {/* Top Connector */}
                <StickyCorner
                  className="absolute -top-10 left-0 w-10 h-10"
                  fill="#000000"
                  style={{ transform: "rotate(90deg)" }}
                />

                {/* The visual Block itself */}
                <div className="bg-black w-32 h-32 rounded-tr-[40px] flex items-center justify-center relative">
                  {/* Rotating Text */}
                  <div className="absolute inset-0 animate-spin-slow flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                      <path
                        id="curve"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        fill="transparent"
                      />
                      <text className="fill-white text-[12px] font-bold uppercase tracking-[0.15em]">
                        <textPath href="#curve" startOffset="0%">
                          • FAQ • Support • Hilfe • Info
                        </textPath>
                      </text>
                    </svg>
                  </div>

                  {/* Logo Center */}
                  <div className="relative z-10 w-12 h-12">
                    <Image
                      src="/logo.png"
                      alt="Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Right Connector */}
                <StickyCorner
                  className="absolute bottom-0 -right-10 w-10 h-10"
                  fill="#000000"
                  style={{ transform: "rotate(90deg)" }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
