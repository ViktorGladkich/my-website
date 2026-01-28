"use client";

import React from "react";
import { HeroParallax } from "../ui/hero-parallax";

export const Hero = ({ isLoading }: { isLoading: boolean }) => {
  const products = [
    {
      title: "FinTech Dashboard",
      link: "#",
      thumbnail: "/images/portfolio/parallax_1.png",
    },
    {
      title: "Luxury Fashion",
      link: "#",
      thumbnail: "/images/portfolio/parallax_2.png",
    },
    {
      title: "Creative Agency",
      link: "#",
      thumbnail: "/images/portfolio/parallax_3.png",
    },
    {
      title: "Health App",
      link: "#",
      thumbnail: "/images/portfolio/parallax_4.png",
    },
    {
      title: "Cyberpunk Gaming",
      link: "#",
      thumbnail: "/images/portfolio/parallax_5.png",
    },

    {
      title: "Data Analytics",
      link: "#",
      thumbnail: "/images/portfolio/dashboard.png",
    },
    {
      title: "Mobile Experience",
      link: "#",
      thumbnail: "/images/portfolio/mobile-app.png",
    },
    {
      title: "AI Vision",
      link: "#",
      thumbnail: "/images/portfolio/ai-art.png",
    },
    {
      title: "Eco Energy",
      link: "#",
      thumbnail: "/images/portfolio/energy-site.png",
    },
    {
      title: "SaaS Platform",
      link: "#",
      thumbnail: "/images/portfolio/parallax_1.png",
    },

    {
      title: "Modern E-com",
      link: "#",
      thumbnail: "/images/portfolio/parallax_2.png",
    },
    {
      title: "Design Folio",
      link: "#",
      thumbnail: "/images/portfolio/parallax_3.png",
    },
    {
      title: "Fitness Tracker",
      link: "#",
      thumbnail: "/images/portfolio/parallax_4.png",
    },
    {
      title: "Game Hub",
      link: "#",
      thumbnail: "/images/portfolio/parallax_5.png",
    },
    {
      title: "Cloud Systems",
      link: "#",
      thumbnail: "/images/portfolio/dashboard.png",
    },
  ];

  return <HeroParallax products={products} isLoading={isLoading} />;
};
