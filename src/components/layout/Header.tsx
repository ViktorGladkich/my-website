"use client";
import {
  Navbar,
  NavbarLogo,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/navbar";
import { MenuVertical } from "@/components/ui/menu-vertical";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const navItems = [
    {
      name: "HOME",
      link: "/",
    },
    {
      name: "LEISTUNGEN",
      link: "/services",
    },
    {
      name: "PORTFOLIO",
      link: "/portfolio",
    },
    {
      name: "ÜBER UNS",
      link: "/about",
    },
    {
      name: "KONTAKT",
      link: "/contact",
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative w-full z-50">
      <Navbar>
        <div className="flex w-full items-center justify-between">
          <NavbarLogo />

          <div className="flex items-center gap-3 p-1">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "cursor-pointer hidden md:block text-sm font-medium tracking-widest text-black dark:text-white transition-opacity duration-300 hover:opacity-70",
                isMenuOpen ? "opacity-0" : "opacity-100",
              )}
            >
              MENU
            </button>
            <MobileNavToggle
              isOpen={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
        </div>

        <MobileNavMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
          <div onClick={() => setIsMenuOpen(false)}>
            <MenuVertical
              menuItems={navItems.map((i) => ({
                label: i.name,
                href: i.link,
              }))}
              color="#a855f7"
              className="w-full px-0 py-2"
            />
          </div>
          <div className="w-full mt-12 px-10">
            <div className="h-px w-full bg-white/10 mb-8" />
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-neutral-400">
              <div className="flex flex-col items-center md:items-start gap-2">
                <span className="text-sm font-light tracking-widest uppercase text-neutral-500">
                  Kontakt
                </span>
                <a
                  href="mailto:hello@inverta.io"
                  className="text-xl md:text-2xl text-white font-medium hover:text-purple-400 transition-colors"
                >
                  hello@inverta.io
                </a>
              </div>

              <div className="flex gap-6">
                {["LinkedIn", "Instagram", "Behance"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-sm uppercase tracking-widest hover:text-white transition-colors"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </MobileNavMenu>
      </Navbar>
    </div>
  );
};
