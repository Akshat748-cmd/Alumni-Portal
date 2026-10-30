"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  MapPin,
  Paperclip,
  CheckCircle2,
  AlertCircle,
  Send,
  X,
} from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { TicketSuccessState } from "@/components/common/TicketSuccessState";
import { usePortalStore } from "@/store/portal";

const EVENT_QUERY_TYPES = [
  "Registration & Ticket Pass Confirmation",
  "Family / Guest Accreditation",
  "Campus Accommodation & Transport Logistics",
  "Dietary, Wheelchair & Accessibility Requirements",
  "Alumni Speaker & Panel Participation Inquiry",
  "Event Cancellation or Batch Representative Inquiries",
];

export default function EventQueriesPage() {
  const { events, currentUser, submitItem, getNextTicketNumber } = usePortalStore();

  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState("+91 ");
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id || "evt-1");
  const [queryType, setQueryType] = useState(EVENT_QUERY_TYPES[0]);
  const [priority, setPriority] = useState<"Normal" | "Urgent">("Normal");
  const [question, setQuestion] = useState("");
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);

  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);

  const selectedEvent = events.find((e) => e.id === selectedEventId) || events[0];

  const isNameValid = name.trim().length >= 3;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isQuestionValid = question.trim().length >= 10;

  const errors: string[] = [];
  if (!isNameValid) errors.push("Full name is required");
  if (!isEmailValid) errors.push("Valid email address is required");
  if (!isQuestionValid) errors.push("Please provide a question or inquiry (min 10 chars)");

  const handleMockFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFileName(e.target.files[0].name);
      toast.info(`Attachment staged: ${e.target.files[0].name}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (errors.length > 0) {
      toast.error("Please fill in mandatory event query details.");
      return;
    }

    const tktNum = getNextTicketNumber();

    submitItem("ticket", {
      ticketNumber: tktNum,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      category: "Event Queries",
      eventId: selectedEvent?.id,
      eventTitle: selectedEvent?.title,
      queryType,
      priority,
      subject: `Event Query [${selectedEvent?.title}]: ${queryType}`,
      message: `Event: ${selectedEvent?.title} (${selectedEvent?.date}) | Type: ${queryType} | Inquiry: ${question.trim()}`,
      attachedFile: attachedFileName,
    });

    setTicketNumber(tktNum);
    toast.success(`Event query ticket ${tktNum} created!`);
  };

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <PageHero
        eyebrow="HOMECOMING & GATHERINGS • SUPPORT"
        title="Event Queries & Registration Help"
        subtitle="Need assistance with reunion passes, guest invitations, travel logistics, or webinar access? Our event desk is here to help."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Help Desk", href: "/help-desk" },
          { label: "Event Queries" },
        ]}
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {ticketNumber ? (
            <TicketSuccessState
              ticketNumber={ticketNumber}
              category="Event Queries"
              subject={`Event Inquiry: ${selectedEvent?.title}`}
              name={name}
              onReset={() => {
                setTicketNumber(null);
                setSubmitAttempted(false);
                setQuestion("");
                setAttachedFileName(null);
              }}
            />
          ) : (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-line shadow-xl">
              <div className="border-b border-line pb-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-gold-700 uppercase tracking-wider mb-1">
                  <Calendar className="h-4 w-4" />
                  <span>Reunions & Masterclasses Desk</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy-950">
                  Event Inquiry Dispatch
                </h2>
                <p className="text-xs sm:text-sm text-muted mt-1">
                  Select your target event from the official calendar to route your question to the organizing team.
                </p>
              </div>

              {submitAttempted && errors.length > 0 && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs mb-6 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-sm">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span>Please correct highlighted fields:</span>
                  </div>
                  <ul className="list-disc pl-5">
                    {errors.map((e, idx) => (
                      <li key={idx}>{e}</li>
                    ))}
                  </ul>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* EVENT PICKER DROPDOWN */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Select Event *
                  </label>
                  <select
                    value={selectedEventId}
                    onChange={(e) => setSelectedEventId(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-line bg-white text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                  >
                    {events.map((evt) => (
                      <option key={evt.id} value={evt.id}>
                        {evt.title} ({evt.date} • {evt.location})
                      </option>
                    ))}
                  </select>
                </div>

                {/* SELECTED EVENT PREVIEW CARD */}
                {selectedEvent && (
                  <div className="p-4 rounded-2xl bg-ivory border border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="font-bold text-navy-950 text-sm">{selectedEvent.title}</div>
                      <div className="text-muted flex items-center gap-2 mt-0.5">
                        <span>Date: {selectedEvent.date}</span>
                        <span>•</span>
                        <span>Time: {selectedEvent.time}</span>
                        <span>•</span>
                        <span>{selectedEvent.location}</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-gold-500/15 text-gold-700 font-bold uppercase tracking-wider text-[10px]">
                      {selectedEvent.type}
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* FULL NAME */}
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Vikramaditya Rathore"
                      className="w-full h-12 px-4 rounded-xl border border-line text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                    />
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. vikram@example.com"
                      className="w-full h-12 px-4 rounded-xl border border-line text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                    />
                  </div>

                  {/* PHONE */}
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98290 12345"
                      className="w-full h-12 px-4 rounded-xl border border-line text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                    />
                  </div>

                  {/* PRIORITY */}
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Urgency
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as any)}
                      className="w-full h-12 px-4 rounded-xl border border-line bg-white text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                    >
                      <option value="Normal">Normal Inquiry</option>
                      <option value="Urgent">Urgent (Event starts within 48 hours)</option>
                    </select>
                  </div>
                </div>

                {/* QUERY TYPE */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Inquiry Nature *
                  </label>
                  <select
                    value={queryType}
                    onChange={(e) => setQueryType(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-line bg-white text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                  >
                    {EVENT_QUERY_TYPES.map((qt) => (
                      <option key={qt} value={qt}>
                        {qt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* QUESTION / MESSAGE */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Your Question / Special Assistance Requirements *
                  </label>
                  <textarea
                    rows={4}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Specify attendee names, dietary requirements, hotel booking help, or registration issues..."
                    className="w-full p-4 rounded-xl border border-line text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40 resize-none"
                  />
                </div>

                {/* MOCK ATTACHMENT */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Payment Screenshot / Registration Receipt (Optional Mock File)
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="h-12 px-4 rounded-xl border border-line bg-ivory text-navy-900 font-semibold text-xs flex items-center gap-2 hover:bg-navy-50 cursor-pointer">
                      <Paperclip className="h-4 w-4 text-gold-600" />
                      <span>Attach File (Mock)</span>
                      <input
                        type="file"
                        onChange={handleMockFileChange}
                        className="sr-only"
                        accept=".pdf,.png,.jpg,.jpeg"
                      />
                    </label>
                    {attachedFileName && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gold-500/15 text-navy-950 text-xs font-mono">
                        <span className="truncate max-w-[200px]">{attachedFileName}</span>
                        <button
                          type="button"
                          onClick={() => setAttachedFileName(null)}
                          className="text-muted hover:text-red-600 ml-1"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-12 sm:h-14 rounded-xl bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 text-navy-950 font-bold text-sm sm:text-base shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="h-5 w-5" />
                  <span>Transmit Event Inquiry</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
