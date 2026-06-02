"use client";

import { ThemeToggle } from "../ui/ThemeToggle";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { useBgStore } from "../../store/bgStore";

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
      // Hide if scrolling down and past 150px
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
      <a href="#" className="brand" style={{ position: "relative", zIndex: 10 }}>
        DV
      </a>
      <div className="links" style={{ display: "flex", gap: "24px", alignItems: "center", position: "relative" }}>
        {navLinks.map((link) => {
          // Highlight link if it matches activeSection, or if activeSection is empty and we are at the top (hero)
          const isActive = activeSection === link.id || (isTop && link.id === "hero"); // We don't have hero in links but kept logic
          return (
            <a 
              key={link.id} 
              href={`#${link.id}`}
              style={{ position: "relative", padding: "8px 12px", color: isActive ? "var(--fg)" : "var(--muted)", transition: "color 0.2s ease" }}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(255, 255, 255, 0.08)",
                    borderRadius: "9999px",
                    zIndex: -1
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span style={{ position: "relative", zIndex: 10 }}>{link.name}</span>
            </a>
          );
        })}
        <div style={{ marginLeft: "12px", paddingLeft: "24px", borderLeft: "1px solid var(--border)" }}>
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
}
