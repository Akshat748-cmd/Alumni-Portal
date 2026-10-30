"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { fireConfettiBurst } from "@/components/motion/ConfettiBurst";
import { IMAGES } from "@/data/images";
import { getEvents } from "@/lib/api";
import { PortalEvent } from "@/data/types";
import { usePortalStore } from "@/store/portal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Ticket,
  Calendar,
  Clock,
  MapPin,
  Download,
  CheckCircle2,
  Share2,
  Printer,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

// Calendar (.ics) Generator
function downloadIcsCalendar(event: {
  title: string;
  description: string;
  location: string;
  date: string;
  regNumber: string;
  time?: string;
}) {
  const dtStamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const cleanDate = event.date.replace(/-/g, "");
  const dtStart = `${cleanDate}T043000Z`;
  const dtEnd = `${cleanDate}T143000Z`;

  const icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Poddar Alumni Association//Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:poddar-event-${Date.now()}@poddarinstitutes.org`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, " ")} (Confirmation Pass: ${event.regNumber})`,
    `LOCATION:${event.location}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsLines], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${event.title.replace(/[^a-zA-Z0-9]/g, "_")}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function RegisterForm() {
  const searchParams = useSearchParams();
  const eventParam = searchParams.get("event");

  const { currentUser, submitItem, getNextEventRegNumber } = usePortalStore();
  const [events, setEvents] = useState<PortalEvent[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>("");

  const [fullName, setFullName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState("");
  const [batch, setBatch] = useState(currentUser?.batch ? String(currentUser.batch) : "2020");
  const [course, setCourse] = useState(currentUser?.course || "BCA");
  const [ticketsCount, setTicketsCount] = useState("1");
  const [dietary, setDietary] = useState("Vegetarian");
  const [notes, setNotes] = useState("");

  const [confirmedPass, setConfirmedPass] = useState<{
    regNumber: string;
    event: PortalEvent;
    fullName: string;
    ticketsCount: number;
    dietary: string;
  } | null>(null);

  useEffect(() => {
    const all = getEvents();
    setEvents(all);
    if (eventParam && all.some((e) => e.id === eventParam)) {
      setSelectedEventId(eventParam);
    } else if (all.length > 0) {
      setSelectedEventId(all[0].id);
    }
  }, [eventParam]);

  const currentEvent = events.find((e) => e.id === selectedEventId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedEventId || !fullName || !email) {
      toast.error("Please provide your name, email, and select an event");
      return;
    }

    const regNum = getNextEventRegNumber();
    const payload = {
      eventId: selectedEventId,
      eventTitle: currentEvent?.title || "Alumni Event",
      registrationNumber: regNum,
      fullName,
      email,
      phone,
      batch,
      course,
      ticketsCount: Number(ticketsCount),
      dietaryPreference: dietary,
      notes,
    };

    submitItem("event-registration", payload);
    fireConfettiBurst();

    if (currentEvent) {
      setConfirmedPass({
        regNumber: regNum,
        event: currentEvent,
        fullName,
        ticketsCount: Number(ticketsCount),
        dietary,
      });
    }

    toast.success(`Seat reserved! Pass issued: ${regNum}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
      {confirmedPass ? (
        <Reveal>
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-amber-500/40">
            {/* Digital Pass Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-navy-950 flex items-center justify-center font-bold font-serif text-xl shadow-md">
                  P
                </div>
                <div>
                  <div className="text-xs font-semibold text-amber-600 tracking-wider uppercase">
                    Official Event Pass
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">
                    Poddar Alumni Association
                  </h3>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs px-3 py-1">
                  Confirmed Entry
                </Badge>
                <div className="text-xs text-slate-500 mt-1 font-mono">
                  Pass Ref: <span className="font-bold text-slate-800 dark:text-slate-200">{confirmedPass.regNumber}</span>
                </div>
              </div>
            </div>

            {/* Event Summary Details */}
            <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Conclave / Reunion Title
                  </div>
                  <h4 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100 mt-1">
                    {confirmedPass.event.title}
                  </h4>
                </div>

                <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{confirmedPass.event.date} • {confirmedPass.event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{confirmedPass.event.location}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700 space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500">Attendee Name:</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{confirmedPass.fullName}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500">Seats Reserved:</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{confirmedPass.ticketsCount} Attendee(s)</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500">Dietary Choice:</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{confirmedPass.dietary}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Barcode / Entry Code:</span>
                  <span className="font-mono text-amber-600 font-bold">{confirmedPass.regNumber}</span>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <Button
                onClick={() =>
                  downloadIcsCalendar({
                    title: confirmedPass.event.title,
                    description: confirmedPass.event.description,
                    location: confirmedPass.event.location,
                    date: confirmedPass.event.date,
                    regNumber: confirmedPass.regNumber,
                    time: confirmedPass.event.time,
                  })
                }
                className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold"
              >
                <Download className="w-4 h-4 mr-2" />
                Add to Calendar (.ics)
              </Button>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.print();
                    }
                  }}
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print Pass
                </Button>
                <Button variant="ghost" onClick={() => setConfirmedPass(null)}>
                  Register Another Seat
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      ) : (
        <Reveal>
          <Card className="border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-navy-950 to-navy-900 text-white p-6 sm:p-8 border-b border-amber-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Ticket className="w-4 h-4 text-amber-400" />
                <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                  Online Registration Pass
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold">
                Reserve Your Event Seat
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Confirm your presence for upcoming homecoming jubilees, webinars, and masterclasses. Instant confirmation pass generated upon submission.
              </p>
            </div>

            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Event Selector */}
                <div>
                  <Label htmlFor="event-select" className="text-xs font-semibold">
                    Select Gathering / Conclave *
                  </Label>
                  <Select value={selectedEventId} onValueChange={setSelectedEventId}>
                    <SelectTrigger id="event-select" className="h-12 text-base sm:text-sm mt-1">
                      <SelectValue placeholder="Choose an event" />
                    </SelectTrigger>
                    <SelectContent>
                      {events.map((ev) => (
                        <SelectItem key={ev.id} value={ev.id}>
                          {ev.title} ({ev.date})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {currentEvent && (
                    <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs text-slate-600 dark:text-slate-400 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-600" />
                        <span>{currentEvent.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>{currentEvent.time}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Attendee Details */}
                <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <h3 className="text-xs uppercase tracking-wider font-bold text-amber-600 font-serif">
                    Attendee Coordinates
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="reg-name" className="text-xs font-semibold">
                        Full Name *
                      </Label>
                      <Input
                        id="reg-name"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Vikramaditya Rathore"
                        className="h-11 text-base sm:text-sm mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="reg-email" className="text-xs font-semibold">
                        Email Address *
                      </Label>
                      <Input
                        id="reg-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. vikram@apexcapital.mock"
                        className="h-11 text-base sm:text-sm mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="reg-phone" className="text-xs font-semibold">
                        WhatsApp / Contact Mobile
                      </Label>
                      <Input
                        id="reg-phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98290 12345"
                        className="h-11 text-base sm:text-sm mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="reg-batch" className="text-xs font-semibold">
                          Batch Year *
                        </Label>
                        <Input
                          id="reg-batch"
                          required
                          value={batch}
                          onChange={(e) => setBatch(e.target.value)}
                          placeholder="2020"
                          className="h-11 text-base sm:text-sm mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="reg-course" className="text-xs font-semibold">
                          Degree / Course *
                        </Label>
                        <Input
                          id="reg-course"
                          required
                          value={course}
                          onChange={(e) => setCourse(e.target.value)}
                          placeholder="BCA"
                          className="h-11 text-base sm:text-sm mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Logistics */}
                <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <h3 className="text-xs uppercase tracking-wider font-bold text-amber-600 font-serif">
                    Preferences & Hospitality
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ticket-count" className="text-xs font-semibold">
                        Number of Attendees / Passes
                      </Label>
                      <Select value={ticketsCount} onValueChange={setTicketsCount}>
                        <SelectTrigger id="ticket-count" className="h-11 text-base sm:text-sm mt-1">
                          <SelectValue placeholder="1 Pass" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Person (Self)</SelectItem>
                          <SelectItem value="2">2 Persons (Self + Spouse/Guest)</SelectItem>
                          <SelectItem value="3">3 Persons (Family)</SelectItem>
                          <SelectItem value="4">4 Persons (Family Roster)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="dietary-select" className="text-xs font-semibold">
                        Dietary Preference (Lunch / Gala)
                      </Label>
                      <Select value={dietary} onValueChange={setDietary}>
                        <SelectTrigger id="dietary-select" className="h-11 text-base sm:text-sm mt-1">
                          <SelectValue placeholder="Vegetarian" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Vegetarian">Pure Vegetarian</SelectItem>
                          <SelectItem value="Jain">Jain Friendly</SelectItem>
                          <SelectItem value="Non-Vegetarian">Non-Vegetarian</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="reg-notes" className="text-xs font-semibold">
                      Special Accessibility or Logistics Notes
                    </Label>
                    <Textarea
                      id="reg-notes"
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Wheelchair assistance, parking spot reservation, or faculty meeting request..."
                      className="text-base sm:text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                  <span className="text-xs text-slate-500">
                    Complimentary admission for verified Poddar alumni.
                  </span>
                  <Button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold px-8 h-12"
                  >
                    Confirm Registration & Issue Pass
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </Reveal>
      )}
    </div>
  );
}

export default function EventRegistrationPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <PageHero
        title="Event Registration Pass"
        subtitle="Reserve your seat for upcoming homecomings, academic conclaves, and global masterclasses."
        eyebrow="Pass Reservation"
        backgroundImage={IMAGES.events[0].src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Reunions & Gatherings", href: "/reunions" },
          { label: "Register Online", href: "/reunions/register" },
        ]}
      />

      <Suspense fallback={<div className="text-center py-20 text-slate-400">Loading form...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}

