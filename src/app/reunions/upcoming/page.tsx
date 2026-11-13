"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { EmptyState } from "@/components/common/EmptyState";
import { Reveal } from "@/components/motion/Reveal";
import { IMAGES } from "@/data/images";
import { getEvents } from "@/lib/api";
import { PortalEvent } from "@/data/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  Users,
  Video,
  Ticket,
  ArrowRight,
  Share2,
} from "lucide-react";
import { toast } from "sonner";

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<PortalEvent[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState<PortalEvent | null>(null);

  useEffect(() => {
    setEvents(getEvents());
  }, []);

  const types = [
    { label: "All Events", value: "all" },
    { label: "Reunions", value: "reunion" },
    { label: "Webinars", value: "webinar" },
    { label: "Workshops", value: "workshop" },
  ];

  const filtered = events.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase()) ||
      (e.speaker && e.speaker.toLowerCase().includes(search.toLowerCase()));
    const matchesType = typeFilter === "all" || e.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <PageHero
        title="Upcoming Events & Conclaves"
        subtitle="Annual homecomings, regional chapter meets, technical masterclasses, and startup pitch days."
        eyebrow="Calendar of Gatherings"
        backgroundImage={IMAGES.events[0].src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Reunions & Gatherings", href: "/reunions" },
          { label: "Upcoming Events", href: "/reunions/upcoming" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-3 sm:p-4 shadow-xs border border-slate-200/80 dark:border-slate-800 mb-6 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by event title, speaker, city..."
              className="pl-9 text-sm h-10 bg-slate-50 dark:bg-slate-800 rounded-lg"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {types.map((t) => (
              <Button
                key={t.value}
                size="sm"
                variant={typeFilter === t.value ? "default" : "outline"}
                onClick={() => setTypeFilter(t.value)}
                className="text-xs h-8 min-w-[80px] rounded-lg"
              >
                {t.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {filtered.length === 0 ? (
          <EmptyState
            title="No events found"
            description="No upcoming events match your keyword or category filters. Please try searching for another term."
            actionLabel="Reset Search"
            onAction={() => {
              setSearch("");
              setTypeFilter("all");
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filtered.map((event, idx) => {
              const capacityPercent = Math.min(
                100,
                Math.round((event.attendeeCount / (event.capacity || 100)) * 100)
              );

              return (
                <Reveal key={event.id} delay={idx * 0.05}>
                  <Card className="border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition-all h-full flex flex-col justify-between group overflow-hidden rounded-xl shadow-xs">
                    <div className="aspect-[16/10] max-h-[180px] overflow-hidden relative">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2.5 left-2.5 rounded-md bg-navy-950/95 border border-gold-500/40 px-2.5 py-1 text-center backdrop-blur-md shadow-xs">
                        <span className="block text-[10px] sm:text-[11px] font-bold text-[#E9C46A] uppercase tracking-wider">
                          {new Date(event.date).toLocaleString("default", { month: "short" }).toUpperCase()}
                        </span>
                        <span className="block text-lg font-serif font-bold text-white leading-none mt-0.5 tabular-nums">
                          {new Date(event.date).getDate()}
                        </span>
                      </div>
                      <div className="absolute bottom-2.5 left-2.5 bg-navy-950/80 backdrop-blur-sm text-[#F3DC9C] px-2 py-0.5 rounded text-[11px] font-semibold capitalize border border-navy-800">
                        {event.type}
                      </div>
                      {event.isVirtual ? (
                        <div className="absolute top-2.5 right-2.5 bg-blue-600/90 text-white px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-semibold flex items-center gap-1">
                          <Video className="w-3 h-3" />
                          Virtual
                        </div>
                      ) : (
                        <div className="absolute top-2.5 right-2.5 bg-amber-500/90 text-navy-950 px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-bold">
                          In-Person
                        </div>
                      )}
                    </div>

                    <CardContent className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs text-amber-600 font-semibold mb-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span className="tabular-nums">{event.date} • {event.time}</span>
                        </div>

                        <h3 className="text-[15px] sm:text-[16px] font-serif font-semibold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
                          {event.title}
                        </h3>

                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1.5">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>

                        {event.speaker && (
                          <div className="text-xs text-slate-600 dark:text-slate-400 mt-2 bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded">
                            <span className="font-semibold text-slate-800 dark:text-slate-200">Speaker: </span>
                            {event.speaker} ({event.speakerRole})
                          </div>
                        )}

                        <p className="mt-2 text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 line-clamp-2">
                          {event.description}
                        </p>

                        {/* Capacity meter */}
                        <div className="mt-3">
                          <div className="flex justify-between text-[11px] text-slate-500 mb-1 tabular-nums">
                            <span>RSVPs: {event.attendeeCount} / {event.capacity}</span>
                            <span>{capacityPercent}% filled</span>
                          </div>
                          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-amber-500 h-full rounded-full transition-all duration-500"
                              style={{ width: `${capacityPercent}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedEvent(event)}
                          className="text-xs px-2 h-8 text-slate-600 dark:text-slate-400"
                        >
                          Details
                        </Button>
                        <Button
                          asChild
                          size="sm"
                          className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-semibold text-xs h-8 px-3 rounded-lg"
                        >
                          <Link href={`/reunions/register?event=${event.id}`}>
                            <Ticket className="w-3.5 h-3.5 mr-1" />
                            Register Now
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>

      {/* Event Details Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <DialogContent className="max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          {selectedEvent && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="capitalize">
                    {selectedEvent.type}
                  </Badge>
                  <span className="text-xs text-amber-600 font-semibold ml-auto flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedEvent.date}
                  </span>
                </div>
                <DialogTitle className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100 text-left">
                  {selectedEvent.title}
                </DialogTitle>
                <DialogDescription className="text-left text-slate-600 dark:text-slate-400 text-xs">
                  {selectedEvent.location} • {selectedEvent.time}
                </DialogDescription>
              </DialogHeader>

              <div className="py-4 border-t border-b border-slate-100 dark:border-slate-800 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                <div className="aspect-[16/9] rounded-xl overflow-hidden relative">
                  <img
                    src={selectedEvent.imageUrl}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <p>{selectedEvent.description}</p>

                {selectedEvent.speaker && (
                  <div className="p-3 bg-amber-500/10 rounded-xl text-xs space-y-0.5">
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      Distinguished Speaker / Host:
                    </div>
                    <div>{selectedEvent.speaker} — {selectedEvent.speakerRole}</div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    toast.success("Event link copied to clipboard");
                  }}
                >
                  <Share2 className="w-3.5 h-3.5 mr-1" />
                  Share
                </Button>
                <Button asChild className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold">
                  <Link href={`/reunions/register?event=${selectedEvent.id}`}>
                    Reserve Seat Online
                  </Link>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

