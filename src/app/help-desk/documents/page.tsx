"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import {
  FileText,
  GraduationCap,
  Paperclip,
  CheckCircle2,
  AlertCircle,
  Send,
  X,
  ShieldCheck,
} from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { TicketSuccessState } from "@/components/common/TicketSuccessState";
import { usePortalStore } from "@/store/portal";

const DOCUMENT_TYPES = [
  "Official Academic Transcripts (Sealed)",
  "Duplicate Degree Certificate",
  "Migration & Transfer Certificate",
  "Letter of Recommendation (LOR)",
  "Bonafide & Course Medium Certificate",
  "WES / Overseas Credential Verification",
];

const PURPOSES = [
  "Higher Education / University Admissions",
  "Permanent Residency / Visa Filing",
  "Employer Background Verification",
  "Professional Licensing / Regulatory Body",
  "Personal Record Archival",
];

const DELIVERY_MODES = [
  "Digital Stamped PDF via Official Email (3–4 days)",
  "Sealed Hardcopy Courier via SpeedPost (5–7 days)",
  "Direct WES / Credential Agency Electronic Transmission",
  "In-Person Campus Secretariat Collection",
];

export default function DocumentAssistancePage() {
  const { currentUser, submitItem, getNextTicketNumber } = usePortalStore();

  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState("+91 ");
  const [batch, setBatch] = useState(currentUser?.batch ? String(currentUser.batch) : "2020");
  const [course, setCourse] = useState(currentUser?.course || "BCA (Computer Applications)");
  const [rollNumber, setRollNumber] = useState("");
  const [docType, setDocType] = useState(DOCUMENT_TYPES[0]);
  const [purpose, setPurpose] = useState(PURPOSES[0]);
  const [deliveryMode, setDeliveryMode] = useState(DELIVERY_MODES[0]);
  const [shippingAddress, setShippingAddress] = useState("");
  const [priority, setPriority] = useState<"Normal" | "Urgent">("Normal");
  const [notes, setNotes] = useState("");
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);

  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);

  const isNameValid = name.trim().length >= 3;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isCourseValid = course.trim().length >= 2;

  const errors: string[] = [];
  if (!isNameValid) errors.push("Full student name is required");
  if (!isEmailValid) errors.push("Valid email address is required");
  if (!isCourseValid) errors.push("Degree course is required");

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
      toast.error("Please fill in required fields for transcript generation.");
      return;
    }

    const tktNum = getNextTicketNumber();

    submitItem("ticket", {
      ticketNumber: tktNum,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      batch,
      course,
      rollNumber: rollNumber.trim(),
      category: "Certificate / Document Assistance",
      documentType: docType,
      purpose,
      deliveryMode,
      shippingAddress: shippingAddress.trim(),
      priority,
      subject: `Document Request: ${docType} (${course}, Batch ${batch})`,
      message: `Document: ${docType} | Purpose: ${purpose} | Delivery: ${deliveryMode}${
        shippingAddress ? ` | Address: ${shippingAddress}` : ""
      }${notes ? ` | Notes: ${notes}` : ""}`,
      attachedFile: attachedFileName,
    });

    setTicketNumber(tktNum);
    toast.success(`Academic document request ${tktNum} logged!`);
  };

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <PageHero
        eyebrow="ACADEMIC RECORDS • REGISTRY"
        title="Certificate & Document Assistance"
        subtitle="Request sealed official transcripts, duplicate degree certificates, migration records, and institutional recommendation letters."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Help Desk", href: "/help-desk" },
          { label: "Certificate / Document Assistance" },
        ]}
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {ticketNumber ? (
            <TicketSuccessState
              ticketNumber={ticketNumber}
              category="Certificate / Document Assistance"
              subject={`Document Request: ${docType}`}
              name={name}
              onReset={() => {
                setTicketNumber(null);
                setSubmitAttempted(false);
                setRollNumber("");
                setShippingAddress("");
                setNotes("");
                setAttachedFileName(null);
              }}
            />
          ) : (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-line shadow-xl">
              <div className="border-b border-line pb-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-gold-700 uppercase tracking-wider mb-1">
                  <FileText className="h-4 w-4" />
                  <span>Registrar Document Processing</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy-950">
                  Document Request Requisition
                </h2>
                <p className="text-xs sm:text-sm text-muted mt-1">
                  Transcripts and certificates are verified against campus archives before official stamping.
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
                      Full Student Name (As on Degree) *
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
                      Communication Email *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. vikram@example.com"
                      className="w-full h-12 px-4 rounded-xl border border-line text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                    />
                  </div>

                  {/* COURSE */}
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Graduation Degree / Course *
                    </label>
                    <input
                      type="text"
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      placeholder="e.g. BCA / MBA"
                      className="w-full h-12 px-4 rounded-xl border border-line text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                    />
                  </div>

                  {/* BATCH */}
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Graduation Year / Batch *
                    </label>
                    <input
                      type="number"
                      value={batch}
                      onChange={(e) => setBatch(e.target.value)}
                      placeholder="e.g. 2020"
                      className="w-full h-12 px-4 rounded-xl border border-line text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                    />
                  </div>

                  {/* ROLL / ENROLLMENT NUMBER */}
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Enrollment / University Roll Number
                    </label>
                    <input
                      type="text"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      placeholder="e.g. PGI/2017/BCA/084"
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
                </div>

                {/* DOCUMENT TYPE */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Requested Document Type *
                  </label>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-line bg-white text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                  >
                    {DOCUMENT_TYPES.map((dt) => (
                      <option key={dt} value={dt}>
                        {dt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* PURPOSE */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Purpose of Requisition *
                  </label>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-line bg-white text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                  >
                    {PURPOSES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                {/* DELIVERY PREFERENCE */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Delivery Preference *
                  </label>
                  <select
                    value={deliveryMode}
                    onChange={(e) => setDeliveryMode(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-line bg-white text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                  >
                    {DELIVERY_MODES.map((dm) => (
                      <option key={dm} value={dm}>
                        {dm}
                      </option>
                    ))}
                  </select>
                </div>

                {/* COURIER DISPATCH ADDRESS */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Destination Shipping Address / Recipient Institute (For Courier or WES)
                  </label>
                  <textarea
                    rows={2}
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Enter complete postal address with PIN code, or WES Reference Number..."
                    className="w-full p-3 rounded-xl border border-line text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40 resize-none"
                  />
                </div>

                {/* PRIORITY LEVEL */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Processing Urgency
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full h-12 px-4 rounded-xl border border-line bg-white text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                  >
                    <option value="Normal">Normal Processing (Standard turnaround)</option>
                    <option value="Urgent">Fast-Track Tatkal (Pending imminent visa / college deadline)</option>
                  </select>
                </div>

                {/* MOCK ATTACHMENT */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Supporting ID / Previous Marks Card Copy (Optional Mock File)
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="h-12 px-4 rounded-xl border border-line bg-ivory text-navy-900 font-semibold text-xs flex items-center gap-2 hover:bg-navy-50 cursor-pointer">
                      <Paperclip className="h-4 w-4 text-gold-600" />
                      <span>Attach Proof Document</span>
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
                  <span>Submit Academic Document Requisition</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
