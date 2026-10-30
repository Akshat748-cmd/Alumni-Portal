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
    center: "text-center items-center",
    left: "text-left items-start",
    right: "text-right items-end",
  }[align];

  const lineAlignClasses = {
    center: "mx-auto",
    left: "mr-auto",
    right: "ml-auto",
  }[align];

  return (
    <div className={cn("flex flex-col mb-8 md:mb-12 max-w-3xl", alignClasses, className)}>
      {eyebrow && (
        <span
          className={cn(
            "text-xs font-bold uppercase tracking-widest mb-2.5 px-3 py-1 rounded-full border",
            isNavy
              ? "bg-gold-500/10 text-gold-400 border-gold-500/20"
              : "bg-gold-500/15 text-gold-600 border-gold-500/30"
          )}
        >
          {eyebrow}
        </span>
      )}

      <h2
        className={cn(
          "font-serif font-bold tracking-tight text-balance",
          isNavy ? "text-ivory" : "text-navy-950"
        )}
      >
        {title}
      </h2>

      {/* Signature gold underline */}
      <div
        className={cn(
          "h-1 w-12 rounded-full bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 my-3.5",
          lineAlignClasses
        )}
      />

      {displaySubtitle && (
        <p
          className={cn(
            "text-base md:text-lg leading-relaxed text-pretty",
            isNavy ? "text-ivory/70" : "text-muted"
          )}
        >
          {displaySubtitle}
        </p>
      )}
    </div>
  );
}

