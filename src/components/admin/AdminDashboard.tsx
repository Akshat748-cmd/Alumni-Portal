"use client";

import React from "react";
import {
  Users,
  Award,
  Briefcase,
  GraduationCap,
  HelpCircle,
  Building2,
  HeartHandshake,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  FileCheck2,
} from "lucide-react";
import { StatCard } from "@/components/common/StatCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SubmittedQueueItem } from "@/store/portal";

interface AdminDashboardProps {
  counts: Record<string, number>;
  totalSubmitted: number;
  queue: SubmittedQueueItem[];
  onNavigateTab: (tabId: string) => void;
}

export function AdminDashboard({
  counts,
  totalSubmitted,
  queue,
  onNavigateTab,
}: AdminDashboardProps) {
  const pendingTotal =
    (counts.profiles || 0) +
    (counts.achievements || 0) +
    (counts.opportunities || 0) +
    (counts.mentorship || 0) +
    (counts.tickets || 0) +
    (counts.businesses || 0) +
    (counts.giveback || 0);

  const approvedCount = queue.filter((q) => q.status === "approved").length;
  const pendingCount = queue.filter((q) => q.status === "pending").length;
  const rejectedCount = queue.filter((q) => q.status === "rejected").length;
  const totalInQueue = queue.length || 1;

  const approvedPct = Math.round((approvedCount / totalInQueue) * 100);
  const pendingPct = Math.round((pendingCount / totalInQueue) * 100);
  const rejectedPct = 100 - approvedPct - pendingPct;

  // Breakdown by type data for bar chart
  const categories = [
    { label: "Profiles", count: counts.profiles || 0, tab: "profiles", color: "bg-blue-500" },
    { label: "Achievements", count: counts.achievements || 0, tab: "achievements", color: "bg-amber-500" },
    { label: "Opportunities", count: counts.opportunities || 0, tab: "opportunities", color: "bg-emerald-500" },
    { label: "Mentorship", count: counts.mentorship || 0, tab: "mentorship", color: "bg-purple-500" },
    { label: "Queries", count: counts.tickets || 0, tab: "queries", color: "bg-rose-500" },
    { label: "Businesses", count: counts.businesses || 0, tab: "businesses", color: "bg-teal-500" },
    { label: "Give Back", count: counts.giveback || 0, tab: "giveback", color: "bg-indigo-500" },
  ];

  const maxCategoryCount = Math.max(...categories.map((c) => c.count), 5);

  const recentItems = [...queue].slice(0, 8);

  return (
    <div className="space-y-8">
      {/* Overview Stat Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-serif text-lg font-bold text-navy-950">
              Pending Moderation Queues
            </h2>
            <p className="text-xs text-muted">
              Live items awaiting administrative review and approval.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
            {pendingTotal} Total Pending
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            onClick={() => onNavigateTab("profiles")}
            className="cursor-pointer transition-transform hover:-translate-y-0.5"
          >
            <StatCard
              label="Pending Profiles"
              value={counts.profiles || 0}
              icon={Users}
              featured={(counts.profiles || 0) > 0}
            />
          </div>

          <div
            onClick={() => onNavigateTab("achievements")}
            className="cursor-pointer transition-transform hover:-translate-y-0.5"
          >
            <StatCard
              label="Achievements"
              value={counts.achievements || 0}
              icon={Award}
              featured={(counts.achievements || 0) > 0}
            />
          </div>

          <div
            onClick={() => onNavigateTab("opportunities")}
            className="cursor-pointer transition-transform hover:-translate-y-0.5"
          >
            <StatCard
              label="Job Postings"
              value={counts.opportunities || 0}
              icon={Briefcase}
              featured={(counts.opportunities || 0) > 0}
            />
          </div>

          <div
            onClick={() => onNavigateTab("mentorship")}
            className="cursor-pointer transition-transform hover:-translate-y-0.5"
          >
            <StatCard
              label="Mentorship"
              value={counts.mentorship || 0}
              icon={GraduationCap}
              featured={(counts.mentorship || 0) > 0}
            />
          </div>

          <div
            onClick={() => onNavigateTab("queries")}
            className="cursor-pointer transition-transform hover:-translate-y-0.5"
          >
            <StatCard
              label="Open Queries"
              value={counts.tickets || 0}
              icon={HelpCircle}
              featured={(counts.tickets || 0) > 0}
            />
          </div>

          <div
            onClick={() => onNavigateTab("businesses")}
            className="cursor-pointer transition-transform hover:-translate-y-0.5"
          >
            <StatCard
              label="Business Directory"
              value={counts.businesses || 0}
              icon={Building2}
              featured={(counts.businesses || 0) > 0}
            />
          </div>

          <div
            onClick={() => onNavigateTab("giveback")}
            className="cursor-pointer transition-transform hover:-translate-y-0.5"
          >
            <StatCard
              label="Give Back & Events"
              value={counts.giveback || 0}
              icon={HeartHandshake}
              featured={(counts.giveback || 0) > 0}
            />
          </div>

          <div
            onClick={() => onNavigateTab("content")}
            className="cursor-pointer transition-transform hover:-translate-y-0.5"
          >
            <StatCard
              label="Total Submissions"
              value={queue.length}
              icon={FileCheck2}
            />
          </div>
        </div>
      </div>

      {/* Visual Charts & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Submissions by Queue Type */}
        <Card className="lg:col-span-2 border-line shadow-navy-soft rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-serif text-base text-navy-950">
                  Submissions Volume by Workflow
                </CardTitle>
                <CardDescription className="text-xs">
                  Pending volume distributed across administrative moderation pipelines.
                </CardDescription>
              </div>
              <TrendingUp className="h-4 w-4 text-muted" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 pt-2">
              {categories.map((cat) => {
                const pct = Math.max(8, Math.round((cat.count / maxCategoryCount) * 100));
                return (
                  <div key={cat.label} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-navy-950">{cat.label}</span>
                      <span className="text-muted font-mono">{cat.count} pending</span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden flex">
                      <div
                        className={`h-full ${cat.color} rounded-full transition-all duration-500`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Chart 2: Status Breakdown Donut/Segments */}
        <Card className="border-line shadow-navy-soft rounded-2xl flex flex-col">
          <CardHeader>
            <CardTitle className="font-serif text-base text-navy-950">
              Moderation Pipeline Status
            </CardTitle>
            <CardDescription className="text-xs">
              Resolution distribution of all processed items.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            {/* SVG Donut Chart */}
            <div className="py-2 flex items-center justify-center">
              <div className="relative h-40 w-40 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                  {/* Background Circle */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.91549430918954"
                    fill="transparent"
                    stroke="#f1f5f9"
                    strokeWidth="3.5"
                  />
                  {/* Approved segment */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.91549430918954"
                    fill="transparent"
                    stroke="#10b981"
                    strokeWidth="3.5"
                    strokeDasharray={`${approvedPct} ${100 - approvedPct}`}
                    strokeDashoffset="0"
                  />
                  {/* Pending segment */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.91549430918954"
                    fill="transparent"
                    stroke="#f59e0b"
                    strokeWidth="3.5"
                    strokeDasharray={`${pendingPct} ${100 - pendingPct}`}
                    strokeDashoffset={`${-approvedPct}`}
                  />
                  {/* Rejected segment */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.91549430918954"
                    fill="transparent"
                    stroke="#f43f5e"
                    strokeWidth="3.5"
                    strokeDasharray={`${rejectedPct} ${100 - rejectedPct}`}
                    strokeDashoffset={`${-(approvedPct + pendingPct)}`}
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="font-serif text-2xl font-bold text-navy-950 block leading-tight">
                    {queue.length}
                  </span>
                  <span className="text-[10px] uppercase font-semibold text-muted">
                    Total Items
                  </span>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-line text-center text-xs">
              <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-100">
                <span className="block text-[10px] uppercase font-semibold text-emerald-800">
                  Approved
                </span>
                <span className="font-serif text-base font-bold text-emerald-700">
                  {approvedCount}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-amber-50/70 border border-amber-100">
                <span className="block text-[10px] uppercase font-semibold text-amber-800">
                  Pending
                </span>
                <span className="font-serif text-base font-bold text-amber-700">
                  {pendingCount}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-rose-50/70 border border-rose-100">
                <span className="block text-[10px] uppercase font-semibold text-rose-800">
                  Rejected
                </span>
                <span className="font-serif text-base font-bold text-rose-700">
                  {rejectedCount}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Audit Feed */}
      <Card className="border-line shadow-navy-soft rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-serif text-base text-navy-950">
                Recent Queue Activity Log
              </CardTitle>
              <CardDescription className="text-xs">
                Chronological ledger of user submissions and administrative moderation status.
              </CardDescription>
            </div>
            <Clock className="h-4 w-4 text-muted" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-line">
            {recentItems.length === 0 ? (
              <div className="py-8 text-center text-xs text-muted">
                No submissions in the moderation queue.
              </div>
            ) : (
              recentItems.map((item) => (
                <div
                  key={item.id}
                  className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full shrink-0 bg-navy-400" />
                    <div>
                      <div className="font-semibold text-navy-950">
                        {item.payload?.title ||
                          item.payload?.name ||
                          item.payload?.businessName ||
                          item.payload?.subject ||
                          item.payload?.fullName ||
                          `Submission: ${item.type}`}
                      </div>
                      <div className="text-[11px] text-muted flex items-center gap-2 mt-0.5">
                        <span className="capitalize font-medium text-navy-800">
                          Type: {item.type.replace("-", " ")}
                        </span>
                        <span>•</span>
                        <span>By {item.submittedBy || "Community Member"}</span>
                        <span>•</span>
                        <span>{item.createdAt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <StatusBadge status={item.status} size="sm" />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const targetTab =
                          item.type === "registration" || item.type === "profile-update"
                            ? "profiles"
                            : item.type === "achievement"
                            ? "achievements"
                            : item.type === "opportunity"
                            ? "opportunities"
                            : item.type === "mentor-signup" || item.type === "mentorship-request"
                            ? "mentorship"
                            : item.type === "ticket"
                            ? "queries"
                            : item.type === "business"
                            ? "businesses"
                            : "giveback";
                        onNavigateTab(targetTab);
                      }}
                      className="h-7 px-2 text-[11px] text-navy-700 hover:text-navy-950 hover:bg-slate-100"
                    >
                      Inspect
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

