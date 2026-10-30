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
} from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { SuccessState } from "@/components/common/SuccessState";
import { usePortalStore } from "@/store/portal";
import { DomainCategory } from "@/data/types";

const JOB_TYPES = ["Full-Time", "Internship", "Remote", "Contract"] as const;

const DOMAINS: DomainCategory[] = [
  "IT & Technology",
  "Finance & Banking",
  "Business & Entrepreneurship",
  "Marketing & Advertising",
  "Education",
  "Healthcare",
  "Jewellery & Fashion",
];

export default function PostOpportunityPage() {
  const { currentUser, submitItem } = usePortalStore();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState<(typeof JOB_TYPES)[number]>("Full-Time");
  const [location, setLocation] = useState("Jaipur (Hybrid)");
  const [domain, setDomain] = useState<DomainCategory>("IT & Technology");
  const [experience, setExperience] = useState("1-3 Years");
  const [description, setDescription] = useState("");
  const [requirementsInput, setRequirementsInput] = useState("");
  const [applicationLink, setApplicationLink] = useState("");
  const [deadline, setDeadline] = useState("2026-12-31");

  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  // Validations
  const isTitleValid = title.trim().length >= 4;
  const isCompanyValid = company.trim().length >= 2;
  const isDescValid = description.trim().length >= 20;
  const isLinkValid =
    applicationLink.trim().includes("@") ||
    /^https?:\/\/.+/i.test(applicationLink.trim());

  const errors: string[] = [];
  if (!isTitleValid) errors.push("Job title must be at least 4 characters");
  if (!isCompanyValid) errors.push("Organization/company name is required");
  if (!isDescValid) errors.push("Job description must be at least 20 characters");
  if (!isLinkValid) errors.push("Valid application link (http://...) or HR email address is required");

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
      location: location.trim(),
      domain,
      experience,
      description: description.trim(),
      requirements: requirements.length > 0 ? requirements : ["Relevant degree from Poddar Group of Institutions"],
      applicationLinkOrEmail: applicationLink.trim(),
      deadline,
      postedByAlumniName: currentUser?.name || "Verified Alumnus",
      postedByBatch: currentUser?.batch || 2018,
    };

    const id = submitItem("opportunity", payload);
    setSubmittedId(id);
    toast.success("Opportunity submitted for Secretariat review!");
  };

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <PageHero
        eyebrow="RECRUITMENT & HIRING • TALENT"
        title="Post a Career Opportunity"
        subtitle="Empower fellow Poddar graduates and students with executive openings, entry-level opportunities, and referral slots at your organization."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Career Hub", href: "/career-hub" },
          { label: "Post an Opportunity" },
        ]}
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {submittedId ? (
            <SuccessState
              title="Opportunity Submitted for Moderation"
              message="Your job posting has been successfully registered. To maintain strict quality standards and verify employment authenticity, all opportunities are approved by the Alumni Secretariat within 24 hours before appearing in the public Jobs & Internships directory."
              referenceId={submittedId}
              actionLabel="View Jobs Directory"
              onAction={() => {
                window.location.href = "/career-hub/jobs";
              }}
              secondaryActionLabel="Post Another Opening"
              onSecondaryAction={() => {
                setSubmittedId(null);
                setSubmitAttempted(false);
                setTitle("");
                setDescription("");
                setRequirementsInput("");
              }}
            />
          ) : (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-line shadow-xl">
              <div className="border-b border-line pb-4 mb-6">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy-950">
                  Opportunity Listing Form
                </h2>
                <p className="text-xs sm:text-sm text-muted mt-1">
                  Positions are tagged with your alumni credentials to enable direct candidate referral requests.
                </p>
              </div>

              {submitAttempted && errors.length > 0 && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs mb-6 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-sm">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span>Please review mandatory fields:</span>
                  </div>
                  <ul className="list-disc pl-5">
                    {errors.map((e, idx) => (
                      <li key={idx}>{e}</li>
                    ))}
                  </ul>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* TITLE */}
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Role / Position Title *
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Associate Product Manager"
                      className="w-full h-12 px-4 rounded-xl border border-line text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                    />
                  </div>

                  {/* COMPANY */}
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Hiring Company / Organization *
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. NovaCrest Systems"
                      className="w-full h-12 px-4 rounded-xl border border-line text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                    />
                  </div>

                  {/* TYPE */}
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Employment Type *
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as any)}
                      className="w-full h-12 px-4 rounded-xl border border-line bg-white text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                    >
                      {JOB_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* DOMAIN */}
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Industry Sector / Domain *
                    </label>
                    <select
                      value={domain}
                      onChange={(e) => setDomain(e.target.value as DomainCategory)}
                      className="w-full h-12 px-4 rounded-xl border border-line bg-white text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                    >
                      {DOMAINS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* LOCATION */}
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Workplace Location *
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Jaipur / Hybrid / Remote"
                      className="w-full h-12 px-4 rounded-xl border border-line text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                    />
                  </div>

                  {/* EXPERIENCE LEVEL */}
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Required Experience
                    </label>
                    <input
                      type="text"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      placeholder="e.g. 1-3 Years / Fresher"
                      className="w-full h-12 px-4 rounded-xl border border-line text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                    />
                  </div>

                  {/* APPLICATION LINK OR EMAIL */}
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Application URL or HR Email *
                    </label>
                    <input
                      type="text"
                      value={applicationLink}
                      onChange={(e) => setApplicationLink(e.target.value)}
                      placeholder="careers@company.com or https://company.com/jobs"
                      className="w-full h-12 px-4 rounded-xl border border-line text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                    />
                  </div>

                  {/* DEADLINE */}
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Application Deadline
                    </label>
                    <input
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border border-line text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                    />
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Job Description & Core Responsibilities *
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide details about daily responsibilities, team dynamics, and technological stack..."
                    className="w-full p-4 rounded-xl border border-line text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40 resize-none"
                  />
                </div>

                {/* REQUIREMENTS */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Key Qualifications (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={requirementsInput}
                    onChange={(e) => setRequirementsInput(e.target.value)}
                    placeholder="BCA / MCA or BBA graduate&#10;Hands-on knowledge of React and SQL&#10;Good verbal and written communication"
                    className="w-full p-4 rounded-xl border border-line text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40 resize-none font-sans"
                  />
                </div>

                {/* POSTER IDENTIFICATION NOTE */}
                <div className="p-4 rounded-2xl bg-ivory border border-line text-xs text-muted">
                  Listing will be published under sponsor identity:{" "}
                  <strong className="text-navy-950">{currentUser?.name || "Verified Alumnus"}</strong>{" "}
                  (Class of {currentUser?.batch || 2018}).
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  className="w-full h-12 sm:h-14 rounded-xl bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 text-navy-950 font-bold text-sm sm:text-base shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PlusCircle className="h-5 w-5" />
                  <span>Submit Opportunity for Verification</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
