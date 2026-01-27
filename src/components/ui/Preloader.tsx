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
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      {/* Background Spiral - Only for visual flare */}
      <div className="absolute inset-0 opacity-60">
        <SpiralAnimation />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white text-center">
            INVERTA <br />
            <span className="text-purple-400">Digitalagentur</span>
          </h1>
        </motion.div>

        {/* Loading Indicator */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-48 h-px bg-gray-800 overflow-hidden relative">
            <motion.div
              className="absolute left-0 top-0 h-full bg-white"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 4, ease: "easeInOut" }}
              onAnimationComplete={onFinish}
            />
          </div>
          <motion.p
            key={loadingText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xs text-gray-500 uppercase tracking-[0.2em]"
          >
            {loadingText}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};
