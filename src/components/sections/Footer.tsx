"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Github,
  Linkedin,
} from "lucide-react";
import {
  FooterBackgroundGradient,
  TextHoverEffect,
} from "@/components/ui/text-hover-effect";

export function Footer() {
  // Footer link data
  const footerLinks = [
    {
      title: "Leistungen",
      links: [
        { label: "Webentwicklung", href: "/services" },
        { label: "App-Entwicklung", href: "/services" },
        { label: "UI/UX Design", href: "/services" },
        { label: "SMM Strategie", href: "/services" },
      ],
    },
    {
      title: "Unternehmen",
      links: [
        { label: "Über uns", href: "/about" },
        { label: "Portfolio", href: "/portfolio" },
        { label: "Kontakt", href: "/contact" },
        { label: "Karriere", href: "#", pulse: true },
      ],
    },
  ];

  // Contact info data
  const contactInfo = [
    {
      icon: <Mail size={18} className="text-purple-500" />,
      text: "hello@inverta.com",
      href: "mailto:hello@inverta.com",
    },
    {
      icon: <Phone size={18} className="text-purple-500" />,
      text: "+49 123 456789",
      href: "tel:+49123456789",
    },
    {
      icon: <MapPin size={18} className="text-purple-500" />,
      text: "Berlin, Germany",
      href: "#",
    },
  ];

  // Social media icons
  const socialLinks = [
    { icon: <Linkedin size={20} />, label: "LinkedIn", href: "#" },
    { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
    { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
    { icon: <Github size={20} />, label: "GitHub", href: "#" },
  ];

  return (
    <footer className="bg-black/40 relative h-fit overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto p-14 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center p-1">
                <Image
                  src="/logo.png"
                  alt="Inverta Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-white text-2xl font-bold tracking-tight">
                INVERTA
              </span>
            </div>
            <p className="text-sm leading-relaxed text-neutral-400">
              IT & Digital Service GbR.
              <br />
              Digitale Erlebnisse schaffen, die Märkte neu definieren.
            </p>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-lg font-semibold mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative">
                    <Link
                      href={link.href}
                      className="text-neutral-400 hover:text-purple-400 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                    {link.pulse && (
                      <span className="absolute top-0 right-[-14px] w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Kontaktieren Sie uns
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-neutral-400 hover:text-purple-400 transition-colors text-sm"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-neutral-400 hover:text-purple-400 transition-colors text-sm">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-white/10 my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          {/* Social icons */}
          <div className="flex space-x-6 text-gray-400">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-purple-400 transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-center md:text-left text-neutral-500 text-xs">
            &copy; {new Date().getFullYear()} INVERTA IT & Digital Service GbR.
            Alle Rechte vorbehalten.
          </p>
        </div>
      </div>

      {/* Text hover effect */}
      {/* Text hover effect - ensuring visibility */}
      <div className="hidden lg:flex justify-center items-center h-[400px] w-full relative z-60">
        <TextHoverEffect text="INVERTA" className="h-full w-full" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}
