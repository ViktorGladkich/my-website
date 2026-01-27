"use client";
import React from "react";
import { CardsParallax, type iCardItem } from "@/components/ui/scroll-cards";

const projectItems: iCardItem[] = [
  {
    title: "BRANDING",
    description: "Crafting distinct identities that resonate and endure.",
    tag: "Identity",
    src: "/branding_showcase.png",
    link: "#",
    color: "black",
    textColor: "white",
  },
  {
    title: "WEB DESIGN",
    description:
      "Building immersive digital experiences that captivate and convert.",
    tag: "Digital",
    src: "/web_design_showcase.png",
    link: "#",
    color: "black",
    textColor: "white",
  },
  {
    title: "MARKETING",
    description:
      "Data-driven strategies that amplify reach and accelerate growth.",
    tag: "Growth",
    src: "/marketing_visualization.png",
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
