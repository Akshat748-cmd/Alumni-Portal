"use client";

import React from "react";
import Link from "next/link";
import {
  Menu,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  Bell,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AdminHeaderProps {
  currentTabLabel: string;
  totalPending: number;
  onOpenMobileMenu: () => void;
  onOpenResetModal: () => void;
}

export function AdminHeader({
  currentTabLabel,
  totalPending,
  onOpenMobileMenu,
  onOpenResetModal,
}: AdminHeaderProps) {
  return (
    <header className="h-16 border-b border-line bg-card/90 backdrop-blur-md px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <Button
          variant="outline"
          size="icon"
          onClick={onOpenMobileMenu}
          className="lg:hidden h-9 w-9 rounded-xl border-line"
          aria-label="Open navigation menu"
        >
          <Menu className="h-4 w-4 text-ink" />
        </Button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-lg sm:text-xl font-bold text-navy-950 tracking-tight leading-none">
              {currentTabLabel}
            </h1>
            <Badge
              variant="outline"
              className="bg-amber-50 text-amber-900 border-amber-300 text-[10px] font-semibold"
            >
              Admin demo
            </Badge>
          </div>
          <p className="text-[11px] text-muted hidden sm:block mt-0.5">
            Institutional Administration & Governance Suite
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {totalPending > 0 && (
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            <span>{totalPending} Action Items Pending</span>
          </div>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={onOpenResetModal}
          className="h-9 px-3 rounded-xl border-line text-xs font-medium text-ink hover:bg-slate-100 gap-1.5"
        >
          <RotateCcw className="h-3.5 w-3.5 text-muted" />
          <span className="hidden sm:inline">Reset Demo</span>
        </Button>

        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="h-9 px-3.5 rounded-xl bg-navy-900 hover:bg-navy-950 text-white text-xs font-semibold flex items-center gap-1.5 shadow-navy-soft transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          <span>Exit to site</span>
        </Link>
      </div>
    </header>
  );
}

