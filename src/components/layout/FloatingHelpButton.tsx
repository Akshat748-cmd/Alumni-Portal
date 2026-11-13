"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingHelpButton() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  useEffect(() => {
    const checkOverlay = () => {
      const openOverlay = document.querySelector(
        '[data-state="open"][data-slot="dialog-content"], [data-state="open"][data-slot="sheet-content"], [data-slot="dialog-overlay"][data-state="open"], [data-slot="sheet-overlay"][data-state="open"]'
      );
      setIsOverlayOpen(openOverlay !== null);
    };

    checkOverlay();
    const observer = new MutationObserver(checkOverlay);
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  if (isOverlayOpen) return null;

  return (
    <div className="fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-30 pb-safe pointer-events-auto">
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        transition={{ duration: 0.15 }}
      >
        <Link
          href="/help-desk"
          className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-navy-950 shadow-xl border border-gold-300/80 hover:shadow-gold-500/30 transition-all select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold-400"
          aria-label="Help Desk Assistance"
          title="Need Help? Visit Help Desk"
        >
          <HelpCircle className="h-5 w-5 text-navy-950" strokeWidth={2.3} />
          <span className="sr-only">Need Help?</span>
        </Link>
      </motion.div>
    </div>
  );
}
