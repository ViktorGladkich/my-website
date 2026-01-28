"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { MenuVertical } from "@/components/ui/menu-vertical";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { useState } from "react";
import Link from "next/link";

export const Header = () => {
  const navItems = [
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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full z-50">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <div className="flex items-center gap-4">
            <NavbarLogo />
          </div>
          <NavItems items={navItems} />{" "}
          {/* Centered automatically by flex-1 in NavItems */}
          <div className="flex items-center gap-4">
            <Link href="/contact" passHref>
              <NavbarButton
                variant="primary"
                as="button"
                className="bg-white text-black hover:bg-gray-100 shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset]"
              >
                Kontaktieren
              </NavbarButton>
            </Link>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            <div onClick={() => setIsMobileMenuOpen(false)}>
              <MenuVertical
                menuItems={navItems.map((i) => ({
                  label: i.name,
                  href: i.link,
                }))}
                color="#a855f7" // Purple-500 from gradient
                className="w-full px-0 py-2"
              />
            </div>
            <div className="flex w-full flex-col gap-4 mt-8 px-8 pb-4">
              <Link href="/contact" className="w-full">
                <HoverBorderGradient
                  containerClassName="rounded-full w-full"
                  as="button"
                  className="bg-black text-white flex items-center justify-center space-x-2 px-8 py-4 w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="font-semibold text-lg uppercase tracking-widest">
                    Kontaktieren
                  </span>
                </HoverBorderGradient>
              </Link>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
};
