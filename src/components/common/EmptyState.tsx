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
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-xl border border-dashed border-line bg-card/60 max-w-lg mx-auto",
        className
      )}
    >
      {/* Institutional Empty State SVG Illustration */}
      <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-ivory to-gold-300/20 border border-gold-500/20 shadow-inner">
        <svg
          className="h-12 w-12 text-gold-600"
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

      <h3 className="font-serif text-xl font-bold text-navy-950 mb-2">{title}</h3>
      <p className="text-sm text-muted max-w-md leading-relaxed mb-6">{description}</p>

      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="h-11 px-6 rounded-xl bg-navy-900 hover:bg-navy-800 text-gold-300 font-semibold shadow-sm"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

