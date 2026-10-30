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
  Newspaper,
  Search,
  Calendar,
  ExternalLink,
  ArrowRight,
  Share2,
} from "lucide-react";
import { toast } from "sonner";

export default function SpotlightNewsPage() {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [search, setSearch] = useState("");
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);

  useEffect(() => {
    setStories(getNewsStories());
  }, []);

  const filtered = stories.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.alumniName.toLowerCase().includes(search.toLowerCase()) ||
      s.companyOrOrg.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <PageHero
        title="Alumni in the News"
        subtitle="Media coverage, executive transitions, and thought leadership articles profiling Poddar graduates across industries."
        eyebrow="Press & Publications"
        backgroundImage={IMAGES.hero.networking.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Alumni Spotlight", href: "/spotlight" },
          { label: "Alumni News", href: "/spotlight/news" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Search Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-md border border-slate-200/80 dark:border-slate-800 mb-10 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search news by alumni name or company..."
              className="pl-10 text-base sm:text-sm h-11 bg-slate-50 dark:bg-slate-800"
            />
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Showing {filtered.length} Featured Articles
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 0.05}>
              <Card
                onClick={() => setSelectedStory(item)}
                className="cursor-pointer border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-lg transition-all h-full flex flex-col justify-between group overflow-hidden"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={item.featuredImage}
                    alt={item.alumniName}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-navy-950/80 backdrop-blur-sm text-white px-2.5 py-1 rounded text-xs font-semibold">
                    {item.companyOrOrg}
                  </div>
                </div>

                <CardContent className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-amber-600 font-semibold mb-1">
                      {item.alumniName} • Class of {item.batch}
                    </div>
                    <h3 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                      {item.summary}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-amber-600">
                    <span>Read Full Coverage</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
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

              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    toast.success("News article link copied to clipboard");
                  }}
                >
                  <Share2 className="w-4 h-4 mr-1.5" />
                  Share Article
                </Button>
                <Button onClick={() => setSelectedStory(null)}>Close</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

