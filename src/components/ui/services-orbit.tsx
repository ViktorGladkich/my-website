"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// --- Types ---

export type ServiceCategory = "web" | "marketing";

export interface ServiceItem {
  id: string;
  icon: React.ReactElement<{ className?: string }>;
  title: string;
  description: string;
  category: ServiceCategory;
}

interface ServicesOrbitProps {
  items: ServiceItem[];
}

interface OrbitPathProps {
  radius: number;
  color: string;
  duration: number;
  reverse?: boolean;
}

// --- Helper Components ---

const OrbitPath = ({ radius, color, duration, reverse }: OrbitPathProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        className="rounded-full border border-dashed border-white/20"
        style={{
          width: radius * 2,
          height: radius * 2,
          boxShadow: `0 0 40px ${color}10, inset 0 0 40px ${color}10`,
        }}
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

// --- Main Component ---

export default function ServicesOrbit({ items }: ServicesOrbitProps) {
  const [activeItem, setActiveItem] = useState<ServiceItem | null>(null);

  // Group items by category to place them on different orbits
  const webItems = useMemo(
    () => items.filter((i) => i.category === "web"),
    [items],
  );
  const marketingItems = useMemo(
    () => items.filter((i) => i.category === "marketing"),
    [items],
  );

  // Configuration
  const innerRadius = 140; // Web
  const outerRadius = 240; // Marketing

  return (
    <div className="relative w-full h-[600px] md:h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial-gradient from-purple-900/10 to-transparent opacity-50" />

      {/* Main Container - Scaled on Mobile */}
      <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] flex items-center justify-center scale-75 md:scale-100 transition-transform duration-500">
        {/* Orbits */}
        <OrbitPath
          radius={innerRadius}
          color="#a855f7"
          duration={40}
          reverse={false}
        />
        <OrbitPath
          radius={outerRadius}
          color="#f97316"
          duration={50}
          reverse={true}
        />

        {/* Center Display (The "Sun") */}
        <div className="absolute z-20 w-[220px] h-[220px] md:w-[320px] md:h-[320px] rounded-full flex flex-col items-center justify-center text-center p-6 bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500">
          <AnimatePresence mode="wait">
            {activeItem ? (
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-4"
              >
                <div
                  className={cn(
                    "p-4 rounded-2xl bg-white/5 border border-white/10",
                    activeItem.category === "web"
                      ? "text-purple-400"
                      : "text-orange-500",
                  )}
                >
                  {/* Clone icon to increase size */}
                  {React.cloneElement(
                    activeItem.icon as React.ReactElement<{
                      className?: string;
                    }>,
                    {
                      className: "w-8 h-8 md:w-10 md:h-10",
                    },
                  )}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {activeItem.title}
                  </h3>
                  <p className="text-sm md:text-base text-neutral-400 leading-relaxed max-w-[25ch]">
                    {activeItem.description}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center"
              >
                <div className="relative w-32 h-32 md:w-40 md:h-40 opacity-80 hover:opacity-100 transition-opacity duration-500">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Orbiting Items - Inner (Web) */}
        {webItems.map((item, index) => {
          const angle = (index / webItems.length) * 360; // Distribute evenly
          return (
            <OrbitItem
              key={item.id}
              item={item}
              radius={innerRadius}
              initialAngle={angle}
              duration={40}
              colorClass="text-purple-400 bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20"
              active={activeItem?.id === item.id}
              onClick={() => setActiveItem(item)}
            />
          );
        })}

        {/* Orbiting Items - Outer (Marketing) */}
        {marketingItems.map((item, index) => {
          const angle = (index / marketingItems.length) * 360 + 45; // Offset start
          return (
            <OrbitItem
              key={item.id}
              item={item}
              radius={outerRadius}
              initialAngle={angle}
              duration={50}
              reverse={true}
              colorClass="text-orange-500 bg-orange-500/10 border-orange-500/30 hover:bg-orange-500/20"
              active={activeItem?.id === item.id}
              onClick={() => setActiveItem(item)}
            />
          );
        })}
      </div>
    </div>
  );
}

// --- Individual Orbit Item Component ---

interface OrbitItemProps {
  item: ServiceItem;
  radius: number;
  initialAngle: number;
  duration: number;
  colorClass: string;
  active: boolean;
  reverse?: boolean;
  onClick: () => void;
}

function OrbitItem({
  item,
  radius,
  initialAngle,
  duration,
  colorClass,
  active,
  reverse,
  onClick,
}: OrbitItemProps) {
  // We use CSS animation for the orbit to keep it smooth and independent
  // But we need to counter-rotate the item content so it stays upright

  return (
    <div
      className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center"
      style={{
        animation: `orbit ${duration}s linear infinite ${reverse ? "reverse" : "normal"}`,
      }}
    >
      {/* Wrapper to set initial position on the circle */}
      <div
        className="absolute"
        style={{
          transform: `rotate(${initialAngle}deg) translate(${radius}px)`,
        }}
      >
        {/* Counter-rotation Wrapper */}
        <div
          className="w-12 h-12 md:w-16 md:h-16 -ml-6 -mt-6 md:-ml-8 md:-mt-8 cursor-pointer"
          style={{
            animation: `orbit-counter ${duration}s linear infinite ${reverse ? "reverse" : "normal"}`,
          }}
        >
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            className={cn(
              "w-full h-full rounded-full flex items-center justify-center border backdrop-blur-md transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]",
              colorClass,
              active ? "ring-2 ring-white scale-110 bg-white/20" : "",
            )}
          >
            {item.icon}
          </motion.button>
        </div>
      </div>

      {/* Global Styles for Keyframes */}
      <style jsx global>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes orbit-counter {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
}
