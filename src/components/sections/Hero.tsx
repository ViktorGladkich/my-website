"use client";

import React from "react";
import { HeroParallax } from "../ui/hero-parallax";

export const Hero = ({ isLoading }: { isLoading: boolean }) => {
  // INVERTA Portfolio Assets
  const products = [
    {
      title: "FinTech Dashboard",
      link: "#",
      thumbnail: "/portfolio/parallax_1.png",
    },
    {
      title: "Luxury Fashion",
      link: "#",
      thumbnail: "/portfolio/parallax_2.png",
    },
    {
      title: "Creative Agency",
      link: "#",
      thumbnail: "/portfolio/parallax_3.png",
    },
    { title: "Health App", link: "#", thumbnail: "/portfolio/parallax_4.png" },
    {
      title: "Cyberpunk Gaming",
      link: "#",
      thumbnail: "/portfolio/parallax_5.png",
    },

    {
      title: "Data Analytics",
      link: "#",
      thumbnail: "/portfolio/dashboard.png",
    },
    {
      title: "Mobile Experience",
      link: "#",
      thumbnail: "/portfolio/mobile-app.png",
    },
    { title: "AI Vision", link: "#", thumbnail: "/portfolio/ai-art.png" },
    { title: "Eco Energy", link: "#", thumbnail: "/portfolio/energy-site.png" },
    {
      title: "SaaS Platform",
      link: "#",
      thumbnail: "/portfolio/parallax_1.png",
    },

    {
      title: "Modern E-com",
      link: "#",
      thumbnail: "/portfolio/parallax_2.png",
    },
    {
      title: "Design Folio",
      link: "#",
      thumbnail: "/portfolio/parallax_3.png",
    },
    {
      title: "Fitness Tracker",
      link: "#",
      thumbnail: "/portfolio/parallax_4.png",
    },
    { title: "Game Hub", link: "#", thumbnail: "/portfolio/parallax_5.png" },
    {
      title: "Cloud Systems",
      link: "#",
      thumbnail: "/portfolio/dashboard.png",
    },
  ];

  return <HeroParallax products={products} isLoading={isLoading} />;
};
