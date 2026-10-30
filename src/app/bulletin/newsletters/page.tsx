"use client";

import React, { useState } from "react";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { IMAGES } from "@/data/images";
import { getNewsletters } from "@/lib/api";
import { NewsletterIssue } from "@/data/types";
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
  BookOpen,
  Download,
  Calendar,
  Sparkles,
  ArrowRight,
  Eye,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

export default function NewslettersPage() {
  const issues = getNewsletters();
  const latestIssue = issues[0];
  const archiveIssues = issues.slice(1);
  const [selectedIssue, setSelectedIssue] = useState<NewsletterIssue | null>(null);

  const handleDownload = (issue: NewsletterIssue) => {
    toast.success(`Downloading ${issue.title} (PDF Document)`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <PageHero
        title="Poddar Alumni Newsletter"
        subtitle="Quarterly digest chronicling alumni triumphs, faculty research breakthroughs, regional chapter gatherings, and campus memories."
        eyebrow="Archival Publications"
        backgroundImage={IMAGES.hero.campusMain.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Alumni Bulletin", href: "/bulletin" },
          { label: "Newsletters", href: "/bulletin/newsletters" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Latest Issue Hero Banner */}
        {latestIssue && (
          <Reveal className="mb-16">
            <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-navy-950 via-navy-900 to-slate-900 text-white p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <div className="w-full lg:w-5/12 aspect-[4/3] rounded-2xl overflow-hidden relative shadow-2xl border border-white/10 group">
                  <img
                    src={latestIssue.coverImage}
                    alt={latestIssue.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                    <span className="bg-amber-500 text-navy-950 font-bold px-3 py-1 rounded-full">
                      {latestIssue.quarter} Edition
                    </span>
                    <span className="text-white/80 font-mono">{latestIssue.volume}</span>
                  </div>
                </div>

                <div className="w-full lg:w-7/12">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      <Sparkles className="w-3.5 h-3.5" />
                      Current Flagship Release
                    </span>
                    <span className="text-xs text-slate-400">{latestIssue.publishDate}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold leading-tight">
                    {latestIssue.title}
                  </h2>

                  <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-1">
                      Cover Theme & Key Feature
                    </div>
                    <p className="text-sm sm:text-base text-slate-200">{latestIssue.theme}</p>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Button
                      onClick={() => handleDownload(latestIssue)}
                      className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold h-11 px-6"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Edition (PDF)
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedIssue(latestIssue)}
                      className="border-white/20 text-white hover:bg-white/10 h-11 px-5"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Read Executive Summary
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Archival Issues */}
        <SectionHeader
          eyebrow="Archival Repository"
          title="Past Newsletter Editions"
          subtitle="Browse and retrieve previous quarterly digests and retrospective commemorative editions."
          align="left"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {archiveIssues.map((issue, idx) => (
            <Reveal key={issue.id} delay={idx * 0.05}>
              <Card className="border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-lg transition-all h-full flex flex-col justify-between group overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={issue.coverImage}
                    alt={issue.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-navy-950/80 backdrop-blur-sm text-white px-2.5 py-1 rounded text-xs font-semibold">
                    {issue.quarter}
                  </div>
                  <div className="absolute top-3 right-3 bg-slate-900/70 backdrop-blur-sm text-slate-200 px-2 py-0.5 rounded text-[11px] font-mono">
                    {issue.volume}
                  </div>
                </div>

                <CardContent className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-slate-500 mb-1.5 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {issue.publishDate}
                    </div>
                    <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors">
                      {issue.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">Focus: </span>
                      {issue.theme}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedIssue(issue)}
                      className="text-xs text-slate-700 dark:text-slate-300 hover:text-amber-600 px-0 hover:bg-transparent"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" />
                      Summary
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownload(issue)}
                      className="text-xs h-8"
                    >
                      <Download className="w-3.5 h-3.5 mr-1" />
                      PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Issue Summary Dialog */}
      <Dialog open={!!selectedIssue} onOpenChange={(open) => !open && setSelectedIssue(null)}>
        <DialogContent className="max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          {selectedIssue && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{selectedIssue.quarter}</Badge>
                  <span className="text-xs text-slate-500 ml-auto font-mono">
                    {selectedIssue.volume} • {selectedIssue.issue}
                  </span>
                </div>
                <DialogTitle className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100 text-left">
                  {selectedIssue.title}
                </DialogTitle>
                <DialogDescription className="text-left text-slate-600 dark:text-slate-400 font-medium">
                  Published: {selectedIssue.publishDate}
                </DialogDescription>
              </DialogHeader>

              <div className="py-4 border-t border-b border-slate-100 dark:border-slate-800 space-y-4">
                <div className="aspect-[16/9] rounded-xl overflow-hidden relative">
                  <img
                    src={selectedIssue.coverImage}
                    alt={selectedIssue.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-amber-600 font-bold mb-1">
                    Editorial Theme
                  </h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {selectedIssue.theme}
                  </p>
                </div>
                <div className="text-xs text-slate-500 leading-relaxed">
                  Includes in-depth alumni interviews, campus placement retrospectives, faculty publications, and upcoming reunion calendars.
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button variant="ghost" onClick={() => setSelectedIssue(null)}>
                  Close
                </Button>
                <Button onClick={() => handleDownload(selectedIssue)} className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold">
                  <Download className="w-4 h-4 mr-2" />
                  Download Complete Issue
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

