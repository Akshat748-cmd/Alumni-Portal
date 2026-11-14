"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-6 sm:p-8 rounded-xl border border-dashed border-line bg-card/60 max-w-md mx-auto",
        className
      )}
    >
      {/* Institutional Empty State SVG Illustration */}
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-ivory to-gold-300/20 border border-gold-500/20 shadow-xs">
        <svg
          className="h-8 w-8 text-gold-600"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Document / Parchment shape */}
          <rect
            x="14"
            y="10"
            width="36"
            height="44"
            rx="4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#FFFFFF"
          />
          {/* Lines */}
          <line x1="22" y1="20" x2="42" y2="20" stroke="#0B1630" strokeWidth="2" strokeLinecap="round" />
          <line x1="22" y1="28" x2="38" y2="28" stroke="#5B6578" strokeWidth="2" strokeLinecap="round" />
          <line x1="22" y1="36" x2="32" y2="36" stroke="#5B6578" strokeWidth="2" strokeLinecap="round" />
          {/* Compass / Seal Star */}
          <circle cx="44" cy="44" r="10" fill="#0B1630" stroke="#E9C46A" strokeWidth="2" />
          <path
            d="M44 38L45.5 42.5L50 44L45.5 45.5L44 50L42.5 45.5L38 44L42.5 42.5L44 38Z"
            fill="#F3DC9C"
          />
        </svg>
      </div>

      <h3 className="font-sans text-[18px] font-semibold text-navy-950 mb-1.5">{title}</h3>
      <p className="text-[13.5px] text-muted max-w-sm leading-relaxed mb-4">{description}</p>

      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="h-10 px-4 rounded-lg bg-navy-900 hover:bg-navy-800 text-gold-300 font-semibold shadow-xs text-sm"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

