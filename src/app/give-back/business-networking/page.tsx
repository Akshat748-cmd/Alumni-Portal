"use client";

import React, { useState } from "react";
import { PageHero } from "@/components/common/PageHero";
import { SuccessState } from "@/components/common/SuccessState";
import { Reveal } from "@/components/motion/Reveal";
import { fireConfettiBurst } from "@/components/motion/ConfettiBurst";
import { IMAGES } from "@/data/images";
import { usePortalStore } from "@/store/portal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Network, Handshake, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function BusinessCollaborationPage() {
  const { currentUser, submitItem } = usePortalStore();

  const [fullName, setFullName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState(currentUser?.company || "");
  const [batch, setBatch] = useState(currentUser?.batch ? String(currentUser.batch) : "2016");
  const [partnershipType, setPartnershipType] = useState("B2B Vendor / Service Partnership");
  const [website, setWebsite] = useState("");
  const [discountOffer, setDiscountOffer] = useState("");
  const [message, setMessage] = useState("");
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !businessName) {
      toast.error("Please fill in your name, email, and business name");
      return;
    }

    const payload = {
      fullName,
      email,
      phone,
      batch: Number(batch) || 2020,
      organization: businessName,
      type: "Business Collaboration",
      message: `Type: ${partnershipType} | Web: ${website} | Alumni Perk: ${discountOffer} | Notes: ${message}`,
      status: "pending" as const,
    };

    const newId = submitItem("give-back-offer", payload);
    fireConfettiBurst();
    setSubmittedRef(newId);
    toast.success("Business collaboration offer submitted to Alumni Commerce Desk.");
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setMessage("");
    setDiscountOffer("");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <PageHero
        title="Alumni Business Collaboration & B2B Hub"
        subtitle="Foster cross-venture synergies, offer exclusive alumni discounts, and procure services from trusted enterprises founded by Poddar graduates."
        eyebrow="Commercial Synergy"
        backgroundImage={IMAGES.hero.networking.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Give Back", href: "/give-back" },
          { label: "Business Collaboration", href: "/give-back/business-networking" },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            {
              step: "1. Register Commercial Offer",
              desc: "List your enterprise capabilities, procurement solutions, or alumni rate concessions.",
            },
            {
              step: "2. Directory Verification",
              desc: "The Alumni Commercial Secretariat verifies entity credentials and batch graduation status.",
            },
            {
              step: "3. Showcase & Connect",
              desc: "Featured across the Alumni Business Directory and matched with institutional procurement desks.",
            },
          ].map((s) => (
            <div
              key={s.step}
              className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm"
            >
              <div className="text-xs font-bold text-indigo-600 font-serif">{s.step}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{s.desc}</p>
            </div>
          ))}
        </div>

        {submittedRef ? (
          <Reveal>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 shadow-xl border border-slate-200/80 dark:border-slate-800">
              <SuccessState
                title="Business Partnership Proposal Logged!"
                message="Thank you for supporting community commerce. Your commercial offer has been submitted for verification. Upon approval, your enterprise will be showcased in the Business Directory."
                referenceId={submittedRef}
                actionLabel="Submit Another Business"
                onAction={handleReset}
                secondaryActionLabel="Explore Business Directory"
                onSecondaryAction={() => {
                  if (typeof window !== "undefined") window.location.href = "/directory/businesses";
                }}
              />
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <Card className="border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-navy-950 to-navy-900 text-white p-6 sm:p-8 border-b border-amber-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Network className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs uppercase tracking-wider text-indigo-400 font-semibold">
                    Alumni Commerce Desk
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold">
                  Offer B2B Collaboration or Community Perks
                </h2>
                <p className="mt-2 text-sm text-slate-300">
                  Connect your products and professional enterprise services with registered alumni and institutional procurement partners.
                </p>
              </div>

              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="biz-founder" className="text-xs font-semibold">
                        Founder / Representative Name *
                      </Label>
                      <Input
                        id="biz-founder"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Raghavendra Singhania"
                        className="h-11 text-base sm:text-sm mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="biz-email" className="text-xs font-semibold">
                        Corporate / Work Email *
                      </Label>
                      <Input
                        id="biz-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. raghav@singhaniaheritage.mock"
                        className="h-11 text-base sm:text-sm mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="biz-phone" className="text-xs font-semibold">
                        Contact Mobile / WhatsApp
                      </Label>
                      <Input
                        id="biz-phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98290 12345"
                        className="h-11 text-base sm:text-sm mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="biz-name" className="text-xs font-semibold">
                          Enterprise Name *
                        </Label>
                        <Input
                          id="biz-name"
                          required
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder="e.g. Singhania Heritage"
                          className="h-11 text-base sm:text-sm mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="biz-batch" className="text-xs font-semibold">
                          Batch Year
                        </Label>
                        <Input
                          id="biz-batch"
                          value={batch}
                          onChange={(e) => setBatch(e.target.value)}
                          placeholder="2006"
                          className="h-11 text-base sm:text-sm mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="biz-type" className="text-xs font-semibold">
                          Collaboration Model *
                        </Label>
                        <Select value={partnershipType} onValueChange={setPartnershipType}>
                          <SelectTrigger id="biz-type" className="h-11 text-base sm:text-sm mt-1">
                            <SelectValue placeholder="Model" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="B2B Vendor / Service Partnership">
                              B2B Vendor / Service Partnership
                            </SelectItem>
                            <SelectItem value="Exclusive Alumni Discount / Privileges">
                              Exclusive Alumni Discount / Privileges
                            </SelectItem>
                            <SelectItem value="Incubator Mentor / Angel Investor">
                              Incubator Mentor / Angel Investor
                            </SelectItem>
                            <SelectItem value="Corporate Procurement Listing">
                              Corporate Procurement Listing
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="biz-web" className="text-xs font-semibold">
                          Official Website / Store URL
                        </Label>
                        <Input
                          id="biz-web"
                          type="url"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          placeholder="https://singhaniaheritage.mock"
                          className="h-11 text-base sm:text-sm mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="biz-discount" className="text-xs font-semibold">
                        Exclusive Alumni Discount / Offer Summary (if applicable)
                      </Label>
                      <Input
                        id="biz-discount"
                        value={discountOffer}
                        onChange={(e) => setDiscountOffer(e.target.value)}
                        placeholder="e.g. 15% discount on professional consulting or software subscriptions"
                        className="h-11 text-base sm:text-sm mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="biz-msg" className="text-xs font-semibold">
                        Enterprise Description & Procurement Capabilities
                      </Label>
                      <Textarea
                        id="biz-msg"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Describe services, products, past corporate client references, and how you wish to collaborate..."
                        className="text-base sm:text-sm mt-1"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Coordinated via Alumni Business Network.
                    </span>
                    <Button
                      type="submit"
                      className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold px-8 h-12"
                    >
                      Submit Commercial Partnership
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </Reveal>
        )}
      </div>
    </div>
  );
}

