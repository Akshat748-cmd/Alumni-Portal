"use client";

import React from "react";
import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { IMAGES } from "@/data/images";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mic,
  Briefcase,
  UserCheck,
  GraduationCap,
  Building,
  Network,
  ArrowRight,
  HeartHandshake,
  Sparkles,
  Quote,
} from "lucide-react";

export default function GiveBackOverviewPage() {
  const tracks = [
    {
      title: "Guest Speaker",
      href: "/give-back/speaker",
      description: "Deliver keynote guest lectures, industry case-study workshops, and academic panels.",
      icon: Mic,
      impact: "Keynote Series",
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      title: "Offer Internships",
      href: "/give-back/internships",
      description: "Create paid summer internships and live industry projects for pre-final year scholars.",
      icon: Briefcase,
      impact: "Internship Track",
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Hire Poddar Students",
      href: "/give-back/hire",
      description: "Partner directly with the Training & Placement Cell for priority campus placements.",
      icon: UserCheck,
      impact: "Campus Hiring",
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    },
    {
      title: "Mentor Students",
      href: "/give-back/mentor",
      description: "Guide final-year students through technical capstones, portfolios, and interview prep.",
      icon: GraduationCap,
      impact: "Student Mentorship",
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
    {
      title: "Collaborate with Poddar",
      href: "/give-back/collaborate",
      description: "Serve on academic board of studies, advise curriculum revamps, and fund labs.",
      icon: Building,
      impact: "Institutional MoUs",
      color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    },
    {
      title: "Business Collaboration",
      href: "/give-back/business-networking",
      description: "Procure services from fellow alumni founders and support incubator startups.",
      icon: Network,
      impact: "Incubator Synergy",
      color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <PageHero
        title="Give Back to Poddar"
        subtitle="Empower the next generation of graduates through knowledge sharing, career opportunities, research partnerships, and institutional stewardship."
        eyebrow="Institutional Stewardship"
        backgroundImage={IMAGES.hero.campusMain.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Give Back", href: "/give-back" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Impact Metric Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[
            { label: "Guest Lectures", value: "140+ Keynotes", desc: "Industry practitioners on campus" },
            { label: "Internships Offered", value: "480+ Roles", desc: "Pre-final year training" },
            { label: "Career Placements", value: "1,250+ Hired", desc: "Alumni-led recruiting drives" },
            { label: "Corporate MoUs", value: "18 Alliances", desc: "Applied lab research" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm"
            >
              <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
              <div className="text-2xl font-serif font-bold text-amber-600 dark:text-amber-400 mt-1">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 mt-1">{stat.desc}</div>
            </div>
          ))}
        </div>

        {/* 6 Engagement Tracks Grid */}
        <SectionHeader
          eyebrow="Contribution Pathways"
          title="Choose How You Wish to Give Back"
          description="Every contribution — from a 60-minute guest webinar to hiring a summer intern — shapes student lives."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-16">
          {tracks.map((track, idx) => {
            const Icon = track.icon;
            return (
              <Reveal key={track.href} delay={idx * 0.05}>
                <Link href={track.href} className="block group h-full">
                  <Card className="h-full border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl ${track.color}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <Badge variant="outline" className="text-xs font-mono">
                          {track.impact}
                        </Badge>
                      </div>

                      <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors">
                        {track.title}
                      </h3>

                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {track.description}
                      </p>
                    </CardContent>

                    <div className="px-6 pb-6 pt-0 border-t border-slate-100 dark:border-slate-800 pt-4 flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-amber-600">
                      <span>Initiate Engagement</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Card>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* Testimonial Banner */}
        <Reveal>
          <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-navy-950 via-navy-900 to-slate-900 text-white p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 border-2 border-amber-500/50 shadow-lg">
                <img
                  src={IMAGES.portraits.p7}
                  alt="Aditya Narang"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Alumni Steward Spotlight
                </div>
                <blockquote className="text-sm sm:text-base italic text-slate-200 leading-relaxed">
                  "When we built Zenith AgriVentures, our first three engineering interns came from Poddar. Their work ethic and analytical rigor proved exceptional. Giving back through campus recruitment and mentoring is the highest return on investment any alumnus can make."
                </blockquote>
                <div className="mt-3 text-xs sm:text-sm font-semibold text-amber-400">
                  Aditya Narang (Class of 2012) — Founder & CEO, Zenith AgriVentures
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

