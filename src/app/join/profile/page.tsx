"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  User,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Save,
  ArrowRight,
  Briefcase,
  GraduationCap,
  MapPin,
  Globe,
  Tag,
  AlertCircle,
  LogIn,
} from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { EmptyState } from "@/components/common/EmptyState";
import { AvatarInitials } from "@/components/common/AvatarInitials";
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

const COURSES = [
  "BCA (Computer Applications)",
  "MCA (Master of Computer Applications)",
  "BBA (Business Administration)",
  "MBA (Finance & Strategy)",
  "MBA (Marketing & Analytics)",
  "B.Sc (Biotechnology)",
  "M.Sc (Biotechnology / IT)",
  "B.Com (Honours)",
  "Jewellery Design Diploma",
  "Other Degree / Diploma",
];

export default function ProfilePage() {
  const { currentUser, alumni, submitItem } = usePortalStore();

  // Find alumnus record matching current user if available, or populate defaults
  const userRecord = useMemo(() => {
    if (!currentUser) return null;
    return (
      alumni.find((a) => a.id === currentUser.id || a.email.toLowerCase() === currentUser.email.toLowerCase()) || {
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        batch: currentUser.batch || 2018,
        course: currentUser.course || "MBA (Finance & Strategy)",
        company: "Apex Capital Advisory",
        designation: "Managing Director",
        city: "Mumbai",
        country: "India",
        domain: "Finance & Banking" as DomainCategory,
        linkedInUrl: "https://linkedin.com/in/mock-profile",
        expertiseTags: ["Private Equity", "M&A Advisory", "Financial Modeling"],
        bio: "Managing partner focusing on mid-market growth investments and mentoring Poddar finance graduates.",
        status: "approved" as const,
      }
    );
  }, [currentUser, alumni]);

  // Form states initialized with user record
  const [name, setName] = useState(userRecord?.name || "");
  const [course, setCourse] = useState(userRecord?.course || COURSES[0]);
  const [batch, setBatch] = useState(userRecord?.batch ? String(userRecord.batch) : "2018");
  const [company, setCompany] = useState(userRecord?.company || "");
  const [designation, setDesignation] = useState(userRecord?.designation || "");
  const [city, setCity] = useState(userRecord?.city || "");
  const [domain, setDomain] = useState<DomainCategory>(userRecord?.domain || "Finance & Banking");
  const [linkedInUrl, setLinkedInUrl] = useState(userRecord?.linkedInUrl || "");
  const [bio, setBio] = useState(userRecord?.bio || "");
  const [tagsInput, setTagsInput] = useState(userRecord?.expertiseTags?.join(", ") || "");

  const [isEditing, setIsEditing] = useState(false);
  const [lastSubmissionTime, setLastSubmissionTime] = useState<string | null>(null);

  // Live completeness calculation (weights across essential fields)
  const completeness = useMemo(() => {
    const checks = [
      Boolean(name.trim().length >= 3),
      Boolean(course.trim()),
      Boolean(batch.trim()),
      Boolean(company.trim().length >= 2),
      Boolean(designation.trim().length >= 2),
      Boolean(city.trim().length >= 2),
      Boolean(domain.trim()),
      Boolean(linkedInUrl.trim().length >= 10),
      Boolean(bio.trim().length >= 15),
      Boolean(tagsInput.trim().length > 0),
    ];
    const filled = checks.filter(Boolean).length;
    return Math.round((filled / checks.length) * 100);
  }, [name, course, batch, company, designation, city, domain, linkedInUrl, bio, tagsInput]);

  // Calculate SVG circumference for completeness ring
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completeness / 100) * circumference;

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-ivory text-ink">
        <PageHero
          eyebrow="ALUMNI PROFILE PORTAL"
          title="Update My Profile"
          subtitle="Access your verified credentials, update your current organization, and manage directory privacy settings."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Join the Network", href: "/join" },
            { label: "Update My Profile" },
          ]}
        />
        <div className="container mx-auto px-4 py-16 max-w-2xl">
          <EmptyState
            title="Authentication Required"
            description="You must be signed in with your verified alumni credentials to view and update your public profile records."
            actionLabel="Sign In with Demo Credentials"
            onAction={() => {
              window.location.href = "/join/auth";
            }}
          />
        </div>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedTags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const changesSummary = {
      name,
      course,
      batch: Number(batch),
      company,
      designation,
      city,
      domain,
      linkedInUrl,
      bio,
      expertiseTags: parsedTags,
      completenessScore: completeness,
    };

    submitItem("profile-update", {
      userId: currentUser.id,
      name,
      email: currentUser.email,
      submittedBy: currentUser.email,
      changesSummary,
    });

    setLastSubmissionTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    setIsEditing(false);
    toast.success("Profile updates transmitted! Sent for alumni secretariat approval.");
  };

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <PageHero
        eyebrow="ACCOUNT CREDENTIALS • PROFILE"
        title="Manage Your Alumni Profile"
        subtitle="Keep your professional footprint accurate. Verified profiles receive priority placement in the Alumni Directory and talent search."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Join the Network", href: "/join" },
          { label: "Update My Profile" },
        ]}
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          {/* HEADER SUMMARY CARD WITH COMPLETENESS RING */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-line shadow-lg mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                <AvatarInitials name={name || currentUser.name} size="xl" className="ring-4 ring-gold-500/30" />
                <div>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy-950">
                      {name || currentUser.name}
                    </h2>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>Verified Alumnus</span>
                    </span>
                  </div>
                  <p className="text-sm font-medium text-navy-900">
                    {designation || "Professional"} at <span className="font-semibold">{company || "Enterprise"}</span>
                  </p>
                  <p className="text-xs text-muted mt-1">
                    Class of {batch} • {course} • {city || "India"}
                  </p>
                </div>
              </div>

              {/* LIVE PROFILE COMPLETENESS RING */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-ivory/80 border border-line shrink-0">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg className="w-20 h-20 -rotate-90" viewBox="0 0 90 90">
                    <circle
                      cx="45"
                      cy="45"
                      r={radius}
                      stroke="currentColor"
                      strokeWidth="6"
                      className="text-line"
                      fill="transparent"
                    />
                    <circle
                      cx="45"
                      cy="45"
                      r={radius}
                      stroke="currentColor"
                      strokeWidth="6"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      className="text-gold-500 transition-all duration-500"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-base font-bold font-serif text-navy-950">{completeness}%</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold text-navy-950 uppercase tracking-wider">
                    Profile Completeness
                  </div>
                  <div className="text-[11px] text-muted max-w-[140px] mt-0.5">
                    {completeness >= 90
                      ? "All star profile! Maximum directory visibility."
                      : "Add bio, LinkedIn & skills to reach 100%."}
                  </div>
                </div>
              </div>
            </div>

            {lastSubmissionTime && (
              <div className="mt-6 p-3.5 rounded-xl bg-gold-500/10 border border-gold-500/30 text-xs text-navy-950 flex items-center gap-2">
                <Clock className="h-4 w-4 text-gold-600 shrink-0" />
                <span>
                  Recent update submitted at <strong>{lastSubmissionTime}</strong> is currently pending Secretariat moderation.
                </span>
              </div>
            )}
          </div>

          {/* EDITABLE PROFILE FORM */}
          <div className="bg-white rounded-3xl border border-line shadow-xl p-6 sm:p-10">
            <div className="flex items-center justify-between border-b border-line pb-4 mb-6">
              <div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-navy-950">
                  Professional Identity & Directory Records
                </h3>
                <p className="text-xs text-muted mt-0.5">
                  Update your contact points and corporate coordinates.
                </p>
              </div>

              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 rounded-xl bg-navy-950 text-gold-300 font-semibold text-xs sm:text-sm hover:bg-navy-900 transition-colors cursor-pointer"
                >
                  Edit Profile
                </button>
              ) : (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  Editing Mode Active
                </span>
              )}
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* FULL NAME */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-line text-base text-navy-950 disabled:bg-ivory/60 disabled:text-muted focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                  />
                </div>

                {/* EMAIL ADDRESS */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Official Email (Immutable)
                  </label>
                  <input
                    type="email"
                    disabled
                    value={currentUser.email}
                    className="w-full h-12 px-4 rounded-xl border border-line bg-ivory/60 text-base text-muted cursor-not-allowed"
                  />
                </div>

                {/* COURSE */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Academic Course
                  </label>
                  <select
                    disabled={!isEditing}
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-line bg-white text-base text-navy-950 disabled:bg-ivory/60 disabled:text-muted focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                  >
                    {COURSES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* BATCH */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Graduation Batch
                  </label>
                  <input
                    type="number"
                    disabled={!isEditing}
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-line text-base text-navy-950 disabled:bg-ivory/60 disabled:text-muted focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                  />
                </div>

                {/* COMPANY */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Current Company / Organization
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Acme Corp"
                    className="w-full h-12 px-4 rounded-xl border border-line text-base text-navy-950 disabled:bg-ivory/60 disabled:text-muted focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                  />
                </div>

                {/* DESIGNATION */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Professional Designation
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="e.g. Managing Director"
                    className="w-full h-12 px-4 rounded-xl border border-line text-base text-navy-950 disabled:bg-ivory/60 disabled:text-muted focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                  />
                </div>

                {/* CITY */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    City / Location
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Mumbai, India"
                    className="w-full h-12 px-4 rounded-xl border border-line text-base text-navy-950 disabled:bg-ivory/60 disabled:text-muted focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                  />
                </div>

                {/* INDUSTRY DOMAIN */}
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Primary Industry Domain
                  </label>
                  <select
                    disabled={!isEditing}
                    value={domain}
                    onChange={(e) => setDomain(e.target.value as DomainCategory)}
                    className="w-full h-12 px-4 rounded-xl border border-line bg-white text-base text-navy-950 disabled:bg-ivory/60 disabled:text-muted focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                  >
                    {DOMAINS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* LINKEDIN URL */}
              <div>
                <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  disabled={!isEditing}
                  value={linkedInUrl}
                  onChange={(e) => setLinkedInUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/your-profile"
                  className="w-full h-12 px-4 rounded-xl border border-line text-base text-navy-950 disabled:bg-ivory/60 disabled:text-muted focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                />
              </div>

              {/* EXPERTISE TAGS */}
              <div>
                <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                  Expertise Tags (Comma-separated)
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="e.g. Cloud Architecture, FinTech, Mentorship, Valuation"
                  className="w-full h-12 px-4 rounded-xl border border-line text-base text-navy-950 disabled:bg-ivory/60 disabled:text-muted focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                />
              </div>

              {/* EXECUTIVE BIO */}
              <div>
                <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                  Professional Bio
                </label>
                <textarea
                  rows={4}
                  disabled={!isEditing}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Share a brief overview of your professional trajectory and areas where you can support fellow alumni..."
                  className="w-full p-4 rounded-xl border border-line text-base text-navy-950 disabled:bg-ivory/60 disabled:text-muted focus:outline-none focus:ring-2 focus:ring-gold-500/40 resize-none"
                />
              </div>

              {/* ACTIONS */}
              {isEditing && (
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-line">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 h-12 rounded-xl bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 text-navy-950 font-bold text-sm shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save & Send for Approval</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="w-full sm:w-auto px-6 h-12 rounded-xl bg-ivory border border-line text-navy-900 font-semibold text-sm hover:bg-navy-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <span className="text-xs text-muted sm:ml-auto">
                    Changes take effect publicly following secretariat verification.
                  </span>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
