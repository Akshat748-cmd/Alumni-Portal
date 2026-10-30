"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { IMAGES } from "@/data/images";
import { getNotices, getNewsletters } from "@/lib/api";
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
  Bell,
  Building2,
  BookOpen,
  Award,
  ArrowRight,
  Calendar,
  Sparkles,
  Download,
  Share2,
} from "lucide-react";
import { toast } from "sonner";

export default function BulletinOverviewPage() {
  const [notices, setNotices] = useState<BulletinItem[]>([]);
  const [newsletters, setNewsletters] = useState(getNewsletters());
  const [selectedNotice, setSelectedNotice] = useState<BulletinItem | null>(null);

  useEffect(() => {
    setNotices(getNotices());
  }, []);

  const highPriorityNotices = notices.filter((n) => n.priority === "High");
  const latestNotices = notices.slice(0, 4);
  const latestNewsletter = newsletters[0];

  const handleShare = (notice: BulletinItem) => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      toast.success("Notice link copied to clipboard");
    }
  };

  const sections = [
    {
      title: "Announcements",
      href: "/bulletin/announcements",
      description: "Official notifications, governance directives, and general assembly updates.",
      icon: Bell,
      count: `${notices.filter((n) => n.category === "Announcement").length} Notices`,
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      title: "College Updates",
      href: "/bulletin/college-updates",
      description: "Academic progress, curriculum reviews, and facility expansions.",
      icon: Building2,
      count: `${notices.filter((n) => n.category === "College Update").length} Updates`,
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Newsletters",
      href: "/bulletin/newsletters",
      description: "Quarterly alumni newsletter editions, featured stories, and institutional digests.",
      icon: BookOpen,
      count: `${newsletters.length} Editions`,
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    },
    {
      title: "Important Opportunities",
      href: "/bulletin/opportunities",
      description: "Time-sensitive grants, awards nominations, and executive fellowship programs.",
      icon: Award,
      count: `${notices.filter((n) => n.category === "Opportunity").length} Active`,
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <PageHero
        title="Alumni Bulletin"
        subtitle="Stay abreast with official campus developments, academic triumphs, quarterly digests, and time-critical opportunities."
        eyebrow="Institutional Dispatches"
        backgroundImage={IMAGES.hero.campusMain.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Alumni Bulletin", href: "/bulletin" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Navigation Track Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {sections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <Reveal key={sec.href} delay={idx * 0.08}>
                <Link href={sec.href} className="block group h-full">
                  <Card className="h-full border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 rounded-xl ${sec.color}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <Badge variant="outline" className="text-xs font-medium">
                            {sec.count}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors">
                          {sec.title}
                        </h3>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                          {sec.description}
                        </p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors">
                        Browse Section
                        <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* Featured High-Priority Banner */}
        {highPriorityNotices.length > 0 && (
          <Reveal className="mb-16">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-navy-950 via-navy-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-amber-500/30">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-2.5 w-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-semibold tracking-wider uppercase text-amber-400">
                  High-Priority Notification
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold max-w-3xl leading-snug">
                {highPriorityNotices[0].title}
              </h2>
              <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-3xl line-clamp-2">
                {highPriorityNotices[0].excerpt}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button
                  onClick={() => setSelectedNotice(highPriorityNotices[0])}
                  className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold"
                >
                  Read Full Notice
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
                <div className="flex items-center text-xs text-slate-400 gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {highPriorityNotices[0].date}
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Latest Dispatches Grid */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <SectionHeader
              eyebrow="Recent Releases"
              title="Latest Dispatches & Memorandums"
              description="Chronological record of official publications, campus advisories, and milestone bulletins."
              align="left"
            />
            <Button asChild variant="outline">
              <Link href="/bulletin/announcements">
                View All Notices ({notices.length})
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestNotices.map((notice, idx) => (
              <Reveal key={notice.id} delay={idx * 0.05}>
                <Card
                  onClick={() => setSelectedNotice(notice)}
                  className="cursor-pointer border border-slate-200/80 dark:border-slate-800 hover:border-amber-500/50 hover:shadow-md transition-all h-full flex flex-col justify-between group bg-white dark:bg-slate-900"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3 text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className={
                            notice.category === "Announcement"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
                              : notice.category === "College Update"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                          }
                        >
                          {notice.category}
                        </Badge>
                        {notice.priority === "High" && (
                          <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {notice.date}
                      </span>
                    </div>

                    <h4 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {notice.title}
                    </h4>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                      {notice.excerpt}
                    </p>
                  </CardContent>
                  <div className="px-6 pb-6 pt-0 flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-slate-200 group-hover:text-amber-600">
                    <span>Read Memorandum</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Newsletter Highlight Banner */}
        {latestNewsletter && (
          <Reveal>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 flex flex-col lg:flex-row items-center gap-8 shadow-sm">
              <div className="w-full lg:w-1/3 aspect-[4/3] rounded-xl overflow-hidden relative shadow-md">
                <img
                  src={latestNewsletter.coverImage}
                  alt={latestNewsletter.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-navy-950/80 backdrop-blur-sm text-white px-3 py-1 rounded text-xs font-semibold">
                  {latestNewsletter.quarter}
                </div>
              </div>
              <div className="w-full lg:w-2/3">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-amber-600 border-amber-500/40">
                    Latest Newsletter
                  </Badge>
                  <span className="text-xs text-slate-500">{latestNewsletter.publishDate}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">
                  {latestNewsletter.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Theme: </span>
                  {latestNewsletter.theme}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Button
                    onClick={() => toast.success("Downloading Autumn 2026 Alumni Newsletter (Demo PDF)")}
                    className="bg-navy-900 hover:bg-navy-800 text-white font-semibold"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Edition (PDF)
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/bulletin/newsletters">Browse Past Issues</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </div>

      {/* Notice Detail Dialog */}
      <Dialog open={!!selectedNotice} onOpenChange={(open) => !open && setSelectedNotice(null)}>
        <DialogContent className="max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          {selectedNotice && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{selectedNotice.category}</Badge>
                  {selectedNotice.priority === "High" && (
                    <Badge variant="destructive" className="text-xs">
                      High Priority
                    </Badge>
                  )}
                  <span className="text-xs text-slate-500 ml-auto flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedNotice.date}
                  </span>
                </div>
                <DialogTitle className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-slate-100 text-left">
                  {selectedNotice.title}
                </DialogTitle>
                <DialogDescription className="text-left text-slate-600 dark:text-slate-400 font-medium pt-1">
                  {selectedNotice.excerpt}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 border-t border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-3">
                <p>{selectedNotice.content}</p>
                <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4 border border-slate-200 dark:border-slate-700 text-xs text-slate-500">
                  <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Official Verification
                  </p>
                  <p>
                    Issued by the Registrar & Secretariat, Poddar Group of Institutions. Document
                    Reference: PDR-NOT-{selectedNotice.id.toUpperCase()}.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <Button variant="ghost" size="sm" onClick={() => handleShare(selectedNotice)}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Notice
                </Button>
                <Button onClick={() => setSelectedNotice(null)}>Close</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

