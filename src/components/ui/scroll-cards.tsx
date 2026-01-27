"use client";
import { FC } from "react";

import Image from "next/image";

// Types
interface iCardItem {
  title: string;
  description: string;
  tag: string;
  src: string;
  link: string;
  color: string;
  textColor: string;
}

interface iCardProps extends Omit<iCardItem, "src" | "link" | "tag"> {
  i: number;
  src: string;
}

// Components
const Card: FC<iCardProps> = ({
  title,
  description,
  color,
  textColor,
  src,
}) => {
  return (
    <div className="h-screen flex items-center justify-center sticky top-0 p-0 overflow-hidden bg-black">
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          className="relative z-10 flex flex-col items-center justify-center p-12 text-center"
          style={{ color: textColor }}
        >
          <span className="font-bold relative text-6xl md:text-8xl lg:text-9xl mb-6">
            <span className="relative z-10 font-black tracking-tighter uppercase">
              {title}
            </span>
          </span>
          <div className="text-xl md:text-3xl font-medium max-w-4xl tracking-tight leading-relaxed">
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
  );
};

/**
 * CardSlide component displays a series of cards in a vertical scroll layout
 * Each card contains a title, description, and decorative elements
 */
interface iCardSlideProps {
  items: iCardItem[];
}

const CardsParallax: FC<iCardSlideProps> = ({ items }) => {
  return (
    <div className="bg-black">
      {items.map((project, i) => {
        return <Card key={`p_${i}`} {...project} i={i} />;
      })}
    </div>
  );
};

export { CardsParallax, type iCardItem };
