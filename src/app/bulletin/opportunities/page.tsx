"use client";

import React, { useState, useEffect } from "react";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { IMAGES } from "@/data/images";
import { getNotices } from "@/lib/api";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Award,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  Send,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

interface OpportunityItem extends BulletinItem {
  deadlineDays?: number;
  grantAmount?: string;
}

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<OpportunityItem[]>([]);
  const [selectedOpp, setSelectedOpp] = useState<OpportunityItem | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantNote, setApplicantNote] = useState("");

  useEffect(() => {
    const raw = getNotices().filter((n) => n.category === "Opportunity");
    const augmented: OpportunityItem[] = raw.map((item, idx) => ({
      ...item,
      // Stagger sample deadlines: 2 days (urgent red), 6 days (amber), 18 days (green)
      deadlineDays: idx === 0 ? 6 : idx === 1 ? 2 : 24,
      grantAmount: idx === 0 ? "Project Seed Grant" : idx === 1 ? "Citation & Medal" : "Fee Waiver Perk",
    }));
    setOpportunities(augmented);
  }, []);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail) {
      toast.error("Please provide your name and email address");
      return;
    }
    toast.success(`Application received for "${selectedOpp?.title}". The Secretariat will contact you.`);
    setIsApplying(false);
    setSelectedOpp(null);
    setApplicantName("");
    setApplicantEmail("");
    setApplicantNote("");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <PageHero
        title="Time-Critical Opportunities"
        subtitle="Exclusive venture seed grants, institutional awards nominations, executive fellowship concessions, and academic chairs."
        eyebrow="Grants & Honors"
        backgroundImage={IMAGES.hero.campusMain.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Alumni Bulletin", href: "/bulletin" },
          { label: "Opportunities", href: "/bulletin/opportunities" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <SectionHeader
          eyebrow="Open Applications"
          title="Active Calls for Nominations & Grants"
          description="High-impact initiatives curated exclusively for verified Poddar alumni."
          align="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {opportunities.map((opp, idx) => {
            const days = opp.deadlineDays ?? 15;
            const isCritical = days <= 3;
            const isWarning = days > 3 && days <= 7;

            return (
              <Reveal key={opp.id} delay={idx * 0.05}>
                <Card className="border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl transition-all h-full flex flex-col justify-between group overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3 text-xs">
                      {isCritical ? (
                        <Badge variant="destructive" className="animate-pulse gap-1 font-semibold">
                          <AlertTriangle className="w-3 h-3" />
                          Closing in {days} Days
                        </Badge>
                      ) : isWarning ? (
                        <Badge className="bg-amber-500 hover:bg-amber-600 text-navy-950 gap-1 font-semibold">
                          <Clock className="w-3 h-3" />
                          Closing in {days} Days
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="gap-1 font-semibold">
                          <Clock className="w-3 h-3" />
                          {days} Days Remaining
                        </Badge>
                      )}

                      <span className="font-semibold text-amber-600 dark:text-amber-400 font-mono text-xs">
                        {opp.grantAmount}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {opp.title}
                    </h3>

                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                      {opp.excerpt}
                    </p>
                  </CardContent>

                  <div className="px-6 pb-6 pt-0 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800 pt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedOpp(opp);
                        setIsApplying(false);
                      }}
                      className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 px-0"
                    >
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedOpp(opp);
                        setIsApplying(true);
                      }}
                      className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold text-xs"
                    >
                      Express Interest
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Opportunity Modal (Details or Express Interest) */}
      <Dialog open={!!selectedOpp} onOpenChange={(open) => !open && setSelectedOpp(null)}>
        <DialogContent className="max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          {selectedOpp && !isApplying && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{selectedOpp.grantAmount}</Badge>
                  <span className="text-xs text-amber-600 font-semibold ml-auto flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Closes in {selectedOpp.deadlineDays} days
                  </span>
                </div>
                <DialogTitle className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100 text-left">
                  {selectedOpp.title}
                </DialogTitle>
                <DialogDescription className="text-left text-slate-600 dark:text-slate-400 pt-1">
                  {selectedOpp.excerpt}
                </DialogDescription>
              </DialogHeader>

              <div className="py-4 border-t border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-3">
                <p>{selectedOpp.content}</p>
                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-4 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
                  <div className="font-semibold text-slate-900 dark:text-slate-100">
                    Eligibility & Next Steps:
                  </div>
                  <div>• Open to all graduated Poddar degree holders & final year scholars.</div>
                  <div>• Shortlisted applicants receive jury review within 10 business days.</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button variant="ghost" onClick={() => setSelectedOpp(null)}>
                  Close
                </Button>
                <Button
                  onClick={() => setIsApplying(true)}
                  className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold"
                >
                  Apply / Express Interest
                </Button>
              </div>
            </>
          )}

          {selectedOpp && isApplying && (
            <form onSubmit={handleApplySubmit} className="space-y-4">
              <DialogHeader>
                <DialogTitle className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100 text-left">
                  Apply for Opportunity
                </DialogTitle>
                <DialogDescription className="text-left text-slate-600 dark:text-slate-400 text-xs">
                  {selectedOpp.title}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 pt-2">
                <div>
                  <Label htmlFor="opp-name" className="text-xs font-semibold">
                    Full Name *
                  </Label>
                  <Input
                    id="opp-name"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="e.g. Vikramaditya Rathore"
                    className="h-10 text-sm mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="opp-email" className="text-xs font-semibold">
                    Email Address *
                  </Label>
                  <Input
                    id="opp-email"
                    type="email"
                    required
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    placeholder="e.g. vikram@apexcapital.mock"
                    className="h-10 text-sm mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="opp-note" className="text-xs font-semibold">
                    Brief Note or Proposal Summary
                  </Label>
                  <Textarea
                    id="opp-note"
                    rows={3}
                    value={applicantNote}
                    onChange={(e) => setApplicantNote(e.target.value)}
                    placeholder="Briefly state your venture details, nomination rationale, or credentials..."
                    className="text-sm mt-1"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button type="button" variant="ghost" onClick={() => setIsApplying(false)}>
                  Back
                </Button>
                <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold">
                  Submit Expression of Interest
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

