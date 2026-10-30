"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import {
  UserCheck,
  ShieldCheck,
  Paperclip,
  CheckCircle2,
  AlertCircle,
  Send,
  X,
} from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { TicketSuccessState } from "@/components/common/TicketSuccessState";
import { usePortalStore } from "@/store/portal";

const DISCREPANCY_AREAS = [
  "Legal Name Spelling Correction",
  "Graduation Batch / Year Discrepancy",
  "Degree Program / Course Correction",
  "Primary Registered Email Address Update",
  "Account Merging (Multiple Email Registrations)",
  "Directory Privacy / Hide Profile Request",
];

export default function ProfileSupportPage() {
  const { currentUser, submitItem, getNextTicketNumber } = usePortalStore();

  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState("+91 ");
  const [discrepancyArea, setDiscrepancyArea] = useState(DISCREPANCY_AREAS[0]);
  const [explanation, setExplanation] = useState("");
  const [priority, setPriority] = useState<"Normal" | "Urgent">("Normal");
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);

  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);

  const isNameValid = name.trim().length >= 3;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isExplanationValid = explanation.trim().length >= 15;

  const errors: string[] = [];
  if (!isNameValid) errors.push("Full name is required");
  if (!isEmailValid) errors.push("Valid email address is required");
  if (!isExplanationValid) errors.push("Please provide clear details regarding the profile discrepancy (min 15 chars)");

  const handleMockFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFileName(e.target.files[0].name);
      toast.info(`ID proof staged: ${e.target.files[0].name}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (errors.length > 0) {
      toast.error("Please fill in required fields for profile verification.");
      return;
    }

    const tktNum = getNextTicketNumber();

    submitItem("ticket", {
      ticketNumber: tktNum,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      category: "Profile Update Assistance",
      discrepancyArea,
      priority,
      subject: `Profile Discrepancy: ${discrepancyArea}`,
      message: `Area: ${discrepancyArea} | Details: ${explanation.trim()}`,
      attachedFile: attachedFileName,
    });

    setTicketNumber(tktNum);
    toast.success(`Profile update ticket ${tktNum} created!`);
  };

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <PageHero
        eyebrow="ALUMNI IDENTITY • RECONCILIATION"
        title="Profile Update Assistance"
        subtitle="Need help correcting your registered academic credentials, updating your primary email address, or merging legacy portal accounts?"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Help Desk", href: "/help-desk" },
          { label: "Profile Support" },
        ]}
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          {ticketNumber ? (
            <TicketSuccessState
              ticketNumber={ticketNumber}
              category="Profile Update Assistance"
              subject={`Discrepancy: ${discrepancyArea}`}
              name={name}
              onReset={() => {
                setTicketNumber(null);
                setSubmitAttempted(false);
                setExplanation("");
                setAttachedFileName(null);
              }}
            />
          ) : (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-line shadow-xl">
              <div className="border-b border-line pb-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-gold-700 uppercase tracking-wider mb-1">
                  <UserCheck className="h-4 w-4" />
                  <span>Credential Verification Desk</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy-950">
                  Profile Correction Requisition
                </h2>
                <p className="text-xs sm:text-sm text-muted mt-1">
                  Changes to sensitive fields (such as degree, batch, or legal name) are reconciled against college registration rolls.
                </p>
              </div>

              {submitAttempted && errors.length > 0 && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs mb-6 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-sm">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span>Please resolve highlighted requirements:</span>
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
                      Current Email Address *
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
                      Phone Number
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
                      <option value="Normal">Normal</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                {/* DISCREPANCY AREA */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    What Needs Changing? *
                  </label>
                  <select
                    value={discrepancyArea}
                    onChange={(e) => setDiscrepancyArea(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-line bg-white text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                  >
                    {DISCREPANCY_AREAS.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                {/* EXPLANATION */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Details of the Correction / New Value *
                  </label>
                  <textarea
                    rows={4}
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    placeholder="State what is currently recorded incorrectly and provide the exact new value, along with student roll number if known..."
                    className="w-full p-4 rounded-xl border border-line text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40 resize-none"
                  />
                </div>

                {/* MOCK ATTACHMENT */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Supporting ID / Degree Certificate Copy (Optional Mock File)
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="h-12 px-4 rounded-xl border border-line bg-ivory text-navy-900 font-semibold text-xs flex items-center gap-2 hover:bg-navy-50 cursor-pointer">
                      <Paperclip className="h-4 w-4 text-gold-600" />
                      <span>Attach Proof (Mock)</span>
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
                  <span>Transmit Profile Support Request</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
