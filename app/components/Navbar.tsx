"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDownIcon, ArrowIcon, AdalineLogo, PlayButtonIcon } from "../Icons/AllIcons";
import { pillars } from "../constants/PillarsData";

const Navbar = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navOpacity, setNavOpacity] = useState(1);
  const [hoveredPillarNumber, setHoveredPillarNumber] = useState<number | null>(
    null,
  );

  // opacity 1- full visible
  // opacity 0- fully transparent
  useEffect(() => {
    let lastScrollY = window.scrollY;

    //this function will run everytime the user scrolls
    const handleScroll = () => {
      // scrollY is the number of pixels the user has scrolled down from the top of the page
      const scrollY = window.scrollY;
      // at 200px scrollY. opacity becomes 0
      // Never allow opacity to go below 0
      // Never allow opacity to go above 1
      const newOpacity = Math.max(0, 1 - scrollY / 200);
      setNavOpacity(newOpacity);

      // Close dropdown when scrolling down (regardless of hover state)
      if (scrollY > lastScrollY && isProductsOpen) {
        setIsProductsOpen(false);
      }

      lastScrollY = scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isProductsOpen]);

  // Calculate effective opacity (show fully when hovered or dropdown open)
  const effectiveOpacity = isProductsOpen ? 1 : navOpacity;

  return (
    <>
      {/* Nav wrapper - pointer-events-auto sticky */}
      <nav
        className="pointer-events-auto sticky top-0 right-0 left-0 h-0 z-200"
        style={{ opacity: effectiveOpacity }}
      >
        {/* Nav height container */}
        <div
          className="relative transition-shadow duration-200"
          style={{
            height: "var(--nav-height, 56px)",
            boxShadow: isProductsOpen
              ? "0 1px 0 0 rgba(38, 40, 39, 0.1)"
              : "0 1px 0 0 transparent",
          }}
        >
          {/* Content container with grid margin */}
          <div
            className="absolute inset-0 z-20 flex flex-row items-center justify-center"
            style={{ paddingInline: "var(--grid-margin, 24px)" }}
          >
            {/* Left: Navigation Links */}
            <div
              className="flex flex-1 items-center gap-10 lg:gap-12"
              style={{ fontFamily: "var(--font-fragment-mono)" }}
            >
              <button
                className="hidden lg:flex items-center gap-2 text-[11px] font-medium tracking-[0.08em] uppercase text-[#0a1d08] hover:opacity-60 transition-opacity"
                onMouseEnter={() => setIsProductsOpen(true)}
              >
                PRODUCTS
                <ChevronDownIcon
                  className={`w-2.5 h-2.5 transition-transform duration-200 ${isProductsOpen ? "rotate-180" : ""}`}
                />
              </button>
              <Link
                href="/pricing"
                className="hidden lg:block text-[11px] font-medium tracking-[0.08em] uppercase text-[#0a1d08] hover:opacity-60 transition-opacity"
              >
                PRICING
              </Link>
              <Link
                href="/blog"
                className="hidden lg:block text-[11px] font-medium tracking-[0.08em] uppercase text-[#0a1d08] hover:opacity-60 transition-opacity"
              >
                BLOG
              </Link>
            </div>

            {/* Center: Logo */}
            <AdalineLogo />

            {/* Right: CTA Buttons */}
            <div
              className="flex flex-1 items-center justify-end gap-3"
              style={{ fontFamily: "var(--font-fragment-mono)" }}
            >
              <Link
                href="/demo"
                className="hidden lg:flex items-center gap-2 px-4 py-2.5 text-[11px] font-medium tracking-[0.05em] uppercase bg-white border border-[#262827]/20 rounded-full text-[#262827] hover:bg-[#F9FAF8] transition-colors"
              >
                WATCH DEMO
                <PlayButtonIcon />
              </Link>
              <Link
                href="/signup"
                className="hidden lg:block px-4 py-2.5 text-[11px] font-medium tracking-[0.05em] uppercase bg-[#264026] text-[#F9FAF8] rounded-full hover:bg-[#1f331f] transition-colors"
              >
                START FOR FREE
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-[#2D3E2F]/5 transition-colors"
                aria-label="Toggle menu"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span
                    className={`w-full h-0.5 bg-[#2D3E2F] transition-all origin-center ${isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
                  />
                  <span
                    className={`w-full h-0.5 bg-[#2D3E2F] transition-all ${isMobileMenuOpen ? "opacity-0" : ""}`}
                  />
                  <span
                    className={`w-full h-0.5 bg-[#2D3E2F] transition-all origin-center ${isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Products Dropdown Container - includes invisible bridge area */}
        <div
          onMouseEnter={() => setIsProductsOpen(true)}
          onMouseLeave={() => setIsProductsOpen(false)}
          className={`absolute top-0 left-0 w-full transition-all duration-300 ${isProductsOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
            }`}
          style={{
            paddingTop: "var(--nav-height, 56px)",
            fontFamily: "var(--font-fragment-mono)",
          }}
        >
          {/* Actual dropdown content */}
          <div className="bg-[#F9FAF8] border-b border-[#2D3E2F]/10">
            {/* Top section with icons */}
            <div style={{ paddingInline: "var(--grid-margin, 24px)" }}>
              {/* Dotted separator line */}
              <div className="border-t border-dashed border-[#2D3E2F]/20 mb-0.5" />
              <div className="border-t border-dashed border-[#2D3E2F]/20 mb-10" />

              {/* Icons row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 py-8">
                {pillars.map((pillar) => (
                  <div
                    key={pillar.number}
                    className={`flex flex-col items-start group cursor-pointer transition-opacity duration-200 ${hoveredPillarNumber === null ||
                      hoveredPillarNumber === pillar.number
                      ? "opacity-100 cursor-pointer"
                      : "opacity-40"
                      }`}
                    onMouseEnter={() => setHoveredPillarNumber(pillar.number)}
                    onMouseLeave={() => setHoveredPillarNumber(null)}
                  >
                    {/* Icon - each icon handles its own hover animation */}
                    <div className="mb-2 h-[80px] md:h-[100px] flex items-end">
                      <pillar.Icon />
                    </div>
                  </div>
                ))}
              </div>

              {/* Dotted separator line */}
              <div className="border-t border-dashed border-[#2D3E2F]/20  mb-0.5" />
              <div className="border-t border-dashed border-[#2D3E2F]/20" />
            </div>

            {/* Bottom section with text and links */}
            <div
              style={{ paddingInline: "var(--grid-margin, 24px)" }}
              className="py-8 md:py-10 bg-white"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {pillars.map((pillar) => (
                  <div
                    key={pillar.number}
                    className={`flex flex-col transition-opacity duration-200 ${hoveredPillarNumber === null ||
                      hoveredPillarNumber === pillar.number
                      ? "opacity-100 cursor-pointer"
                      : "opacity-40"
                      }`}
                    onMouseEnter={() => setHoveredPillarNumber(pillar.number)}
                    onMouseLeave={() => setHoveredPillarNumber(null)}
                  >
                    {/* Category label */}
                    <span className="text-[9px] md:text-[10px] font-medium tracking-[0.15em] uppercase text-[#1a1a1a] mb-2 md:mb-3">
                      {pillar.title}
                    </span>

                    {/* Subtitle */}
                    <h3 style={{
                      lineHeight: "34.7px",
                      letterSpacing: "-0.02em",
                    }} className="text-[1.25rem] md:text-[1.75rem] font-normal text-[#1a1a1a] whitespace-pre-line leading-[-.02em] mb-4 md:mb-6">
                      {pillar.subtitle}
                    </h3>

                    {/* Links */}
                    <div className="space-y-1">
                      {pillar.links.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className="flex items-center gap-1 text-[13px] md:text-[15px] text-[#5C6D5E] hover:text-[#1a1a1a] transition-colors"
                        >
                          {link.name}
                          {link.external && <ArrowIcon className="w-3 h-3" />}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-[56px] left-0 w-full transition-all duration-300 ease-in-out ${isMobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden pointer-events-none"
            }`}
        >
          <div className="px-6 py-6 bg-white/98 backdrop-blur-xl border-t border-[#2D3E2F]/10 space-y-4">
            <Link
              href="/products"
              className="block px-4 py-3 text-[#2D3E2F] hover:bg-[#F5F3EE] rounded-lg transition-colors"
            >
              Products
            </Link>
            <Link
              href="/pricing"
              className="block px-4 py-3 text-[#2D3E2F] hover:bg-[#F5F3EE] rounded-lg transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="block px-4 py-3 text-[#2D3E2F] hover:bg-[#F5F3EE] rounded-lg transition-colors"
            >
              Blog
            </Link>
            <div className="pt-4 space-y-3">
              <Link
                href="/demo"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 text-center bg-white border border-[#2D3E2F]/10 rounded-full text-[#2D3E2F] font-medium text-sm"
              >
                Watch Demo
                <PlayButtonIcon />
              </Link>
              <Link
                href="/signup"
                className="block w-full px-4 py-3 text-center bg-[#2D3E2F] text-white rounded-full font-medium text-sm"
              >
                Start for free
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
