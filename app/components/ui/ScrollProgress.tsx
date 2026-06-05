"use client";

import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

export function ScrollProgress() {
  const { scrollYProgress, scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // Smooth out the scroll progress for the SVG circle
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate the stroke dashoffset based on progress (circle circumference is roughly 113)
  const pathLength = useTransform(scaleY, [0, 1], [0, 1]);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      // Show button after scrolling down 300px
      setIsVisible(latest > 300);
    });
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="interactive"
          aria-label="Back to top"
          style={{
            position: "fixed",
            bottom: "32px",
            right: "32px",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 9900,
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            color: "var(--fg)"
          }}
        >
          {/* Background Track */}
          <svg width="48" height="48" viewBox="0 0 48 48" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
            />
            {/* Progress indicator */}
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength }}
            />
          </svg>
          
          <ArrowUp size={20} style={{ position: "relative", zIndex: 1 }} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
