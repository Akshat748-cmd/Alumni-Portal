import React from "react";
import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import {
  Briefcase,
  PlusCircle,
  GraduationCap,
  Users,
  Award,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Building,
  Sparkles,
  MessageSquare,
  FileText,
  Zap,
} from "lucide-react";

export const metadata = {
  title: "Career Hub | Poddar Alumni Portal",
  description: "Accelerate your career through alumni job postings, executive referrals, upskilling masterclasses, and 1-on-1 mentorship.",
};

const OPPORTUNITIES_NETWORK_CARDS = [
  {
    title: "Jobs & Internships",
    badge: "Live Openings",
    isNew: true,
    href: "/career-hub/jobs",
    icon: Briefcase,
    description: "Browse vacancies and corporate internships posted by verified alumni with internal referral slots and instant application routing.",
    action: "Explore Opportunities",
    color: "from-blue-600 to-indigo-700",
  },
  {
    title: "Post an Opportunity",
    badge: "Alumni Hiring",
    isNew: true,
    href: "/career-hub/post",
    icon: PlusCircle,
    description: "Hire trusted talent from Poddar Institutions. Post full-time roles, internships, or contract openings with direct applicant screening.",
    action: "Post an Opening",
    color: "from-navy-900 to-navy-950",
  },
  {
    title: "Applications & Referrals",
    badge: "Candidate Center",
    isNew: true,
    href: "/dashboard/applications",
    icon: FileText,
    description: "Track your active job applications, check real-time status timelines, and manage internal referral requests and alumni chats.",
    action: "Open Dashboard",
    color: "from-amber-600 to-amber-700",
  },
];

const CAREER_PILLARS = [
  {
    title: "Learning & Upskilling",
    badge: "Alumni Perks",
    href: "/career-hub/upskilling",
    icon: GraduationCap,
    description: "Executive certificates, weekend masterclasses, and specialized skills programs with up to 50% tuition waiver for Poddar graduates.",
    action: "Explore Courses",
  },
  {
    title: "Find a Mentor",
    badge: "1-on-1 Guidance",
    href: "/career-hub/find-mentor",
    icon: Users,
    description: "Connect directly with senior alumni directors and specialists across 7 domains for resume audits, interview prep, and career strategy.",
    action: "Search Mentors",
  },
  {
    title: "Become a Mentor",
    badge: "Give Back",
    href: "/career-hub/become-mentor",
    icon: Award,
    description: "Share your industry journey with recent graduates and pre-final year students. Host 1–2 virtual advising sessions per month.",
    action: "Mentor Application",
  },
];

const STATS = [
  { label: "Active Alumni Roles", value: "35+" },
  { label: "Partner Enterprises", value: "80+" },
  { label: "Executive Mentors", value: "24+" },
  { label: "Referral Placement Rate", value: "92%" },
];

export default function CareerHubPage() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <PageHero
        eyebrow="PROFESSIONAL MOBILITY & EXCELLENCE"
        title="Poddar Alumni Career Hub"
        subtitle="Empowering your lifelong career trajectory through trusted peer networks, exclusive hiring referrals, executive upskilling, and dedicated domain mentorship."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Career Hub" },
        ]}
      />

      {/* STATS BANNER */}
      <section className="bg-navy-950 py-6 sm:py-7 text-ivory border-b border-navy-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {STATS.map((stat, i) => (
              <div key={i} className="p-2 sm:p-2.5">
                <div className="text-[24px] sm:text-[28px] font-sans font-semibold text-gold-400 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-[11px] sm:text-xs text-ivory/70 font-semibold uppercase tracking-wider mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED: OPPORTUNITIES NETWORK (BONUS MODULE) */}
      <section className="py-10 md:py-14 bg-gradient-to-b from-ivory via-white to-ivory border-b border-line">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-900 border border-amber-300 mb-1.5">
                <Sparkles className="h-3 w-3 text-amber-600" />
                <span>Opportunities Network • New Module</span>
              </div>
              <h2 className="text-[22px] sm:text-[26px] font-sans font-semibold text-navy-950">
                Alumni-Student Hiring & Referral Loop
              </h2>
              <p className="text-xs sm:text-[13px] text-muted mt-0.5 max-w-[62ch]">
                Alumni post vacancies, enrolled students and alumni apply directly, verified referrals unlock corporate interviews, and built-in chat connects candidates with sponsors.
              </p>
            </div>
            <Link
              href="/career-hub/jobs"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-950 hover:text-gold-600 transition-colors"
            >
              <span>Explore All Jobs</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {OPPORTUNITIES_NETWORK_CARDS.map((card, idx) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.title} delay={idx * 0.08}>
                  <div className="h-full flex flex-col justify-between p-4 sm:p-5 bg-white rounded-xl border border-line hover:border-gold-500/50 hover:shadow-md transition-all duration-300 relative group overflow-hidden shadow-xs">
                    <div className="absolute top-3.5 right-3.5 flex items-center gap-1">
                      <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-gold-400 text-navy-950 shadow-xs">
                        New
                      </span>
                    </div>

                    <div>
                      <div className="h-10 w-10 rounded-xl bg-navy-950 flex items-center justify-center text-gold-400 shadow-xs mb-3.5 group-hover:scale-105 transition-transform">
                        <Icon className="h-5 w-5 text-gold-400" />
                      </div>
                      <div className="text-[11px] font-semibold text-gold-700 uppercase tracking-wider mb-1">
                        {card.badge}
                      </div>
                      <h3 className="text-[17px] sm:text-[18px] font-semibold font-sans text-navy-950 mb-1.5">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-muted leading-relaxed mb-4">
                        {card.description}
                      </p>
                    </div>

                    <Link
                      href={card.href}
                      className="inline-flex items-center justify-between w-full px-3.5 py-2.5 rounded-lg bg-navy-950 text-gold-300 font-semibold text-xs sm:text-sm hover:bg-navy-900 transition-colors group"
                    >
                      <span>{card.action}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 text-gold-400" />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTINUING CAREER SERVICES */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <SectionHeader
            eyebrow="UPSKILLING & GUIDANCE"
            title="Professional Development & Mentorship"
            subtitle="Deepen your domain expertise through curated courses and 1-on-1 advisory sessions with industry veterans."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mt-7">
            {CAREER_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={pillar.title} delay={idx * 0.08}>
                  <TiltCard className="h-full">
                    <div className="h-full flex flex-col justify-between p-4 sm:p-5 bg-white rounded-xl border border-line hover:border-gold-500/50 hover:shadow-md transition-all duration-300 shadow-xs">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="h-10 w-10 rounded-xl bg-navy-950 flex items-center justify-center text-gold-400 shadow-xs">
                            <Icon className="h-5 w-5 text-gold-400" />
                          </div>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-gold-500/15 text-navy-900 border border-gold-500/30">
                            {pillar.badge}
                          </span>
                        </div>
                        <h3 className="text-[17px] sm:text-[18px] font-semibold font-sans text-navy-950 mb-1.5">
                          {pillar.title}
                        </h3>
                        <p className="text-xs sm:text-[13px] text-muted leading-relaxed mb-4">
                          {pillar.description}
                        </p>
                      </div>

                      <Link
                        href={pillar.href}
                        className="inline-flex items-center justify-between w-full px-3.5 py-2.5 rounded-lg bg-ivory border border-line text-navy-900 font-semibold text-xs sm:text-sm hover:bg-navy-50 transition-colors group"
                      >
                        <span>{pillar.action}</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 text-gold-600" />
                      </Link>
                    </div>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
