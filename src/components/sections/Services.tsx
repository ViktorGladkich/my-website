"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [
  {
    title: "Strategic Innovation",
    description:
      "We don't just build software; we build the future. Our strategic approach combines market insight with cutting-edge technology to create digital solutions that disrupt industries and drive exponential growth. From ideation to execution, we partner with you to navigate the complexities of digital transformation.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white relative">
        <Image
          src="/portfolio/services_1.png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="Strategic Innovation"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
    ),
  },
  {
    title: "Engineering Excellence",
    description:
      "Code is our craft. We engineer robust, scalable, and secure applications using the latest modern stacks. Whether it's a high-performance web platform, a complex mobile application, or a custom enterprise solution, our code is written to last, scale, and perform under pressure.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white relative">
        <Image
          src="/portfolio/services_2.png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="Engineering Excellence"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
    ),
  },
  {
    title: "Experience Design",
    description:
      "We design for the human experience. Our UX/UI philosophy centers on intuitive, accessible, and beautiful interfaces. We believe that great design is invisible—it just works. We create user journeys that are seamless, engaging, and designed to convert visitors into loyal customers.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white relative">
        <Image
          src="/portfolio/services_3.png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="Experience Design"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
    ),
  },
  {
    title: "Scaling & Growth",
    description:
      "Launching is just the beginning. We build systems ready for massive scale. Our cloud-native architectures and performance optimization strategies ensure your platform grows with your business. We provide the technical foundation you need to handle millions of users without breaking a sweat.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white relative">
        <Image
          src="/portfolio/services_4.png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="Scaling & Growth"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
    ),
  },
];

export function Services() {
  return (
    <section className="bg-black py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 mb-20 text-center relative z-10">
        <h2 className="text-sm font-semibold tracking-[0.3em] text-purple-400 uppercase mb-4">
          Our Expertise
        </h2>
        <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Building Digital Legacies
        </h3>
        <p className="max-w-2xl mx-auto text-gray-400 text-lg">
          We combine strategy, design, and engineering to deliver world-class
          digital products.
        </p>
      </div>

      <StickyScroll content={content} />
    </section>
  );
}
