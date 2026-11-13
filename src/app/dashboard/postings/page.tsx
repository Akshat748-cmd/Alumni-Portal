"use client";

import React from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Briefcase,
  Users,
  Award,
  PlusCircle,
  Eye,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Building,
  Calendar,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { EmptyState } from "@/components/common/EmptyState";
import { usePortalStore } from "@/store/portal";

export default function MyPostingsPage() {
  const { currentUser, jobs, jobApplications, closePosting, reopenPosting, removePosting } = usePortalStore();

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-ivory text-ink">
        <PageHero
          eyebrow="EMPLOYER RECRUITMENT"
          title="Sign In Required"
          subtitle="Please sign in to manage your posted job vacancies and review candidate applications."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Dashboard", href: "/dashboard" },
            { label: "My Postings" },
          ]}
        />
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-lg text-center">
            <Link
              href="/join/auth"
              className="px-6 py-3 rounded-xl bg-navy-950 text-gold-300 font-bold text-sm inline-block"
            >
              Sign In as Alumnus
            </Link>
          </div>
        </section>
      </div>
    );
  }

  // Alumni postings (also fallback to mock alm-1 for demo testing)
  const myPostings = jobs.filter((j) => j.posterId === currentUser.id || (!j.posterId && currentUser.role !== "student"));

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <PageHero
        eyebrow="TALENT ACQUISITION • RECRUITER"
        title="My Job & Internship Postings"
        subtitle="Manage your active listings, inspect candidate applications, and track internal referral quotas."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Dashboard", href: "/dashboard" },
          { label: "My Postings" },
        ]}
      />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy-950">
                Created Opportunities ({myPostings.length})
              </h2>
              <p className="text-xs sm:text-sm text-muted mt-0.5">
                Postings are active immediately and visible to students and alumni across the portal.
              </p>
            </div>
            <Link
              href="/career-hub/post"
              className="px-5 py-3 rounded-xl bg-navy-950 text-gold-300 font-bold text-xs hover:bg-navy-900 transition-colors inline-flex items-center gap-2 self-start sm:self-auto shadow-md"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Post New Opening</span>
            </Link>
          </div>

          {myPostings.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 border border-line shadow-sm">
              <EmptyState
                title="No Openings Listed Yet"
                description="You haven't posted any jobs or internships yet. Create a listing to tap into pre-screened talent from Poddar Institutions."
                actionLabel="Create an Opportunity"
                onAction={() => {
                  window.location.href = "/career-hub/post";
                }}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myPostings.map((job) => {
                const applicants = jobApplications.filter((a) => a.jobId === job.id);
                const isLive = job.status === "live" || job.status === "approved";

                return (
                  <div
                    key={job.id}
                    className="bg-white rounded-3xl p-6 sm:p-7 border border-line shadow-sm hover:border-gold-500/40 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                            isLive
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : "bg-gray-100 text-gray-800 border border-gray-300"
                          }`}
                        >
                          {isLive ? "● Live & Accepting" : "Closed"}
                        </span>
                        <span className="text-xs text-muted">
                          Posted: {job.postedDate || "Recently"}
                        </span>
                      </div>

                      <h3 className="text-lg font-serif font-bold text-navy-950 mb-1">
                        {job.title}
                      </h3>
                      <div className="text-xs font-semibold text-navy-800 flex items-center gap-1.5 mb-3">
                        <Building className="h-3.5 w-3.5 text-gold-600" />
                        <span>{job.company}</span>
                        <span className="text-muted">•</span>
                        <span className="text-muted font-normal">{job.location} ({job.workMode || "Hybrid"})</span>
                      </div>

                      <div className="p-3 rounded-2xl bg-ivory border border-line grid grid-cols-2 gap-3 text-xs mb-4">
                        <div>
                          <span className="text-muted block text-[10px] uppercase font-bold">Candidates</span>
                          <span className="text-base font-bold text-navy-950">{applicants.length} Applicants</span>
                        </div>
                        <div>
                          <span className="text-muted block text-[10px] uppercase font-bold">Referral Slots</span>
                          <span className="text-base font-bold text-amber-700">
                            {job.canRefer ? `${job.referralSlots ?? 1} Available` : "Disabled"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-line flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {isLive ? (
                          <button
                            type="button"
                            onClick={() => {
                              closePosting(job.id);
                              toast.info(`Posting "${job.title}" closed.`);
                            }}
                            className="px-3 py-1.5 rounded-xl border border-line text-xs font-semibold text-muted hover:text-navy-950 transition-colors"
                          >
                            Close
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              reopenPosting(job.id);
                              toast.success(`Posting "${job.title}" reopened.`);
                            }}
                            className="px-3 py-1.5 rounded-xl border border-emerald-300 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 transition-colors"
                          >
                            Reopen
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Remove posting "${job.title}"?`)) {
                              removePosting(job.id);
                              toast.info("Posting removed.");
                            }
                          }}
                          className="px-3 py-1.5 rounded-xl text-xs text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      </div>

                      <Link
                        href={`/dashboard/postings/${job.id}`}
                        className="px-4 py-2 rounded-xl bg-navy-950 text-gold-300 font-bold text-xs hover:bg-navy-900 transition-colors inline-flex items-center gap-1.5 shadow-sm"
                      >
                        <Users className="h-3.5 w-3.5" />
                        <span>Review Applicants ({applicants.length})</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
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
