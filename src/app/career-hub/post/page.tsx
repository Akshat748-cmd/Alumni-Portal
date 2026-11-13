"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Briefcase,
  Building,
  MapPin,
  Calendar,
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Users,
  ShieldCheck,
  Check,
  Layers,
  DollarSign,
  Award,
} from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { EmptyState } from "@/components/common/EmptyState";
import { usePortalStore } from "@/store/portal";
import { DomainCategory, WorkMode, WhoCanApply, ApplyMethod } from "@/data/types";
import { fireConfettiBurst } from "@/components/motion/ConfettiBurst";

const JOB_TYPES = ["Full-Time", "Internship", "Remote", "Contract"] as const;
const WORK_MODES: WorkMode[] = ["Remote", "Hybrid", "On-site"];
const WHO_CAN_APPLY: WhoCanApply[] = ["Both", "Students", "Alumni"];

const DOMAINS: DomainCategory[] = [
  "IT & Technology",
  "Finance & Banking",
  "Business & Entrepreneurship",
  "Marketing & Advertising",
  "Education",
  "Healthcare",
  "Jewellery & Fashion",
];

const SUGGESTED_SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Data Analysis",
  "Financial Modeling",
  "UI/UX Design",
  "Product Management",
];

export default function PostOpportunityPage() {
  const { currentUser, submitItem } = usePortalStore();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState(currentUser?.company || "");
  const [type, setType] = useState<(typeof JOB_TYPES)[number]>("Full-Time");
  const [workMode, setWorkMode] = useState<WorkMode>("Hybrid");
  const [location, setLocation] = useState("Jaipur / NCR");
  const [domain, setDomain] = useState<DomainCategory>("IT & Technology");
  const [openings, setOpenings] = useState(2);
  const [salaryRange, setSalaryRange] = useState("₹8 - ₹12 LPA");
  const [skills, setSkills] = useState<string[]>(["React", "TypeScript"]);
  const [customSkill, setCustomSkill] = useState("");
  const [description, setDescription] = useState("");
  const [requirementsInput, setRequirementsInput] = useState(
    "Bachelor's degree or pre-final student from Poddar Group of Institutions\nStrong fundamentals in software engineering or business domains\nDemonstrated problem-solving ability and strong communication skills"
  );
  const [whoCanApply, setWhoCanApply] = useState<WhoCanApply>("Both");
  const [applyMethod, setApplyMethod] = useState<ApplyMethod>("portal");
  const [externalUrl, setExternalUrl] = useState("");
  const [canRefer, setCanRefer] = useState(true);
  const [referralSlots, setReferralSlots] = useState(5);
  const [deadline, setDeadline] = useState("2026-12-31");

  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  // Guard: guest user
  const isGuest = !currentUser;
  const isStudent = currentUser?.role === "student";

  // Validations
  const isTitleValid = title.trim().length >= 4;
  const isCompanyValid = company.trim().length >= 2;
  const isDescValid = description.trim().length >= 20;
  const isExternalValid =
    applyMethod === "portal" ||
    externalUrl.trim().includes("@") ||
    /^https?:\/\/.+/i.test(externalUrl.trim());
  const isSkillsValid = skills.length >= 1;

  const errors: string[] = [];
  if (!isTitleValid) errors.push("Job title must be at least 4 characters");
  if (!isCompanyValid) errors.push("Organization/company name is required");
  if (!isDescValid) errors.push("Job description must be at least 20 characters");
  if (!isSkillsValid) errors.push("Select or add at least 1 key skill requirement");
  if (!isExternalValid) errors.push("Valid external URL or HR email is required when apply method is external");

  const toggleSkill = (sk: string) => {
    if (skills.includes(sk)) {
      setSkills(skills.filter((s) => s !== sk));
    } else {
      setSkills([...skills, sk]);
    }
  };

  const handleAddSkill = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ("key" in e && e.key !== "Enter") return;
    e.preventDefault();
    const trimmed = customSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setCustomSkill("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (errors.length > 0) {
      toast.error("Please fill in all mandatory job requirements.");
      return;
    }

    const requirements = requirementsInput
      .split("\n")
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    const payload = {
      title: title.trim(),
      company: company.trim(),
      type,
      workMode,
      location: location.trim(),
      domain,
      openings: Number(openings) || 1,
      salaryRange: salaryRange.trim() || undefined,
      skills,
      experience: type === "Internship" ? "0-1 Years" : "1-3 Years",
      description: description.trim(),
      requirements: requirements.length > 0 ? requirements : ["Poddar Group of Institutions student/alumnus"],
      whoCanApply,
      applyMethod,
      applicationLinkOrEmail: applyMethod === "external" ? externalUrl.trim() : "portal",
      canRefer,
      referralSlots: canRefer ? Number(referralSlots) : 0,
      deadline,
      postedByAlumniName: currentUser?.name || "Verified Alumnus",
      postedByBatch: currentUser?.batch || 2018,
    };

    const id = submitItem("opportunity", payload);
    setSubmittedId(id);
    fireConfettiBurst();
    toast.success("Opportunity published live to Poddar Opportunities Network!");
  };

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <PageHero
        eyebrow="RECRUITMENT & HIRING • OPPORTUNITIES NETWORK"
        title="Post a Career Opening"
        subtitle="Empower fellow Poddar graduates and enrolled students with direct vacancies, internships, and verified alumni referral slots."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Career Hub", href: "/career-hub" },
          { label: "Post an Opportunity" },
        ]}
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {isGuest ? (
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-line shadow-xl text-center max-w-xl mx-auto">
              <div className="inline-flex p-4 rounded-2xl bg-navy-50 text-navy-900 mb-4">
                <Briefcase className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-navy-950 mb-2">
                Alumni Sign-In Required
              </h2>
              <p className="text-sm text-muted mb-6">
                Posting jobs and offering internal referrals is reserved for verified Poddar alumni. Please sign in or register to publish an opening.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/join/auth"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-navy-950 text-gold-300 font-bold text-sm hover:bg-navy-900 transition-colors"
                >
                  Sign In / Register
                </Link>
                <Link
                  href="/career-hub/jobs"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-ivory border border-line text-navy-900 font-semibold text-sm hover:bg-navy-50"
                >
                  Browse Live Openings
                </Link>
              </div>
            </div>
          ) : isStudent ? (
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-line shadow-xl text-center max-w-xl mx-auto">
              <EmptyState
                title="Posting is Reserved for Alumni"
                description="As a student member, you are invited to browse opportunities, apply directly with your profile, and request referrals from alumni mentors. Alumni members post jobs and review applications."
                actionLabel="Explore Live Opportunities"
                onAction={() => {
                  window.location.href = "/career-hub/jobs";
                }}
              />
            </div>
          ) : submittedId ? (
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-line shadow-2xl text-center max-w-2xl mx-auto">
              <div className="inline-flex p-4 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 mb-6">
                <Sparkles className="h-10 w-10 text-emerald-600" />
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
                Live on Opportunities Network
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy-950 mb-3">
                Opportunity Published Successfully!
              </h2>
              <p className="text-sm text-muted max-w-lg mx-auto mb-6 leading-relaxed">
                Your opening <span className="font-semibold text-navy-900">&ldquo;{title}&rdquo;</span> is now active in the Career Hub. Students and fellow alumni can apply directly and request referrals from you.
              </p>

              <div className="p-4 rounded-2xl bg-ivory border border-line text-left max-w-md mx-auto mb-8 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted">Posting ID:</span>
                  <span className="font-mono font-bold text-navy-950">{submittedId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Target Applicants:</span>
                  <span className="font-semibold text-navy-900">{whoCanApply}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Referral Slots:</span>
                  <span className="font-semibold text-gold-700">{canRefer ? `${referralSlots} Slots Offered` : "None"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Status:</span>
                  <span className="font-bold text-emerald-700">Live (Accepting Applications)</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/career-hub/jobs"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-navy-950 text-gold-300 font-bold text-sm hover:bg-navy-900 transition-colors shadow-md inline-flex items-center justify-center gap-2"
                >
                  <span>View in Career Hub</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/dashboard/postings"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-ivory border border-line text-navy-900 font-semibold text-sm hover:bg-navy-50 transition-colors"
                >
                  Manage My Postings
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedId(null);
                    setSubmitAttempted(false);
                    setTitle("");
                    setDescription("");
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs text-muted hover:text-navy-950"
                >
                  Post Another Opening
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-line shadow-xl">
              <div className="border-b border-line pb-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy-950">
                    Opportunity Listing Details
                  </h2>
                  <p className="text-xs sm:text-sm text-muted mt-1">
                    Postings go live immediately to students and alumni across the Poddar network.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Instant Live Deployment</span>
                </span>
              </div>

              {submitAttempted && errors.length > 0 && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs mb-6 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-sm">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span>Please correct the highlighted requirements:</span>
                  </div>
                  <ul className="list-disc pl-6 space-y-0.5">
                    {errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* TITLE & COMPANY */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Position Title *
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Associate Software Engineer"
                      className="w-full h-11 px-3.5 rounded-xl border border-line text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Organization / Company *
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Apex Capital Advisory"
                      className="w-full h-11 px-3.5 rounded-xl border border-line text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                    />
                  </div>
                </div>

                {/* TYPE, WORK MODE & DOMAIN */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Job Type
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as any)}
                      className="w-full h-11 px-3.5 rounded-xl border border-line text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/30"
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
                      value={workMode}
                      onChange={(e) => setWorkMode(e.target.value as WorkMode)}
                      className="w-full h-11 px-3.5 rounded-xl border border-line text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                    >
                      {WORK_MODES.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Industry Domain
                    </label>
                    <select
                      value={domain}
                      onChange={(e) => setDomain(e.target.value as DomainCategory)}
                      className="w-full h-11 px-3.5 rounded-xl border border-line text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                    >
                      {DOMAINS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* OPENINGS, SALARY & LOCATION */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Openings Count
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={openings}
                      onChange={(e) => setOpenings(Number(e.target.value))}
                      className="w-full h-11 px-3.5 rounded-xl border border-line text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Salary / Stipend Range
                    </label>
                    <input
                      type="text"
                      value={salaryRange}
                      onChange={(e) => setSalaryRange(e.target.value)}
                      placeholder="e.g. ₹8 - ₹12 LPA or ₹25,000/mo"
                      className="w-full h-11 px-3.5 rounded-xl border border-line text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Location / Base City
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Jaipur, Rajasthan / Hybrid"
                      className="w-full h-11 px-3.5 rounded-xl border border-line text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                    />
                  </div>
                </div>

                {/* WHO CAN APPLY & APPLICATION METHOD */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-ivory border border-line">
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Who Can Apply?
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {WHO_CAN_APPLY.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setWhoCanApply(opt)}
                          className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                            whoCanApply === opt
                              ? "bg-navy-950 text-gold-300 border-navy-950"
                              : "bg-white text-navy-900 border-line hover:bg-navy-50"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Application Method
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setApplyMethod("portal")}
                        className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                          applyMethod === "portal"
                            ? "bg-navy-950 text-gold-300 border-navy-950"
                            : "bg-white text-navy-900 border-line hover:bg-navy-50"
                        }`}
                      >
                        Apply in Portal (Direct)
                      </button>
                      <button
                        type="button"
                        onClick={() => setApplyMethod("external")}
                        className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                          applyMethod === "external"
                            ? "bg-navy-950 text-gold-300 border-navy-950"
                            : "bg-white text-navy-900 border-line hover:bg-navy-50"
                        }`}
                      >
                        External Link / HR Email
                      </button>
                    </div>
                  </div>
                </div>

                {applyMethod === "external" && (
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      External URL or Email for Applications *
                    </label>
                    <input
                      type="text"
                      value={externalUrl}
                      onChange={(e) => setExternalUrl(e.target.value)}
                      placeholder="https://careers.acme.mock/apply or careers@acme.mock"
                      className="w-full h-11 px-3.5 rounded-xl border border-line text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                    />
                  </div>
                )}

                {/* REFERRAL SLOTS OFFER */}
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="font-bold text-sm text-navy-950 flex items-center gap-1.5">
                        <Award className="h-4 w-4 text-amber-600" />
                        <span>I Can Offer Internal Referrals for this Role</span>
                      </div>
                      <p className="text-xs text-muted mt-0.5">
                        Candidates can request an internal referral from you. You can review requests and accept/decline anytime in your Dashboard.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={canRefer}
                        onChange={(e) => setCanRefer(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-navy-950"></div>
                    </label>
                  </div>

                  {canRefer && (
                    <div className="mt-3 pt-3 border-t border-amber-200/60 flex items-center gap-3">
                      <label className="text-xs font-semibold text-navy-950">
                        Available Referral Slots:
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={20}
                        value={referralSlots}
                        onChange={(e) => setReferralSlots(Number(e.target.value))}
                        className="w-20 h-9 px-3 rounded-lg border border-line bg-white text-xs font-bold text-navy-950 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                      />
                      <span className="text-[11px] text-muted">
                        Slots automatically decrement when you accept a candidate referral.
                      </span>
                    </div>
                  )}
                </div>

                {/* SKILLS */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Required Skills *
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {SUGGESTED_SKILLS.map((sk) => {
                      const sel = skills.includes(sk);
                      return (
                        <button
                          key={sk}
                          type="button"
                          onClick={() => toggleSkill(sk)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                            sel
                              ? "bg-navy-950 text-gold-300"
                              : "bg-ivory border border-line text-navy-800 hover:bg-navy-50"
                          }`}
                        >
                          {sel ? "✓ " : "+ "}
                          {sk}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customSkill}
                      onChange={(e) => setCustomSkill(e.target.value)}
                      onKeyDown={handleAddSkill}
                      placeholder="Add another skill (e.g. Docker, Figma) and press Enter"
                      className="flex-1 h-10 px-3.5 rounded-xl border border-line text-xs focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                    />
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="px-4 h-10 rounded-xl bg-ivory border border-line text-navy-900 font-semibold text-xs hover:bg-navy-50"
                    >
                      Add Skill
                    </button>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Job Overview & Role Description *
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the day-to-day responsibilities, project scope, team environment, and what makes this role exciting..."
                    className="w-full p-3.5 rounded-xl border border-line text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                  />
                </div>

                {/* REQUIREMENTS */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Key Candidate Requirements (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={requirementsInput}
                    onChange={(e) => setRequirementsInput(e.target.value)}
                    placeholder="List requirements, degrees, certifications or years of experience..."
                    className="w-full p-3.5 rounded-xl border border-line text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30 font-mono text-xs"
                  />
                </div>

                {/* DEADLINE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Application Deadline
                    </label>
                    <input
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-line text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Poster Signature
                    </label>
                    <div className="h-11 px-3.5 rounded-xl border border-line bg-ivory/50 flex items-center text-xs text-muted truncate">
                      Posted by {currentUser.name} (Class of {currentUser.batch || 2018})
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-13 rounded-xl bg-navy-950 text-gold-300 font-bold text-sm hover:bg-navy-900 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="h-4 w-4 text-gold-400" />
                  <span>Publish Opening Immediately to Opportunities Network</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
