"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  User,
  GraduationCap,
  Briefcase,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Unlock,
  Plus,
  X,
  Upload,
} from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { AvatarInitials } from "@/components/common/AvatarInitials";
import { usePortalStore } from "@/store/portal";

const COMMON_SKILLS = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "SQL",
  "Tailwind CSS",
  "UI/UX Design",
  "Project Management",
  "Financial Analysis",
  "Digital Marketing",
];

export default function DashboardProfilePage() {
  const {
    currentUser,
    updateStudentProfile,
    login,
    blockedUserIds,
    unblockUser,
  } = usePortalStore();

  const isStudent = currentUser?.role === "student";

  const [name, setName] = useState(currentUser?.name || "");
  const [course, setCourse] = useState(currentUser?.course || "");
  const [yearOfStudy, setYearOfStudy] = useState(currentUser?.yearOfStudy || "3rd Year");
  const [company, setCompany] = useState(currentUser?.company || "");
  const [designation, setDesignation] = useState(currentUser?.designation || "");
  const [skills, setSkills] = useState<string[]>(currentUser?.skills || ["React", "TypeScript"]);
  const [newSkill, setNewSkill] = useState("");
  const [resumeName, setResumeName] = useState(
    currentUser?.resumeFileName || `${(currentUser?.name || "Candidate").replace(/\s+/g, "_")}_Resume_2026.pdf`
  );

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-ivory text-ink">
        <PageHero
          eyebrow="PROFILE SETTINGS"
          title="Sign In Required"
          subtitle="Please sign in to view and update your profile."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Dashboard", href: "/dashboard" },
            { label: "Profile" },
          ]}
        />
        <section className="py-16 text-center">
          <Link
            href="/join/auth"
            className="px-6 py-3 rounded-xl bg-navy-950 text-gold-300 font-bold text-sm inline-block"
          >
            Go to Sign In
          </Link>
        </section>
      </div>
    );
  }

  const handleToggleSkill = (sk: string) => {
    if (skills.includes(sk)) {
      setSkills(skills.filter((s) => s !== sk));
    } else {
      setSkills([...skills, sk]);
    }
  };

  const handleAddCustomSkill = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ("key" in e && e.key !== "Enter") return;
    e.preventDefault();
    const trimmed = newSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setNewSkill("");
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isStudent) {
      updateStudentProfile({
        name,
        course,
        yearOfStudy,
        skills,
        resumeFileName: resumeName,
      });
    } else {
      login({
        ...currentUser,
        name,
        course,
        company,
        designation,
        skills,
        resumeFileName: resumeName,
      });
    }
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <PageHero
        eyebrow="ACCOUNT SETTINGS • OPPORTUNITIES NETWORK"
        title="Profile & Skills Configuration"
        subtitle="Keep your technical credentials, academic background, and attached resume up to date for hiring alumni."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Dashboard", href: "/dashboard" },
          { label: "Profile" },
        ]}
      />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-8">
          <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-10 border border-line shadow-sm space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-line">
              <AvatarInitials name={name} size="lg" className="border-2 border-gold-400" />
              <div>
                <h2 className="text-xl font-serif font-bold text-navy-950">{currentUser.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isStudent
                        ? "bg-amber-100 text-amber-900 border border-amber-300"
                        : "bg-navy-950 text-gold-300"
                    }`}
                  >
                    {isStudent ? "Student Account" : "Alumnus Account"}
                  </span>
                  <span className="text-xs text-muted tabular-nums">{currentUser.email}</span>
                </div>
              </div>
            </div>

            {/* BASIC INFO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-line text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                  Academic Degree / Course
                </label>
                <input
                  type="text"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-line text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                />
              </div>
            </div>

            {isStudent ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Year of Study
                  </label>
                  <input
                    type="text"
                    value={yearOfStudy}
                    onChange={(e) => setYearOfStudy(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-line text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    College Enrollment Number
                  </label>
                  <input
                    type="text"
                    disabled
                    value={currentUser.enrollmentNumber || "POD-2023-CS042"}
                    className="w-full h-11 px-3.5 rounded-xl border border-line text-sm bg-ivory text-muted tabular-nums cursor-not-allowed"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Current Organization
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-line text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                    Designation / Title
                  </label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-line text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                  />
                </div>
              </div>
            )}

            {/* SKILLS */}
            <div>
              <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                Core Competencies & Skills
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {COMMON_SKILLS.map((sk) => {
                  const sel = skills.includes(sk);
                  return (
                    <button
                      key={sk}
                      type="button"
                      onClick={() => handleToggleSkill(sk)}
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
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={handleAddCustomSkill}
                  placeholder="Add custom skill..."
                  className="flex-1 h-10 px-3.5 rounded-xl border border-line text-xs focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                />
                <button
                  type="button"
                  onClick={handleAddCustomSkill}
                  className="px-4 h-10 rounded-xl bg-ivory border border-line text-navy-900 font-semibold text-xs hover:bg-navy-50"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {skills.map((sk) => (
                  <span
                    key={sk}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gold-400/20 text-navy-950 border border-gold-500/30 text-xs font-semibold"
                  >
                    <span>{sk}</span>
                    <button
                      type="button"
                      onClick={() => setSkills(skills.filter((s) => s !== sk))}
                      className="hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* RESUME ATTACHMENT */}
            <div>
              <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                Active Resume Document
              </label>
              <div className="p-3.5 rounded-xl bg-ivory border border-line flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gold-600" />
                  <span className="tabular-nums font-bold text-navy-950">{resumeName}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newName = prompt("Enter new mock resume file name:", resumeName);
                    if (newName) setResumeName(newName.trim());
                  }}
                  className="text-xs font-semibold text-navy-950 underline hover:text-gold-600"
                >
                  Change File
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-navy-950 text-gold-300 font-bold text-sm hover:bg-navy-900 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Save Profile Information</span>
            </button>
          </form>

          {/* BLOCKED USERS SECTION */}
          {blockedUserIds && blockedUserIds.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-line shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-navy-950 font-serif font-bold text-lg">
                <Lock className="h-5 w-5 text-red-600" />
                <span>Blocked Accounts ({blockedUserIds.length})</span>
              </div>
              <p className="text-xs text-muted">
                These users cannot send you messages or view your direct profile status.
              </p>

              <div className="space-y-2">
                {blockedUserIds.map((uid) => (
                  <div
                    key={uid}
                    className="p-3 rounded-xl bg-ivory border border-line flex items-center justify-between text-xs"
                  >
                    <span className="tabular-nums font-medium text-navy-950">User ID: {uid}</span>
                    <button
                      type="button"
                      onClick={() => {
                        unblockUser(uid);
                        toast.success(`User ${uid} unblocked.`);
                      }}
                      className="px-3 py-1 rounded-lg bg-navy-950 text-gold-300 font-semibold text-xs hover:bg-navy-900 flex items-center gap-1"
                    >
                      <Unlock className="h-3 w-3" />
                      <span>Unblock</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
