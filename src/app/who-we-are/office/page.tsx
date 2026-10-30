"use client";

import React from "react";
import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { IMAGES } from "@/data/images";
import { ALUMNI_OFFICE } from "@/data/office";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  ShieldCheck,
  UserCheck,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

export default function AlumniOfficePage() {
  const office = ALUMNI_OFFICE;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <PageHero
        title="Alumni Secretariat & Office"
        subtitle="Dedicated administrative center managing transcript requests, chapter affiliations, event logistics, and institutional advancement."
        eyebrow="Campus Secretariat"
        backgroundImage={IMAGES.hero.campusMain.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Who We Are", href: "/who-we-are" },
          { label: "Alumni Office", href: "/who-we-are/office" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Leadership Profile Cards */}
        <SectionHeader
          eyebrow="Secretariat Leadership"
          title="Office Directorate"
          description="Stewards of alumni relations, institutional development, and student career programs."
          align="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-16">
          <Reveal>
            <Card className="border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
              <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-amber-500/40 shadow-md">
                <img
                  src={IMAGES.portraits.p2}
                  alt={office.leadership.director}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <Badge variant="outline" className="text-xs mb-1 text-amber-600 border-amber-500/40">
                  Directorate
                </Badge>
                <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100">
                  {office.leadership.director}
                </h3>
                <div className="text-xs sm:text-sm text-amber-600 font-semibold mt-0.5">
                  {office.leadership.designation}
                </div>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Oversees alumni chapter partnerships, institutional grants, academic MoUs, and alumni engagement strategy.
                </p>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.08}>
            <Card className="border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
              <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-amber-500/40 shadow-md">
                <img
                  src={IMAGES.portraits.p1}
                  alt={office.leadership.secretary}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <Badge variant="outline" className="text-xs mb-1 text-blue-600 border-blue-500/40">
                  Secretariat Operations
                </Badge>
                <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100">
                  {office.leadership.secretary}
                </h3>
                <div className="text-xs sm:text-sm text-blue-600 font-semibold mt-0.5">
                  {office.leadership.secretaryDesignation}
                </div>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Heads day-to-day administrative operations, transcript verifications, event pass logistics, and portal support queries.
                </p>
              </div>
            </Card>
          </Reveal>
        </div>

        {/* Operational Coordinates & Campus Location Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Contact Details Card */}
          <Reveal>
            <Card className="border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 h-full p-6 sm:p-8 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100">
                      Physical Headquarters
                    </h4>
                    <p className="text-xs text-slate-500">{office.department}</p>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100">
                        {office.institution}
                      </div>
                      <div>{office.address.line1}, {office.address.line2}</div>
                      <div>{office.address.city}, {office.address.state} — {office.address.pincode}, {office.address.country}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-amber-600 shrink-0 mt-1" />
                    <div className="space-y-1">
                      <div>
                        <span className="text-xs text-slate-500">Primary Desk: </span>
                        <a href={`tel:${office.contact.phonePrimary.replace(/\s/g, "")}`} className="font-medium hover:text-amber-600">
                          {office.contact.phonePrimary}
                        </a>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500">Secondary: </span>
                        <a href={`tel:${office.contact.phoneSecondary.replace(/\s/g, "")}`} className="font-medium hover:text-amber-600">
                          {office.contact.phoneSecondary}
                        </a>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500">Toll Free Helpline: </span>
                        <span className="font-mono font-bold text-amber-600">{office.contact.tollFree}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-amber-600 shrink-0 mt-1" />
                    <div className="space-y-1">
                      <div>
                        <span className="text-xs text-slate-500">General: </span>
                        <a href={`mailto:${office.contact.emailGeneral}`} className="font-medium hover:text-amber-600">
                          {office.contact.emailGeneral}
                        </a>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500">Helpdesk: </span>
                        <a href={`mailto:${office.contact.emailHelpdesk}`} className="font-medium hover:text-amber-600">
                          {office.contact.emailHelpdesk}
                        </a>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500">Transcripts: </span>
                        <a href={`mailto:${office.contact.emailTranscripts}`} className="font-medium hover:text-amber-600">
                          {office.contact.emailTranscripts}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <Button asChild className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold">
                  <a href={`mailto:${office.contact.emailGeneral}`}>
                    <Mail className="w-4 h-4 mr-2" />
                    Email Secretariat
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/help-desk">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Visit Help Desk
                  </Link>
                </Button>
              </div>
            </Card>
          </Reveal>

          {/* Campus Map & Hours Card */}
          <Reveal delay={0.08}>
            <Card className="border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 h-full p-6 sm:p-8 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100">
                      Visiting & Consultation Hours
                    </h4>
                    <p className="text-xs text-slate-500">In-person campus alumni visits</p>
                  </div>
                </div>

                <div className="space-y-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl text-xs sm:text-sm">
                  <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Monday — Friday:</span>
                    <span className="text-slate-600 dark:text-slate-400">{office.hours.weekdays}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Saturday:</span>
                    <span className="text-slate-600 dark:text-slate-400">{office.hours.saturday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Sunday:</span>
                    <span className="text-rose-600 font-medium">{office.hours.sunday}</span>
                  </div>
                </div>

                {/* Map Card Mock / Locator */}
                <div className="mt-6 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 aspect-[16/9] relative bg-slate-100 dark:bg-slate-800 flex items-center justify-center group">
                  <img
                    src={IMAGES.campus[0].src}
                    alt="Campus Locator"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-navy-950/40 backdrop-blur-[1px] flex flex-col items-center justify-center p-4 text-center text-white">
                    <MapPin className="w-8 h-8 text-amber-400 animate-bounce mb-1" />
                    <div className="text-sm font-bold font-serif">Poddar Campus Quadrangle</div>
                    <div className="text-xs text-slate-200">Mansarovar, Jaipur, Rajasthan 302020</div>
                    <a
                      href="https://maps.google.com/?q=Poddar+Group+of+Institutions+Jaipur"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-xs font-semibold bg-white/90 text-navy-950 px-3 py-1.5 rounded-full hover:bg-amber-400 transition-colors"
                    >
                      Open in Google Maps
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-xs text-slate-500 text-center">
                Visiting alumni receive priority guest parking and campus tour assistance at Main Gate 1.
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

