"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Check,
  Award,
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  ArrowRight,
  Info,
  Gift,
} from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Tier {
  id: string;
  name: string;
  fee: string;
  cycle: string;
  badge?: string;
  isRecommended?: boolean;
  orderMobile: number;
  description: string;
  benefits: string[];
}

const TIERS: Tier[] = [
  {
    id: "supporter",
    name: "Alumni Supporter",
    fee: "₹2,500",
    cycle: "per annum",
    badge: "Most Popular",
    isRecommended: true,
    orderMobile: 1, // Shown first on mobile
    description: "For active alumni seeking closer engagement, priority mentorship pairing, and reunion discounts.",
    benefits: [
      "Everything in Community Tier",
      "Priority pairing with senior executive mentors",
      "25% discount on annual Reunion & Homecoming passes",
      "Complimentary access to Poddar Campus Library & Sports facilities",
      "Quarterly closed-door virtual AMA with the President",
      "Official 'Supporter Fellow' digital badge on directory profile",
    ],
  },
  {
    id: "community",
    name: "Community Member",
    fee: "₹0",
    cycle: "lifetime free",
    orderMobile: 2,
    description: "Standard enrollment for all verified Poddar graduates with lifetime directory and network access.",
    benefits: [
      "Verified entry in Global Alumni Directory",
      "Browse and apply for alumni job postings & referrals",
      "Attend open webinars and public reunions",
      "Quarterly Poddar Alumni Newsletter",
      "Standard academic transcript & credential support",
    ],
  },
  {
    id: "patron",
    name: "Patron Circle",
    fee: "₹10,000",
    cycle: "one-time / life membership",
    badge: "Honorary Circle",
    orderMobile: 3,
    description: "For alumni leaders desiring to sponsor scholarships and advise institutional academic committees.",
    benefits: [
      "Everything in Supporter Tier",
      "Life membership with commemorative brass desk seal",
      "Invitation to Academic Advisory Board consultative meets",
      "Sponsor a named underprivileged student emergency grant",
      "VIP seating & private dinner reception at Annual Alumni Gala",
      "Featured profile interview in Alumni Newsletter Spotlight",
    ],
  },
];

const CONTRIBUTION_AMOUNTS = [500, 1000, 2500, 5000];

