"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "../ui/animations";
import { WORKFLOW_STEPS } from "../../data/content";

function WorkflowTimeline() {
  const dotVariants = {
    dim: { backgroundColor: "var(--border)", boxShadow: "0 0 0px transparent", scale: 1 },
    lit: { backgroundColor: "var(--accent)", boxShadow: "0 0 16px var(--accent)", scale: 1.2 }
  };

  return (
    <div className="workflow-timeline">
      {WORKFLOW_STEPS.map((step) => (
        <motion.div
          key={step.num}
          className="timeline-item"
          initial="dim"
          whileInView="lit"
          viewport={{ margin: "-45% 0px -45% 0px" }}
          variants={{
            dim: { opacity: 0.3 },
            lit: { opacity: 1, transition: { duration: 0.4 } }
          }}
        >
          <div className="timeline-line">
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
      ))}
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
