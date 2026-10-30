"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Award,
  Users,
  Check,
  Building,
  GraduationCap,
  Calendar,
  AlertCircle,
  ShieldCheck,
  Video,
  FileCheck,
  Coffee,
  HeartHandshake,
} from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { SuccessState } from "@/components/common/SuccessState";
import { usePortalStore } from "@/store/portal";
import { DomainCategory } from "@/data/types";

const DOMAINS: DomainCategory[] = [
  "IT & Technology",
  "Finance & Banking",
  "Business & Entrepreneurship",
  "Marketing & Advertising",
  "Education",
  "Healthcare",
  "Jewellery & Fashion",
];

const SUGGESTED_TOPICS = [
  "Career Transition",
  "Technical Architecture",
  "Resume Auditing",
  "Mock Interviews",
  "Startup Fundraising",
  "Product Strategy",
  "Private Equity & M&A",
  "Higher Studies Abroad",
  "Salary Negotiations",
  "Design Portfolio Review",
];

const MODES = [
  "Virtual 1-on-1 Video Session",
  "Resume & Portfolio Written Audit",
  "In-Person Campus Coffee Meet",
];

export default function BecomeMentorPage() {
  const { currentUser, submitItem } = usePortalStore();

  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [batch, setBatch] = useState(currentUser?.batch ? String(currentUser.batch) : "2016");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [domain, setDomain] = useState<DomainCategory>("IT & Technology");
  const [experienceYears, setExperienceYears] = useState("5-8 Years");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    "Career Transition",
    "Resume Auditing",
  ]);
  const [customTopic, setCustomTopic] = useState("");
  const [slotsPerMonth, setSlotsPerMonth] = useState("2");
  const [preferredModes, setPreferredModes] = useState<string[]>([MODES[0]]);
  const [bio, setBio] = useState("");
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [consent, setConsent] = useState(false);

  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  // Validation
  const isNameValid = name.trim().length >= 3;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isCompanyValid = company.trim().length >= 2;
  const isDesignationValid = designation.trim().length >= 2;
  const isBioValid = bio.trim().length >= 25;
  const isTopicsValid = selectedTopics.length >= 1;
  const isConsentValid = consent;

  const errors: string[] = [];
  if (!isNameValid) errors.push("Full name must be at least 3 characters");
  if (!isEmailValid) errors.push("Valid email address is required");
  if (!isCompanyValid) errors.push("Current organization is required");
  if (!isDesignationValid) errors.push("Current professional title is required");
  if (!isBioValid) errors.push("Bio must be at least 25 characters to guide mentees");
  if (!isTopicsValid) errors.push("Select at least 1 area of expertise");
  if (!isConsentValid) errors.push("You must agree to the Alumni Mentorship Code of Conduct");

  const toggleTopic = (t: string) => {
    if (selectedTopics.includes(t)) {
      if (selectedTopics.length > 1) {
        setSelectedTopics(selectedTopics.filter((x) => x !== t));
      } else {
        toast.error("Please keep at least one focus topic selected");
      }
    } else {
      setSelectedTopics([...selectedTopics, t]);
    }
  };

  const handleAddCustomTopic = () => {
    if (customTopic.trim() && !selectedTopics.includes(customTopic.trim())) {
      setSelectedTopics([...selectedTopics, customTopic.trim()]);
      setCustomTopic("");
    }
  };

  const toggleMode = (m: string) => {
    if (preferredModes.includes(m)) {
      if (preferredModes.length > 1) {
        setPreferredModes(preferredModes.filter((x) => x !== m));
      } else {
        toast.error("Select at least one preferred mode of interaction");
      }
    } else {
      setPreferredModes([...preferredModes, m]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (errors.length > 0) {
      toast.error("Please resolve highlighted requirements before submitting.");
      return;
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      batch: Number(batch),
      company: company.trim(),
      designation: designation.trim(),
      domain,
      experienceYears,
      topics: selectedTopics,
      slotsAvailable: Number(slotsPerMonth),
      preferredModes,
      bio: bio.trim(),
      linkedinUrl: linkedInUrl.trim() || "https://linkedin.com",
    };

    const id = submitItem("mentor-signup", payload);
    setSubmittedId(id);
    toast.success("Mentor enrollment submitted! Queued for Secretariat onboarding review.");
  };

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <PageHero
        eyebrow="GIVE BACK • KNOWLEDGE SHARING"
        title="Become an Alumni Mentor"
        subtitle="Empower the next generation of Poddar graduates. Share your hard-won industry insights, review resumes, and guide ambitious peers."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Career Hub", href: "/career-hub" },
          { label: "Become a Mentor" },
        ]}
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {submittedId ? (
            <SuccessState
              title="Mentor Application Received"
              message="Thank you for giving back to your alma mater! To protect mentee experience and coordinate meeting logistics, all mentor applications are verified by the Poddar Alumni Affairs Committee. You will receive an onboarding briefing within 48 hours."
              referenceId={submittedId}
              actionLabel="Browse Active Mentors"
              onAction={() => {
                window.location.href = "/career-hub/find-mentor";
              }}
              secondaryActionLabel="Return to Career Hub"
              onSecondaryAction={() => {
                window.location.href = "/career-hub";
              }}
            />
          ) : (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-line shadow-xl">
              <div className="border-b border-line pb-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-gold-700 uppercase tracking-wider mb-1">
                  <Award className="h-4 w-4" />
                  <span>Institutional Mentorship Guild</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy-950">
                  Mentor Registration & Availability
                </h2>
                <p className="text-xs sm:text-sm text-muted mt-1">
                  Set your own availability schedule and advisory areas. You can update or pause sessions anytime.
                </p>
              </div>

              {submitAttempted && errors.length > 0 && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs mb-6 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-sm">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span>Please correct the following:</span>
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
                  {/* FULL NAME */}
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Vikramaditya Rathore"
                      className="w-full h-12 px-4 rounded-xl border border-line text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                    />
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. vikram@apexcapital.mock"
                      className="w-full h-12 px-4 rounded-xl border border-line text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                    />
                  </div>

                  {/* BATCH */}
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Graduation Batch *
                    </label>
                    <input
                      type="number"
                      value={batch}
                      onChange={(e) => setBatch(e.target.value)}
                      placeholder="e.g. 2014"
                      className="w-full h-12 px-4 rounded-xl border border-line text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                    />
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

                  {/* COMPANY */}
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Current Organization *
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Apex Capital Advisory"
                      className="w-full h-12 px-4 rounded-xl border border-line text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                    />
                  </div>

                  {/* DESIGNATION */}
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Current Designation / Role *
                    </label>
                    <input
                      type="text"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      placeholder="e.g. Managing Director"
                      className="w-full h-12 px-4 rounded-xl border border-line text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                    />
                  </div>

                  {/* EXPERIENCE */}
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Total Professional Experience *
                    </label>
                    <select
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border border-line bg-white text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                    >
                      <option value="3-5 Years">3–5 Years</option>
                      <option value="5-8 Years">5–8 Years</option>
                      <option value="8-12 Years">8–12 Years</option>
                      <option value="12+ Years">12+ Years (Senior Executive)</option>
                    </select>
                  </div>

                  {/* SLOTS PER MONTH */}
                  <div>
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                      Target Availability (Slots / Month) *
                    </label>
                    <select
                      value={slotsPerMonth}
                      onChange={(e) => setSlotsPerMonth(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border border-line bg-white text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                    >
                      <option value="1">1 Session / month (approx. 45 min)</option>
                      <option value="2">2 Sessions / month (recommended)</option>
                      <option value="3">3 Sessions / month</option>
                      <option value="4">4 Sessions / month</option>
                    </select>
                  </div>
                </div>

                {/* EXPERTISE TOPICS CHIPS */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider">
                      Advisory Topics & Mentorship Areas * ({selectedTopics.length} selected)
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {SUGGESTED_TOPICS.map((topic) => {
                      const isSelected = selectedTopics.includes(topic);
                      return (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => toggleTopic(topic)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? "bg-navy-950 text-gold-300 border border-gold-500 shadow-sm"
                              : "bg-ivory text-muted border border-line hover:border-gold-500/40 hover:text-navy-950"
                          }`}
                        >
                          {isSelected && <Check className="h-3 w-3 text-gold-400" />}
                          <span>{topic}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* ADD CUSTOM TOPIC */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Or add a custom topic..."
                      value={customTopic}
                      onChange={(e) => setCustomTopic(e.target.value)}
                      className="flex-1 h-10 px-3 rounded-xl border border-line text-xs text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomTopic}
                      className="px-4 h-10 rounded-xl bg-ivory border border-line text-navy-900 font-semibold text-xs hover:bg-navy-50 cursor-pointer"
                    >
                      Add Topic
                    </button>
                  </div>
                </div>

                {/* PREFERRED MODES */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-2">
                    Preferred Interaction Modes *
                  </label>
                  <div className="space-y-2">
                    {MODES.map((mode) => {
                      const isChecked = preferredModes.includes(mode);
                      return (
                        <label
                          key={mode}
                          className="flex items-center gap-3 p-3 rounded-xl border border-line bg-ivory/50 cursor-pointer hover:bg-ivory transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleMode(mode)}
                            className="h-4 w-4 rounded border-line text-navy-950 focus:ring-gold-500"
                          />
                          <span className="text-xs font-medium text-navy-950">{mode}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* MENTOR BIO */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Mentor Biography & Mentorship Approach *
                  </label>
                  <textarea
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell prospective mentees about your career trajectory, major milestones, and what kind of challenges you are best positioned to advise on..."
                    className="w-full p-4 rounded-xl border border-line text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40 resize-none"
                  />
                </div>

                {/* LINKEDIN URL */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    value={linkedInUrl}
                    onChange={(e) => setLinkedInUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/your-profile"
                    className="w-full h-12 px-4 rounded-xl border border-line text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                  />
                </div>

                {/* CONSENT CHECKBOX */}
                <div className="p-4 rounded-2xl bg-ivory/80 border border-line">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="h-5 w-5 mt-0.5 rounded border-line text-navy-950 focus:ring-gold-500"
                    />
                    <span className="text-xs text-navy-900 leading-relaxed">
                      I agree to the Poddar Alumni Mentorship Charter: to conduct myself ethically, provide constructive professional guidance, respect mentee confidentiality, and communicate via designated channels.
                    </span>
                  </label>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  className="w-full h-12 sm:h-14 rounded-xl bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 text-navy-950 font-bold text-sm sm:text-base shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <HeartHandshake className="h-5 w-5" />
                  <span>Submit Mentor Application</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
