"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { fadeUp, stagger } from "../ui/animations";
import { WORKFLOW_STEPS } from "../../data/content";

function WorkflowTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(WORKFLOW_STEPS[0].num);
  const [yCoords, setYCoords] = useState<number[]>([]);
  
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

  // Generate the dynamic SVG path
  const generatePath = () => {
    if (yCoords.length === 0) return "";
    
    // Dot X positions: 6px when active (x:0), -14px when dim (x:-20)
    const getX = (stepNum: string) => activeStep === stepNum ? 6 : -14;
    
    let firstX = getX(WORKFLOW_STEPS[0].num);
    let d = `M ${firstX} 0 L ${firstX} ${yCoords[0]}`;
    
    for (let i = 1; i < yCoords.length; i++) {
      const prevX = getX(WORKFLOW_STEPS[i - 1].num);
      const currX = getX(WORKFLOW_STEPS[i].num);
      const prevY = yCoords[i - 1];
      const currY = yCoords[i];
      
      const midY = (prevY + currY) / 2;
      const diffX = Math.abs(currX - prevX);
      const halfDiff = diffX / 2;
      
      d += ` L ${prevX} ${midY - halfDiff} L ${currX} ${midY + halfDiff} L ${currX} ${currY}`;
    }
    
    const lastX = getX(WORKFLOW_STEPS[yCoords.length - 1].num);
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
              dim: { opacity: 0.3, x: -20 },
              lit: { opacity: 1, x: 0, transition: { duration: 0.6, type: "spring", bounce: 0.4 } }
            }}
          >
            <div className="timeline-line z-10 bg-[var(--bg)]">
              <motion.div className="timeline-dot" variants={dotVariants} />
            </div>
            <div className="timeline-content">
              <h4 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "12px", letterSpacing: "-0.02em" }}>
                {step.title}
              </h4>
              <div className="timeline-meta text-muted">
                <span className="font-mono" style={{ color: "var(--fg)" }}>STEP {step.num}</span>
                <span style={{ margin: "0 12px", opacity: 0.5 }}>•</span>
                <span>{step.body}</span>
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
