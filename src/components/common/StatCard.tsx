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
        "relative rounded-xl border border-line bg-card p-6 shadow-navy-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-navy-hover",
        featured ? "border-t-4 border-t-gold-500" : "",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted block mb-1">
            {label}
          </span>
          <div className="font-serif text-3xl sm:text-4xl font-bold text-navy-950 tracking-tight">
            <CountUp end={value} prefix={prefix} suffix={suffix} />
          </div>
        </div>

        {Icon && (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-500/15 text-gold-600 border border-gold-500/30">
            <Icon className="h-6 w-6" strokeWidth={1.75} />
          </div>
        )}
      </div>

      {description && (
        <p className="mt-3 text-xs text-muted leading-relaxed border-t border-line/60 pt-3">
          {description}
        </p>
      )}
    </div>
  );
}

