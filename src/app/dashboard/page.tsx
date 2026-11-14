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
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-xl text-center">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-line shadow-xl">
              <div className="h-16 w-16 mx-auto rounded-2xl bg-navy-950 flex items-center justify-center text-gold-300 mb-6">
                <User className="h-8 w-8 text-gold-300" />
              </div>
              <h2 className="text-2xl font-sans font-bold text-navy-950 mb-3">
                Member Session Required
              </h2>
              <p className="text-xs sm:text-sm text-muted mb-8">
                Please sign in with your credentials or try our 1-click evaluator demo accounts to explore student applications and alumni referrals.
              </p>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => switchDemoUser("alumnus")}
                  className="w-full py-3 px-4 rounded-xl bg-navy-950 text-gold-300 font-bold text-sm hover:bg-navy-900 transition-colors flex items-center justify-center gap-2"
                >
                  <Briefcase className="h-4 w-4" />
                  <span>1-Click Sign In as Alumnus (Vikramaditya)</span>
                </button>
                <button
                  type="button"
                  onClick={() => switchDemoUser("student")}
                  className="w-full py-3 px-4 rounded-xl bg-amber-600 text-white font-bold text-sm hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
                >
                  <GraduationCap className="h-4 w-4" />
                  <span>1-Click Sign In as Student (Aarav)</span>
                </button>
                <div className="pt-2">
                  <Link
                    href="/join/auth"
                    className="text-xs text-muted hover:text-navy-950 font-medium underline"
                  >
                    Go to Standard Sign In / Registration Form →
                  </Link>
                </div>
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
                  value={receivedReferralRequests.length}
                  description="Awaiting your review"
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
                    Manage ({receivedReferralRequests.length}) →
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
                        <Link
                          href="/dashboard/referrals"
                          className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 font-bold text-xs hover:bg-amber-200 shrink-0"
                        >
                          Review
                        </Link>
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
