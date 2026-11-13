"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Search,
  SlidersHorizontal,
  Briefcase,
  MapPin,
  Building,
  Calendar,
  UserCheck,
  CheckCircle2,
  ExternalLink,
  Send,
  X,
  Sparkles,
  ArrowRight,
  PlusCircle,
  Bookmark,
  BookmarkCheck,
  Award,
  Users,
  Eye,
  DollarSign,
  AlertCircle,
  FileText,
  Upload,
} from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { FilterDrawer } from "@/components/common/FilterDrawer";
import { EmptyState } from "@/components/common/EmptyState";
import { AvatarInitials } from "@/components/common/AvatarInitials";
import { usePortalStore } from "@/store/portal";
import { JobOpportunity, DomainCategory, WorkMode, WhoCanApply } from "@/data/types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const JOB_TYPES = ["All Types", "Full-Time", "Internship", "Remote", "Contract"];
const WORK_MODES = ["All Modes", "Remote", "Hybrid", "On-site"];
const WHO_CAN_APPLY_OPTIONS = ["All Eligibility", "Both", "Students", "Alumni"];

const DOMAINS: string[] = [
  "All Domains",
  "IT & Technology",
  "Finance & Banking",
  "Business & Entrepreneurship",
  "Marketing & Advertising",
  "Education",
  "Healthcare",
  "Jewellery & Fashion",
];

const LOCATIONS = ["All Locations", "Jaipur", "Bengaluru", "Mumbai", "Pune", "Remote"];

