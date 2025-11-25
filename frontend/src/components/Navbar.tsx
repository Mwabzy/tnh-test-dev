import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./menu/Logo";
import LocaleSwitcher from "./menu/LocaleSwitcher";
import { NavigationDesktop } from "./menu/navigationDesktop";
import { NavigationMobile } from "./menu/navigationMobile";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollWidth, setScrollWidth] = useState(0);

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

  return (
    <>
      <nav className="bg-white/90 pb-4 backdrop-blur-md h-[80px] py-3 flex items-center sticky top-11 z-[150] shadow-lg px-4 w-full">
        <div className="flex-1">
          <Logo orientation="horizontal" type="both" size="small" />
        </div>

        <div className="hidden md:block">
          <NavigationDesktop />
        </div>

        <div className="flex flex-1 justify-end items-center gap-4">
          <div className="hidden md:block">
            <LocaleSwitcher />
          </div>

          <button
            className="md:hidden text-black"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div
          id="scroll-progress"
          className="bg-red-700 h-1 absolute bottom-0 left-0 transition-all duration-100 ease-out"
          style={{ width: `${scrollWidth}%` }}
        />
      </nav>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-0 left-0 right-0 h-screen bg-white shadow-lg 
          transition-transform duration-300 z-[300] md:hidden 
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
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
    </>
  );
};

export default Navbar;
