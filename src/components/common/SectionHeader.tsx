"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description?: string;
  align?: "center" | "left" | "right";
  theme?: "light" | "navy";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  description,
  align = "center",
  theme = "light",
  className = "",
}: SectionHeaderProps) {
  const displaySubtitle = subtitle || description;
  const isNavy = theme === "navy";

  const alignClasses = {
    center: "text-center items-center mx-auto",
    left: "text-left items-start mr-auto",
    right: "text-right items-end ml-auto",
  }[align];

  const lineAlignClasses = {
    center: "mx-auto",
    left: "mr-auto",
    right: "ml-auto",
  }[align];

  return (
    <div className={cn("flex flex-col mb-5 md:mb-7 max-w-2xl", alignClasses, className)}>
      {eyebrow && (
        <span
          className={cn(
            "text-[11px] sm:text-xs font-semibold uppercase tracking-[0.08em] mb-2 px-2.5 py-0.5 rounded-full border",
            isNavy
              ? "bg-gold-500/10 text-gold-400 border-gold-500/20"
              : "bg-gold-500/15 text-gold-700 border-gold-500/30"
          )}
        >
          {eyebrow}
        </span>
      )}

      <h2
        className={cn(
          "font-serif font-semibold tracking-[-0.01em] text-[22px] md:text-[28px] leading-[1.25] text-balance",
          isNavy ? "text-ivory" : "text-navy-950"
        )}
      >
        {title}
      </h2>

      {/* Signature gold underline */}
      <div
        className={cn(
          "h-0.5 w-10 rounded-full bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 my-2.5",
          lineAlignClasses
        )}
      />

      {displaySubtitle && (
        <p
          className={cn(
            "text-[15px] md:text-[16px] leading-relaxed max-w-[62ch] text-pretty",
            isNavy ? "text-ivory/70" : "text-muted"
          )}
        >
          {displaySubtitle}
        </p>
      )}
    </div>
  );
}

