"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Paperclip,
  CheckCircle2,
  AlertCircle,
  Send,
  X,
  Building,
} from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { TicketSuccessState } from "@/components/common/TicketSuccessState";
import { usePortalStore } from "@/store/portal";
import { ALUMNI_OFFICE } from "@/data/office";

const CONTACT_METHODS = [
  "Phone Callback from Secretariat Officer",
  "Official Email Correspondence",
  "In-Person Campus Meeting Appointment",
];

const TIME_WINDOWS = [
  "Morning (10:00 AM – 01:00 PM IST)",
  "Afternoon (02:00 PM – 05:00 PM IST)",
  "Saturday Morning (10:00 AM – 01:00 PM IST)",
];

export default function ContactAlumniOfficePage() {
  const { currentUser, submitItem, getNextTicketNumber } = usePortalStore();

  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState("+91 ");
  const [method, setMethod] = useState(CONTACT_METHODS[0]);
  const [timeWindow, setTimeWindow] = useState(TIME_WINDOWS[0]);
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState<"Normal" | "Urgent">("Normal");
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);

  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);

  const isNameValid = name.trim().length >= 3;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isPhoneValid = phone.trim().length >= 8;
  const isMessageValid = message.trim().length >= 10;

  const errors: string[] = [];
  if (!isNameValid) errors.push("Full name is required");
  if (!isEmailValid) errors.push("Valid email address is required");
  if (!isPhoneValid) errors.push("Valid contact number is required for callback");
  if (!isMessageValid) errors.push("Please provide message or meeting agenda (min 10 chars)");

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
      toast.error("Please fill in contact details for appointment scheduling.");
      return;
    }

    const tktNum = getNextTicketNumber();

    submitItem("ticket", {
      ticketNumber: tktNum,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      category: "Contact Alumni Office",
      preferredMethod: method,
      timeWindow,
      priority,
      subject: `Direct Contact: ${method} (${timeWindow})`,
      message: `Preferred Method: ${method} | Time Window: ${timeWindow} | Agenda: ${message.trim()}`,
      attachedFile: attachedFileName,
    });

    setTicketNumber(tktNum);
    toast.success(`Contact appointment request ${tktNum} dispatched!`);
  };

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <PageHero
        eyebrow="CAMPUS LIAISON • EXECUTIVE SECRETARIAT"
        title="Contact Alumni Office"
        subtitle="Schedule a campus appointment, request an executive phone consultation, or coordinate directly with institutional leadership."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Help Desk", href: "/help-desk" },
          { label: "Contact Alumni Office" },
        ]}
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          {ticketNumber ? (
            <TicketSuccessState
              ticketNumber={ticketNumber}
              category="Contact Alumni Office"
              subject={`Contact Request: ${method}`}
              name={name}
              onReset={() => {
                setTicketNumber(null);
                setSubmitAttempted(false);
                setMessage("");
                setAttachedFileName(null);
              }}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* CONTACT FORM */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-line shadow-xl">
                <div className="border-b border-line pb-4 mb-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-gold-700 uppercase tracking-wider mb-1">
                    <PhoneCall className="h-4 w-4" />
                    <span>Liaison Appointment Request</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy-950">
                    Schedule a Consultation
                  </h2>
                  <p className="text-xs sm:text-sm text-muted mt-1">
                    Select your preferred communication channel and available time window.
                  </p>
                </div>

                {submitAttempted && errors.length > 0 && (
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs mb-6 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-sm">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <span>Please resolve the following:</span>
                    </div>
                    <ul className="list-disc pl-5">
                      {errors.map((e, idx) => (
                        <li key={idx}>{e}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
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
                        Callback Phone Number *
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
                        Priority
                      </label>
                      <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as any)}
                        className="w-full h-12 px-4 rounded-xl border border-line bg-white text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                      >
                        <option value="Normal">Normal</option>
                        <option value="Urgent">Urgent</option>
                      </select>
                    </div>
                  </div>

                  {/* PREFERRED METHOD */}
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Preferred Contact Method *
                    </label>
                    <select
                      value={method}
                      onChange={(e) => setMethod(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border border-line bg-white text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                    >
                      {CONTACT_METHODS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* PREFERRED TIME WINDOW */}
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Preferred Time Window *
                    </label>
                    <select
                      value={timeWindow}
                      onChange={(e) => setTimeWindow(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border border-line bg-white text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                    >
                      {TIME_WINDOWS.map((tw) => (
                        <option key={tw} value={tw}>
                          {tw}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* MESSAGE / AGENDA */}
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Meeting Agenda or Consultation Summary *
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share the purpose of your appointment, batch cohort details, or institutional inquiry..."
                      className="w-full p-4 rounded-xl border border-line text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40 resize-none"
                    />
                  </div>

                  {/* MOCK ATTACHMENT */}
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Supporting Document (Optional Mock File)
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="h-12 px-4 rounded-xl border border-line bg-ivory text-navy-900 font-semibold text-xs flex items-center gap-2 hover:bg-navy-50 cursor-pointer">
                        <Paperclip className="h-4 w-4 text-gold-600" />
                        <span>Attach File (Mock)</span>
                        <input
                          type="file"
                          onChange={handleMockFileChange}
                          className="sr-only"
                          accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
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
                    <span>Confirm Consultation Request</span>
                  </button>
                </form>
              </div>

              {/* DIRECT CONTACT SIDEBAR */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-6 rounded-3xl bg-navy-950 text-ivory border border-navy-800 shadow-xl">
                  <h3 className="text-lg font-serif font-bold text-white mb-4 flex items-center gap-2">
                    <Building className="h-5 w-5 text-gold-400" />
                    <span>Campus Secretariat</span>
                  </h3>

                  <div className="space-y-4 text-xs text-ivory/80">
                    <div>
                      <strong className="text-gold-300 block mb-0.5">Director:</strong>
                      <span>{ALUMNI_OFFICE.leadership.director}</span>
                      <div className="text-[10px] text-ivory/60">{ALUMNI_OFFICE.leadership.designation}</div>
                    </div>

                    <div>
                      <strong className="text-gold-300 block mb-0.5">Executive Secretary:</strong>
                      <span>{ALUMNI_OFFICE.leadership.secretary}</span>
                      <div className="text-[10px] text-ivory/60">{ALUMNI_OFFICE.leadership.secretaryDesignation}</div>
                    </div>

                    <div className="pt-3 border-t border-navy-800">
                      <strong className="text-white block mb-1">Campus Coordinates:</strong>
                      <p className="leading-relaxed">
                        {ALUMNI_OFFICE.address.line1}, {ALUMNI_OFFICE.address.line2}, {ALUMNI_OFFICE.address.city}, {ALUMNI_OFFICE.address.state} {ALUMNI_OFFICE.address.pincode}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-navy-800 space-y-2">
                      <a
                        href={`tel:${ALUMNI_OFFICE.contact.phonePrimary.replace(/\s+/g, "")}`}
                        className="flex items-center gap-2 text-gold-300 hover:underline"
                      >
                        <PhoneCall className="h-3.5 w-3.5" />
                        <span>{ALUMNI_OFFICE.contact.phonePrimary}</span>
                      </a>
                      <a
                        href={`mailto:${ALUMNI_OFFICE.contact.emailGeneral}`}
                        className="flex items-center gap-2 text-gold-300 hover:underline"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        <span>{ALUMNI_OFFICE.contact.emailGeneral}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
