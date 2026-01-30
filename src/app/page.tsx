"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Hero } from "@/components/sections/Hero";
import { Preloader } from "@/components/ui/preloader";
import { Mission } from "@/components/sections/Mission";
import { ProjectsParallax } from "@/components/sections/ProjectsParallax";
import { Services } from "@/components/sections/Services";

import { BrandMarquee } from "@/components/sections/BrandMarquee";
import { AboutStory } from "@/components/sections/AboutStory";
import { Testimonials3D } from "@/components/sections/Testimonials";
import { CallToAction } from "@/components/sections/CallToAction";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Preloader onFinish={() => setIsLoading(false)} />}
      </AnimatePresence>

      <main className="min-h-svh bg-black text-white selection:bg-purple-900 selection:text-white overflow-x-clip">
        <Hero isLoading={isLoading} />
        <Mission />
        <BrandMarquee />
        <Services />
        <ProjectsParallax />
        <AboutStory />
        <Testimonials3D />
        <CallToAction />
      </main>
    </>
  );
}
