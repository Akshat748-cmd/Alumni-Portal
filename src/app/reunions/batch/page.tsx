"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Timeline, TimelineItem } from "@/components/motion/Timeline";
import { Reveal } from "@/components/motion/Reveal";
import { IMAGES } from "@/data/images";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  History,
  Calendar,
  Sparkles,
  Users,
  MapPin,
  Heart,
  PlusCircle,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

const BATCH_TIMELINE_ITEMS: TimelineItem[] = [
  {
    yearOrDate: "Class of 2001",
    title: "Silver Jubilee Milestone Homecoming",
    subtitle: "25 Years of Institutional Legacy",
    description:
      "Celebrating the foundational pioneering batch of Poddar. Special memory tree dedication, campus tour of new research wings, and gala dinner with founding faculty trustees.",
    badge: "25th Anniversary",
  },
  {
    yearOrDate: "Class of 2011",
    title: "Vigintennial Decade Reunion",
    subtitle: "15 Years of Professional Leadership",
    description:
      "Panel sessions on sustainable enterprise scaling, alumni career mentorship pledges for final-year students, and batch retrospective coffee roundtable.",
    badge: "15th Anniversary",
  },
  {
    yearOrDate: "Class of 2016",
    title: "Decennial Batch Reunion",
    subtitle: "10 Years of Industry Excellence",
    description:
      "Over 180 alumni reconvening from across 6 countries. Featuring startup showcase demos, batch yearbook compilation, and cultural night reminiscence.",
    badge: "10th Anniversary",
  },
  {
    yearOrDate: "Class of 2021",
    title: "Quinquennial 5-Year Homecoming",
    subtitle: "5 Years of Early-Career Triumphs",
    description:
      "Connecting young innovators, tech specialists, and entrepreneurs. Interactive career speed-networking with senior alumni mentors and campus sports fixtures.",
    badge: "5th Anniversary",
  },
];

