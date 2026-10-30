"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type StatusVariant =
  | "approved"
  | "pending"
  | "rejected"
  | "gold"
  | "navy"
  | "neutral"
  | "Open"
  | "In Review"
  | "Resolved";

interface StatusBadgeProps {
  status: StatusVariant | string;
  label?: string;
  size?: "sm" | "md";
  className?: string;
}

export function StatusBadge({
  status,
  label,
  size = "md",
  className = "",
}: StatusBadgeProps) {
  const normalized = status.toLowerCase();

  const getStyles = () => {
    switch (normalized) {
      case "approved":
      case "resolved":
        return {
          bg: "bg-emerald-50 text-emerald-700 border-emerald-300/60",
          dot: "bg-emerald-500",
          text: label || (status === "resolved" ? "Resolved" : "Approved"),
        };
      case "pending":
      case "in review":
        return {
          bg: "bg-amber-50 text-amber-700 border-amber-300/60",
          dot: "bg-amber-500",
          text: label || (status === "in review" ? "In Review" : "Pending Approval"),
        };
      case "rejected":
        return {
          bg: "bg-rose-50 text-rose-700 border-rose-300/60",
          dot: "bg-rose-500",
          text: label || "Rejected",
        };
      case "open":
        return {
          bg: "bg-blue-50 text-blue-700 border-blue-300/60",
          dot: "bg-blue-500",
          text: label || "Open",
        };
      case "navy":
        return {
          bg: "bg-navy-950 text-[#F3DC9C] border-navy-800 font-semibold",
          dot: "bg-gold-400",
          text: label || status,
        };
      case "gold":
        return {
          bg: "bg-gold-500/15 text-gold-700 dark:text-gold-300 border-gold-500/40",
          dot: "bg-gold-500",
          text: label || "Featured",
        };
      case "neutral":
      default:
        return {
          bg: "bg-gray-100 text-gray-700 border-gray-300/60",
          dot: "bg-gray-400",
          text: label || status,
        };
    }
  };

  const config = getStyles();

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium rounded-full border tracking-wide uppercase",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
        config.bg,
        className
      )}
    >
      <span className={cn("rounded-full shrink-0", size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2", config.dot)} />
      {config.text}
    </span>
  );
}

