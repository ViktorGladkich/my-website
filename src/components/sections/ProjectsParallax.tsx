"use client";
import React from "react";
import { CardsParallax, type CardItem } from "@/components/ui/scroll-cards";

const projectItems: CardItem[] = [
  {
    title: "BRANDING",
    description:
      "Erschaffung einzigartiger Identitäten, die resonieren und Bestand haben.",
    tag: "Identität",
    src: "/images/projects/project_branding.png",
    link: "#",
    color: "black",
    textColor: "white",
  },
  {
    title: "WEB DESIGN",
    description:
      "Entwicklung immersiver digitaler Erlebnisse, die fesseln und konvertieren.",
    tag: "Digital",
    src: "/images/projects/project_web.png",
    link: "#",
    color: "black",
    textColor: "white",
  },
  {
    title: "MARKETING",
    description:
      "Datengetriebene Strategien, die Reichweite erhöhen und Wachstum beschleunigen.",
    tag: "Wachstum",
    src: "/images/projects/project_marketing.png",
    link: "#",
    color: "black",
    textColor: "white",
  },
];

export function ProjectsParallax() {
  return (
    <section className="relative z-10 bg-black">
      <CardsParallax items={projectItems} />
    </section>
  );
}
