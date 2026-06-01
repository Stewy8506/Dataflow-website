"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "../ui/animations";
import { TerminalDemo } from "../ui/TerminalDemo";

export function Engine() {
  return (
    <motion.section
      id="engine"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={stagger()}
    >
      <motion.div className="engine-panel" variants={fadeUp}>
        <h2>Built with Rust.<br /><span className="font-light">Rendered in React.</span></h2>
        <p style={{ maxWidth: "600px", fontSize: "18px", opacity: 0.8 }}>
          Dataflow Visualiser strictly separates the sandboxed UI layer from the native systems engine, communicating over a low-latency IPC bridge.
        </p>
        <div className="engine-stats">
          <div className="engine-stat">
            <h4>40-50x</h4>
            <p>Faster parsing via oxc-parser</p>
          </div>
          <div className="engine-stat">
            <h4>100%</h4>
            <p>Local execution & privacy</p>
          </div>
          <div className="engine-stat">
            <h4>Tauri v2</h4>
            <p>Explicit filesystem boundaries</p>
          </div>
        </div>
        
        <TerminalDemo />
      </motion.div>
    </motion.section>
  );
}
