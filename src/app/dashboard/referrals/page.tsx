"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Award,
  Briefcase,
  CheckCircle2,
  XCircle,
  MessageSquare,
  FileText,
  Clock,
  ArrowRight,
  Sparkles,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { EmptyState } from "@/components/common/EmptyState";
import { AvatarInitials } from "@/components/common/AvatarInitials";
import { usePortalStore } from "@/store/portal";
import { ReferralStatus } from "@/data/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const DECLINE_REASONS = [
  "Skills mismatch for current openings",
  "All internal referral slots exhausted",
  "Role has progressed to final candidate rounds",
  "Position closed by enterprise recruitment team",
  "Other / general guidance",
];

export default function ReferralCenterPage() {
  const {
    currentUser,
    referrals,
    respondReferral,
    startConversation,
  } = usePortalStore();

  const [activeTab, setActiveTab] = useState<"made" | "received">(
    currentUser?.role === "student" ? "made" : "received"
  );

  // Decline dialog state
  const [declineRefId, setDeclineRefId] = useState<string | null>(null);
  const [selectedDeclineReason, setSelectedDeclineReason] = useState(DECLINE_REASONS[0]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-ivory text-ink">
        <PageHero
          eyebrow="REFERRAL PORTAL"
          title="Sign In Required"
          subtitle="Please sign in to track your referral requests or endorse candidates."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Dashboard", href: "/dashboard" },
            { label: "Referrals" },
          ]}
        />
        <section className="py-16 text-center">
          <Link
            href="/join/auth"
            className="px-6 py-3 rounded-xl bg-navy-950 text-gold-300 font-bold text-sm inline-block"
          >
            Sign In to Portal
          </Link>
        </section>
      </div>
    );
  }

  const requestsMade = referrals.filter((r) => r.requesterId === currentUser.id);
  const requestsReceived = referrals.filter((r) => r.referrerId === currentUser.id);

  const getStatusBadge = (status: ReferralStatus) => {
    switch (status) {
      case "Requested":
        return "bg-slate-100 text-slate-800 border-slate-300";
      case "Accepted":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Referred":
        return "bg-emerald-100 text-emerald-800 border-emerald-300 font-bold";
      case "Declined":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAccept = (refId: string, candidateName: string, candidateId: string) => {
    respondReferral(refId, "accept");
    // Also start a chat
    startConversation(
      candidateId,
      undefined,
      `Hello ${candidateName}, I have accepted your referral request. Let's discuss your candidacy!`
    );
    toast.success(`Referral accepted! Conversation opened with ${candidateName}.`);
  };

  const handleMarkReferred = (refId: string, candidateName: string) => {
    respondReferral(refId, "referred");
    toast.success(`Candidate ${candidateName} marked as Referred! Application updated.`);
  };

  const handleConfirmDecline = () => {
    if (!declineRefId) return;
    respondReferral(declineRefId, "decline", selectedDeclineReason);
    toast.info("Referral request declined.");
    setDeclineRefId(null);
  };

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <PageHero
        eyebrow="OPPORTUNITIES NETWORK • ENDORSEMENTS"
        title="Alumni Referral Center"
        subtitle="Manage peer endorsements, track internal sponsorship requests, and connect candidates directly to hiring teams."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Dashboard", href: "/dashboard" },
          { label: "Referral Center" },
        ]}
      />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          {/* TAB CONTROLS */}
          <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-ivory border border-line mb-8 max-w-md mx-auto">
            <button
              type="button"
              onClick={() => setActiveTab("made")}
              className={`py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === "made"
                  ? "bg-navy-950 text-gold-300 shadow-sm"
                  : "text-muted hover:text-navy-950"
              }`}
            >
              Requests I Made ({requestsMade.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("received")}
              className={`py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === "received"
                  ? "bg-navy-950 text-gold-300 shadow-sm"
                  : "text-muted hover:text-navy-950"
              }`}
            >
              Requests I Received ({requestsReceived.length})
            </button>
          </div>

          {/* REQUESTS I MADE VIEW */}
          {activeTab === "made" && (
            <div>
              {requestsMade.length === 0 ? (
                <div className="bg-white rounded-3xl p-8 border border-line shadow-sm">
                  <EmptyState
                    title="No Referral Requests Made"
                    description="You haven't requested any internal endorsements yet. When applying to jobs with referral slots in the Career Hub, request an alumni endorsement to stand out."
                    actionLabel="Browse Live Openings"
                    onAction={() => {
                      window.location.href = "/career-hub/jobs";
                    }}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  {requestsMade.map((ref) => (
                    <div
                      key={ref.id}
                      className="bg-white rounded-2xl border border-line p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span
                            className={`text-xs px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                              ref.status
                            )}`}
                          >
                            {ref.status}
                          </span>
                          <span className="text-xs text-muted">
                            Requested: {ref.createdAt}
                          </span>
                        </div>

                        <h3 className="text-base font-serif font-bold text-navy-950 truncate">
                          {ref.jobTitle}
                        </h3>
                        <div className="text-xs text-muted flex items-center gap-1.5 mt-0.5">
                          <span>{ref.company}</span>
                          <span>•</span>
                          <span className="text-navy-900 font-semibold">
                            Referrer: {ref.referrerName}
                          </span>
                        </div>

                        <p className="text-xs text-navy-900/80 bg-ivory p-3 rounded-xl border border-line mt-3 italic">
                          &ldquo;{ref.message}&rdquo;
                        </p>

                        {ref.declineReason && (
                          <div className="mt-2 text-xs text-red-700 bg-red-50 p-2.5 rounded-xl border border-red-200">
                            <strong>Feedback:</strong> {ref.declineReason}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Link
                          href={`/messages?startWith=${ref.referrerId}&name=${encodeURIComponent(
                            ref.referrerName
                          )}`}
                          scroll={false}
                          className="px-3.5 py-2 rounded-xl bg-ivory border border-line text-navy-900 font-bold text-xs hover:bg-navy-50 transition-colors flex items-center gap-1.5"
                        >
                          <MessageSquare className="h-3.5 w-3.5 text-gold-600" />
                          <span>Message Alumnus</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* REQUESTS I RECEIVED VIEW (FOR ALUMNI) */}
          {activeTab === "received" && (
            <div>
              {requestsReceived.length === 0 ? (
                <div className="bg-white rounded-3xl p-8 border border-line shadow-sm">
                  <EmptyState
                    title="No Referral Requests Received"
                    description="When candidates apply for roles at your organization, their endorsement requests will appear here for review."
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  {requestsReceived.map((ref) => {
                    const isPending = ref.status === "Requested";
                    const isAccepted = ref.status === "Accepted";
                    const isReferred = ref.status === "Referred";

                    return (
                      <div
                        key={ref.id}
                        className="bg-white rounded-2xl border border-line p-5 sm:p-6 shadow-sm space-y-4"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex items-start gap-3 min-w-0">
                            <AvatarInitials name={ref.requesterName} size="md" className="shrink-0" />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="font-bold text-sm sm:text-base text-navy-950 truncate">
                                  {ref.requesterName}
                                </span>
                                <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                    ref.requesterRole === "student"
                                      ? "bg-amber-100 text-amber-900 border border-amber-300"
                                      : "bg-navy-100 text-navy-900"
                                  }`}
                                >
                                  {ref.requesterRole}
                                </span>
                                <span
                                  className={`text-xs px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                                    ref.status
                                  )}`}
                                >
                                  {ref.status}
                                </span>
                              </div>
                              <div className="text-xs text-muted">
                                For <strong className="text-navy-950 font-semibold">{ref.jobTitle}</strong> ({ref.company}) • {ref.requesterCourseOrCompany}
                              </div>
                            </div>
                          </div>

                          {/* ACTION BUTTONS */}
                          <div className="flex flex-wrap items-center gap-2 shrink-0">
                            {isPending && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => handleAccept(ref.id, ref.requesterName, ref.requesterId)}
                                  className="px-3.5 py-2 rounded-xl bg-navy-950 text-gold-300 font-bold text-xs hover:bg-navy-900 transition-colors"
                                >
                                  Accept & Chat
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDeclineRefId(ref.id)}
                                  className="px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors"
                                >
                                  Decline
                                </button>
                              </>
                            )}

                            {isAccepted && (
                              <button
                                type="button"
                                onClick={() => handleMarkReferred(ref.id, ref.requesterName)}
                                className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors flex items-center gap-1.5"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                <span>Mark as Referred</span>
                              </button>
                            )}

                            <Link
                              href={`/messages?startWith=${ref.requesterId}&name=${encodeURIComponent(
                                ref.requesterName
                              )}`}
                              scroll={false}
                              className="px-3.5 py-2 rounded-xl bg-ivory border border-line text-navy-900 font-bold text-xs hover:bg-navy-50 transition-colors flex items-center gap-1.5"
                            >
                              <MessageSquare className="h-3.5 w-3.5 text-gold-600" />
                              <span>Chat</span>
                            </Link>
                          </div>
                        </div>

                        {/* MESSAGE & RESUME NOTE */}
                        <div className="p-3.5 rounded-xl bg-ivory border border-line text-xs space-y-2">
                          <p className="text-navy-950 leading-relaxed italic">
                            &ldquo;{ref.message}&rdquo;
                          </p>
                          <div className="flex items-center gap-2 text-muted pt-2 border-t border-line/60">
                            <FileText className="h-3.5 w-3.5 text-gold-600" />
                            <span>Candidate Resume:</span>
                            <span className="tabular-nums font-bold text-navy-950">
                              {ref.resumeFileName}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* DECLINE REASON DIALOG */}
      <Dialog open={Boolean(declineRefId)} onOpenChange={(open) => !open && setDeclineRefId(null)}>
        <DialogContent className="sm:max-w-md bg-white rounded-3xl p-6" data-lenis-prevent>
          <DialogHeader className="border-b border-line pb-3">
            <DialogTitle className="text-lg font-serif font-bold text-navy-950">
              Decline Referral Request
            </DialogTitle>
            <DialogDescription className="text-xs text-muted">
              Select a reason to provide professional feedback to the candidate.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                Feedback Reason
              </label>
              <select
                value={selectedDeclineReason}
                onChange={(e) => setSelectedDeclineReason(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-line text-xs bg-white focus:outline-none focus:ring-2 focus:ring-red-500/30"
              >
                {DECLINE_REASONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeclineRefId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-muted hover:text-navy-950"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDecline}
                className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition-colors"
              >
                Confirm Decline
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
