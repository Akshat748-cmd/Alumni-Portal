"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  Compass,
  Calendar,
  Briefcase,
  GraduationCap,
  HeartHandshake,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  CheckCircle2,
  Mail,
  Award,
  Sparkles,
  Building2,
  Quote,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

// Components
import { SectionHeader } from "@/components/common/SectionHeader";
import { StatCard } from "@/components/common/StatCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { AvatarInitials } from "@/components/common/AvatarInitials";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { TiltCard } from "@/components/motion/TiltCard";
import { Marquee } from "@/components/motion/Marquee";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Data Fixtures
import { IMAGES } from "@/data/images";
import { DOMAIN_STATS, TOTAL_DOMAINS_SAMPLE_COUNT } from "@/data/domains";
import { INITIAL_BULLETIN } from "@/data/bulletin";
import { INITIAL_EVENTS } from "@/data/events";
import { INITIAL_SUCCESS_STORIES } from "@/data/spotlight";

export default function HomePage() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  // Mouse drag-to-scroll support for desktop
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const scrollToIndex = useCallback((index: number) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cards = container.querySelectorAll<HTMLElement>("[data-event-card]");
    if (!cards[index]) return;

    const targetLeft = cards[index].offsetLeft - container.offsetLeft;
    setCurrentEventIndex(index);
    container.scrollTo({
      left: targetLeft,
      behavior: "smooth",
    });
  }, []);

  const checkScroll = useCallback(() => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

    // Track active card index
    const cards = carouselRef.current.querySelectorAll<HTMLElement>("[data-event-card]");
    if (cards.length > 0) {
      let closestIdx = 0;
      let minDistance = Infinity;
      cards.forEach((card, idx) => {
        const dist = Math.abs(card.offsetLeft - carouselRef.current!.offsetLeft - scrollLeft);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });
      setCurrentEventIndex(closestIdx);
    }
  }, []);

  // Auto-play timer: Every 3 seconds advance 1-by-1 smoothly
  useEffect(() => {
    if (isCarouselPaused) return;

    const timer = setInterval(() => {
      const totalEvents = INITIAL_EVENTS.length;
      if (totalEvents <= 1) return;

      const nextIndex = (currentEventIndex + 1) % totalEvents;
      scrollToIndex(nextIndex);
    }, 3000); // 3 seconds interval

    return () => clearInterval(timer);
  }, [currentEventIndex, isCarouselPaused, scrollToIndex]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scrollPrev = () => {
    const totalEvents = INITIAL_EVENTS.length;
    const prevIndex = currentEventIndex > 0 ? currentEventIndex - 1 : totalEvents - 1;
    scrollToIndex(prevIndex);
  };

  const scrollNext = () => {
    const totalEvents = INITIAL_EVENTS.length;
    const nextIndex = (currentEventIndex + 1) % totalEvents;
    scrollToIndex(nextIndex);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftStart.current = carouselRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.3;
    carouselRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      toast.error("Please provide a valid email address.");
      return;
    }
    toast.success("Thank you! You are now subscribed to the Poddar Alumni Newsletter.");
    setNewsletterEmail("");
  };

  // Quick Action Tiles
  const quickActions = [
    {
      title: "Join Network",
      href: "/join",
      icon: Users,
      desc: "Update your alumni record & verify credentials",
    },
    {
      title: "Directory",
      href: "/directory",
      icon: Compass,
      desc: "Search 260+ alumni across 7 key industries",
    },
    {
      title: "Reunions",
      href: "/reunions",
      icon: Calendar,
      desc: "Reserve seats for annual campus homecomings",
    },
    {
      title: "Career Hub",
      href: "/career-hub",
      icon: Briefcase,
      desc: "Explore curated jobs & post hiring notices",
    },
    {
      title: "Mentorship",
      href: "/career-hub/find-mentor",
      icon: GraduationCap,
      desc: "Connect 1-on-1 with industry veterans",
    },
    {
      title: "Give Back",
      href: "/give-back",
      icon: HeartHandshake,
      desc: "Guest lectures, internships & sponsorships",
    },
  ];

  // Marquee companies
  const alumniCompanies = [
    "Apex Capital Advisory",
    "NovaCrest Cloud Solutions",
    "Zenith AgriVentures",
    "Aarogya Diagnostics Labs",
    "Pulse Media Works",
    "Singhania Heritage Gems",
    "FinPulse NeoBank",
    "Trivecta Audit Partners",
    "Pratham Vidya Academy",
    "InfoSphere Global Services",
    "Veda Heritage Silks",
    "Hyperion Intelligence",
  ];

  const bulletinHighlights = INITIAL_BULLETIN.slice(0, 3);
  const eventHighlights = INITIAL_EVENTS;
  const heroStory = INITIAL_SUCCESS_STORIES[0];
  const sideStories = INITIAL_SUCCESS_STORIES.slice(1, 3);

  return (
    <div className="flex-1 flex flex-col">
      {/* ========================================================
          1. HERO SECTION (max-h min(88svh, 720px), masked reveal, navy overlay)
      ======================================================== */}
      <section className="relative min-h-[70svh] lg:h-[min(88svh,720px)] max-h-[min(88svh,720px)] flex items-center justify-center overflow-hidden bg-navy-950 text-white">
        {/* Background Campus Photography with Navy Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={IMAGES.hero.campusMain.src}
            alt="Poddar Group of Institutions Campus Quadrangle"
            fill
            priority
            className="object-cover object-center brightness-75 scale-105 animate-in fade-in duration-1000"
          />
          {/* Layered luxury navy gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-900/60" />
          <div className="absolute inset-0 bg-navy-pattern opacity-30" />
        </div>

        {/* Ambient Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />

        {/* Hero Content */}
        <div className="container relative z-10 mx-auto px-3.5 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-28 pb-5 sm:pb-10 lg:pb-12 flex flex-col items-center text-center">
          {/* Institutional Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-2.5 sm:px-3.5 py-0.5 sm:py-1 mb-3 sm:mb-5 backdrop-blur-md"
          >
            <Sparkles className="h-3 w-3 text-gold-400" />
            <span className="text-[10px] sm:text-xs uppercase font-semibold tracking-wider text-gold-300">
              Poddar Group of Institutions • Alumni Association
            </span>
          </motion.div>

          {/* Masked Headline Reveal: "Once Poddar, always Poddar" */}
          <div className="overflow-hidden mb-1.5 sm:mb-2">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-sans font-semibold text-ivory tracking-tight text-balance text-[22px] sm:text-[34px] lg:text-[44px] leading-[1.18]"
            >
              Once Poddar, always Poddar.
            </motion.h1>
          </div>

          {/* Gold Underline Draw */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="h-0.5 sm:h-1 w-14 sm:w-20 rounded-full bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 mb-3 sm:mb-5 origin-center"
          />

          {/* Supporting Headline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-[13px] sm:text-[15px] lg:text-[16px] text-ivory/80 max-w-[62ch] font-normal leading-relaxed text-pretty mb-5 sm:mb-8"
          >
            A network of thinkers, entrepreneurs, and leaders shaping diverse industries. Reconnect, mentor, and grow together.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3"
          >
            <MagneticButton className="w-auto">
              <Link
                href="/join"
                className="w-auto inline-flex items-center justify-center gap-1.5 h-8 sm:h-10 px-4 sm:px-6 rounded-lg bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-navy-950 font-semibold text-xs sm:text-sm shadow-md hover:shadow-gold-500/20 active:scale-95 transition-all"
              >
                <span>Join the Network</span>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
            </MagneticButton>

            <MagneticButton className="w-auto">
              <Link
                href="/directory"
                className="w-auto inline-flex items-center justify-center gap-1.5 h-8 sm:h-10 px-4 sm:px-6 rounded-lg border border-navy-700 bg-navy-900/60 hover:bg-navy-800 text-ivory font-semibold text-xs sm:text-sm backdrop-blur-md active:scale-95 transition-all"
              >
                <Compass className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold-400" />
                <span>Explore Directory</span>
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Bottom indicator hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-[11px] text-ivory/40 pointer-events-none hidden sm:block">
          Scroll down to discover recent updates & reunions
        </div>
      </section>

      {/* ========================================================
          2. STAT COUNTERS (2x2 on mobile, 4 across on desktop)
          Background: Ivory
      ======================================================== */}
      <section className="py-8 md:py-10 bg-ivory border-b border-line">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            <StatCard
              label="Alumni Community"
              value={TOTAL_DOMAINS_SAMPLE_COUNT}
              suffix="+"
              icon={Users}
              description="Verified graduates across 2005 to 2024 cohorts"
              featured
            />
            <StatCard
              label="Industry Domains"
              value={DOMAIN_STATS.length}
              icon={Briefcase}
              description="Dedicated career verticals & business clusters"
            />
            <StatCard
              label="Upcoming Gatherings"
              value={8}
              icon={Calendar}
              description="Annual silver reunions, webinars & clinics"
            />
            <StatCard
              label="Active Mentors"
              value={8}
              icon={GraduationCap}
              description="Senior alumni offering 1-on-1 career guidance"
            />
          </Reveal>
        </div>
      </section>

      {/* ========================================================
          3. QUICK-ACTION TILES (2 cols mobile, 3 tablet, 6 desktop)
          Background: White
      ======================================================== */}
      <section className="py-7 md:py-12 bg-white border-b border-line">
        <div className="container mx-auto px-3.5 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Portal Navigation"
            title="What would you like to explore?"
            subtitle="Direct gateways into primary alumni programs, verified rosters, and collaborative initiatives."
          />

          <Reveal staggerChildren={0.06} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5">
            {quickActions.map((tile) => {
              const Icon = tile.icon;
              return (
                <RevealItem key={tile.href}>
                  <Link
                    href={tile.href}
                    className="group flex flex-col justify-between h-full p-2.5 sm:p-4 rounded-xl border border-line bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-sm hover:border-gold-500/40 relative"
                  >
                    <div>
                      <div className="flex h-7.5 w-7.5 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-gold-500/15 text-gold-600 mb-2 sm:mb-2.5 group-hover:bg-navy-900 group-hover:text-gold-300 transition-colors">
                        <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" strokeWidth={1.75} />
                      </div>
                      <h4 className="font-sans font-semibold text-[13px] sm:text-[15px] text-navy-950 group-hover:text-gold-600 transition-colors mb-0.5 sm:mb-1">
                        {tile.title}
                      </h4>
                      <p className="text-[10.5px] sm:text-[11.5px] text-slate-500 font-normal leading-normal line-clamp-2">
                        {tile.desc}
                      </p>
                    </div>

                    <div className="mt-2.5 sm:mt-3 pt-1.5 sm:pt-2 border-t border-line/60 flex items-center text-[10px] sm:text-[11px] font-semibold text-navy-900 group-hover:text-gold-600">
                      <span>Explore</span>
                      <ArrowRight className="h-3 w-3 ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </RevealItem>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* ========================================================
          4. ALUMNI BULLETIN HIGHLIGHTS (3 cards)
          Background: Ivory
      ======================================================== */}
      <section className="py-7 md:py-12 bg-ivory border-b border-line">
        <div className="container mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-7 text-center md:text-left">
            <SectionHeader
              eyebrow="Official Notices & Milestones"
              title="Latest from the Alumni Bulletin"
              subtitle="Timely governance announcements, campus research developments, and grant opportunities."
              align="left-on-desktop"
              className="mb-0"
            />
            <Link
              href="/bulletin"
              className="inline-flex items-center gap-1.5 border border-line bg-card hover:bg-gold-500/10 text-navy-950 font-semibold rounded-lg text-xs h-7.5 sm:h-9 px-3.5 sm:px-4 shrink-0 transition-colors shadow-xs mx-auto md:mx-0 w-auto"
            >
              <span>View All Announcements</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <Reveal staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5">
            {bulletinHighlights.map((item) => (
              <RevealItem key={item.id}>
                <div className="flex flex-col justify-between h-full rounded-xl border border-line bg-card p-3.5 sm:p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-sm">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[9.5px] sm:text-[10.5px] font-semibold uppercase tracking-wider text-gold-600">
                        {item.category}
                      </span>
                      <span className="text-[10.5px] sm:text-[11px] text-slate-400 tabular-nums">{item.date}</span>
                    </div>

                    <h4 className="font-sans text-[15px] sm:text-[17px] font-semibold text-navy-950 line-clamp-2 mb-1.5 sm:mb-2 leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-[11px] sm:text-[12px] text-slate-500/90 font-normal leading-normal line-clamp-3 mb-3 sm:mb-3.5">
                      {item.excerpt}
                    </p>
                  </div>

                  <Link
                    href={`/bulletin/announcements`}
                    className="inline-flex items-center text-[11px] sm:text-[12px] font-semibold text-navy-900 hover:text-gold-600 transition-colors pt-2 sm:pt-2.5 border-t border-line/60"
                  >
                    <span>Read Full Brief</span>
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ========================================================
          5. UPCOMING EVENTS & REUNIONS (Swipeable Embla Carousel)
          Background: White
      ======================================================== */}
      <section className="py-10 md:py-14 bg-white border-b border-line overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-7">
            <SectionHeader
              eyebrow="Gatherings & Conclaves"
              title="Upcoming Reunions & Workshops"
              subtitle="Scroll or swipe left-right to browse scheduled regional chapter meets, webinars, and batch anniversaries."
              align="left"
              className="mb-0"
            />

            {/* Carousel navigation buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-muted hidden sm:inline-block">
                Scroll or swipe
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={scrollPrev}
                  disabled={!canScrollLeft}
                  className="h-9 w-9 rounded-lg border-line text-navy-950 hover:bg-gold-500/10 disabled:opacity-30 cursor-pointer transition-opacity"
                  aria-label="Previous events"
                >
                  <ChevronLeft className="h-4.5 w-4.5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={scrollNext}
                  disabled={!canScrollRight}
                  className="h-9 w-9 rounded-lg border-line text-navy-950 hover:bg-gold-500/10 disabled:opacity-30 cursor-pointer transition-opacity"
                  aria-label="Next events"
                >
                  <ChevronRight className="h-4.5 w-4.5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Smooth Scrollable Carousel Viewport with 1-by-1 auto-slide every 3s */}
          <div
            ref={carouselRef}
            data-lenis-prevent
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => {
              setIsCarouselPaused(false);
              handleMouseUp();
            }}
            onTouchStart={() => setIsCarouselPaused(true)}
            onTouchEnd={() => setIsCarouselPaused(false)}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="overflow-x-auto scroll-smooth snap-x snap-mandatory flex gap-4 sm:gap-5 pb-3 -mx-4 px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
          >
            {eventHighlights.map((evt) => (
              <div
                key={evt.id}
                data-event-card
                className="flex-[0_0_100%] sm:flex-[0_0_calc((100%-20px)/2)] lg:flex-[0_0_calc((100%-40px)/3)] min-w-0 snap-center"
              >
                <div className="flex flex-col h-full rounded-xl border border-line bg-card shadow-xs overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-sm">
                  {/* Event Image Banner with Date Badge (compact on mobile) */}
                  <div className="relative h-32 sm:h-44 max-h-[140px] sm:max-h-[180px] w-full overflow-hidden bg-navy-950 aspect-[16/10]">
                    <ImageWithFallback
                      src={evt.imageUrl}
                      alt={evt.title}
                      aspectRatio="16/10"
                      fill
                      overlay
                      containerClassName="w-full h-full"
                    />
                    <div className="absolute top-2 left-2 rounded-md bg-navy-950/95 border border-gold-500/40 px-2 py-0.5 sm:px-2.5 sm:py-1 text-center backdrop-blur-md shadow-sm">
                      <span className="block text-[9px] sm:text-[11px] font-bold text-[#E9C46A] uppercase tracking-wider leading-none">
                        {new Date(evt.date).toLocaleString("default", { month: "short" }).toUpperCase()}
                      </span>
                      <span className="block text-base sm:text-lg font-sans font-bold text-white leading-none mt-0.5 tabular-nums">
                        {new Date(evt.date).getDate()}
                      </span>
                    </div>
                  </div>

                  {/* Event Body (compact typography & padding on mobile) */}
                  <div className="p-3 sm:p-4.5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-muted mb-1">
                        <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gold-600" />
                        <span className="tabular-nums">{evt.time}</span>
                      </div>

                      <h4 className="font-sans text-[13.5px] sm:text-[16px] font-semibold text-navy-950 line-clamp-1 sm:line-clamp-2 leading-snug mb-1">
                        {evt.title}
                      </h4>

                      <div className="flex items-start gap-1.5 text-[10.5px] sm:text-[11.5px] text-slate-500 mb-1.5 line-clamp-1">
                        <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gold-600 shrink-0 mt-0.5" />
                        <span className="truncate">{evt.location}</span>
                      </div>

                      <p className="text-[10.5px] sm:text-[11.5px] text-slate-500 font-normal line-clamp-2 leading-normal">
                        {evt.description}
                      </p>
                    </div>

                    <div className="pt-2 sm:pt-3 border-t border-line flex items-center justify-between gap-2.5">
                      <span className="text-[11px] sm:text-xs text-muted tabular-nums">
                        {evt.attendeeCount} Registered
                      </span>
                      <Link
                        href="/reunions/register"
                        className="inline-flex items-center justify-center h-7 sm:h-8 px-2.5 sm:px-3 rounded-lg bg-navy-900 hover:bg-navy-800 text-gold-300 text-[11px] sm:text-xs font-semibold transition-colors"
                      >
                        Register Online
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Pagination Dots (for mobile & desktop) */}
          <div className="flex items-center justify-between mt-2.5 mb-1">
            <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
              {eventHighlights.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToIndex(idx)}
                  className={cn(
                    "h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer",
                    currentEventIndex === idx
                      ? "w-5 sm:w-6 bg-gold-500 shadow-xs"
                      : "w-1.5 sm:w-2 bg-line hover:bg-slate-400"
                  )}
                  aria-label={`Jump to event ${idx + 1}`}
                />
              ))}
            </div>
            <span className="text-[11px] sm:text-xs text-muted font-medium tabular-nums hidden sm:inline-block">
              {currentEventIndex + 1} of {eventHighlights.length}
            </span>
          </div>

          {/* Mobile-only View All Events Button */}
          <div className="mt-2.5 sm:hidden flex justify-center">
            <Link
              href="/reunions"
              className="w-auto inline-flex items-center justify-center gap-1.5 h-8 px-4 rounded-lg bg-navy-950 text-gold-300 font-semibold text-xs shadow-xs active:scale-95 transition-all"
            >
              <Calendar className="h-3.5 w-3.5 text-gold-400" />
              <span>View All Events ({eventHighlights.length})</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Bottom helper & view all link for tablet/desktop */}
          <div className="mt-4 sm:mt-6 flex items-center justify-between text-xs text-muted flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-gold-500 animate-pulse" />
              <span>Auto-cycling every 3 seconds • Hover or touch to pause</span>
            </div>
            <Link
              href="/reunions/upcoming"
              className="hidden sm:inline-flex text-xs font-semibold text-navy-950 hover:text-gold-600 items-center gap-1 transition-colors group"
            >
              <span>View Full Event Calendar</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. ALUMNI SPOTLIGHT (1 large feature + 2 side stories)
          Background: Deep Navy
      ======================================================== */}
      <section className="py-7 md:py-12 bg-navy-950 text-ivory border-b border-navy-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-pattern opacity-25 pointer-events-none" />

        <div className="container relative z-10 mx-auto px-3.5 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Trailblazers & Leadership"
            title="Alumni Spotlight: Stories of Impact"
            subtitle="Celebrating graduates making significant contributions to global enterprise, science, and societal welfare."
            theme="navy"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-6 items-stretch">
            {/* LARGE FEATURED STORY (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-navy-800 bg-navy-900/80 p-3.5 sm:p-6 shadow-xl backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Quote className="h-16 w-16 sm:h-24 sm:w-24 text-gold-500" />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <StatusBadge status="gold" label={heroStory.category} />
                  <span className="text-[11px] sm:text-xs text-ivory/60 tabular-nums">
                    Class of {heroStory.batch}
                  </span>
                </div>

                <h3 className="font-sans text-[17px] sm:text-[22px] lg:text-[24px] font-semibold text-ivory leading-tight mb-2 sm:mb-3">
                  {heroStory.title}
                </h3>

                <p className="text-[12.5px] sm:text-[14px] lg:text-[15px] text-ivory/80 leading-relaxed mb-3 sm:mb-4">
                  {heroStory.summary}
                </p>

                {heroStory.quote && (
                  <blockquote className="my-2.5 sm:my-4 pl-3 border-l-2 border-gold-500 italic text-gold-300/90 text-[12px] sm:text-[13.5px] leading-relaxed">
                    "{heroStory.quote}"
                  </blockquote>
                )}
              </div>

              <div className="pt-3 sm:pt-4 border-t border-navy-800 flex items-center justify-between gap-2.5 flex-wrap">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <AvatarInitials name={heroStory.alumniName} src={heroStory.featuredImage} size="sm" />
                  <div>
                    <span className="font-semibold text-xs sm:text-sm text-ivory block">
                      {heroStory.alumniName}
                    </span>
                    <span className="text-[10px] sm:text-xs text-ivory/60">
                      {heroStory.companyOrOrg} • {heroStory.course}
                    </span>
                  </div>
                </div>

                <Link
                  href="/spotlight/success-stories"
                  className="inline-flex items-center justify-center h-8 sm:h-9 px-3 sm:px-3.5 rounded-lg bg-gold-500 hover:bg-gold-600 text-navy-950 font-semibold text-xs transition-colors shadow-xs"
                >
                  Read Full Story
                </Link>
              </div>
            </div>

            {/* TWO SMALLER SIDE STORIES (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-3 sm:gap-5 justify-between">
              {sideStories.map((story) => (
                <div
                  key={story.id}
                  className="flex-1 flex flex-col justify-between rounded-xl border border-navy-800 bg-navy-900/60 p-3 sm:p-5 shadow-md backdrop-blur-sm transition-all hover:border-gold-500/40"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
                      <span className="text-[10px] sm:text-[11px] uppercase font-semibold text-gold-400">
                        {story.category}
                      </span>
                      <span className="text-[11px] sm:text-xs text-ivory/50 tabular-nums">
                        Class of {story.batch}
                      </span>
                    </div>

                    <h4 className="font-sans text-[14.5px] sm:text-[17px] font-semibold text-ivory line-clamp-2 leading-snug mb-1 sm:mb-1.5">
                      {story.title}
                    </h4>

                    <p className="text-[11px] sm:text-[12px] text-ivory/65 font-normal line-clamp-2 leading-normal mb-2 sm:mb-3">
                      {story.summary}
                    </p>
                  </div>

                  <div className="pt-2 sm:pt-3 border-t border-navy-800 flex items-center justify-between">
                    <span className="text-[11px] sm:text-xs font-medium text-ivory">
                      {story.alumniName}
                    </span>
                    <Link
                      href="/spotlight/success-stories"
                      className="text-xs font-semibold text-gold-400 hover:text-gold-300 inline-flex items-center gap-1"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. EXPLORE BY DOMAIN TEASER
          Background: Ivory
      ======================================================== */}
      <section className="py-7 md:py-12 bg-ivory border-b border-line">
        <div className="container mx-auto px-3.5 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Industry Classification"
            title="Explore Alumni by Domain"
            subtitle="Discover verified graduates categorized across key professional fields. Click any domain to view member rosters."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 max-w-6xl mx-auto">
            {DOMAIN_STATS.map((dom) => (
              <Link
                key={dom.id}
                href="/directory/domains"
                className="group flex flex-col justify-between rounded-xl border border-line bg-card p-3 sm:p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-sm hover:border-gold-500/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 sm:mb-2.5">
                    <span className="h-6.5 w-6.5 sm:h-7 sm:w-7 rounded-lg bg-gold-500/15 text-gold-600 flex items-center justify-center font-sans font-semibold text-xs">
                      {dom.name[0]}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-navy-950 px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-[#F3DC9C] border border-navy-800 tabular-nums">
                      <CountUp end={dom.sampleCount} /> Active
                    </span>
                  </div>

                  <h4 className="font-sans text-[14px] sm:text-[16px] font-semibold text-navy-950 group-hover:text-gold-600 transition-colors mb-0.5 sm:mb-1">
                    {dom.name}
                  </h4>

                  <p className="text-[11px] sm:text-[12px] text-slate-500 font-normal leading-normal line-clamp-2">
                    {dom.description}
                  </p>
                </div>

                <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-line/60 flex items-center justify-between text-xs font-semibold text-navy-900 group-hover:text-gold-600">
                  <span>Browse Members</span>
                  <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}

            {/* Total Summary Card (Sleek text link row, no heavy button form) */}
            <Link
              href="/directory"
              className="group rounded-xl border border-gold-500/40 bg-gradient-to-br from-navy-900 to-navy-950 p-3 sm:p-4 text-ivory flex flex-col justify-between shadow-xs hover:border-gold-400 transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 sm:mb-2.5">
                  <span className="h-6.5 w-6.5 sm:h-7 sm:w-7 rounded-lg bg-gold-500/20 text-gold-400 border border-gold-500/30 flex items-center justify-center font-sans font-semibold text-xs">
                    ✦
                  </span>
                  <span className="text-[10px] sm:text-[11px] uppercase font-bold text-gold-400 tracking-wider">
                    Full Network
                  </span>
                </div>
                <h4 className="font-sans text-[14.5px] sm:text-[16px] font-semibold text-ivory group-hover:text-gold-300 transition-colors mb-0.5 sm:mb-1">
                  260+ Verified Profiles
                </h4>
                <p className="text-[11px] sm:text-[12px] text-ivory/65 font-normal leading-normal line-clamp-2">
                  Search by batch, course, graduation year, corporate designation, and city.
                </p>
              </div>

              <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-navy-800 flex items-center justify-between text-xs font-semibold text-gold-400 group-hover:text-gold-300">
                <span>Open Full Directory</span>
                <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          8. COMPANY MARQUEE ("Our alumni work at...")
          Background: White
      ======================================================== */}
      <section className="py-6 sm:py-10 bg-white border-b border-line overflow-hidden">
        <div className="container mx-auto px-4 text-center mb-3.5 sm:mb-5">
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-muted">
            Alumni Footprints • Leading Organizations
          </span>
          <h3 className="font-sans text-[16px] sm:text-[20px] font-semibold text-navy-950 mt-0.5 sm:mt-1">
            Our Alumni Lead & Innovate
          </h3>
        </div>

        <Marquee speed={32} pauseOnHover>
          {alumniCompanies.map((company, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 rounded-lg border border-line bg-card px-3 sm:px-4 py-1.5 sm:py-2 shadow-xs hover:border-gold-500/40 transition-colors"
            >
              <Building2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gold-600 shrink-0" strokeWidth={1.75} />
              <span className="text-[11.5px] sm:text-[13px] font-medium text-navy-950 whitespace-nowrap">
                {company}
              </span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* ========================================================
          9. GIVE BACK CTA BAND (Deep Navy)
      ======================================================== */}
      <section className="py-7 md:py-12 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-ivory border-b border-navy-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-pattern opacity-20 pointer-events-none" />

        <div className="container relative z-10 mx-auto px-3.5 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-[10px] sm:text-[11px] uppercase font-semibold tracking-widest text-gold-400 block mb-1">
            Institutional Partnership & Legacy
          </span>
          <h2 className="font-sans text-[18px] sm:text-[24px] md:text-[30px] font-semibold text-ivory mb-2 sm:mb-3">
            Inspire the Next Generation of Poddar Scholars
          </h2>
          <p className="text-[12.5px] sm:text-[14px] lg:text-[15px] text-ivory/80 leading-relaxed mb-4 sm:mb-6 text-pretty max-w-[62ch] mx-auto">
            Whether delivering a guest lecture, offering campus internships, recruiting graduates, or collaborating on advisory curriculum boards, your involvement enriches the entire institution.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2.5">
            <Link
              href="/give-back"
              className="w-auto inline-flex items-center justify-center gap-1.5 h-8 sm:h-9.5 px-4 sm:px-5 rounded-lg bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-navy-950 font-semibold text-xs sm:text-sm shadow-xs transition-all"
            >
              <HeartHandshake className="h-3.5 w-3.5" />
              <span>Explore Giving Back Opportunities</span>
            </Link>

            <Link
              href="/career-hub/become-mentor"
              className="w-auto inline-flex items-center justify-center h-8 sm:h-9.5 px-4 sm:px-5 rounded-lg border border-navy-700 bg-navy-900/60 hover:bg-navy-800 text-ivory text-xs sm:text-sm font-medium transition-colors"
            >
              Become a Mentor
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          10. SUBSCRIBE STRIP
          Background: Ivory
      ======================================================== */}
      <section className="py-6 md:py-10 bg-ivory">
        <div className="container mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-line bg-card p-4 sm:p-7 shadow-xs max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="text-center md:text-left">
              <span className="text-[10px] sm:text-[11px] uppercase font-semibold tracking-wider text-gold-600 block mb-0.5 sm:mb-1">
                Stay Informed
              </span>
              <h3 className="font-sans text-[16px] sm:text-[20px] font-semibold text-navy-950 mb-0.5 sm:mb-1">
                Subscribe to the Alumni Newsletter
              </h3>
              <p className="text-[11.5px] sm:text-[13px] text-muted">
                Receive quarterly alumni magazines, invitations, and career opportunities in your inbox.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto shrink-0"
            >
              <div className="relative w-full sm:w-64">
                <Mail className="absolute left-3 top-2.5 sm:top-3 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted" />
                <Input
                  type="email"
                  placeholder="alumnus@domain.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="pl-8.5 sm:pl-9 h-9 sm:h-10 border-line rounded-lg text-xs sm:text-sm w-full bg-card"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-auto h-8.5 sm:h-10 px-4 sm:px-5 rounded-lg bg-navy-900 hover:bg-navy-800 text-gold-300 font-semibold text-xs whitespace-nowrap shadow-xs self-center sm:self-auto"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
