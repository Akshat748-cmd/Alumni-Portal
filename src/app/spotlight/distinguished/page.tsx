"use client";

import React, { useState } from "react";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ProfileModal } from "@/components/common/ProfileModal";
import { Reveal } from "@/components/motion/Reveal";
import { IMAGES } from "@/data/images";
import { INITIAL_ALUMNI } from "@/data/alumni";
import { AlumniProfile } from "@/data/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Medal,
  Award,
  Sparkles,
  ArrowRight,
  Quote,
  Star,
  ExternalLink,
} from "lucide-react";

export default function DistinguishedAlumniPage() {
  const [selectedProfile, setSelectedProfile] = useState<AlumniProfile | null>(null);

  // Distinguished alumni (featured or seniors)
  const distinguishedList = INITIAL_ALUMNI.filter((a) => a.featured || a.batch <= 2012).slice(0, 6);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <PageHero
        title="Distinguished Alumni"
        subtitle="Hall of Fame recipients, institutional benefactors, and lifetime contributors honoring Poddar's foundational heritage."
        eyebrow="Hall of Fame"
        backgroundImage={IMAGES.hero.convocation.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Alumni Spotlight", href: "/spotlight" },
          { label: "Distinguished Alumni", href: "/spotlight/distinguished" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <SectionHeader
          eyebrow="Hall of Fame"
          title="Lifetime Laureates of Poddar"
          description="Recognizing stalwarts whose leadership and enduring benevolence have amplified the prestige of our institution."
          align="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {distinguishedList.map((alumnus, idx) => (
            <Reveal key={alumnus.id} delay={idx * 0.05}>
              <Card
                onClick={() => setSelectedProfile(alumnus)}
                className="cursor-pointer border-2 border-amber-500/30 bg-gradient-to-b from-white via-white to-amber-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-amber-950/10 hover:shadow-2xl transition-all h-full flex flex-col justify-between group overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={alumnus.avatarUrl}
                    alt={alumnus.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-amber-500 text-navy-950 font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow-lg">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    Distinguished Laureate
                  </div>
                  <div className="absolute bottom-3 right-3 bg-navy-950/80 backdrop-blur-sm text-white px-2.5 py-0.5 rounded text-xs font-mono">
                    Class of {alumnus.batch}
                  </div>
                </div>

                <CardContent className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors">
                      {alumnus.name}
                    </h3>
                    <div className="text-sm font-semibold text-amber-600 mt-0.5">
                      {alumnus.designation}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {alumnus.company} • {alumnus.city}, {alumnus.country}
                    </div>

                    <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                      {alumnus.bio}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {alumnus.expertiseTags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[11px]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-amber-600">
                    <span>View Distinguished Citation</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Profile Modal */}
      <ProfileModal
        profile={selectedProfile}
        isOpen={!!selectedProfile}
        onClose={() => setSelectedProfile(null)}
      />
    </div>
  );
}

