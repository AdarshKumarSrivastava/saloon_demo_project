"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import GenderSwitcher from "./GenderSwitcher";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out px-8 md:px-16 ${scrolled ? 'py-4 bg-obsidian/80 backdrop-blur-xl border-b border-gold/10' : 'py-8 bg-transparent'}`}>
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Brand */}
        <Link href="/" className="font-accent text-2xl tracking-[0.2em] text-gold cursor-hover">
          MAISON ÉCLAT
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-10">
          <Link href="#services" className="font-body text-sm uppercase tracking-widest text-ivory/80 hover:text-gold transition-colors relative group cursor-hover">
            Services
            <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-500"></span>
          </Link>
          <Link href="#pricing" className="font-body text-sm uppercase tracking-widest text-ivory/80 hover:text-gold transition-colors relative group cursor-hover">
            Pricing
            <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-500"></span>
          </Link>
          <Link href="#book" className="font-body text-sm uppercase tracking-widest text-ivory/80 hover:text-gold transition-colors relative group cursor-hover">
            Book
            <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-500"></span>
          </Link>
          
          <div className="w-[1px] h-8 bg-gold/20 mx-2"></div>
          
          {/* Gender Switcher */}
          <GenderSwitcher />
        </div>
      </div>
    </nav>
  );
}
