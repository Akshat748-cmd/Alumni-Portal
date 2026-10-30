"use client";

import React, { useState } from "react";
import Link from "next/link";
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
import { Mic, CheckCircle2, Sparkles, Calendar, BookOpen } from "lucide-react";
import { toast } from "sonner";

export default function GuestSpeakerPage() {
  const { currentUser, submitItem } = usePortalStore();

  const [fullName, setFullName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState("");
  const [batch, setBatch] = useState(currentUser?.batch ? String(currentUser.batch) : "2018");
  const [organization, setOrganization] = useState(currentUser?.company || "");
  const [designation, setDesignation] = useState(currentUser?.designation || "");
  const [topic, setTopic] = useState("");
  const [format, setFormat] = useState("Virtual Video Session");
  const [targetDepartment, setTargetDepartment] = useState("IT & Computer Science");
  const [message, setMessage] = useState("");
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !topic) {
      toast.error("Please provide your name, email, and proposed lecture topic");
      return;
    }

    const payload = {
      fullName,
      email,
      phone,
      batch: Number(batch) || 2020,
      organization: organization || designation || "Independent Specialist",
      type: "Guest Speaker",
      message: `Topic: ${topic} | Format: ${format} | Department: ${targetDepartment} | Notes: ${message}`,
      status: "pending" as const,
    };

    const newId = submitItem("give-back-offer", payload);
    fireConfettiBurst();
    setSubmittedRef(newId);
    toast.success("Guest lecture proposal submitted to Academic Dean.");
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setTopic("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <PageHero
        title="Deliver a Keynote or Guest Lecture"
        subtitle="Share practical industry methodologies, real-world case studies, and career guidance directly with students."
        eyebrow="Knowledge Transfer"
        backgroundImage={IMAGES.events[0].src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Give Back", href: "/give-back" },
          { label: "Guest Speaker", href: "/give-back/speaker" },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* 3-Step Process Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            {
              step: "1. Topic Proposal",
              desc: "Submit your domain expertise, preferred format, and target academic department.",
            },
            {
              step: "2. Faculty Alignment",
              desc: "The Department Chair coordinates the syllabus schedule and calendar dates with you.",
            },
            {
              step: "3. Interactive Session",
              desc: "Deliver your keynote live on campus or virtually with interactive student Q&A.",
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
                title="Guest Lecture Proposal Received!"
                message="Thank you for volunteering your expertise. The Head of Academic Affairs and the Alumni Secretariat will review your topic and propose suitable dates within 3 business days."
                referenceId={submittedRef}
                actionLabel="Submit Another Topic"
                onAction={handleReset}
                secondaryActionLabel="Explore Other Give Back Options"
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
                  <Mic className="w-4 h-4 text-amber-400" />
                  <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                    Guest Speaker Registry
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold">
                  Offer a Masterclass / Keynote
                </h2>
                <p className="mt-2 text-sm text-slate-300">
                  Inspire current undergraduate and postgraduate scholars with your hands-on industry insights.
                </p>
              </div>

              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="spk-name" className="text-xs font-semibold">
                        Full Name *
                      </Label>
                      <Input
                        id="spk-name"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Vikramaditya Rathore"
                        className="h-11 text-base sm:text-sm mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="spk-email" className="text-xs font-semibold">
                        Email Address *
                      </Label>
                      <Input
                        id="spk-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. vikram@apexcapital.mock"
                        className="h-11 text-base sm:text-sm mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="spk-phone" className="text-xs font-semibold">
                        Phone / WhatsApp
                      </Label>
                      <Input
                        id="spk-phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98290 12345"
                        className="h-11 text-base sm:text-sm mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="spk-batch" className="text-xs font-semibold">
                          Graduation Batch
                        </Label>
                        <Input
                          id="spk-batch"
                          value={batch}
                          onChange={(e) => setBatch(e.target.value)}
                          placeholder="2018"
                          className="h-11 text-base sm:text-sm mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="spk-org" className="text-xs font-semibold">
                          Current Company
                        </Label>
                        <Input
                          id="spk-org"
                          value={organization}
                          onChange={(e) => setOrganization(e.target.value)}
                          placeholder="Apex Capital"
                          className="h-11 text-base sm:text-sm mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <Label htmlFor="spk-topic" className="text-xs font-semibold">
                        Proposed Lecture Topic / Title *
                      </Label>
                      <Input
                        id="spk-topic"
                        required
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g. Enterprise Cloud Architecture & Distributed Resiliency"
                        className="h-11 text-base sm:text-sm mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="spk-format" className="text-xs font-semibold">
                          Preferred Format
                        </Label>
                        <Select value={format} onValueChange={setFormat}>
                          <SelectTrigger id="spk-format" className="h-11 text-base sm:text-sm mt-1">
                            <SelectValue placeholder="Format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Virtual Video Session">Virtual Video Session</SelectItem>
                            <SelectItem value="In-Person Campus">In-Person Campus Lecture (Jaipur)</SelectItem>
                            <SelectItem value="Hands-on Workshop">Half-Day Hands-on Workshop</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="spk-dept" className="text-xs font-semibold">
                          Target Academic Department
                        </Label>
                        <Select value={targetDepartment} onValueChange={setTargetDepartment}>
                          <SelectTrigger id="spk-dept" className="h-11 text-base sm:text-sm mt-1">
                            <SelectValue placeholder="Department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="IT & Computer Science">IT & Computer Science (BCA / MCA)</SelectItem>
                            <SelectItem value="Management & Commerce">Management & Commerce (BBA / MBA)</SelectItem>
                            <SelectItem value="Life Sciences & Biotech">Life Sciences & Biotechnology</SelectItem>
                            <SelectItem value="Design & Mass Media">Design & Mass Communication</SelectItem>
                            <SelectItem value="All Poddar Students">Cross-Disciplinary (All Students)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="spk-message" className="text-xs font-semibold">
                        Brief Synopsis / Target Outcomes
                      </Label>
                      <Textarea
                        id="spk-message"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="What practical skills, industry concepts, or tools will students learn from this session?"
                        className="text-base sm:text-sm mt-1"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Coordinated via Academic Affairs Secretariat.
                    </span>
                    <Button
                      type="submit"
                      className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold px-8 h-12"
                    >
                      Submit Lecture Proposal
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

