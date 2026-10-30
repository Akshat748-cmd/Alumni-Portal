import React from "react";
import Link from "next/link";
import {
  FileText,
  Calendar,
  UserCheck,
  MessageSquare,
  PhoneCall,
  Mail,
  Clock,
  ArrowRight,
  HelpCircle,
  ShieldAlert,
  Search,
  CheckCircle2,
  Ticket,
} from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { ALUMNI_OFFICE } from "@/data/office";
import { HELP_DESK_RESPONSE_PROMISE } from "@/components/common/TicketSuccessState";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata = {
  title: "Help Desk | Poddar Alumni Portal",
  description: "Official institutional help desk for Poddar alumni. Transcripts, degree verification, event inquiries, and profile support.",
};

const CATEGORIES = [
  {
    title: "Submit a Query / Request",
    href: "/help-desk/query",
    icon: HelpCircle,
    badge: "General Assistance",
    description: "Submit an inquiry regarding alumni programs, chapter activities, or general administrative guidance.",
    action: "Open Query Form",
  },
  {
    title: "Certificate & Document Assistance",
    href: "/help-desk/documents",
    icon: FileText,
    badge: "Academic Records",
    description: "Request official transcripts, provisional certificates, degree duplicate verification, and migration letters.",
    action: "Request Documents",
  },
  {
    title: "Event Queries",
    href: "/help-desk/events",
    icon: Calendar,
    badge: "Reunions & Meets",
    description: "Questions regarding upcoming batch homecomings, webinar access links, delegate passes, or accommodations.",
    action: "Ask About Events",
  },
  {
    title: "Profile Update Assistance",
    href: "/help-desk/profile-support",
    icon: UserCheck,
    badge: "Identity & Verification",
    description: "Resolve discrepancy issues with your graduation batch, course credentials, or primary registered email address.",
    action: "Update Profile",
  },
  {
    title: "Suggestions & Feedback",
    href: "/help-desk/feedback",
    icon: MessageSquare,
    badge: "Community Voice",
    description: "Help us elevate portal features, propose new regional alumni chapters, or share recommendations with the Secretariat.",
    action: "Share Feedback",
  },
  {
    title: "Contact Alumni Office",
    href: "/help-desk/contact",
    icon: PhoneCall,
    badge: "Campus Secretariat",
    description: "Schedule a campus visit, request an executive callback from the Director, or connect with association leadership.",
    action: "Contact Office",
  },
];

const FAQS = [
  {
    q: "How do I request official sealed transcripts for overseas university admissions?",
    a: "Navigate to 'Certificate & Document Assistance' and select 'Transcript Request'. Provide your graduation batch, degree program, and recipient university address. Official transcripts are stamped, sealed, and dispatched via registered courier or secure WES-compatible digital portal within 5–7 working days.",
  },
  {
    q: "What is the typical turnaround time for help desk tickets?",
    a: "As part of our institutional service charter, our team acknowledges and reviews all incoming tickets within 2 working days. Urgent document verification requests are prioritized.",
  },
  {
    q: "How can I update my corporate designation and new city location in the Alumni Directory?",
    a: "You can update your current employment directly via the 'Update My Profile' page when logged in. Alternatively, submit a 'Profile Update Assistance' ticket with your updated business card or LinkedIn link.",
  },
  {
    q: "Can I attend batch reunions if I am not an active life member?",
    a: "Yes. All Poddar alumni, regardless of optional membership tiers, are cordially welcomed at annual campus homecomings, webinars, and regional gatherings. Membership provides priority seating and discounted event passes.",
  },
  {
    q: "How do I volunteer to mentor pre-final year students?",
    a: "Visit the Career Hub and complete the 'Become a Mentor' application. Once verified by the Alumni Affairs Committee, your mentor profile will appear in the 1-on-1 directory.",
  },
  {
    q: "Where is the physical Alumni Office located on campus?",
    a: "The Alumni Relations & Career Secretariat is located on the Ground Floor of the Administrative Block, Poddar Campus, Sector 7, Shipra Path, Mansarovar, Jaipur. Visitors are welcome during official weekday hours.",
  },
  {
    q: "Can alumni post job openings and hire Poddar students?",
    a: "Absolutely. Alumni employers and HR leaders can post vacancies via the 'Post an Opportunity' form or collaborate with the Training & Placement Cell for dedicated campus recruitment drives.",
  },
];

