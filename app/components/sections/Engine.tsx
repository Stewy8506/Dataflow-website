"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "../ui/animations";
import { TerminalDemo } from "../ui/TerminalDemo";
import { NumberCounter } from "../ui/NumberCounter";

export function Engine() {
  return (
    <motion.section
      id="engine"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={stagger()}
    >
      <motion.div className="engine-panel relative overflow-hidden" variants={fadeUp}>
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2>Built with Rust.<br /><span className="font-light">Rendered in React.</span></h2>
        </motion.div>
        
        <p style={{ maxWidth: "600px", fontSize: "18px", opacity: 0.8 }} className="mb-12">
          Dataflow Visualiser strictly separates the sandboxed UI layer from the native systems engine, communicating over a low-latency IPC bridge.
        </p>
        <div className="engine-stats relative z-10">
          <div className="engine-stat">
            <h4><NumberCounter to={50} suffix="x" /></h4>
            <p>Faster parsing via oxc-parser</p>
          </div>
          <div className="engine-stat">
            <h4><NumberCounter to={100} suffix="%" /></h4>
            <p>Local execution & privacy</p>
          </div>
          <div className="engine-stat">
            <h4><NumberCounter to={2} suffix=".0" /></h4>
            <p>Tauri: Explicit boundary scopes</p>
          </div>
        </div>
        
        <div className="mt-16">
          <TerminalDemo />
        </div>
      </motion.div>
    </motion.section>
  );
}
