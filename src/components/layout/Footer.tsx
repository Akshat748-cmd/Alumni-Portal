"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUp, Mail, Phone, MapPin, ExternalLink, ShieldCheck, ChevronDown, Clock } from "lucide-react";
import { usePortalStore } from "@/store/portal";
import { ALUMNI_OFFICE } from "@/data/office";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

// Official Social Icons as SVG components
function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.89 0-1.61.72-1.61 1.61 0 .88.72 1.6 1.61 1.6.88 0 1.6-.72 1.6-1.6 0-.89-.72-1.61-1.6-1.61Z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
    </svg>
  );
}

// 5 exact links for Explore and Community per Rule 7
const EXPLORE_LINKS = [
  { title: "Join the Network", href: "/join" },
  { title: "Alumni Directory", href: "/directory/search" },
  { title: "Explore Domains", href: "/directory/domains" },
  { title: "Career Opportunities", href: "/career-hub/jobs" },
  { title: "Alumni Bulletin", href: "/bulletin/notices" },
];

const COMMUNITY_LINKS = [
  { title: "Alumni Spotlight", href: "/spotlight" },
  { title: "Upcoming Events", href: "/reunions/calendar" },
  { title: "Mentorship", href: "/career-hub/mentorship" },
  { title: "Give Back", href: "/give-back/campaigns" },
  { title: "Support Desk", href: "/help-desk" },
];

