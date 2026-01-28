"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Link from "next/link";
import { motion } from "framer-motion";

export function CallToAction() {
  return (
    <div className="h-160 md:h-200 w-full bg-black relative flex flex-col items-center justify-center antialiased overflow-hidden px-4">
      <div className="max-w-4xl mx-auto relative z-10 w-full flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl md:text-7xl bg-clip-text text-transparent bg-linear-to-b from-neutral-200 to-neutral-600 font-sans font-bold leading-tight"
        >
          Bereit durchzustarten?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-neutral-400 max-w-2xl mx-auto my-8 text-lg md:text-xl leading-relaxed"
        >
          Lassen Sie uns gemeinsam digitale Maßstäbe setzen. Wir verwandeln
          komplexe Herausforderungen in elegante, benutzerzentrierte Lösungen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "backOut" }}
          viewport={{ once: true }}
          className="mt-4 flex justify-center"
        >
          <Link href="/contact">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="bg-black text-white flex items-center justify-center space-x-2 px-10 py-5"
            >
              <span className="font-semibold text-xl uppercase tracking-widest">
                Projekt anfragen
              </span>
            </HoverBorderGradient>
          </Link>
        </motion.div>
      </div>
      <BackgroundBeams />
    </div>
  );
}
