"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Briefcase,
  Search,
  Building,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Award,
  Users,
  Eye,
  Trash2,
  RotateCcw,
} from "lucide-react";
import { usePortalStore } from "@/store/portal";
import { EmptyState } from "@/components/common/EmptyState";

export function AdminLivePostings() {
  const { jobs, jobApplications, closePosting, reopenPosting, removePosting } = usePortalStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredJobs = jobs.filter((job) => {
    if (statusFilter !== "all" && job.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.postedByAlumniName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* HEADER & CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-line shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy-950 flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-gold-600" />
            <span>Opportunities Moderation & Live Postings</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-0.5">
            Postings are published live without admin bottlenecks. Secretariats review and moderate listings here.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Search by role or enterprise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 pl-9 pr-3 rounded-xl border border-line text-xs bg-ivory/50 focus:outline-none focus:ring-2 focus:ring-navy-950/20"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 rounded-xl border border-line text-xs bg-white text-navy-950 font-semibold"
          >
            <option value="all">All Statuses ({jobs.length})</option>
            <option value="live">Live Only</option>
            <option value="closed">Closed Only</option>
            <option value="removed">Removed Only</option>
          </select>
        </div>
      </div>

      {/* JOBS TABLE */}
      {filteredJobs.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 border border-line shadow-sm">
          <EmptyState
            title="No Opportunities Match Criteria"
            description="Adjust your search query or status filter to inspect other portal job postings."
          />
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-line shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-navy-950">
              <thead className="bg-navy-950 text-gold-300 uppercase tracking-wider text-[11px] font-bold">
                <tr>
                  <th className="py-3.5 px-4">Opportunity</th>
                  <th className="py-3.5 px-4">Organization</th>
                  <th className="py-3.5 px-4">Posted By Alumnus</th>
                  <th className="py-3.5 px-4">Applicants</th>
                  <th className="py-3.5 px-4">Referral Slots</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {filteredJobs.map((job) => {
                  const applicantsCount = jobApplications.filter((a) => a.jobId === job.id).length;
                  const isLive = job.status === "live" || job.status === "approved";

                  return (
                    <tr key={job.id} className="hover:bg-ivory/40 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-bold text-navy-950">{job.title}</div>
                        <div className="text-[11px] text-muted">
                          {job.type} • {job.workMode || "Hybrid"} • {job.domain}
                        </div>
                      </td>

                      <td className="py-4 px-4 font-semibold text-navy-900">
                        {job.company}
                        <div className="text-[11px] text-muted">{job.location}</div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-semibold">{job.postedByAlumniName}</div>
                        <div className="text-[11px] text-muted">Class of {job.postedByBatch}</div>
                      </td>

                      <td className="py-4 px-4">
                        <span className="font-bold text-navy-950 bg-navy-50 px-2 py-1 rounded-lg">
                          {applicantsCount} Candidates
                        </span>
                      </td>

                      <td className="py-4 px-4 font-semibold text-amber-800">
                        {job.canRefer ? `${job.referralSlots ?? 1} Slots` : "None"}
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            isLive
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : job.status === "closed"
                              ? "bg-amber-100 text-amber-900 border border-amber-300"
                              : "bg-red-100 text-red-800 border border-red-300"
                          }`}
                        >
                          {job.status}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          {isLive ? (
                            <button
                              type="button"
                              onClick={() => {
                                closePosting(job.id);
                                toast.info(`Posting "${job.title}" closed.`);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-ivory border border-line text-muted hover:text-navy-950 text-[11px] font-semibold"
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
                              className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 text-[11px] font-semibold hover:bg-emerald-100"
                            >
                              Reopen
                            </button>
                          )}

                          {job.status !== "removed" && (
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Remove posting "${job.title}" from portal?`)) {
                                  removePosting(job.id);
                                  toast.info(`Posting removed.`);
                                }
                              }}
                              className="px-2.5 py-1 rounded-lg bg-red-50 text-red-700 border border-red-200 text-[11px] font-semibold hover:bg-red-100"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

