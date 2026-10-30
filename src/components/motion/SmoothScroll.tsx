"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Never run Lenis on /admin routes or when reduced motion is requested
    if (pathname.startsWith("/admin")) return;

    // Only enable on desktop pointer: fine devices, never mobile
    const mediaQuery = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!mediaQuery.matches) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    // Make lenis globally accessible for overlay lock/unlock if needed
    (window as any).__lenis__ = lenis;

    // Stop Lenis when an overlay is open, resume when closed
    const observer = new MutationObserver(() => {
      const isOverlayOpen =
        document.body.getAttribute("data-overlay-open") === "true" ||
        document.querySelector('[role="dialog"]') !== null ||
        document.querySelector('[data-slot="sheet-overlay"]') !== null;

      if (isOverlayOpen) {
        lenis.stop();
      } else {
        lenis.start();
      }
    });

    observer.observe(document.body, { attributes: true, childList: true, subtree: true });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
      lenis.destroy();
      delete (window as any).__lenis__;
    };
  }, [pathname]);

  return <>{children}</>;
}

