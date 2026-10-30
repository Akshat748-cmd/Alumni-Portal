"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import {
  MessageSquare,
  Star,
  Paperclip,
  CheckCircle2,
  AlertCircle,
  Send,
  X,
  Heart,
} from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { TicketSuccessState } from "@/components/common/TicketSuccessState";
import { usePortalStore } from "@/store/portal";

const FEEDBACK_CATEGORIES = [
  "Portal UI & User Experience",
  "Alumni Programs & Knowledge Sessions",
  "Reunions & Annual Homecoming",
  "1-on-1 Mentorship Experience",
  "Career Hub & Job Postings",
  "Institutional Strategic Suggestions",
];

export default function SuggestionsFeedbackPage() {
  const { currentUser, submitItem, getNextTicketNumber } = usePortalStore();

  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState("+91 ");
  const [category, setCategory] = useState(FEEDBACK_CATEGORIES[0]);
  const [rating, setRating] = useState<number>(5);
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState<"Normal" | "Urgent">("Normal");
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);

  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);

  const isNameValid = name.trim().length >= 3;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isMessageValid = message.trim().length >= 10;

  const errors: string[] = [];
  if (!isNameValid) errors.push("Full name is required");
  if (!isEmailValid) errors.push("Valid email address is required");
  if (!isMessageValid) errors.push("Please provide constructive feedback (min 10 chars)");

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
      toast.error("Please fill in mandatory feedback details.");
      return;
    }

    const tktNum = getNextTicketNumber();

    submitItem("ticket", {
      ticketNumber: tktNum,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      category: "Suggestions & Feedback",
      feedbackCategory: category,
      rating,
      priority,
      subject: `Feedback [${category}]: Rating ${rating}/5`,
      message: `Category: ${category} | Rating: ${rating}/5 | Feedback: ${message.trim()}`,
      attachedFile: attachedFileName,
    });

    setTicketNumber(tktNum);
    toast.success(`Feedback ticket ${tktNum} recorded! Thank you for helping us improve.`);
  };

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <PageHero
        eyebrow="COMMUNITY VOICE • ADVANCEMENT"
        title="Suggestions & Feedback"
        subtitle="Help us refine the alumni platform, introduce valuable programs, and strengthen relationships across our global network."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Help Desk", href: "/help-desk" },
          { label: "Suggestions & Feedback" },
        ]}
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          {ticketNumber ? (
            <TicketSuccessState
              ticketNumber={ticketNumber}
              category="Suggestions & Feedback"
              subject={`Feedback: ${category} (${rating}/5 Stars)`}
              name={name}
              onReset={() => {
                setTicketNumber(null);
                setSubmitAttempted(false);
                setMessage("");
                setAttachedFileName(null);
              }}
            />
          ) : (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-line shadow-xl">
              <div className="border-b border-line pb-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-gold-700 uppercase tracking-wider mb-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>Quality Assurance & Community Voice</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy-950">
                  Share Your Recommendations
                </h2>
                <p className="text-xs sm:text-sm text-muted mt-1">
                  Submissions are reviewed monthly by the Poddar Alumni Advisory Board.
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
                </div>

                {/* FEEDBACK CATEGORY */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Feedback Area *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-line bg-white text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                  >
                    {FEEDBACK_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 5-STAR SATISFACTION RATING */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-2">
                    Overall Satisfaction Rating ({rating} of 5 Stars)
                  </label>
                  <div className="flex items-center gap-2 p-3 rounded-2xl bg-ivory border border-line w-fit">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 text-gold-500 hover:scale-110 transition-transform cursor-pointer"
                        aria-label={`Rate ${star} stars`}
                      >
                        <Star
                          className={`h-7 w-7 ${
                            star <= rating
                              ? "fill-gold-400 text-gold-500"
                              : "text-line fill-transparent"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Your Constructive Feedback & Suggestions *
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share specific ideas, compliments, or areas for improvement..."
                    className="w-full p-4 rounded-xl border border-line text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40 resize-none"
                  />
                </div>

                {/* MOCK ATTACHMENT */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Supporting Screenshot or Proposal Document (Optional Mock File)
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
                  <span>Submit Community Feedback</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
