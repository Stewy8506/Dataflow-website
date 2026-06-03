"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { fadeUp, stagger } from "../ui/animations";
import { WORKFLOW_STEPS } from "../../data/content";

function WorkflowTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(WORKFLOW_STEPS[0].num);
  const [yCoords, setYCoords] = useState<number[]>([]);
  const [dotPos, setDotPos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track active step based on scroll distance to center
  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      let minDistance = Infinity;
      let closestStep = WORKFLOW_STEPS[0].num;

      itemRefs.current.forEach((el, index) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const distance = Math.abs(viewportCenter - elementCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestStep = WORKFLOW_STEPS[index].num;
          }
        }
      });

      setActiveStep(closestStep);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Measure Y coordinates of each step
  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const coords = itemRefs.current.map(el => el ? el.offsetTop + 18 : 0);
      setYCoords(coords);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Move traveling dot along path based on scroll progress
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      if (!pathRef.current) return;
      try {
        const d = pathRef.current.getAttribute("d");
        if (!d) return; // Skip if path is empty
        const len = pathRef.current.getTotalLength();
        if (len === 0) return;
        const pt = pathRef.current.getPointAtLength(v * len);
        setDotPos({ x: pt.x, y: pt.y });
      } catch (err) {
        // Safely catch during SVG initialization
      }
    });
    return unsub;
  }, [scrollYProgress]);

  // Generate the dynamic SVG path
  const generatePath = () => {
    if (yCoords.length === 0) return "";
    const getX = () => 6; // Keep the line perfectly straight
    let firstX = getX();
    let d = `M ${firstX} 0 L ${firstX} ${yCoords[0]}`;
    for (let i = 1; i < yCoords.length; i++) {
      const prevX = getX();
      const currX = getX();
      const prevY = yCoords[i - 1];
      const currY = yCoords[i];
      d += ` L ${currX} ${currY}`;
    }
    const lastX = getX();
    const containerHeight = containerRef.current?.offsetHeight || yCoords[yCoords.length - 1] + 100;
    d += ` L ${lastX} ${containerHeight}`;
    return d;
  };

  const pathString = generatePath();

  const dotVariants = {
    dim: { backgroundColor: "var(--border)", boxShadow: "0 0 0px transparent", scale: 1 },
    lit: { backgroundColor: "var(--accent)", boxShadow: "0 0 20px rgba(255,107,0,0.8)", scale: 1.3 }
  };

  return (
    <div className="workflow-timeline relative" ref={containerRef}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: "visible" }}>
        {yCoords.length > 0 && (
          <>
            <motion.path
              ref={pathRef}
              d={pathString}
              fill="transparent"
              stroke="var(--border)"
              strokeWidth="2"
              animate={{ d: pathString }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            />
            <motion.path
              d={pathString}
              fill="transparent"
              stroke="var(--accent)"
              strokeWidth="2"
              style={{ pathLength: scaleY }}
              animate={{ d: pathString }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            />
            {/* Traveling glow dot */}
            <motion.circle
              cx={dotPos.x}
              cy={dotPos.y}
              r={5}
              fill="var(--accent)"
              style={{
                filter: "drop-shadow(0 0 6px var(--accent)) drop-shadow(0 0 12px var(--accent))",
              }}
            />
          </>
        )}
      </svg>

      {WORKFLOW_STEPS.map((step, index) => {
        const isActive = activeStep === step.num;
        return (
          <motion.div
            key={step.num}
            ref={(el) => { itemRefs.current[index] = el; }}
            className="timeline-item"
            initial={false}
            animate={isActive ? "lit" : "dim"}
            variants={{
              dim: { y: 0 },
              lit: { y: 0, transition: { duration: 0.6, type: "spring", bounce: 0.4 } }
            }}
          >
            <div className="timeline-line z-10 bg-[var(--bg)]">
              <motion.div className="timeline-dot" variants={dotVariants} />
            </div>
            <div className="timeline-content">
              <div style={{ 
                background: isActive ? "var(--surface)" : "transparent", 
                padding: "32px", 
                borderRadius: "1.5rem", 
                border: isActive ? "1px solid var(--border)" : "1px solid transparent",
                backdropFilter: isActive ? "blur(24px)" : "none",
                WebkitBackdropFilter: isActive ? "blur(24px)" : "none",
                boxShadow: isActive ? "0 12px 40px rgba(0,0,0,0.3)" : "none",
                transition: "all 0.4s ease"
              }}>
                <motion.div 
                  variants={{
                    dim: { opacity: 0.3 },
                    lit: { opacity: 1 }
                  }}
                  style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}
                >
                  {/* Circular number badge */}
                  <motion.div
                    animate={isActive
                      ? { background: "var(--accent)", color: "#fff", scale: 1.1, boxShadow: "0 0 16px rgba(255,107,0,0.5)" }
                      : { background: "var(--fg)", color: "var(--bg)", scale: 1, boxShadow: "none" }
                    }
                    transition={{ duration: 0.4 }}
                    style={{ width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", fontSize: "16px", fontWeight: 700, flexShrink: 0 }}
                  >
                    {step.num}
                  </motion.div>
                  <h4 style={{ fontSize: "32px", fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>
                    {step.title}
                  </h4>
                </motion.div>
                <motion.p 
                  variants={{
                    dim: { opacity: 0.3 },
                    lit: { opacity: 1 }
                  }}
                  className="text-muted" 
                  style={{ fontSize: "16px", lineHeight: 1.6 }}
                >
                  {step.body}
                </motion.p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}


export function Workflow() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={stagger()}
      style={{ maxWidth: "800px", margin: "0 auto 120px auto", padding: "0 24px" }}
    >
      <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(32px, 5vw, 64px)", marginBottom: "64px", textAlign: "center" }}>
        Workflow
      </motion.h2>

      <WorkflowTimeline />
    </motion.section>
  );
}
