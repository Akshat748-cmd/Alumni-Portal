"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export function Preloader() {
  const prefersReducedMotion = useReducedMotion();
  const [showPreloader, setShowPreloader] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Only show on first visit of session
    const hasVisited = sessionStorage.getItem("poddar_preloader_shown");
    if (!hasVisited && !prefersReducedMotion) {
      setShowPreloader(true);

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setShowPreloader(false);
              sessionStorage.setItem("poddar_preloader_shown", "true");
            }, 250);
            return 100;
          }
          return prev + 12;
        });
      }, 100); // reaches 100% in ~1.0s, total max 1.4s

      return () => clearInterval(interval);
    }
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <AnimatePresence>
      {showPreloader && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.65, ease: [0.65, 0, 0.35, 1] }, // Curtain lift
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy-950 text-white select-none"
        >
          {/* Faint luxury background pattern */}
          <div className="absolute inset-0 bg-navy-pattern opacity-30" />

          <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-sm">
            {/* Crest / Monogram */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-gold-500/40 bg-navy-900 shadow-2xl"
            >
              <div className="flex flex-col items-center leading-none">
                <span className="font-serif text-3xl font-bold tracking-wider text-gold-300">P</span>
                <span className="text-[9px] uppercase tracking-widest text-gold-500/80 font-sans mt-0.5">ALUMNI</span>
              </div>
            </motion.div>

            {/* Typography */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="font-serif text-2xl font-bold tracking-tight text-ivory mb-1"
            >
              Poddar Alumni Network
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-xs uppercase tracking-widest text-gold-300/80 mb-8"
            >
              Excellence • Heritage • Community
            </motion.p>

            {/* Gold Progress line */}
            <div className="w-48 h-[2px] bg-navy-800 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            <span className="text-[10px] text-muted-text mt-2 font-mono tracking-wider">{progress}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