export function Footer() {
  const { socialLinks } = usePortalStore();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (totalScroll > 0) {
        setScrollProgress((currentScroll / totalScroll) * 100);
      }

      setShowBackToTop(currentScroll > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkOverlay = () => {
      const hasOverlay =
        document.body.getAttribute("data-overlay-open") === "true" ||
        document.querySelector('[role="dialog"]') !== null ||
        document.querySelector('[data-slot="sheet-overlay"]') !== null;
      setIsOverlayOpen(hasOverlay);
    };

    checkOverlay();
    const observer = new MutationObserver(checkOverlay);
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleMobileSection = (key: string) => {
    setOpenMobileSection((curr) => (curr === key ? null : key));
  };

  return (
    <footer className="relative bg-navy-950 text-ivory border-t border-navy-800 pb-12 sm:pb-16 overflow-hidden">
      {/* Background subtle patterned overlay */}
      <div className="absolute inset-0 bg-navy-pattern opacity-15 pointer-events-none" />

      {/* Slim Top Row: Brand & Inline Social Icons */}
      <div className="border-b border-navy-800/80 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5">
          <div className="flex flex-row items-center justify-between gap-2 text-left">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <span className="text-[11px] sm:text-xs uppercase font-bold tracking-wider text-gold-400 shrink-0">
                Poddar Alumni
              </span>
              <span className="hidden sm:inline text-navy-600">•</span>
              <h3 className="text-[11px] sm:text-xs font-medium text-ivory/80 truncate hidden xs:block">
                Stay Connected With Your Alma Mater
              </h3>
            </div>

            {/* Inline Social Icons */}
            <div className="flex items-center gap-1.5 shrink-0">
              {socialLinks.map((social) => {
                const getIcon = () => {
                  switch (social.name.toLowerCase()) {
                    case "linkedin":
                      return <LinkedInIcon className="h-3.5 w-3.5" />;
                    case "instagram":
                      return <InstagramIcon className="h-3.5 w-3.5" />;
                    case "facebook":
                      return <FacebookIcon className="h-3.5 w-3.5" />;
                    default:
                      return <ExternalLink className="h-3.5 w-3.5" />;
                  }
                };

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-navy-900 border border-navy-700 text-gold-400 transition-all duration-200 hover:bg-gold-500 hover:text-navy-950 hover:scale-105 shadow-sm"
                    aria-label={social.label}
                  >
                    {getIcon()}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer Navigation (Compact) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 lg:gap-8">
          {/* Column 1: Brand & Statement (2 lines max) */}
          <div className="space-y-1.5 pb-2 md:pb-0 border-b border-navy-800/60 md:border-b-0">
            <Logo theme="navy" />
            <p className="text-[11px] sm:text-xs text-ivory/70 leading-relaxed max-w-sm">
              Reconnect with your batch, find mentors, and discover career opportunities across our verified alumni community.
            </p>
          </div>

          {/* Column 2: Explore (Max 5 Links - Collapsible on Mobile) */}
          <div className="border-b border-navy-800/60 md:border-b-0">
            {/* Mobile Header Button */}
            <button
              type="button"
              onClick={() => toggleMobileSection("explore")}
              className="w-full flex md:hidden items-center justify-between py-1.5 text-[11px] font-bold uppercase tracking-wider text-gold-400"
              aria-expanded={openMobileSection === "explore"}
            >
              <span>Explore</span>
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 text-gold-400 transition-transform duration-200",
                  openMobileSection === "explore" && "rotate-180"
                )}
              />
            </button>

            {/* Desktop Header */}
            <h4 className="hidden md:block text-xs font-bold uppercase tracking-wider text-gold-400 mb-2">
              Explore
            </h4>

            {/* Links List */}
            <div
              className={cn(
                "space-y-1.5 text-xs",
                openMobileSection === "explore" ? "block pb-2 pt-1" : "hidden md:block"
              )}
            >
              {EXPLORE_LINKS.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ivory/80 hover:text-gold-300 transition-colors inline-block py-0.5"
                  >
                    {item.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Community (Max 5 Links - Collapsible on Mobile) */}
          <div className="border-b border-navy-800/60 md:border-b-0">
            {/* Mobile Header Button */}
            <button
              type="button"
              onClick={() => toggleMobileSection("community")}
              className="w-full flex md:hidden items-center justify-between py-1.5 text-[11px] font-bold uppercase tracking-wider text-gold-400"
              aria-expanded={openMobileSection === "community"}
            >
              <span>Community</span>
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 text-gold-400 transition-transform duration-200",
                  openMobileSection === "community" && "rotate-180"
                )}
              />
            </button>

            {/* Desktop Header */}
            <h4 className="hidden md:block text-xs font-bold uppercase tracking-wider text-gold-400 mb-2">
              Community
            </h4>

            {/* Links List */}
            <div
              className={cn(
                "space-y-1.5 text-xs",
                openMobileSection === "community" ? "block pb-2 pt-1" : "hidden md:block"
              )}
            >
              {COMMUNITY_LINKS.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ivory/80 hover:text-gold-300 transition-colors inline-block py-0.5"
                  >
                    {item.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Alumni Office Contact Coordinates (Collapsible on Mobile) */}
          <div className="border-b border-navy-800/60 md:border-b-0">
            {/* Mobile Header Button */}
            <button
              type="button"
              onClick={() => toggleMobileSection("office")}
              className="w-full flex md:hidden items-center justify-between py-1.5 text-[11px] font-bold uppercase tracking-wider text-gold-400"
              aria-expanded={openMobileSection === "office"}
            >
              <span>Alumni Office</span>
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 text-gold-400 transition-transform duration-200",
                  openMobileSection === "office" && "rotate-180"
                )}
              />
            </button>

            {/* Desktop Header */}
            <h4 className="hidden md:block text-xs font-bold uppercase tracking-wider text-gold-400 mb-2">
              Alumni Office
            </h4>

            <div
              className={cn(
                "space-y-1.5 text-xs text-ivory/70",
                openMobileSection === "office" ? "block pb-2 pt-1" : "hidden md:block"
              )}
            >
              <div className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 text-gold-500 shrink-0 mt-0.5" />
                <span className="text-[11px] sm:text-xs leading-tight">
                  {ALUMNI_OFFICE.address.line1}, {ALUMNI_OFFICE.address.line2}, {ALUMNI_OFFICE.address.city} {ALUMNI_OFFICE.address.pincode}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-gold-500 shrink-0" />
                <a
                  href={`tel:${ALUMNI_OFFICE.contact.phonePrimary.replace(/\s+/g, "")}`}
                  className="text-[11px] sm:text-xs text-ivory hover:text-gold-300 transition-colors font-mono"
                >
                  {ALUMNI_OFFICE.contact.phonePrimary}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-gold-500 shrink-0" />
                <a
                  href={`mailto:${ALUMNI_OFFICE.contact.emailGeneral}`}
                  className="text-[11px] sm:text-xs text-ivory hover:text-gold-300 transition-colors break-all"
                >
                  {ALUMNI_OFFICE.contact.emailGeneral}
                </a>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-ivory/50 pt-0.5">
                <Clock className="h-3 w-3 text-gold-500/70 shrink-0" />
                <span>Mon – Fri: 09:30 AM – 05:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Thin Bottom Bar: Copyright & Admin Demo Link */}
        <div className="mt-3 pt-2.5 border-t border-navy-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-ivory/50 text-center sm:text-left">
          <div className="text-[11px] sm:text-xs">
            © {new Date().getFullYear()} Poddar Alumni Network. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 text-[11px] sm:text-xs">
            <Link
              href="/help-desk"
              className="text-ivory/70 hover:text-gold-300 transition-colors inline-flex items-center gap-1"
            >
              Help Desk
            </Link>
            <span>•</span>
            <Link
              href="/admin"
              className="text-ivory/70 hover:text-gold-300 transition-colors inline-flex items-center gap-1.5"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-gold-500" />
              <span>Admin demo</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Circular Back-to-Top Progress Button */}
      {showBackToTop && !isOverlayOpen && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-4 sm:bottom-6 sm:right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-navy-900 border border-gold-500/40 text-gold-300 shadow-xl transition-all duration-300 hover:scale-105 hover:border-gold-400 active:scale-95 cursor-pointer pb-safe"
          aria-label="Back to top"
        >
          <svg className="absolute inset-0 h-full w-full -rotate-90 p-0.5" viewBox="0 0 36 36">
            <path
              className="text-navy-800"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-gold-500"
              strokeDasharray={`${scrollProgress}, 100`}
              strokeWidth="2.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <ArrowUp className="h-4 w-4 relative z-10 text-gold-300" strokeWidth={2} />
        </button>
      )}
    </footer>
  );
}