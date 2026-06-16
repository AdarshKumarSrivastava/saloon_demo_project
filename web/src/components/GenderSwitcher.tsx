"use client";

import { useGender } from "@/context/GenderContext";
import { motion } from "framer-motion";

export default function GenderSwitcher() {
  const { gender, toggleGender } = useGender();

  return (
    <div className="flex bg-charcoal p-1 rounded-full relative shadow-inner">
      <div 
        className="flex relative z-10 w-full"
      >
        <button
          onClick={() => toggleGender("Female")}
          className={`px-4 py-1.5 text-sm font-accent uppercase tracking-wider transition-colors duration-300 w-24 text-center rounded-full ${gender === "Female" ? "text-obsidian" : "text-ivory/50 hover:text-ivory cursor-hover"}`}
        >
          Female
        </button>
        <button
          onClick={() => toggleGender("Male")}
          className={`px-4 py-1.5 text-sm font-accent uppercase tracking-wider transition-colors duration-300 w-24 text-center rounded-full ${gender === "Male" ? "text-obsidian" : "text-ivory/50 hover:text-ivory cursor-hover"}`}
        >
          Male
        </button>
      </div>
      
      {/* Animated Pill Background */}
      <motion.div
        className="absolute top-1 bottom-1 w-[6rem] bg-gold rounded-full z-0"
        animate={{
          left: gender === "Female" ? "0.25rem" : "6.25rem",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </div>
  );
}
