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
import { Building2, Sparkles, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function CollaborateWithPoddarPage() {
  const { currentUser, submitItem } = usePortalStore();

  const [fullName, setFullName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState(currentUser?.company || "");
  const [batch, setBatch] = useState(currentUser?.batch ? String(currentUser.batch) : "2010");
  const [collaborationType, setCollaborationType] = useState("Academic Board of Studies Advisory");
  const [proposalTitle, setProposalTitle] = useState("");
  const [message, setMessage] = useState("");
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !organization || !proposalTitle) {
      toast.error("Please fill in your name, organization, and proposal title");
      return;
    }

    const payload = {
      fullName,
      email,
      phone,
      batch: Number(batch) || 2020,
      organization,
      type: "Collaborate with Poddar",
      message: `Track: ${collaborationType} | Proposal: ${proposalTitle} | Details: ${message}`,
      status: "pending" as const,
    };

    const newId = submitItem("give-back-offer", payload);
    fireConfettiBurst();
    setSubmittedRef(newId);
    toast.success("Institutional collaboration inquiry submitted to the Director's Office.");
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setProposalTitle("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <PageHero
        title="Institutional & Research Collaboration"
        subtitle="Partner on academic advisory boards, syllabus reviews, joint research publications, and corporate lab sponsorships."
        eyebrow="Academic Alliances"
        backgroundImage={IMAGES.hero.campusMain.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Give Back", href: "/give-back" },
          { label: "Collaborate with Poddar", href: "/give-back/collaborate" },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            {
              step: "1. Proposal Submission",
              desc: "Outline institutional focus areas, research synergy, or advisory board interest.",
            },
            {
              step: "2. Dean Review",
              desc: "The Director and Academic Senate evaluate syllabus integration and MoU terms.",
            },
            {
              step: "3. Formal MoU & Launch",
              desc: "Formalize the partnership through official agreement, faculty collaboration, and joint initiatives.",
            },
          ].map((s) => (
            <div
              key={s.step}
              className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm"
            >
              <div className="text-xs font-bold text-rose-600 font-serif">{s.step}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{s.desc}</p>
            </div>
          ))}
        </div>

        {submittedRef ? (
          <Reveal>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 shadow-xl border border-slate-200/80 dark:border-slate-800">
              <SuccessState
                title="Partnership Proposal Submitted!"
                message="Thank you for proposing this institutional alliance. The Office of Institutional Advancement and Academic Deans will review the proposal and arrange an exploratory meeting."
                referenceId={submittedRef}
                actionLabel="Submit Another Proposal"
                onAction={handleReset}
                secondaryActionLabel="Back to Give Back"
                onSecondaryAction={() => {
                  if (typeof window !== "undefined") window.location.href = "/give-back";
                }}
              />
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <Card className="border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-navy-950 to-navy-900 text-white p-6 sm:p-8 border-b border-amber-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-4 h-4 text-rose-400" />
                  <span className="text-xs uppercase tracking-wider text-rose-400 font-semibold">
                    Academic Alliances & MoUs
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold">
                  Institutional Collaboration Inquiry
                </h2>
                <p className="mt-2 text-sm text-slate-300">
                  Elevate Poddar's academic pedagogy, research facilities, and institutional standing.
                </p>
              </div>

              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="col-name" className="text-xs font-semibold">
                        Your Full Name *
                      </Label>
                      <Input
                        id="col-name"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Dr. Priyamvada Joshi"
                        className="h-11 text-base sm:text-sm mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="col-email" className="text-xs font-semibold">
                        Official / Professional Email *
                      </Label>
                      <Input
                        id="col-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. priyamvada@aarogya.mock"
                        className="h-11 text-base sm:text-sm mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="col-phone" className="text-xs font-semibold">
                        Contact Phone
                      </Label>
                      <Input
                        id="col-phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98290 12345"
                        className="h-11 text-base sm:text-sm mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="col-org" className="text-xs font-semibold">
                        Organization / University *
                      </Label>
                      <Input
                        id="col-org"
                        required
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder="e.g. Aarogya Diagnostics Network"
                        className="h-11 text-base sm:text-sm mt-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <Label htmlFor="col-type" className="text-xs font-semibold">
                        Collaboration Track *
                      </Label>
                      <Select value={collaborationType} onValueChange={setCollaborationType}>
                        <SelectTrigger id="col-type" className="h-11 text-base sm:text-sm mt-1">
                          <SelectValue placeholder="Select Track" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Academic Board of Studies Advisory">
                            Academic Board of Studies Advisory (Curriculum Revamp)
                          </SelectItem>
                          <SelectItem value="Applied Industry Research & Co-Authoring">
                            Applied Industry Research & Co-Authoring Papers
                          </SelectItem>
                          <SelectItem value="Corporate Sponsored Research Lab / Equipment">
                            Corporate Sponsored Research Lab / Equipment Donation
                          </SelectItem>
                          <SelectItem value="Faculty Development & Training Program">
                            Faculty Development & Industry Immersion Program
                          </SelectItem>
                          <SelectItem value="Student Capstone Sponsorship">
                            Student Capstone & Patent Commercialization
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="col-title" className="text-xs font-semibold">
                        Proposal Title / Focus Initiative *
                      </Label>
                      <Input
                        id="col-title"
                        required
                        value={proposalTitle}
                        onChange={(e) => setProposalTitle(e.target.value)}
                        placeholder="e.g. High-Throughput Genomic Sequencing Academic Research Alliance"
                        className="h-11 text-base sm:text-sm mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="col-msg" className="text-xs font-semibold">
                        Collaboration Scope & Expected Synergy
                      </Label>
                      <Textarea
                        id="col-msg"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Outline objectives, mutual institutional benefits, resources involved, and preferred timeline..."
                        className="text-base sm:text-sm mt-1"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Reviewed directly by Director & Dean Council.
                    </span>
                    <Button
                      type="submit"
                      className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold px-8 h-12"
                    >
                      Submit Collaboration Proposal
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

