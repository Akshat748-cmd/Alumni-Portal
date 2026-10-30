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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Award,
  Sparkles,
  ArrowRight,
  Medal,
  CheckCircle2,
  Calendar,
} from "lucide-react";

export default function PromotionsAndAwardsPage() {
  const [awards, setAwards] = useState<SuccessStory[]>([]);
  const [selectedAward, setSelectedAward] = useState<SuccessStory | null>(null);

  useEffect(() => {
    setAwards(
      getNewsStories().filter(
        (s) => s.category === "Award" || s.category === "Promotion" || s.category === "Hall of Fame"
      )
    );
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <PageHero
        title="Promotions & Awards"
        subtitle="Honoring alumni recognized by statutory bodies, multinational organizations, and civic institutions for leadership and service."
        eyebrow="Laurels of Distinction"
        backgroundImage={IMAGES.hero.convocation.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Alumni Spotlight", href: "/spotlight" },
          { label: "Promotions & Awards", href: "/spotlight/awards" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <SectionHeader
          eyebrow="Distinguished Recognitions"
          title="Recent Citations & Appointments"
          description="A testament to academic diligence and ethical perseverance across industries."
          align="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {awards.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 0.05}>
              <Card
                onClick={() => setSelectedAward(item)}
                className="cursor-pointer border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl transition-all h-full flex flex-col justify-between group overflow-hidden"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={item.featuredImage}
                    alt={item.alumniName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-amber-500 text-navy-950 px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1 shadow-md">
                    <Award className="w-3.5 h-3.5" />
                    {item.category}
                  </div>
                </div>

                <CardContent className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-amber-600 font-semibold mb-1">
                      {item.alumniName} • Class of {item.batch}
                    </div>
                    <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                      {item.summary}
                    </p>

                    {item.quote && (
                      <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border-l-2 border-amber-500 text-xs italic text-slate-700 dark:text-slate-300">
                        "{item.quote}"
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-amber-600">
                    <span>View Citation Details</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Award Detail Dialog */}
      <Dialog open={!!selectedAward} onOpenChange={(open) => !open && setSelectedAward(null)}>
        <DialogContent className="max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          {selectedAward && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-amber-500 text-navy-950 font-bold">
                    {selectedAward.category}
                  </Badge>
                  <span className="text-xs text-slate-500 ml-auto font-medium">
                    Batch of {selectedAward.batch} • {selectedAward.course}
                  </span>
                </div>
                <DialogTitle className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-slate-100 text-left">
                  {selectedAward.title}
                </DialogTitle>
                <DialogDescription className="text-left text-amber-600 font-semibold pt-0.5">
                  Conferred upon {selectedAward.alumniName} ({selectedAward.companyOrOrg})
                </DialogDescription>
              </DialogHeader>

              <div className="py-4 border-t border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border border-amber-500/30">
                    <img
                      src={selectedAward.featuredImage}
                      alt={selectedAward.alumniName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-slate-100">
                      {selectedAward.alumniName}
                    </h5>
                    <p className="text-xs text-slate-500">{selectedAward.companyOrOrg}</p>
                  </div>
                </div>

                <p className="font-medium text-slate-800 dark:text-slate-200">
                  {selectedAward.summary}
                </p>

                <p>{selectedAward.fullStory}</p>

                {selectedAward.quote && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border-l-4 border-amber-500 italic text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
                    "{selectedAward.quote}"
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end pt-2">
                <Button onClick={() => setSelectedAward(null)}>Close</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

