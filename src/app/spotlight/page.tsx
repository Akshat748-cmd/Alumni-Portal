"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { IMAGES } from "@/data/images";
import { getNewsStories } from "@/lib/api";
import { SuccessStory } from "@/data/types";
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
  Newspaper,
  Trophy,
  Award,
  Rocket,
  Medal,
  Share2,
  ArrowRight,
  Quote,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export default function SpotlightOverviewPage() {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);

  useEffect(() => {
    setStories(getNewsStories());
  }, []);

  const featuredStory = stories.find((s) => s.category === "Leadership") || stories[0];

  const tracks = [
    {
      title: "Alumni News",
      href: "/spotlight/news",
      description: "Media coverages, executive promotions, and thought leadership articles.",
      icon: Newspaper,
      badge: "Media & Press",
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      title: "Success Stories",
      href: "/spotlight/success-stories",
      description: "Transformative career pathways from Poddar classrooms to industry leadership.",
      icon: Trophy,
      badge: `${stories.length} Profiles`,
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Promotions & Awards",
      href: "/spotlight/awards",
      description: "Honoring alumni recognized with national citations and corporate advancements.",
      icon: Award,
      badge: "Honors",
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
    {
      title: "Entrepreneurs & Startups",
      href: "/spotlight/entrepreneurs",
      description: "Poddar founders scaling disruptive ventures across fintech, agritech, and AI.",
      icon: Rocket,
      badge: "Venture Hub",
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    },
    {
      title: "Distinguished Alumni",
      href: "/spotlight/distinguished",
      description: "Hall of Fame inductees and lifetime champions of institutional excellence.",
      icon: Medal,
      badge: "Hall of Fame",
      color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    },
    {
      title: "Share Your Achievement",
      href: "/spotlight/share",
      description: "Submit your latest promotion, award, venture funding, or news feature.",
      icon: Share2,
      badge: "Open Call",
      color: "bg-amber-500/20 text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <PageHero
        title="Alumni Spotlight"
        subtitle="Celebrating extraordinary alumni shaping boardrooms, founding pioneering enterprises, and earning distinctions."
        eyebrow="Triumphs & Laurels"
        backgroundImage={IMAGES.hero.networking.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Alumni Spotlight", href: "/spotlight" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Spotlight Navigation Tracks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {tracks.map((track, idx) => {
            const Icon = track.icon;
            return (
              <Reveal key={track.href} delay={idx * 0.05}>
                <Link href={track.href} className="block group h-full">
                  <Card className="h-full border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 rounded-xl ${track.color}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {track.badge}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors">
                          {track.title}
                        </h3>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                          {track.description}
                        </p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors">
                        Explore Category
                        <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* Featured Story Hero */}
        {featuredStory && (
          <Reveal className="mb-16">
            <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-navy-950 via-navy-900 to-slate-900 text-white p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <div className="w-full lg:w-4/12 aspect-[4/5] rounded-2xl overflow-hidden relative shadow-2xl border border-white/10 shrink-0">
                  <img
                    src={featuredStory.featuredImage}
                    alt={featuredStory.alumniName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-xs">
                    <p className="font-bold text-white text-sm">{featuredStory.alumniName}</p>
                    <p className="text-amber-400">
                      Class of {featuredStory.batch} • {featuredStory.course}
                    </p>
                  </div>
                </div>

                <div className="w-full lg:w-8/12">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-amber-500 text-navy-950 font-bold">Featured Spotlight</Badge>
                    <span className="text-xs text-slate-300 font-mono">
                      {featuredStory.companyOrOrg}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-serif font-bold leading-snug">
                    {featuredStory.title}
                  </h2>

                  <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                    {featuredStory.summary}
                  </p>

                  {featuredStory.quote && (
                    <div className="mt-5 p-4 rounded-xl bg-white/5 border-l-4 border-amber-500 text-sm italic text-amber-200">
                      "{featuredStory.quote}"
                    </div>
                  )}

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Button
                      onClick={() => setSelectedStory(featuredStory)}
                      className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold px-6"
                    >
                      Read Full Story
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>
                    <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <Link href="/spotlight/success-stories">All Success Stories</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Stories Grid */}
        <div className="mb-16">
          <SectionHeader
            eyebrow="Recent Highlights"
            title="Voices of Excellence"
            description="Recent career milestones, honors, and entrepreneurial ventures from the Poddar network."
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {stories.slice(1, 7).map((story, idx) => (
              <Reveal key={story.id} delay={idx * 0.05}>
                <Card
                  onClick={() => setSelectedStory(story)}
                  className="cursor-pointer border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-lg transition-all h-full flex flex-col justify-between group overflow-hidden"
                >
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img
                      src={story.featuredImage}
                      alt={story.alumniName}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-navy-950/80 backdrop-blur-sm text-white px-2.5 py-1 rounded text-xs font-semibold">
                      {story.category}
                    </div>
                  </div>

                  <CardContent className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-amber-600 font-semibold mb-1">
                        {story.alumniName} (Class of {story.batch})
                      </div>
                      <h4 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors line-clamp-2">
                        {story.title}
                      </h4>
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                        {story.summary}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-amber-600">
                      <span>Read Journey</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Share Callout Banner */}
        <Reveal>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                Community Recognition
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-slate-100 mt-1">
                Have a recent career milestone or achievement to celebrate?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
                Submit your promotion, published research, startup funding, or award to be spotlighted across our website and quarterly bulletin.
              </p>
            </div>
            <Button asChild className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold shrink-0">
              <Link href="/spotlight/share">
                Share Your Achievement
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>
          </div>
        </Reveal>
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

