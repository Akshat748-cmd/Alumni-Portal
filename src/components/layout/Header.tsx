"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  LogIn,
  LogOut,
  User,
  ShieldAlert,
  MoreHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import { MAIN_NAVIGATION, NavItem } from "@/data/nav";
import { usePortalStore } from "@/store/portal";
import { Logo } from "@/components/layout/Logo";
import { AvatarInitials } from "@/components/common/AvatarInitials";
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
  const { currentUser, logout, login } = usePortalStore();

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

  // Calculate visible vs overflow items for desktop navigation
  // At >= 1440px: all 8 items fit comfortably without Help Desk pill
  // At 1300px to 1439px: 6 items fit + More
  // At 1150px to 1299px: 5 items fit + More
  // At 1024px to 1149px: 4 items fit + More
  const visibleCount = useMemo(() => {
    if (!mounted) return 8; // Match SSR to avoid hydration mismatch
    if (windowWidth >= 1440) return 8;
    if (windowWidth >= 1300) return 6;
    if (windowWidth >= 1150) return 5;
    if (windowWidth >= 1024) return 4;
    return 8;
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
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        hasSolidBackground
          ? "bg-navy-950/95 backdrop-blur-md border-b border-navy-800 shadow-lg py-2.5"
          : "bg-transparent border-b border-transparent py-3 sm:py-4"
      )}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 xl:gap-6">
          {/* 1. BRAND LOGO (Protected left column, will never be overlapped) */}
          <div className="shrink-0 z-10 flex items-center pr-2">
            <Logo theme="navy" />
          </div>

          {/* 2. DESKTOP NAVIGATION (Visible ONLY at >= 1024px via lg:flex) */}
          <nav
            ref={navContainerRef}
            className="hidden lg:flex items-center gap-0.5 xl:gap-1 2xl:gap-1.5 flex-1 justify-start xl:justify-center min-w-0"
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
                      "flex items-center gap-1 px-1.5 xl:px-2.5 2xl:px-3 py-1.5 rounded-lg text-xs xl:text-[13px] font-semibold tracking-normal transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-gold-400/50",
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

            {/* "MORE" DROPDOWN: Only rendered if some items overflowed at constrained widths */}
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
                    "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[13px] font-semibold tracking-normal transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-gold-400/50",
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

          {/* 3. DESKTOP RIGHT ACTIONS (Login / Logout + Gold Help Desk Pill) */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {/* Logged in state */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-navy-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500/40 cursor-pointer"
                    aria-label="User account menu"
                  >
                    <AvatarInitials name={currentUser.name} src={currentUser.avatarUrl} size="sm" />
                    <div className="text-left hidden 2xl:block pr-1">
                      <span className="text-xs font-semibold text-ivory block line-clamp-1 max-w-[100px]">
                        {currentUser.name}
                      </span>
                    </div>
                    <ChevronDown className="h-3 w-3 text-ivory/60" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="w-56 bg-navy-900 border-navy-700 text-ivory p-1.5 rounded-xl shadow-xl z-50"
                  >
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="font-normal px-2 py-1.5">
                        <div className="text-xs font-bold text-ivory">{currentUser.name}</div>
                        <div className="text-[11px] text-ivory/60 truncate">{currentUser.email}</div>
                        {currentUser.batch && (
                          <div className="text-[10px] text-gold-400 mt-0.5">
                            Class of {currentUser.batch} • {currentUser.course}
                          </div>
                        )}
                      </DropdownMenuLabel>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="bg-navy-800" />

                    <DropdownMenuItem className="focus:bg-navy-800 focus:text-gold-300 cursor-pointer rounded-lg text-xs p-0">
                      <Link href="/join/profile" className="flex items-center gap-2 w-full px-2 py-1.5">
                        <User className="h-3.5 w-3.5 text-gold-400" />
                        Update My Profile
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="focus:bg-navy-800 focus:text-gold-300 cursor-pointer rounded-lg text-xs p-0">
                      <Link href="/admin" className="flex items-center gap-2 w-full px-2 py-1.5">
                        <ShieldAlert className="h-3.5 w-3.5 text-gold-400" />
                        Admin Demo Panel
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Visible Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 h-9 px-3 rounded-xl bg-navy-900 border border-navy-700/80 text-rose-300 hover:text-white hover:bg-rose-950/60 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                  aria-label="Sign out"
                >
                  <LogOut className="h-3.5 w-3.5 text-rose-400" />
                  <span className="hidden xl:inline">Logout</span>
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
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            {/* Mobile Auth Button (Login or Logout) */}
            {currentUser ? (
              <div className="flex items-center gap-1.5">
                <AvatarInitials name={currentUser.name} src={currentUser.avatarUrl} size="sm" />
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center h-10 px-2.5 rounded-xl bg-navy-900 border border-navy-700 text-rose-300 hover:text-white text-xs font-semibold"
                  aria-label="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/join/auth?tab=login"
                className="flex items-center justify-center min-w-[44px] h-10 px-3 rounded-xl border border-gold-500/80 text-gold-300 hover:bg-gold-500/15 text-xs font-semibold"
                aria-label="Login"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline ml-1.5">Login</span>
              </Link>
            )}

            {/* Mobile Hamburger Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="flex lg:hidden h-11 w-11 items-center justify-center rounded-xl bg-navy-900 border border-navy-700 text-ivory active:scale-95 transition-transform cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold-400"
                aria-label="Open Navigation Menu"
              >
                <Menu className="h-5 w-5 text-gold-400" strokeWidth={2} />
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
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 border border-navy-800 text-ivory hover:text-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" strokeWidth={2} />
                  </SheetClose>
                </div>

                {/* Middle Region: Scrollable navigation with data-lenis-prevent */}
                <div
                  className="flex-1 min-h-0 overflow-y-auto overscroll-contain py-4 px-4 space-y-2 scrollbar-thin"
                  data-lenis-prevent
                >
                  {regularNavItems.map((item) => {
                    const isExpanded = expandedMobileMenu === item.id;
                    const isActive = pathname.startsWith(item.href);

                    return (
                      <div key={item.id} className="rounded-xl border border-navy-800/80 bg-navy-900/40 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setExpandedMobileMenu(isExpanded ? null : item.id)}
                          className={cn(
                            "w-full flex items-center justify-between p-3.5 text-left text-sm font-semibold transition-colors min-h-[44px]",
                            isActive ? "text-gold-400" : "text-ivory"
                          )}
                          aria-expanded={isExpanded}
                        >
                          <span>{item.title}</span>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 text-gold-400/80 transition-transform duration-200",
                              isExpanded ? "rotate-180" : ""
                            )}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.18 }}
                              className="overflow-hidden bg-navy-950/60 border-t border-navy-800/80"
                            >
                              <div className="p-2 space-y-1">
                                <Link
                                  href={item.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block p-2 text-xs font-bold text-gold-400 hover:text-gold-300 uppercase tracking-wider"
                                >
                                  {item.title} Overview →
                                </Link>
                                {item.items.map((sub) => (
                                  <Link
                                    key={sub.href}
                                    href={sub.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block p-2.5 rounded-lg text-xs font-medium text-ivory/80 hover:text-ivory hover:bg-navy-800/80 transition-colors min-h-[44px] flex items-center"
                                  >
                                    {sub.title}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* Fixed Bottom Action Area (Always Fully Visible with Safe Area Padding) */}
                <div className="p-4 border-t border-navy-800 bg-navy-950/95 shrink-0 space-y-2 pb-safe">
                  <div className="flex items-center gap-2">
                    {currentUser ? (
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="flex-1 h-10 flex items-center justify-center gap-1.5 rounded-xl bg-navy-900 border border-navy-700 text-rose-300 font-semibold text-xs"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>Sign Out</span>
                      </button>
                    ) : (
                      <Link
                        href="/join/auth?tab=login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex-1 h-10 flex items-center justify-center gap-1.5 rounded-xl bg-navy-900 border border-navy-700 text-gold-300 font-semibold text-xs"
                      >
                        <LogIn className="h-3.5 w-3.5" />
                        <span>Member Login</span>
                      </Link>
                    )}

                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-1 h-10 flex items-center justify-center gap-1.5 rounded-xl bg-navy-900 border border-navy-700 text-ivory font-medium text-xs hover:text-gold-300"
                    >
                      <ShieldAlert className="h-3.5 w-3.5 text-gold-400" />
                      <span>Admin demo</span>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
