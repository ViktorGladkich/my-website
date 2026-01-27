"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/3d-testimonials";


// Unique reviews data
const testimonials = [
  {
    name: "Sarah Mayer",
    username: "@sarah",
    body: "Inverta transformed our digital presence completely. Highly recommended!",
    img: "https://randomuser.me/api/portraits/women/32.jpg",
    country: "🇩🇪 Germany",
  },
  {
    name: "Marcus Weber",
    username: "@marcus",
    body: "The 3D effects on the site are stunning. Great job team!",
    img: "https://randomuser.me/api/portraits/men/85.jpg",
    country: "🇦🇹 Austria",
  },
  {
    name: "Elena Rodriguez",
    username: "@elena",
    body: "Professional, timely, and incredibly talented designers.",
    img: "https://randomuser.me/api/portraits/women/53.jpg",
    country: "🇪🇸 Spain",
  },
  {
    name: "James Wilson",
    username: "@james",
    body: "Our conversion rates doubled after the redesign.",
    img: "https://randomuser.me/api/portraits/men/33.jpg",
    country: "🇬🇧 UK",
  },
  {
    name: "Lucas Dubois",
    username: "@lucas",
    body: "The best agency we have worked with in Europe.",
    img: "https://randomuser.me/api/portraits/men/22.jpg",
    country: "🇫🇷 France",
  },
  {
    name: "Sophie Müller",
    username: "@sophie",
    body: "SMM strategy is on point. Engagement is up 200%.",
    img: "https://randomuser.me/api/portraits/women/45.jpg",
    country: "🇩🇪 Germany",
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

export function Testimonials3D() {
  return (
    <section className="py-24 bg-black overflow-hidden relative">
      <div className="container mx-auto px-4 mb-20 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">
          Client <span className="text-purple-500">Love</span>
        </h2>
        <p className="max-w-2xl mx-auto text-gray-400 text-sm md:text-base">
          Dont just take our word for it. Here is what our partners across the
          globe have to say about working with Inverta.
        </p>
      </div>

      <div className="relative flex h-[600px] w-full flex-row items-center justify-center overflow-hidden gap-4 perspective-[1000px]">
        <div
          className="flex flex-row items-center gap-6 mx-auto"
          style={{
            transform:
              "translateX(0px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-20deg) rotateZ(10deg)",
          }}
        >
          {/* Vertical Marquee 1 */}
          <Marquee
            vertical
            pauseOnHover
            repeat={4}
            className="[--duration:60s] w-60 md:w-72"
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
            className="[--duration:50s] w-60 md:w-72"
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
            className="[--duration:55s] w-60 md:w-72 hidden md:flex"
          >
            {testimonials.slice(0, 3).map((review) => (
              <TestimonialCard key={review.username} {...review} />
            ))}
          </Marquee>
          {/* Vertical Marquee 4 (Reverse) */}
          <Marquee
            vertical
            pauseOnHover
            reverse
            repeat={4}
            className="[--duration:65s] w-60 md:w-72 hidden xl:flex"
          >
            {testimonials.slice(3, 6).map((review) => (
              <TestimonialCard key={review.username} {...review} />
            ))}
          </Marquee>
        </div>

        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-black to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-black to-transparent z-10"></div>
      </div>
    </section>
  );
}
