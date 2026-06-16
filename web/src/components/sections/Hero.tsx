"use client";

import { motion } from "framer-motion";
import { useGender } from "@/context/GenderContext";

export default function Hero() {
  const { gender } = useGender();

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-obsidian">
      {/* Background Image - Dynamic based on Gender */}
      <motion.div
        key={gender}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: gender === "Female" 
              ? "url('https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1920&q=80')" 
              : "url('https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1920&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span className="font-accent text-gold tracking-[0.3em] uppercase text-xs md:text-sm mb-6 block">
            {gender === "Female" ? "Reveal Your Essence" : "Refine Your Edge"}
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          className="font-display text-5xl md:text-7xl lg:text-8xl italic font-light tracking-wide text-ivory leading-tight mb-10"
        >
          {gender === "Female" ? (
            <>Bespoke <br /> Beauty</>
          ) : (
            <>Masterful <br /> Grooming</>
          )}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <a href="#book" className="px-8 py-4 border border-gold/50 text-ivory font-accent text-sm tracking-[0.15em] uppercase hover:bg-gold/10 hover:border-gold transition-all duration-300 rounded-sm cursor-hover">
            Reserve Appointment
          </a>
        </motion.div>
      </div>
    </section>
  );
}
