"use client";

import { useRef } from "react";

export function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const spotlight = cardRef.current?.querySelector(".spotlight") as HTMLElement;
    if (spotlight) {
      spotlight.style.background = `radial-gradient(300px circle at ${x}px ${y}px, rgba(255, 107, 0, 0.12), transparent 60%)`;
    }
  }

  return (
    <div ref={cardRef} className={`card ${className}`} onMouseMove={handleMouseMove}>
      <div className="spotlight" />
      {children}
    </div>
  );
}
