"use client";
import React from "react";
import NextImage from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/testimonials-3d";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

// Unique reviews data
const testimonials = [
  {
    name: "Sarah Mayer",
    username: "@sarah",
    body: "Inverta hat unsere digitale Präsenz komplett transformiert. Sehr empfehlenswert!",
    img: "https://randomuser.me/api/portraits/women/32.jpg",
    country: "🇩🇪 Deutschland",
  },
  {
    name: "Marcus Weber",
    username: "@marcus",
    body: "Die 3D-Effekte auf der Seite sind atemberaubend. Tolle Arbeit, Team!",
    img: "https://randomuser.me/api/portraits/men/85.jpg",
    country: "🇦🇹 Österreich",
  },
  {
    name: "Elena Rodriguez",
    username: "@elena",
    body: "Professionell, pünktlich und unglaublich talentierte Designer.",
    img: "https://randomuser.me/api/portraits/women/53.jpg",
    country: "🇪🇸 Spanien",
  },
  {
    name: "James Wilson",
    username: "@james",
    body: "Unsere Konversionsraten haben sich nach dem Redesign verdoppelt.",
    img: "https://randomuser.me/api/portraits/men/33.jpg",
    country: "🇬🇧 UK",
  },
  {
    name: "Lucas Dubois",
    username: "@lucas",
    body: "Die beste Agentur, mit der wir in Europa zusammengearbeitet haben.",
    img: "https://randomuser.me/api/portraits/men/22.jpg",
    country: "🇫🇷 Frankreich",
  },
  {
    name: "Sophie Müller",
    username: "@sophie",
    body: "Die SMM-Strategie ist punktgenau. Das Engagement ist um 200% gestiegen.",
    img: "https://randomuser.me/api/portraits/women/45.jpg",
    country: "🇩🇪 Deutschland",
  },
];

function TestimonialCard({
  img,
  name,
  username,
  body,
  country,
}: (typeof testimonials)[number]) {
  return (
    <Card className="w-full bg-neutral-900 border-white/10 text-white">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="size-10 border border-white/10">
            <AvatarImage src={img} alt={username} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <figcaption className="text-sm font-semibold flex items-center gap-1.5">
              {name}{" "}
              <span className="text-xs text-neutral-400 font-normal">
                {country}
              </span>
            </figcaption>
            <p className="text-xs text-neutral-500">{username}</p>
          </div>
        </div>
        <blockquote className="mt-3 text-sm text-neutral-300 leading-relaxed">
          {body}
        </blockquote>
      </CardContent>
    </Card>
  );
}

// ... existing code ...

export function Testimonials3D() {
  return (
    <section className="py-24 bg-black overflow-hidden relative">
      <div className="container mx-auto px-4 mb-20 relative z-10 text-center">
        <ScrollReveal variant="fadeUp">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">
            Kunden <span className="text-purple-500">Liebe</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-sm md:text-base">
            Verlassen Sie sich nicht nur auf unser Wort. Hier ist, was unsere
            Partner weltweit über die Zusammenarbeit mit Inverta sagen.
          </p>
        </ScrollReveal>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center mt-8 md:mt-0">
        <div className="relative w-full max-w-7xl aspect-video flex items-center justify-center scale-[1.4] md:scale-100">
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="relative w-full h-full">
              <NextImage
                alt="iMac Frame"
                src="/images/ui/monitor_frame.png"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="absolute top-[3%] bottom-[30%] left-[16%] right-[15.4%] bg-neutral-950/90 z-20 overflow-hidden flex flex-col items-center justify-center rounded-sm border border-white/5 shadow-[0_0_50px_rgba(100,100,255,0.1)_inset]">
            <div className="w-full h-4 bg-[#1a1a1a] flex items-center px-3 space-x-1.5 shrink-0 border-b border-white/5">
              <div className="size-2 rounded-full bg-[#FF5F57]"></div>
              <div className="size-2 rounded-full bg-[#FEBC2E]"></div>
              <div className="size-2 rounded-full bg-[#28C840]"></div>
              <div className="mx-auto text-[6px] md:text-[8px] text-gray-400 font-medium opacity-50">
                inverta.de/reviews
              </div>
            </div>

            <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black/50">
              <div className="flex flex-row items-center gap-4 mx-auto scale-[0.56] md:scale-96 origin-center opacity-90">
                {/* Vertical Marquee 1 */}
                <Marquee
                  vertical
                  pauseOnHover
                  repeat={4}
                  className="[--duration:60s] w-60"
                >
                  {testimonials.slice(0, 3).map((review) => (
                    <TestimonialCard key={review.username} {...review} />
                  ))}
                </Marquee>
                {/* Vertical Marquee 2 (Reverse) */}
                <Marquee
                  vertical
                  pauseOnHover
                  reverse
                  repeat={4}
                  className="[--duration:50s] w-60"
                >
                  {testimonials.slice(3, 6).map((review) => (
                    <TestimonialCard key={review.username} {...review} />
                  ))}
                </Marquee>
                {/* Vertical Marquee 3 */}
                <Marquee
                  vertical
                  pauseOnHover
                  repeat={4}
                  className="[--duration:70s] w-60 hidden md:flex"
                >
                  {testimonials.slice(0, 3).map((review) => (
                    <TestimonialCard key={review.username} {...review} />
                  ))}
                </Marquee>
              </div>
              {/* Gradient overlays for the screen content */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-black to-transparent z-10"></div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-black to-transparent z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
