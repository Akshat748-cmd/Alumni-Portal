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
  Zap,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { fireConfettiBurst } from "@/components/motion/ConfettiBurst";
import { AvatarInitials } from "@/components/common/AvatarInitials";
import { usePortalStore } from "@/store/portal";
import { DomainCategory, CurrentUser } from "@/data/types";
import { DEMO_ALUMNUS, DEMO_STUDENT } from "@/data/opportunitiesNetwork";

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

const STUDENT_YEARS = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year (Final Year)",
  "Postgraduate Finalist",
];

const COMMON_SKILLS = [
  "React",
  "Node.js",
  "TypeScript",
  "Python",
  "SQL / PostgreSQL",
  "UI/UX Design",
  "Financial Analysis",
  "Digital Marketing",
  "Business Strategy",
  "Content Writing",
];

const BATCH_YEARS = Array.from({ length: 22 }, (_, i) => 2026 - i);

export default function AuthPage() {
  const router = useRouter();
  const { currentUser, login, logout, submitItem, registerStudent, switchDemoUser } = usePortalStore();

  const [activeTab, setActiveTab] = useState<"register" | "login">("register");
  const [registerRole, setRegisterRole] = useState<"alumnus" | "student">("student");

  // Alumnus registration form state
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

  // Student registration form state
  const [stuName, setStuName] = useState("");
  const [stuEmail, setStuEmail] = useState("");
  const [stuPhone, setStuPhone] = useState("");
  const [stuEnrollment, setStuEnrollment] = useState("");
  const [stuCourse, setStuCourse] = useState(COURSES[0]);
  const [stuYear, setStuYear] = useState(STUDENT_YEARS[2]);
  const [stuSkills, setStuSkills] = useState<string[]>(["React", "TypeScript"]);
  const [stuCustomSkill, setStuCustomSkill] = useState("");
  const [stuLinkedIn, setStuLinkedIn] = useState("");
  const [stuConsent, setStuConsent] = useState(false);

  // Field touch/dirty tracking
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [regSubmitted, setRegSubmitted] = useState(false);
  const [registeredId, setRegisteredId] = useState<string | null>(null);
  const [registeredType, setRegisteredType] = useState<"alumnus" | "student">("student");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("vikram.rathore@acmecorp.mock");
  const [loginPassword, setLoginPassword] = useState("alumni2026");
  const [loginRole, setLoginRole] = useState<"alumnus" | "student">("alumnus");
  const [loginError, setLoginError] = useState("");

  // Validation checks for Alumnus
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

  // Validation checks for Student
  const isStuNameValid = stuName.trim().length >= 3;
  const isStuEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stuEmail.trim());
  const isStuPhoneValid = stuPhone.replace(/\D/g, "").length >= 10;
  const isStuEnrollValid = stuEnrollment.trim().length >= 4;
  const isStuSkillsValid = stuSkills.length >= 1;
  const isStuLinkedInValid =
    stuLinkedIn.trim().length === 0 ||
    /^https?:\/\/(www\.)?linkedin\.com\/.*$/i.test(stuLinkedIn.trim());
  const isStuConsentValid = stuConsent;

  // Active validation error messages
  const alumnusErrors: string[] = [];
  if (!isNameValid) alumnusErrors.push("Full name must be at least 3 characters");
  if (!isEmailValid) alumnusErrors.push("Valid email address is required");
  if (!isPhoneValid) alumnusErrors.push("Valid phone number is required (at least 10 digits)");
  if (!isCompanyValid) alumnusErrors.push("Current organization / enterprise is required");
  if (!isDesignationValid) alumnusErrors.push("Current professional title is required");
  if (!isCityValid) alumnusErrors.push("City is required");
  if (!isLinkedInValid) alumnusErrors.push("LinkedIn URL must start with http:// or https://linkedin.com/");
  if (!isDomainValid) alumnusErrors.push("Select at least 1 industry domain tag");
  if (!isConsentValid) alumnusErrors.push("You must acknowledge the alumni directory consent");

  const studentErrors: string[] = [];
  if (!isStuNameValid) studentErrors.push("Full name must be at least 3 characters");
  if (!isStuEmailValid) studentErrors.push("Valid email address is required");
  if (!isStuPhoneValid) studentErrors.push("Valid phone number is required (at least 10 digits)");
  if (!isStuEnrollValid) studentErrors.push("College enrollment / roll number is required (min 4 characters)");
  if (!isStuSkillsValid) studentErrors.push("Please select or add at least 1 key skill");
  if (!isStuLinkedInValid) studentErrors.push("LinkedIn URL must start with http:// or https://linkedin.com/");
  if (!isStuConsentValid) studentErrors.push("You must agree to student platform terms");

  const activeErrors = registerRole === "alumnus" ? alumnusErrors : studentErrors;

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

  const toggleStudentSkill = (skill: string) => {
    if (stuSkills.includes(skill)) {
      setStuSkills(stuSkills.filter((s) => s !== skill));
    } else {
      setStuSkills([...stuSkills, skill]);
    }
  };

  const handleAddCustomSkill = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ("key" in e && e.key !== "Enter") return;
    e.preventDefault();
    const trimmed = stuCustomSkill.trim();
    if (trimmed && !stuSkills.includes(trimmed)) {
      setStuSkills([...stuSkills, trimmed]);
      setStuCustomSkill("");
    }
  };

  const markTouched = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (registerRole === "student") {
      if (studentErrors.length > 0) {
        toast.error(`Please correct the ${studentErrors.length} highlighted error(s) before submitting.`);
        return;
      }

      // Instant Student Registration (Opportunities Network bonus module - no admin gate!)
      const newStudent = registerStudent({
        name: stuName.trim(),
        email: stuEmail.trim(),
        phone: stuPhone.trim(),
        enrollmentNumber: stuEnrollment.trim().toUpperCase(),
        course: stuCourse,
        yearOfStudy: stuYear,
        skills: stuSkills,
        linkedinUrl: stuLinkedIn.trim() || undefined,
        resumeFileName: `${stuName.trim().replace(/\s+/g, "_")}_Resume.pdf`,
      });

      setRegisteredType("student");
      setRegisteredId(newStudent.id);
      setRegSubmitted(true);
      fireConfettiBurst();
      toast.success("Student account activated instantly! Welcome to Opportunities Network.");
    } else {
      if (alumnusErrors.length > 0) {
        toast.error(`Please correct the ${alumnusErrors.length} highlighted error(s) before submitting.`);
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
      setRegisteredType("alumnus");
      setRegisteredId(id);
      setRegSubmitted(true);
      fireConfettiBurst();
      toast.success("Alumni registration received! Sent to the Secretariat moderation queue.");
    }
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

    if (loginRole === "student") {
      login({
        id: "stu-" + Date.now(),
        name: loginEmail.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "Student Member",
        email: loginEmail.trim(),
        role: "student",
        course: "BCA (Computer Applications)",
        yearOfStudy: "3rd Year",
        skills: ["React", "TypeScript", "Node.js"],
        resumeFileName: "Candidate_Resume_2026.pdf",
      });
      toast.success("Signed in as Student! Welcome to Opportunities Network.");
    } else {
      const isVikram = loginEmail.toLowerCase().includes("vikram");
      login({
        id: isVikram ? "alm-1" : `usr-${Date.now()}`,
        name: isVikram
          ? "Vikramaditya Rathore"
          : loginEmail.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "Alumni Member",
        email: loginEmail.trim(),
        role: "alumni",
        batch: isVikram ? 2008 : 2018,
        course: "MBA (Finance & Strategy)",
        company: isVikram ? "Apex Capital Advisory" : undefined,
        designation: isVikram ? "Managing Director" : undefined,
      });
      toast.success("Signed in as Alumnus! Welcome back to Poddar Alumni Portal.");
    }

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <PageHero
        eyebrow="PODDAR ALUMNI NETWORK"
        title="Portal Access & Registration"
        subtitle="Connect alumni and students through career opportunities, verified referrals, direct messaging, and mentorship."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Join the Network", href: "/join" },
          { label: "Register / Login" },
        ]}
      />

      <section className="py-6 sm:py-10 md:py-16">
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
              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-navy-950 mb-2">
                You Are Currently Signed In
              </h2>
              <p className="text-sm text-muted mb-8">
                Your portal session is active as{" "}
                <span className="font-semibold text-navy-900 capitalize">
                  {currentUser.role === "student" ? "Student Member" : "Verified Alumnus"}
                </span>.
              </p>

              <div className="flex items-center justify-center gap-4 p-4 rounded-2xl bg-ivory/80 border border-line max-w-md mx-auto mb-8 text-left">
                <AvatarInitials name={currentUser.name} src={currentUser.avatarUrl} size="lg" />
                <div className="min-w-0 flex-1">
                  <div className="text-base font-bold text-navy-950 truncate">{currentUser.name}</div>
                  <div className="text-xs text-muted truncate">{currentUser.email}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        currentUser.role === "student"
                          ? "bg-amber-100 text-amber-900 border border-amber-300"
                          : "bg-navy-900 text-gold-300 border border-gold-400/40"
                      }`}
                    >
                      {currentUser.role === "student" ? "Student" : "Alumnus"}
                    </span>
                    {currentUser.course && (
                      <span className="text-xs text-muted truncate">{currentUser.course}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <Link
                  href="/dashboard"
                  className="px-4 py-3 rounded-xl bg-navy-950 text-gold-300 font-semibold text-xs sm:text-sm hover:bg-navy-900 transition-colors shadow-md text-center"
                >
                  My Dashboard
                </Link>
                <Link
                  href="/career-hub/jobs"
                  className="px-4 py-3 rounded-xl bg-ivory border border-line text-navy-900 font-semibold text-xs sm:text-sm hover:bg-navy-50 transition-colors text-center"
                >
                  Jobs & Internships
                </Link>
                <Link
                  href="/messages"
                  className="px-4 py-3 rounded-xl bg-ivory border border-line text-navy-900 font-semibold text-xs sm:text-sm hover:bg-navy-50 transition-colors text-center"
                >
                  Direct Messages
                </Link>
              </div>

              <div className="pt-4 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-muted">Switch Role:</span>
                  <button
                    type="button"
                    onClick={() => {
                      switchDemoUser("alumnus");
                      toast.success("Switched to Demo Alumnus (Vikramaditya)");
                    }}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-semibold ${
                      currentUser.role !== "student"
                        ? "bg-navy-950 text-gold-300 border-navy-950"
                        : "bg-white text-navy-900 border-line hover:bg-navy-50"
                    }`}
                  >
                    Alumnus Demo
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      switchDemoUser("student");
                      toast.success("Switched to Demo Student (Aarav)");
                    }}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-semibold ${
                      currentUser.role === "student"
                        ? "bg-amber-600 text-white border-amber-600"
                        : "bg-white text-navy-900 border-line hover:bg-navy-50"
                    }`}
                  >
                    Student Demo
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    toast.info("Logged out from Poddar Alumni Network");
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.div>
          ) : regSubmitted ? (
            /* REGISTRATION SUCCESS STATE */
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
                  {registeredType === "student" ? "Instant Activation Confirmed" : "Enrollment Submitted"}
                </div>
                <h2 className="text-2xl sm:text-3xl font-sans font-bold text-navy-950 mb-3">
                  {registeredType === "student"
                    ? "Welcome to Poddar Opportunities Network!"
                    : "Welcome to the Poddar Alumni Family!"}
                </h2>
                <p className="text-sm sm:text-base text-muted max-w-xl mx-auto mb-6 leading-relaxed">
                  {registeredType === "student"
                    ? "Your student account is active immediately. You can now apply directly to openings posted by alumni, request verified job referrals, and start conversations."
                    : "Your profile has been transmitted to the Poddar Alumni Secretariat. To maintain directory authenticity, newly registered alumni profiles undergo verification within 24–48 hours."}
                </p>

                {registeredType === "student" ? (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                      href="/dashboard"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-navy-950 text-gold-300 font-bold text-sm hover:bg-navy-900 transition-colors shadow-md inline-flex items-center justify-center gap-2"
                    >
                      <span>Go to My Dashboard</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/career-hub/jobs"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-ivory border border-line text-navy-900 font-semibold text-sm hover:bg-navy-50 transition-colors inline-flex items-center justify-center gap-2"
                    >
                      <Briefcase className="h-4 w-4" />
                      <span>Browse Opportunities</span>
                    </Link>
                  </div>
                ) : (
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
                )}
              </div>
            </motion.div>
          ) : (
            /* TABBED AUTH CONTAINER */
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-line shadow-lg sm:shadow-xl overflow-hidden">
              {/* TAB SELECTOR: REGISTER VS LOGIN */}
              <div className="grid grid-cols-2 p-1.5 sm:p-2 bg-ivory/80 border-b border-line">
                <button
                  type="button"
                  onClick={() => setActiveTab("register")}
                  className={`relative py-2.5 sm:py-3.5 text-xs sm:text-base font-bold rounded-xl sm:rounded-2xl transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer ${
                    activeTab === "register"
                      ? "bg-navy-950 text-gold-300 shadow-md"
                      : "text-muted hover:text-navy-950"
                  }`}
                >
                  <UserPlus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>Register Account</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className={`relative py-2.5 sm:py-3.5 text-xs sm:text-base font-bold rounded-xl sm:rounded-2xl transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer ${
                    activeTab === "login"
                      ? "bg-navy-950 text-gold-300 shadow-md"
                      : "text-muted hover:text-navy-950"
                  }`}
                >
                  <LogIn className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>Member Sign In</span>
                </button>
              </div>

              <div className="p-4 sm:p-8 md:p-10">
                <AnimatePresence mode="wait">
                  {activeTab === "register" ? (
                    /* REGISTRATION FLOW */
                    <motion.div
                      key="register-flow"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4 sm:space-y-6"
                    >
                      {/* ROLE SELECTOR: STUDENT VS ALUMNUS */}
                      <div className="p-1 sm:p-1.5 rounded-xl sm:rounded-2xl bg-ivory border border-line">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setRegisterRole("student");
                              setSubmitAttempted(false);
                            }}
                            className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl text-left transition-all flex items-center gap-2.5 sm:gap-3 cursor-pointer ${
                              registerRole === "student"
                                ? "bg-white shadow-sm border border-amber-300 text-navy-950 ring-2 ring-amber-400/20"
                                : "text-muted hover:text-navy-950 hover:bg-white/60"
                            }`}
                          >
                            <div className="p-1.5 sm:p-2 rounded-lg bg-amber-50 text-amber-700 shrink-0">
                              <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-bold text-xs sm:text-sm text-navy-950 flex items-center justify-between sm:justify-start gap-1.5 flex-wrap">
                                <span>College Student</span>
                                <span className="text-[9px] sm:text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 shrink-0">
                                  Instant
                                </span>
                              </div>
                              <div className="text-[11px] sm:text-xs text-muted truncate mt-0.5">
                                Apply to jobs & request referrals
                              </div>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setRegisterRole("alumnus");
                              setSubmitAttempted(false);
                            }}
                            className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl text-left transition-all flex items-center gap-2.5 sm:gap-3 cursor-pointer ${
                              registerRole === "alumnus"
                                ? "bg-white shadow-sm border border-navy-950 text-navy-950 ring-2 ring-navy-900/10"
                                : "text-muted hover:text-navy-950 hover:bg-white/60"
                            }`}
                          >
                            <div className="p-1.5 sm:p-2 rounded-lg bg-navy-50 text-navy-900 shrink-0">
                              <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-bold text-xs sm:text-sm text-navy-950 truncate">Poddar Alumnus</div>
                              <div className="text-[11px] sm:text-xs text-muted truncate mt-0.5">
                                Post jobs & join alumni directory
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>

                      {/* SUMMARY OF ERRORS (IF SUBMIT ATTEMPTED) */}
                      {submitAttempted && activeErrors.length > 0 && (
                        <div
                          role="alert"
                          className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs space-y-1.5"
                        >
                          <div className="flex items-center gap-2 font-bold text-sm text-red-900">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <span>Please review the following requirements ({activeErrors.length}):</span>
                          </div>
                          <ul className="list-disc pl-6 space-y-1">
                            {activeErrors.map((err, i) => (
                              <li key={i}>{err}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* STUDENT FORM */}
                      {registerRole === "student" ? (
                        <form onSubmit={handleRegisterSubmit} noValidate className="space-y-5">
                          <div className="border-b border-line pb-3">
                            <h3 className="text-base sm:text-lg font-sans font-bold text-navy-950 flex items-center gap-2 flex-wrap">
                              <span>Student Registration</span>
                              <span className="text-[11px] sm:text-xs font-normal text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full shrink-0">
                                Instant Access • No Admin Waiting
                              </span>
                            </h3>
                            <p className="text-xs text-muted mt-1 leading-relaxed">
                              Enrolled students gain immediate access to search jobs, apply with resumes, and connect with alumni mentors.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                                Full Name *
                              </label>
                              <input
                                type="text"
                                value={stuName}
                                onChange={(e) => setStuName(e.target.value)}
                                onBlur={() => markTouched("stuName")}
                                placeholder="e.g. Aarav Mehta"
                                className="w-full h-11 px-3.5 rounded-xl border border-line text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                                Institutional or Personal Email *
                              </label>
                              <input
                                type="email"
                                value={stuEmail}
                                onChange={(e) => setStuEmail(e.target.value)}
                                onBlur={() => markTouched("stuEmail")}
                                placeholder="e.g. aarav.mehta@students.poddar.mock"
                                className="w-full h-11 px-3.5 rounded-xl border border-line text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                                Phone Number *
                              </label>
                              <input
                                type="tel"
                                value={stuPhone}
                                onChange={(e) => setStuPhone(e.target.value)}
                                onBlur={() => markTouched("stuPhone")}
                                placeholder="+91 98290 11223"
                                className="w-full h-11 px-3.5 rounded-xl border border-line text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                                College Enrollment / Roll Number *
                              </label>
                              <input
                                type="text"
                                value={stuEnrollment}
                                onChange={(e) => setStuEnrollment(e.target.value)}
                                onBlur={() => markTouched("stuEnroll")}
                                placeholder="e.g. POD-2023-CS042"
                                className="w-full h-11 px-3.5 rounded-xl border border-line text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 tabular-nums text-xs"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                                Enrolled Course / Degree *
                              </label>
                              <select
                                value={stuCourse}
                                onChange={(e) => setStuCourse(e.target.value)}
                                className="w-full h-11 px-3.5 rounded-xl border border-line text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                              >
                                {COURSES.map((c) => (
                                  <option key={c} value={c}>{c}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                                Current Year of Study *
                              </label>
                              <select
                                value={stuYear}
                                onChange={(e) => setStuYear(e.target.value)}
                                className="w-full h-11 px-3.5 rounded-xl border border-line text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                              >
                                {STUDENT_YEARS.map((y) => (
                                  <option key={y} value={y}>{y}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* KEY SKILLS CHIPS */}
                          <div>
                            <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                              Core Technical / Professional Skills *
                            </label>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {COMMON_SKILLS.map((sk) => {
                                const active = stuSkills.includes(sk);
                                return (
                                  <button
                                    key={sk}
                                    type="button"
                                    onClick={() => toggleStudentSkill(sk)}
                                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                                      active
                                        ? "bg-navy-950 text-gold-300 shadow-sm"
                                        : "bg-ivory border border-line text-navy-800 hover:bg-navy-50"
                                    }`}
                                  >
                                    {active ? "✓ " : "+ "}
                                    {sk}
                                  </button>
                                );
                              })}
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={stuCustomSkill}
                                onChange={(e) => setStuCustomSkill(e.target.value)}
                                onKeyDown={handleAddCustomSkill}
                                placeholder="Add custom skill (e.g. Flutter, Figma, PyTorch) and press Enter"
                                className="flex-1 h-10 px-3.5 rounded-xl border border-line text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                              />
                              <button
                                type="button"
                                onClick={handleAddCustomSkill}
                                className="px-4 h-10 rounded-xl bg-ivory border border-line text-navy-900 font-semibold text-xs hover:bg-navy-50"
                              >
                                Add
                              </button>
                            </div>
                            <div className="mt-2 text-[11px] text-muted">
                              Selected ({stuSkills.length}): {stuSkills.join(", ") || "None"}
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                              LinkedIn Profile URL (Optional)
                            </label>
                            <input
                              type="url"
                              value={stuLinkedIn}
                              onChange={(e) => setStuLinkedIn(e.target.value)}
                              placeholder="https://linkedin.com/in/aarav-mehta-mock"
                              className="w-full h-11 px-3.5 rounded-xl border border-line text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                            />
                          </div>

                          {/* CONSENT */}
                          <div className="p-4 rounded-xl bg-ivory border border-line">
                            <label className="flex items-start gap-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={stuConsent}
                                onChange={(e) => setStuConsent(e.target.checked)}
                                className="mt-1 h-4 w-4 rounded border-line text-navy-950 focus:ring-gold-500"
                              />
                              <span className="text-xs text-muted leading-relaxed">
                                I confirm I am a currently enrolled student at Poddar Group of Institutions. I acknowledge that student accounts can apply to career opportunities and request referrals from verified alumni, and do not appear in the public alumni directory.
                              </span>
                            </label>
                          </div>

                          <button
                            type="submit"
                            className="w-full h-13 rounded-xl bg-navy-950 text-gold-300 font-bold text-sm hover:bg-navy-900 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <Zap className="h-4 w-4 text-gold-400" />
                            <span>Activate Student Account Instantly</span>
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </form>
                      ) : (
                        /* ALUMNUS FORM */
                        <form onSubmit={handleRegisterSubmit} noValidate className="space-y-6">
                          <div className="border-b border-line pb-3">
                            <h3 className="text-lg font-sans font-bold text-navy-950">
                              Verified Alumni Registration
                            </h3>
                            <p className="text-xs text-muted mt-0.5">
                              Poddar alumni directory listings undergo automated roster verification within 24–48 hours.
                            </p>
                          </div>

                          {/* PERSONAL */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                                Full Name *
                              </label>
                              <input
                                type="text"
                                value={regName}
                                onChange={(e) => setRegName(e.target.value)}
                                onBlur={() => markTouched("name")}
                                placeholder="e.g. Vikramaditya Rathore"
                                className="w-full h-11 px-3.5 rounded-xl border border-line text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                                Official or Personal Email *
                              </label>
                              <input
                                type="email"
                                value={regEmail}
                                onChange={(e) => setRegEmail(e.target.value)}
                                onBlur={() => markTouched("email")}
                                placeholder="e.g. vikram@acmecorp.mock"
                                className="w-full h-11 px-3.5 rounded-xl border border-line text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                              />
                            </div>
                          </div>

                          {/* ACADEMICS */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                                Degree / Program *
                              </label>
                              <select
                                value={regCourse}
                                onChange={(e) => setRegCourse(e.target.value)}
                                className="w-full h-11 px-3.5 rounded-xl border border-line text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                              >
                                {COURSES.map((c) => (
                                  <option key={c} value={c}>{c}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                                Graduation Year *
                              </label>
                              <select
                                value={regBatch}
                                onChange={(e) => setRegBatch(e.target.value)}
                                className="w-full h-11 px-3.5 rounded-xl border border-line text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                              >
                                {BATCH_YEARS.map((y) => (
                                  <option key={y} value={y}>{y}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* PROFESSIONAL */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                                Organization *
                              </label>
                              <input
                                type="text"
                                value={regCompany}
                                onChange={(e) => setRegCompany(e.target.value)}
                                onBlur={() => markTouched("company")}
                                placeholder="e.g. Apex Advisory"
                                className="w-full h-11 px-3.5 rounded-xl border border-line text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                                Designation / Role *
                              </label>
                              <input
                                type="text"
                                value={regDesignation}
                                onChange={(e) => setRegDesignation(e.target.value)}
                                onBlur={() => markTouched("designation")}
                                placeholder="e.g. Managing Director"
                                className="w-full h-11 px-3.5 rounded-xl border border-line text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                                Location (City) *
                              </label>
                              <input
                                type="text"
                                value={regCity}
                                onChange={(e) => setRegCity(e.target.value)}
                                onBlur={() => markTouched("city")}
                                placeholder="e.g. Jaipur"
                                className="w-full h-11 px-3.5 rounded-xl border border-line text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                                Phone Number *
                              </label>
                              <input
                                type="tel"
                                value={regPhone}
                                onChange={(e) => setRegPhone(e.target.value)}
                                onBlur={() => markTouched("phone")}
                                placeholder="+91 98290 00000"
                                className="w-full h-11 px-3.5 rounded-xl border border-line text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                                LinkedIn Profile URL
                              </label>
                              <input
                                type="url"
                                value={regLinkedIn}
                                onChange={(e) => setRegLinkedIn(e.target.value)}
                                placeholder="https://linkedin.com/in/..."
                                className="w-full h-11 px-3.5 rounded-xl border border-line text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                              />
                            </div>
                          </div>

                          {/* DOMAIN TAGS */}
                          <div>
                            <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                              Industry Domains *
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {DOMAINS.map((dom) => {
                                const selected = selectedDomains.includes(dom);
                                return (
                                  <button
                                    key={dom}
                                    type="button"
                                    onClick={() => toggleDomain(dom)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                      selected
                                        ? "bg-navy-950 text-gold-300 shadow-sm"
                                        : "bg-ivory border border-line text-navy-800 hover:bg-navy-50"
                                    }`}
                                  >
                                    {selected ? "✓ " : "+ "}
                                    {dom}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* CONSENT */}
                          <div className="p-4 rounded-xl bg-ivory border border-line">
                            <label className="flex items-start gap-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={regConsent}
                                onChange={(e) => setRegConsent(e.target.checked)}
                                className="mt-1 h-4 w-4 rounded border-line text-navy-950 focus:ring-gold-500"
                              />
                              <span className="text-xs text-muted leading-relaxed">
                                I confirm my alumni details are accurate and authorize inclusion in the verified Poddar Alumni Directory.
                              </span>
                            </label>
                          </div>

                          <button
                            type="submit"
                            className="w-full h-12 rounded-xl bg-navy-950 text-gold-300 font-bold text-sm hover:bg-navy-900 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <span>Submit Alumni Verification Application</span>
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </form>
                      )}
                    </motion.div>
                  ) : (
                    /* SIGN IN FLOW */
                    <motion.div
                      key="login-flow"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      {/* QUICK 1-CLICK DEMO ACCOUNTS */}
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white border border-gold-500/30">
                        <div className="flex items-center gap-2 text-gold-300 font-sans font-bold text-sm mb-2">
                          <Sparkles className="h-4 w-4" />
                          <span>1-Click Evaluator Sign-In</span>
                        </div>
                        <p className="text-xs text-navy-200 mb-3">
                          Test the full interactive loop between students applying and alumni referring:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              login(DEMO_ALUMNUS);
                              toast.success("Signed in as Demo Alumnus (Vikramaditya Rathore)");
                              router.push("/dashboard");
                            }}
                            className="p-3 rounded-xl bg-navy-900/80 hover:bg-navy-800 border border-gold-400/40 text-left transition-all group"
                          >
                            <div className="text-xs font-bold text-gold-300 group-hover:text-gold-200 flex items-center justify-between">
                              <span>Vikramaditya (Alumnus)</span>
                              <span className="text-[10px] bg-gold-400/20 text-gold-300 px-1.5 py-0.5 rounded">Gold Alum</span>
                            </div>
                            <div className="text-[11px] text-navy-200 truncate mt-0.5">
                              MD @ Apex Capital • Postings & Referrals
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              login(DEMO_STUDENT);
                              toast.success("Signed in as Demo Student (Aarav Mehta)");
                              router.push("/dashboard");
                            }}
                            className="p-3 rounded-xl bg-navy-900/80 hover:bg-navy-800 border border-amber-400/40 text-left transition-all group"
                          >
                            <div className="text-xs font-bold text-amber-300 group-hover:text-amber-200 flex items-center justify-between">
                              <span>Aarav Mehta (Student)</span>
                              <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded">Finalist</span>
                            </div>
                            <div className="text-[11px] text-navy-200 truncate mt-0.5">
                              4th Year CS • Applies & Chats with Alums
                            </div>
                          </button>
                        </div>
                      </div>

                      {/* STANDARD LOGIN FORM */}
                      <form onSubmit={handleLoginSubmit} className="space-y-4">
                        <div className="flex items-center justify-between border-b border-line pb-2">
                          <span className="text-xs font-semibold text-navy-950 uppercase tracking-wider">
                            Or Sign In with Credentials
                          </span>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-muted">Sign in as:</span>
                            <button
                              type="button"
                              onClick={() => setLoginRole("alumnus")}
                              className={`px-2 py-0.5 rounded text-xs font-semibold ${
                                loginRole === "alumnus"
                                  ? "bg-navy-950 text-gold-300"
                                  : "bg-ivory text-muted hover:text-navy-950"
                              }`}
                            >
                              Alumnus
                            </button>
                            <button
                              type="button"
                              onClick={() => setLoginRole("student")}
                              className={`px-2 py-0.5 rounded text-xs font-semibold ${
                                loginRole === "student"
                                  ? "bg-amber-600 text-white"
                                  : "bg-ivory text-muted hover:text-navy-950"
                              }`}
                            >
                              Student
                            </button>
                          </div>
                        </div>

                        {loginError && (
                          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            <span>{loginError}</span>
                          </div>
                        )}

                        <div>
                          <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            placeholder="your.email@example.com"
                            className="w-full h-11 px-3.5 rounded-xl border border-line text-sm focus:outline-none focus:ring-2 focus:ring-navy-950/20"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                            Password
                          </label>
                          <input
                            type="password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full h-11 px-3.5 rounded-xl border border-line text-sm focus:outline-none focus:ring-2 focus:ring-navy-950/20"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full h-12 rounded-xl bg-navy-950 text-gold-300 font-bold text-sm hover:bg-navy-900 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <LogIn className="h-4 w-4" />
                          <span>Sign In to Portal</span>
                        </button>
                      </form>
                    </motion.div>
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
