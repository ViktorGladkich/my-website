"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type MenuItem = {
  label: string;
  href: string;
};

interface MenuVerticalProps {
  menuItems: MenuItem[];
  color?: string;
  skew?: number;
  className?: string;
}

const MotionLink = motion(Link);

export const MenuVertical = ({
  menuItems = [],
  color = "#ffffff", // Default to white for premium dark look
  skew = 0,
  className,
}: MenuVerticalProps) => {
  return (
    <div className={cn("flex w-fit flex-col gap-8 px-10 py-10", className)}>
      {menuItems.map((item, index) => (
        <motion.div
          key={`${item.href}-${index}`}
          className="group/nav flex items-center gap-4 cursor-pointer"
          initial="initial"
          whileHover="hover"
        >
          <motion.div
            variants={{
              initial: { x: "-100%", opacity: 0, scale: 0.5 },
              hover: { x: 0, opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex items-center justify-center text-white"
          >
            <ArrowRight
              strokeWidth={2.5}
              className="size-8 md:size-10"
              color={color}
            />
          </motion.div>

          <MotionLink
            href={item.href}
            variants={{
              initial: { x: -40, color: "rgba(255,255,255,0.4)" }, // Dimmed initially
              hover: { x: 0, color: color, skewX: skew },
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="font-black text-4xl md:text-6xl uppercase tracking-tighter no-underline"
          >
            {item.label}
          </MotionLink>
        </motion.div>
      ))}
    </div>
  );
};
