"use client";

import { ThemeToggle } from "../ui/ThemeToggle";
import { pulseGlow } from "../ui/animations";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useBgStore } from "../../store/bgStore";
import { Menu, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const navLinks = [
  { name: "Features", id: "features" },
  { name: "Workflow", id: "workflow" },
  { name: "Ecosystems", id: "ecosystems" },
  { name: "Engine", id: "engine" },
  { name: "Comparison", id: "comparison" },
  { name: "Download", id: "download" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [navState, setNavState] = useState<"top" | "floating" | "hidden">("top");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { activeSection } = useBgStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Always show expanded at the very top (Hero section)
    if (latest <= 50) {
      setNavState("top");
      return;
    }

    // Don't hide navbar if mobile menu is open
    if (mobileMenuOpen) return;

    // Scrolling down -> hide
    if (latest > previous) {
      setNavState("hidden");
    } 
    // Scrolling up -> show floating pill
    else {
      setNavState("floating");
    }
  });

  return (
    <>
      <div className="nav-container">
        <motion.nav
          layout
          className={`nav ${navState === "top" ? "is-top" : ""}`}
          variants={{
            top: { y: 0 },
            floating: { y: 0 },
            hidden: { y: "-150%" },
          }}
          initial="top"
          animate={navState}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
        <motion.a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="brand-mark interactive" 
          style={{ position: "relative", zIndex: 10 }}
        >
          <div className="g-glyph">d</div>
          <span className="name">dataflow</span>
        </motion.a>

        {/* Desktop Links */}
        <div className="links nav-desktop" style={{ display: "flex", gap: "24px", alignItems: "center", position: "relative" }}>
          {navLinks.map((link) => {
            const currentActive = (activeSection === "hero" || !activeSection) ? "workflow" : activeSection;
            const isActive = navState !== "top" && currentActive === link.id;
            
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
                {/* Only render layoutId pill after initial mount to prevent flying-in bug */}
                {isActive && mounted && (
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

        {/* Mobile Hamburger Button */}
        <div className="nav-mobile" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <ThemeToggle />
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            style={{ 
              background: "transparent", 
              border: "none", 
              color: "var(--fg)", 
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "24px", marginBottom: "40px" }}>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                style={{ 
                  background: "var(--surface)", 
                  border: "1px solid var(--border)", 
                  borderRadius: "50%",
                  width: "48px",
                  height: "48px",
                  color: "var(--fg)", 
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <X size={24} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "32px", padding: "0 32px" }}>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    setTimeout(() => {
                      document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                  }}
                  style={{ 
                    fontSize: "32px", 
                    fontWeight: 700, 
                    color: "var(--fg)", 
                    textDecoration: "none",
                    borderBottom: "1px solid var(--border)",
                    paddingBottom: "16px"
                  }}
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                style={{ marginTop: "24px" }}
              >
                <a
                  href="https://github.com/Stewy8506/Repository-Visualiser"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn secondary"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <FaGithub size={20} /> Star on GitHub
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </>
  );
}
