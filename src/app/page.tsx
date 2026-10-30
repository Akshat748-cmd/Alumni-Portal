"use client";

import React, { useState } from "react";
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
import useEmblaCarousel from "embla-carousel-react";
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
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

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
  const eventHighlights = INITIAL_EVENTS.slice(0, 5);
  const heroStory = INITIAL_SUCCESS_STORIES[0];
  const sideStories = INITIAL_SUCCESS_STORIES.slice(1, 3);

  return (
    <div className="flex-1 flex flex-col">
      {/* ========================================================
          1. HERO SECTION (Full-height svh, masked reveal, navy overlay)
      ======================================================== */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-navy-950 text-white">
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
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />

        {/* Hero Content */}
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 flex flex-col items-center text-center">
          {/* Institutional Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 mb-6 backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5 text-gold-400" />
            <span className="text-xs uppercase font-bold tracking-widest text-gold-300">
              Poddar Group of Institutions • Alumni Association
            </span>
          </motion.div>

          {/* Masked Headline Reveal: "Once Poddar, always Poddar" */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif font-bold text-ivory tracking-tight text-balance"
            >
              Once Poddar, always Poddar.
            </motion.h1>
          </div>

          {/* Gold Underline Draw */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="h-1.5 w-24 rounded-full bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 mb-6 origin-center"
          />

          {/* Supporting Headline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-ivory/80 max-w-2xl font-normal leading-relaxed text-pretty mb-10"
          >
            A network of thinkers, entrepreneurs, and leaders shaping diverse industries. Reconnect, mentor, and grow together.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <MagneticButton className="w-full sm:w-auto">
              <Link
                href="/join"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-13 px-8 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-navy-950 font-bold text-base shadow-xl hover:shadow-gold-500/20 active:scale-95 transition-all"
              >
                <span>Join the Network</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </MagneticButton>

            <MagneticButton className="w-full sm:w-auto">
              <Link
                href="/directory"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-13 px-8 rounded-xl border border-navy-700 bg-navy-900/60 hover:bg-navy-800 text-ivory font-semibold text-base backdrop-blur-md active:scale-95 transition-all"
              >
                <Compass className="h-4 w-4 text-gold-400" />
                <span>Explore Directory</span>
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Bottom indicator hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-xs text-ivory/40 pointer-events-none hidden sm:block">
          Scroll down to discover recent updates & reunions
        </div>
      </section>

      {/* ========================================================
          2. STAT COUNTERS (2x2 on mobile, 4 across on desktop)
          Background: Ivory
      ======================================================== */}
      <section className="py-12 md:py-16 bg-ivory border-b border-line">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
      <section className="py-14 md:py-20 bg-white border-b border-line">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Portal Navigation"
            title="What would you like to explore?"
            subtitle="Direct gateways into primary alumni programs, verified rosters, and collaborative initiatives."
          />

          <Reveal staggerChildren={0.08} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-5">
            {quickActions.map((tile) => {
              const Icon = tile.icon;
              return (
                <RevealItem key={tile.href}>
                  <Link
                    href={tile.href}
                    className="group flex flex-col justify-between h-full p-4 sm:p-5 rounded-xl border border-line bg-card shadow-navy-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-navy-hover hover:border-gold-500/40 relative"
                  >
                    <div>
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/15 text-gold-600 mb-3 group-hover:bg-navy-900 group-hover:text-gold-300 transition-colors">
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </div>
                      <h4 className="font-serif font-bold text-sm sm:text-base text-navy-950 group-hover:text-gold-600 transition-colors mb-1">
                        {tile.title}
                      </h4>
                      <p className="text-xs text-muted leading-tight line-clamp-2">
                        {tile.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-line/60 flex items-center text-[11px] font-bold text-navy-900 group-hover:text-gold-600">
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
      <section className="py-16 md:py-24 bg-ivory border-b border-line">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <SectionHeader
              eyebrow="Official Notices & Milestones"
              title="Latest from the Alumni Bulletin"
              subtitle="Timely governance announcements, campus research developments, and grant opportunities."
              align="left"
              className="mb-0"
            />
            <Link
              href="/bulletin"
              className="inline-flex items-center gap-1.5 border border-line bg-card hover:bg-gold-500/10 text-navy-950 font-semibold rounded-xl text-xs h-11 px-5 shrink-0 transition-colors shadow-sm"
            >
              <span>View All Announcements</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <Reveal staggerChildren={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bulletinHighlights.map((item) => (
              <RevealItem key={item.id}>
                <div className="flex flex-col justify-between h-full rounded-xl border border-line bg-card p-6 shadow-navy-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-navy-hover">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gold-600">
                        {item.category}
                      </span>
                      <span className="text-xs text-muted font-mono">{item.date}</span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-navy-950 line-clamp-2 mb-3 leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-xs text-muted leading-relaxed line-clamp-3 mb-6">
                      {item.excerpt}
                    </p>
                  </div>

                  <Link
                    href={`/bulletin/announcements`}
                    className="inline-flex items-center text-xs font-bold text-navy-900 hover:text-gold-600 transition-colors pt-3 border-t border-line/60"
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
      <section className="py-16 md:py-24 bg-white border-b border-line overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <SectionHeader
              eyebrow="Gatherings & Conclaves"
              title="Upcoming Reunions & Workshops"
              subtitle="Swipe to browse scheduled regional chapter meets, webinars, and batch anniversaries."
              align="left"
              className="mb-0"
            />

            {/* Carousel navigation buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="icon"
                onClick={scrollPrev}
                className="h-10 w-10 rounded-xl border-line text-navy-950 hover:bg-gold-500/10 cursor-pointer"
                aria-label="Previous events"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={scrollNext}
                className="h-10 w-10 rounded-xl border-line text-navy-950 hover:bg-gold-500/10 cursor-pointer"
                aria-label="Next events"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Embla Carousel Viewport */}
          <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
            <div className="flex gap-6">
              {eventHighlights.map((evt) => (
                <div
                  key={evt.id}
                  className="flex-[0_0_88%] sm:flex-[0_0_55%] lg:flex-[0_0_36%] min-w-0"
                >
                  <div className="flex flex-col h-full rounded-xl border border-line bg-card shadow-navy-soft overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-navy-hover">
                    {/* Event Image Banner with Date Badge */}
                    <div className="relative h-48 w-full overflow-hidden bg-navy-950">
                      <ImageWithFallback
                        src={evt.imageUrl}
                        alt={evt.title}
                        aspectRatio="16/9"
                        fill
                        overlay
                        containerClassName="w-full h-full"
                      />
                      <div className="absolute top-3 left-3 rounded-lg bg-navy-950/90 border border-gold-500/40 px-3 py-1 text-center backdrop-blur-md">
                        <span className="block text-[10px] font-bold text-gold-400 uppercase tracking-widest">
                          {new Date(evt.date).toLocaleString("default", { month: "short" })}
                        </span>
                        <span className="block text-lg font-serif font-bold text-ivory leading-none">
                          {new Date(evt.date).getDate()}
                        </span>
                      </div>
                    </div>

                    {/* Event Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-muted mb-2">
                          <Clock className="h-3.5 w-3.5 text-gold-600" />
                          <span>{evt.time}</span>
                        </div>

                        <h4 className="font-serif text-base font-bold text-navy-950 line-clamp-2 leading-snug mb-2">
                          {evt.title}
                        </h4>

                        <div className="flex items-start gap-1.5 text-xs text-ink/75 mb-3 line-clamp-1">
                          <MapPin className="h-3.5 w-3.5 text-gold-600 shrink-0 mt-0.5" />
                          <span>{evt.location}</span>
                        </div>

                        <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                          {evt.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-line flex items-center justify-between gap-3">
                        <span className="text-xs text-muted font-mono">
                          {evt.attendeeCount} Registered
                        </span>
                        <Link
                          href="/reunions/register"
                          className="inline-flex items-center justify-center h-8 px-3.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-gold-300 text-xs font-semibold transition-colors"
                        >
                          Register Online
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. ALUMNI SPOTLIGHT (1 large feature + 2 side stories)
          Background: Deep Navy
      ======================================================== */}
      <section className="py-16 md:py-24 bg-navy-950 text-ivory border-b border-navy-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-pattern opacity-25 pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Trailblazers & Leadership"
            title="Alumni Spotlight: Stories of Impact"
            subtitle="Celebrating graduates making significant contributions to global enterprise, science, and societal welfare."
            theme="navy"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* LARGE FEATURED STORY (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-navy-800 bg-navy-900/80 p-6 sm:p-8 shadow-2xl backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Quote className="h-32 w-32 text-gold-500" />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <StatusBadge status="gold" label={heroStory.category} />
                  <span className="text-xs text-ivory/60 font-mono">
                    Class of {heroStory.batch}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory leading-tight mb-4">
                  {heroStory.title}
                </h3>

                <p className="text-sm text-ivory/80 leading-relaxed mb-6">
                  {heroStory.summary}
                </p>

                {heroStory.quote && (
                  <blockquote className="my-6 pl-4 border-l-2 border-gold-500 italic text-gold-300/90 text-sm leading-relaxed">
                    "{heroStory.quote}"
                  </blockquote>
                )}
              </div>

              <div className="pt-6 border-t border-navy-800 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <AvatarInitials name={heroStory.alumniName} src={heroStory.featuredImage} size="lg" />
                  <div>
                    <span className="font-bold text-sm text-ivory block">
                      {heroStory.alumniName}
                    </span>
                    <span className="text-xs text-ivory/60">
                      {heroStory.companyOrOrg} • {heroStory.course}
                    </span>
                  </div>
                </div>

                <Link
                  href="/spotlight/success-stories"
                  className="inline-flex items-center justify-center h-10 px-4 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs transition-colors shadow-sm"
                >
                  Read Full Story
                </Link>
              </div>
            </div>

            {/* TWO SMALLER SIDE STORIES (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
              {sideStories.map((story) => (
                <div
                  key={story.id}
                  className="flex-1 flex flex-col justify-between rounded-2xl border border-navy-800 bg-navy-900/60 p-6 shadow-xl backdrop-blur-sm transition-all hover:border-gold-500/40"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] uppercase font-bold text-gold-400">
                        {story.category}
                      </span>
                      <span className="text-xs text-ivory/50 font-mono">
                        Class of {story.batch}
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-ivory line-clamp-2 leading-snug mb-2">
                      {story.title}
                    </h4>

                    <p className="text-xs text-ivory/70 line-clamp-2 leading-relaxed mb-4">
                      {story.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-navy-800 flex items-center justify-between">
                    <span className="text-xs font-semibold text-ivory">
                      {story.alumniName}
                    </span>
                    <Link
                      href="/spotlight/success-stories"
                      className="text-xs font-bold text-gold-400 hover:text-gold-300 inline-flex items-center gap-1"
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
      <section className="py-16 md:py-24 bg-ivory border-b border-line">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Industry Classification"
            title="Explore Alumni by Domain"
            subtitle="Discover verified graduates categorized across key professional fields. Click any domain to view member rosters."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {DOMAIN_STATS.map((dom) => (
              <Link
                key={dom.id}
                href="/directory/domains"
                className="group flex flex-col justify-between rounded-xl border border-line bg-card p-5 shadow-navy-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-navy-hover hover:border-gold-500/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="h-8 w-8 rounded-lg bg-gold-500/15 text-gold-600 flex items-center justify-center font-serif font-bold text-sm">
                      {dom.name[0]}
                    </span>
                    <span className="rounded-full bg-navy-950 px-2.5 py-0.5 text-xs font-bold text-gold-400">
                      <CountUp end={dom.sampleCount} /> Active
                    </span>
                  </div>

                  <h4 className="font-serif text-base font-bold text-navy-950 group-hover:text-gold-600 transition-colors mb-1.5">
                    {dom.name}
                  </h4>

                  <p className="text-xs text-muted leading-relaxed line-clamp-2">
                    {dom.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between text-xs font-bold text-navy-900 group-hover:text-gold-600">
                  <span>Browse Members</span>
                  <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}

            {/* Total Summary Card */}
            <div className="rounded-xl border border-gold-500/30 bg-gradient-to-br from-navy-900 to-navy-950 p-5 text-ivory flex flex-col justify-between shadow-md">
              <div>
                <span className="text-xs uppercase font-bold text-gold-400 block mb-1">
                  Comprehensive Network
                </span>
                <h4 className="font-serif text-lg font-bold text-ivory mb-2">
                  260+ Verified Profiles
                </h4>
                <p className="text-xs text-ivory/70 leading-relaxed">
                  Search by batch, course, graduation year, corporate designation, and city.
                </p>
              </div>

              <Link
                href="/directory"
                className="mt-4 inline-flex items-center justify-center bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs h-9 px-4 rounded-lg transition-colors shadow-sm"
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
      <section className="py-12 bg-white border-b border-line overflow-hidden">
        <div className="container mx-auto px-4 text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-muted">
            Alumni Footprints • Leading Organizations
          </span>
          <h3 className="font-serif text-xl font-bold text-navy-950 mt-1">
            Our Alumni Lead & Innovate
          </h3>
        </div>

        <Marquee speed={32} pauseOnHover>
          {alumniCompanies.map((company, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 rounded-xl border border-line bg-card px-5 py-3 shadow-sm hover:border-gold-500/40 transition-colors"
            >
              <Building2 className="h-4 w-4 text-gold-600 shrink-0" strokeWidth={1.75} />
              <span className="text-sm font-semibold text-navy-950 whitespace-nowrap">
                {company}
              </span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* ========================================================
          9. GIVE BACK CTA BAND (Deep Navy)
      ======================================================== */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-ivory border-b border-navy-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-pattern opacity-20 pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs uppercase font-bold tracking-widest text-gold-400 block mb-2">
            Institutional Partnership & Legacy
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-ivory mb-4">
            Inspire the Next Generation of Poddar Scholars
          </h2>
          <p className="text-sm sm:text-base text-ivory/80 leading-relaxed mb-8 text-pretty">
            Whether delivering a guest lecture, offering campus internships, recruiting graduates, or collaborating on advisory curriculum boards, your involvement enriches the entire institution.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/give-back"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-navy-950 font-bold text-sm shadow-md transition-all"
            >
              <HeartHandshake className="h-4 w-4" />
              <span>Explore Giving Back Opportunities</span>
            </Link>

            <Link
              href="/career-hub/become-mentor"
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-7 rounded-xl border border-navy-700 bg-navy-900/60 hover:bg-navy-800 text-ivory text-sm font-semibold transition-colors"
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
      <section className="py-12 md:py-16 bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-line bg-card p-6 sm:p-10 shadow-navy-soft max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <span className="text-xs uppercase font-bold tracking-wider text-gold-600 block mb-1">
                Stay Informed
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-950 mb-1">
                Subscribe to the Alumni Newsletter
              </h3>
              <p className="text-xs sm:text-sm text-muted">
                Receive quarterly alumni magazines, invitations, and career opportunities in your inbox.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto shrink-0"
            >
              <div className="relative w-full sm:w-72">
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-muted" />
                <Input
                  type="email"
                  placeholder="alumnus@domain.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="pl-10 h-11 border-line rounded-xl text-sm w-full bg-card"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full sm:w-auto h-11 px-6 rounded-xl bg-navy-900 hover:bg-navy-800 text-gold-300 font-semibold text-xs whitespace-nowrap shadow-sm"
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
