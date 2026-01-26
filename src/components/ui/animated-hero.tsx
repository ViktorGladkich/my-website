"use client";

import { motion } from "framer-motion";

export default function AnimatedHero() {
  const headline = "Crafting Digital Experiences";
  const words = headline.split(" ");

  return (
    <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      {/* Vertical Lines */}
      <div className="absolute inset-y-0 left-0 h-full w-px bg-white/5">
        <div className="absolute top-0 h-40 w-px bg-linear-to-b from-transparent via-purple-500 to-transparent opacity-50" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-white/5">
        <div className="absolute h-40 w-px bg-linear-to-b from-transparent via-purple-500 to-transparent opacity-50" />
      </div>

      {/* Horizontal Lines */}
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-white/5">
        <div className="absolute mx-auto h-px w-40 bg-linear-to-r from-transparent via-purple-500 to-transparent opacity-50" />
      </div>
      <div className="absolute inset-x-0 top-0 h-px w-full bg-white/5">
        <div className="absolute mx-auto h-px w-40 bg-linear-to-r from-transparent via-purple-500 to-transparent opacity-50" />
      </div>

      <div className="px-4 py-20 relative z-10 w-full">
        <h1 className="relative z-10 mx-auto max-w-5xl text-center text-4xl font-bold tracking-tighter text-white md:text-7xl lg:text-8xl">
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.2, 0.65, 0.3, 0.9],
              }}
              className="mr-3 inline-block bg-clip-text text-transparent bg-linear-to-b from-white via-white to-gray-400"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="relative z-10 mx-auto max-w-2xl py-8 text-center text-lg md:text-xl font-light text-gray-400 leading-relaxed"
        >
          We build high-end websites and data-driven social media strategies for
          brands that demand excellence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="relative z-10 mt-4 flex flex-wrap items-center justify-center gap-6"
        >
          <button className="group relative w-48 overflow-hidden rounded-full bg-white px-6 py-4 text-sm font-bold tracking-[0.15em] uppercase text-black transition-all hover:bg-gray-200">
            <span className="relative z-10">Start Project</span>
            <div className="absolute inset-0 bg-linear-to-r from-purple-400 to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>

          <button className="group w-48 rounded-full border border-white/10 px-6 py-4 text-sm font-bold tracking-[0.15em] uppercase text-white transition-all hover:bg-white/5 hover:border-white/30 hover:scale-105">
            Portfolio
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          className="relative z-10 mt-20 mx-auto max-w-5xl rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm shadow-2xl shadow-purple-900/20"
        >
          {/* Mockup / Image Placeholder */}
          <div className="w-full aspect-21/9 overflow-hidden rounded-xl bg-black border border-white/5 relative group">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-tr from-purple-900/20 via-transparent to-transparent opacity-60" />

            {/* Grid decoration */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/20 uppercase tracking-[0.5em] font-light text-sm">
                Project Preview
              </span>
            </div>

            {/* Animated glare effect */}
            <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-linear-to-r from-transparent to-white opacity-10 group-hover:animate-shine" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
