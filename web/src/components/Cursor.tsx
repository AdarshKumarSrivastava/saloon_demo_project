"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Tuned for zero delay, instant tracking
  const springConfig = { damping: 30, stiffness: 400, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener("mousemove", moveCursor);

    const observer = new MutationObserver(() => {
      const newHoverElements = document.querySelectorAll("a, button, input, select, .cursor-hover");
      newHoverElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-ivory pointer-events-none z-[100] mix-blend-difference flex items-center justify-center"
        style={{ x: cursorXSpring, y: cursorYSpring }}
        animate={{
          scale: isHovering ? 2 : 1,
          backgroundColor: "rgba(245, 240, 232, 0)", // Keep it fully transparent
          borderColor: isHovering ? "rgba(245, 240, 232, 0.5)" : "rgba(245, 240, 232, 1)",
        }}
        transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
      >
        {/* Inner dot */}
        <motion.div 
          className="w-1.5 h-1.5 bg-ivory rounded-full"
          animate={{ scale: isHovering ? 0 : 1 }}
        />
      </motion.div>
    </>
  );
}
