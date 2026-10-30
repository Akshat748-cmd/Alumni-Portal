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
} from "lucide-react";

export const metadata = {
  title: "Career Hub | Poddar Alumni Portal",
  description: "Accelerate your career through alumni job postings, executive referrals, upskilling masterclasses, and 1-on-1 mentorship.",
};

const CAREER_PILLARS = [
  {
    title: "Jobs & Internships",
    badge: "Direct Hiring",
    href: "/career-hub/jobs",
    icon: Briefcase,
    description: "Discover curated corporate vacancies and summer internships posted by alumni in top multinational and homegrown companies.",
    action: "Browse Vacancies",
  },
  {
    title: "Post an Opportunity",
    badge: "For Employers",
    href: "/career-hub/post",
    icon: PlusCircle,
    description: "Hire trusted, ethical talent from your alma mater. List open full-time positions, internships, or freelance consulting projects.",
    action: "List an Opening",
  },
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
  { label: "Course Tuition Relief", value: "Up to 50%" },
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
      <section className="bg-navy-950 py-8 text-ivory border-b border-navy-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((stat, i) => (
              <div key={i} className="p-3">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-gold-400">
                  {stat.value}
                </div>
                <div className="text-xs text-ivory/70 font-semibold uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS GRID */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <SectionHeader
            eyebrow="CAREER SERVICES"
            title="Comprehensive Career Ecosystem"
            subtitle="Whether you are searching for your next leadership role, looking to mentor, or upskilling with cutting-edge credentials."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
            {CAREER_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={pillar.title} delay={idx * 0.08}>
                  <TiltCard className="h-full">
                    <div className="h-full flex flex-col justify-between p-6 sm:p-8 bg-white rounded-3xl border border-line hover:border-gold-500/50 hover:shadow-xl transition-all duration-300">
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <div className="h-12 w-12 rounded-2xl bg-navy-950 flex items-center justify-center text-gold-400 shadow-md">
                            <Icon className="h-6 w-6 text-gold-400" />
                          </div>
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gold-500/15 text-navy-900 border border-gold-500/30">
                            {pillar.badge}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold font-serif text-navy-950 mb-3">
                          {pillar.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6">
                          {pillar.description}
                        </p>
                      </div>

                      <Link
                        href={pillar.href}
                        className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-navy-950 text-gold-300 font-semibold text-sm hover:bg-navy-900 transition-colors group"
                      >
                        <span>{pillar.action}</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-gold-400" />
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