export default function BatchReunionsPage() {
  const [isProposeOpen, setIsProposeOpen] = useState(false);
  const [proposerBatch, setProposerBatch] = useState("2015");
  const [proposerName, setProposerName] = useState("");
  const [proposerEmail, setProposerEmail] = useState("");
  const [expectedCount, setExpectedCount] = useState("40");
  const [preferredMonth, setPreferredMonth] = useState("December 2027");
  const [proposerNote, setProposerNote] = useState("");

  const handleProposeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposerName || !proposerEmail) {
      toast.error("Please enter your name and contact email");
      return;
    }
    toast.success(
      `Reunion proposal for Class of ${proposerBatch} submitted! The Alumni Secretariat will coordinate logistics with you.`
    );
    setIsProposeOpen(false);
    setProposerName("");
    setProposerEmail("");
    setProposerNote("");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <PageHero
        title="Batch Milestone Reunions"
        subtitle="Reconnecting cohorts across milestone jubilees, reliving defining campus moments, and renewing enduring camaraderie."
        eyebrow="Cohort Jubilees"
        backgroundImage={IMAGES.events[0].src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Reunions & Gatherings", href: "/reunions" },
          { label: "Batch Reunions", href: "/reunions/batch" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Banner with Propose Button */}
        <Reveal className="mb-14">
          <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-wider text-amber-400 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Dedicated Cohort Gatherings
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold">
                Is your batch celebrating a milestone year?
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-300">
                The Alumni Office provides venue bookings, invitation dispatch, digital pass management, and hospitality logistics for batch milestone celebrations.
              </p>
            </div>
            <Button
              onClick={() => setIsProposeOpen(true)}
              className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold shrink-0 h-12 px-6"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Propose a Batch Reunion
            </Button>
          </div>
        </Reveal>

        {/* Vertical Timeline */}
        <SectionHeader
          eyebrow="Milestone Calendar"
          title="Scheduled Cohort Jubilees"
          description="Upcoming milestone reunions coordinated by our regional chapters and campus secretariat."
          align="center"
        />

        <div className="mt-12 mb-16">
          <Timeline items={BATCH_TIMELINE_ITEMS} />
        </div>

        {/* Recollection Highlight Cards */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-12">
          <SectionHeader
            eyebrow="Cohort Memoirs"
            title="Voices from Past Batch Meets"
            description="Snapshots and testimonials from alumni who traveled back to Jaipur for milestone homecomings."
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              {
                batch: "Class of 2004",
                quote:
                  "Walking into the central quadrangle after twenty years felt like time had stood still. Seeing our professors who are now professors emeriti brought tears to our eyes.",
                author: "Rajesh Soni",
                role: "VP Operations, Dubai",
              },
              {
                batch: "Class of 2014",
                quote:
                  "Our 10-year meet resulted in three alumni-led seed investments and four mentorship clinics for current students. Reunion is about nostalgia and future building.",
                author: "Pooja Khandelwal",
                role: "Product Director, Bengaluru",
              },
              {
                batch: "Class of 2019",
                quote:
                  "The campus has expanded phenomenally with state-of-the-art AI labs, yet the warm institutional ethos remains exactly as welcoming as our first semester.",
                author: "Karan Malani",
                role: "Senior Consultant, Gurugram",
              },
            ].map((card, i) => (
              <Reveal key={card.batch} delay={i * 0.05}>
                <Card className="border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 h-full flex flex-col justify-between">
                  <div>
                    <Badge variant="outline" className="text-amber-600 mb-3">
                      {card.batch}
                    </Badge>
                    <p className="text-sm italic text-slate-700 dark:text-slate-300 leading-relaxed">
                      "{card.quote}"
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <div className="font-bold text-slate-900 dark:text-slate-100">{card.author}</div>
                    <div className="text-slate-500">{card.role}</div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Propose Reunion Dialog */}
      <Dialog open={isProposeOpen} onOpenChange={setIsProposeOpen}>
        <DialogContent className="max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <form onSubmit={handleProposeSubmit} className="space-y-4">
            <DialogHeader>
              <DialogTitle className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100 text-left">
                Propose a Batch Reunion
              </DialogTitle>
              <DialogDescription className="text-left text-slate-600 dark:text-slate-400 text-xs">
                Partner with the Alumni Secretariat to convene your cohort at the Poddar campus or in a regional city.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="prop-batch" className="text-xs font-semibold">
                    Graduation Batch *
                  </Label>
                  <Input
                    id="prop-batch"
                    required
                    value={proposerBatch}
                    onChange={(e) => setProposerBatch(e.target.value)}
                    placeholder="e.g. 2015"
                    className="h-10 text-sm mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="prop-count" className="text-xs font-semibold">
                    Estimated Alumni *
                  </Label>
                  <Input
                    id="prop-count"
                    required
                    value={expectedCount}
                    onChange={(e) => setExpectedCount(e.target.value)}
                    placeholder="e.g. 50"
                    className="h-10 text-sm mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="prop-name" className="text-xs font-semibold">
                  Lead Organizer Name *
                </Label>
                <Input
                  id="prop-name"
                  required
                  value={proposerName}
                  onChange={(e) => setProposerName(e.target.value)}
                  placeholder="e.g. Amit Pareek"
                  className="h-10 text-sm mt-1"
                />
              </div>

              <div>
                <Label htmlFor="prop-email" className="text-xs font-semibold">
                  Organizer Email Address *
                </Label>
                <Input
                  id="prop-email"
                  type="email"
                  required
                  value={proposerEmail}
                  onChange={(e) => setProposerEmail(e.target.value)}
                  placeholder="e.g. amit@poddaralumni.mock"
                  className="h-10 text-sm mt-1"
                />
              </div>

              <div>
                <Label htmlFor="prop-month" className="text-xs font-semibold">
                  Preferred Month & Year
                </Label>
                <Input
                  id="prop-month"
                  value={preferredMonth}
                  onChange={(e) => setPreferredMonth(e.target.value)}
                  placeholder="e.g. November 2027"
                  className="h-10 text-sm mt-1"
                />
              </div>

              <div>
                <Label htmlFor="prop-notes" className="text-xs font-semibold">
                  Special Requests / Suggested Program
                </Label>
                <Textarea
                  id="prop-notes"
                  rows={2}
                  value={proposerNote}
                  onChange={(e) => setProposerNote(e.target.value)}
                  placeholder="Preferred campus venues, faculty honors, sports matches..."
                  className="text-sm mt-1"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button type="button" variant="ghost" onClick={() => setIsProposeOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold">
                Submit Reunion Proposal
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

