"use client";
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
} from "@/components/ui/animated-slideshow";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Image from "next/image";

const SLIDES = [
  {
    id: "webdesign",
    title: "Webdesign",
    subtitle: "Website | Webentwicklung | Onlineshops",
    imageUrl:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2486&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "relaunch",
    title: "Relaunch",
    subtitle: "Modernisierung & Neuausrichtung",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "funnels",
    title: "Funnelsystem",
    subtitle: "Leadgeneratoren | Automatisierung",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "coding",
    title: "Programmierung",
    subtitle: "Custom Development | API Integration",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "marketing",
    title: "Marketing",
    subtitle: "SEO | Neukundengewinnung | Social Media",
    imageUrl:
      "https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export function Services() {
  return (
    <HoverSlider className="min-h-screen py-24 bg-black text-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 w-full">
        <ScrollReveal
          variant="fadeUp"
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="max-w-2xl">
            <h3 className="mb-4 text-purple-500 text-sm font-semibold tracking-[0.3em] uppercase">
              Unsere Leistungen
            </h3>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-none">
              Umfassende
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-white/50">
                Digitale Lösungen
              </span>
            </h2>
          </div>
          <p className="max-w-md text-gray-400 text-base md:text-lg leading-relaxed md:text-right pb-2">
            Wir transformieren komplexe Anforderungen in elegante digitale
            Erlebnisse. Mit strategischem Denken, präzisem Design und modernster
            Technologie schaffen wir Lösungen, die nicht nur funktionieren,
            sondern begeistern.
          </p>
        </ScrollReveal>

        <div className="flex flex-wrap lg:flex-nowrap items-start justify-between gap-12 lg:gap-24 w-full">
          <div className="flex flex-col space-y-6 md:space-y-8 w-full lg:w-5/12">
            {SLIDES.map((slide, index) => (
              <ScrollReveal
                key={slide.id}
                variant="fadeUp"
                delay={index * 0.1}
                className="w-full"
              >
                <div className="group flex flex-col space-y-1">
                  <TextStaggerHover
                    index={index}
                    className="cursor-pointer text-4xl md:text-6xl font-bold uppercase tracking-tighter hover:text-purple-400 transition-colors duration-300 w-fit"
                    text={slide.title}
                  />
                  <p className="text-gray-500 text-sm md:text-base font-medium tracking-wide pl-1 group-hover:text-gray-300 transition-colors duration-300">
                    {slide.subtitle}
                  </p>

                  {/* Mobile Image - Shown directly below text */}
                  <div className="block lg:hidden w-full aspect-video rounded-xl overflow-hidden mt-6 relative border border-white/10">
                    <ScrollReveal
                      variant="scaleUp"
                      delay={0.1}
                      className="w-full h-full"
                    >
                      <Image
                        src={slide.imageUrl}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </ScrollReveal>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="hidden lg:block w-full lg:w-7/12 aspect-4/3 md:aspect-video lg:aspect-auto lg:h-[600px] relative">
            <ScrollReveal
              variant="scaleUp"
              delay={0.2}
              className="w-full h-full"
            >
              <HoverSliderImageWrap className="w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                {SLIDES.map((slide, index) => (
                  <div key={slide.id} className="w-full h-full">
                    <HoverSliderImage
                      index={index}
                      imageUrl={slide.imageUrl}
                      src={slide.imageUrl}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                ))}
              </HoverSliderImageWrap>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </HoverSlider>
  );
}
