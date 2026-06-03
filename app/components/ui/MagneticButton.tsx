"use client";

import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export function MagneticButton({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // Very slight magnetic effect (10% pull)
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const { x, y } = position;
  return (
    <motion.div
      className={`relative ${className}`}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
      style={{ display: "inline-block" }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-1 rounded-full opacity-0 transition duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              120px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 107, 0, 0.5),
              transparent 80%
            )
          `,
          opacity: isHovered ? 1 : 0,
          zIndex: 0
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
