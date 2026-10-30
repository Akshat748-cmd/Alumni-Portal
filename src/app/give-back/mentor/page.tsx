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
import { GraduationCap, HeartHandshake, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function MentorStudentsPage() {
  const { currentUser, submitItem } = usePortalStore();

  const [fullName, setFullName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState("");
  const [batch, setBatch] = useState(currentUser?.batch ? String(currentUser.batch) : "2018");
  const [organization, setOrganization] = useState(currentUser?.company || "");
  const [designation, setDesignation] = useState(currentUser?.designation || "");
  const [focusArea, setFocusArea] = useState("Career Guidance & Mock Interviews");
  const [commitment, setCommitment] = useState("2 Hours per Month (Virtual)");
  const [maxMentees, setMaxMentees] = useState("2 Students");
  const [message, setMessage] = useState("");
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      toast.error("Please provide your name and email address");
      return;
    }

    const payload = {
      fullName,
      email,
      phone,
      batch: Number(batch) || 2020,
      organization: organization || designation || "Alumnus Mentor",
      type: "Mentor Students",
      message: `Focus: ${focusArea} | Commitment: ${commitment} | Slots: ${maxMentees} | Background: ${message}`,
      status: "pending" as const,
    };

    const newId = submitItem("give-back-offer", payload);
    fireConfettiBurst();
    setSubmittedRef(newId);
    toast.success("Mentorship profile submitted to Alumni Career Circle.");
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <PageHero
        title="Mentor Poddar Students"
        subtitle="Shape the career trajectories of aspiring scholars through 1-on-1 virtual mentoring, capstone guidance, and mock interviews."
        eyebrow="Alumni Mentorship Circle"
        backgroundImage={IMAGES.events[3].src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Give Back", href: "/give-back" },
          { label: "Mentor Students", href: "/give-back/mentor" },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            {
              step: "1. Register Profile",
              desc: "Indicate your focus domains, student capacity, and monthly time commitment.",
            },
            {
              step: "2. Student Match",
              desc: "Students submit mentorship requests aligned with your career specialty.",
            },
            {
              step: "3. 1-on-1 Dialogues",
              desc: "Conduct structured virtual calls to review portfolios, capstones, and offer advice.",
            },
          ].map((s) => (
            <div
              key={s.step}
              className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm"
            >
              <div className="text-xs font-bold text-amber-600 font-serif">{s.step}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{s.desc}</p>
            </div>
          ))}
        </div>

        {submittedRef ? (
          <Reveal>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 shadow-xl border border-slate-200/80 dark:border-slate-800">
              <SuccessState
                title="Mentorship Enrollment Received!"
                message="Thank you for volunteering to mentor the next generation. Your profile will be added to the verified alumni mentorship roster."
                referenceId={submittedRef}
                actionLabel="Update Preferences"
                onAction={handleReset}
                secondaryActionLabel="Explore Career Hub"
                onSecondaryAction={() => {
                  if (typeof window !== "undefined") window.location.href = "/career-hub";
                }}
              />
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <Card className="border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-navy-950 to-navy-900 text-white p-6 sm:p-8 border-b border-amber-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="w-4 h-4 text-amber-400" />
                  <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                    Alumni Mentorship Registry
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold">
                  Become a Student Mentor
                </h2>
                <p className="mt-2 text-sm text-slate-300">
                  Just 2 hours a month can fundamentally clarify a student's direction and ignite their career confidence.
                </p>
              </div>

              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="mnt-name" className="text-xs font-semibold">
                        Your Full Name *
                      </Label>
                      <Input
                        id="mnt-name"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Ananya Deshmukh"
                        className="h-11 text-base sm:text-sm mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="mnt-email" className="text-xs font-semibold">
                        Email Address *
                      </Label>
                      <Input
                        id="mnt-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. ananya@novacrest.mock"
                        className="h-11 text-base sm:text-sm mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="mnt-phone" className="text-xs font-semibold">
                        Phone / WhatsApp
                      </Label>
                      <Input
                        id="mnt-phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98290 12345"
                        className="h-11 text-base sm:text-sm mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="mnt-batch" className="text-xs font-semibold">
                          Batch Year
                        </Label>
                        <Input
                          id="mnt-batch"
                          value={batch}
                          onChange={(e) => setBatch(e.target.value)}
                          placeholder="2014"
                          className="h-11 text-base sm:text-sm mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="mnt-org" className="text-xs font-semibold">
                          Current Company
                        </Label>
                        <Input
                          id="mnt-org"
                          value={organization}
                          onChange={(e) => setOrganization(e.target.value)}
                          placeholder="NovaCrest Solutions"
                          className="h-11 text-base sm:text-sm mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <Label htmlFor="mnt-focus" className="text-xs font-semibold">
                        Primary Mentorship Focus *
                      </Label>
                      <Select value={focusArea} onValueChange={setFocusArea}>
                        <SelectTrigger id="mnt-focus" className="h-11 text-base sm:text-sm mt-1">
                          <SelectValue placeholder="Focus Area" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Career Guidance & Mock Interviews">
                            Career Guidance & Technical Mock Interviews
                          </SelectItem>
                          <SelectItem value="Capstone Projects & Applied Research">
                            Capstone Projects & Applied Research Guidance
                          </SelectItem>
                          <SelectItem value="Venture Ideation & Startup Pitching">
                            Venture Ideation & Startup Pitching
                          </SelectItem>
                          <SelectItem value="Overseas Higher Education (MS/MBA)">
                            Overseas Higher Education (MS/MBA) Strategy
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="mnt-time" className="text-xs font-semibold">
                          Monthly Time Commitment
                        </Label>
                        <Select value={commitment} onValueChange={setCommitment}>
                          <SelectTrigger id="mnt-time" className="h-11 text-base sm:text-sm mt-1">
                            <SelectValue placeholder="Time Commitment" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1 Hour per Month (Virtual)">1 Hour per Month (Virtual)</SelectItem>
                            <SelectItem value="2 Hours per Month (Virtual)">2 Hours per Month (Virtual)</SelectItem>
                            <SelectItem value="4 Hours per Month (Bi-weekly)">4 Hours per Month (Bi-weekly)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="mnt-slots" className="text-xs font-semibold">
                          Max Active Student Mentees
                        </Label>
                        <Select value={maxMentees} onValueChange={setMaxMentees}>
                          <SelectTrigger id="mnt-slots" className="h-11 text-base sm:text-sm mt-1">
                            <SelectValue placeholder="Max Mentees" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1 Student">1 Student</SelectItem>
                            <SelectItem value="2 Students">2 Students</SelectItem>
                            <SelectItem value="3 Students">3 Students</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="mnt-msg" className="text-xs font-semibold">
                        Brief Bio & Ideal Mentee Profile
                      </Label>
                      <Textarea
                        id="mnt-msg"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Mention your domain specializations, technologies you work with, and what kind of students you would love to mentor..."
                        className="text-base sm:text-sm mt-1"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Coordinated via Poddar Mentorship Secretariat.
                    </span>
                    <Button
                      type="submit"
                      className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold px-8 h-12"
                    >
                      Join Mentor Registry
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

