"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Reset scroll to top on every route change
  useEffect(() => {
    if (typeof window !== "undefined") {
      const lenis = (window as any).__lenis__;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    // Never run Lenis on /admin or /messages routes or when reduced motion is requested
    if (pathname.startsWith("/admin") || pathname.startsWith("/messages")) {
      if ((window as any).__lenis__) {
        (window as any).__lenis__.destroy();
        delete (window as any).__lenis__;
      }
      window.scrollTo(0, 0);
      return;
    }

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

    (window as any).__lenis__ = lenis;

    let animId: number;
    function raf(time: number) {
      lenis.raf(time);
      animId = requestAnimationFrame(raf);
    }

    animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
      delete (window as any).__lenis__;
    };
  }, [pathname]);

  return <>{children}</>;
}
