"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Search,
  Users,
  Building,
  GraduationCap,
  Calendar,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Send,
  X,
  ExternalLink,
  PlusCircle,
  Video,
  FileCheck,
  Coffee,
} from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { AvatarInitials } from "@/components/common/AvatarInitials";
import { EmptyState } from "@/components/common/EmptyState";
import { usePortalStore } from "@/store/portal";
import { Mentor, DomainCategory } from "@/data/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const DOMAINS = [
  "All Domains",
  "IT & Technology",
  "Finance & Banking",
  "Business & Entrepreneurship",
  "Marketing & Advertising",
  "Healthcare",
  "Education",
  "Jewellery & Fashion",
];

const MODES = [
  { id: "Virtual 1-on-1 Call", label: "Virtual 1-on-1 Video Session", icon: Video },
  { id: "Resume & Portfolio Audit", label: "Resume & Portfolio Written Audit", icon: FileCheck },
  { id: "In-Person Coffee Meet", label: "In-Person Campus Coffee Meet", icon: Coffee },
];

export default function FindMentorPage() {
  const { mentors, currentUser, submitItem } = usePortalStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("All Domains");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Mentorship dialog state
  const [activeMentor, setActiveMentor] = useState<Mentor | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [goal, setGoal] = useState("Career Transition Strategy");
  const [preferredMode, setPreferredMode] = useState(MODES[0].id);
  const [message, setMessage] = useState("");
  const [dialogSuccess, setDialogSuccess] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);

  // Only approved mentors (seeded + approved signups) appear
  const approvedMentors = useMemo(() => {
    return mentors.filter((m) => m.status === "approved");
  }, [mentors]);

  // Aggregate all unique expertise tags across approved mentors
  const allTags = useMemo(() => {
    const set = new Set<string>();
    approvedMentors.forEach((m) => {
      m.topics?.forEach((t) => set.add(t));
    });
    return Array.from(set).slice(0, 12);
  }, [approvedMentors]);

  // Filtered mentors
  const filteredMentors = useMemo(() => {
    return approvedMentors.filter((m) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          m.name.toLowerCase().includes(q) ||
          m.company.toLowerCase().includes(q) ||
          m.designation.toLowerCase().includes(q) ||
          m.bio.toLowerCase().includes(q) ||
          m.topics?.some((t) => t.toLowerCase().includes(q));
        if (!matches) return false;
      }

      if (selectedDomain !== "All Domains" && m.domain !== selectedDomain) {
        return false;
      }

      if (selectedTag && !m.topics?.includes(selectedTag)) {
        return false;
      }

      return true;
    });
  }, [approvedMentors, searchQuery, selectedDomain, selectedTag]);

  const handleOpenRequest = (mentor: Mentor) => {
    setActiveMentor(mentor);
    setDialogSuccess(false);
    setMessage("");
    setDialogOpen(true);
  };

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeMentor) return;

    if (message.trim().length < 10) {
      toast.error("Please provide a short message explaining your guidance objectives.");
      return;
    }

    const payload = {
      mentorId: activeMentor.id,
      mentorName: activeMentor.name,
      mentorCompany: activeMentor.company,
      requesterName: currentUser?.name || "Verified Alumnus",
      requesterEmail: currentUser?.email || "alumni@poddar.mock",
      goal,
      preferredMode,
      message: message.trim(),
    };

    const id = submitItem("mentorship-request", payload);
    setRequestId(id);
    setDialogSuccess(true);
    toast.success(`Mentorship request sent to ${activeMentor.name}!`);
  };

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <PageHero
        eyebrow="ALUMNI ADVISORY & CLINICS"
        title="Find an Alumni Mentor"
        subtitle="1-on-1 guidance from directors, tech architects, founders, and finance partners. Learn the unwritten playbooks of your target industry."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Career Hub", href: "/career-hub" },
          { label: "Find a Mentor" },
        ]}
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* SEARCH, DOMAIN & BECOME MENTOR ACTION BAR */}
          <div className="bg-white rounded-3xl p-6 border border-line shadow-sm mb-8">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-4">
              {/* SEARCH BAR */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search mentors by name, company, leadership role, or skill..."
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

              {/* BECOME A MENTOR BUTTON */}
              <Link
                href="/career-hub/become-mentor"
                className="h-12 px-5 rounded-xl bg-navy-950 text-gold-300 font-bold text-sm hover:bg-navy-900 transition-colors shadow-md flex items-center justify-center gap-2 shrink-0"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Apply as a Mentor</span>
              </Link>
            </div>

            {/* DOMAIN FILTER SELECTOR */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {DOMAINS.map((dom) => {
                const isSelected = selectedDomain === dom;
                return (
                  <button
                    key={dom}
                    type="button"
                    onClick={() => {
                      setSelectedDomain(dom);
                      setSelectedTag(null);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? "bg-navy-950 text-gold-300 shadow-sm"
                        : "bg-ivory text-muted border border-line hover:border-gold-500/40 hover:text-navy-950"
                    }`}
                  >
                    {dom}
                  </button>
                );
              })}
            </div>

            {/* POPULAR EXPERTISE TAG CHIPS */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-line mt-3">
                <span className="text-[11px] font-bold text-navy-900 uppercase tracking-wider mr-1">
                  Popular Topics:
                </span>
                {allTags.map((tag) => {
                  const isSelected = selectedTag === tag;
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSelectedTag(isSelected ? null : tag)}
                      className={`px-2.5 py-1 rounded-lg text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-gold-500 text-navy-950 font-bold shadow-sm"
                          : "bg-ivory/80 text-muted hover:bg-gold-500/10 hover:text-navy-950"
                      }`}
                    >
                      #{tag}
                    </button>
                  );
                })}
                {selectedTag && (
                  <button
                    type="button"
                    onClick={() => setSelectedTag(null)}
                    className="text-xs text-red-600 underline ml-2 cursor-pointer"
                  >
                    Clear Tag
                  </button>
                )}
              </div>
            )}
          </div>

          {/* RESULTS COUNTER */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs sm:text-sm font-medium text-muted">
              Showing <strong className="text-navy-950 font-bold">{filteredMentors.length}</strong> active executive mentors
            </span>
          </div>

          {/* MENTOR CARDS GRID */}
          {filteredMentors.length === 0 ? (
            <EmptyState
              title="No Mentors Found"
              description="No mentors match your selected domain or search keywords. Clear tags or browse all active advisors."
              actionLabel="Reset Search & Filters"
              onAction={() => {
                setSearchQuery("");
                setSelectedDomain("All Domains");
                setSelectedTag(null);
              }}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredMentors.map((mentor) => (
                <div
                  key={mentor.id}
                  className="flex flex-col justify-between bg-white rounded-3xl p-6 sm:p-7 border border-line shadow-md hover:shadow-xl hover:border-gold-500/40 transition-all duration-300"
                >
                  <div>
                    {/* AVATAR + BASIC INFO */}
                    <div className="flex items-start gap-4 mb-4">
                      <AvatarInitials name={mentor.name} size="lg" className="ring-2 ring-gold-500/20 shrink-0" />
                      <div>
                        <h3 className="text-lg font-serif font-bold text-navy-950">
                          {mentor.name}
                        </h3>
                        <p className="text-xs font-semibold text-navy-900 leading-tight">
                          {mentor.designation}
                        </p>
                        <p className="text-xs text-muted flex items-center gap-1 mt-0.5">
                          <Building className="h-3 w-3 text-gold-600" />
                          <span>{mentor.company}</span>
                        </p>
                        <div className="text-[11px] text-gold-700 font-semibold mt-1">
                          Class of {mentor.batch} • {mentor.domain}
                        </div>
                      </div>
                    </div>

                    {/* BIO */}
                    <p className="text-xs text-muted leading-relaxed line-clamp-3 mb-4">
                      {mentor.bio}
                    </p>

                    {/* EXPERTISE TOPICS */}
                    <div className="space-y-1.5 mb-6">
                      <div className="text-[11px] font-bold text-navy-900 uppercase tracking-wider">
                        Focus Areas:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {mentor.topics?.map((topic, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-ivory text-navy-950 text-[11px] font-medium border border-line"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* FOOTER: SLOTS AVAILABLE & REQUEST ACTION */}
                  <div className="pt-4 border-t border-line">
                    <div className="flex items-center justify-between text-xs text-muted mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-gold-600" />
                        <span>Availability:</span>
                      </span>
                      <span className="font-bold text-emerald-700">
                        {mentor.slotsAvailable || 2} slots available this month
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenRequest(mentor)}
                      className="w-full py-3 rounded-xl bg-navy-950 text-gold-300 font-bold text-xs sm:text-sm hover:bg-navy-900 transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Request 1-on-1 Mentorship</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* REQUEST MENTORSHIP DIALOG */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg bg-white border-line p-6 sm:p-8 rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl font-bold text-navy-950">
              {dialogSuccess ? "Mentorship Request Transmitted" : `Connect with ${activeMentor?.name}`}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted">
              {dialogSuccess
                ? "Your request has been routed to the mentor and queued in portal records."
                : "Schedule a high-impact guidance session with your chosen alumnus mentor."}
            </DialogDescription>
          </DialogHeader>

          {dialogSuccess ? (
            <div className="py-6 text-center space-y-4">
              <div className="inline-flex p-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
              </div>
              <h4 className="text-lg font-bold text-navy-950">Invitation Successfully Sent!</h4>
              <p className="text-xs sm:text-sm text-muted max-w-sm mx-auto leading-relaxed">
                {activeMentor?.name} will review your request. Upon acceptance, you will receive a calendar invitation with meeting coordinates.
              </p>
              {requestId && (
                <div className="p-2.5 rounded-xl bg-ivory border border-line text-xs font-mono text-muted">
                  Reference: <span className="font-bold text-navy-950">{requestId}</span>
                </div>
              )}
              <button
                type="button"
                onClick={() => setDialogOpen(false)}
                className="w-full py-3 rounded-xl bg-navy-950 text-gold-300 font-bold text-sm cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSendRequest} className="space-y-4 py-2">
              {activeMentor && (
                <div className="p-3.5 rounded-2xl bg-ivory border border-line flex items-center gap-3">
                  <AvatarInitials name={activeMentor.name} size="md" />
                  <div>
                    <div className="text-sm font-bold text-navy-950">{activeMentor.name}</div>
                    <div className="text-xs text-muted">
                      {activeMentor.designation} at {activeMentor.company}
                    </div>
                  </div>
                </div>
              )}

              {/* GOAL / OBJECTIVE */}
              <div>
                <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                  Guidance Objective *
                </label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full h-12 px-3 rounded-xl border border-line bg-white text-sm text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                >
                  <option value="Career Transition Strategy">Career Transition Strategy</option>
                  <option value="Resume & Technical Portfolio Review">Resume & Technical Portfolio Review</option>
                  <option value="Mock Executive Interview Practice">Mock Executive Interview Practice</option>
                  <option value="Entrepreneurship & Startup Ideation">Entrepreneurship & Startup Ideation</option>
                  <option value="Higher Studies & Foreign Admissions">Higher Studies & Foreign Admissions</option>
                </select>
              </div>

              {/* PREFERRED MODE */}
              <div>
                <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                  Preferred Interaction Mode *
                </label>
                <div className="space-y-2">
                  {MODES.map((mode) => {
                    const Icon = mode.icon;
                    const isSelected = preferredMode === mode.id;
                    return (
                      <label
                        key={mode.id}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-navy-950 text-ivory border-gold-500 shadow-sm"
                            : "bg-white text-navy-900 border-line hover:border-gold-500/40"
                        }`}
                      >
                        <input
                          type="radio"
                          name="mentorshipMode"
                          value={mode.id}
                          checked={isSelected}
                          onChange={(e) => setPreferredMode(e.target.value)}
                          className="sr-only"
                        />
                        <Icon className={`h-4 w-4 ${isSelected ? "text-gold-400" : "text-muted"}`} />
                        <span className="text-xs font-medium">{mode.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                  Short Note / Context for Mentor *
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Introduce yourself, your current role, and the specific challenge you would like feedback on..."
                  className="w-full p-3 rounded-xl border border-line text-sm text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40 resize-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 text-navy-950 font-bold text-sm hover:brightness-105 transition-all shadow-md cursor-pointer"
                >
                  Send Mentorship Request
                </button>
                <button
                  type="button"
                  onClick={() => setDialogOpen(false)}
                  className="px-5 py-3.5 rounded-xl bg-ivory border border-line text-navy-900 font-semibold text-sm hover:bg-navy-50 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
