"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for smooth following and velocity calculation
  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Calculate real-time velocities
  const velX = useVelocity(cursorX);
  const velY = useVelocity(cursorY);

  const lastRotation = useRef(0);
  const transformString = useTransform([velX, velY], ([vx, vy]: number[]) => {
    // 1. Calculate rotation angle
    if (Math.abs(vx) > 0.1 || Math.abs(vy) > 0.1) {
      lastRotation.current = (Math.atan2(vy, vx) * 180) / Math.PI;
    }

    // 2. Calculate squash/stretch based on speed
    const speed = Math.sqrt(vx * vx + vy * vy);
    const sx = 1 + Math.min(speed / 1500, 1.5);
    const sy = 1 - Math.min(speed / 2000, 0.5);

    // 3. Return explicit CSS transform string
    return `rotate(${lastRotation.current}deg) scaleX(${sx}) scaleY(${sy})`;
  });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setIsVisible(true);

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".interactive") ||
        target.closest(".graph-container") ||
        target.closest(".hex-wrap")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        pointerEvents: "none",
        zIndex: 10000,
        mixBlendMode: "difference",
      }}
    >
      <motion.div
        style={{ transform: transformString }}
        animate={{
          width: isHovering ? 64 : 16,
          height: isHovering ? 64 : 16,
          borderRadius: "50%",
          backgroundColor: "#ffffff",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
    </motion.div>
  );
}
