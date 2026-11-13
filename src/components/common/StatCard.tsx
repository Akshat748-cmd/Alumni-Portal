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
        "relative rounded-xl border border-line bg-card p-4 sm:p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm",
        featured ? "border-t-3 border-t-gold-500" : "",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.08em] text-muted block mb-1">
            {label}
          </span>
          <div className="font-serif text-[24px] sm:text-[32px] font-semibold text-navy-950 tracking-[-0.01em] tabular-nums leading-tight">
            <CountUp end={value} prefix={prefix} suffix={suffix} />
          </div>
        </div>

        {Icon && (
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-gold-500/15 text-gold-700 border border-gold-500/30">
            <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" strokeWidth={1.75} />
          </div>
        )}
      </div>

      {description && (
        <p className="mt-2.5 text-[13px] text-muted leading-relaxed border-t border-line/60 pt-2.5">
          {description}
        </p>
      )}
    </div>
  );
}

