"use client";

import { ThemeToggle } from "../ui/ThemeToggle";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useBgStore } from "../../store/bgStore";
import { Menu, X } from "lucide-react";

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
  const [mobileOpen, setMobileOpen] = useState(false);
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
        setMobileOpen(false);
      } else {
        setHidden(false);
      }
    }
  });

  return (
    <>
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

        {/* Desktop links */}
        <div className="links nav-desktop" style={{ display: "flex", gap: "24px", alignItems: "center", position: "relative" }}>
          {navLinks.map((link) => {
            const isActive = activeSection === link.id || (isTop && link.id === "hero");
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
                      position: "absolute", inset: 0,
                      background: "rgba(255, 255, 255, 0.08)",
                      borderRadius: "9999px", zIndex: -1
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

        {/* Mobile: theme + hamburger */}
        <div className="nav-mobile" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            style={{ background: "none", border: "none", cursor: "none", color: "var(--fg)", padding: "4px", display: "flex", alignItems: "center" }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen
                ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={22} /></motion.span>
                : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={22} /></motion.span>
              }
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: "90px",
              left: "5vw",
              right: "5vw",
              zIndex: 99,
              background: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid var(--border)",
              borderRadius: "1.25rem",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.id}
                href={`#${link.id}`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setMobileOpen(false)}
                style={{
                  padding: "14px 16px",
                  borderRadius: "0.75rem",
                  color: activeSection === link.id ? "var(--accent)" : "var(--fg)",
                  fontSize: "16px",
                  fontWeight: 500,
                  textDecoration: "none",
                  background: activeSection === link.id ? "rgba(255,107,0,0.08)" : "transparent",
                  transition: "background 0.2s ease",
                  display: "block",
                }}
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
