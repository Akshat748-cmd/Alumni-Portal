"use client";

import React, { useState } from "react";
import {
  HeartHandshake,
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Eye,
  Check,
  X,
  Mail,
  Phone,
  Ticket,
} from "lucide-react";
import { toast } from "sonner";
import { usePortalStore, SubmittedQueueItem } from "@/store/portal";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export function AdminGiveBackQueue() {
  const { submittedQueue, approveItem, rejectItem } = usePortalStore();

  const [activeSubTab, setActiveSubTab] = useState<"giveback" | "events">("giveback");
  const [selectedItem, setSelectedItem] = useState<SubmittedQueueItem | null>(null);

  const giveBackItems = submittedQueue.filter(
    (q) => q.type === "give-back-offer" || q.type === "giveBack"
  );
  const eventRegItems = submittedQueue.filter((q) => q.type === "event-registration");

  const handleApprove = (item: SubmittedQueueItem) => {
    approveItem(item.type, item.id);
    const name = item.payload?.fullName || item.payload?.name || item.submittedBy || "Alumnus";
    toast.success(`Submission approved!`, {
      description: item.type === "event-registration"
        ? `Event ticket registration for ${name} confirmed.`
        : `Institutional contribution pledge from ${name} recorded.`,
    });
    if (selectedItem?.id === item.id) setSelectedItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Sub-tab switcher */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
        <button
          onClick={() => setActiveSubTab("giveback")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeSubTab === "giveback"
              ? "bg-navy-950 text-gold-300 shadow-sm"
              : "text-muted hover:text-navy-950"
          }`}
        >
          Give Back Contributions ({giveBackItems.length})
        </button>
        <button
          onClick={() => setActiveSubTab("events")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeSubTab === "events"
              ? "bg-navy-950 text-gold-300 shadow-sm"
              : "text-muted hover:text-navy-950"
          }`}
        >
          Event Bookings & Registrations ({eventRegItems.length})
        </button>
      </div>

      {activeSubTab === "giveback" ? (
        <Card className="border-line shadow-navy-soft rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-serif text-lg text-navy-950">
                  Institutional Contribution & Give Back Pledges
                </CardTitle>
                <CardDescription className="text-xs">
                  Review offers from alumni for guest lectures, student internships, endowment gifts, and startup incubation support.
                </CardDescription>
              </div>
              <HeartHandshake className="h-5 w-5 text-indigo-600" />
            </div>
          </CardHeader>
          <CardContent>
            {giveBackItems.length === 0 ? (
              <div className="py-12 text-center text-muted text-xs border border-dashed border-line rounded-xl">
                <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2 opacity-80" />
                No give-back pledges in the queue.
              </div>
            ) : (
              <div className="space-y-4">
                {giveBackItems.map((item) => {
                  const p = item.payload || {};
                  const name = p.fullName || p.name || item.submittedBy || "Alumnus";

                  return (
                    <div
                      key={item.id}
                      className={`p-4 rounded-xl border transition-all ${
                        item.status === "pending"
                          ? "border-amber-200/80 bg-amber-50/30"
                          : "border-line bg-card"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-sm text-navy-950">{name}</span>
                            <StatusBadge status={item.status} size="sm" />
                            {p.type && (
                              <Badge variant="outline" className="text-[10px]">
                                {p.type}
                              </Badge>
                            )}
                          </div>

                          <div className="text-xs text-muted mt-1 flex flex-wrap items-center gap-2">
                            {p.batch && <span>Class of {p.batch}</span>}
                            {p.organization && <span>• {p.organization}</span>}
                            <span>• Received {item.createdAt}</span>
                          </div>

                          {p.topic && (
                            <div className="mt-1.5 text-xs text-navy-900 font-medium">
                              Topic: {p.topic}
                            </div>
                          )}

                          {p.message && (
                            <p className="mt-1 text-xs text-ink/80 italic bg-slate-50 p-2 rounded-lg border border-line">
                              &quot;{p.message}&quot;
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                          {item.status === "pending" && (
                            <Button
                              size="sm"
                              onClick={() => handleApprove(item)}
                              className="h-8 px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg gap-1"
                            >
                              <Check className="h-3.5 w-3.5" />
                              Acknowledge & Record
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="border-line shadow-navy-soft rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-serif text-lg text-navy-950">
                  Reunions & Gathering Registrations
                </CardTitle>
                <CardDescription className="text-xs">
                  Review booked tickets, dietary requirements, and confirmed attendee rosters for upcoming institutional events.
                </CardDescription>
              </div>
              <Ticket className="h-5 w-5 text-navy-800" />
            </div>
          </CardHeader>
          <CardContent>
            {eventRegItems.length === 0 ? (
              <div className="py-12 text-center text-muted text-xs border border-dashed border-line rounded-xl">
                <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2 opacity-80" />
                No event registrations recorded.
              </div>
            ) : (
              <div className="space-y-4">
                {eventRegItems.map((item) => {
                  const p = item.payload || {};
                  const attendee = p.fullName || p.name || item.submittedBy || "Attendee";

                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl border border-line bg-card flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-navy-950">
                            {p.registrationNumber || item.id}
                          </span>
                          <span className="font-bold text-sm text-navy-950">{attendee}</span>
                          <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-800 border-emerald-300">
                            Confirmed
                          </Badge>
                        </div>

                        <div className="text-xs text-navy-900 font-semibold mt-1">
                          {p.eventTitle || "Annual Alumni Gathering"}
                        </div>

                        <div className="text-xs text-muted mt-1 flex flex-wrap items-center gap-2">
                          {p.batch && <span>Class of {p.batch}</span>}
                          {p.course && <span>• {p.course}</span>}
                          <span>• {p.ticketsCount || 1} Pass(es)</span>
                          {p.dietaryPreference && <span>• Meal: {p.dietaryPreference}</span>}
                          <span>• Booked {item.createdAt}</span>
                        </div>
                      </div>

                      <div className="self-end md:self-auto shrink-0">
                        <Badge variant="outline" className="text-xs font-mono">
                          Pass Validated
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

