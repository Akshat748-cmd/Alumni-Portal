"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SuccessStateProps {
  title: string;
  message: string;
  referenceId?: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

export function SuccessState({
  title,
  message,
  referenceId,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className = "",
}: SuccessStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-xl border border-line bg-card shadow-navy-soft max-w-lg mx-auto",
        className
      )}
    >
      {/* Success Badge SVG Illustration */}
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 border-2 border-emerald-500/30 shadow-inner">
        <svg
          className="h-10 w-10 text-emerald-600"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2.5" />
          <path
            d="M15 24L21 30L33 18"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h3 className="font-serif text-2xl font-bold text-navy-950 mb-2">{title}</h3>
      <p className="text-sm text-muted max-w-md leading-relaxed mb-4">{message}</p>

      {referenceId && (
        <div className="mb-6 rounded-lg bg-ivory px-3.5 py-1.5 border border-line text-xs font-mono text-navy-900">
          Tracking ID: <span className="font-bold text-gold-600">{referenceId}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        {actionLabel && onAction && (
          <Button
            onClick={onAction}
            className="w-full sm:w-auto h-11 px-6 rounded-xl bg-navy-900 hover:bg-navy-800 text-gold-300 font-semibold shadow-sm"
          >
            {actionLabel}
          </Button>
        )}

        {secondaryActionLabel && onSecondaryAction && (
          <Button
            variant="outline"
            onClick={onSecondaryAction}
            className="w-full sm:w-auto h-11 px-6 rounded-xl border-line text-ink"
          >
            {secondaryActionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

