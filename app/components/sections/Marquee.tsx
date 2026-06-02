"use client";

import { motion, useScroll, useSpring, useTransform, useVelocity, useAnimationFrame, useMotionValue } from "framer-motion";
import { STACK_ITEMS } from "../../data/content";

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

export function Marquee() {
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
    let moveBy = baseVelocity * (delta / 1000) * 10;
    moveBy += moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <section style={{ padding: 0 }}>
      <div 
        className="marquee-container overflow-hidden py-10 border-y border-[var(--border)] flex whitespace-nowrap"
        style={{ maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}
      >
        <motion.div className="flex gap-16 pr-16 items-center" style={{ x }}>
          {[...STACK_ITEMS, ...STACK_ITEMS, ...STACK_ITEMS, ...STACK_ITEMS, ...STACK_ITEMS, ...STACK_ITEMS, ...STACK_ITEMS, ...STACK_ITEMS].map((item, i) => (
            <span 
              key={i} 
              className="font-mono text-2xl tracking-widest uppercase"
              style={
                i % 2 === 0 
                  ? { color: "var(--muted)", fontWeight: 600 } 
                  : { WebkitTextStroke: "1px var(--muted)", color: "transparent", fontWeight: 600 }
              }
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
