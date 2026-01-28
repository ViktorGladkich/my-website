"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Hero } from "@/components/sections/Hero";
import { Preloader } from "@/components/ui/Preloader";
import { Mission } from "@/components/sections/Mission";
import { ProjectsParallax } from "@/components/sections/ProjectsParallax";
import { Services } from "@/components/sections/Services";
import { Footer } from "@/components/sections/Footer";
import { BrandMarquee } from "@/components/sections/BrandMarquee";
import { Testimonials3D } from "@/components/sections/Testimonials";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onFinish={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <main className="min-h-screen bg-black text-white selection:bg-purple-900 selection:text-white">
          <Hero />
          <Mission />
          <BrandMarquee />
          <Services />
          <ProjectsParallax />
          <Testimonials3D />
          <Footer />
        </main>
      )}
    </>
  );
}
