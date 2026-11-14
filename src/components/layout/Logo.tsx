"use client";

import Link from "next/link";
import Image from "next/image";
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
      className={cn("group inline-flex items-center gap-2.5 select-none", className)}
      aria-label="Poddar Alumni Network Home"
    >
      {/* Official Poddar Institution Crest Logo */}
      <div className="relative flex h-9 w-9 sm:h-9.5 sm:w-9.5 shrink-0 items-center justify-center rounded-xl border border-gold-400/40 bg-gradient-to-br from-navy-900/90 to-navy-950/90 p-1 shadow-xs transition-transform duration-200 group-hover:scale-105">
        <Image
          src="/images/poddar-emblem.png"
          alt="Poddar Group of Institutions Logo"
          width={36}
          height={36}
          priority
          className="h-full w-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
        />
      </div>

      {/* Typography */}
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "font-sans text-[15.5px] sm:text-[17.5px] font-bold tracking-[-0.01em] transition-colors leading-tight",
            isDarkSurface
              ? "text-ivory group-hover:text-gold-300"
              : "text-navy-950 group-hover:text-gold-600"
          )}
        >
          Poddar Alumni
        </span>
        <span className="text-[10px] sm:text-[10.5px] uppercase font-bold tracking-[0.12em] text-[#D5B568] font-sans mt-0.5">
          NETWORK
        </span>
      </div>
    </Link>
  );
}

