"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { CountUp } from "@/components/motion/CountUp";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon?: LucideIcon;
  description?: string;
  featured?: boolean;
  className?: string;
}

export function StatCard({
  label,
  value,
  prefix = "",
  suffix = "",
  icon: Icon,
  description,
  featured = false,
  className = "",
}: StatCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-line bg-card p-2.5 sm:p-4 md:p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm",
        featured ? "border-t-3 border-t-gold-500" : "",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <div>
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.08em] text-muted block mb-0.5 sm:mb-1">
            {label}
          </span>
          <div className="font-sans text-[18px] sm:text-[26px] md:text-[32px] font-semibold text-navy-950 tracking-[-0.01em] tabular-nums leading-tight">
            <CountUp end={value} prefix={prefix} suffix={suffix} />
          </div>
        </div>

        {Icon && (
          <div className="flex h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-lg bg-gold-500/15 text-gold-700 border border-gold-500/30">
            <Icon className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5" strokeWidth={1.75} />
          </div>
        )}
      </div>

      {description && (
        <p className="mt-1.5 sm:mt-2.5 text-[11px] sm:text-[13px] text-muted leading-relaxed border-t border-line/60 pt-1.5 sm:pt-2.5 line-clamp-2">
          {description}
        </p>
      )}
    </div>
  );
}

