"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import {
  HelpCircle,
  FileText,
  Paperclip,
  CheckCircle2,
  AlertCircle,
  Send,
  X,
} from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { TicketSuccessState } from "@/components/common/TicketSuccessState";
import { usePortalStore } from "@/store/portal";

const QUERY_CATEGORIES = [
  "General Alumni Inquiries",
  "Chapter Formation & Regional Meets",
  "Alumni ID Card & Portal Access",
  "Donations & Endowment Guidance",
  "Other Administrative Request",
];

export default function SubmitQueryPage() {
  const { currentUser, submitItem, getNextTicketNumber } = usePortalStore();

  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState("+91 ");
  const [category, setCategory] = useState(QUERY_CATEGORIES[0]);
  const [priority, setPriority] = useState<"Normal" | "Urgent">("Normal");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);

  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);

  const isNameValid = name.trim().length >= 3;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isSubjectValid = subject.trim().length >= 5;
  const isMessageValid = message.trim().length >= 15;

  const errors: string[] = [];
  if (!isNameValid) errors.push("Full name is required (min 3 chars)");
  if (!isEmailValid) errors.push("Valid email address is required");
  if (!isSubjectValid) errors.push("Subject line is required (min 5 chars)");
  if (!isMessageValid) errors.push("Detailed query message is required (min 15 chars)");

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
      toast.error("Please fill in all mandatory ticket details.");
      return;
    }

    const tktNum = getNextTicketNumber();

    submitItem("ticket", {
      ticketNumber: tktNum,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      category: "General Query",
      subCategory: category,
      priority,
      subject: subject.trim(),
      message: message.trim(),
      attachedFile: attachedFileName,
    });

    setTicketNumber(tktNum);
    toast.success(`Support ticket ${tktNum} created!`);
  };

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <PageHero
        eyebrow="HELP DESK • SERVICE DESK"
        title="Submit a Query / Request"
        subtitle="Open an official help desk inquiry with the Poddar Alumni Secretariat for personalized assistance."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Help Desk", href: "/help-desk" },
          { label: "Submit a Query" },
        ]}
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          {ticketNumber ? (
            <TicketSuccessState
              ticketNumber={ticketNumber}
              category={category}
              subject={subject}
              name={name}
              onReset={() => {
                setTicketNumber(null);
                setSubmitAttempted(false);
                setSubject("");
                setMessage("");
                setAttachedFileName(null);
              }}
            />
          ) : (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-line shadow-xl">
              <div className="border-b border-line pb-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-gold-700 uppercase tracking-wider mb-1">
                  <HelpCircle className="h-4 w-4" />
                  <span>General Support Request</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy-950">
                  Ticket Information
                </h2>
                <p className="text-xs sm:text-sm text-muted mt-1">
                  Tickets are routed directly to the appropriate Secretariat department.
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
                      Priority Level
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as any)}
                      className="w-full h-12 px-4 rounded-xl border border-line bg-white text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                    >
                      <option value="Normal">Normal (Standard 2 working days)</option>
                      <option value="Urgent">Urgent (Time-critical matter)</option>
                    </select>
                  </div>
                </div>

                {/* CATEGORY */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Query Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-line bg-white text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                  >
                    {QUERY_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* SUBJECT */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Subject Line *
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Inquiry regarding launching a Bengaluru alumni chapter"
                    className="w-full h-12 px-4 rounded-xl border border-line text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                  />
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Query Details & Background *
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide full context, batch reference, or specific questions..."
                    className="w-full p-4 rounded-xl border border-line text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40 resize-none"
                  />
                </div>

                {/* MOCK FILE ATTACH */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Supporting Document (Optional PDF / Image)
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
                        <FileText className="h-3.5 w-3.5 text-gold-700" />
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
                  <span>Submit Help Desk Ticket</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
