"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Preloader } from "@/components/ui/Preloader";
import { Mission } from "@/components/sections/Mission";
import { Services } from "@/components/sections/Services";
import { BrandMarquee } from "@/components/sections/BrandMarquee";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onFinish={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <main className="min-h-screen bg-black text-white selection:bg-purple-900 selection:text-white">
          <Header />
          <Hero />
          <Mission />
          <Services />
          <BrandMarquee />
        </main>
      )}
    </>
  );
}
