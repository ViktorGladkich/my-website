"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the outer ring (delayed follow)
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Direct follow for the inner dot
  const dotX = useSpring(mouseX, { damping: 50, stiffness: 1000 });
  const dotY = useSpring(mouseY, { damping: 50, stiffness: 1000 });

  useEffect(() => {
    // Show cursor only after first move to prevent initial jump
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable element
      const target = e.target as HTMLElement;

      // Robust check for clickable elements even if cursor is hidden
      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsPointer(!!isClickable);
    };

    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-9999 pointer-events-none mix-blend-difference">
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-white"
        style={{
          x: cursorX,
          y: cursorY,
          width: 40,
          height: 40,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isActive ? 0.8 : isPointer ? 1.5 : 1,
          opacity: isActive ? 0.8 : 1,
          borderColor: isPointer
            ? "rgba(255, 255, 255, 0.8)"
            : "rgba(255, 255, 255, 0.4)",
          borderWidth: isPointer ? "2px" : "1px",
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-white"
        style={{
          x: dotX,
          y: dotY,
          width: 8,
          height: 8,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isActive ? 0.5 : isPointer ? 0.2 : 1,
        }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
};
