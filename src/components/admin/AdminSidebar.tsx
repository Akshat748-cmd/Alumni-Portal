"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Award,
  Briefcase,
  GraduationCap,
  HelpCircle,
  Building2,
  HeartHandshake,
  FileText,
  Share2,
  RotateCcw,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface NavItemDef {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
  badgeVariant?: "pending" | "neutral" | "gold";
}

interface AdminSidebarProps {
  currentTab: string;
  onSelectTab: (tabId: string) => void;
  counts: Record<string, number>;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
  onCloseMobile?: () => void;
}

export function AdminSidebar({
  currentTab,
  onSelectTab,
  counts,
  collapsed = false,
  onToggleCollapse,
  className = "",
  onCloseMobile,
}: AdminSidebarProps) {
  const navItems: NavItemDef[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "profiles",
      label: "Alumni Profiles",
      icon: Users,
      count: counts.profiles || 0,
      badgeVariant: "pending",
    },
    {
      id: "achievements",
      label: "Achievements",
      icon: Award,
      count: counts.achievements || 0,
      badgeVariant: "pending",
    },
    {
      id: "opportunities",
      label: "Opportunities",
      icon: Briefcase,
      count: counts.opportunities || 0,
      badgeVariant: "pending",
    },
    {
      id: "mentorship",
      label: "Mentorship",
      icon: GraduationCap,
      count: counts.mentorship || 0,
      badgeVariant: "pending",
    },
    {
      id: "queries",
      label: "Queries / Help Desk",
      icon: HelpCircle,
      count: counts.tickets || 0,
      badgeVariant: "gold",
    },
    {
      id: "businesses",
      label: "Businesses",
      icon: Building2,
      count: counts.businesses || 0,
      badgeVariant: "pending",
    },
    {
      id: "giveback",
      label: "Give Back & Events",
      icon: HeartHandshake,
      count: counts.giveback || 0,
      badgeVariant: "pending",
    },
    {
      id: "content",
      label: "Content Manager",
      icon: FileText,
    },
    {
      id: "social",
      label: "Social Links",
      icon: Share2,
    },
    {
      id: "reset",
      label: "Reset Demo Data",
      icon: RotateCcw,
    },
  ];

  return (
    <aside
      className={cn(
        "flex flex-col bg-navy-950 text-ivory border-r border-navy-800 transition-all duration-300 select-none",
        collapsed ? "w-20" : "w-64",
        className
      )}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-navy-800 shrink-0">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 overflow-hidden transition-all duration-200",
            collapsed && "justify-center w-full"
          )}
          title="Return to Public Portal"
        >
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-950 font-serif font-black text-lg shadow-gold-sm shrink-0">
            P
          </div>
          {!collapsed && (
            <div className="leading-tight truncate">
              <span className="font-serif font-bold text-sm tracking-wide text-ivory block truncate">
                Poddar Secretariat
              </span>
              <span className="text-[10px] tracking-widest uppercase text-gold-400/90 font-medium">
                Admin Panel
              </span>
            </div>
          )}
        </Link>

        {onToggleCollapse && !collapsed && (
          <button
            onClick={onToggleCollapse}
            aria-label="Collapse sidebar"
            className="hidden lg:flex h-7 w-7 items-center justify-center rounded-lg text-ivory/60 hover:text-ivory hover:bg-navy-900 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}

        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            aria-label="Close menu"
            className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg text-ivory hover:text-gold-300 hover:bg-navy-900 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Demo Mode Badge */}
      {!collapsed ? (
        <div className="p-3 mx-3 mt-3 rounded-lg bg-gold-500/10 border border-gold-500/20 text-xs text-gold-300 flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 shrink-0 text-gold-400" />
          <div className="leading-tight text-[11px]">
            <span className="font-semibold text-gold-200 block">Interactive Demo Mode</span>
            Approvals reflect instantly in public routes.
          </div>
        </div>
      ) : (
        <div className="mt-3 flex justify-center" title="Interactive Demo Mode">
          <div className="h-8 w-8 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400">
            <ShieldAlert className="h-4 w-4" />
          </div>
        </div>
      )}

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1 scrollbar-thin">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          const hasCount = (item.count ?? 0) > 0;

          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                if (onCloseMobile) onCloseMobile();
              }}
              title={collapsed ? item.label : undefined}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 text-left relative",
                isActive
                  ? "bg-navy-900 text-gold-300 font-semibold shadow-inner border border-navy-700/60"
                  : "text-ivory/70 hover:bg-navy-900/60 hover:text-ivory",
                collapsed && "justify-center px-0 py-3"
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-gold-400" : "text-ivory/60")} />

              {!collapsed && <span className="truncate flex-1">{item.label}</span>}

              {!collapsed && hasCount && (
                <Badge
                  variant="outline"
                  className={cn(
                    "h-5 px-1.5 text-[10px] font-bold shrink-0 border",
                    item.badgeVariant === "pending"
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                      : "bg-gold-500/20 text-gold-300 border-gold-500/40"
                  )}
                >
                  {item.count}
                </Badge>
              )}

              {collapsed && hasCount && (
                <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-amber-400 ring-2 ring-navy-950" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / Toggle & Exit */}
      <div className="p-3 border-t border-navy-800 shrink-0 space-y-2 bg-navy-950">
        {onToggleCollapse && collapsed && (
          <button
            onClick={onToggleCollapse}
            aria-label="Expand sidebar"
            className="w-full h-8 flex items-center justify-center rounded-lg text-ivory/70 hover:text-ivory hover:bg-navy-900 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}

        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "w-full flex items-center justify-center gap-2 h-9 px-3 rounded-xl bg-navy-900 border border-navy-700/80 text-ivory hover:bg-navy-800 hover:text-gold-300 text-xs font-semibold shadow-xs transition-colors",
            collapsed && "px-0"
          )}
          title="Exit to site"
        >
          <ExternalLink className="h-3.5 w-3.5 text-gold-400 shrink-0" />
          {!collapsed && <span className="truncate">Exit to site</span>}
        </Link>
      </div>
    </aside>
  );
}

