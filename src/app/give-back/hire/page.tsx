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
import { UserCheck, Building2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function HirePoddarStudentsPage() {
  const { currentUser, submitItem } = usePortalStore();

  const [fullName, setFullName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState(currentUser?.company || "");
  const [batch, setBatch] = useState(currentUser?.batch ? String(currentUser.batch) : "2015");
  const [roleTitle, setRoleTitle] = useState("");
  const [ctcRange, setCtcRange] = useState("INR 6.0 - 9.0 LPA");
  const [headcount, setHeadcount] = useState("3 - 5 Candidates");
  const [driveMode, setDriveMode] = useState("Hybrid (Online Pre-screening + On-Campus Interviews)");
  const [message, setMessage] = useState("");
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !organization || !roleTitle) {
      toast.error("Please provide your name, company, and role requirements");
      return;
    }

    const payload = {
      fullName,
      email,
      phone,
      batch: Number(batch) || 2020,
      organization,
      type: "Hire Poddar Students",
      message: `Full-Time Roles: ${roleTitle} | CTC: ${ctcRange} | Headcount: ${headcount} | Drive Mode: ${driveMode} | Details: ${message}`,
      status: "pending" as const,
    };

    const newId = submitItem("give-back-offer", payload);
    fireConfettiBurst();
    setSubmittedRef(newId);
    toast.success("Placement drive request submitted to Training & Placement Cell.");
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setRoleTitle("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <PageHero
        title="Hire Poddar Graduates"
        subtitle="Partner with the Training & Placement Cell to recruit high-caliber, industry-ready graduates across disciplines."
        eyebrow="Campus Placements"
        backgroundImage={IMAGES.hero.convocation.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Give Back", href: "/give-back" },
          { label: "Hire Poddar Students", href: "/give-back/hire" },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            {
              step: "1. Recruitment Brief",
              desc: "Share your company profile, job descriptions, CTC packages, and preferred dates.",
            },
            {
              step: "2. Student Mapping",
              desc: "T&P cell matches candidate portfolios and schedules pre-placement talks (PPT).",
            },
            {
              step: "3. Selection & Offers",
              desc: "Conduct online assessments, technical interviews, and issue offer letters.",
            },
          ].map((s) => (
            <div
              key={s.step}
              className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm"
            >
              <div className="text-xs font-bold text-purple-600 font-serif">{s.step}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{s.desc}</p>
            </div>
          ))}
        </div>

        {submittedRef ? (
          <Reveal>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 shadow-xl border border-slate-200/80 dark:border-slate-800">
              <SuccessState
                title="Campus Placement Drive Initiated!"
                message="Thank you for choosing to recruit from your alma mater. The Head of Training & Placement will reach out within 24-48 hours with student candidate batches and drive schedules."
                referenceId={submittedRef}
                actionLabel="Submit Another Job Requisition"
                onAction={handleReset}
                secondaryActionLabel="Return to Give Back"
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
                  <UserCheck className="w-4 h-4 text-purple-400" />
                  <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold">
                    Corporate Campus Recruitment
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold">
                  Hire Poddar Graduates
                </h2>
                <p className="mt-2 text-sm text-slate-300">
                  Priority recruitment drives for alumni-led companies and executive partners.
                </p>
              </div>

              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hire-name" className="text-xs font-semibold">
                        Your Full Name *
                      </Label>
                      <Input
                        id="hire-name"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Vikramaditya Rathore"
                        className="h-11 text-base sm:text-sm mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="hire-email" className="text-xs font-semibold">
                        Official Work Email *
                      </Label>
                      <Input
                        id="hire-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. vikram@apexcapital.mock"
                        className="h-11 text-base sm:text-sm mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="hire-phone" className="text-xs font-semibold">
                        HR / Direct Contact Number
                      </Label>
                      <Input
                        id="hire-phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98290 12345"
                        className="h-11 text-base sm:text-sm mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="hire-org" className="text-xs font-semibold">
                        Hiring Organization *
                      </Label>
                      <Input
                        id="hire-org"
                        required
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder="e.g. Apex Capital Advisory"
                        className="h-11 text-base sm:text-sm mt-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <Label htmlFor="hire-roles" className="text-xs font-semibold">
                        Role Title(s) & Target Degrees *
                      </Label>
                      <Input
                        id="hire-roles"
                        required
                        value={roleTitle}
                        onChange={(e) => setRoleTitle(e.target.value)}
                        placeholder="e.g. Associate Financial Analyst (MBA), Software Engineer (MCA/BCA)"
                        className="h-11 text-base sm:text-sm mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="hire-ctc" className="text-xs font-semibold">
                          CTC Salary Band
                        </Label>
                        <Select value={ctcRange} onValueChange={setCtcRange}>
                          <SelectTrigger id="hire-ctc" className="h-11 text-base sm:text-sm mt-1">
                            <SelectValue placeholder="Salary Band" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="INR 4.5 - 6.0 LPA">INR 4.5 - 6.0 LPA</SelectItem>
                            <SelectItem value="INR 6.0 - 9.0 LPA">INR 6.0 - 9.0 LPA</SelectItem>
                            <SelectItem value="INR 9.0 - 15.0 LPA">INR 9.0 - 15.0 LPA</SelectItem>
                            <SelectItem value="INR 15.0+ LPA">INR 15.0+ LPA (Premium)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="hire-count" className="text-xs font-semibold">
                          Expected Headcount
                        </Label>
                        <Select value={headcount} onValueChange={setHeadcount}>
                          <SelectTrigger id="hire-count" className="h-11 text-base sm:text-sm mt-1">
                            <SelectValue placeholder="Headcount" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1 - 2 Candidates">1 - 2 Candidates</SelectItem>
                            <SelectItem value="3 - 5 Candidates">3 - 5 Candidates</SelectItem>
                            <SelectItem value="6 - 15 Candidates">6 - 15 Candidates</SelectItem>
                            <SelectItem value="15+ Bulk Drive">15+ Cohort Intake</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="hire-drive" className="text-xs font-semibold">
                          Drive Format
                        </Label>
                        <Select value={driveMode} onValueChange={setDriveMode}>
                          <SelectTrigger id="hire-drive" className="h-11 text-base sm:text-sm mt-1">
                            <SelectValue placeholder="Drive Format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Hybrid (Online Pre-screening + On-Campus Interviews)">
                              Hybrid
                            </SelectItem>
                            <SelectItem value="100% Virtual Drive">100% Virtual Drive</SelectItem>
                            <SelectItem value="On-Campus Jaipur Drive">On-Campus Jaipur Drive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="hire-msg" className="text-xs font-semibold">
                        Job Description / Preferred Eligibility Criteria
                      </Label>
                      <Textarea
                        id="hire-msg"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Mention minimum CGPA, technical skills, bonds/commitments, or key assessment stages..."
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
                      Initiate Campus Drive
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

