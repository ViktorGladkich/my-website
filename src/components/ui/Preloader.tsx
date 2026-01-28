"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SpiralAnimation } from "@/components/ui/spiral-animation";

export const Preloader = ({ onFinish }: { onFinish: () => void }) => {
  // Determine loading text based on progress
  const [loadingText, setLoadingText] = useState("Kern initialisieren...");

  useEffect(() => {
    const timers = [
      setTimeout(() => setLoadingText("Assets laden..."), 1000),
      setTimeout(() => setLoadingText("Erlebnis vorbereiten..."), 2500),
      setTimeout(() => setLoadingText("Willkommen"), 3800),
      // Auto-finish after 4 seconds
      setTimeout(() => onFinish(), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      {/* Fullscreen Spiral Animation */}
      <div className="absolute inset-0">
        <SpiralAnimation />
      </div>

      {/* Loading Text - positioned at bottom */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10">
        <motion.p
          key={loadingText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-xs text-gray-400 uppercase tracking-[0.3em]"
        >
          {loadingText}
        </motion.p>
      </div>
    </motion.div>
  );
};
