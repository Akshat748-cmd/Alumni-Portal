"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { IMAGES } from "@/data/images";
import { getEvents } from "@/lib/api";
import { PortalEvent } from "@/data/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Video,
  Calendar,
  Clock,
  Users,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Laptop,
  CheckCircle,
} from "lucide-react";

export default function WebinarsPage() {
  const [webinars, setWebinars] = useState<PortalEvent[]>([]);

  useEffect(() => {
    setWebinars(getEvents().filter((e) => e.isVirtual || e.type === "webinar"));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <PageHero
        title="Webinars & Masterclasses"
        subtitle="Live virtual knowledge exchanges, technical masterclasses, and executive dialogues broadcast globally."
        eyebrow="Virtual Masterclasses"
        backgroundImage={IMAGES.events[1].src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Reunions & Gatherings", href: "/reunions" },
          { label: "Webinars & Workshops", href: "/reunions/webinars" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <SectionHeader
          eyebrow="Digital Knowledge Series"
          title="Scheduled Online Conclaves"
          description="Access interactive virtual sessions led by alumni practitioners, specialists, and founders."
          align="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {webinars.map((webinar, idx) => (
            <Reveal key={webinar.id} delay={idx * 0.05}>
              <Card className="border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl transition-all h-full flex flex-col justify-between group overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={webinar.imageUrl}
                    alt={webinar.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-blue-600 text-white px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 shadow-md">
                    <Video className="w-3.5 h-3.5" />
                    Interactive Virtual Webinar
                  </div>
                  <div className="absolute bottom-3 right-3 bg-navy-950/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[11px] font-mono">
                    {webinar.attendeeCount} RSVPs
                  </div>
                </div>

                <CardContent className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-amber-600 font-semibold mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      {webinar.date} • {webinar.time}
                    </div>

                    <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {webinar.title}
                    </h3>

                    {webinar.speaker && (
                      <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-xs">
                        <div className="font-semibold text-slate-900 dark:text-slate-100">
                          Session Keynote:
                        </div>
                        <div className="text-amber-600 font-medium">{webinar.speaker}</div>
                        <div className="text-slate-500">{webinar.speakerRole}</div>
                      </div>
                    )}

                    <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                      {webinar.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Live Q&A Included</span>
                    <Button asChild size="sm" className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold text-xs">
                      <Link href={`/reunions/register?event=${webinar.id}`}>
                        Register Free Pass
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

