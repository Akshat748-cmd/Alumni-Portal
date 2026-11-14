"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  LogIn,
  LogOut,
  User,
  ShieldAlert,
  MoreHorizontal,
  MessageSquare,
  LayoutDashboard,
  RefreshCw,
  Briefcase,
  Bell,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import { MAIN_NAVIGATION, NavItem } from "@/data/nav";
import { usePortalStore } from "@/store/portal";
import { Logo } from "@/components/layout/Logo";
import { AvatarInitials } from "@/components/common/AvatarInitials";
import { NotificationsPopover } from "@/components/common/NotificationsPopover";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout, login, conversations, notifications, switchDemoUser } = usePortalStore();

  const unreadMessagesCount = useMemo(() => {
    if (!currentUser) return 0;
    return (conversations || []).reduce((acc, c) => acc + (c.unreadCount?.[currentUser.id] || 0), 0);
  }, [conversations, currentUser]);

  const unreadNotifsCount = useMemo(() => {
    if (!currentUser) return 0;
    return (notifications || []).filter((n) => (n.userId === currentUser.id || n.userId === "all") && !n.read).length;
  }, [notifications, currentUser]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(1440);

  const headerRef = useRef<HTMLElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Resize handler for responsive nav calculation & closing mobile menu on >= 1024px
  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      if (width >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll detection for header morph (transparent -> solid navy after 80px)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Navigation Items (Help Desk excluded from header; accessed via footer & floating assistance)
  const regularNavItems = useMemo(
    () => MAIN_NAVIGATION.filter((item) => item.id !== "help-desk"),
    []
  );

  // Dynamically calculate visible vs overflow items for desktop navigation
  // Prevents overflow on ANY laptop resolution (1024px, 1280px, 1366px, 1440px, 1536px, 1920px)
  const visibleCount = useMemo(() => {
    if (!mounted) return 4; // Safe SSR default

    // Real mathematical space thresholds:
    // Available nav width = windowWidth - (Logo ~195px + Right actions ~190px + Padding ~48px + Gaps ~24px) = windowWidth - 457px.
    // Each nav item needs ~110-160px.
    if (windowWidth >= 1650) return 8; // All 8 items fit comfortably without "More"
    if (windowWidth >= 1500) return 6; // 6 items + More
    if (windowWidth >= 1340) return 5; // 5 items + More
    if (windowWidth >= 1180) return 4; // 4 items + More (fits 1280px & 1366px laptops with zero overflow!)
    return 3; // 3 items + More (safely fits 1024px-1179px viewports)
  }, [mounted, windowWidth]);

  const visibleNavItems = useMemo(
    () => regularNavItems.slice(0, visibleCount),
    [regularNavItems, visibleCount]
  );
  const overflowNavItems = useMemo(
    () => regularNavItems.slice(visibleCount),
    [regularNavItems, visibleCount]
  );

  const handleLogout = useCallback(() => {
    logout();
    toast.info("Logged out successfully.");
  }, [logout]);

  const isHome = pathname === "/";
  const hasSolidBackground = isScrolled || !isHome;

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 h-14 lg:h-16 flex items-center",
        hasSolidBackground
          ? "bg-navy-950/95 backdrop-blur-md border-b border-navy-800 shadow-sm"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="w-full max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between gap-2 lg:gap-3 xl:gap-5 w-full">
          {/* 1. BRAND LOGO (Protected left column, will never be overlapped) */}
          <div className="shrink-0 z-20 flex items-center pr-1 sm:pr-2">
            <Logo theme="navy" />
          </div>

          {/* 2. DESKTOP NAVIGATION (Visible ONLY at >= 1024px via lg:flex) */}
          <nav
            ref={navContainerRef}
            className="hidden lg:flex items-center gap-0.5 xl:gap-1 2xl:gap-1.5 flex-1 justify-start min-w-0 overflow-hidden"
            aria-label="Main Navigation"
          >
            {visibleNavItems.map((item) => {
              const isOpen = activeDropdown === item.id;
              const isActive = pathname.startsWith(item.href);

              return (
                <div
                  key={item.id}
                  className="relative shrink-0"
                  onMouseEnter={() => setActiveDropdown(item.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    onClick={() => setActiveDropdown(null)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
                        e.preventDefault();
                        setActiveDropdown(isOpen ? null : item.id);
                      }
                    }}
                    className={cn(
                      "flex items-center gap-1 px-1.5 xl:px-2 2xl:px-2.5 py-1.5 rounded-lg text-[12.5px] xl:text-[13.5px] font-semibold tracking-normal transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-gold-400/50",
                      isActive
                        ? "text-gold-400 font-bold"
                        : "text-ivory/85 hover:text-gold-300 hover:bg-navy-900/60"
                    )}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                  >
                    <span>{item.title}</span>
                    <ChevronDown
                      className={cn(
                        "h-3 w-3 text-gold-500/70 transition-transform duration-200 shrink-0",
                        isOpen ? "rotate-180 text-gold-400" : ""
                      )}
                      strokeWidth={2}
                    />
                  </Link>

                  {/* Mega Dropdown Panel */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.98 }}
                        transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-0 top-full pt-1.5 w-72 sm:w-80 max-w-[calc(100vw-32px)] z-50 pointer-events-auto"
                        data-lenis-prevent
                      >
                        <div className="rounded-xl border border-navy-700 bg-navy-900/95 p-3 shadow-2xl backdrop-blur-xl max-h-[calc(100vh-80px)] overflow-y-auto overscroll-contain">
                          <div className="px-3 py-1.5 border-b border-navy-800 mb-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-gold-400 block">
                              {item.title}
                            </span>
                            <p className="text-[11px] text-ivory/60 leading-tight mt-0.5 line-clamp-1">
                              {item.description}
                            </p>
                          </div>

                          <div className="space-y-0.5">
                            {item.items.map((sub) => {
                              const isSubActive = pathname === sub.href;
                              return (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={() => setActiveDropdown(null)}
                                  className={cn(
                                    "flex flex-col p-2 rounded-lg transition-all group/sub",
                                    isSubActive
                                      ? "bg-gold-500/15 border border-gold-500/30"
                                      : "hover:bg-navy-800/80"
                                  )}
                                >
                                  <span
                                    className={cn(
                                      "text-xs font-semibold group-hover/sub:text-gold-300 transition-colors",
                                      isSubActive ? "text-gold-300 font-bold" : "text-ivory"
                                    )}
                                  >
                                    {sub.title}
                                  </span>
                                  {sub.description && (
                                    <span className="text-[10px] text-ivory/60 line-clamp-1 mt-0.5">
                                      {sub.description}
                                    </span>
                                  )}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* "MORE" DROPDOWN: Rendered when categories overflow */}
            {overflowNavItems.length > 0 && (
              <div
                className="relative shrink-0"
                onMouseEnter={() => setActiveDropdown("overflow-more")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "overflow-more" ? null : "overflow-more")
                  }
                  className={cn(
                    "flex items-center gap-1 px-2 py-1.5 rounded-lg text-[12.5px] xl:text-[13px] font-semibold tracking-normal transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-gold-400/50 cursor-pointer",
                    activeDropdown === "overflow-more"
                      ? "text-gold-400 font-bold bg-navy-900/80"
                      : "text-ivory/85 hover:text-gold-300 hover:bg-navy-900/60"
                  )}
                  aria-expanded={activeDropdown === "overflow-more"}
                  aria-label="More navigation categories"
                >
                  <MoreHorizontal className="h-4 w-4 text-gold-400" />
                  <span>More</span>
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 text-gold-500/70 transition-transform duration-200",
                      activeDropdown === "overflow-more" ? "rotate-180 text-gold-400" : ""
                    )}
                  />
                </button>

                <AnimatePresence>
                  {activeDropdown === "overflow-more" && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.98 }}
                      transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute right-0 top-full pt-1.5 w-80 max-w-[calc(100vw-32px)] z-50 pointer-events-auto"
                      data-lenis-prevent
                    >
                      <div className="rounded-xl border border-navy-700 bg-navy-900/95 p-3 shadow-2xl backdrop-blur-xl max-h-[calc(100vh-80px)] overflow-y-auto overscroll-contain space-y-3">
                        {overflowNavItems.map((item) => (
                          <div key={item.id} className="space-y-1 pb-2 border-b border-navy-800 last:border-b-0 last:pb-0">
                            <Link
                              href={item.href}
                              onClick={() => setActiveDropdown(null)}
                              className="text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300 block px-2 py-1"
                            >
                              {item.title} →
                            </Link>
                            <div className="space-y-0.5">
                              {item.items.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={() => setActiveDropdown(null)}
                                  className="block px-2 py-1.5 rounded-lg text-xs font-medium text-ivory/80 hover:text-gold-300 hover:bg-navy-800/80 transition-colors"
                                >
                                  {sub.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </nav>

          {/* 3. DESKTOP RIGHT ACTIONS (Login / Logout + Opportunities Network Controls) */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 shrink-0 z-20">
            {/* Logged in state */}
            {currentUser ? (
              <div className="flex items-center gap-1.5 xl:gap-2">
                {/* Messages Icon Button */}
                <Link
                  href="/messages"
                  scroll={false}
                  className="relative flex items-center justify-center h-9 w-9 rounded-lg bg-navy-900 border border-navy-700/80 text-ivory/80 hover:text-gold-300 hover:bg-navy-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400/50"
                  aria-label={`Messages (${unreadMessagesCount} unread)`}
                  title="Direct Messages"
                >
                  <MessageSquare className="h-4 w-4 text-gold-400" />
                  {unreadMessagesCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-gold-500 px-1 text-[10px] font-bold text-navy-950 shadow-xs animate-pulse">
                      {unreadMessagesCount > 9 ? "9+" : unreadMessagesCount}
                    </span>
                  )}
                </Link>

                {/* Notifications Popover */}
                <NotificationsPopover />

                {/* User Dropdown: Always clean circular avatar with chevron (never pops full name at 80% zoom) */}
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="flex items-center gap-1.5 p-1 pl-1 pr-1.5 rounded-full bg-navy-900/60 border border-navy-800 hover:bg-navy-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500/40 cursor-pointer"
                    aria-label={`User account menu for ${currentUser.name}`}
                  >
                    <AvatarInitials name={currentUser.name} src={currentUser.avatarUrl} size="sm" />
                    <ChevronDown className="h-3 w-3 text-ivory/60" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="w-72 sm:w-80 bg-navy-950/98 backdrop-blur-md border border-navy-700/80 text-ivory p-2.5 rounded-2xl shadow-2xl z-50 divide-y divide-navy-800/80"
                  >
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="font-normal px-2.5 py-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-bold text-ivory tracking-tight">{currentUser.name}</span>
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                              currentUser.role === "student"
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : "bg-gold-500/20 text-gold-300 border border-gold-500/30"
                            )}
                          >
                            {currentUser.role === "student" ? "Student" : "Alumnus"}
                          </span>
                        </div>
                        <div className="text-[12px] text-ivory/70 truncate mt-0.5">{currentUser.email}</div>
                        {currentUser.course && (
                          <div className="text-[11px] text-gold-400/90 mt-1 truncate font-medium">
                            {currentUser.course} {currentUser.batch ? `• 'Class of ${currentUser.batch}` : ""}
                          </div>
                        )}
                      </DropdownMenuLabel>
                    </DropdownMenuGroup>

                    <div className="py-1.5 space-y-0.5">
                      <DropdownMenuItem
                        onClick={() => router.push("/dashboard")}
                        className="group focus:bg-navy-800/90 focus:text-gold-300 data-highlighted:bg-navy-800/90 data-highlighted:text-gold-300 cursor-pointer rounded-xl text-xs flex items-center gap-2.5 px-2.5 py-2 text-ivory/90 transition-colors"
                      >
                        <LayoutDashboard className="h-4 w-4 text-gold-400 group-hover:text-gold-300 shrink-0" />
                        <span className="font-medium">Opportunities Dashboard</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => router.push("/dashboard/applications")}
                        className="group focus:bg-navy-800/90 focus:text-gold-300 data-highlighted:bg-navy-800/90 data-highlighted:text-gold-300 cursor-pointer rounded-xl text-xs flex items-center gap-2.5 px-2.5 py-2 text-ivory/90 transition-colors"
                      >
                        <Briefcase className="h-4 w-4 text-gold-400 group-hover:text-gold-300 shrink-0" />
                        <span className="font-medium">My Applications</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => router.push("/messages")}
                        className="group focus:bg-navy-800/90 focus:text-gold-300 data-highlighted:bg-navy-800/90 data-highlighted:text-gold-300 cursor-pointer rounded-xl text-xs flex items-center gap-2.5 px-2.5 py-2 text-ivory/90 transition-colors"
                      >
                        <MessageSquare className="h-4 w-4 text-gold-400 group-hover:text-gold-300 shrink-0" />
                        <span className="font-medium">Direct Messages</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => router.push("/join/profile")}
                        className="group focus:bg-navy-800/90 focus:text-gold-300 data-highlighted:bg-navy-800/90 data-highlighted:text-gold-300 cursor-pointer rounded-xl text-xs flex items-center gap-2.5 px-2.5 py-2 text-ivory/90 transition-colors"
                      >
                        <User className="h-4 w-4 text-gold-400 group-hover:text-gold-300 shrink-0" />
                        <span className="font-medium">My Profile & Skills</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => router.push("/admin")}
                        className="group focus:bg-navy-800/90 focus:text-gold-300 data-highlighted:bg-navy-800/90 data-highlighted:text-gold-300 cursor-pointer rounded-xl text-xs flex items-center gap-2.5 px-2.5 py-2 text-ivory/90 transition-colors"
                      >
                        <ShieldAlert className="h-4 w-4 text-gold-400 group-hover:text-gold-300 shrink-0" />
                        <span className="font-medium">Admin Moderation Panel</span>
                      </DropdownMenuItem>
                    </div>

                    {/* Dedicated Demo Role Switch Section with Enhanced Contrast */}
                    <div className="pt-2 pb-1 px-2.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-2">
                        Switch Demo Role
                      </div>

                      <div className="space-y-1">
                        <DropdownMenuItem
                          onClick={() => {
                            switchDemoUser("alumnus");
                            toast.success("Switched to Alumnus demo account (Vikramaditya Rathore)");
                          }}
                          className={cn(
                            "cursor-pointer rounded-xl p-2 text-xs flex items-center justify-between border transition-all",
                            currentUser.role !== "student"
                              ? "bg-gold-500/15 border-gold-500/40 text-gold-200 focus:bg-gold-500/20 data-highlighted:bg-gold-500/20"
                              : "bg-navy-900/60 border-navy-800 text-ivory/80 hover:bg-navy-800 hover:text-ivory focus:bg-navy-800 focus:text-ivory data-highlighted:bg-navy-800 data-highlighted:text-ivory"
                          )}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <RefreshCw className={cn("h-3.5 w-3.5 shrink-0", currentUser.role !== "student" ? "text-gold-400" : "text-ivory/50")} />
                            <div className="min-w-0">
                              <div className="font-semibold text-ivory text-xs leading-snug">Alumnus</div>
                              <div className="text-[10px] text-ivory/60 leading-snug">Employer / Referrer</div>
                            </div>
                          </div>
                          {currentUser.role !== "student" && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold-500/25 text-gold-300 border border-gold-500/40 shrink-0 ml-2">
                              Active
                            </span>
                          )}
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => {
                            switchDemoUser("student");
                            toast.success("Switched to Student demo account (Aarav Mehta)");
                          }}
                          className={cn(
                            "cursor-pointer rounded-xl p-2 text-xs flex items-center justify-between border transition-all",
                            currentUser.role === "student"
                              ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-200 focus:bg-emerald-500/20 data-highlighted:bg-emerald-500/20"
                              : "bg-navy-900/60 border-navy-800 text-ivory/80 hover:bg-navy-800 hover:text-ivory focus:bg-navy-800 focus:text-ivory data-highlighted:bg-navy-800 data-highlighted:text-ivory"
                          )}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <RefreshCw className={cn("h-3.5 w-3.5 shrink-0", currentUser.role === "student" ? "text-emerald-400" : "text-ivory/50")} />
                            <div className="min-w-0">
                              <div className="font-semibold text-ivory text-xs leading-snug">Student</div>
                              <div className="text-[10px] text-ivory/60 leading-snug">Applicant / Mentee</div>
                            </div>
                          </div>
                          {currentUser.role === "student" && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 shrink-0 ml-2">
                              Active
                            </span>
                          )}
                        </DropdownMenuItem>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Visible Logout Button (Clean, consistent icon button across all zoom levels) */}
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center h-9 w-9 rounded-xl bg-navy-900 border border-navy-700/80 text-rose-300 hover:text-white hover:bg-rose-950/60 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500/50 cursor-pointer"
                  aria-label="Sign out"
                  title="Logout"
                >
                  <LogOut className="h-3.5 w-3.5 text-rose-400" />
                </button>
              </div>
            ) : (
              /* Logged out state */
              <Link
                href="/join/auth?tab=login"
                className="flex items-center gap-1.5 h-9 px-3.5 rounded-xl border border-gold-500/80 text-gold-300 hover:bg-gold-500/15 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-gold-400"
                aria-label="Login to account"
              >
                <LogIn className="h-3.5 w-3.5 text-gold-400" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* 4. MOBILE / TABLET CONTROLS (Visible ONLY at < 1024px via lg:hidden) */}
          <div className="flex lg:hidden items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Mobile Auth Button (Login or Logout) */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-navy-950/60 border border-gold-400/50 text-gold-300 hover:text-white hover:border-gold-300 active:scale-95 transition-all shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold-400/50"
                  aria-label="Logout"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" strokeWidth={1.75} />
                </button>
              </div>
            ) : (
              <Link
                href="/join/auth?tab=login"
                className="flex items-center justify-center h-10 w-10 rounded-full bg-navy-950/60 border border-gold-400/50 text-gold-300 hover:text-white hover:border-gold-300 active:scale-95 transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-gold-400/50"
                aria-label="Login"
                title="Login"
              >
                <LogIn className="h-5 w-5" strokeWidth={1.75} />
              </Link>
            )}

            {/* Mobile Hamburger Button with Unread Dot */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="relative flex items-center justify-center h-10 w-10 rounded-full bg-navy-950/60 border border-gold-400/50 text-gold-300 hover:border-gold-300 active:scale-95 transition-all shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold-400/50"
                aria-label="Open Navigation Menu"
              >
                <Menu className="h-5 w-5" strokeWidth={1.75} />
                {(unreadMessagesCount > 0 || unreadNotifsCount > 0) && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-gold-400 border border-navy-950 animate-pulse" />
                )}
              </button>

              <SheetContent
                side="right"
                showCloseButton={false}
                className="w-full sm:max-w-md bg-navy-950 text-ivory border-l border-navy-800 p-0 flex flex-col h-[100dvh] overflow-hidden z-50"
              >
                {/* Fixed Top Bar (Logo + Exactly ONE Close Button) */}
                <div className="h-16 px-5 border-b border-navy-800 flex items-center justify-between shrink-0">
                  <Logo theme="navy" onClick={() => setMobileMenuOpen(false)} />
                  <SheetClose
                    className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-navy-900 border border-navy-800 text-ivory hover:text-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" strokeWidth={2} />
                  </SheetClose>
                </div>

                {/* Middle Region: Scrollable navigation with data-lenis-prevent */}
                <div
                  className="flex-1 min-h-0 overflow-y-auto overscroll-contain py-4 px-4 space-y-3 scrollbar-thin"
                  data-lenis-prevent
                >
                  {/* Opportunities Network Mobile Header Section */}
                  {currentUser ? (
                    <div className="space-y-2 mb-4 p-3 rounded-2xl bg-navy-900 border border-navy-800">
                      {/* User Profile Summary */}
                      <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-navy-800/80">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <AvatarInitials name={currentUser.name} src={currentUser.avatarUrl} size="sm" />
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-ivory block truncate">{currentUser.name}</span>
                            <span className="text-[10px] text-ivory/60 block truncate">{currentUser.email}</span>
                          </div>
                        </div>
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0",
                            currentUser.role === "student"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : "bg-gold-500/20 text-gold-300 border border-gold-500/30"
                          )}
                        >
                          {currentUser.role === "student" ? "Student" : "Alumnus"}
                        </span>
                      </div>

                      {/* Prominent Quick Access Rows for Messages and Notifications */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <Link
                          href="/messages"
                          scroll={false}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-navy-950 border border-navy-800 text-ivory hover:text-gold-300 text-xs font-semibold"
                        >
                          <span className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-gold-400" />
                            <span>Messages</span>
                          </span>
                          {unreadMessagesCount > 0 && (
                            <span className="bg-gold-500 text-navy-950 font-bold px-1.5 py-0.2 rounded-full text-[10px]">
                              {unreadMessagesCount}
                            </span>
                          )}
                        </Link>

                        <Link
                          href="/dashboard"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-navy-950 border border-navy-800 text-ivory hover:text-gold-300 text-xs font-semibold"
                        >
                          <span className="flex items-center gap-2">
                            <Bell className="h-4 w-4 text-gold-400" />
                            <span>Alerts</span>
                          </span>
                          {unreadNotifsCount > 0 && (
                            <span className="bg-gold-500 text-navy-950 font-bold px-1.5 py-0.2 rounded-full text-[10px]">
                              {unreadNotifsCount}
                            </span>
                          )}
                        </Link>
                      </div>

                      {/* Dashboard Link */}
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between w-full p-2.5 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-300 hover:bg-gold-500/20 text-xs font-bold transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <LayoutDashboard className="h-4 w-4 text-gold-400" />
                          <span>Opportunities Dashboard</span>
                        </span>
                        <span className="text-[10px] bg-gold-500 text-navy-950 px-1.5 py-0.2 rounded font-bold">
                          NEW
                        </span>
                      </Link>

                      {/* Quick Role Switcher */}
                      <div className="pt-2 border-t border-navy-800/80 flex items-center justify-between text-[11px]">
                        <span className="text-ivory/60">Demo account:</span>
                        <button
                          type="button"
                          onClick={() => {
                            const targetRole = currentUser.role === "student" ? "alumnus" : "student";
                            switchDemoUser(targetRole);
                            toast.success(`Switched role to ${targetRole === "student" ? "Student (Aarav)" : "Alumnus (Vikramaditya)"}`);
                          }}
                          className="inline-flex items-center gap-1.5 text-gold-400 hover:text-gold-300 font-semibold cursor-pointer"
                        >
                          <RefreshCw className="h-3 w-3" />
                          <span>Switch to {currentUser.role === "student" ? "Alumnus" : "Student"}</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-4 p-3 rounded-2xl bg-navy-900 border border-navy-800 text-center">
                      <p className="text-xs text-ivory/80 mb-2">Join the Opportunities Network</p>
                      <Link
                        href="/join/auth?tab=login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="inline-flex items-center justify-center gap-2 w-full h-10 px-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs shadow-md transition-all"
                      >
                        <LogIn className="h-4 w-4" />
                        <span>Sign In / Register</span>
                      </Link>
                    </div>
                  )}

                  {/* Navigation Accordion for Mobile */}
                  <div className="space-y-1">
                    {MAIN_NAVIGATION.map((item) => {
                      const isExpanded = expandedMobileMenu === item.id;
                      const hasSubitems = item.items && item.items.length > 0;

                      return (
                        <div key={item.id} className="rounded-xl border border-navy-800/80 bg-navy-900/40 overflow-hidden">
                          {hasSubitems ? (
                            <>
                              <button
                                type="button"
                                onClick={() => setExpandedMobileMenu(isExpanded ? null : item.id)}
                                className="flex w-full items-center justify-between p-3.5 text-left text-sm font-semibold text-ivory hover:text-gold-300 transition-colors"
                              >
                                <span>{item.title}</span>
                                <ChevronDown
                                  className={cn(
                                    "h-4 w-4 text-gold-500/70 transition-transform duration-200",
                                    isExpanded ? "rotate-180 text-gold-400" : ""
                                  )}
                                />
                              </button>
                              <AnimatePresence>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden border-t border-navy-800/80 bg-navy-950/60"
                                  >
                                    <div className="p-2 space-y-1">
                                      {item.items.map((sub) => (
                                        <Link
                                          key={sub.href}
                                          href={sub.href}
                                          onClick={() => setMobileMenuOpen(false)}
                                          className="block px-3 py-2 rounded-lg text-xs text-ivory/80 hover:text-gold-300 hover:bg-navy-900 transition-colors"
                                        >
                                          {sub.title}
                                        </Link>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </>
                          ) : (
                            <Link
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block p-3.5 text-sm font-semibold text-ivory hover:text-gold-300 transition-colors"
                            >
                              {item.title}
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile Drawer Footer */}
                <div className="p-4 border-t border-navy-800 bg-navy-900/60 shrink-0 text-center">
                  <p className="text-[11px] text-ivory/60">
                    Poddar Group of Institutions • Alumni Portal
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
