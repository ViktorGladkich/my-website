"use client";
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
} from "@/components/ui/animated-slideshow";

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
        <h3 className="mb-2 text-purple-500 text-sm font-semibold tracking-[0.3em] uppercase">
          / Our Services
        </h3>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">
          Comprehensive
          <br />
          Digital Solutions
        </h2>

        <div className="flex flex-wrap lg:flex-nowrap items-start justify-between gap-12 lg:gap-24 w-full">
          <div className="flex flex-col space-y-6 md:space-y-8 w-full lg:w-5/12">
            {SLIDES.map((slide, index) => (
              <div key={slide.id} className="group flex flex-col space-y-1">
                <TextStaggerHover
                  index={index}
                  className="cursor-pointer text-4xl md:text-6xl font-bold uppercase tracking-tighter hover:text-purple-400 transition-colors duration-300 w-fit"
                  text={slide.title}
                />
                <p className="text-gray-500 text-sm md:text-base font-medium tracking-wide pl-1 group-hover:text-gray-300 transition-colors duration-300">
                  {slide.subtitle}
                </p>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-7/12 aspect-4/3 md:aspect-video lg:aspect-auto lg:h-[600px] relative">
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
          </div>
        </div>
      </div>
    </HoverSlider>
  );
}
