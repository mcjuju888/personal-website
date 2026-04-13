"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Intro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "#09090b" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        >
          {/* Logo mark */}
          <motion.p
            className="font-mono text-2xl tracking-tight select-none"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{ color: "#fafafa" }}
          >
            jp<span style={{ color: "#818cf8" }}>.</span>
          </motion.p>

          {/* Loading bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-px"
            style={{
              background: "linear-gradient(90deg, #818cf8, #c084fc)",
            }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
