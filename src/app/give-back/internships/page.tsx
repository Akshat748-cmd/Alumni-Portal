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
import { Briefcase, Building, CheckCircle2, Users } from "lucide-react";
import { toast } from "sonner";

export default function OfferInternshipsPage() {
  const { currentUser, submitItem } = usePortalStore();

  const [fullName, setFullName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState(currentUser?.company || "");
  const [batch, setBatch] = useState(currentUser?.batch ? String(currentUser.batch) : "2018");
  const [roleTitle, setRoleTitle] = useState("");
  const [openings, setOpenings] = useState("2");
  const [duration, setDuration] = useState("8 Weeks (Summer)");
  const [mode, setMode] = useState("Hybrid");
  const [stipend, setStipend] = useState("Paid (INR 15,000 - 25,000/mo)");
  const [requirements, setRequirements] = useState("");
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !organization || !roleTitle) {
      toast.error("Please fill in your name, company, and internship role title");
      return;
    }

    const payload = {
      fullName,
      email,
      phone,
      batch: Number(batch) || 2020,
      organization,
      type: "Offer Internships",
      message: `Role: ${roleTitle} | Openings: ${openings} | Duration: ${duration} | Mode: ${mode} | Stipend: ${stipend} | Criteria: ${requirements}`,
      status: "pending" as const,
    };

    const newId = submitItem("give-back-offer", payload);
    fireConfettiBurst();
    setSubmittedRef(newId);
    toast.success("Internship vacancy submitted to Training & Placement Cell.");
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setRoleTitle("");
    setRequirements("");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <PageHero
        title="Offer Student Internships"
        subtitle="Empower bright pre-final year scholars with real-world industry projects, summer internships, and structured corporate immersion."
        eyebrow="Talent Incubation"
        backgroundImage={IMAGES.events[3].src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Give Back", href: "/give-back" },
          { label: "Offer Internships", href: "/give-back/internships" },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* 3 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            {
              step: "1. Post Opening",
              desc: "Provide role specifications, duration, stipend, and desired skill proficiencies.",
            },
            {
              step: "2. Campus Screening",
              desc: "Training & Placement Cell shortlists qualified candidates and coordinates virtual interviews.",
            },
            {
              step: "3. Onboard & Mentor",
              desc: "Select your intern cohort and supervise capstones with dedicated faculty liaisons.",
            },
          ].map((s) => (
            <div
              key={s.step}
              className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm"
            >
              <div className="text-xs font-bold text-emerald-600 font-serif">{s.step}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{s.desc}</p>
            </div>
          ))}
        </div>

        {submittedRef ? (
          <Reveal>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 shadow-xl border border-slate-200/80 dark:border-slate-800">
              <SuccessState
                title="Internship Posting Submitted!"
                message="Your internship opportunity has been routed to the Training & Placement Cell. Our corporate liaison officer will get in touch to schedule student interviews."
                referenceId={submittedRef}
                actionLabel="Post Another Internship"
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
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                    Campus Internship Cell
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold">
                  Hire Poddar Interns
                </h2>
                <p className="mt-2 text-sm text-slate-300">
                  Pre-final year students in BCA, MCA, BBA, MBA, and Biotechnology available for 8-12 week structured internships.
                </p>
              </div>

              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="int-name" className="text-xs font-semibold">
                        Your Full Name *
                      </Label>
                      <Input
                        id="int-name"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Aditya Narang"
                        className="h-11 text-base sm:text-sm mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="int-email" className="text-xs font-semibold">
                        Work / Official Email *
                      </Label>
                      <Input
                        id="int-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. aditya@zenithventures.mock"
                        className="h-11 text-base sm:text-sm mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="int-phone" className="text-xs font-semibold">
                        Phone / WhatsApp
                      </Label>
                      <Input
                        id="int-phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98290 12345"
                        className="h-11 text-base sm:text-sm mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="int-org" className="text-xs font-semibold">
                          Company / Venture *
                        </Label>
                        <Input
                          id="int-org"
                          required
                          value={organization}
                          onChange={(e) => setOrganization(e.target.value)}
                          placeholder="Zenith AgriVentures"
                          className="h-11 text-base sm:text-sm mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="int-batch" className="text-xs font-semibold">
                          Batch Year
                        </Label>
                        <Input
                          id="int-batch"
                          value={batch}
                          onChange={(e) => setBatch(e.target.value)}
                          placeholder="2012"
                          className="h-11 text-base sm:text-sm mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <Label htmlFor="int-role" className="text-xs font-semibold">
                        Internship Role Title *
                      </Label>
                      <Input
                        id="int-role"
                        required
                        value={roleTitle}
                        onChange={(e) => setRoleTitle(e.target.value)}
                        placeholder="e.g. Full-Stack Web Development Intern / Growth Marketing Intern"
                        className="h-11 text-base sm:text-sm mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="int-openings" className="text-xs font-semibold">
                          Openings
                        </Label>
                        <Select value={openings} onValueChange={setOpenings}>
                          <SelectTrigger id="int-openings" className="h-11 text-base sm:text-sm mt-1">
                            <SelectValue placeholder="2" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Open Position</SelectItem>
                            <SelectItem value="2">2 Open Positions</SelectItem>
                            <SelectItem value="3">3 - 5 Positions</SelectItem>
                            <SelectItem value="6">6+ Cohort Roles</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="int-duration" className="text-xs font-semibold">
                          Duration
                        </Label>
                        <Select value={duration} onValueChange={setDuration}>
                          <SelectTrigger id="int-duration" className="h-11 text-base sm:text-sm mt-1">
                            <SelectValue placeholder="Duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="6 Weeks">6 Weeks (Winter)</SelectItem>
                            <SelectItem value="8 Weeks (Summer)">8 Weeks (Summer)</SelectItem>
                            <SelectItem value="12 Weeks">12 Weeks (Quarterly)</SelectItem>
                            <SelectItem value="6 Months Semester">6 Months Full Semester</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="int-mode" className="text-xs font-semibold">
                          Work Mode
                        </Label>
                        <Select value={mode} onValueChange={setMode}>
                          <SelectTrigger id="int-mode" className="h-11 text-base sm:text-sm mt-1">
                            <SelectValue placeholder="Work Mode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                            <SelectItem value="On-site">On-site (Office)</SelectItem>
                            <SelectItem value="Fully Remote">Fully Remote</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="int-stipend" className="text-xs font-semibold">
                        Stipend / Compensation
                      </Label>
                      <Select value={stipend} onValueChange={setStipend}>
                        <SelectTrigger id="int-stipend" className="h-11 text-base sm:text-sm mt-1">
                          <SelectValue placeholder="Stipend" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Paid (INR 10,000 - 15,000/mo)">INR 10,000 - 15,000 / month</SelectItem>
                          <SelectItem value="Paid (INR 15,000 - 25,000/mo)">INR 15,000 - 25,000 / month</SelectItem>
                          <SelectItem value="Paid (INR 25,000+/mo)">INR 25,000+ / month</SelectItem>
                          <SelectItem value="Performance Based Incentive">Performance Based Incentive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="int-reqs" className="text-xs font-semibold">
                        Candidate Skills & Key Responsibilities
                      </Label>
                      <Textarea
                        id="int-reqs"
                        rows={3}
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}
                        placeholder="e.g. Familiarity with React/Node.js, REST APIs, Git, and eagerness to work on cloud products..."
                        className="text-base sm:text-sm mt-1"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Coordinated with Training & Placement Cell.
                    </span>
                    <Button
                      type="submit"
                      className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold px-8 h-12"
                    >
                      Post Internship Opening
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

