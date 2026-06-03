"use client";

import { ThemeToggle } from "../ui/ThemeToggle";
import { pulseGlow } from "../ui/animations";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { useBgStore } from "../../store/bgStore";

import { FaGithub } from "react-icons/fa";

const navLinks = [
  { name: "Workflow", id: "workflow" },
  { name: "Ecosystems", id: "ecosystems" },
  { name: "Engine", id: "engine" },
  { name: "Privacy", id: "privacy" },
  { name: "Download", id: "download" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const { activeSection } = useBgStore();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest <= 50) {
      setIsTop(true);
      setHidden(false);
    } else {
      setIsTop(false);
      if (latest > previous && latest > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    }
  });

  return (
    <motion.nav
      className={`nav ${isTop ? "is-top" : ""}`}
      variants={{
        visible: { y: 0, x: "-50%" },
        hidden: { y: "-150%", x: "-50%" },
      }}
      initial="visible"
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <motion.a 
        href="#" 
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="brand" 
        style={{ position: "relative", zIndex: 10 }}
        variants={pulseGlow}
        initial="initial"
        animate="animate"
      >
        DV
      </motion.a>

      {/* Unified Links Layout */}
      <div className="links" style={{ display: "flex", gap: "24px", alignItems: "center", position: "relative" }}>
        {navLinks.map((link) => {
          // Always ensure exactly one link is active to prevent the layoutId pill from ever unmounting,
          // which is the root cause of the "flying from off-screen" glitches.
          const currentActive = (activeSection === "hero" || !activeSection) ? "workflow" : activeSection;
          const isActive = currentActive === link.id;
          
          return (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ position: "relative", padding: "8px 12px", color: isActive ? "var(--fg)" : "var(--muted)", transition: "color 0.2s ease" }}
            >
              {isActive && (
                <motion.div
                  layoutId="unique-navbar-pill"
                  style={{
                    position: "absolute", inset: 0,
                    background: "rgba(255, 255, 255, 0.08)",
                    borderRadius: "9999px", zIndex: -1
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 35 }}
                />
              )}
              <span style={{ position: "relative", zIndex: 10 }}>{link.name}</span>
            </a>
          );
        })}
        <div style={{ marginLeft: "12px", paddingLeft: "24px", borderLeft: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "16px" }}>
          <a
            href="https://github.com/Stewy8506/Repository-Visualiser"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--muted)", display: "flex", alignItems: "center", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
          >
            <FaGithub size={20} />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
}
