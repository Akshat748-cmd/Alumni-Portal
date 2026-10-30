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
  Users,
  HeartHandshake,
  Trophy,
  Gift,
  TrendingUp,
  ArrowRight,
  Target,
  Sparkles,
} from "lucide-react";

export default function ObjectivesCharterPage() {
  const pillars = [
    {
      title: "1. Connect",
      headline: "Unite the Poddar Alumni Fraternity",
      description:
        "Cultivate an interconnected alumni ecosystem through an interactive verified directory, active regional chapters, batch jubilee homecomings, and affinity networking hubs.",
      icon: Users,
      action: "Explore Alumni Directory",
      href: "/directory/search",
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      title: "2. Support",
      headline: "Facilitate Career Mobility & Institutional Services",
      description:
        "Provide lifelong career mobility via executive job boards, 1-on-1 alumni mentorship clinics, fast-track transcript dispatch, and continuing professional education discounts.",
      icon: HeartHandshake,
      action: "Visit Career Hub",
      href: "/career-hub",
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "3. Celebrate",
      headline: "Spotlight Alumni Triumphs & Leadership",
      description:
        "Honor distinguished alumni who elevate institutional prestige through corporate appointments, national citations, research patents, and impactful startup ventures.",
      icon: Trophy,
      action: "View Alumni Spotlight",
      href: "/spotlight",
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
    {
      title: "4. Give Back",
      headline: "Enrich the Student Learning Journey",
      description:
        "Channel alumni experience back into campus classrooms via guest lectures, student internships, campus placements, capstone reviews, and startup incubation seed funds.",
      icon: Gift,
      action: "Contribute / Give Back",
      href: "/give-back",
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    },
    {
      title: "5. Grow",
      headline: "Elevate Institutional Stature",
      description:
        "Partner on industry collaborations, sponsored laboratories, curriculum revamps, and philanthropic development to secure Poddar's future.",
      icon: TrendingUp,
      action: "Collaborate with Poddar",
      href: "/give-back/collaborate",
      color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <PageHero
        title="Objectives & Association Charter"
        subtitle="Our institutional mandate: five strategic pillars guiding community engagement, student empowerment, and institutional advancement."
        eyebrow="Mission & Charter"
        backgroundImage={IMAGES.hero.networking.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Who We Are", href: "/who-we-are" },
          { label: "Objective", href: "/who-we-are/objective" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Mission Statement Hero */}
        <Reveal className="mb-16">
          <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-navy-950 via-navy-900 to-slate-900 text-white p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-wider text-amber-400 font-semibold">
                <Target className="w-3.5 h-3.5" />
                Charter Mission Statement
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold leading-snug">
                To build an enduring, symbiotic bridge uniting alumni, students, and faculty in the shared pursuit of ethical leadership, professional excellence, and institutional pride.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                Ratified by the Board of Trustees and the Alumni Association Council, our five-point charter translates high-minded educational ideals into concrete, measurable community programs.
              </p>
            </div>
          </div>
        </Reveal>

        {/* 5 Value Pillar Cards */}
        <SectionHeader
          eyebrow="The 5 Strategic Pillars"
          title="Connect • Support • Celebrate • Give Back • Grow"
          description="A structured blueprint ensuring tangible mutual benefit for every member of our community."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={idx * 0.06}>
                <Card className="h-full border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl ${pillar.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <Badge variant="outline" className="text-xs font-serif font-bold">
                        {pillar.title}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100 mb-2">
                      {pillar.headline}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {pillar.description}
                    </p>
                  </CardContent>

                  <div className="px-6 pb-6 pt-0 border-t border-slate-100 dark:border-slate-800 pt-4">
                    <Button asChild variant="ghost" size="sm" className="w-full justify-between text-amber-600 hover:text-amber-700 hover:bg-amber-500/10 px-2 font-semibold">
                      <Link href={pillar.href}>
                        <span>{pillar.action}</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}

