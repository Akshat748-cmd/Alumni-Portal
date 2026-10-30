"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingHelpButton() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  useEffect(() => {
    const checkOverlay = () => {
      const hasOverlay =
        document.body.getAttribute("data-overlay-open") === "true" ||
        document.querySelector('[role="dialog"]') !== null ||
        document.querySelector('[data-slot="sheet-overlay"]') !== null;
      setIsOverlayOpen(hasOverlay);
    };

    checkOverlay();
    const observer = new MutationObserver(checkOverlay);
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  if (isOverlayOpen) return null;

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-22 sm:right-6 z-30 pb-safe pointer-events-auto">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.15 }}
      >
        <Link
          href="/help-desk"
          className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-navy-950 font-bold text-xs shadow-xl border border-gold-300/80 hover:shadow-gold-500/30 transition-all select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold-400"
          aria-label="Poddar Alumni Help Desk Assistance"
        >
          <HelpCircle className="h-4 w-4 text-navy-950 shrink-0" strokeWidth={2.2} />
          <span className="font-bold tracking-tight text-[11px] sm:text-xs">Need Help?</span>
        </Link>
      </motion.div>
    </div>
  );
}
