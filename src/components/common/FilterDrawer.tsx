"use client";

import React, { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface FilterDrawerProps {
  title?: string;
  activeFilterCount?: number;
  children: React.ReactNode;
  onApply?: () => void;
  onReset?: () => void;
  desktopLayout?: "sidebar" | "inline";
  className?: string;
}

export function FilterDrawer({
  title = "Filter & Refine",
  activeFilterCount = 0,
  children,
  onApply,
  onReset,
  desktopLayout = "inline",
  className = "",
}: FilterDrawerProps) {
  const [open, setOpen] = useState(false);

  const handleApply = () => {
    if (onApply) onApply();
    setOpen(false);
  };

  const handleReset = () => {
    if (onReset) onReset();
  };

  return (
    <div className={cn("w-full", className)}>
      {/* MOBILE TRIGGER BUTTON (< md) */}
      <div className="md:hidden flex items-center justify-between gap-3">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="flex-1 h-12 inline-flex items-center justify-between border border-line bg-card hover:bg-gold-500/10 text-navy-950 font-medium px-4 text-sm rounded-xl shadow-sm transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-gold-600" strokeWidth={1.75} />
              {title}
            </span>
            {activeFilterCount > 0 && (
              <Badge className="bg-navy-900 text-gold-300 hover:bg-navy-900 font-semibold h-6 px-2 rounded-full border-0">
                {activeFilterCount} Active
              </Badge>
            )}
          </SheetTrigger>

          <SheetContent
            side="bottom"
            className="rounded-t-2xl max-h-[85vh] overflow-y-auto p-5 bg-card border-line"
          >
            <SheetHeader className="pb-4 border-b border-line flex flex-row items-center justify-between text-left space-y-0">
              <SheetTitle className="font-serif text-lg font-bold text-navy-950 flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-gold-600" strokeWidth={1.75} />
                {title}
              </SheetTitle>
              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="text-xs text-muted hover:text-danger h-8 px-2"
                >
                  Clear all
                </Button>
              )}
            </SheetHeader>

            <div className="py-5 space-y-4">{children}</div>

            <SheetFooter className="pt-4 border-t border-line flex gap-3">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                className="flex-1 h-12 rounded-xl border-line text-muted"
              >
                Cancel
              </Button>
              <Button
                onClick={handleApply}
                className="flex-1 h-12 rounded-xl bg-navy-900 hover:bg-navy-800 text-gold-300 font-semibold"
              >
                Apply Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ""}
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* DESKTOP LAYOUT (md and up) */}
      <div
        className={cn(
          "hidden md:block",
          desktopLayout === "sidebar"
            ? "rounded-xl border border-line bg-card p-5 shadow-navy-soft"
            : "rounded-xl border border-line bg-card p-4 shadow-navy-soft"
        )}
      >
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-line">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-gold-600" strokeWidth={1.75} />
            <span className="font-semibold text-navy-950 text-sm">{title}</span>
            {activeFilterCount > 0 && (
              <Badge className="bg-gold-500/20 text-gold-700 hover:bg-gold-500/20 text-xs px-2 rounded-full border-0">
                {activeFilterCount}
              </Badge>
            )}
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={handleReset}
              className="text-xs text-muted hover:text-danger flex items-center gap-1 font-medium transition-colors"
            >
              <X className="h-3 w-3" />
              Reset
            </button>
          )}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
