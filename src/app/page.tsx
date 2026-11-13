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

  // Mouse drag-to-scroll support for desktop
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const checkScroll = useCallback(() => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);
  }, []);

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
    if (carouselRef.current) {
      const card = carouselRef.current.querySelector<HTMLElement>("[data-event-card]");
      const scrollAmount = card ? card.offsetWidth + 24 : carouselRef.current.clientWidth * 0.85;
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollNext = () => {
    if (carouselRef.current) {
      const card = carouselRef.current.querySelector<HTMLElement>("[data-event-card]");
      const scrollAmount = card ? card.offsetWidth + 24 : carouselRef.current.clientWidth * 0.85;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
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
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-10 lg:pb-12 flex flex-col items-center text-center">
          {/* Institutional Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1 mb-4 sm:mb-5 backdrop-blur-md"
          >
            <Sparkles className="h-3 w-3 text-gold-400" />
            <span className="text-[11px] sm:text-xs uppercase font-semibold tracking-wider text-gold-300">
              Poddar Group of Institutions • Alumni Association
            </span>
          </motion.div>

          {/* Masked Headline Reveal: "Once Poddar, always Poddar" */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif font-semibold text-ivory tracking-tight text-balance text-[30px] sm:text-[38px] lg:text-[44px] leading-[1.18]"
            >
              Once Poddar, always Poddar.
            </motion.h1>
          </div>

          {/* Gold Underline Draw */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="h-1 w-20 rounded-full bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 mb-4 sm:mb-5 origin-center"
          />

          {/* Supporting Headline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-[15px] sm:text-[16px] text-ivory/80 max-w-[62ch] font-normal leading-relaxed text-pretty mb-6 sm:mb-8"
          >
            A network of thinkers, entrepreneurs, and leaders shaping diverse industries. Reconnect, mentor, and grow together.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
          >
            <MagneticButton className="w-full sm:w-auto">
              <Link
                href="/join"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-10 sm:h-11 px-6 sm:px-7 rounded-lg bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-navy-950 font-semibold text-sm shadow-md hover:shadow-gold-500/20 active:scale-95 transition-all"
              >
                <span>Join the Network</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </MagneticButton>

            <MagneticButton className="w-full sm:w-auto">
              <Link
                href="/directory"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-10 sm:h-11 px-6 sm:px-7 rounded-lg border border-navy-700 bg-navy-900/60 hover:bg-navy-800 text-ivory font-semibold text-sm backdrop-blur-md active:scale-95 transition-all"
              >
                <Compass className="h-4 w-4 text-gold-400" />
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
      <section className="py-10 md:py-14 bg-white border-b border-line">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Portal Navigation"
            title="What would you like to explore?"
            subtitle="Direct gateways into primary alumni programs, verified rosters, and collaborative initiatives."
          />

          <Reveal staggerChildren={0.06} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5">
            {quickActions.map((tile) => {
              const Icon = tile.icon;
              return (
                <RevealItem key={tile.href}>
                  <Link
                    href={tile.href}
                    className="group flex flex-col justify-between h-full p-3.5 sm:p-4 rounded-xl border border-line bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-sm hover:border-gold-500/40 relative"
                  >
                    <div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-500/15 text-gold-600 mb-2.5 group-hover:bg-navy-900 group-hover:text-gold-300 transition-colors">
                        <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                      </div>
                      <h4 className="font-serif font-semibold text-[14px] sm:text-[15px] text-navy-950 group-hover:text-gold-600 transition-colors mb-1">
                        {tile.title}
                      </h4>
                      <p className="text-[12px] sm:text-[13px] text-muted leading-tight line-clamp-2">
                        {tile.desc}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-line/60 flex items-center text-[11px] font-semibold text-navy-900 group-hover:text-gold-600">
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
      <section className="py-10 md:py-14 bg-ivory border-b border-line">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-7">
            <SectionHeader
              eyebrow="Official Notices & Milestones"
              title="Latest from the Alumni Bulletin"
              subtitle="Timely governance announcements, campus research developments, and grant opportunities."
              align="left"
              className="mb-0"
            />
            <Link
              href="/bulletin"
              className="inline-flex items-center gap-1.5 border border-line bg-card hover:bg-gold-500/10 text-navy-950 font-semibold rounded-lg text-xs h-9 sm:h-10 px-4 shrink-0 transition-colors shadow-xs"
            >
              <span>View All Announcements</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <Reveal staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {bulletinHighlights.map((item) => (
              <RevealItem key={item.id}>
                <div className="flex flex-col justify-between h-full rounded-xl border border-line bg-card p-4 sm:p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-sm">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-600">
                        {item.category}
                      </span>
                      <span className="text-xs text-muted tabular-nums">{item.date}</span>
                    </div>

                    <h4 className="font-serif text-[16px] sm:text-[17px] font-semibold text-navy-950 line-clamp-2 mb-2 leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-[13px] text-muted leading-relaxed line-clamp-3 mb-4">
                      {item.excerpt}
                    </p>
                  </div>

                  <Link
                    href={`/bulletin/announcements`}
                    className="inline-flex items-center text-xs font-semibold text-navy-900 hover:text-gold-600 transition-colors pt-2.5 border-t border-line/60"
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

          {/* Smooth Scrollable Carousel Viewport */}
          <div
            ref={carouselRef}
            data-lenis-prevent
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="overflow-x-auto scroll-smooth snap-x snap-mandatory flex gap-4 sm:gap-5 pb-3 -mx-4 px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
          >
            {eventHighlights.map((evt) => (
              <div
                key={evt.id}
                data-event-card
                className="flex-[0_0_88%] sm:flex-[0_0_calc((100%-20px)/2)] lg:flex-[0_0_calc((100%-40px)/3)] min-w-0 snap-start"
              >
                <div className="flex flex-col h-full rounded-xl border border-line bg-card shadow-xs overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-sm">
                  {/* Event Image Banner with Date Badge (max 180px, aspect 16/10) */}
                  <div className="relative h-38 sm:h-44 max-h-[180px] w-full overflow-hidden bg-navy-950 aspect-[16/10]">
                    <ImageWithFallback
                      src={evt.imageUrl}
                      alt={evt.title}
                      aspectRatio="16/10"
                      fill
                      overlay
                      containerClassName="w-full h-full"
                    />
                    <div className="absolute top-2.5 left-2.5 rounded-md bg-navy-950/95 border border-gold-500/40 px-2.5 py-1 text-center backdrop-blur-md shadow-sm">
                      <span className="block text-[10px] sm:text-[11px] font-bold text-[#E9C46A] uppercase tracking-wider">
                        {new Date(evt.date).toLocaleString("default", { month: "short" }).toUpperCase()}
                      </span>
                      <span className="block text-lg font-serif font-bold text-white leading-none mt-0.5 tabular-nums">
                        {new Date(evt.date).getDate()}
                      </span>
                    </div>
                  </div>

                  {/* Event Body */}
                  <div className="p-4 sm:p-4.5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-muted mb-1.5">
                        <Clock className="h-3.5 w-3.5 text-gold-600" />
                        <span className="tabular-nums">{evt.time}</span>
                      </div>

                      <h4 className="font-serif text-[15px] sm:text-[16px] font-semibold text-navy-950 line-clamp-2 leading-snug mb-1.5">
                        {evt.title}
                      </h4>

                      <div className="flex items-start gap-1.5 text-xs text-ink/75 mb-2 line-clamp-1">
                        <MapPin className="h-3.5 w-3.5 text-gold-600 shrink-0 mt-0.5" />
                        <span>{evt.location}</span>
                      </div>

                      <p className="text-[13px] text-muted line-clamp-2 leading-relaxed">
                        {evt.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-line flex items-center justify-between gap-3">
                      <span className="text-xs text-muted tabular-nums">
                        {evt.attendeeCount} Registered
                      </span>
                      <Link
                        href="/reunions/register"
                        className="inline-flex items-center justify-center h-8 px-3 rounded-lg bg-navy-900 hover:bg-navy-800 text-gold-300 text-xs font-semibold transition-colors"
                      >
                        Register Online
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom helper & view all link */}
          <div className="mt-6 flex items-center justify-between text-xs text-muted flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-gold-500 animate-pulse" />
              <span>Showing all {eventHighlights.length} upcoming gatherings • Scroll or use arrows to view all</span>
            </div>
            <Link
              href="/reunions/upcoming"
              className="text-xs font-semibold text-navy-950 hover:text-gold-600 inline-flex items-center gap-1 transition-colors group"
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
      <section className="py-10 md:py-14 bg-navy-950 text-ivory border-b border-navy-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-pattern opacity-25 pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Trailblazers & Leadership"
            title="Alumni Spotlight: Stories of Impact"
            subtitle="Celebrating graduates making significant contributions to global enterprise, science, and societal welfare."
            theme="navy"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
            {/* LARGE FEATURED STORY (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-navy-800 bg-navy-900/80 p-5 sm:p-6 shadow-xl backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Quote className="h-24 w-24 text-gold-500" />
              </div>

              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <StatusBadge status="gold" label={heroStory.category} />
                  <span className="text-xs text-ivory/60 tabular-nums">
                    Class of {heroStory.batch}
                  </span>
                </div>

                <h3 className="font-serif text-[20px] sm:text-[24px] font-semibold text-ivory leading-tight mb-3">
                  {heroStory.title}
                </h3>

                <p className="text-[14px] sm:text-[15px] text-ivory/80 leading-relaxed mb-4">
                  {heroStory.summary}
                </p>

                {heroStory.quote && (
                  <blockquote className="my-4 pl-3.5 border-l-2 border-gold-500 italic text-gold-300/90 text-[13.5px] leading-relaxed">
                    "{heroStory.quote}"
                  </blockquote>
                )}
              </div>

              <div className="pt-4 border-t border-navy-800 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2.5">
                  <AvatarInitials name={heroStory.alumniName} src={heroStory.featuredImage} size="md" />
                  <div>
                    <span className="font-semibold text-sm text-ivory block">
                      {heroStory.alumniName}
                    </span>
                    <span className="text-xs text-ivory/60">
                      {heroStory.companyOrOrg} • {heroStory.course}
                    </span>
                  </div>
                </div>

                <Link
                  href="/spotlight/success-stories"
                  className="inline-flex items-center justify-center h-9 px-3.5 rounded-lg bg-gold-500 hover:bg-gold-600 text-navy-950 font-semibold text-xs transition-colors shadow-xs"
                >
                  Read Full Story
                </Link>
              </div>
            </div>

            {/* TWO SMALLER SIDE STORIES (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-5 justify-between">
              {sideStories.map((story) => (
                <div
                  key={story.id}
                  className="flex-1 flex flex-col justify-between rounded-xl border border-navy-800 bg-navy-900/60 p-4 sm:p-5 shadow-md backdrop-blur-sm transition-all hover:border-gold-500/40"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] uppercase font-semibold text-gold-400">
                        {story.category}
                      </span>
                      <span className="text-xs text-ivory/50 tabular-nums">
                        Class of {story.batch}
                      </span>
                    </div>

                    <h4 className="font-serif text-[16px] sm:text-[17px] font-semibold text-ivory line-clamp-2 leading-snug mb-1.5">
                      {story.title}
                    </h4>

                    <p className="text-[13px] text-ivory/70 line-clamp-2 leading-relaxed mb-3">
                      {story.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-navy-800 flex items-center justify-between">
                    <span className="text-xs font-medium text-ivory">
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
      <section className="py-10 md:py-14 bg-ivory border-b border-line">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Industry Classification"
            title="Explore Alumni by Domain"
            subtitle="Discover verified graduates categorized across key professional fields. Click any domain to view member rosters."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 max-w-6xl mx-auto">
            {DOMAIN_STATS.map((dom) => (
              <Link
                key={dom.id}
                href="/directory/domains"
                className="group flex flex-col justify-between rounded-xl border border-line bg-card p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-sm hover:border-gold-500/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="h-7 w-7 rounded-lg bg-gold-500/15 text-gold-600 flex items-center justify-center font-serif font-semibold text-xs">
                      {dom.name[0]}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-navy-950 px-2 py-0.5 text-[11px] font-semibold text-[#F3DC9C] border border-navy-800 tabular-nums">
                      <CountUp end={dom.sampleCount} /> Active
                    </span>
                  </div>

                  <h4 className="font-serif text-[15px] sm:text-[16px] font-semibold text-navy-950 group-hover:text-gold-600 transition-colors mb-1">
                    {dom.name}
                  </h4>

                  <p className="text-[12px] sm:text-[13px] text-muted leading-relaxed line-clamp-2">
                    {dom.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-line/60 flex items-center justify-between text-xs font-semibold text-navy-900 group-hover:text-gold-600">
                  <span>Browse Members</span>
                  <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}

            {/* Total Summary Card */}
            <div className="rounded-xl border border-gold-500/30 bg-gradient-to-br from-navy-900 to-navy-950 p-4 text-ivory flex flex-col justify-between shadow-xs">
              <div>
                <span className="text-[11px] uppercase font-semibold text-gold-400 block mb-1 tracking-wider">
                  Comprehensive Network
                </span>
                <h4 className="font-serif text-[16px] sm:text-[17px] font-semibold text-ivory mb-1.5">
                  260+ Verified Profiles
                </h4>
                <p className="text-[12px] sm:text-[13px] text-ivory/70 leading-relaxed">
                  Search by batch, course, graduation year, corporate designation, and city.
                </p>
              </div>

              <Link
                href="/directory"
                className="mt-3 inline-flex items-center justify-center bg-gold-500 hover:bg-gold-600 text-navy-950 font-semibold text-xs h-8 px-3.5 rounded-lg transition-colors shadow-xs"
              >
                Open Full Directory
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          8. COMPANY MARQUEE ("Our alumni work at...")
          Background: White
      ======================================================== */}
      <section className="py-8 sm:py-10 bg-white border-b border-line overflow-hidden">
        <div className="container mx-auto px-4 text-center mb-5">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted">
            Alumni Footprints • Leading Organizations
          </span>
          <h3 className="font-serif text-[18px] sm:text-[20px] font-semibold text-navy-950 mt-1">
            Our Alumni Lead & Innovate
          </h3>
        </div>

        <Marquee speed={32} pauseOnHover>
          {alumniCompanies.map((company, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 rounded-lg border border-line bg-card px-4 py-2 shadow-xs hover:border-gold-500/40 transition-colors"
            >
              <Building2 className="h-3.5 w-3.5 text-gold-600 shrink-0" strokeWidth={1.75} />
              <span className="text-[13px] font-medium text-navy-950 whitespace-nowrap">
                {company}
              </span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* ========================================================
          9. GIVE BACK CTA BAND (Deep Navy)
      ======================================================== */}
      <section className="py-10 md:py-14 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-ivory border-b border-navy-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-pattern opacity-20 pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-[11px] uppercase font-semibold tracking-widest text-gold-400 block mb-1.5">
            Institutional Partnership & Legacy
          </span>
          <h2 className="font-serif text-[22px] sm:text-[26px] md:text-[30px] font-semibold text-ivory mb-3">
            Inspire the Next Generation of Poddar Scholars
          </h2>
          <p className="text-[14px] sm:text-[15px] text-ivory/80 leading-relaxed mb-6 text-pretty max-w-[62ch] mx-auto">
            Whether delivering a guest lecture, offering campus internships, recruiting graduates, or collaborating on advisory curriculum boards, your involvement enriches the entire institution.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <Link
              href="/give-back"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-10 px-5 rounded-lg bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-navy-950 font-semibold text-xs sm:text-sm shadow-xs transition-all"
            >
              <HeartHandshake className="h-4 w-4" />
              <span>Explore Giving Back Opportunities</span>
            </Link>

            <Link
              href="/career-hub/become-mentor"
              className="w-full sm:w-auto inline-flex items-center justify-center h-10 px-5 rounded-lg border border-navy-700 bg-navy-900/60 hover:bg-navy-800 text-ivory text-xs sm:text-sm font-medium transition-colors"
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
      <section className="py-8 md:py-10 bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-line bg-card p-5 sm:p-7 shadow-xs max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
            <div className="text-center md:text-left">
              <span className="text-[11px] uppercase font-semibold tracking-wider text-gold-600 block mb-1">
                Stay Informed
              </span>
              <h3 className="font-serif text-[18px] sm:text-[20px] font-semibold text-navy-950 mb-1">
                Subscribe to the Alumni Newsletter
              </h3>
              <p className="text-xs sm:text-[13px] text-muted">
                Receive quarterly alumni magazines, invitations, and career opportunities in your inbox.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto shrink-0"
            >
              <div className="relative w-full sm:w-64">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted" />
                <Input
                  type="email"
                  placeholder="alumnus@domain.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="pl-9 h-10 border-line rounded-lg text-sm w-full bg-card"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full sm:w-auto h-10 px-5 rounded-lg bg-navy-900 hover:bg-navy-800 text-gold-300 font-semibold text-xs whitespace-nowrap shadow-xs"
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
