"use client";

import { useState, useEffect } from "react";

export function IntroLoader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let start = performance.now();
    const duration = 1600;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * 100));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 300);
      }
    };
    requestAnimationFrame(tick);
  }, []);

  return (
    <div className={`intro-loader ${done ? "done" : ""}`} aria-hidden="true">
      <div className="loader-content">
        <h1 className="cinematic-text" style={{ "--progress": `${count}%` } as React.CSSProperties}>
          DATAFLOW
        </h1>
        <div className="counter">{String(count).padStart(3, "0")}%</div>
      </div>
    </div>
  );
}
