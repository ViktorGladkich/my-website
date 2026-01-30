"use client";
import { cn } from "@/lib/utils";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  MotionConfig,
  Variants,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  // visible prop removed as it was unused
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isScrolled = latest > 50;
    if (isScrolled !== visible) {
      setVisible(isScrolled);
    }
  });

  return (
    <motion.div
      className={cn(
        "fixed inset-x-0 top-0 z-[5000] px-4 md:px-8 py-4 transition-all duration-300",
        visible
          ? "py-2 bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm"
          : "bg-transparent",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            // Don't pass 'visible' prop to DOM elements (div, span, etc.)
            if (typeof child.type === "string") {
              return child;
            }
            return React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            );
          }
          return child;
        })}
      </div>
    </motion.div>
  );
};

export const NavBody = ({ children, className }: NavBodyProps) => {
  return (
    <div
      className={cn(
        "hidden flex-row items-center justify-between lg:flex",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "hidden flex-1 flex-row items-center justify-center space-x-6 text-sm font-medium transition-colors lg:flex",
        className,
      )}
    >
      {items.map((item, idx) => (
        <Link
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="cursor-pointer relative px-3 py-2 text-neutral-600 dark:text-neutral-300 transition-colors hover:text-black dark:hover:text-white"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered-nav-item"
              className="absolute inset-0 h-full w-full rounded-md bg-stone-100 dark:bg-stone-800/50 -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
          <span className="relative z-10">{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export const MobileNav = ({ children, className }: MobileNavProps) => {
  return (
    <div className={cn("flex w-full flex-col lg:hidden", className)}>
      {children}
    </div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  // SSR-safe: only render portal on client
  const isClient = typeof window !== "undefined";

  useEffect(() => {
    if (!isClient) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, isClient]);

  if (!isClient) return null;

  const menuVariants: Variants = {
    closed: {
      clipPath: "circle(0px at calc(100% - 40px) 40px)",
      transition: {
        type: "tween",
        duration: 0.8,
        ease: [0.19, 1, 0.22, 1],
        delay: 0.1,
      },
    },
    open: {
      clipPath: "circle(150% at calc(100% - 40px) 40px)",
      transition: {
        type: "tween",
        duration: 0.8,
        ease: [0.19, 1, 0.22, 1], // Expo ease out for "WOW" smoothness
      },
    },
  };

  const contentVariants: Variants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2, // Fast exit
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.15,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className={cn(
              "fixed inset-0 z-[4000] flex h-dvh w-screen flex-col bg-neutral-950 text-white px-6 py-8 overflow-hidden",
              className,
            )}
            style={{ originX: 1, originY: 0 }} // Anchor top right
          >
            {/* Background elements for texture */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-900 via-neutral-950 to-neutral-950" />

            <motion.div
              variants={contentVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="relative z-10 flex-1 flex flex-col pt-24 items-center justify-center text-center"
            >
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};

// Refactored Toggle with Magnetic/Scale feel
export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      className={cn(
        "cursor-pointer relative z-5001 flex h-14 w-14 flex-col items-center justify-center gap-[6px] outline-none",
        "bg-white/10 dark:bg-white/10 backdrop-blur-md rounded-full transition-colors duration-200 border border-white/10",
        isOpen ? "bg-white text-black" : "text-black dark:text-white",
      )}
      aria-label={isOpen ? "Close Menu" : "Open Menu"}
    >
      <MotionConfig transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}>
        <motion.span
          className="h-[2px] w-6 rounded-full origin-center bg-current"
          animate={
            isOpen
              ? { rotate: 45, y: 8, width: 24 }
              : { rotate: 0, y: 0, width: 24 }
          }
        />
        <motion.span
          className="h-[2px] w-6 rounded-full origin-center bg-current"
          animate={
            isOpen ? { opacity: 0, width: 0 } : { opacity: 1, width: 16 }
          }
        />
        <motion.span
          className="h-[2px] w-6 rounded-full origin-center bg-current"
          animate={
            isOpen
              ? { rotate: -45, y: -8, width: 24 }
              : { rotate: 0, y: 0, width: 12 }
          }
        />
      </MotionConfig>
    </motion.button>
  );
};

export const NavbarLogo = () => {
  return (
    <Link
      href="/"
      className="cursor-pointer relative z-20 flex items-center gap-2 font-bold text-xl tracking-tight text-black dark:text-white"
    >
      <Image
        src="/logo.png"
        alt="Logo"
        width={130}
        height={50}
        className="h-13 w-auto object-contain"
        priority
      />
    </Link>
  );
};

export const NavbarButton = ({
  href,
  as,
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
  [key: string]: unknown;
}) => {
  const baseStyles =
    "px-5 py-2.5 rounded-full text-sm font-medium relative cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "bg-black text-white dark:bg-white dark:text-black shadow-lg shadow-black/5",
    secondary: "bg-transparent text-black dark:text-white hover:bg-black/5",
    dark: "bg-neutral-900 text-white border border-neutral-800",
    gradient:
      "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md",
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = (as || "a") as any;

  return (
    <Component
      href={href}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
};
