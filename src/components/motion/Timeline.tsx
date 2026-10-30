"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";

export interface TimelineItem {
  yearOrDate: string;
  title: string;
  subtitle?: string;
  description: string;
  badge?: string;
}

export function Timeline({
  items,
  className = "",
}: {
  items: TimelineItem[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 60%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className={`relative max-w-3xl mx-auto py-8 ${className}`}>
      {/* Background static line */}
      <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-line" />

      {/* Animated scroll-drawn line */}
      {!prefersReducedMotion && (
        <motion.div
          style={{ scaleY }}
          className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-gradient-to-b from-gold-500 via-gold-600 to-navy-800 origin-top"
        />
      )}

      {/* Timeline items */}
      <div className="space-y-12">
        {items.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row items-start ${
                isEven ? "md:flex-row-reverse" : ""
              } group`}
            >
              {/* Center node dot */}
              <div className="absolute left-4 md:left-1/2 top-1.5 -translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-gold-500 bg-navy-950 text-gold-300 shadow-md z-10">
                <div className="h-2 w-2 rounded-full bg-gold-400 group-hover:scale-125 transition-transform" />
              </div>

              {/* Content card */}
              <div
                className={`ml-12 md:ml-0 md:w-1/2 ${
                  isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                }`}
              >
                <div className="rounded-xl border border-line bg-card p-5 shadow-navy-soft transition-all hover:-translate-y-1 hover:shadow-navy-hover">
                  <div className={`flex items-center gap-2 mb-2 flex-wrap ${isEven ? "md:justify-end" : ""}`}>
                    <span className="font-serif text-lg font-bold text-navy-950">{item.yearOrDate}</span>
                    {item.badge && (
                      <span className="rounded-full bg-gold-500/15 px-2.5 py-0.5 text-xs font-semibold text-gold-600">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="text-base font-semibold text-navy-900 mb-1">{item.title}</h4>
                  {item.subtitle && <p className="text-xs font-medium text-muted mb-2">{item.subtitle}</p>}
                  <p className="text-sm text-ink/80 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

