"use client";

import React from "react";
import Link from "next/link";
import { Menu, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AdminHeaderProps {
  currentTabLabel: string;
  totalPending: number;
  onOpenMobileMenu: () => void;
  onOpenResetModal?: () => void;
}

const SHORT_TITLES: Record<string, string> = {
  "Give Back & Gathering Bookings": "Give Back & Events",
  "Alumni Profiles Moderation": "Profiles",
  "Achievements & Spotlight": "Achievements",
  "Career Opportunities & Jobs": "Opportunities",
  "Mentorship Programme Desk": "Mentorship",
  "Help Desk Support Inquiries": "Help Desk",
  "Alumni Business Directory": "Businesses",
  "Institutional Content Manager": "Content",
  "Social Media Handles": "Social Channels",
  "Secretariat Prototype Settings": "Settings",
  "Secretariat Dashboard": "Dashboard",
};

export function AdminHeader({
  currentTabLabel,
  totalPending,
  onOpenMobileMenu,
}: AdminHeaderProps) {
  const shortTitle = SHORT_TITLES[currentTabLabel] || currentTabLabel;

  return (
    <header className="h-14 border-b border-line bg-card/95 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4 sticky top-0 z-30 shadow-xs w-full overflow-hidden">
      {/* Left: Mobile menu button + Truncated Title */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
        {/* Mobile menu trigger */}
        <Button
          variant="outline"
          size="icon"
          onClick={onOpenMobileMenu}
          className="lg:hidden h-9 w-9 shrink-0 rounded-xl border-line"
          aria-label="Open navigation menu"
        >
          <Menu className="h-4 w-4 text-ink" />
        </Button>

        {/* Title: 1 line with ellipsis truncation, font size 16px on mobile */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <h1 className="font-serif text-base sm:text-lg font-bold text-navy-950 tracking-tight truncate leading-none">
            <span className="sm:hidden truncate">{shortTitle}</span>
            <span className="hidden sm:inline truncate">{currentTabLabel}</span>
          </h1>

          <Badge
            variant="outline"
            className="hidden md:inline-flex shrink-0 bg-amber-50 text-amber-900 border-amber-300 text-[10px] font-semibold py-0 h-4"
          >
            Admin demo
          </Badge>
        </div>
      </div>

      {/* Right: Exit to site button (Icon only on < 640px, never wraps) */}
      <div className="flex items-center gap-2 shrink-0">
        {totalPending > 0 && (
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-semibold shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>{totalPending} Pending</span>
          </div>
        )}

        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="h-9 px-2.5 sm:px-3.5 rounded-xl bg-navy-900 hover:bg-navy-950 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap shadow-navy-soft transition-colors"
          aria-label="Exit to site"
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
          <span className="hidden sm:inline">Exit to site</span>
        </Link>
      </div>
    </header>
  );
}