export default function MembershipPage() {
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Voluntary contribution state
  const [selectedContribution, setSelectedContribution] = useState<number | null>(1000);
  const [customContribution, setCustomContribution] = useState("");
  const [contribSubmitted, setContribSubmitted] = useState(false);

  const handleSelectTier = (tier: Tier) => {
    setSelectedTier(tier);
    setIsSuccess(false);
    setDialogOpen(true);
  };

  const handleConfirmInterest = () => {
    setIsSuccess(true);
    toast.success(`Interest recorded for ${selectedTier?.name}! Our alumni liaison will connect with you.`);
  };

  const handleVoluntarySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = customContribution ? Number(customContribution) : selectedContribution;
    if (!amount || amount < 100) {
      toast.error("Please specify a valid contribution amount of ₹100 or more.");
      return;
    }
    setContribSubmitted(true);
    toast.success(`Thank you! Your pledge of ₹${amount.toLocaleString()} has been noted for Poddar Student Aid.`);
  };

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <PageHero
        eyebrow="OPTIONAL FELLOWSHIP • TIERS"
        title="Alumni Membership & Giving"
        subtitle="Support student scholarships, unlock executive campus privileges, and strengthen your alma mater's enduring heritage."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Join the Network", href: "/join" },
          { label: "Membership (Optional)" },
        ]}
      />

      {/* INSTITUTIONAL DISCLAIMER NOTE */}
      <section className="py-6 bg-navy-950 text-ivory border-b border-navy-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-navy-900 border border-navy-800 text-xs sm:text-sm">
            <Info className="h-5 w-5 text-gold-400 shrink-0" />
            <p className="text-ivory/80 leading-relaxed">
              <strong className="text-gold-300 font-semibold">Institutional Notice:</strong> Membership tiers are{" "}
              <strong>entirely optional and configurable by Poddar Administration</strong>. Standard alumni registry access remains 100% free for all verified graduates.
            </p>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP TIERS GRID */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <SectionHeader
            eyebrow="ANNUAL & LIFE TIERS"
            title="Choose Your Level of Engagement"
            subtitle="Transparent tiers designed to fund student emergency bursaries and community chapter gatherings."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12">
            {TIERS.map((tier, idx) => {
              const isRec = tier.isRecommended;
              return (
                <div
                  key={tier.id}
                  style={{ order: tier.orderMobile }}
                  className={`md:order-${idx + 1} flex flex-col`}
                >
                  <TiltCard className="h-full">
                    <div
                      className={`h-full flex flex-col justify-between p-6 sm:p-8 rounded-3xl transition-all duration-300 relative ${
                        isRec
                          ? "bg-navy-950 text-ivory border-2 border-gold-500 shadow-2xl scale-[1.02]"
                          : "bg-white text-ink border border-line shadow-lg hover:shadow-xl"
                      }`}
                    >
                      {tier.badge && (
                        <div
                          className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md ${
                            isRec
                              ? "bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 text-navy-950"
                              : "bg-navy-900 text-gold-300 border border-gold-500/30"
                          }`}
                        >
                          {tier.badge}
                        </div>
                      )}

                      <div>
                        <div className="mb-4">
                          <h3
                            className={`text-xl sm:text-2xl font-serif font-bold ${
                              isRec ? "text-ivory" : "text-navy-950"
                            }`}
                          >
                            {tier.name}
                          </h3>
                          <p
                            className={`text-xs mt-1 leading-relaxed ${
                              isRec ? "text-ivory/70" : "text-muted"
                            }`}
                          >
                            {tier.description}
                          </p>
                        </div>

                        <div className="flex items-baseline gap-1.5 my-6 pb-6 border-b border-line/20">
                          <span
                            className={`text-3xl sm:text-4xl font-serif font-bold ${
                              isRec ? "text-gold-400" : "text-navy-950"
                            }`}
                          >
                            {tier.fee}
                          </span>
                          <span className={`text-xs ${isRec ? "text-ivory/60" : "text-muted"}`}>
                            / {tier.cycle}
                          </span>
                        </div>

                        <div className="space-y-3 mb-8">
                          <div
                            className={`text-xs font-bold uppercase tracking-wider ${
                              isRec ? "text-gold-300" : "text-navy-900"
                            }`}
                          >
                            Included Privileges:
                          </div>
                          {tier.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-start gap-2.5 text-xs">
                              <Check
                                className={`h-4 w-4 shrink-0 mt-0.5 ${
                                  isRec ? "text-gold-400" : "text-emerald-600"
                                }`}
                              />
                              <span className={isRec ? "text-ivory/90" : "text-ink/80"}>
                                {benefit}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSelectTier(tier)}
                        className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer shadow-md ${
                          isRec
                            ? "bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 text-navy-950 hover:brightness-105"
                            : "bg-navy-950 text-gold-300 hover:bg-navy-900"
                        }`}
                      >
                        {tier.id === "community" ? "Current Standard Tier" : "Express Membership Interest"}
                      </button>
                    </div>
                  </TiltCard>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* VOLUNTARY CONTRIBUTION SECTION */}
      <section className="py-16 bg-white border-t border-line">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="bg-ivory rounded-3xl p-8 sm:p-12 border border-line shadow-md text-center">
            <div className="inline-flex p-3 rounded-2xl bg-gold-500/15 text-gold-700 border border-gold-500/30 mb-4">
              <Gift className="h-6 w-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy-950 mb-3">
              Voluntary Alumni Scholarship Fund
            </h2>
            <p className="text-sm text-muted max-w-xl mx-auto mb-8">
              Prefer to support directly? Make a voluntary donation toward student tuition grants, laboratory equipment, or campus career incubators.
            </p>

            {contribSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 max-w-md mx-auto">
                <Check className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                <h3 className="text-lg font-bold">Contribution Intent Recorded</h3>
                <p className="text-xs text-emerald-700 mt-1">
                  The Alumni Office will share the institutional 80G tax exemption donation gateway via email.
                </p>
                <button
                  type="button"
                  onClick={() => setContribSubmitted(false)}
                  className="mt-4 text-xs font-semibold text-emerald-800 underline cursor-pointer"
                >
                  Make another pledge
                </button>
              </div>
            ) : (
              <form onSubmit={handleVoluntarySubmit} className="max-w-md mx-auto space-y-5">
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  {CONTRIBUTION_AMOUNTS.map((amt) => {
                    const isSelected = selectedContribution === amt && !customContribution;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setSelectedContribution(amt);
                          setCustomContribution("");
                        }}
                        className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                          isSelected
                            ? "bg-navy-950 text-gold-300 border border-gold-500 shadow-sm"
                            : "bg-white text-navy-900 border border-line hover:border-gold-500/40"
                        }`}
                      >
                        ₹{amt.toLocaleString()}
                      </button>
                    );
                  })}
                </div>

                <div>
                  <input
                    type="number"
                    min="100"
                    placeholder="Or enter custom amount in INR"
                    value={customContribution}
                    onChange={(e) => {
                      setCustomContribution(e.target.value);
                      setSelectedContribution(null);
                    }}
                    className="w-full h-12 px-4 rounded-xl border border-line bg-white text-base text-navy-950 text-center focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-navy-950 text-gold-300 font-bold text-sm hover:bg-navy-900 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <HeartHandshake className="h-4 w-4" />
                  <span>Pledge Support (No Immediate Payment)</span>
                </button>
                <p className="text-[11px] text-muted">
                  Official tax exemption receipts (80G) are issued by the Poddar Trust Secretariat.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CONFIRMATION INTEREST MODAL (NO FAKE PAYMENTS) */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg bg-white border-line p-6 sm:p-8 rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl font-bold text-navy-950">
              {isSuccess ? "Membership Inquiry Received" : `Join ${selectedTier?.name}`}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted">
              {isSuccess
                ? "Your interest has been logged with the Poddar Alumni Secretariat."
                : "Review tier terms and confirm your interest. No payment is collected online."}
            </DialogDescription>
          </DialogHeader>

          {isSuccess ? (
            <div className="py-6 text-center space-y-4">
              <div className="inline-flex p-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <p className="text-sm text-navy-900 leading-relaxed">
                Thank you for your dedication to the Poddar community! A representative from the Alumni Affairs Office will contact you regarding documentation and welcoming kit delivery.
              </p>
              <div className="p-3.5 rounded-xl bg-ivory border border-line text-xs text-muted">
                Tier Selected: <strong className="text-navy-950">{selectedTier?.name}</strong> ({selectedTier?.fee} / {selectedTier?.cycle})
              </div>
              <button
                type="button"
                onClick={() => setDialogOpen(false)}
                className="w-full py-3 rounded-xl bg-navy-950 text-gold-300 font-bold text-sm cursor-pointer"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <div className="space-y-4 py-2">
              <div className="p-4 rounded-2xl bg-ivory border border-line flex justify-between items-center">
                <div>
                  <div className="text-base font-bold text-navy-950">{selectedTier?.name}</div>
                  <div className="text-xs text-muted">{selectedTier?.description}</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-gold-700">{selectedTier?.fee}</div>
                  <div className="text-[10px] text-muted">{selectedTier?.cycle}</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-gold-500/10 border border-gold-500/20 text-xs text-navy-950 flex items-start gap-2">
                <Info className="h-4 w-4 text-gold-600 shrink-0 mt-0.5" />
                <span>
                  Prototype Demonstration Notice: This portal does not collect credit card or banking details. Confirming interest registers your name in the institutional liaison queue.
                </span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleConfirmInterest}
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 text-navy-950 font-bold text-sm hover:brightness-105 transition-all shadow-md cursor-pointer"
                >
                  Confirm My Interest
                </button>
                <button
                  type="button"
                  onClick={() => setDialogOpen(false)}
                  className="px-5 py-3.5 rounded-xl bg-ivory border border-line text-navy-900 font-semibold text-sm hover:bg-navy-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
