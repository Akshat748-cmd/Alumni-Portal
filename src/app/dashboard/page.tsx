"use client";

import React from "react";
import Link from "next/link";
import {
  Briefcase,
  FileText,
  Award,
  MessageSquare,
  Sparkles,
  ArrowRight,
  PlusCircle,
  CheckCircle2,
  Clock,
  User,
  GraduationCap,
  Building,
  TrendingUp,
  Bookmark,
  LogIn,
} from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { StatCard } from "@/components/common/StatCard";
import { EmptyState } from "@/components/common/EmptyState";
import { AvatarInitials } from "@/components/common/AvatarInitials";
import { usePortalStore } from "@/store/portal";
import { DEMO_ALUMNUS, DEMO_STUDENT } from "@/data/opportunitiesNetwork";

export default function DashboardPage() {
  const {
    currentUser,
    jobs,
    jobApplications,
    referrals,
    conversations,
    savedJobIds,
    switchDemoUser,
  } = usePortalStore();

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-ivory text-ink">
        <PageHero
          eyebrow="MEMBER DASHBOARD"
          title="Sign In to Your Hub"
          subtitle="Access your active applications, job postings, candidate referrals, and direct messaging."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Dashboard" },
          ]}
        />
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-line shadow-xl">
              {/* Institutional Avatar / Icon */}
              <div className="h-14 w-14 sm:h-16 sm:w-16 mx-auto rounded-2xl bg-navy-950 border border-gold-500/30 flex items-center justify-center text-gold-300 mb-5 shadow-xs">
                <User className="h-7 w-7 sm:h-8 sm:w-8 text-gold-300" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-navy-950 mb-2">
                Member Session Required
              </h2>
              <p className="text-xs sm:text-sm text-muted max-w-md mx-auto mb-8 leading-relaxed">
                Sign in with your account credentials, or explore the platform instantly using our evaluator demo personas.
              </p>

              {/* Primary Action: Standard Sign In */}
              <Link
                href="/join/auth?tab=login"
                className="w-full py-3.5 px-6 rounded-xl bg-navy-950 hover:bg-navy-900 text-gold-300 font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 group mb-6 cursor-pointer"
              >
                <LogIn className="h-4 w-4 text-gold-400 group-hover:scale-110 transition-transform" />
                <span>Sign In with Account Credentials</span>
                <ArrowRight className="h-4 w-4 text-gold-400 group-hover:translate-x-1 transition-transform ml-auto sm:ml-0" />
              </Link>

              {/* Subtle Divider */}
              <div className="relative flex items-center justify-center mb-6">
                <div className="border-t border-line w-full" />
                <span className="bg-white px-3 text-[11px] font-bold uppercase tracking-wider text-muted shrink-0">
                  Or 1-Click Evaluator Access
                </span>
                <div className="border-t border-line w-full" />
              </div>

              {/* Two Sleek Persona Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left mb-6">
                {/* 1. Alumnus Persona Tile */}
                <button
                  type="button"
                  onClick={() => switchDemoUser("alumnus")}
                  className="p-4 rounded-2xl border border-line bg-[#FAF8F5] hover:bg-gold-500/10 hover:border-gold-400/80 transition-all duration-200 group text-left cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-10 w-10 rounded-xl bg-navy-950 border border-gold-400/30 flex items-center justify-center text-gold-300 group-hover:scale-105 transition-transform">
                        <Briefcase className="h-5 w-5 text-gold-400" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold-500/15 text-navy-950 border border-gold-500/30">
                        Alumni Role
                      </span>
                    </div>
                    <div className="font-bold text-sm text-navy-950 group-hover:text-gold-700 transition-colors">
                      Vikramaditya Rathore
                    </div>
                    <div className="text-[11px] text-muted font-medium mt-0.5">
                      MD @ Apex Capital • Class of 2008
                    </div>
                    <p className="text-[11px] text-muted/80 mt-2 line-clamp-2 leading-relaxed">
                      Post vacancies, review applicants & endorse candidate referrals.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between text-xs font-bold text-navy-950 group-hover:text-gold-700 transition-colors">
                    <span>Enter as Alumnus</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                {/* 2. Student Persona Tile */}
                <button
                  type="button"
                  onClick={() => switchDemoUser("student")}
                  className="p-4 rounded-2xl border border-line bg-[#FAF8F5] hover:bg-emerald-500/10 hover:border-emerald-400/80 transition-all duration-200 group text-left cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-10 w-10 rounded-xl bg-emerald-950 border border-emerald-400/30 flex items-center justify-center text-emerald-300 group-hover:scale-105 transition-transform">
                        <GraduationCap className="h-5 w-5 text-emerald-400" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 border border-emerald-500/30">
                        Student Role
                      </span>
                    </div>
                    <div className="font-bold text-sm text-navy-950 group-hover:text-emerald-700 transition-colors">
                      Aarav Mehta
                    </div>
                    <div className="text-[11px] text-muted font-medium mt-0.5">
                      B.Tech CS • Class of 2026
                    </div>
                    <p className="text-[11px] text-muted/80 mt-2 line-clamp-2 leading-relaxed">
                      Apply to internships, track statuses & request alumni referrals.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between text-xs font-bold text-navy-950 group-hover:text-emerald-700 transition-colors">
                    <span>Enter as Student</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>

              {/* Registration Link */}
              <div className="text-center pt-1">
                <Link
                  href="/join/auth?tab=register"
                  className="text-xs text-muted hover:text-navy-950 font-medium inline-flex items-center gap-1 transition-colors"
                >
                  <span>New graduate or student? Register for portal access</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const isStudent = currentUser.role === "student";

  // Student metrics
  const myApplications = jobApplications.filter((a) => a.applicantId === currentUser.id);
  const myReferralRequests = referrals.filter((r) => r.requesterId === currentUser.id);
  const unreadMessagesCount = conversations.reduce(
    (acc, c) => acc + (c.unreadCount[currentUser.id] || 0),
    0
  );

  // Alumnus metrics
  const myPostings = jobs.filter(
    (j) => j.posterId === currentUser.id && (j.status === "live" || j.status === "approved")
  );
  const receivedApplicantsCount = jobApplications.filter((a) =>
    myPostings.some((j) => j.id === a.jobId)
  ).length;
  const receivedReferralRequests = referrals.filter((r) => r.referrerId === currentUser.id);
  const pendingReferralRequests = receivedReferralRequests.filter((r) => r.status === "Requested");

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <PageHero
        eyebrow="OPPORTUNITIES NETWORK • HUB"
        title={isStudent ? "Student Career Dashboard" : "Alumni Executive Dashboard"}
        subtitle={
          isStudent
            ? "Track your applications, request alumni job referrals, and converse directly with verified sponsors."
            : "Manage your company job postings, review student applicants, and extend verified candidate referrals."
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Dashboard" },
        ]}
      />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-8">
          {/* USER WELCOME & EVALUATOR SWITCH BANNER */}
          <div className="p-6 sm:p-8 rounded-3xl bg-navy-950 text-white border border-gold-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-4">
              <AvatarInitials
                name={currentUser.name}
                src={currentUser.avatarUrl}
                size="xl"
                className="border-2 border-gold-400 shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      isStudent
                        ? "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                        : "bg-gold-400/20 text-gold-300 border border-gold-400/40"
                    }`}
                  >
                    {isStudent ? "Student Finalist" : "Verified Alumnus"}
                  </span>
                  <span className="text-xs text-navy-200">
                    {isStudent
                      ? currentUser.enrollmentNumber || "POD-2023-CS042"
                      : `Class of ${currentUser.batch || 2008}`}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-sans font-bold text-ivory truncate">
                  Welcome back, {currentUser.name}
                </h1>
                <p className="text-xs text-navy-200 truncate mt-0.5">
                  {isStudent
                    ? `${currentUser.course || "B.Tech Computer Science"} • ${currentUser.yearOfStudy || "4th Year"}`
                    : `${currentUser.designation || "Managing Director"} @ ${currentUser.company || "Apex Capital"}`}
                </p>
              </div>
            </div>

            {/* QUICK EVALUATOR DEMO SWITCH */}
            <div className="p-3 rounded-2xl bg-navy-900/90 border border-gold-500/20 shrink-0 flex items-center gap-3">
              <div className="text-xs">
                <div className="text-[10px] uppercase font-bold text-gold-300">Demo Role Switch</div>
                <div className="text-navy-200 text-xs">Switch persona:</div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => switchDemoUser("alumnus")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    !isStudent
                      ? "bg-gold-400 text-navy-950 shadow-md font-bold"
                      : "bg-navy-800 text-navy-200 hover:text-white"
                  }`}
                >
                  Alumnus
                </button>
                <button
                  type="button"
                  onClick={() => switchDemoUser("student")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isStudent
                      ? "bg-amber-500 text-white shadow-md font-bold"
                      : "bg-navy-800 text-navy-200 hover:text-white"
                  }`}
                >
                  Student
                </button>
              </div>
            </div>
          </div>

          {/* STATS OVERVIEW */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {isStudent ? (
              <>
                <StatCard
                  label="Applications Sent"
                  value={myApplications.length}
                  description="Active job submissions"
                  icon={FileText}
                />
                <StatCard
                  label="Referrals Requested"
                  value={myReferralRequests.length}
                  description="Alumni endorsement slots"
                  icon={Award}
                />
                <StatCard
                  label="Unread Messages"
                  value={unreadMessagesCount}
                  description="Alumni chats & replies"
                  icon={MessageSquare}
                />
                <StatCard
                  label="Saved Opportunities"
                  value={savedJobIds.length}
                  description="Bookmarked positions"
                  icon={Bookmark}
                />
              </>
            ) : (
              <>
                <StatCard
                  label="Live Postings"
                  value={myPostings.length}
                  description="Open roles by you"
                  icon={Briefcase}
                />
                <StatCard
                  label="Total Applicants"
                  value={receivedApplicantsCount}
                  description="Student & alumni resumes"
                  icon={FileText}
                />
                <StatCard
                  label="Referral Requests"
                  value={pendingReferralRequests.length}
                  description={pendingReferralRequests.length > 0 ? "Awaiting your review" : "All requests handled"}
                  icon={Award}
                />
                <StatCard
                  label="Unread Messages"
                  value={unreadMessagesCount}
                  description="Candidate conversations"
                  icon={MessageSquare}
                />
              </>
            )}
          </div>

          {/* QUICK ACTION TILES */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <Link
              href="/career-hub/jobs"
              className="p-4 rounded-2xl bg-white border border-line shadow-sm hover:border-gold-500/40 hover:shadow-md transition-all group"
            >
              <div className="h-10 w-10 rounded-xl bg-navy-50 text-navy-950 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Briefcase className="h-5 w-5" />
              </div>
              <div className="text-sm font-bold text-navy-950">Jobs & Internships</div>
              <div className="text-xs text-muted mt-0.5">Explore openings</div>
            </Link>

            <Link
              href="/dashboard/applications"
              className="p-4 rounded-2xl bg-white border border-line shadow-sm hover:border-gold-500/40 hover:shadow-md transition-all group"
            >
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <FileText className="h-5 w-5" />
              </div>
              <div className="text-sm font-bold text-navy-950">My Applications</div>
              <div className="text-xs text-muted mt-0.5">Track timelines</div>
            </Link>

            <Link
              href="/dashboard/referrals"
              className="p-4 rounded-2xl bg-white border border-line shadow-sm hover:border-gold-500/40 hover:shadow-md transition-all group"
            >
              <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Award className="h-5 w-5" />
              </div>
              <div className="text-sm font-bold text-navy-950">Referral Center</div>
              <div className="text-xs text-muted mt-0.5">Manage referrals</div>
            </Link>

            <Link
              href="/messages"
              className="p-4 rounded-2xl bg-white border border-line shadow-sm hover:border-gold-500/40 hover:shadow-md transition-all group"
            >
              <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div className="text-sm font-bold text-navy-950">Direct Messages</div>
              <div className="text-xs text-muted mt-0.5">Alumni chat</div>
            </Link>
          </div>

          {/* DYNAMIC CONTENT SECTIONS BY ROLE */}
          {isStudent ? (
            /* STUDENT VIEW: RECENT APPLICATIONS & RECOMMENDED JOBS */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* RECENT APPLICATIONS */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-line shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-line mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-gold-600" />
                    <h2 className="text-lg font-sans font-bold text-navy-950">
                      Recent Applications
                    </h2>
                  </div>
                  <Link
                    href="/dashboard/applications"
                    className="text-xs font-bold text-navy-950 hover:text-gold-600 transition-colors"
                  >
                    View All ({myApplications.length}) →
                  </Link>
                </div>

                {myApplications.length === 0 ? (
                  <EmptyState
                    title="No Applications Submitted"
                    description="You haven't applied to any job postings yet. Find an opening in the Career Hub and submit your profile."
                    actionLabel="Browse Live Jobs"
                    onAction={() => {
                      window.location.href = "/career-hub/jobs";
                    }}
                  />
                ) : (
                  <div className="space-y-3">
                    {myApplications.slice(0, 4).map((app) => (
                      <div
                        key={app.id}
                        className="p-3.5 rounded-2xl bg-ivory border border-line flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <div className="font-bold text-sm text-navy-950 truncate">
                            {app.jobTitle}
                          </div>
                          <div className="text-xs text-muted truncate">
                            {app.company} • Applied on {app.appliedDate}
                          </div>
                          {app.referredBy && (
                            <div className="text-[11px] text-amber-800 font-semibold mt-0.5">
                              ⭐ Referred by {app.referredBy}
                            </div>
                          )}
                        </div>
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${
                            app.status === "Interviewing" || app.status === "Offered"
                              ? "bg-emerald-100 text-emerald-800"
                              : app.status === "Reviewed"
                              ? "bg-blue-100 text-blue-800"
                              : app.status === "Rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-navy-100 text-navy-900"
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* RECOMMENDED OPPORTUNITIES */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-line shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-line mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-gold-600" />
                    <h2 className="text-lg font-sans font-bold text-navy-950">
                      Opportunities for Students
                    </h2>
                  </div>
                  <Link
                    href="/career-hub/jobs"
                    className="text-xs font-bold text-navy-950 hover:text-gold-600 transition-colors"
                  >
                    View All →
                  </Link>
                </div>

                <div className="space-y-3">
                  {jobs
                    .filter((j) => (j.status === "live" || j.status === "approved") && j.whoCanApply !== "Alumni")
                    .slice(0, 3)
                    .map((job) => (
                      <div
                        key={job.id}
                        className="p-3.5 rounded-2xl bg-ivory border border-line flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <div className="font-bold text-sm text-navy-950 truncate">
                            {job.title}
                          </div>
                          <div className="text-xs text-muted truncate">
                            {job.company} • {job.location} ({job.workMode})
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-bold text-gold-700 bg-gold-500/10 px-2 py-0.5 rounded">
                              {job.salaryRange || "Competitive"}
                            </span>
                            {job.canRefer && (
                              <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                                {job.referralSlots} Referrals Open
                              </span>
                            )}
                          </div>
                        </div>

                        <Link
                          href="/career-hub/jobs"
                          className="px-3 py-1.5 rounded-xl bg-navy-950 text-gold-300 font-semibold text-xs hover:bg-navy-900 shrink-0"
                        >
                          Apply
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            /* ALUMNUS VIEW: MY POSTINGS & PENDING REFERRAL REQUESTS */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* MY POSTINGS */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-line shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-line mb-4">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-gold-600" />
                    <h2 className="text-lg font-sans font-bold text-navy-950">
                      My Active Postings
                    </h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      href="/career-hub/post"
                      className="text-xs font-bold text-gold-700 hover:text-gold-800"
                    >
                      + New Opening
                    </Link>
                    <Link
                      href="/dashboard/postings"
                      className="text-xs font-bold text-navy-950 hover:text-gold-600 transition-colors"
                    >
                      All ({myPostings.length}) →
                    </Link>
                  </div>
                </div>

                {myPostings.length === 0 ? (
                  <EmptyState
                    title="No Opportunities Listed Yet"
                    description="You haven't posted any jobs or internships yet. Post an opening to hire students and alumni from Poddar Group of Institutions."
                    actionLabel="Post an Opening"
                    onAction={() => {
                      window.location.href = "/career-hub/post";
                    }}
                  />
                ) : (
                  <div className="space-y-3">
                    {myPostings.map((job) => {
                      const applicantsCount = jobApplications.filter((a) => a.jobId === job.id).length;
                      return (
                        <div
                          key={job.id}
                          className="p-3.5 rounded-2xl bg-ivory border border-line flex items-center justify-between gap-3"
                        >
                          <div className="min-w-0">
                            <div className="font-bold text-sm text-navy-950 truncate">
                              {job.title}
                            </div>
                            <div className="text-xs text-muted truncate">
                              {job.company} • {job.location} • Status: {job.status}
                            </div>
                            <div className="text-[11px] text-gold-700 font-semibold mt-0.5">
                              {job.referralSlots} referral slots remaining
                            </div>
                          </div>
                          <Link
                            href={`/dashboard/postings/${job.id}`}
                            className="px-3 py-1.5 rounded-xl bg-navy-950 text-gold-300 font-semibold text-xs hover:bg-navy-900 shrink-0"
                          >
                            {applicantsCount} Applicants →
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* REFERRAL REQUESTS RECEIVED */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-line shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-line mb-4">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-gold-600" />
                    <h2 className="text-lg font-sans font-bold text-navy-950">
                      Referral Requests Received
                    </h2>
                  </div>
                  <Link
                    href="/dashboard/referrals"
                    className="text-xs font-bold text-navy-950 hover:text-gold-600 transition-colors"
                  >
                    Manage {pendingReferralRequests.length > 0 ? `(${pendingReferralRequests.length} Pending)` : `(${receivedReferralRequests.length})`} →
                  </Link>
                </div>

                {receivedReferralRequests.length === 0 ? (
                  <EmptyState
                    title="No Pending Referral Requests"
                    description="When candidates request internal endorsements for your posted jobs, they will appear here for one-click approval."
                  />
                ) : (
                  <div className="space-y-3">
                    {receivedReferralRequests.slice(0, 4).map((ref) => (
                      <div
                        key={ref.id}
                        className="p-3.5 rounded-2xl bg-ivory border border-line flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <div className="font-bold text-sm text-navy-950 truncate">
                            {ref.requesterName}
                          </div>
                          <div className="text-xs text-muted truncate">
                            For {ref.jobTitle} • {ref.requesterCourseOrCompany}
                          </div>
                          <p className="text-[11px] text-ink/80 italic mt-0.5 line-clamp-1">
                            &ldquo;{ref.message}&rdquo;
                          </p>
                        </div>
                        {ref.status === "Requested" ? (
                          <Link
                            href="/dashboard/referrals"
                            className="px-3 py-1.5 rounded-xl bg-amber-400 text-navy-950 font-bold text-xs hover:bg-amber-300 shrink-0"
                          >
                            Review
                          </Link>
                        ) : (
                          <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs shrink-0 flex items-center gap-1">
                            ✓ {ref.status}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
