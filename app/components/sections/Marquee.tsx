"use client";

import { motion, useScroll, useSpring, useTransform, useVelocity, useAnimationFrame, useMotionValue } from "framer-motion";
import { STACK_ITEMS } from "../../data/content";
import { useState } from "react";

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

export function Marquee() {
  const [paused, setPaused] = useState(false);
  const baseVelocity = -0.5;
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);

  useAnimationFrame((t, delta) => {
    if (paused) return;
    let moveBy = baseVelocity * (delta / 1000) * 10;
    moveBy += moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const items = [...STACK_ITEMS, ...STACK_ITEMS, ...STACK_ITEMS, ...STACK_ITEMS, ...STACK_ITEMS, ...STACK_ITEMS, ...STACK_ITEMS, ...STACK_ITEMS];

  return (
    <section style={{ padding: 0 }}>
      <div
        className="marquee-container overflow-hidden py-10 border-y border-[var(--border)] flex whitespace-nowrap"
        style={{ maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div
          className="flex items-center"
          style={{ x, gap: 0 }}
        >
          {items.map((item, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
              <span
                className="font-mono text-2xl tracking-widest uppercase"
                style={
                  i % 2 === 0
                    ? { color: "var(--muted)", fontWeight: 600, padding: "0 20px" }
                    : { WebkitTextStroke: "1px var(--muted)", color: "transparent", fontWeight: 600, padding: "0 20px" }
                }
              >
                {item}
              </span>
              {/* Separator */}
              <span style={{ color: "var(--accent)", opacity: 0.4, fontSize: "18px", flexShrink: 0 }}>//</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

