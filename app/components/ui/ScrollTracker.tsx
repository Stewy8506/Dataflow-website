"use client";
import { useEffect } from "react";
import { useBgStore } from "../../store/bgStore";

export function ScrollTracker() {
  const setActiveSection = useBgStore((state) => state.setActiveSection);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: "-50% 0px -50% 0px", threshold: 0 });

    const sections = document.querySelectorAll(".scroll-section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [setActiveSection]);

  return null;
}
