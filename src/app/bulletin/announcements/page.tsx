"use client";

import React, { useState, useEffect } from "react";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { EmptyState } from "@/components/common/EmptyState";
import { Reveal } from "@/components/motion/Reveal";
import { IMAGES } from "@/data/images";
import { getNotices } from "@/lib/api";
import { BulletinItem } from "@/data/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Search,
  Bell,
  Calendar,
  Share2,
  ArrowRight,
  Pin,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

export default function AnnouncementsPage() {
  const [notices, setNotices] = useState<BulletinItem[]>([]);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("All");
  const [selectedNotice, setSelectedNotice] = useState<BulletinItem | null>(null);

  useEffect(() => {
    setNotices(getNotices().filter((n) => n.category === "Announcement"));
  }, []);

  const filtered = notices.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      item.content.toLowerCase().includes(search.toLowerCase());
    const matchesPriority =
      priorityFilter === "All" ||
      (priorityFilter === "High" && item.priority === "High") ||
      (priorityFilter === "Normal" && item.priority === "Normal");
    return matchesSearch && matchesPriority;
  });

  const handleShare = (notice: BulletinItem) => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      toast.success("Notice link copied to clipboard");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <PageHero
        title="Official Announcements"
        subtitle="Institutional circulars, governance directives, and general assembly communiqués from the Poddar secretariat."
        eyebrow="Alumni Bulletin"
        backgroundImage={IMAGES.hero.campusMain.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Alumni Bulletin", href: "/bulletin" },
          { label: "Announcements", href: "/bulletin/announcements" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-md border border-slate-200/80 dark:border-slate-800 mb-10 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search announcements by keywords..."
              className="pl-10 text-base sm:text-sm h-11 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            {["All", "High", "Normal"].map((p) => (
              <Button
                key={p}
                size="sm"
                variant={priorityFilter === p ? "default" : "outline"}
                onClick={() => setPriorityFilter(p)}
                className="text-xs h-9 min-w-[70px]"
              >
                {p === "High" ? "Urgent Only" : p === "Normal" ? "Standard" : "All Notices"}
              </Button>
            ))}
          </div>
        </div>

        {/* Notices Feed */}
        {filtered.length === 0 ? (
          <EmptyState
            title="No announcements found"
            description="No notices match your selected keywords or filters. Please broaden your query."
            actionLabel="Reset Filters"
            onAction={() => {
              setSearch("");
              setPriorityFilter("All");
            }}
          />
        ) : (
          <div className="space-y-4">
            {filtered.map((notice, idx) => {
              const isHigh = notice.priority === "High";
              return (
                <Reveal key={notice.id} delay={idx * 0.04}>
                  <Card
                    onClick={() => setSelectedNotice(notice)}
                    className={`cursor-pointer transition-all duration-200 border hover:shadow-md ${
                      isHigh
                        ? "border-amber-500/40 bg-amber-500/[0.02] dark:bg-amber-950/[0.05]"
                        : "border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900"
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            {isHigh && (
                              <Badge className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold gap-1 text-xs">
                                <Pin className="w-3 h-3 fill-current" />
                                Pinned Notice
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs font-medium">
                              Announcement
                            </Badge>
                            <span className="text-xs text-slate-500 flex items-center gap-1 ml-auto sm:ml-0">
                              <Calendar className="w-3.5 h-3.5" />
                              {notice.date}
                            </span>
                          </div>

                          <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors">
                            {notice.title}
                          </h3>

                          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                            {notice.excerpt}
                          </p>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-800 shrink-0 gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-amber-600 hover:text-amber-700 font-semibold text-xs px-0 hover:bg-transparent"
                          >
                            Read Full Text
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>

      {/* Notice Detail Dialog */}
      <Dialog open={!!selectedNotice} onOpenChange={(open) => !open && setSelectedNotice(null)}>
        <DialogContent className="max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          {selectedNotice && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">Official Announcement</Badge>
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

              <div className="py-4 border-t border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-4">
                <p>{selectedNotice.content}</p>
                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-4 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      Secretariat Authenticity Notice:
                    </span>{" "}
                    This memorandum has been ratified by the Poddar Alumni Association General
                    Secretariat under reference{" "}
                    <code className="text-amber-600 font-mono">PDR-2026-{selectedNotice.id}</code>.
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button variant="outline" size="sm" onClick={() => handleShare(selectedNotice)}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Announcement
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
