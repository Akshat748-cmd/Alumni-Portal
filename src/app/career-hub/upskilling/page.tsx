"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  GraduationCap,
  Clock,
  Sparkles,
  BookOpen,
  Building,
  Award,
  CheckCircle2,
  ExternalLink,
  Tag,
} from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { INITIAL_LEARNING_PROGRAMS } from "@/data/career";
import { LearningProgram, DomainCategory } from "@/data/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const CATEGORIES = [
  "All Programs",
  "IT & Technology",
  "Finance & Banking",
  "Business & Entrepreneurship",
  "Marketing & Advertising",
  "Jewellery & Fashion",
  "Healthcare",
];

export default function UpskillingPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Programs");
  const [activeProgram, setActiveProgram] = useState<LearningProgram | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [interestSubmitted, setInterestSubmitted] = useState<Record<string, boolean>>({});

  const filteredPrograms = useMemo(() => {
    if (selectedCategory === "All Programs") return INITIAL_LEARNING_PROGRAMS;
    return INITIAL_LEARNING_PROGRAMS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleExpressInterest = (program: LearningProgram) => {
    setInterestSubmitted((prev) => ({ ...prev, [program.id]: true }));
    toast.success(`Interest recorded for ${program.title}! Alumni discount voucher issued.`);
    setDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <PageHero
        eyebrow="EXECUTIVE SKILLS & ACCREDITATIONS"
        title="Learning & Upskilling"
        subtitle="Stay ahead of industry disruption. Access exclusive fee waivers, cohort masterclasses, and executive certifications engineered for Poddar alumni."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Career Hub", href: "/career-hub" },
          { label: "Learning & Upskilling" },
        ]}
      />

      {/* CATEGORY TABS */}
      <section className="py-8 bg-white border-b border-line sticky top-16 z-20 backdrop-blur-md bg-white/95">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-navy-950 text-gold-300 shadow-md"
                      : "bg-ivory text-muted border border-line hover:border-gold-500/40 hover:text-navy-950"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROGRAMS GRID */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader
            eyebrow="EXECUTIVE CURRICULUM"
            title="Accredited Professional Programs"
            subtitle="Curated in collaboration with Poddar institutes and leading industry partners with dedicated alumni benefits."
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10">
            {filteredPrograms.map((program) => {
              const hasExpressed = interestSubmitted[program.id];

              return (
                <div
                  key={program.id}
                  className="flex flex-col justify-between bg-white rounded-3xl p-6 sm:p-7 border border-line shadow-md hover:shadow-xl hover:border-gold-500/40 transition-all duration-300"
                >
                  <div>
                    {/* FORMAT BADGE & CATEGORY */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-navy-950 text-gold-300">
                        {program.format}
                      </span>
                      <span className="text-[11px] text-muted font-medium">{program.category}</span>
                    </div>

                    {/* TITLE */}
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-navy-950 mb-2 leading-snug line-clamp-2">
                      {program.title}
                    </h3>

                    {/* PROVIDER */}
                    <div className="text-xs text-navy-900 font-semibold mb-4 flex items-center gap-1.5">
                      <Building className="h-3.5 w-3.5 text-gold-600 shrink-0" />
                      <span className="line-clamp-1">{program.provider}</span>
                    </div>

                    {/* DURATION */}
                    <div className="flex items-center gap-1.5 text-xs text-muted mb-4">
                      <Clock className="h-3.5 w-3.5 text-muted" />
                      <span>{program.duration}</span>
                    </div>

                    {/* DESCRIPTION */}
                    <p className="text-xs text-muted leading-relaxed line-clamp-3 mb-6">
                      {program.description}
                    </p>
                  </div>

                  <div>
                    {/* ALUMNI OFFER BADGE */}
                    <div className="p-3.5 rounded-2xl bg-gold-500/10 border border-gold-500/30 mb-4">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gold-700 mb-1">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Exclusive Alumni Privilege</span>
                      </div>
                      <p className="text-[11px] text-navy-950 font-medium leading-relaxed">
                        {program.alumniPerk}
                      </p>
                    </div>

                    {/* ACTION BUTTON */}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveProgram(program);
                        setDialogOpen(true);
                      }}
                      className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer ${
                        hasExpressed
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                          : "bg-navy-950 text-gold-300 hover:bg-navy-900"
                      }`}
                    >
                      {hasExpressed ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          <span>Interest Logged</span>
                        </>
                      ) : (
                        <>
                          <Award className="h-4 w-4" />
                          <span>Express Interest & Claim Offer</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EXPRESS INTEREST DIALOG */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg bg-white border-line p-6 sm:p-8 rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl font-bold text-navy-950">
              Claim Alumni Course Privilege
            </DialogTitle>
            <DialogDescription className="text-xs text-muted">
              Receive syllabus, schedule coordinates, and your official tuition reduction coupon.
            </DialogDescription>
          </DialogHeader>

          {activeProgram && (
            <div className="space-y-4 py-2">
              <div className="p-4 rounded-2xl bg-ivory border border-line">
                <div className="text-xs font-bold uppercase tracking-wider text-gold-700 mb-1">
                  {activeProgram.category} • {activeProgram.format}
                </div>
                <h4 className="text-base font-bold text-navy-950 mb-1">{activeProgram.title}</h4>
                <div className="text-xs text-muted">{activeProgram.provider}</div>
                <div className="text-xs text-muted mt-1">Duration: {activeProgram.duration}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-gold-500/10 border border-gold-500/30 text-xs text-navy-950 space-y-1">
                <div className="font-bold text-gold-700 flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Applied Alumni Benefit:</span>
                </div>
                <p className="font-medium">{activeProgram.alumniPerk}</p>
              </div>

              <p className="text-xs text-muted leading-relaxed">
                By expressing interest, your verified profile will be shared with the Poddar Executive Education Secretariat to unlock your enrollment seat and syllabus package.
              </p>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => handleExpressInterest(activeProgram)}
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 text-navy-950 font-bold text-sm hover:brightness-105 transition-all shadow-md cursor-pointer"
                >
                  Confirm & Receive Syllabus
                </button>
                <button
                  type="button"
                  onClick={() => setDialogOpen(false)}
                  className="px-5 py-3.5 rounded-xl bg-ivory border border-line text-navy-900 font-semibold text-sm hover:bg-navy-50 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
