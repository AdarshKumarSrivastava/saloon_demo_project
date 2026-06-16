"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Elegant minimum load time to build anticipation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    // Lock body scroll while loading
    document.body.style.overflow = "hidden";
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} // Apple-like spring easing
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-obsidian text-gold overflow-hidden"
        >
          {/* Logo Reveal */}
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              className="font-accent text-3xl md:text-5xl tracking-[0.4em] uppercase text-center"
            >
              Maison Éclat
            </motion.h1>
          </div>
          
          {/* Progress Line */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "200px", opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ delay: 0.3, duration: 1.5, ease: "easeInOut" }}
            className="h-[1px] bg-gold/50 mt-8"
          />

          {/* Luxury Subtitle */}
          <motion.div className="overflow-hidden mt-6">
            <motion.p
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="font-body text-xs tracking-widest text-ivory/60 uppercase"
            >
              Curating Your Experience
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
