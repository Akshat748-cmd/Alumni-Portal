"use client";

import React from "react";
import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Timeline, TimelineItem } from "@/components/motion/Timeline";
import { Reveal } from "@/components/motion/Reveal";
import { IMAGES } from "@/data/images";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  Building2,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Globe,
  Award,
} from "lucide-react";

const INSTITUTION_TIMELINE: TimelineItem[] = [
  {
    yearOrDate: "Foundational Phase",
    title: "Institutional Vision & Genesis",
    subtitle: "Establishment of Professional Academic Programs",
    description:
      "Initiated with a dedicated commitment to impart industry-aligned, ethically grounded multi-disciplinary education.",
    badge: "Inception",
  },
  {
    yearOrDate: "Academic Milestone",
    title: "First Graduating Cohorts",
    subtitle: "Commencement of Alumni Network",
    description:
      "Conferral of undergraduate and postgraduate qualifications, laying the foundation of our alumni community.",
    badge: "Milestone",
  },
  {
    yearOrDate: "Infrastructure",
    title: "Technology & Incubation Facilities",
    subtitle: "Applied Learning Infrastructure",
    description:
      "Expansion of specialized computing laboratories and collaborative project facilities supporting student development.",
    badge: "Expansion",
  },
  {
    yearOrDate: "Community Hub",
    title: "Regional Alumni Circles",
    subtitle: "Expanding Chapter Engagement",
    description:
      "Coordination of alumni networking forums across metropolitan centers and professional sectors.",
    badge: "Network",
  },
  {
    yearOrDate: "Digital Era",
    title: "Unified Alumni Portal Launch",
    subtitle: "Interactive Digital Platform",
    description:
      "Introduction of the centralized alumni directory, career hub, and mentorship portal.",
    badge: "Digital Gateway",
  },
];

export default function AboutAlumniNetworkPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <PageHero
        title="About the Alumni Network"
        subtitle="A collaborative community of graduates, innovators, and practitioners united by their educational journey at Poddar."
        eyebrow="Institutional Heritage"
        backgroundImage={IMAGES.hero.campusMain.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Who We Are", href: "/who-we-are" },
          { label: "About Alumni Network", href: "/who-we-are/about" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Heritage Narrative Block */}
        <Reveal className="mb-16">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 dark:border-slate-800">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="w-full lg:w-5/12 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 dark:border-slate-700 relative shrink-0">
                <img
                  src={IMAGES.campus[0].src}
                  alt="Poddar Campus"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                  <div className="font-bold text-amber-400">Poddar Group of Institutions</div>
                  <div>Main Campus • Mansarovar, Jaipur</div>
                </div>
              </div>

              <div className="w-full lg:w-7/12 space-y-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                <Badge variant="outline" className="text-amber-600 border-amber-500/40">
                  A Legacy of Academic Distinction
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100">
                  An Enduring Bond That Transcends Generations
                </h2>
                <p>
                  Founded under the visionary stewardship of the Poddar Trust, the Poddar Group of Institutions has emerged as one of northern India's premier multi-disciplinary higher educational institutions. From our initial courses in management and information sciences to cutting-edge research in artificial intelligence, biotechnology, and media communications, the hallmark of our institution has always been academic rigor grounded in human empathy.
                </p>
                <p>
                  Today, our alumni represent the crown jewel of our heritage. Serving as managing directors of venture investment funds, principal architects at Fortune 500 technology leaders, public health directors, and innovative startup founders, Poddarians actively give back to the classrooms that shaped them.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Global Impact Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: "Directory Sample", value: "260 Profiles", desc: "Sample prototype data" },
            { label: "Career Domains", value: "7 Verticals", desc: "Key industry sectors" },
            { label: "Mentorship Circle", value: "8 Mentors", desc: "Alumni advisors" },
            { label: "Verification", value: "Verified", desc: "Alumni registry" },
          ].map((m) => (
            <div
              key={m.label}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm"
            >
              <div className="text-xs text-slate-500 font-medium">{m.label}</div>
              <div className="text-2xl font-serif font-bold text-amber-600 dark:text-amber-400 mt-1">
                {m.value}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">{m.desc}</div>
            </div>
          ))}
        </div>

        {/* Historical Timeline */}
        <SectionHeader
          eyebrow="Milestones of Growth"
          title="Institutional Chronology"
          description="A historical journey tracing key milestones from foundation to present-day academic excellence."
          align="center"
        />

        <div className="mt-12 mb-16">
          <Timeline items={INSTITUTION_TIMELINE} />
        </div>
      </div>
    </div>
  );
}

