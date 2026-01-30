"use client";

import React, { useRef } from "react";
import {
  FullScreenScrollFX,
  type FullScreenFXAPI,
} from "@/components/ui/scroll-fullscreen";
import { AboutStory } from "@/components/sections/AboutStory";
import { JourneyTimelineSection } from "@/components/sections/JourneyTimeline";
import { TeamSection } from "@/components/sections/Team";
import { CallToAction } from "@/components/sections/CallToAction";

const sections = [
  {
    leftLabel: "Vision",
    title: "Zukunft gestalten",
    rightLabel: "Innovation",
    background: "/images/about/about-vision.png",
  },
  {
    leftLabel: "Technik",
    title: "Digitale Welten",
    rightLabel: "Präzision",
    background: "/images/about/about-tech.png",
  },
  {
    leftLabel: "Daten",
    title: "Intelligente Strategien",
    rightLabel: "Analyse",
    background: "/images/about/about-data.png",
  },
  {
    leftLabel: "Global",
    title: "Grenzenloser Erfolg",
    rightLabel: "Skalierung",
    background: "/images/about/about-global.png",
  },
];

export default function AboutPage() {
  const apiRef = useRef<FullScreenFXAPI>(null);

  return (
    <div className="bg-black min-h-screen">
      <FullScreenScrollFX sections={sections} apiRef={apiRef} />
      <AboutStory />
      <JourneyTimelineSection />
      <TeamSection />
      <CallToAction />
    </div>
  );
}