export default function JobsPage() {
  const {
    jobs,
    currentUser,
    jobApplications,
    referrals,
    savedJobIds,
    toggleSaveJob,
    applyToJob,
    requestReferral,
  } = usePortalStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedMode, setSelectedMode] = useState("All Modes");
  const [selectedWhoCanApply, setSelectedWhoCanApply] = useState("All Eligibility");
  const [selectedDomain, setSelectedDomain] = useState("All Domains");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [onlyReferral, setOnlyReferral] = useState(false);
  const [onlySaved, setOnlySaved] = useState(false);

  // Active sheet / modal states
  const [activeJob, setActiveJob] = useState<JobOpportunity | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Apply Dialog state
  const [applyModalJob, setApplyModalJob] = useState<JobOpportunity | null>(null);
  const [coverNote, setCoverNote] = useState("");
  const [askReferralChecked, setAskReferralChecked] = useState(true);
  const [mockResume, setMockResume] = useState(currentUser?.resumeFileName || "Candidate_Profile_Resume.pdf");

  // Referral Request Dialog state
  const [referralModalJob, setReferralModalJob] = useState<JobOpportunity | null>(null);
  const [referralMessage, setReferralMessage] = useState("");

  // Only approved or live jobs appear publicly (not closed or removed)
  const availableJobs = useMemo(() => {
    return jobs.filter((j) => j.status === "approved" || j.status === "live");
  }, [jobs]);

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return availableJobs.filter((job) => {
      // Saved jobs only filter
      if (onlySaved && !savedJobIds.includes(job.id)) {
        return false;
      }

      // Referral available filter
      if (onlyReferral && (!job.canRefer || (job.referralSlots ?? 0) <= 0)) {
        return false;
      }

      // Keyword search across title, company, description, location, skills
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matches =
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.skills?.some((sk) => sk.toLowerCase().includes(query));
        if (!matches) return false;
      }

      // Type filter
      if (selectedType !== "All Types") {
        if (selectedType === "Remote") {
          if (!job.location.toLowerCase().includes("remote") && job.type !== "Remote" && job.workMode !== "Remote") {
            return false;
          }
        } else if (job.type !== selectedType) {
          return false;
        }
      }

      // Work Mode filter
      if (selectedMode !== "All Modes" && job.workMode !== selectedMode) {
        return false;
      }

      // Who can apply filter
      if (selectedWhoCanApply !== "All Eligibility") {
        if (selectedWhoCanApply === "Students" && job.whoCanApply === "Alumni") return false;
        if (selectedWhoCanApply === "Alumni" && job.whoCanApply === "Students") return false;
      }

      // Domain filter
      if (selectedDomain !== "All Domains" && job.domain !== selectedDomain) {
        return false;
      }

      // Location filter
      if (selectedLocation !== "All Locations") {
        if (!job.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }, [
    availableJobs,
    onlySaved,
    onlyReferral,
    savedJobIds,
    searchQuery,
    selectedType,
    selectedMode,
    selectedWhoCanApply,
    selectedDomain,
    selectedLocation,
  ]);

  const activeFilterCount =
    (selectedType !== "All Types" ? 1 : 0) +
    (selectedMode !== "All Modes" ? 1 : 0) +
    (selectedWhoCanApply !== "All Eligibility" ? 1 : 0) +
    (selectedDomain !== "All Domains" ? 1 : 0) +
    (selectedLocation !== "All Locations" ? 1 : 0) +
    (onlyReferral ? 1 : 0) +
    (onlySaved ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedType("All Types");
    setSelectedMode("All Modes");
    setSelectedWhoCanApply("All Eligibility");
    setSelectedDomain("All Domains");
    setSelectedLocation("All Locations");
    setOnlyReferral(false);
    setOnlySaved(false);
  };

  const getApplicationForJob = (jobId: string) => {
    if (!currentUser) return null;
    return jobApplications.find((a) => a.jobId === jobId && a.applicantId === currentUser.id && a.status !== "Withdrawn");
  };

  const getReferralForJob = (jobId: string) => {
    if (!currentUser) return null;
    return referrals.find(
      (r) => r.jobId === jobId && r.requesterId === currentUser.id && (r.status === "Requested" || r.status === "Accepted" || r.status === "Referred")
    );
  };

  const checkEligibility = (job: JobOpportunity): { eligible: boolean; reason?: string } => {
    if (!currentUser) return { eligible: true };
    const isStudent = currentUser.role === "student";
    if (job.whoCanApply === "Students" && !isStudent) {
      return { eligible: false, reason: "Reserved for enrolled college students only" };
    }
    if (job.whoCanApply === "Alumni" && isStudent) {
      return { eligible: false, reason: "Reserved for verified alumni only" };
    }
    return { eligible: true };
  };

  const handleOpenApplyModal = (job: JobOpportunity) => {
    if (!currentUser) {
      toast.error("Please sign in or register to apply for opportunities.");
      return;
    }
    const { eligible, reason } = checkEligibility(job);
    if (!eligible) {
      toast.error(reason);
      return;
    }
    if (currentUser.id === job.posterId) {
      toast.info("This is your own posting. Manage applicants in My Postings.");
      return;
    }
    setApplyModalJob(job);
    setCoverNote(
      `Hello ${job.postedByAlumniName},\nI am interested in the ${job.title} position at ${job.company}. My background at Poddar Institutions aligns with your team's requirements.`
    );
    setAskReferralChecked(Boolean(job.canRefer && (job.referralSlots ?? 0) > 0));
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyModalJob) return;

    if (!coverNote.trim()) {
      toast.error("Please add a short note highlighting your qualifications.");
      return;
    }

    const res = applyToJob({
      jobId: applyModalJob.id,
      coverNote: coverNote.trim(),
      resumeFileName: mockResume,
      askReferral: askReferralChecked && applyModalJob.canRefer,
    });

    if (res.success) {
      toast.success(`Application submitted for ${applyModalJob.title}!`);
      setApplyModalJob(null);
      setSheetOpen(false);
    } else {
      toast.error(res.error || "Unable to submit application");
    }
  };

  const handleOpenReferralModal = (job: JobOpportunity) => {
    if (!currentUser) {
      toast.error("Please sign in or register to request internal referrals.");
      return;
    }
    if (currentUser.id === job.posterId) {
      toast.info("You cannot request a referral from yourself.");
      return;
    }
    setReferralModalJob(job);
    setReferralMessage(
      `Hello ${job.postedByAlumniName}, I would be grateful for an internal referral for ${job.title} at ${job.company}.`
    );
  };

  const handleSubmitReferral = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referralModalJob) return;

    if (!referralMessage.trim()) {
      toast.error("Please include a brief message explaining why you'd be a great referral.");
      return;
    }

    const res = requestReferral({
      jobId: referralModalJob.id,
      referrerId: referralModalJob.posterId || "alm-1",
      message: referralMessage.trim(),
      resumeFileName: mockResume,
    });

    if (res.success) {
      toast.success(`Referral requested from ${referralModalJob.postedByAlumniName}!`);
      setReferralModalJob(null);
      setSheetOpen(false);
    } else {
      toast.error(res.error || "Unable to request referral");
    }
  };

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <PageHero
        eyebrow="OPPORTUNITIES NETWORK • HIRING & REFERRALS"
        title="Jobs & Internships"
        subtitle="Exclusive vacancies, corporate internships, and verified alumni referral slots shared directly by Poddar alumni."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Career Hub", href: "/career-hub" },
          { label: "Jobs & Internships" },
        ]}
      />

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* TOP SEARCH & ACTION BAR */}
          <div className="bg-white rounded-xl p-4 sm:p-5 border border-line shadow-xs mb-6">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              {/* SEARCH INPUT */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search role title, company, skills (e.g. React), or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-9 rounded-lg border border-line bg-ivory/50 text-sm text-navy-950 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-2.5 text-muted hover:text-navy-950"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* POST AN OPPORTUNITY BUTTON */}
              <div className="flex items-center gap-2.5">
                {currentUser?.role !== "student" && (
                  <Link
                    href="/career-hub/post"
                    className="h-10 px-4 rounded-lg bg-navy-950 text-gold-300 font-semibold text-xs sm:text-sm hover:bg-navy-900 transition-colors shadow-xs flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <PlusCircle className="h-4 w-4" />
                    <span>Post an Opening</span>
                  </Link>
                )}
                {currentUser && (
                  <Link
                    href="/dashboard/applications"
                    className="h-10 px-3.5 rounded-lg bg-ivory border border-line text-navy-900 font-medium text-xs sm:text-sm hover:bg-navy-50 transition-colors flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <FileText className="h-4 w-4 text-gold-600" />
                    <span>My Applications</span>
                  </Link>
                )}
              </div>
            </div>

            {/* MOBILE FILTER DRAWER */}
            <div className="mt-4 md:hidden">
              <FilterDrawer
                title="Filters & Preferences"
                activeFilterCount={activeFilterCount}
                onReset={resetFilters}
              >
                <div className="space-y-4 py-2">
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Employment Type
                    </label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl border border-line text-sm text-navy-950 bg-white"
                    >
                      {JOB_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Work Mode
                    </label>
                    <select
                      value={selectedMode}
                      onChange={(e) => setSelectedMode(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl border border-line text-sm text-navy-950 bg-white"
                    >
                      {WORK_MODES.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Who Can Apply
                    </label>
                    <select
                      value={selectedWhoCanApply}
                      onChange={(e) => setSelectedWhoCanApply(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl border border-line text-sm text-navy-950 bg-white"
                    >
                      {WHO_CAN_APPLY_OPTIONS.map((w) => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Industry Domain
                    </label>
                    <select
                      value={selectedDomain}
                      onChange={(e) => setSelectedDomain(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl border border-line text-sm text-navy-950 bg-white"
                    >
                      {DOMAINS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-2 border-t border-line space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-navy-950">
                      <input
                        type="checkbox"
                        checked={onlyReferral}
                        onChange={(e) => setOnlyReferral(e.target.checked)}
                        className="rounded border-line text-navy-950"
                      />
                      <span>Alumni Referral Slots Available Only</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-navy-950">
                      <input
                        type="checkbox"
                        checked={onlySaved}
                        onChange={(e) => setOnlySaved(e.target.checked)}
                        className="rounded border-line text-navy-950"
                      />
                      <span>Bookmarked / Saved Jobs Only</span>
                    </label>
                  </div>
                </div>
              </FilterDrawer>
            </div>

            {/* DESKTOP INLINE FILTER BAR */}
            <div className="hidden md:flex flex-wrap items-center gap-3 pt-4 border-t border-line mt-4">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-navy-900">Type:</span>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="h-9 px-2.5 rounded-lg border border-line text-xs font-medium text-navy-950 bg-ivory/50"
                >
                  {JOB_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-navy-900">Mode:</span>
                <select
                  value={selectedMode}
                  onChange={(e) => setSelectedMode(e.target.value)}
                  className="h-9 px-2.5 rounded-lg border border-line text-xs font-medium text-navy-950 bg-ivory/50"
                >
                  {WORK_MODES.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-navy-900">Eligibility:</span>
                <select
                  value={selectedWhoCanApply}
                  onChange={(e) => setSelectedWhoCanApply(e.target.value)}
                  className="h-9 px-2.5 rounded-lg border border-line text-xs font-medium text-navy-950 bg-ivory/50"
                >
                  {WHO_CAN_APPLY_OPTIONS.map((w) => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-navy-900">Domain:</span>
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="h-9 px-2.5 rounded-lg border border-line text-xs font-medium text-navy-950 bg-ivory/50 max-w-[150px] truncate"
                >
                  {DOMAINS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {/* TOGGLES */}
              <button
                type="button"
                onClick={() => setOnlyReferral(!onlyReferral)}
                className={`h-9 px-3 rounded-lg border text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  onlyReferral
                    ? "bg-amber-100 text-amber-900 border-amber-300"
                    : "bg-ivory border-line text-navy-900 hover:bg-navy-50"
                }`}
              >
                <Award className="h-3.5 w-3.5 text-amber-600" />
                <span>Referrals Only</span>
              </button>

              <button
                type="button"
                onClick={() => setOnlySaved(!onlySaved)}
                className={`h-9 px-3 rounded-lg border text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  onlySaved
                    ? "bg-navy-950 text-gold-300 border-navy-950"
                    : "bg-ivory border-line text-navy-900 hover:bg-navy-50"
                }`}
              >
                <Bookmark className="h-3.5 w-3.5" />
                <span>Saved ({savedJobIds.length})</span>
              </button>

              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs text-red-600 font-semibold hover:underline ml-auto cursor-pointer"
                >
                  Clear all ({activeFilterCount})
                </button>
              )}
            </div>
          </div>

          {/* RESULTS COUNTER */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-xs sm:text-sm font-medium text-muted">
              Showing <strong className="text-navy-950 font-bold">{filteredJobs.length}</strong> active opportunities
            </div>
            {currentUser && (
              <div className="text-xs text-muted flex items-center gap-1.5">
                <span>Signed in as:</span>
                <span className="font-semibold text-navy-950">{currentUser.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-navy-100 text-navy-800 uppercase font-bold">
                  {currentUser.role === "student" ? "Student" : "Alumnus"}
                </span>
              </div>
            )}
          </div>

          {/* JOBS GRID */}
          {filteredJobs.length === 0 ? (
            <EmptyState
              title="No Opportunities Match Your Criteria"
              description="No job or internship vacancies match your active search terms or filters. Try clearing some filters or searching for a different skill."
              actionLabel="Reset All Filters"
              onAction={resetFilters}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredJobs.map((job) => {
                const application = getApplicationForJob(job.id);
                const referral = getReferralForJob(job.id);
                const isSaved = savedJobIds.includes(job.id);
                const isMyPosting = currentUser?.id === job.posterId;
                const { eligible, reason } = checkEligibility(job);

                // Count applicants for poster
                const myApplicantsCount = jobApplications.filter((a) => a.jobId === job.id).length;

                return (
                  <div
                    key={job.id}
                    className="flex flex-col justify-between bg-white rounded-xl p-4 sm:p-5 border border-line shadow-xs hover:shadow-md hover:border-gold-500/40 transition-all duration-300 relative"
                  >
                    <div>
                      {/* HEADER BADGES */}
                      <div className="flex items-start justify-between gap-2 mb-2.5">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span
                            className={`text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                              job.type === "Internship"
                                ? "bg-purple-100 text-purple-800"
                                : job.type === "Full-Time"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {job.type}
                          </span>

                          {job.workMode && (
                            <span className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-full bg-navy-50 text-navy-800 border border-navy-200">
                              {job.workMode}
                            </span>
                          )}

                          {job.whoCanApply && (
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                job.whoCanApply === "Students"
                                  ? "bg-amber-100 text-amber-900 border border-amber-300"
                                  : job.whoCanApply === "Alumni"
                                  ? "bg-indigo-100 text-indigo-900 border border-indigo-200"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {job.whoCanApply === "Both" ? "Students & Alumni" : `${job.whoCanApply} Only`}
                            </span>
                          )}
                        </div>

                        {/* BOOKMARK BUTTON */}
                        <button
                          type="button"
                          onClick={() => {
                            toggleSaveJob(job.id);
                            toast.success(isSaved ? "Removed from saved opportunities" : "Saved to your bookmarks");
                          }}
                          className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                            isSaved
                              ? "bg-navy-950 text-gold-300 shadow-xs"
                              : "bg-ivory text-muted hover:text-navy-950"
                          }`}
                          aria-label={isSaved ? "Remove bookmark" : "Save opportunity"}
                        >
                          <Bookmark className="h-4 w-4" />
                        </button>
                      </div>

                      {/* ROLE TITLE & COMPANY */}
                      <h3 className="text-[15px] sm:text-[16px] font-serif font-semibold text-navy-950 line-clamp-2 mb-1 leading-snug">
                        {job.title}
                      </h3>
                      <div className="text-[13px] sm:text-[14px] font-medium text-navy-900 mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 truncate">
                          <Building className="h-3.5 w-3.5 text-gold-600 shrink-0" />
                          <span className="truncate">{job.company}</span>
                        </div>
                        {job.salaryRange && (
                          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0 ml-2 tabular-nums">
                            {job.salaryRange}
                          </span>
                        )}
                      </div>

                      {/* LOCATION & OPENINGS */}
                      <div className="flex flex-wrap items-center gap-y-1 gap-x-2 text-xs text-muted mb-2.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{job.location}</span>
                        </span>
                        <span>•</span>
                        <span className="tabular-nums">{job.openings ? `${job.openings} Openings` : "Multiple Openings"}</span>
                      </div>

                      {/* SKILLS PILLS */}
                      {job.skills && job.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2.5">
                          {job.skills.slice(0, 3).map((sk) => (
                            <span
                              key={sk}
                              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-ivory text-navy-800 border border-line"
                            >
                              {sk}
                            </span>
                          ))}
                          {job.skills.length > 3 && (
                            <span className="text-[10px] text-muted self-center">
                              +{job.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* REFERRAL BADGE */}
                      {job.canRefer && (
                        <div className="mb-3 inline-flex items-center gap-1.5 text-xs font-medium text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-300 tabular-nums">
                          <Award className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                          <span>{job.referralSlots ?? 1} Referral Slots by Alumnus</span>
                        </div>
                      )}

                      {/* POSTER INFO */}
                      <p className="text-[12px] sm:text-[13px] text-muted line-clamp-2 mb-3 leading-relaxed">
                        {job.description}
                      </p>
                    </div>

                    {/* FOOTER */}
                    <div className="pt-3 border-t border-line">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <AvatarInitials name={job.postedByAlumniName} size="sm" />
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-navy-950 truncate">
                              {job.postedByAlumniName}
                            </div>
                            <div className="text-[10px] text-muted truncate">
                              Class of {job.postedByBatch}
                            </div>
                          </div>
                        </div>

                        {/* STATUS PILL */}
                        {isMyPosting ? (
                          <Link
                            href={`/dashboard/postings/${job.id}`}
                            className="text-[11px] font-bold text-navy-950 bg-gold-400/20 border border-gold-500/40 px-2 py-1 rounded-lg hover:bg-gold-400/30 transition-colors"
                          >
                            {myApplicantsCount} Applicants →
                          </Link>
                        ) : application ? (
                          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                            <span>{application.status}</span>
                          </span>
                        ) : referral ? (
                          <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg">
                            Ref: {referral.status}
                          </span>
                        ) : null}
                      </div>

                      {/* ACTION BUTTONS */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveJob(job);
                            setSheetOpen(true);
                          }}
                          className="py-2.5 rounded-xl bg-ivory border border-line text-navy-900 font-semibold text-xs hover:bg-navy-50 transition-colors cursor-pointer text-center"
                        >
                          View Details
                        </button>

                        {isMyPosting ? (
                          <Link
                            href={`/dashboard/postings/${job.id}`}
                            className="py-2.5 rounded-xl bg-navy-950 text-gold-300 font-bold text-xs hover:bg-navy-900 transition-colors text-center flex items-center justify-center gap-1"
                          >
                            <span>Manage</span>
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        ) : application ? (
                          <Link
                            href="/dashboard/applications"
                            className="py-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-xs hover:bg-emerald-100 transition-colors text-center flex items-center justify-center gap-1"
                          >
                            <span>View Status</span>
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        ) : !eligible ? (
                          <button
                            type="button"
                            disabled
                            title={reason}
                            className="py-2.5 rounded-xl bg-gray-100 text-gray-400 font-semibold text-xs text-center cursor-not-allowed"
                          >
                            {job.whoCanApply === "Students" ? "Students Only" : "Alumni Only"}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleOpenApplyModal(job)}
                            className="py-2.5 rounded-xl bg-navy-950 text-gold-300 hover:bg-navy-900 font-bold text-xs transition-colors cursor-pointer text-center flex items-center justify-center gap-1 shadow-sm"
                          >
                            <Send className="h-3 w-3" />
                            <span>Apply</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* JOB DETAIL SHEET */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-xl p-0 overflow-y-auto bg-white" data-lenis-prevent>
          {activeJob && (
            <div className="p-6 sm:p-8 space-y-6">
              <SheetHeader className="text-left border-b border-line pb-4">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-navy-950 text-gold-300">
                    {activeJob.type}
                  </span>
                  {activeJob.workMode && (
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-navy-100 text-navy-900 font-medium">
                      {activeJob.workMode}
                    </span>
                  )}
                  <span className="text-xs text-muted font-medium">{activeJob.domain}</span>
                </div>
                <SheetTitle className="text-2xl font-serif font-bold text-navy-950">
                  {activeJob.title}
                </SheetTitle>
                <SheetDescription className="text-sm font-semibold text-navy-900 flex items-center gap-1.5 mt-1">
                  <Building className="h-4 w-4 text-gold-600" />
                  <span>{activeJob.company}</span>
                  <span className="text-muted">•</span>
                  <span className="text-muted font-normal">{activeJob.location}</span>
                </SheetDescription>
              </SheetHeader>

              {/* POSTER CARD */}
              <div className="p-4 rounded-2xl bg-ivory border border-line flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AvatarInitials name={activeJob.postedByAlumniName} size="md" />
                  <div>
                    <div className="text-xs font-bold text-navy-950">
                      Posted by {activeJob.postedByAlumniName}
                    </div>
                    <div className="text-[11px] text-muted">
                      Class of {activeJob.postedByBatch} • Verified Alumnus
                    </div>
                  </div>
                </div>
                {activeJob.posterId && currentUser && currentUser.id !== activeJob.posterId && (
                  <Link
                    href={`/messages?startWith=${activeJob.posterId}&name=${encodeURIComponent(
                      activeJob.postedByAlumniName
                    )}`}
                    scroll={false}
                    className="px-3 py-1.5 rounded-lg bg-navy-950 text-gold-300 font-semibold text-xs hover:bg-navy-900"
                  >
                    Message
                  </Link>
                )}
              </div>

              {/* KEY STATS PILLS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-ivory border border-line">
                  <div className="text-[10px] text-muted uppercase font-bold">Openings</div>
                  <div className="text-sm font-bold text-navy-950">{activeJob.openings || 1}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-ivory border border-line">
                  <div className="text-[10px] text-muted uppercase font-bold">Compensation</div>
                  <div className="text-sm font-bold text-emerald-700 truncate">{activeJob.salaryRange || "Competitive"}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-ivory border border-line">
                  <div className="text-[10px] text-muted uppercase font-bold">Who Can Apply</div>
                  <div className="text-sm font-bold text-navy-950 truncate">{activeJob.whoCanApply || "Both"}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-ivory border border-line">
                  <div className="text-[10px] text-muted uppercase font-bold">Referral Slots</div>
                  <div className="text-sm font-bold text-amber-700">{activeJob.canRefer ? activeJob.referralSlots ?? 1 : 0}</div>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <h4 className="text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
                  Role Description
                </h4>
                <p className="text-sm text-navy-900/90 leading-relaxed whitespace-pre-line">
                  {activeJob.description}
                </p>
              </div>

              {/* REQUIREMENTS */}
              {activeJob.requirements && activeJob.requirements.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
                    Requirements & Qualifications
                  </h4>
                  <ul className="space-y-2">
                    {activeJob.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ACTIONS */}
              <div className="pt-6 border-t border-line space-y-3">
                {currentUser?.id === activeJob.posterId ? (
                  <Link
                    href={`/dashboard/postings/${activeJob.id}`}
                    className="w-full py-3.5 rounded-xl bg-navy-950 text-gold-300 font-bold text-sm text-center flex items-center justify-center gap-2"
                  >
                    <span>Manage Posting & Review Applicants</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : getApplicationForJob(activeJob.id) ? (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                    <div className="font-bold text-emerald-900 text-sm flex items-center justify-center gap-1.5 mb-1">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>You have already applied for this opening</span>
                    </div>
                    <Link
                      href="/dashboard/applications"
                      className="text-xs text-emerald-700 font-semibold underline"
                    >
                      View Application Status Timeline →
                    </Link>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => handleOpenApplyModal(activeJob)}
                      className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 text-navy-950 hover:brightness-105 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="h-4 w-4" />
                      <span>Apply for this Opportunity</span>
                    </button>

                    {activeJob.canRefer && (activeJob.referralSlots ?? 0) > 0 && !getReferralForJob(activeJob.id) && (
                      <button
                        type="button"
                        onClick={() => handleOpenReferralModal(activeJob)}
                        className="w-full py-3.5 rounded-xl font-semibold text-sm bg-navy-950 text-gold-300 hover:bg-navy-900 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Award className="h-4 w-4 text-gold-400" />
                        <span>Request Referral from Alumnus ({activeJob.referralSlots} slots)</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* APPLY DIALOG */}
      <Dialog open={Boolean(applyModalJob)} onOpenChange={(open) => !open && setApplyModalJob(null)}>
        <DialogContent className="sm:max-w-lg bg-white rounded-3xl p-6 sm:p-8" data-lenis-prevent>
          <DialogHeader className="border-b border-line pb-3">
            <DialogTitle className="text-xl font-serif font-bold text-navy-950">
              Apply for {applyModalJob?.title}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted">
              {applyModalJob?.company} • Location: {applyModalJob?.location}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitApplication} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                Applicant Information
              </label>
              <div className="p-3 rounded-xl bg-ivory border border-line text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted">Name:</span>
                  <span className="font-bold text-navy-950">{currentUser?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Role:</span>
                  <span className="font-semibold text-navy-950 capitalize">{currentUser?.role === "student" ? "Student" : "Alumnus"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Course / Org:</span>
                  <span className="text-navy-950">{currentUser?.course || currentUser?.company || "Poddar Network"}</span>
                </div>
              </div>
            </div>

            {/* RESUME DISPLAY */}
            <div>
              <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                Attached Resume / Portfolio
              </label>
              <div className="flex items-center justify-between p-3 rounded-xl bg-ivory border border-line text-xs">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gold-600" />
                  <span className="tabular-nums font-medium text-navy-950">{mockResume}</span>
                </div>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                  Ready to submit
                </span>
              </div>
            </div>

            {/* COVER NOTE */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-navy-950 uppercase tracking-wider">
                  Cover Note / Pitch (Max 500 characters) *
                </label>
                <span className="text-[10px] text-muted">{coverNote.length} / 500</span>
              </div>
              <textarea
                rows={4}
                maxLength={500}
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                placeholder="Highlight your key projects, academic excellence, or relevant experience..."
                className="w-full p-3 rounded-xl border border-line text-xs focus:outline-none focus:ring-2 focus:ring-gold-500/30"
              />
            </div>

            {/* ALSO ASK FOR REFERRAL CHECKBOX */}
            {applyModalJob?.canRefer && (applyModalJob.referralSlots ?? 0) > 0 && (
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={askReferralChecked}
                    onChange={(e) => setAskReferralChecked(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded text-navy-950 border-line"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-navy-950 block">
                      Also request internal referral from {applyModalJob.postedByAlumniName}
                    </span>
                    <span className="text-muted text-[11px]">
                      Alumnus has {applyModalJob.referralSlots} referral slots open for verified candidates.
                    </span>
                  </div>
                </label>
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-navy-950 text-gold-300 font-bold text-sm hover:bg-navy-900 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="h-4 w-4" />
              <span>Submit Application</span>
            </button>
          </form>
        </DialogContent>
      </Dialog>

      {/* REFERRAL REQUEST DIALOG */}
      <Dialog open={Boolean(referralModalJob)} onOpenChange={(open) => !open && setReferralModalJob(null)}>
        <DialogContent className="sm:max-w-lg bg-white rounded-3xl p-6 sm:p-8" data-lenis-prevent>
          <DialogHeader className="border-b border-line pb-3">
            <DialogTitle className="text-xl font-serif font-bold text-navy-950 flex items-center gap-2">
              <Award className="h-5 w-5 text-gold-600" />
              <span>Request Internal Referral</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-muted">
              Asking {referralModalJob?.postedByAlumniName} for {referralModalJob?.title} at {referralModalJob?.company}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitReferral} className="space-y-4 pt-2">
            <p className="text-xs text-muted leading-relaxed">
              Alumni mentors review referral requests based on skill match and academic grounding. Be professional, concise, and clear about your background.
            </p>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-navy-950 uppercase tracking-wider">
                  Personal Intro & Pitch (Max 300 chars) *
                </label>
                <span className="text-[10px] text-muted">{referralMessage.length} / 300</span>
              </div>
              <textarea
                rows={3}
                maxLength={300}
                value={referralMessage}
                onChange={(e) => setReferralMessage(e.target.value)}
                placeholder="Briefly state your graduation year, relevant skills, and why you are keen on this team..."
                className="w-full p-3 rounded-xl border border-line text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-navy-950 text-gold-300 font-bold text-sm hover:bg-navy-900 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Award className="h-4 w-4 text-gold-400" />
              <span>Send Referral Request</span>
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
