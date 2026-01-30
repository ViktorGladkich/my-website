"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// --- Types ---
interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "partner-1",
    name: "Viktor Gladkich",
    role: "GF-Gesellschafter",
    image: "/images/team/member_1.jpg",
  },
  {
    id: "partner-2",
    name: "Mansur",
    role: "GF-Gesellschafter",
    image: "/images/team/member_2.jpeg", 
  },
  {
    id: "partner-3",
    name: "Ali",
    role: "GF-Gesellschafter",
    image: "/images/team/member_3.jpeg", 
  },
  {
    id: "1",
    name: "Elena Rodriguez",
    role: "Kreativdirektorin",
    image: "/images/team/member_5.png",
  },
  {
    id: "2",
    name: "Thomas Müller",
    role: "Lead Developer",
    image: "/images/team/member_6.png",
  },
  {
    id: "3",
    name: "David Klein",
    role: "Brand Strategist",
    image: "/images/team/member_3.png",
  },
  {
    id: "4",
    name: "Sarah Weber",
    role: "Digital Marketing",
    image: "/images/team/member_4.png",
  },
];

// --- Sub-components ---

// The "Sticky Corner" SVG specialized for this component
const StickyCorner = ({
  className,
  style,
  fill = "currentColor",
}: {
  className?: string;
  style?: React.CSSProperties;
  fill?: string;
}) => (
  <div className={className} style={style}>
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full block"
    >
      <path d="M40 40V0C40 22.0914 22.0914 40 0 40H40Z" fill={fill}></path>
    </svg>
  </div>
);

const TeamCard = ({ member }: { member: TeamMember }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full h-[400px] md:h-[500px] rounded-[40px] overflow-hidden group"
    >
      {/* Background Image */}
      <Image
        src={member.image}
        alt={member.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Floating Info Block (Sticky Corner Effect) */}
      <div className="absolute bottom-0 left-0 z-20">
        {/* Top Connector */}
        <StickyCorner
          className="absolute -top-[40px] left-0 w-10 h-10"
          fill="#000000" // Matching the block background
          style={{ transform: "rotate(90deg)" }}
        />

        {/* Info Content Block */}
        <div className="bg-black rounded-tr-[40px] px-8 pt-6 pb-8 min-w-[200px] md:min-w-[240px]">
          <p className="text-white font-bold text-xl md:text-2xl mb-1">
            {member.name}
          </p>
          <p className="text-neutral-500 text-sm md:text-base font-medium uppercase tracking-wide">
            {member.role}
          </p>
        </div>

        {/* Right Connector */}
        <StickyCorner
          className="absolute bottom-0 -right-[40px] w-10 h-10"
          fill="#000000"
          style={{ transform: "rotate(90deg)" }}
        />
      </div>
    </motion.div>
  );
};

// --- Main Component ---
export function TeamSection() {
  return (
    <section className="bg-black py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-20 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-blue-500 font-bold tracking-wider uppercase mb-6 block">
              Unser Team
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Kreative Köpfe <br />
              <span className="text-neutral-500">für Ihren Erfolg.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-neutral-400 text-lg max-w-md leading-relaxed text-left self-start md:self-end"
          >
            Wir sind Designer, Entwickler und Strategen. Aber vor allem sind wir
            Menschen, die Technologie lieben und Marken verstehen.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-10">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
