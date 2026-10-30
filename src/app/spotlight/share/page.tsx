"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
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
import {
  Share2,
  Trophy,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  UploadCloud,
  FileCheck,
} from "lucide-react";
import { toast } from "sonner";

export default function ShareAchievementPage() {
  const { currentUser, submitItem } = usePortalStore();

  const [fullName, setFullName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState("");
  const [batch, setBatch] = useState(currentUser?.batch ? String(currentUser.batch) : "2018");
  const [course, setCourse] = useState(currentUser?.course || "BCA");
  const [designation, setDesignation] = useState(currentUser?.designation || "");
  const [company, setCompany] = useState(currentUser?.company || "");
  const [category, setCategory] = useState<string>("Promotion");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [fullStory, setFullStory] = useState("");
  const [quote, setQuote] = useState("");
  const [link, setLink] = useState("");
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !title || !summary) {
      toast.error("Please fill in all required fields (Name, Email, Title, Summary).");
      return;
    }

    const payload = {
      alumniName: fullName,
      email,
      phone,
      batch: Number(batch) || 2020,
      course,
      title,
      category: category as any,
      companyOrOrg: company || designation || "Independent",
      summary,
      fullStory: fullStory || summary,
      quote: quote || undefined,
      supportingLink: link || undefined,
      featuredImage: currentUser?.avatarUrl || IMAGES.portraits.p2,
      status: "pending" as const,
    };

    const newId = submitItem("achievement", payload);
    fireConfettiBurst();
    setSubmittedRef(newId);
    toast.success("Achievement submitted successfully for editorial moderation.");
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setTitle("");
    setSummary("");
    setFullStory("");
    setQuote("");
    setLink("");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <PageHero
        title="Share Your Achievement"
        subtitle="Celebrate personal milestones, leadership appointments, venture funding rounds, and awards with your global alumni community."
        eyebrow="Community Spotlight"
        backgroundImage={IMAGES.hero.convocation.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Alumni Spotlight", href: "/spotlight" },
          { label: "Share Your Achievement", href: "/spotlight/share" },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {submittedRef ? (
          <Reveal>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 shadow-xl border border-slate-200/80 dark:border-slate-800">
              <SuccessState
                title="Achievement Submitted for Spotlight!"
                message="Thank you for sharing your milestone with the Poddar network. The Alumni Secretariat review board will review your submission within 2 business days before publishing it to the Spotlight showcase and the quarterly Alumni Newsletter."
                referenceId={submittedRef}
                actionLabel="Submit Another Milestone"
                onAction={handleReset}
                secondaryActionLabel="Explore Alumni Spotlight"
                onSecondaryAction={() => {
                  if (typeof window !== "undefined") {
                    window.location.href = "/spotlight";
                  }
                }}
              />
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <Card className="border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-navy-950 to-navy-900 text-white p-6 sm:p-8 border-b border-amber-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                    Editorial Submission Portal
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold">
                  Tell Us About Your Milestone
                </h2>
                <p className="mt-2 text-sm text-slate-300">
                  Approved submissions are spotlighted on our portal homepage, featured in the
                  quarterly newsletter, and archived in the institutional alumni registry.
                </p>
              </div>

              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Section 1: Alumnus Coordinates */}
                  <div>
                    <h3 className="text-sm font-serif font-bold uppercase tracking-wider text-amber-600 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                      1. Alumnus Credentials
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="alumni-name" className="text-xs font-semibold">
                          Full Name *
                        </Label>
                        <Input
                          id="alumni-name"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Vikramaditya Rathore"
                          className="h-11 text-base sm:text-sm mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="alumni-email" className="text-xs font-semibold">
                          Official / Personal Email *
                        </Label>
                        <Input
                          id="alumni-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. vikram@apexcapital.mock"
                          className="h-11 text-base sm:text-sm mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="alumni-phone" className="text-xs font-semibold">
                          Contact Phone / WhatsApp
                        </Label>
                        <Input
                          id="alumni-phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98290 12345"
                          className="h-11 text-base sm:text-sm mt-1"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="alumni-batch" className="text-xs font-semibold">
                            Graduation Batch *
                          </Label>
                          <Input
                            id="alumni-batch"
                            required
                            type="number"
                            min="1995"
                            max="2026"
                            value={batch}
                            onChange={(e) => setBatch(e.target.value)}
                            className="h-11 text-base sm:text-sm mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="alumni-course" className="text-xs font-semibold">
                            Course / Degree *
                          </Label>
                          <Input
                            id="alumni-course"
                            required
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            placeholder="e.g. MBA, BCA, M.Sc"
                            className="h-11 text-base sm:text-sm mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Current Organization */}
                  <div>
                    <h3 className="text-sm font-serif font-bold uppercase tracking-wider text-amber-600 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                      2. Current Professional Position
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="alumni-designation" className="text-xs font-semibold">
                          Current Designation / Role
                        </Label>
                        <Input
                          id="alumni-designation"
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                          placeholder="e.g. Founder & Managing Director"
                          className="h-11 text-base sm:text-sm mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="alumni-company" className="text-xs font-semibold">
                          Organization / Company / Institution
                        </Label>
                        <Input
                          id="alumni-company"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="e.g. NovaCrest Cloud Solutions"
                          className="h-11 text-base sm:text-sm mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Milestone Details */}
                  <div>
                    <h3 className="text-sm font-serif font-bold uppercase tracking-wider text-amber-600 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                      3. Achievement Highlights
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="category-select" className="text-xs font-semibold">
                          Milestone Category *
                        </Label>
                        <Select value={category} onValueChange={setCategory}>
                          <SelectTrigger id="category-select" className="h-11 text-base sm:text-sm mt-1">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Leadership">Corporate Leadership / C-Suite Promotion</SelectItem>
                            <SelectItem value="Award">National / International Award or Honor</SelectItem>
                            <SelectItem value="Promotion">Senior Executive Appointment</SelectItem>
                            <SelectItem value="Hall of Fame">Venture Funding / Startup Scale</SelectItem>
                            <SelectItem value="General">Media Feature or Publication</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="milestone-title" className="text-xs font-semibold">
                          Headline / Title *
                        </Label>
                        <Input
                          id="milestone-title"
                          required
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="e.g. Promoted to Senior Partner at Global Advisory Network"
                          className="h-11 text-base sm:text-sm mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="milestone-summary" className="text-xs font-semibold">
                          Summary (2-3 Sentences) *
                        </Label>
                        <Textarea
                          id="milestone-summary"
                          required
                          rows={2}
                          value={summary}
                          onChange={(e) => setSummary(e.target.value)}
                          placeholder="Brief overview of the recognition, key metrics, or impact..."
                          className="text-base sm:text-sm mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="milestone-story" className="text-xs font-semibold">
                          In-depth Story / Background
                        </Label>
                        <Textarea
                          id="milestone-story"
                          rows={4}
                          value={fullStory}
                          onChange={(e) => setFullStory(e.target.value)}
                          placeholder="Describe the journey, mentors who helped, technical challenges overcome, and future plans..."
                          className="text-base sm:text-sm mt-1"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="milestone-quote" className="text-xs font-semibold">
                            Inspiring Pull Quote for Students
                          </Label>
                          <Input
                            id="milestone-quote"
                            value={quote}
                            onChange={(e) => setQuote(e.target.value)}
                            placeholder="e.g. Diligence is compound interest for careers."
                            className="h-11 text-base sm:text-sm mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="milestone-link" className="text-xs font-semibold">
                            Press Link / LinkedIn Post / Certificate URL
                          </Label>
                          <Input
                            id="milestone-link"
                            type="url"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="https://..."
                            className="h-11 text-base sm:text-sm mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                    <p className="text-xs text-slate-500">
                      * All submissions undergo standard editorial review by the Alumni Secretariat.
                    </p>
                    <Button
                      type="submit"
                      className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold px-8 h-12"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Submit for Spotlight
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

