"use client";

import React, { useState, useEffect } from "react";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { IMAGES } from "@/data/images";
import { getNotices } from "@/lib/api";
import { BulletinItem } from "@/data/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Building2,
  Calendar,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Cpu,
  HeartHandshake,
  CheckCircle,
} from "lucide-react";

export default function CollegeUpdatesPage() {
  const [updates, setUpdates] = useState<BulletinItem[]>([]);
  const [selectedUpdate, setSelectedUpdate] = useState<BulletinItem | null>(null);

  useEffect(() => {
    setUpdates(getNotices().filter((n) => n.category === "College Update"));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <PageHero
        title="College Updates & Milestones"
        subtitle="Tracking the relentless expansion, academic accreditations, and infrastructural breakthroughs of Poddar Group of Institutions."
        eyebrow="Campus Progress"
        backgroundImage={IMAGES.hero.campusMain.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Alumni Bulletin", href: "/bulletin" },
          { label: "College Updates", href: "/bulletin/college-updates" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Milestone Highlights Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Curriculum Review", value: "Industry Aligned", icon: Sparkles },
            { label: "Research Labs", value: "Applied Facilities", icon: Cpu },
            { label: "Faculty Mentors", value: "Dedicated Scholars", icon: GraduationCap },
            { label: "Community Drives", value: "Annual Programs", icon: HeartHandshake },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3.5"
              >
                <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-600 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                  <div className="text-base sm:text-lg font-bold font-serif text-slate-900 dark:text-slate-100">
                    {stat.value}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Updates Grid */}
        <SectionHeader
          eyebrow="Campus Developments"
          title="Milestones from the Alma Mater"
          description="Institutional progress, new academic divisions, and accreditation achievements."
          align="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {updates.map((update, idx) => (
            <Reveal key={update.id} delay={idx * 0.05}>
              <Card
                onClick={() => setSelectedUpdate(update)}
                className="cursor-pointer border border-slate-200/80 dark:border-slate-800 hover:border-amber-500/50 hover:shadow-lg transition-all h-full flex flex-col justify-between group bg-white dark:bg-slate-900 overflow-hidden"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <Badge variant="outline" className="text-xs bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-300">
                      College Milestone
                    </Badge>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {update.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors line-clamp-2">
                    {update.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                    {update.excerpt}
                  </p>
                </CardContent>

                <div className="px-6 pb-6 pt-0 flex items-center justify-between text-xs font-semibold text-amber-600">
                  <span>Explore Milestone Details</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedUpdate} onOpenChange={(open) => !open && setSelectedUpdate(null)}>
        <DialogContent className="max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          {selectedUpdate && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-emerald-700 dark:text-emerald-300 border-emerald-300">
                    Institutional Milestone
                  </Badge>
                  <span className="text-xs text-slate-500 ml-auto flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedUpdate.date}
                  </span>
                </div>
                <DialogTitle className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-slate-100 text-left">
                  {selectedUpdate.title}
                </DialogTitle>
                <DialogDescription className="text-left text-slate-600 dark:text-slate-400 font-medium pt-1">
                  {selectedUpdate.excerpt}
                </DialogDescription>
              </DialogHeader>

              <div className="py-4 border-t border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-4">
                <p>{selectedUpdate.content}</p>
                <div className="rounded-xl bg-amber-500/10 p-4 border border-amber-500/20 text-xs text-slate-700 dark:text-slate-300">
                  <div className="font-semibold text-slate-900 dark:text-slate-100 mb-1 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-amber-600" />
                    Alumni Collaboration Opportunity
                  </div>
                  Alumni practitioners interested in visiting this facility, co-authoring academic research, or delivering guest workshops are warmly encouraged to connect through the Alumni Secretariat.
                </div>
              </div>

              <div className="flex items-center justify-end pt-2">
                <Button onClick={() => setSelectedUpdate(null)}>Done</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

