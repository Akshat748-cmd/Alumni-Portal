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
} from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { FilterDrawer } from "@/components/common/FilterDrawer";
import { EmptyState } from "@/components/common/EmptyState";
import { AvatarInitials } from "@/components/common/AvatarInitials";
import { usePortalStore } from "@/store/portal";
import { JobOpportunity, DomainCategory } from "@/data/types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const JOB_TYPES = ["All Types", "Full-Time", "Internship", "Remote", "Contract"];

const DOMAINS: string[] = [
  "All Domains",
  "IT & Technology",
  "Finance & Banking",
  "Business & Entrepreneurship",
  "Marketing & Advertising",
  "Healthcare",
  "Jewellery & Fashion",
];

const LOCATIONS = ["All Locations", "Jaipur", "Bengaluru", "Mumbai", "Pune", "Remote"];

export default function JobsPage() {
  const { jobs } = usePortalStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedDomain, setSelectedDomain] = useState("All Domains");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");

  // Selected job for detail Sheet
  const [activeJob, setActiveJob] = useState<JobOpportunity | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [appliedMap, setAppliedMap] = useState<Record<string, boolean>>({});
  const [referralMap, setReferralMap] = useState<Record<string, boolean>>({});

  // Only approved jobs appear publicly
  const approvedJobs = useMemo(() => {
    return jobs.filter((j) => j.status === "approved");
  }, [jobs]);

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return approvedJobs.filter((job) => {
      // Keyword search across title, company, description, and location
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matches =
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query);
        if (!matches) return false;
      }

      // Type filter
      if (selectedType !== "All Types") {
        if (selectedType === "Remote") {
          if (!job.location.toLowerCase().includes("remote") && job.type !== "Remote") {
            return false;
          }
        } else if (job.type !== selectedType) {
          return false;
        }
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
  }, [approvedJobs, searchQuery, selectedType, selectedDomain, selectedLocation]);

  const activeFilterCount =
    (selectedType !== "All Types" ? 1 : 0) +
    (selectedDomain !== "All Domains" ? 1 : 0) +
    (selectedLocation !== "All Locations" ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedType("All Types");
    setSelectedDomain("All Domains");
    setSelectedLocation("All Locations");
  };

  const handleApply = (job: JobOpportunity) => {
    setAppliedMap((prev) => ({ ...prev, [job.id]: true }));
    toast.success(`Application routed to ${job.company}! Confirmation sent to your email.`);
  };

  const handleReferral = (job: JobOpportunity) => {
    setReferralMap((prev) => ({ ...prev, [job.id]: true }));
    toast.success(`Referral request sent to alumnus ${job.postedByAlumniName} (Class of ${job.postedByBatch}).`);
  };

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <PageHero
        eyebrow="CAREER DIRECTORY • OPPORTUNITIES"
        title="Jobs & Internships"
        subtitle="Exclusive vacancies, graduate training programs, and referral openings shared directly by Poddar alumni leaders."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Career Hub", href: "/career-hub" },
          { label: "Jobs & Internships" },
        ]}
      />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* TOP SEARCH & ACTION BAR */}
          <div className="bg-white rounded-3xl p-6 border border-line shadow-sm mb-8">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              {/* SEARCH INPUT */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by role title, hiring company, skills, or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-10 rounded-xl border border-line bg-ivory/50 text-base text-navy-950 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-3.5 text-muted hover:text-navy-950"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* POST AN OPPORTUNITY BUTTON */}
              <Link
                href="/career-hub/post"
                className="h-12 px-5 rounded-xl bg-navy-950 text-gold-300 font-bold text-sm hover:bg-navy-900 transition-colors shadow-md flex items-center justify-center gap-2 shrink-0"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Post an Opportunity</span>
              </Link>
            </div>

            {/* MOBILE FILTER DRAWER */}
            <div className="mt-4 md:hidden">
              <FilterDrawer
                title="Filters"
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
                      className="w-full h-12 px-3 rounded-xl border border-line text-base text-navy-950"
                    >
                      {JOB_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
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
                      className="w-full h-12 px-3 rounded-xl border border-line text-base text-navy-950"
                    >
                      {DOMAINS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Target Location
                    </label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full h-12 px-3 rounded-xl border border-line text-base text-navy-950"
                    >
                      {LOCATIONS.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </FilterDrawer>
            </div>

            {/* DESKTOP INLINE FILTER BAR */}
            <div className="hidden md:flex flex-wrap items-center gap-3 pt-4 border-t border-line mt-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-navy-900">Type:</span>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="h-10 px-3 rounded-xl border border-line text-xs font-medium text-navy-950 bg-ivory/50 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                >
                  {JOB_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-navy-900">Domain:</span>
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="h-10 px-3 rounded-xl border border-line text-xs font-medium text-navy-950 bg-ivory/50 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                >
                  {DOMAINS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-navy-900">Location:</span>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="h-10 px-3 rounded-xl border border-line text-xs font-medium text-navy-950 bg-ivory/50 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs text-red-600 font-semibold hover:underline ml-auto cursor-pointer"
                >
                  Clear all filters ({activeFilterCount})
                </button>
              )}
            </div>
          </div>

          {/* RESULTS COUNTER */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-xs sm:text-sm font-medium text-muted">
              Showing <strong className="text-navy-950 font-bold">{filteredJobs.length}</strong> verified opportunities
            </div>
          </div>

          {/* JOBS GRID */}
          {filteredJobs.length === 0 ? (
            <EmptyState
              title="No Openings Found"
              description="No job or internship opportunities match your filter parameters. Try expanding your search or clear applied filters."
              actionLabel="Reset Search Filters"
              onAction={resetFilters}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => {
                const hasApplied = appliedMap[job.id];
                const hasReferral = referralMap[job.id];

                return (
                  <div
                    key={job.id}
                    className="flex flex-col justify-between bg-white rounded-3xl p-6 sm:p-7 border border-line shadow-md hover:shadow-xl hover:border-gold-500/40 transition-all duration-300"
                  >
                    <div>
                      {/* HEADER WITH TYPE BADGE */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                            job.type === "Internship"
                              ? "bg-purple-100 text-purple-800"
                              : job.type === "Full-Time"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {job.type}
                        </span>

                        <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-gold-700 bg-gold-500/10 px-2 py-0.5 rounded-full border border-gold-500/20">
                          <Sparkles className="h-3 w-3" />
                          <span>Referral Available</span>
                        </div>
                      </div>

                      {/* ROLE TITLE & COMPANY */}
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-navy-950 line-clamp-2 mb-1">
                        {job.title}
                      </h3>
                      <div className="text-sm font-semibold text-navy-900 mb-3 flex items-center gap-1.5">
                        <Building className="h-4 w-4 text-gold-600" />
                        <span>{job.company}</span>
                      </div>

                      {/* LOCATION & EXPERIENCE */}
                      <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-muted mb-4">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{job.location}</span>
                        </span>
                        <span>•</span>
                        <span>{job.experience}</span>
                      </div>

                      {/* DESCRIPTION SNIPPET */}
                      <p className="text-xs text-muted line-clamp-3 mb-6 leading-relaxed">
                        {job.description}
                      </p>
                    </div>

                    {/* FOOTER: POSTED BY ALUMNUS + ACTION */}
                    <div>
                      <div className="p-3 rounded-2xl bg-ivory border border-line/80 mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AvatarInitials name={job.postedByAlumniName} size="sm" />
                          <div>
                            <div className="text-xs font-bold text-navy-950">
                              {job.postedByAlumniName}
                            </div>
                            <div className="text-[10px] text-muted">
                              Class of {job.postedByBatch}
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] text-muted">{job.postedDate}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveJob(job);
                            setSheetOpen(true);
                          }}
                          className="w-full py-2.5 rounded-xl bg-ivory border border-line text-navy-900 font-semibold text-xs hover:bg-navy-50 transition-colors cursor-pointer text-center"
                        >
                          View Details
                        </button>

                        <button
                          type="button"
                          onClick={() => handleReferral(job)}
                          disabled={hasReferral}
                          className={`w-full py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer text-center flex items-center justify-center gap-1 ${
                            hasReferral
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                              : "bg-navy-950 text-gold-300 hover:bg-navy-900"
                          }`}
                        >
                          {hasReferral ? (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              <span>Requested</span>
                            </>
                          ) : (
                            <>
                              <Send className="h-3 w-3" />
                              <span>Ask Referral</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* JOB DETAIL SHEET (FULL SCREEN ON MOBILE) */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-xl p-0 overflow-y-auto bg-white">
          {activeJob && (
            <div className="p-6 sm:p-8 space-y-6">
              <SheetHeader className="text-left border-b border-line pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-navy-950 text-gold-300">
                    {activeJob.type}
                  </span>
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
                      Posted by Alumnus {activeJob.postedByAlumniName}
                    </div>
                    <div className="text-[11px] text-muted">
                      Class of {activeJob.postedByBatch} • Verified Sponsor
                    </div>
                  </div>
                </div>
                <div className="text-right text-[11px] text-muted">
                  Deadline: <span className="font-semibold text-navy-900">{activeJob.deadline}</span>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <h4 className="text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
                  Role Overview
                </h4>
                <p className="text-sm text-navy-900/90 leading-relaxed whitespace-pre-line">
                  {activeJob.description}
                </p>
              </div>

              {/* REQUIREMENTS */}
              {activeJob.requirements && activeJob.requirements.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
                    Candidate Qualifications
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
                <button
                  type="button"
                  onClick={() => handleApply(activeJob)}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                    appliedMap[activeJob.id]
                      ? "bg-emerald-600 text-white"
                      : "bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 text-navy-950 hover:brightness-105"
                  }`}
                >
                  {appliedMap[activeJob.id] ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Application Transmitted</span>
                    </>
                  ) : (
                    <>
                      <ExternalLink className="h-4 w-4" />
                      <span>Apply with Alumni Profile</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleReferral(activeJob)}
                  disabled={referralMap[activeJob.id]}
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    referralMap[activeJob.id]
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                      : "bg-navy-950 text-gold-300 hover:bg-navy-900"
                  }`}
                >
                  {referralMap[activeJob.id] ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Referral Request Logged</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Request Internal Alumnus Referral</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
