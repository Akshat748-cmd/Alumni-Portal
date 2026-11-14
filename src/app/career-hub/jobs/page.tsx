"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Search,
  Briefcase,
  MapPin,
  Building,
  CheckCircle2,
  Send,
  X,
  ArrowRight,
  Bookmark,
  Award,
  FileText,
  Upload,
  Sparkles,
} from "lucide-react";
import { EmptyState } from "@/components/common/EmptyState";
import { AvatarInitials } from "@/components/common/AvatarInitials";
import { usePortalStore } from "@/store/portal";
import { JobOpportunity } from "@/data/types";
import { cn } from "@/lib/utils";
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

// Helper to format salary concisely like reference UI (e.g. "18–28 LPA", "15K–25K / Month")
function formatSalaryCompact(salary?: string): string {
  if (!salary) return "";
  if (salary.includes("18,00,000") && salary.includes("28,00,000")) return "18–28 LPA";
  if (salary.includes("12,00,000") && salary.includes("18,00,000")) return "12–20 LPA";
  if (salary.includes("25,000")) return "15K–25K / Month";
  if (salary.includes("8,00,000") && salary.includes("12,00,000")) return "8–12 LPA";
  if (salary.includes("30,000") && salary.includes("45,000")) return "30K–45K / Month";
  return salary.replace(/₹/g, "").replace(/\/ yr/gi, "LPA").trim();
}

