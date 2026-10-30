import React from "react";
import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { UserCheck, ShieldCheck, Award, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Join the Network | Poddar Alumni Portal",
  description: "Become a verified member of the global Poddar Alumni Network. Connect, collaborate, and access executive career privileges.",
};

const BENEFITS = [
  "Verified directory listing in the global 260+ alumni registry",
  "Direct professional networking & mentorship connections",
  "Priority access to alumni job referrals and hiring pipelines",
  "Invitations to annual batch homecomings and regional chapters",
  "Continuous learning fee waivers on executive programs",
  "Official institutional transcripts and credential verification assistance",
];

const JOIN_PILLARS = [
  {
    title: "Register or Login",
    badge: "Step 1",
    href: "/join/auth",
    icon: UserCheck,
    description: "Claim your verified alumni profile or access your existing portal credentials to connect with classmates.",
    action: "Access Authentication",
  },
  {
    title: "Update My Profile",
    badge: "Step 2",
    href: "/join/profile",
    icon: ShieldCheck,
    description: "Keep your corporate designation, domain tags, city, and bio updated for peer discovery and hiring.",
    action: "Manage Profile",
  },
  {
    title: "Membership Tiers",
    badge: "Optional",
    href: "/join/membership",
    icon: Award,
    description: "Explore voluntary life membership tiers, patron circles, and institutional advisory privileges.",
    action: "View Membership",
  },
];

export default function JoinNetworkPage() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <PageHero
        eyebrow="ALUMNI ENROLLMENT • GATEWAY"
        title="Join the Poddar Alumni Network"
        subtitle="Unite with alumni across technology, finance, business, creative arts, and healthcare. Keep your connection alive and shape future generations."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Join the Network" },
        ]}
      />

      {/* THREE ACTION PILLARS */}
      <section className="py-16 md:py-24 bg-white border-b border-line">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="ONBOARDING CHANNELS"
            title="How Would You Like to Proceed?"
            subtitle="Choose your onboarding path below to register a new profile, refresh existing records, or review membership tiers."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12 max-w-6xl mx-auto">
            {JOIN_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={pillar.title} delay={idx * 0.1}>
                  <TiltCard className="h-full">
                    <div className="h-full flex flex-col justify-between p-6 sm:p-8 bg-ivory/60 rounded-2xl border border-line hover:border-gold-500/50 hover:shadow-xl transition-all duration-300">
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <div className="h-12 w-12 rounded-xl bg-navy-950 flex items-center justify-center text-gold-400 shadow-md">
                            <Icon className="h-6 w-6 text-gold-400" />
                          </div>
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-navy-950/5 text-navy-900 border border-navy-950/10">
                            {pillar.badge}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold font-serif text-navy-950 mb-3">
                          {pillar.title}
                        </h3>
                        <p className="text-sm text-muted leading-relaxed mb-6">
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

      {/* WHY JOIN SECTION */}
      <section className="py-16 md:py-24 bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="bg-navy-950 rounded-3xl p-8 sm:p-12 text-ivory relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-semibold mb-4 border border-gold-500/30">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Institutional Charter Privileges</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ivory mb-4">
                  Why Keep Your Alumni Enrollment Active?
                </h2>
                <p className="text-sm text-ivory/80 leading-relaxed mb-6">
                  The Poddar Alumni Network is a lifelong professional family. By remaining actively enrolled, you bridge the gap between academic heritage and industry leadership.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {BENEFITS.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-gold-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-ivory/90 leading-tight">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-navy-900/80 rounded-2xl border border-navy-800 text-center">
                <div className="text-3xl sm:text-4xl font-serif font-bold text-gold-400 mb-1">
                  100% Free
                </div>
                <div className="text-xs uppercase tracking-wider text-ivory/70 font-semibold mb-4">
                  Basic Enrollment Always Free
                </div>
                <p className="text-xs text-ivory/60 mb-6 max-w-xs">
                  Membership fees are completely optional. Every Poddar graduate has lifetime free access to directory discovery and official campus assistance.
                </p>
                <Link
                  href="/join/auth"
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 text-navy-950 font-bold text-sm shadow-lg hover:brightness-105 transition-all text-center"
                >
                  Register in 2 Minutes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