export default function HelpDeskPage() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <PageHero
        eyebrow="STUDENT & ALUMNI SUPPORT • CONCIERGE"
        title="Alumni Help Desk & Services"
        subtitle="Dedicated administrative assistance for transcripts, academic credentials, batch reunions, and network queries."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Help Desk" },
        ]}
      />

      {/* COMMITMENT STRIP */}
      <section className="bg-navy-950 py-4 text-ivory border-b border-navy-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-gold-300 font-semibold">
              <Clock className="h-4 w-4" />
              <span>Service Charter Guarantee: {HELP_DESK_RESPONSE_PROMISE}.</span>
            </div>

            <Link
              href="/help-desk/tickets"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-800 text-gold-300 font-semibold text-xs border border-navy-700 hover:bg-navy-700 transition-colors"
            >
              <Ticket className="h-3.5 w-3.5" />
              <span>Track Your Existing Tickets</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* SIX HELP DESK CATEGORY CARDS */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader
            eyebrow="SUPPORT CHANNELS"
            title="How Can the Alumni Secretariat Help You?"
            subtitle="Choose a specialized assistance stream below for expedited handling and tracking."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
            {CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <Reveal key={cat.title} delay={idx * 0.08}>
                  <TiltCard className="h-full">
                    <div className="h-full flex flex-col justify-between p-6 sm:p-8 bg-white rounded-3xl border border-line hover:border-gold-500/50 hover:shadow-xl transition-all duration-300">
                      <div>
                        <div className="flex items-center justify-between mb-5">
                          <div className="h-12 w-12 rounded-2xl bg-navy-950 flex items-center justify-center text-gold-400 shadow-md">
                            <Icon className="h-6 w-6" />
                          </div>
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-navy-50 text-navy-900 border border-navy-200">
                            {cat.badge}
                          </span>
                        </div>

                        <h3 className="text-xl font-serif font-bold text-navy-950 mb-2">
                          {cat.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6">
                          {cat.description}
                        </p>
                      </div>

                      <Link
                        href={cat.href}
                        className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-navy-950 text-gold-300 font-semibold text-xs sm:text-sm hover:bg-navy-900 transition-colors group"
                      >
                        <span>{cat.action}</span>
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

      {/* DIRECT CONTACT & HOURS BAND */}
      <section className="py-16 bg-navy-950 text-ivory border-y border-navy-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-wider mb-2 block">
                Direct Contact Points
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">
                Poddar Alumni Office Coordinates
              </h2>
              <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed mb-6">
                Prefer to connect over phone or visit us in person? Our campus secretariat staff is ready to assist you during regular operational hours.
              </p>

              <div className="space-y-4">
                {/* TAP TO CALL */}
                <a
                  href={`tel:${ALUMNI_OFFICE.contact.phonePrimary.replace(/\s+/g, "")}`}
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-navy-900 border border-navy-800 hover:border-gold-500/50 transition-colors text-ivory group"
                >
                  <div className="h-10 w-10 rounded-xl bg-gold-500/20 text-gold-300 flex items-center justify-center shrink-0">
                    <PhoneCall className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-ivory/60">Phone Support (Tap to Call)</div>
                    <div className="text-sm font-bold text-white group-hover:text-gold-300 transition-colors">
                      {ALUMNI_OFFICE.contact.phonePrimary} / {ALUMNI_OFFICE.contact.phoneSecondary}
                    </div>
                  </div>
                </a>

                {/* TAP TO EMAIL */}
                <a
                  href={`mailto:${ALUMNI_OFFICE.contact.emailHelpdesk}`}
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-navy-900 border border-navy-800 hover:border-gold-500/50 transition-colors text-ivory group"
                >
                  <div className="h-10 w-10 rounded-xl bg-gold-500/20 text-gold-300 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-ivory/60">Official Help Desk Email (Tap to Email)</div>
                    <div className="text-sm font-bold text-white group-hover:text-gold-300 transition-colors">
                      {ALUMNI_OFFICE.contact.emailHelpdesk}
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* OPERATING HOURS & LOCATION */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-navy-900 border border-navy-800">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-gold-400" />
                <span>Office Hours & In-Person Walk-ins</span>
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-ivory/80">
                <div className="flex justify-between pb-2 border-b border-navy-800">
                  <span className="font-semibold text-white">Monday – Friday:</span>
                  <span>{ALUMNI_OFFICE.hours.weekdays}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-navy-800">
                  <span className="font-semibold text-white">Saturday:</span>
                  <span>{ALUMNI_OFFICE.hours.saturday}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-navy-800">
                  <span className="font-semibold text-white">Sunday & Holidays:</span>
                  <span>{ALUMNI_OFFICE.hours.sunday}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-navy-800 text-xs text-ivory/70">
                <strong className="text-white block mb-1">Campus Location:</strong>
                {ALUMNI_OFFICE.address.line1}, {ALUMNI_OFFICE.address.line2}, {ALUMNI_OFFICE.address.city}, {ALUMNI_OFFICE.address.state} {ALUMNI_OFFICE.address.pincode}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS ACCORDION */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <SectionHeader
            eyebrow="KNOWLEDGE REPOSITORY"
            title="Frequently Asked Help Desk Questions"
            subtitle="Immediate answers to standard inquiries concerning certificates, degree dispatch, reunions, and profile verification."
            align="center"
          />

          <div className="mt-12 bg-ivory rounded-3xl p-6 sm:p-8 border border-line">
            <Accordion className="w-full space-y-3">
              {FAQS.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="bg-white rounded-2xl border border-line px-5 py-2 shadow-sm"
                >
                  <AccordionTrigger className="text-sm sm:text-base font-bold text-navy-950 text-left hover:no-underline py-3">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-muted leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}