// Helper to generate distinct company brand icon matching the reference style
function getCompanyBranding(company: string) {
  const c = company.toLowerCase();
  if (c.includes("cloud") || c.includes("vertex") || c.includes("novacrest") || c.includes("tech")) {
    return {
      companyBg: "bg-[#0b1c3d]",
      companyIcon: (
        <svg className="h-4 w-4 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M18.178 8c5.096 0 5.096 8 0 8-3.058 0-4.587-4-6.116-4s-3.058 4-6.116 4c-5.096 0-5.096-8 0-8 3.058 0 4.587 4 6.116 4s3.058-4 6.116-4z" />
        </svg>
      ),
    };
  }
  if (c.includes("fintura") || c.includes("apex") || c.includes("capital") || c.includes("finance")) {
    return {
      companyBg: "bg-gradient-to-br from-indigo-700 to-purple-800",
      companyIcon: <span className="font-serif italic font-bold text-sm text-white">F</span>,
    };
  }
  if (c.includes("amitech") || c.includes("zenith") || c.includes("agri") || c.includes("innov")) {
    return {
      companyBg: "bg-gradient-to-br from-amber-500 to-orange-600",
      companyIcon: (
        <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
        </svg>
      ),
    };
  }
  if (c.includes("aura") || c.includes("media") || c.includes("pulse")) {
    return {
      companyBg: "bg-gradient-to-br from-rose-600 to-pink-700",
      companyIcon: <Sparkles className="h-4 w-4 text-white" />,
    };
  }
  return {
    companyBg: "bg-[#101A30]",
    companyIcon: <span className="font-bold text-xs text-[#D5B568]">{company.slice(0, 2).toUpperCase()}</span>,
  };
}

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
  const [onlyReferral, setOnlyReferral] = useState(false);
  const [onlySaved, setOnlySaved] = useState(false);

  // Active sheet / modal states
  const [activeJob, setActiveJob] = useState<JobOpportunity | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Apply Dialog state
  const [applyModalJob, setApplyModalJob] = useState<JobOpportunity | null>(null);
  const [coverNote, setCoverNote] = useState("");
  const [askReferralChecked, setAskReferralChecked] = useState(true);
  const [mockResume] = useState(currentUser?.resumeFileName || "Candidate_Profile_Resume.pdf");

  // Referral Request Dialog state
  const [referralModalJob, setReferralModalJob] = useState<JobOpportunity | null>(null);
  const [referralMessage, setReferralMessage] = useState("");

  // Only approved or live jobs appear publicly
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
  ]);

  const activeFilterCount =
    (selectedType !== "All Types" ? 1 : 0) +
    (selectedMode !== "All Modes" ? 1 : 0) +
    (selectedWhoCanApply !== "All Eligibility" ? 1 : 0) +
    (selectedDomain !== "All Domains" ? 1 : 0) +
    (onlyReferral ? 1 : 0) +
    (onlySaved ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedType("All Types");
    setSelectedMode("All Modes");
    setSelectedWhoCanApply("All Eligibility");
    setSelectedDomain("All Domains");
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
    if (!applyModalJob || !currentUser) return;

    if (!coverNote.trim()) {
      toast.error("Please provide a brief cover note.");
      return;
    }

    const res = applyToJob({
      jobId: applyModalJob.id,
      coverNote: coverNote.trim(),
      resumeFileName: mockResume,
      askReferral: askReferralChecked,
    });

    if (res.success) {
      toast.success(`Application submitted successfully for ${applyModalJob.title}!`);
      setApplyModalJob(null);
      setSheetOpen(false);
    } else {
      toast.error(res.error || "Unable to submit application");
    }
  };

  const handleOpenReferralModal = (job: JobOpportunity) => {
    if (!currentUser) {
      toast.error("Please sign in to request an alumni referral.");
      return;
    }
    setReferralModalJob(job);
    setReferralMessage(
      `Hi ${job.postedByAlumniName}, I am applying for ${job.title} at ${job.company}. Given our shared Poddar foundation, I would be grateful for an internal referral.`
    );
  };

  const handleSubmitReferral = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referralModalJob || !currentUser) return;

    if (!referralMessage.trim()) {
      toast.error("Please include a brief message for the alumni referrer.");
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
    <div className="min-h-screen bg-[#F6F4EF] text-slate-800 font-sans">
      {/* 1. HERO SECTION (Desktop Clearance for Fixed Header, Responsive Left / Right, Deep Navy #101A30) */}
      <div className="relative bg-[#101A30] text-white overflow-hidden pt-20 sm:pt-24 lg:pt-[88px] pb-12 sm:pb-14 lg:pb-12 min-h-[380px] lg:min-h-[420px] h-auto flex items-center">
        {/* Right side: Authentic Poddar Campus Photograph (Full building visible without clipping) */}
        <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-[50%] xl:w-[52%] z-0 overflow-hidden pointer-events-none select-none bg-white">
          <img
            src="/assets/poddar-campus-main.jpg?v=3"
            alt="Poddar Group of Institutions Main Campus"
            className="w-full h-full object-contain object-right p-2 xl:p-4"
          />

          {/* Smooth subtle curved/diagonal transition with Champagne Gold detailing */}
          <svg
            className="absolute inset-0 h-full w-full pointer-events-none"
            viewBox="0 0 500 400"
            preserveAspectRatio="none"
          >
            {/* Deep Navy fill covering only the left transition edge */}
            <path
              d="M 0,0 L 20,0 C 60,90 30,250 85,400 L 0,400 Z"
              fill="#101A30"
            />
            {/* Subtle Champagne Gold detailing stroke */}
            <path
              d="M 20,0 C 60,90 30,250 85,400"
              fill="none"
              stroke="#D5B568"
              strokeWidth="2.5"
              strokeOpacity="0.85"
            />
            <path
              d="M 26,0 C 66,90 36,250 91,400"
              fill="none"
              stroke="#D5B568"
              strokeWidth="1"
              strokeOpacity="0.25"
            />
          </svg>
        </div>

        {/* Mobile / Tablet Campus Banner (Stacked, 16:9 ratio, contained without cropping) */}
        <div className="lg:hidden w-full container mx-auto px-4 mb-4">
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#D5B568]/30 shadow-md bg-white">
            <img
              src="/assets/poddar-campus-main.jpg?v=3"
              alt="Poddar Group of Institutions Main Campus"
              className="w-full h-full object-contain object-center p-2"
            />
            <div className="absolute bottom-2 left-3 text-[11px] text-[#101A30] font-semibold bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded shadow-xs">
              Poddar Group of Institutions • Jaipur
            </div>
          </div>
        </div>

        {/* Hero Content Left (Fluid responsive width & padding for all laptops) */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1328px] relative z-10 w-full py-4 lg:py-0">
          <div className="w-full lg:w-[50%] xl:w-[48%] max-w-xl">
            {/* Label: CAREER HUB */}
            <div className="flex items-center gap-3 mb-2.5 sm:mb-3">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#D5B568]">
                CAREER HUB
              </span>
              <div className="h-[1px] w-12 bg-[#D5B568]/60" />
            </div>

            {/* Heading: Jobs & Internships for Poddar Alumni (Fluid responsive font) */}
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[36px] xl:text-[42px] font-bold text-white tracking-tight leading-[1.14] mb-3">
              Jobs & Internships <br />
              <span className="font-serif italic font-normal text-[#D5B568]">
                for Poddar Alumni
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed mb-5 sm:mb-6 max-w-lg">
              Explore meaningful career opportunities, connect with fellow alumni and take the next step in your professional journey.
            </p>

            {/* Two CTA Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("search-filters-panel");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 h-[42px] sm:h-[46px] px-4 sm:px-5 rounded-xl bg-[#D5B568] hover:bg-[#c6a350] text-[#101A30] font-semibold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Search className="h-4 w-4" />
                <span>Explore Opportunities</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              {currentUser?.role !== "student" ? (
                <Link
                  href="/career-hub/post"
                  className="inline-flex items-center gap-2 h-[42px] sm:h-[46px] px-4 sm:px-5 rounded-xl border border-[#D5B568]/60 hover:border-[#D5B568] text-white hover:text-[#D5B568] bg-[#101A30]/60 hover:bg-[#101A30] font-semibold text-xs sm:text-sm transition-all shadow-sm active:scale-95"
                >
                  <Upload className="h-4 w-4 text-[#D5B568]" />
                  <span>Post an Opportunity</span>
                </Link>
              ) : (
                <Link
                  href="/dashboard/applications"
                  className="inline-flex items-center gap-2 h-[42px] sm:h-[46px] px-4 sm:px-5 rounded-xl border border-slate-600 hover:border-slate-400 text-white hover:text-slate-200 bg-white/5 font-semibold text-xs sm:text-sm transition-all shadow-sm active:scale-95"
                >
                  <Briefcase className="h-4 w-4 text-[#D5B568]" />
                  <span>My Applications</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. SEARCH AND FILTERS SECTION (Max-width ~1328px, White background, 14px radius, 20px padding) */}
      <div id="search-filters-panel" className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1328px] -mt-8 sm:-mt-10 relative z-20">
        <div className="bg-white rounded-[14px] shadow-lg border border-[#E8E1D2] p-5">
          {/* Top Row: Search Input (50px height) + Search Button + Saved Jobs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 mb-3.5">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by role, company, skills, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[50px] pl-11 pr-10 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D5B568]/40 focus:border-[#D5B568] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                toast.success(`Found ${filteredJobs.length} opportunities`);
              }}
              className="h-[50px] px-6 rounded-xl bg-[#101A30] hover:bg-[#182747] text-white font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer shrink-0"
            >
              <Search className="h-4 w-4 text-slate-300" />
              <span>Search</span>
            </button>

            <button
              type="button"
              onClick={() => setOnlySaved(!onlySaved)}
              className={cn(
                "h-[50px] px-4 rounded-xl border font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0",
                onlySaved
                  ? "bg-[#D5B568]/15 border-[#D5B568] text-[#101A30]"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              )}
            >
              <Bookmark className={cn("h-4 w-4", onlySaved ? "fill-[#D5B568] text-[#D5B568]" : "text-slate-600")} />
              <span>Saved ({savedJobIds.length})</span>
            </button>
          </div>

          {/* Bottom Row: Compact functional filters (Type, Mode, Eligibility, Domain, Referrals Only) */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-3 border-t border-slate-100">
            {/* Type */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-700">Type:</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="h-9 px-2.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#D5B568]"
              >
                {JOB_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Mode */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-700">Mode:</span>
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="h-9 px-2.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#D5B568]"
              >
                {WORK_MODES.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Eligibility */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-700">Eligibility:</span>
              <select
                value={selectedWhoCanApply}
                onChange={(e) => setSelectedWhoCanApply(e.target.value)}
                className="h-9 px-2.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#D5B568]"
              >
                {WHO_CAN_APPLY_OPTIONS.map((w) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>

            {/* Domain */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-700">Domain:</span>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="h-9 px-2.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#D5B568] max-w-[160px] truncate"
              >
                {DOMAINS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Referrals Only Toggle */}
            <button
              type="button"
              onClick={() => setOnlyReferral(!onlyReferral)}
              className={cn(
                "h-9 px-3 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer",
                onlyReferral
                  ? "bg-[#D5B568]/20 border-[#D5B568] text-[#101A30] font-semibold"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              )}
            >
              <Award className={cn("h-3.5 w-3.5", onlyReferral ? "text-[#D5B568]" : "text-[#D5B568]")} />
              <span>Referrals Only</span>
            </button>

            {/* Clear Filters (if active) */}
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-red-600 font-semibold hover:underline ml-auto cursor-pointer"
              >
                Clear filters ({activeFilterCount})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. OPPORTUNITIES COUNT & USER STATUS */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1328px] pt-8 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-sm font-medium text-slate-600">
          Showing <strong className="text-[#101A30] font-bold">{filteredJobs.length}</strong> opportunities
        </div>
        {currentUser && (
          <div className="text-xs sm:text-sm text-slate-600 flex items-center gap-2">
            <span>Signed in as:</span>
            <span className="font-bold text-[#101A30]">{currentUser.name}</span>
            <span
              className={cn(
                "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                currentUser.role === "student"
                  ? "bg-indigo-100 text-indigo-900 border border-indigo-200"
                  : "bg-[#D5B568]/20 text-[#101A30] border border-[#D5B568]/40"
              )}
            >
              {currentUser.role === "student" ? "STUDENT" : "ALUMNUS"}
            </span>
          </div>
        )}
      </div>

      {/* 4. JOB LISTING SECTION (Three equal-width columns on desktop, 22px gap, max-width ~1328px) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1328px] pb-16">
        {filteredJobs.length === 0 ? (
          <EmptyState
            title="No Opportunities Match Your Criteria"
            description="No job or internship vacancies match your active search terms or filters. Try clearing some filters or searching for a different skill."
            actionLabel="Reset All Filters"
            onAction={resetFilters}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 xl:gap-[22px]">
            {filteredJobs.map((job) => {
              const isSaved = savedJobIds.includes(job.id);
              const { companyIcon, companyBg } = getCompanyBranding(job.company);
              const formattedSalary = formatSalaryCompact(job.salaryRange);

              return (
                <div
                  key={job.id}
                  className="bg-white rounded-[14px] border border-[#E8E1D2] hover:border-[#D5B568]/60 hover:shadow-md transition-all duration-200 p-4 sm:p-5 xl:p-[22px] flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Employment Type & Work Mode badges + Bookmark */}
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={cn(
                            "px-2.5 py-0.5 rounded-md text-xs font-semibold",
                            job.type === "Internship"
                              ? "bg-purple-50 text-purple-700 border border-purple-200/60"
                              : "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                          )}
                        >
                          {job.type}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200/60">
                          {job.workMode || "On-site"}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          toggleSaveJob(job.id);
                          toast.success(isSaved ? "Removed from saved opportunities" : "Saved to your bookmarks");
                        }}
                        className="p-1 text-slate-400 hover:text-[#D5B568] transition-colors"
                        aria-label={isSaved ? "Remove bookmark" : "Save opportunity"}
                      >
                        <Bookmark className={cn("h-4 w-4", isSaved && "fill-[#D5B568] text-[#D5B568]")} />
                      </button>
                    </div>

                    {/* Company Logo & Company Name with Verified Indicator */}
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center font-bold text-white shadow-xs shrink-0", companyBg)}>
                        {companyIcon}
                      </div>
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-sm font-semibold text-slate-900 truncate">{job.company}</span>
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#D5B568] shrink-0 fill-[#D5B568]" />
                      </div>
                    </div>

                    {/* Job Title */}
                    <h3 className="font-serif font-bold text-[17px] sm:text-lg text-[#101A30] group-hover:text-[#b89547] transition-colors line-clamp-1 mb-2.5">
                      {job.title}
                    </h3>

                    {/* Location, Experience and Salary */}
                    <div className="flex items-center gap-2 text-xs text-slate-600 flex-wrap mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span>{job.location}</span>
                      </span>
                      <span className="text-slate-300">|</span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span>{job.experience || "1-3 Years"}</span>
                      </span>
                      {formattedSalary && (
                        <>
                          <span className="text-slate-300">|</span>
                          <span className="flex items-center gap-1 font-medium text-slate-800">
                            <span>₹</span>
                            <span>{formattedSalary}</span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Bottom Row: View Details Action aligned to the right */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveJob(job);
                        setSheetOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#D5B568] text-xs font-semibold text-[#101A30] hover:bg-[#D5B568]/15 transition-colors group-hover:bg-[#D5B568] group-hover:text-[#101A30]"
                    >
                      <span>View Details</span>
                      <ArrowRight className="h-3.5 w-3.5 text-[#D5B568] group-hover:text-[#101A30] transition-colors" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. PRESERVED JOB DETAIL SHEET */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-xl p-0 overflow-y-auto bg-white" data-lenis-prevent>
          {activeJob && (
            <div className="p-6 sm:p-8 space-y-6">
              <SheetHeader className="text-left border-b border-slate-200 pb-4">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#101A30] text-[#D5B568]">
                    {activeJob.type}
                  </span>
                  {activeJob.workMode && (
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-900 font-medium">
                      {activeJob.workMode}
                    </span>
                  )}
                  <span className="text-xs text-slate-500 font-medium">{activeJob.domain}</span>
                </div>
                <SheetTitle className="text-2xl font-serif font-bold text-[#101A30]">
                  {activeJob.title}
                </SheetTitle>
                <SheetDescription className="text-sm font-semibold text-slate-900 flex items-center gap-1.5 mt-1">
                  <Building className="h-4 w-4 text-[#D5B568]" />
                  <span>{activeJob.company}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500 font-normal">{activeJob.location}</span>
                </SheetDescription>
              </SheetHeader>

              {/* POSTER CARD */}
              <div className="p-4 rounded-2xl bg-[#F6F4EF] border border-[#E8E1D2] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AvatarInitials name={activeJob.postedByAlumniName} size="md" />
                  <div>
                    <div className="text-xs font-bold text-[#101A30]">
                      Posted by {activeJob.postedByAlumniName}
                    </div>
                    <div className="text-[11px] text-slate-500">
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
                    className="px-3 py-1.5 rounded-lg bg-[#101A30] text-[#D5B568] font-semibold text-xs hover:bg-navy-900"
                  >
                    Message
                  </Link>
                )}
              </div>

              {/* KEY STATS PILLS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-[#F6F4EF] border border-[#E8E1D2]">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Openings</div>
                  <div className="text-sm font-bold text-[#101A30]">{activeJob.openings || 1}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F6F4EF] border border-[#E8E1D2]">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Compensation</div>
                  <div className="text-sm font-bold text-emerald-700 truncate">{activeJob.salaryRange || "Competitive"}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F6F4EF] border border-[#E8E1D2]">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Who Can Apply</div>
                  <div className="text-sm font-bold text-[#101A30] truncate">{activeJob.whoCanApply || "Both"}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F6F4EF] border border-[#E8E1D2]">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Referral Slots</div>
                  <div className="text-sm font-bold text-amber-700">{activeJob.canRefer ? activeJob.referralSlots ?? 1 : 0}</div>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <h4 className="text-xs font-bold text-[#101A30] uppercase tracking-wider mb-2">
                  Role Description
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {activeJob.description}
                </p>
              </div>

              {/* REQUIREMENTS */}
              {activeJob.requirements && activeJob.requirements.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-[#101A30] uppercase tracking-wider mb-2">
                    Requirements & Qualifications
                  </h4>
                  <ul className="space-y-2">
                    {activeJob.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ACTIONS */}
              <div className="pt-6 border-t border-slate-200 space-y-3">
                {currentUser?.id === activeJob.posterId ? (
                  <Link
                    href={`/dashboard/postings/${activeJob.id}`}
                    className="w-full py-3.5 rounded-xl bg-[#101A30] text-[#D5B568] font-bold text-sm text-center flex items-center justify-center gap-2"
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
                      className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#D5B568] via-amber-400 to-[#c6a350] text-[#101A30] hover:brightness-105 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="h-4 w-4" />
                      <span>Apply for this Opportunity</span>
                    </button>

                    {activeJob.canRefer && (activeJob.referralSlots ?? 0) > 0 && !getReferralForJob(activeJob.id) && (
                      <button
                        type="button"
                        onClick={() => handleOpenReferralModal(activeJob)}
                        className="w-full py-3.5 rounded-xl font-semibold text-sm bg-[#101A30] text-[#D5B568] hover:bg-navy-900 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Award className="h-4 w-4 text-[#D5B568]" />
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

      {/* 6. PRESERVED APPLY DIALOG */}
      <Dialog open={Boolean(applyModalJob)} onOpenChange={(open) => !open && setApplyModalJob(null)}>
        <DialogContent className="sm:max-w-lg bg-white rounded-3xl p-6 sm:p-8" data-lenis-prevent>
          <DialogHeader className="border-b border-slate-200 pb-3">
            <DialogTitle className="text-xl font-serif font-bold text-[#101A30]">
              Apply for {applyModalJob?.title}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              {applyModalJob?.company} • Location: {applyModalJob?.location}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitApplication} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-[#101A30] uppercase tracking-wider mb-1.5">
                Applicant Information
              </label>
              <div className="p-3 rounded-xl bg-[#F6F4EF] border border-[#E8E1D2] text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Name:</span>
                  <span className="font-bold text-[#101A30]">{currentUser?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Role:</span>
                  <span className="font-semibold text-[#101A30] capitalize">{currentUser?.role === "student" ? "Student" : "Alumnus"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Course / Org:</span>
                  <span className="text-[#101A30]">{currentUser?.course || currentUser?.company || "Poddar Network"}</span>
                </div>
              </div>
            </div>

            {/* RESUME DISPLAY */}
            <div>
              <label className="block text-xs font-semibold text-[#101A30] uppercase tracking-wider mb-1.5">
                Attached Resume / Portfolio
              </label>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#F6F4EF] border border-[#E8E1D2] text-xs">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#D5B568]" />
                  <span className="tabular-nums font-medium text-[#101A30]">{mockResume}</span>
                </div>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                  Ready to submit
                </span>
              </div>
            </div>

            {/* COVER NOTE */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#101A30] uppercase tracking-wider">
                  Cover Note / Pitch (Max 500 characters) *
                </label>
                <span className="text-[10px] text-slate-500">{coverNote.length} / 500</span>
              </div>
              <textarea
                rows={4}
                maxLength={500}
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                placeholder="Highlight your key projects, academic excellence, or relevant experience..."
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#D5B568]/40"
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
                    className="mt-0.5 h-4 w-4 rounded text-[#101A30] border-slate-300"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-[#101A30] block">
                      Also request internal referral from {applyModalJob.postedByAlumniName}
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      Alumnus has {applyModalJob.referralSlots} referral slots open for verified candidates.
                    </span>
                  </div>
                </label>
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-[#101A30] text-[#D5B568] font-bold text-sm hover:bg-navy-900 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="h-4 w-4" />
              <span>Submit Application</span>
            </button>
          </form>
        </DialogContent>
      </Dialog>

      {/* 7. PRESERVED REFERRAL REQUEST DIALOG */}
      <Dialog open={Boolean(referralModalJob)} onOpenChange={(open) => !open && setReferralModalJob(null)}>
        <DialogContent className="sm:max-w-lg bg-white rounded-3xl p-6 sm:p-8" data-lenis-prevent>
          <DialogHeader className="border-b border-slate-200 pb-3">
            <DialogTitle className="text-xl font-serif font-bold text-[#101A30] flex items-center gap-2">
              <Award className="h-5 w-5 text-[#D5B568]" />
              <span>Request Internal Referral</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Asking {referralModalJob?.postedByAlumniName} for {referralModalJob?.title} at {referralModalJob?.company}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitReferral} className="space-y-4 pt-2">
            <p className="text-xs text-slate-500 leading-relaxed">
              Alumni mentors review referral requests based on skill match and academic grounding. Be professional, concise, and clear about your background.
            </p>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#101A30] uppercase tracking-wider">
                  Personal Intro & Pitch (Max 300 chars) *
                </label>
                <span className="text-[10px] text-slate-500">{referralMessage.length} / 300</span>
              </div>
              <textarea
                rows={3}
                maxLength={300}
                value={referralMessage}
                onChange={(e) => setReferralMessage(e.target.value)}
                placeholder="Briefly state your graduation year, relevant skills, and why you are keen on this team..."
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-[#101A30] text-[#D5B568] font-bold text-sm hover:bg-navy-900 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Award className="h-4 w-4 text-[#D5B568]" />
              <span>Send Referral Request</span>
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
