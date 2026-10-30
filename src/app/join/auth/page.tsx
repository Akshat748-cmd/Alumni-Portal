"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  AlertCircle,
  LogIn,
  UserPlus,
  ArrowRight,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Sparkles,
  LogOut,
  User,
} from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { fireConfettiBurst } from "@/components/motion/ConfettiBurst";
import { AvatarInitials } from "@/components/common/AvatarInitials";
import { usePortalStore } from "@/store/portal";
import { DomainCategory } from "@/data/types";

const DOMAINS: DomainCategory[] = [
  "IT & Technology",
  "Finance & Banking",
  "Business & Entrepreneurship",
  "Marketing & Advertising",
  "Education",
  "Healthcare",
  "Jewellery & Fashion",
];

const COURSES = [
  "BCA (Computer Applications)",
  "MCA (Master of Computer Applications)",
  "BBA (Business Administration)",
  "MBA (Finance & Strategy)",
  "MBA (Marketing & Analytics)",
  "B.Sc (Biotechnology)",
  "M.Sc (Biotechnology / IT)",
  "B.Com (Honours)",
  "Jewellery Design Diploma",
  "Other Degree / Diploma",
];

const BATCH_YEARS = Array.from({ length: 22 }, (_, i) => 2026 - i);

export default function AuthPage() {
  const router = useRouter();
  const { currentUser, login, logout, submitItem } = usePortalStore();

  const [activeTab, setActiveTab] = useState<"register" | "login">("register");

  // Registration form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regCourse, setRegCourse] = useState(COURSES[0]);
  const [regBatch, setRegBatch] = useState("2024");
  const [regCompany, setRegCompany] = useState("");
  const [regDesignation, setRegDesignation] = useState("");
  const [regCity, setRegCity] = useState("");
  const [regLinkedIn, setRegLinkedIn] = useState("");
  const [selectedDomains, setSelectedDomains] = useState<DomainCategory[]>(["IT & Technology"]);
  const [regConsent, setRegConsent] = useState(false);

  // Field touch/dirty tracking
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [regSubmitted, setRegSubmitted] = useState(false);
  const [registeredId, setRegisteredId] = useState<string | null>(null);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("vikram.rathore@acmecorp.mock");
  const [loginPassword, setLoginPassword] = useState("alumni2026");
  const [loginError, setLoginError] = useState("");

  // Validation checks
  const isNameValid = regName.trim().length >= 3;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail.trim());
  const isPhoneValid = regPhone.replace(/\D/g, "").length >= 10;
  const isCompanyValid = regCompany.trim().length >= 2;
  const isDesignationValid = regDesignation.trim().length >= 2;
  const isCityValid = regCity.trim().length >= 2;
  const isLinkedInValid =
    regLinkedIn.trim().length === 0 ||
    /^https?:\/\/(www\.)?linkedin\.com\/.*$/i.test(regLinkedIn.trim());
  const isDomainValid = selectedDomains.length > 0;
  const isConsentValid = regConsent;

  // Active validation error messages
  const errors: string[] = [];
  if (!isNameValid) errors.push("Full name must be at least 3 characters");
  if (!isEmailValid) errors.push("Valid email address is required");
  if (!isPhoneValid) errors.push("Valid phone number is required (at least 10 digits)");
  if (!isCompanyValid) errors.push("Current organization / enterprise is required");
  if (!isDesignationValid) errors.push("Current professional title is required");
  if (!isCityValid) errors.push("City is required");
  if (!isLinkedInValid) errors.push("LinkedIn URL must start with http:// or https://linkedin.com/");
  if (!isDomainValid) errors.push("Select at least 1 industry domain tag");
  if (!isConsentValid) errors.push("You must acknowledge the alumni directory consent");

  const toggleDomain = (domain: DomainCategory) => {
    if (selectedDomains.includes(domain)) {
      if (selectedDomains.length > 1) {
        setSelectedDomains(selectedDomains.filter((d) => d !== domain));
      } else {
        toast.error("Please keep at least one industry vertical selected");
      }
    } else {
      setSelectedDomains([...selectedDomains, domain]);
    }
  };

  const markTouched = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (errors.length > 0) {
      toast.error(`Please correct the ${errors.length} highlighted error(s) before submitting.`);
      return;
    }

    const payload = {
      name: regName.trim(),
      email: regEmail.trim(),
      phone: regPhone.trim(),
      course: regCourse,
      batch: Number(regBatch),
      company: regCompany.trim(),
      designation: regDesignation.trim(),
      city: regCity.trim(),
      country: "India",
      domain: selectedDomains[0],
      domainTags: selectedDomains,
      expertiseTags: selectedDomains,
      linkedInUrl: regLinkedIn.trim() || `https://linkedin.com/in/mock-${regName.toLowerCase().replace(/\s+/g, "-")}`,
      bio: `${regDesignation.trim()} at ${regCompany.trim()}, ${regCourse} Class of ${regBatch}.`,
      consentGranted: true,
    };

    const id = submitItem("registration", payload);
    setRegisteredId(id);
    setRegSubmitted(true);
    fireConfettiBurst();
    toast.success("Registration received! Sent to the Secretariat moderation queue.");
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!loginEmail.includes("@")) {
      setLoginError("Please enter a valid email address");
      return;
    }
    if (loginPassword.length < 4) {
      setLoginError("Password must be at least 4 characters");
      return;
    }

    // Demo authentication: accept any credentials, construct/find user
    login({
      id: `usr-${Date.now()}`,
      name: loginEmail.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "Alumni Member",
      email: loginEmail.trim(),
      role: "alumni",
      batch: 2018,
      course: "MBA (Finance & Strategy)",
    });

    toast.success("Signed in successfully! Welcome back to Poddar Alumni Portal.");
    router.push("/join/profile");
  };

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <PageHero
        eyebrow="ALUMNI IDENTITY GATEWAY"
        title="Alumni Registration & Sign In"
        subtitle="Access your verified alumni credentials, update your professional footprint, and tap into global opportunities."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Join the Network", href: "/join" },
          { label: "Register / Login" },
        ]}
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* ALREADY SIGNED IN CARD */}
          {currentUser ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 sm:p-12 border border-line shadow-xl text-center max-w-2xl mx-auto"
            >
              <div className="inline-flex p-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 mb-6">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy-950 mb-2">
                You Are Currently Signed In
              </h2>
              <p className="text-sm text-muted mb-8">
                Your portal session is active. You can review your profile information or explore the global verified directory.
              </p>

              <div className="flex items-center justify-center gap-4 p-4 rounded-2xl bg-ivory/80 border border-line max-w-md mx-auto mb-8 text-left">
                <AvatarInitials name={currentUser.name} src={currentUser.avatarUrl} size="lg" />
                <div>
                  <div className="text-base font-bold text-navy-950">{currentUser.name}</div>
                  <div className="text-xs text-muted truncate">{currentUser.email}</div>
                  {currentUser.batch && (
                    <div className="text-xs font-semibold text-gold-600 mt-0.5">
                      Class of {currentUser.batch} • {currentUser.course || "Verified Alumnus"}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/join/profile"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-navy-950 text-gold-300 font-semibold text-sm hover:bg-navy-900 transition-colors shadow-md"
                >
                  <User className="h-4 w-4" />
                  <span>Update My Profile</span>
                </Link>
                <Link
                  href="/directory/search"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-ivory border border-line text-navy-900 font-semibold text-sm hover:bg-navy-50 transition-colors"
                >
                  <Briefcase className="h-4 w-4" />
                  <span>Browse Directory</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    toast.info("Logged out from Poddar Alumni Network");
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-red-50 text-red-700 border border-red-200 font-semibold text-sm hover:bg-red-100 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.div>
          ) : regSubmitted ? (
            /* REGISTRATION SUCCESS STATE WITH CONFETTI */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-8 sm:p-12 border border-line shadow-2xl text-center relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="inline-flex p-4 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 mb-6">
                  <Sparkles className="h-10 w-10 text-emerald-600" />
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
                  Enrollment Submitted
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy-950 mb-3">
                  Welcome to the Poddar Alumni Family!
                </h2>
                <p className="text-sm sm:text-base text-muted max-w-xl mx-auto mb-6 leading-relaxed">
                  Your profile has been transmitted to the Poddar Alumni Secretariat. To maintain directory authenticity, newly registered profiles undergo automated roster cross-verification and admin approval within 24–48 hours.
                </p>

                {registeredId && (
                  <div className="inline-block px-4 py-2 rounded-xl bg-navy-50 border border-navy-200 text-xs text-navy-900 font-mono mb-8">
                    Application Tracking Reference: <span className="font-bold text-gold-600">{registeredId}</span>
                  </div>
                )}

                <div className="p-4 rounded-2xl bg-ivory border border-line text-left max-w-md mx-auto mb-8 space-y-2 text-xs text-muted">
                  <div className="flex justify-between">
                    <span className="font-semibold text-navy-950">Name:</span>
                    <span>{regName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-navy-950">Batch & Course:</span>
                    <span>{regBatch} • {regCourse}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-navy-950">Organization:</span>
                    <span>{regCompany} ({regDesignation})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-navy-950">Moderation Status:</span>
                    <span className="font-bold text-amber-600">Pending Admin Verification</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setRegSubmitted(false);
                      setSubmitAttempted(false);
                      setActiveTab("login");
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-navy-950 text-gold-300 font-bold text-sm hover:bg-navy-900 transition-colors shadow-md"
                  >
                    Go to Sign In
                  </button>
                  <Link
                    href="/directory/search"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-ivory border border-line text-navy-900 font-semibold text-sm hover:bg-navy-50 transition-colors"
                  >
                    Explore Public Directory
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : (
            /* TABBED AUTH CONTAINER */
            <div className="bg-white rounded-3xl border border-line shadow-xl overflow-hidden">
              {/* TAB SELECTOR */}
              <div className="grid grid-cols-2 p-2 bg-ivory/80 border-b border-line">
                <button
                  type="button"
                  onClick={() => setActiveTab("register")}
                  className={`relative py-3.5 text-sm sm:text-base font-bold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                    activeTab === "register"
                      ? "bg-navy-950 text-gold-300 shadow-md"
                      : "text-muted hover:text-navy-950"
                  }`}
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Register as Alumnus</span>
                  {activeTab === "register" && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400 rounded-full"
                    />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className={`relative py-3.5 text-sm sm:text-base font-bold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                    activeTab === "login"
                      ? "bg-navy-950 text-gold-300 shadow-md"
                      : "text-muted hover:text-navy-950"
                  }`}
                >
                  <LogIn className="h-4 w-4" />
                  <span>Existing Member Sign In</span>
                  {activeTab === "login" && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400 rounded-full"
                    />
                  )}
                </button>
              </div>

              <div className="p-6 sm:p-10">
                <AnimatePresence mode="wait">
                  {activeTab === "register" ? (
                    /* REGISTRATION FORM */
                    <motion.form
                      key="register-form"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleRegisterSubmit}
                      noValidate
                      className="space-y-6"
                    >
                      <div className="border-b border-line pb-4">
                        <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy-950">
                          Verified Alumni Registration Form
                        </h2>
                        <p className="text-xs sm:text-sm text-muted mt-1">
                          Complete this form to create your official listing. Verified profiles receive priority career referrals and networking invites.
                        </p>
                      </div>

                      {/* SUMMARY OF ERRORS (IF SUBMIT ATTEMPTED WITH ERRORS) */}
                      {submitAttempted && errors.length > 0 && (
                        <div
                          role="alert"
                          aria-live="assertive"
                          className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs space-y-1.5"
                        >
                          <div className="flex items-center gap-2 font-bold text-sm text-red-900">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <span>Please review the following requirements ({errors.length}):</span>
                          </div>
                          <ul className="list-disc pl-6 space-y-1">
                            {errors.map((err, i) => (
                              <li key={i}>{err}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* SECTION 1: PERSONAL & CONTACT */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* FULL NAME */}
                        <div>
                          <label
                            htmlFor="regName"
                            className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5"
                          >
                            Full Name *
                          </label>
                          <div className="relative">
                            <input
                              id="regName"
                              type="text"
                              value={regName}
                              onChange={(e) => setRegName(e.target.value)}
                              onBlur={() => markTouched("name")}
                              placeholder="e.g. Vikramaditya Rathore"
                              aria-invalid={submitAttempted && !isNameValid}
                              aria-describedby={submitAttempted && !isNameValid ? "regName-err" : undefined}
                              className={`w-full h-12 px-4 rounded-xl border text-base transition-all focus:outline-none focus:ring-2 ${
                                (touched.name || submitAttempted)
                                  ? isNameValid
                                    ? "border-emerald-500 focus:ring-emerald-500/20"
                                    : "border-red-500 focus:ring-red-500/20"
                                  : "border-line focus:ring-gold-500/40"
                              }`}
                            />
                            {(touched.name || submitAttempted) && (
                              <div className="absolute right-3.5 top-3.5">
                                {isNameValid ? (
                                  <Check className="h-5 w-5 text-emerald-600" />
                                ) : (
                                  <X className="h-5 w-5 text-red-500" />
                                )}
                              </div>
                            )}
                          </div>
                          {submitAttempted && !isNameValid && (
                            <p id="regName-err" className="text-xs text-red-600 mt-1">
                              Name must be at least 3 characters.
                            </p>
                          )}
                        </div>

                        {/* EMAIL ADDRESS */}
                        <div>
                          <label
                            htmlFor="regEmail"
                            className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5"
                          >
                            Email Address *
                          </label>
                          <div className="relative">
                            <input
                              id="regEmail"
                              type="email"
                              value={regEmail}
                              onChange={(e) => setRegEmail(e.target.value)}
                              onBlur={() => markTouched("email")}
                              placeholder="e.g. vikram@example.com"
                              aria-invalid={submitAttempted && !isEmailValid}
                              aria-describedby={submitAttempted && !isEmailValid ? "regEmail-err" : undefined}
                              className={`w-full h-12 px-4 rounded-xl border text-base transition-all focus:outline-none focus:ring-2 ${
                                (touched.email || submitAttempted)
                                  ? isEmailValid
                                    ? "border-emerald-500 focus:ring-emerald-500/20"
                                    : "border-red-500 focus:ring-red-500/20"
                                  : "border-line focus:ring-gold-500/40"
                              }`}
                            />
                            {(touched.email || submitAttempted) && (
                              <div className="absolute right-3.5 top-3.5">
                                {isEmailValid ? (
                                  <Check className="h-5 w-5 text-emerald-600" />
                                ) : (
                                  <X className="h-5 w-5 text-red-500" />
                                )}
                              </div>
                            )}
                          </div>
                          {submitAttempted && !isEmailValid && (
                            <p id="regEmail-err" className="text-xs text-red-600 mt-1">
                              Please enter a valid email format.
                            </p>
                          )}
                        </div>

                        {/* PHONE NUMBER */}
                        <div>
                          <label
                            htmlFor="regPhone"
                            className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5"
                          >
                            Phone Number *
                          </label>
                          <div className="relative">
                            <input
                              id="regPhone"
                              type="tel"
                              value={regPhone}
                              onChange={(e) => setRegPhone(e.target.value)}
                              onBlur={() => markTouched("phone")}
                              placeholder="e.g. +91 98290 12345"
                              aria-invalid={submitAttempted && !isPhoneValid}
                              aria-describedby={submitAttempted && !isPhoneValid ? "regPhone-err" : undefined}
                              className={`w-full h-12 px-4 rounded-xl border text-base transition-all focus:outline-none focus:ring-2 ${
                                (touched.phone || submitAttempted)
                                  ? isPhoneValid
                                    ? "border-emerald-500 focus:ring-emerald-500/20"
                                    : "border-red-500 focus:ring-red-500/20"
                                  : "border-line focus:ring-gold-500/40"
                              }`}
                            />
                            {(touched.phone || submitAttempted) && (
                              <div className="absolute right-3.5 top-3.5">
                                {isPhoneValid ? (
                                  <Check className="h-5 w-5 text-emerald-600" />
                                ) : (
                                  <X className="h-5 w-5 text-red-500" />
                                )}
                              </div>
                            )}
                          </div>
                          {submitAttempted && !isPhoneValid && (
                            <p id="regPhone-err" className="text-xs text-red-600 mt-1">
                              Enter a valid 10+ digit contact number.
                            </p>
                          )}
                        </div>

                        {/* CITY / LOCATION */}
                        <div>
                          <label
                            htmlFor="regCity"
                            className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5"
                          >
                            Current City *
                          </label>
                          <div className="relative">
                            <input
                              id="regCity"
                              type="text"
                              value={regCity}
                              onChange={(e) => setRegCity(e.target.value)}
                              onBlur={() => markTouched("city")}
                              placeholder="e.g. Jaipur, Bengaluru, Dubai"
                              aria-invalid={submitAttempted && !isCityValid}
                              aria-describedby={submitAttempted && !isCityValid ? "regCity-err" : undefined}
                              className={`w-full h-12 px-4 rounded-xl border text-base transition-all focus:outline-none focus:ring-2 ${
                                (touched.city || submitAttempted)
                                  ? isCityValid
                                    ? "border-emerald-500 focus:ring-emerald-500/20"
                                    : "border-red-500 focus:ring-red-500/20"
                                  : "border-line focus:ring-gold-500/40"
                              }`}
                            />
                            {(touched.city || submitAttempted) && (
                              <div className="absolute right-3.5 top-3.5">
                                {isCityValid ? (
                                  <Check className="h-5 w-5 text-emerald-600" />
                                ) : (
                                  <X className="h-5 w-5 text-red-500" />
                                )}
                              </div>
                            )}
                          </div>
                          {submitAttempted && !isCityValid && (
                            <p id="regCity-err" className="text-xs text-red-600 mt-1">
                              City is required for chapter mapping.
                            </p>
                          )}
                        </div>
                      </div>

                      {/* SECTION 2: ACADEMIC CREDENTIALS */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        {/* COURSE */}
                        <div>
                          <label
                            htmlFor="regCourse"
                            className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5"
                          >
                            Academic Program / Course *
                          </label>
                          <select
                            id="regCourse"
                            value={regCourse}
                            onChange={(e) => setRegCourse(e.target.value)}
                            className="w-full h-12 px-4 rounded-xl border border-line bg-white text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                          >
                            {COURSES.map((course) => (
                              <option key={course} value={course}>
                                {course}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* BATCH YEAR */}
                        <div>
                          <label
                            htmlFor="regBatch"
                            className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5"
                          >
                            Graduation Batch Year *
                          </label>
                          <select
                            id="regBatch"
                            value={regBatch}
                            onChange={(e) => setRegBatch(e.target.value)}
                            className="w-full h-12 px-4 rounded-xl border border-line bg-white text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                          >
                            {BATCH_YEARS.map((yr) => (
                              <option key={yr} value={yr}>
                                Class of {yr}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* SECTION 3: PROFESSIONAL DETAILS */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        {/* COMPANY */}
                        <div>
                          <label
                            htmlFor="regCompany"
                            className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5"
                          >
                            Current Organization / Company *
                          </label>
                          <div className="relative">
                            <input
                              id="regCompany"
                              type="text"
                              value={regCompany}
                              onChange={(e) => setRegCompany(e.target.value)}
                              onBlur={() => markTouched("company")}
                              placeholder="e.g. Apex Tech Solutions"
                              aria-invalid={submitAttempted && !isCompanyValid}
                              aria-describedby={submitAttempted && !isCompanyValid ? "regCompany-err" : undefined}
                              className={`w-full h-12 px-4 rounded-xl border text-base transition-all focus:outline-none focus:ring-2 ${
                                (touched.company || submitAttempted)
                                  ? isCompanyValid
                                    ? "border-emerald-500 focus:ring-emerald-500/20"
                                    : "border-red-500 focus:ring-red-500/20"
                                  : "border-line focus:ring-gold-500/40"
                              }`}
                            />
                            {(touched.company || submitAttempted) && (
                              <div className="absolute right-3.5 top-3.5">
                                {isCompanyValid ? (
                                  <Check className="h-5 w-5 text-emerald-600" />
                                ) : (
                                  <X className="h-5 w-5 text-red-500" />
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* DESIGNATION */}
                        <div>
                          <label
                            htmlFor="regDesignation"
                            className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5"
                          >
                            Current Role / Title *
                          </label>
                          <div className="relative">
                            <input
                              id="regDesignation"
                              type="text"
                              value={regDesignation}
                              onChange={(e) => setRegDesignation(e.target.value)}
                              onBlur={() => markTouched("designation")}
                              placeholder="e.g. Senior Software Architect"
                              aria-invalid={submitAttempted && !isDesignationValid}
                              aria-describedby={submitAttempted && !isDesignationValid ? "regDesignation-err" : undefined}
                              className={`w-full h-12 px-4 rounded-xl border text-base transition-all focus:outline-none focus:ring-2 ${
                                (touched.designation || submitAttempted)
                                  ? isDesignationValid
                                    ? "border-emerald-500 focus:ring-emerald-500/20"
                                    : "border-red-500 focus:ring-red-500/20"
                                  : "border-line focus:ring-gold-500/40"
                              }`}
                            />
                            {(touched.designation || submitAttempted) && (
                              <div className="absolute right-3.5 top-3.5">
                                {isDesignationValid ? (
                                  <Check className="h-5 w-5 text-emerald-600" />
                                ) : (
                                  <X className="h-5 w-5 text-red-500" />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* LINKEDIN URL */}
                      <div>
                        <label
                          htmlFor="regLinkedIn"
                          className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5"
                        >
                          LinkedIn Profile URL (Optional)
                        </label>
                        <div className="relative">
                          <input
                            id="regLinkedIn"
                            type="url"
                            value={regLinkedIn}
                            onChange={(e) => setRegLinkedIn(e.target.value)}
                            onBlur={() => markTouched("linkedin")}
                            placeholder="https://linkedin.com/in/your-profile"
                            aria-invalid={submitAttempted && !isLinkedInValid}
                            aria-describedby={submitAttempted && !isLinkedInValid ? "regLinkedIn-err" : undefined}
                            className={`w-full h-12 px-4 rounded-xl border text-base transition-all focus:outline-none focus:ring-2 ${
                              (touched.linkedin || submitAttempted) && regLinkedIn.trim()
                                ? isLinkedInValid
                                  ? "border-emerald-500 focus:ring-emerald-500/20"
                                  : "border-red-500 focus:ring-red-500/20"
                                : "border-line focus:ring-gold-500/40"
                            }`}
                          />
                        </div>
                        {submitAttempted && !isLinkedInValid && (
                          <p id="regLinkedIn-err" className="text-xs text-red-600 mt-1">
                            URL must start with http:// or https://linkedin.com/
                          </p>
                        )}
                      </div>

                      {/* DOMAIN / FIELD TAG CHIPS (MULTI-SELECT) */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider">
                            Industry Domains / Areas of Expertise * (Select 1 or more)
                          </label>
                          <span className="text-xs text-gold-700 font-semibold">
                            {selectedDomains.length} selected
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {DOMAINS.map((domain) => {
                            const isSelected = selectedDomains.includes(domain);
                            return (
                              <button
                                key={domain}
                                type="button"
                                onClick={() => toggleDomain(domain)}
                                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                                  isSelected
                                    ? "bg-navy-950 text-gold-300 border border-gold-500/50 shadow-sm"
                                    : "bg-ivory text-muted border border-line hover:border-gold-500/40 hover:text-navy-950"
                                }`}
                              >
                                {isSelected ? (
                                  <Check className="h-3.5 w-3.5 text-gold-400" />
                                ) : (
                                  <span className="h-1.5 w-1.5 rounded-full bg-line" />
                                )}
                                <span>{domain}</span>
                              </button>
                            );
                          })}
                        </div>
                        {submitAttempted && !isDomainValid && (
                          <p className="text-xs text-red-600 mt-1.5">
                            Please select at least one industry domain.
                          </p>
                        )}
                      </div>

                      {/* CONSENT CHECKBOX */}
                      <div className="p-4 rounded-2xl bg-ivory/80 border border-line">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={regConsent}
                            onChange={(e) => setRegConsent(e.target.checked)}
                            className="h-5 w-5 mt-0.5 rounded border-line text-navy-950 focus:ring-gold-500"
                          />
                          <span className="text-xs text-navy-900 leading-relaxed">
                            I confirm that I am a graduate of Poddar Group of Institutions and consent to the publication of my professional details in the verified alumni directory for networking and mentorship purposes.
                          </span>
                        </label>
                        {submitAttempted && !isConsentValid && (
                          <p className="text-xs text-red-600 mt-2 font-medium">
                            Consent is required to list your profile in the institutional directory.
                          </p>
                        )}
                      </div>

                      {/* SUBMIT BUTTON (STICKY ON MOBILE) */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full h-12 sm:h-14 rounded-xl bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 text-navy-950 font-bold text-sm sm:text-base shadow-lg hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <UserPlus className="h-5 w-5" />
                          <span>Submit Alumni Registration</span>
                        </button>
                        <p className="text-center text-[11px] text-muted mt-2.5">
                          Submissions are reviewed by the Poddar Alumni Secretariat within 24 hours.
                        </p>
                      </div>
                    </motion.form>
                  ) : (
                    /* LOGIN FORM */
                    <motion.form
                      key="login-form"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleLoginSubmit}
                      className="space-y-6 max-w-md mx-auto py-4"
                    >
                      <div className="text-center">
                        <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy-950">
                          Sign In to Your Account
                        </h2>
                        <p className="text-xs sm:text-sm text-muted mt-1">
                          Access your saved preferences, profile completeness, and member privileges.
                        </p>
                      </div>

                      {/* DEMO NOTICE BANNER */}
                      <div className="p-3.5 rounded-xl bg-gold-500/10 border border-gold-500/30 text-navy-950 text-xs flex items-center gap-2.5">
                        <Sparkles className="h-4 w-4 text-gold-600 shrink-0" />
                        <div>
                          <strong className="font-bold">Interactive Demo Notice:</strong> Any email and password will simulate an authenticated alumni session.
                        </div>
                      </div>

                      {loginError && (
                        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                          <span>{loginError}</span>
                        </div>
                      )}

                      <div>
                        <label
                          htmlFor="loginEmail"
                          className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5"
                        >
                          Registered Email Address
                        </label>
                        <input
                          id="loginEmail"
                          type="email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder="alumni@poddar.mock"
                          className="w-full h-12 px-4 rounded-xl border border-line text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="loginPassword"
                          className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5"
                        >
                          Password
                        </label>
                        <input
                          id="loginPassword"
                          type="password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full h-12 px-4 rounded-xl border border-line text-base text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full h-12 rounded-xl bg-navy-950 text-gold-300 font-bold text-sm hover:bg-navy-900 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <LogIn className="h-4 w-4" />
                        <span>Sign In</span>
                      </button>

                      <div className="text-center pt-2">
                        <button
                          type="button"
                          onClick={() => setActiveTab("register")}
                          className="text-xs text-gold-700 font-semibold hover:underline inline-flex items-center gap-1"
                        >
                          <span>Don&apos;t have an account? Register your batch cohort</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
