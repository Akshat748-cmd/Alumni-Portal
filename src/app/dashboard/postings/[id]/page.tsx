"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Users,
  Briefcase,
  Building,
  ArrowLeft,
  MessageSquare,
  Award,
  CheckCircle2,
  FileText,
  Clock,
  ExternalLink,
  ChevronDown,
  Mail,
  User,
} from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { EmptyState } from "@/components/common/EmptyState";
import { AvatarInitials } from "@/components/common/AvatarInitials";
import { usePortalStore } from "@/store/portal";
import { ApplicationStatus } from "@/data/types";

const ALL_STATUSES: ApplicationStatus[] = [
  "Applied",
  "Reviewed",
  "Shortlisted",
  "Interviewing",
  "Offered",
  "Rejected",
];

export default function PostingApplicantsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const { jobs, jobApplications, setApplicationStatus, offerReferral, currentUser } = usePortalStore();

  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({});

  const job = jobs.find((j) => j.id === id);
  const applicants = jobApplications.filter((a) => a.jobId === id);

  const toggleNote = (appId: string) => {
    setExpandedNotes((prev) => ({ ...prev, [appId]: !prev[appId] }));
  };

  const handleStatusChange = (appId: string, candidateName: string, newStatus: ApplicationStatus) => {
    setApplicationStatus(appId, newStatus, `Updated by hiring alumnus ${currentUser?.name || ""}`);
    toast.success(`Candidate ${candidateName} status updated to ${newStatus}`);
  };

  const handleOfferReferral = (appId: string, candidateName: string) => {
    offerReferral(appId);
    toast.success(`Referral awarded to ${candidateName}!`);
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-ivory text-ink">
        <PageHero
          eyebrow="APPLICANT SCREENING"
          title="Posting Not Found"
          subtitle="The requested opportunity ID could not be located in your active directory."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Dashboard", href: "/dashboard" },
            { label: "My Postings", href: "/dashboard/postings" },
            { label: "Applicants" },
          ]}
        />
        <section className="py-16 text-center">
          <Link
            href="/dashboard/postings"
            className="px-6 py-3 rounded-xl bg-navy-950 text-gold-300 font-bold text-sm inline-block"
          >
            Back to My Postings
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <PageHero
        eyebrow="TALENT ACQUISITION • CANDIDATE SCREENING"
        title={`Applicants for ${job.title}`}
        subtitle={`Review student and alumni submissions for ${job.company} (${job.location}). Update candidate progress and endorse referrals.`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Dashboard", href: "/dashboard" },
          { label: "My Postings", href: "/dashboard/postings" },
          { label: "Review Applicants" },
        ]}
      />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-8">
          {/* TOP BACK BAR & POSTING METRICS */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Link
              href="/dashboard/postings"
              className="inline-flex items-center gap-2 text-xs font-bold text-navy-950 hover:text-gold-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to All Postings</span>
            </Link>

            <div className="flex items-center gap-3">
              <span className="text-xs px-3 py-1 rounded-full bg-navy-950 text-gold-300 font-bold">
                {applicants.length} Total Applicants
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-300">
                {job.referralSlots ?? 0} Referral Slots Left
              </span>
            </div>
          </div>

          {/* APPLICANTS TABLE / CARDS */}
          {applicants.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 border border-line shadow-sm">
              <EmptyState
                title="No Applicants for this Position Yet"
                description="This opportunity is live in the Career Hub. Students and alumni who submit their profile will appear here immediately."
                actionLabel="View in Jobs Directory"
                onAction={() => {
                  window.location.href = "/career-hub/jobs";
                }}
              />
            </div>
          ) : (
            <div className="space-y-4">
              {applicants.map((app) => {
                const isNoteExpanded = Boolean(expandedNotes[app.id]);
                const isReferred = Boolean(app.referredBy);

                return (
                  <div
                    key={app.id}
                    className="bg-white rounded-2xl border border-line p-5 sm:p-6 shadow-sm hover:border-gold-500/30 transition-all space-y-4"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* CANDIDATE AVATAR & BASIC DETAILS */}
                      <div className="flex items-start gap-3 min-w-0">
                        <AvatarInitials name={app.applicantName} size="md" className="shrink-0" />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="font-bold text-sm sm:text-base text-navy-950 truncate">
                              {app.applicantName}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                app.applicantRole === "student"
                                  ? "bg-amber-100 text-amber-900 border border-amber-300"
                                  : "bg-navy-100 text-navy-900 border border-navy-200"
                              }`}
                            >
                              {app.applicantRole}
                            </span>
                            {isReferred && (
                              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Award className="h-3 w-3 text-emerald-600" />
                                <span>Referred by {app.referredBy}</span>
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-muted flex items-center gap-1.5 flex-wrap">
                            <span>{app.applicantCourseOrCompany}</span>
                            <span>•</span>
                            <span>Applied: {app.appliedDate}</span>
                            {app.applicantEmail && (
                              <>
                                <span>•</span>
                                <span className="tabular-nums text-[11px]">{app.applicantEmail}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* STATUS CHANGER & QUICK ACTIONS */}
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-muted">Status:</span>
                          <select
                            value={app.status}
                            onChange={(e) =>
                              handleStatusChange(app.id, app.applicantName, e.target.value as ApplicationStatus)
                            }
                            className="h-9 px-3 rounded-xl border border-line text-xs font-bold bg-white text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                          >
                            {ALL_STATUSES.map((st) => (
                              <option key={st} value={st}>{st}</option>
                            ))}
                          </select>
                        </div>

                        {/* MESSAGE APPLICANT */}
                        <Link
                          href={`/messages?startWith=${app.applicantId}&name=${encodeURIComponent(
                            app.applicantName
                          )}`}
                          scroll={false}
                          className="h-9 px-3 rounded-xl bg-ivory border border-line text-navy-900 font-bold text-xs hover:bg-navy-50 transition-colors flex items-center gap-1.5"
                        >
                          <MessageSquare className="h-3.5 w-3.5 text-gold-600" />
                          <span>Chat</span>
                        </Link>

                        {/* OFFER REFERRAL IF NOT REFERRED */}
                        {!isReferred && (job.referralSlots ?? 0) > 0 && (
                          <button
                            type="button"
                            onClick={() => handleOfferReferral(app.id, app.applicantName)}
                            className="h-9 px-3 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs hover:bg-amber-200 transition-colors flex items-center gap-1"
                          >
                            <Award className="h-3.5 w-3.5 text-amber-700" />
                            <span>Endorse Referral</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* COVER NOTE & RESUME STRIP */}
                    <div className="p-3.5 rounded-xl bg-ivory border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gold-600 shrink-0" />
                        <span className="text-muted">Attached Resume:</span>
                        <span className="tabular-nums font-bold text-navy-950">
                          {app.resumeFileName || "Candidate_Profile.pdf"}
                        </span>
                      </div>

                      {app.coverNote && (
                        <button
                          type="button"
                          onClick={() => toggleNote(app.id)}
                          className="text-xs font-semibold text-navy-950 hover:text-gold-600 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
                        >
                          <span>{isNoteExpanded ? "Hide Cover Note" : "Read Cover Note"}</span>
                          <ChevronDown className={`h-3 w-3 transition-transform ${isNoteExpanded ? "rotate-180" : ""}`} />
                        </button>
                      )}
                    </div>

                    {isNoteExpanded && app.coverNote && (
                      <div className="p-4 rounded-xl bg-white border border-line text-xs text-navy-950 leading-relaxed space-y-1">
                        <div className="font-bold text-[10px] uppercase text-muted tracking-wider">
                          Candidate Pitch:
                        </div>
                        <p>{app.coverNote}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
