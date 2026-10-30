"use client";

import { INSTITUTION } from "@/data/institution";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  theme?: "light" | "dark" | "navy";
  className?: string;
  onClick?: () => void;
}

export function Logo({ theme = "navy", className = "", onClick }: LogoProps) {
  const isDarkSurface = theme === "dark" || theme === "navy";

  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("group inline-flex items-center gap-3 select-none", className)}
      aria-label="Poddar Alumni Network Home"
    >
      {/* SVG Crest Monogram */}
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold-500/40 bg-gradient-to-br from-navy-900 to-navy-950 shadow-sm transition-transform duration-300 group-hover:scale-105">
        <span className="font-serif text-xl font-bold tracking-tight text-gold-300">P</span>
        {/* Subtle decorative gold inner corner accent */}
        <div className="absolute top-1 right-1 h-1 w-1 rounded-full bg-gold-400" />
      </div>

      {/* Typography */}
      <div className="flex flex-col leading-tight">
        <span
          className={cn(
            "font-serif text-base sm:text-lg font-bold tracking-tight transition-colors",
            isDarkSurface
              ? "text-ivory group-hover:text-gold-300"
              : "text-navy-950 group-hover:text-gold-600"
          )}
        >
          Poddar Alumni
        </span>
        <span className="text-[10px] uppercase font-semibold tracking-widest text-gold-500/90 font-sans">
          Network{INSTITUTION.foundingYear ? ` • Est. ${INSTITUTION.foundingYear}` : ""}
        </span>
      </div>
    </Link>
  );
}

