"use client";
import { FC } from "react";

import Image from "next/image";

// Types
interface CardItem {
  title: string;
  description: string;
  tag: string;
  src: string;
  link: string;
  color: string;
  textColor: string;
}

interface CardProps extends Omit<CardItem, "src" | "link" | "tag"> {
  i: number;
  src: string;
}

// Components
const Card: FC<CardProps> = ({ title, description, textColor, src }) => {
  return (
    <div className="h-screen flex items-center justify-center sticky top-0 bg-black overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center container mx-auto px-4 py-8 md:py-12">
        <div className="relative w-full h-[85vh] md:h-[90vh] rounded-3xl overflow-hidden border border-white/10 bg-neutral-900">
          <div
            className="relative z-10 flex flex-col items-center justify-center p-8 md:p-12 text-center h-full"
            style={{ color: textColor }}
          >
            <span className="font-bold relative text-5xl md:text-7xl lg:text-8xl mb-6">
              <span className="relative z-10 font-black tracking-tighter uppercase drop-shadow-2xl">
                {title}
              </span>
            </span>
            <div className="text-lg md:text-2xl font-medium max-w-3xl tracking-tight leading-relaxed drop-shadow-md bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/5">
              {description}
            </div>
          </div>
          <div className="absolute inset-0 z-0">
            <Image
              src={src}
              alt={title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * CardSlide component displays a series of cards in a vertical scroll layout
 * Each card contains a title, description, and decorative elements
 */
interface CardSlideProps {
  items: CardItem[];
}

const CardsParallax: FC<CardSlideProps> = ({ items }) => {
  return (
    <div className="bg-black">
      {items.map((project, i) => {
        return <Card key={`p_${i}`} {...project} i={i} />;
      })}
    </div>
  );
};

export { CardsParallax, type CardItem };
