"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { IMAGES } from "@/data/images";
import { getEvents } from "@/lib/api";
import { PortalEvent } from "@/data/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Video,
  ArrowRight,
  Sparkles,
  Ticket,
  Image as ImageIcon,
  History,
} from "lucide-react";

export default function ReunionsOverviewPage() {
  const [events, setEvents] = useState<PortalEvent[]>([]);
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState({ days: 49, hours: 14, minutes: 22, seconds: 40 });

  useEffect(() => {
    setEvents(getEvents());
    setMounted(true);

    // Target date: Dec 19, 2026
    const target = new Date("2026-12-19T10:00:00+05:30").getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const flagshipEvent = events.find((e) => e.type === "reunion") || events[0];

  const tracks = [
    {
      title: "Upcoming Events",
      href: "/reunions/upcoming",
      description: "Browse comprehensive calendar of reunions, technical conclaves, and leadership summits.",
      icon: Calendar,
      badge: `${events.length} Events`,
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      title: "Batch Reunions",
      href: "/reunions/batch",
      description: "Decennial, Silver Jubilee, and milestone batch homecomings celebrating shared college memories.",
      icon: History,
      badge: "Milestones",
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
    {
      title: "Webinars & Workshops",
      href: "/reunions/webinars",
      description: "Interactive virtual knowledge exchange sessions led by alumni trailblazers and industry pioneers.",
      icon: Video,
      badge: "Virtual",
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    },
    {
      title: "Register Online",
      href: "/reunions/register",
      description: "Reserve your seat, download instant digital calendar pass (.ics), and access attendee roster.",
      icon: Ticket,
      badge: "Passes Open",
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Photos & Highlights",
      href: "/reunions/gallery",
      description: "Immersive photo gallery capturing convocation ceremonies, reunions, and campus festivals.",
      icon: ImageIcon,
      badge: "14+ Albums",
      color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <PageHero
        title="Reunions & Gatherings"
        subtitle="Rekindle cherished campus memories, expand your professional circle, and celebrate institutional heritage."
        eyebrow="Campus Homecomings & Conclaves"
        backgroundImage={IMAGES.events[0].src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Reunions & Gatherings", href: "/reunions" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Navigation Tracks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-16">
          {tracks.map((track, idx) => {
            const Icon = track.icon;
            return (
              <Reveal key={track.href} delay={idx * 0.05}>
                <Link href={track.href} className="block group h-full">
                  <Card className="h-full border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-5 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className={`p-2.5 rounded-xl ${track.color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <Badge variant="outline" className="text-[11px]">
                            {track.badge}
                          </Badge>
                        </div>
                        <h3 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors">
                          {track.title}
                        </h3>
                        <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                          {track.description}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-amber-600">
                        View Track
                        <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* Flagship Event Hero with Live Countdown */}
        {flagshipEvent && (
          <Reveal className="mb-16">
            <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-navy-950 via-navy-900 to-slate-900 text-white p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <div className="w-full lg:w-5/12 aspect-[4/3] rounded-2xl overflow-hidden relative shadow-2xl border border-white/10 shrink-0">
                  <img
                    src={flagshipEvent.imageUrl}
                    alt={flagshipEvent.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                    <span className="bg-amber-500 text-navy-950 font-bold px-3 py-1 rounded-full">
                      Flagship Homecoming
                    </span>
                    <span className="text-white/90 font-mono">
                      {flagshipEvent.attendeeCount} / {flagshipEvent.capacity} Confirmed
                    </span>
                  </div>
                </div>

                <div className="w-full lg:w-7/12">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                      Dec 19, 2026 • Main Campus
                    </Badge>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold leading-tight">
                    {flagshipEvent.title}
                  </h2>

                  <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                    {flagshipEvent.description}
                  </p>

                  {/* Countdown Timer */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-3">
                      Event Countdown
                    </div>
                    {mounted ? (
                      <div className="grid grid-cols-4 gap-3 max-w-sm">
                        {[
                          { label: "Days", val: countdown.days },
                          { label: "Hours", val: countdown.hours },
                          { label: "Mins", val: countdown.minutes },
                          { label: "Secs", val: countdown.seconds },
                        ].map((t) => (
                          <div
                            key={t.label}
                            className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-center"
                          >
                            <div className="text-xl sm:text-2xl font-bold font-mono text-white">
                              {String(t.val).padStart(2, "0")}
                            </div>
                            <div className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5">
                              {t.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-slate-400">Loading countdown...</div>
                    )}
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Button asChild className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold h-11 px-6">
                      <Link href={`/reunions/register?event=${flagshipEvent.id}`}>
                        <Ticket className="w-4 h-4 mr-2" />
                        Reserve Your Seat
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 h-11 px-5">
                      <Link href="/reunions/upcoming">Browse All Events</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Upcoming Calendar Preview */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <SectionHeader
              eyebrow="Event Calendar"
              title="Next In The Network"
              description="Upcoming masterclasses, webinars, and regional chapter gatherings."
              align="left"
            />
            <Button asChild variant="outline">
              <Link href="/reunions/upcoming">
                View Full Calendar
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.slice(1, 4).map((event, idx) => (
              <Reveal key={event.id} delay={idx * 0.05}>
                <Card className="border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-lg transition-all h-full flex flex-col justify-between group overflow-hidden">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-navy-950/80 backdrop-blur-sm text-white px-2.5 py-1 rounded text-xs font-semibold capitalize">
                      {event.type}
                    </div>
                    {event.isVirtual && (
                      <div className="absolute top-3 right-3 bg-blue-600/90 text-white px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1">
                        <Video className="w-3 h-3" />
                        Virtual
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-amber-600 font-semibold mb-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {event.date} • {event.time}
                      </div>

                      <h4 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors line-clamp-2">
                        {event.title}
                      </h4>

                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>

                      <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                        {event.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {event.attendeeCount} registered
                      </div>
                      <Button asChild size="sm" className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold text-xs">
                        <Link href={`/reunions/register?event=${event.id}`}>Register</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

