"use client";

import React, { useState, useEffect } from "react";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { IMAGES } from "@/data/images";
import { getNewsStories } from "@/lib/api";
import { SuccessStory } from "@/data/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Trophy,
  Search,
  Quote,
  ArrowRight,
  GraduationCap,
  Sparkles,
} from "lucide-react";

export default function SuccessStoriesPage() {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);

  useEffect(() => {
    setStories(getNewsStories());
  }, []);

  const categories = ["All", "Leadership", "Award", "Promotion", "Hall of Fame"];

  const filtered = stories.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.alumniName.toLowerCase().includes(search.toLowerCase()) ||
      s.companyOrOrg.toLowerCase().includes(search.toLowerCase()) ||
      s.summary.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || s.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <PageHero
        title="Alumni Success Stories"
        subtitle="Chronicles of grit, intellectual curiosity, and enduring leadership forged within the lecture halls of Poddar."
        eyebrow="Inspiring Journeys"
        backgroundImage={IMAGES.hero.convocation.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Alumni Spotlight", href: "/spotlight" },
          { label: "Success Stories", href: "/spotlight/success-stories" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Search & Categories */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-md border border-slate-200/80 dark:border-slate-800 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by alumni, company, or keyword..."
              className="pl-10 text-base sm:text-sm h-11 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((c) => (
              <Button
                key={c}
                size="sm"
                variant={categoryFilter === c ? "default" : "outline"}
                onClick={() => setCategoryFilter(c)}
                className="text-xs h-9"
              >
                {c === "All" ? "All Categories" : c}
              </Button>
            ))}
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((story, idx) => (
            <Reveal key={story.id} delay={idx * 0.05}>
              <Card
                onClick={() => setSelectedStory(story)}
                className="cursor-pointer border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl transition-all h-full flex flex-col justify-between group overflow-hidden"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={story.featuredImage}
                    alt={story.alumniName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-navy-950/80 backdrop-blur-sm text-white px-2.5 py-1 rounded text-xs font-semibold">
                    {story.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-900 dark:text-slate-100 px-2 py-0.5 rounded text-[11px] font-semibold">
                    Class of {story.batch}
                  </div>
                </div>

                <CardContent className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-amber-600 font-semibold mb-1">
                      {story.alumniName} • {story.companyOrOrg}
                    </div>
                    <h3 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {story.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                      {story.summary}
                    </p>

                    {story.quote && (
                      <div className="mt-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border-l-2 border-amber-500 text-xs italic text-slate-700 dark:text-slate-300 line-clamp-2">
                        "{story.quote}"
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-amber-600">
                    <span>Read Full Profile</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Story Full Dialog */}
      <Dialog open={!!selectedStory} onOpenChange={(open) => !open && setSelectedStory(null)}>
        <DialogContent className="max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          {selectedStory && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{selectedStory.category}</Badge>
                  <span className="text-xs text-slate-500 ml-auto">
                    Class of {selectedStory.batch} • {selectedStory.course}
                  </span>
                </div>
                <DialogTitle className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-slate-100 text-left">
                  {selectedStory.title}
                </DialogTitle>
                <DialogDescription className="text-left text-amber-600 font-semibold pt-0.5">
                  {selectedStory.alumniName} — {selectedStory.companyOrOrg}
                </DialogDescription>
              </DialogHeader>

              <div className="py-4 border-t border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border border-amber-500/30">
                    <img
                      src={selectedStory.featuredImage}
                      alt={selectedStory.alumniName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-slate-100">
                      {selectedStory.alumniName}
                    </h5>
                    <p className="text-xs text-slate-500">{selectedStory.companyOrOrg}</p>
                    <p className="text-xs text-slate-400">Course: {selectedStory.course}</p>
                  </div>
                </div>

                <p className="font-medium text-slate-800 dark:text-slate-200">
                  {selectedStory.summary}
                </p>

                <p>{selectedStory.fullStory}</p>

                {selectedStory.quote && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border-l-4 border-amber-500 italic text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
                    "{selectedStory.quote}"
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end pt-2">
                <Button onClick={() => setSelectedStory(null)}>Close</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

