"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
// HoverBorderGradient and TypewriterEffectSmooth are used for the main call-to-action area
import { HoverBorderGradient } from "./hover-border-gradient";
import { TypewriterEffectSmooth } from "./typewriter-effect";

export const HeroParallax = ({
  products,
  isLoading,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
  isLoading: boolean;
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 60, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig,
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig,
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig,
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig,
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig,
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig,
  );
  return (
    <div
      ref={ref}
      className="h-[260svh] py-25 overflow-hidden antialiased relative flex flex-col self-auto perspective-1000 transform-3d bg-black"
    >
      <HeroHeader isLoading={isLoading} />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
          perspective: 1000,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
              priority={true}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const HeroHeader = ({ isLoading }: { isLoading: boolean }) => {
  // Main title configuration
  const wordsLine1 = [
    {
      text: "INVERTA",
      className: "text-white",
    },
  ];

  // Subtitle with gradient effect
  const wordsLine2 = [
    {
      text: "Digitalagentur",
      className:
        "bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500",
    },
  ];

  return (
    <div className="max-w-7xl relative mx-auto py-20 md:pt-65 md:pb-0 px-4 w-full left-0 top-0 flex flex-col justify-center min-h-[70svh] md:min-h-0">
      <div className="flex flex-col items-start justify-center">
        <TypewriterEffectSmooth
          words={wordsLine1}
          className="justify-start my-0"
          cursorClassName="hidden"
          waiting={isLoading}
        />
        <TypewriterEffectSmooth
          words={wordsLine2}
          className="justify-start my-0 -mt-2 md:-mt-4"
          cursorClassName="bg-purple-500"
          waiting={isLoading}
        />
      </div>
      <motion.p
        className="max-w-2xl text-lg md:text-xl mt-6 md:mt-8 text-neutral-400 text-left leading-relaxed"
        initial={{ opacity: 0, y: 30 }}
        animate={isLoading ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 1.5,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        Wir entwickeln schöne Produkte mit den neuesten Technologien und
        Frameworks. Wir sind ein Team aus leidenschaftlichen Entwicklern und
        Designern, die es lieben, außergewöhnliche Produkte zu schaffen.
      </motion.p>

      <motion.div
        className="flex justify-start mt-6 md:mt-8"
        initial={{ opacity: 0, y: 30 }}
        animate={isLoading ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 1.8,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="bg-black text-white flex items-center space-x-2 px-8 py-4 md:py-3 cursor-pointer"
        >
          <span className="font-semibold text-lg md:text-base">
            Jetzt starten
          </span>
        </HoverBorderGradient>
      </motion.div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
  priority = false,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
  priority?: boolean;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-90 w-120 relative shrink-0"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl "
      >
        <Image
          src={product.thumbnail}
          height={600}
          width={600}
          className="object-cover object-top-left absolute h-full w-full inset-0 rounded-xl bg-gray-900"
          alt={product.title}
          unoptimized
          priority={priority}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none rounded-xl"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};
