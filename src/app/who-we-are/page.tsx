"use client";

import React from "react";
import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { IMAGES } from "@/data/images";
import { ALUMNI_OFFICE } from "@/data/office";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  Target,
  Building2,
  ArrowRight,
  GraduationCap,
  Users,
  Globe,
  Award,
  Sparkles,
} from "lucide-react";

export default function WhoWeAreOverviewPage() {
  const sections = [
    {
      title: "About Alumni Network",
      href: "/who-we-are/about",
      description: "Historical heritage, foundational values, and the growth of Poddar with enduring educational distinction.",
      icon: ShieldCheck,
      badge: "Foundational Heritage",
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      title: "Strategic Objectives",
      href: "/who-we-are/objective",
      description: "Our core charter: Connect, Support, Celebrate, Give Back, and Grow the Poddar alumni community.",
      icon: Target,
      badge: "Charter & Vision",
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Alumni Office & Secretariat",
      href: "/who-we-are/office",
      description: "Leadership team, operational secretariat coordinates, visiting hours, and administrative helpdesk contact details.",
      icon: Building2,
      badge: "Campus Secretariat",
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <PageHero
        title="Who We Are"
        subtitle="Connecting alumni, safeguarding institutional values, and fostering lifelong professional relationships."
        eyebrow="Governance & Heritage"
        backgroundImage={IMAGES.hero.campusMain.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Who We Are", href: "/who-we-are" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Leadership Vision Hero */}
        <Reveal className="mb-16">
          <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-navy-950 via-navy-900 to-slate-900 text-white p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-navy-950 font-serif font-bold text-3xl sm:text-4xl flex items-center justify-center shrink-0 shadow-xl border border-amber-300">
                P
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-wider text-amber-400 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  Office of Alumni Relations & Institutional Advancement
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold">
                  "Once a Poddarian, Forever a Pillar of Our Alma Mater"
                </h2>
                <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                  The Poddar Alumni Association operates as the sovereign institutional conduit linking current students, distinguished faculty emeriti, and our alumni community. We exist to preserve our shared traditions, champion alumni triumphs, and cultivate reciprocal advancement.
                </p>
                <div className="mt-4 text-xs sm:text-sm font-semibold text-amber-400">
                  {ALUMNI_OFFICE.leadership.director} • {ALUMNI_OFFICE.leadership.designation}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 3 Core Tracks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {sections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <Reveal key={sec.href} delay={idx * 0.08}>
                <Link href={sec.href} className="block group h-full">
                  <Card className="h-full border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl ${sec.color}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {sec.badge}
                        </Badge>
                      </div>

                      <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors">
                        {sec.title}
                      </h3>

                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {sec.description}
                      </p>
                    </CardContent>

                    <div className="px-6 pb-6 pt-0 border-t border-slate-100 dark:border-slate-800 pt-4 flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-amber-600">
                      <span>Explore Section</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Card>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* Institutional Pillars */}
        <SectionHeader
          eyebrow="Foundational Ethos"
          title="The Four Pillars of the Alumni Association"
          description="Guiding the initiatives, programs, and community charter of Poddar Group of Institutions."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {[
            {
              title: "Institutional Heritage",
              desc: "Preserving our rich pedagogical distinction, academic rigour, and cultural legacy.",
              icon: ShieldCheck,
            },
            {
              title: "Alumni Connectivity",
              desc: "Maintaining active professional ties across regional and institutional chapters.",
              icon: Globe,
            },
            {
              title: "Student Mentorship",
              desc: "Guiding undergraduates through capstone design, technical portfolios, and corporate immersion.",
              icon: GraduationCap,
            },
            {
              title: "Philanthropy & Grants",
              desc: "Channeling seed funds, research grants, and merit scholarships for deserving scholars.",
              icon: Award,
            },
          ].map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={i * 0.05}>
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}

