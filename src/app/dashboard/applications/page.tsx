"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  FileText,
  Building,
  Calendar,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  XCircle,
  ExternalLink,
  ArrowRight,
  Briefcase,
  Award,
} from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { EmptyState } from "@/components/common/EmptyState";
import { usePortalStore } from "@/store/portal";
import { ApplicationStatus } from "@/data/types";

export default function MyApplicationsPage() {
  const { currentUser, jobApplications, withdrawApplication, jobs } = usePortalStore();
  const [expandedAppId, setExpandedAppId] = useState<string | null>(null);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-ivory text-ink">
        <PageHero
          eyebrow="APPLICATIONS TRACKER"
          title="Sign In Required"
          subtitle="Please sign in to view and track your submitted job and internship applications."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Dashboard", href: "/dashboard" },
            { label: "My Applications" },
          ]}
        />
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-lg text-center">
            <Link
              href="/join/auth"
              className="px-6 py-3 rounded-xl bg-navy-950 text-gold-300 font-bold text-sm inline-block"
            >
              Go to Sign In
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const userApplications = jobApplications.filter((a) => a.applicantId === currentUser.id);

  const getStatusBadgeClass = (status: ApplicationStatus) => {
    switch (status) {
      case "Applied":
        return "bg-slate-100 text-slate-800 border-slate-300";
      case "Reviewed":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Shortlisted":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "Interviewing":
        return "bg-amber-100 text-amber-900 border-amber-300";
      case "Offered":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-300";
      case "Withdrawn":
        return "bg-gray-200 text-gray-700 border-gray-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleWithdraw = (id: string, title: string) => {
    if (confirm(`Are you sure you want to withdraw your application for "${title}"?`)) {
      withdrawApplication(id);
      toast.info("Application marked as withdrawn.");
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedAppId(expandedAppId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <PageHero
        eyebrow="CANDIDATE CENTER • SUBMISSIONS"
        title="My Applications"
        subtitle="Real-time status tracking, referral updates, and recruiter messaging for all your submitted opportunities."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Dashboard", href: "/dashboard" },
          { label: "My Applications" },
        ]}
      />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          {/* HEADER SUMMARY */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy-950">
                Application Pipeline ({userApplications.length})
              </h2>
              <p className="text-xs sm:text-sm text-muted mt-0.5">
                Review progress, view feedback notes, or communicate with the hiring alumni.
              </p>
            </div>
            <Link
              href="/career-hub/jobs"
              className="px-4 py-2.5 rounded-xl bg-navy-950 text-gold-300 font-bold text-xs hover:bg-navy-900 transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
            >
              <Briefcase className="h-4 w-4" />
              <span>Browse More Openings</span>
            </Link>
          </div>

          {userApplications.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 border border-line shadow-sm">
              <EmptyState
                title="No Applications Recorded"
                description="You haven't submitted any job or internship applications yet. Browse the Opportunities Network in Career Hub to find matching roles."
                actionLabel="Explore Opportunities"
                onAction={() => {
                  window.location.href = "/career-hub/jobs";
                }}
              />
            </div>
          ) : (
            <div className="space-y-4">
              {userApplications.map((app) => {
                const isExpanded = expandedAppId === app.id;
                const job = jobs.find((j) => j.id === app.jobId);
                const canWithdraw = app.status !== "Withdrawn" && (app.status as string) !== "Rejected" && (app.status as string) !== "Offered" && (app.status as string) !== "Selected" && (app.status as string) !== "Not selected";

                return (
                  <div
                    key={app.id}
                    className="bg-white rounded-2xl border border-line shadow-sm hover:border-gold-500/30 transition-all overflow-hidden"
                  >
                    <div className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {/* ROLE & COMPANY */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span
                            className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadgeClass(
                              app.status
                            )}`}
                          >
                            {app.status}
                          </span>
                          {app.referredBy && (
                            <span className="text-[11px] font-semibold text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Award className="h-3 w-3 text-amber-600" />
                              <span>Referred by {app.referredBy}</span>
                            </span>
                          )}
                          <span className="text-xs text-muted">
                            Submitted: {app.appliedDate}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-serif font-bold text-navy-950 truncate">
                          {app.jobTitle}
                        </h3>
                        <div className="text-xs text-navy-800 font-semibold flex items-center gap-1.5 mt-0.5">
                          <Building className="h-3.5 w-3.5 text-gold-600" />
                          <span>{app.company}</span>
                          {app.resumeFileName && (
                            <>
                              <span className="text-muted">•</span>
                              <span className="text-muted font-normal">Resume: {app.resumeFileName}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* ACTIONS */}
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <Link
                          href={`/messages?startWith=${job?.posterId || "alm-1"}&name=${encodeURIComponent(
                            job?.postedByAlumniName || "Hiring Team"
                          )}`}
                          scroll={false}
                          className="px-3 py-2 rounded-xl bg-ivory border border-line text-navy-900 font-bold text-xs hover:bg-navy-50 transition-colors flex items-center gap-1.5"
                        >
                          <MessageSquare className="h-3.5 w-3.5 text-gold-600" />
                          <span>Message Recruiter</span>
                        </Link>

                        {canWithdraw && (
                          <button
                            type="button"
                            onClick={() => handleWithdraw(app.id, app.jobTitle)}
                            className="px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors"
                          >
                            Withdraw
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => toggleExpand(app.id)}
                          className="px-3 py-2 rounded-xl bg-navy-950 text-gold-300 font-bold text-xs hover:bg-navy-900 transition-colors flex items-center gap-1"
                        >
                          <span>Timeline</span>
                          {isExpanded ? (
                            <ChevronUp className="h-3.5 w-3.5" />
                          ) : (
                            <ChevronDown className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* EXPANDED TIMELINE & COVER NOTE */}
                    {isExpanded && (
                      <div className="p-5 sm:p-6 bg-ivory/60 border-t border-line space-y-4">
                        {app.coverNote && (
                          <div>
                            <div className="text-[11px] font-bold text-navy-950 uppercase tracking-wider mb-1">
                              Cover Note / Pitch Submitted:
                            </div>
                            <p className="text-xs text-navy-900/90 bg-white p-3 rounded-xl border border-line leading-relaxed">
                              {app.coverNote}
                            </p>
                          </div>
                        )}

                        <div>
                          <div className="text-[11px] font-bold text-navy-950 uppercase tracking-wider mb-2">
                            Status Progression History:
                          </div>
                          <div className="relative pl-6 space-y-3 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-line">
                            {app.statusHistory.map((h, i) => (
                              <div key={i} className="relative flex items-start gap-2 text-xs">
                                <span className="absolute -left-6 top-1 h-2.5 w-2.5 rounded-full bg-gold-500 ring-4 ring-white" />
                                <div>
                                  <div className="font-bold text-navy-950 flex items-center gap-2">
                                    <span>{h.status}</span>
                                    <span className="text-[10px] text-muted font-normal">({h.date})</span>
                                  </div>
                                  {h.note && <p className="text-muted mt-0.5">{h.note}</p>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
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
