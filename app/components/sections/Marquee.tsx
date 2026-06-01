"use client";

import { STACK_ITEMS } from "../../data/content";

export function Marquee() {
  return (
    <section style={{ padding: 0 }}>
      <div className="marquee-container">
        <div className="marquee-track">
          {[...STACK_ITEMS, ...STACK_ITEMS, ...STACK_ITEMS, ...STACK_ITEMS].map((item, i) => (
            <span key={i} className="marquee-item">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
