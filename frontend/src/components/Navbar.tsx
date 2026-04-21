import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./menu/Logo";
import LocaleSwitcher from "./menu/LocaleSwitcher";
import { NavigationDesktop } from "./menu/navigationDesktop";
import { NavigationMobile } from "./menu/navigationMobile";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollWidth, setScrollWidth] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      setScrollWidth((scrolled / scrollableHeight) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (isDesktop) setIsMobileMenuOpen(false);
  }, [isDesktop]);

  return (
    <>
      <nav className="bg-white pb-4 h-[80px] py-3 flex items-center sticky top-11 z-[150] shadow-lg px-4 w-full">
        <div className="flex-1">
          <Logo orientation="vertical" type="both" size="small" />
        </div>

        {isDesktop && (
          <NavigationDesktop />
        )}

        <div className="flex flex-1 justify-end items-center gap-4">
          {isDesktop && (
            <LocaleSwitcher />
          )}

          {!isDesktop && (
            <button
              className="text-black"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>

        <div
          id="scroll-progress"
          className="bg-red-700 h-1 absolute bottom-0 left-0 transition-all duration-100 ease-out"
          style={{ width: `${scrollWidth}%` }}
        />
      </nav>

      {/* MOBILE DRAWER — only mounted when open */}
      {!isDesktop && isMobileMenuOpen && (
        <div
          className="fixed top-0 left-0 right-0 h-screen bg-white shadow-lg 
            z-[300] animate-in slide-in-from-left duration-300"
        >
          <div className="flex items-center justify-between px-6 py-4">
            <Logo orientation="horizontal" />
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="mx-10 mb-4">
            <LocaleSwitcher />
          </div>

          <NavigationMobile onNavigate={() => setIsMobileMenuOpen(false)} />
        </div>
      )}
    </>
  );
};

export default Navbar;
