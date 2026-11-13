import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  AlumniProfile,
  PortalEvent,
  JobOpportunity,
  BulletinItem,
  SuccessStory,
  AlumniBusiness,
  Mentor,
  HelpDeskTicket,
  GiveBackSubmission,
  ApprovalStatus,
  DomainCategory,
  StudentUser,
  JobApplication,
  ApplicationStatus,
  ReferralRequest,
  ReferralStatus,
  ChatMessage,
  ChatConversation,
  PortalNotification,
  ChatReport,
  JobStatus,
  PortalUserRole,
} from "@/data/types";
import { INITIAL_ALUMNI } from "@/data/alumni";
import { INITIAL_EVENTS } from "@/data/events";
import { INITIAL_JOBS } from "@/data/jobs";
import { INITIAL_BULLETIN } from "@/data/bulletin";
import { INITIAL_SUCCESS_STORIES, INITIAL_BUSINESSES } from "@/data/spotlight";
import { INITIAL_MENTORS } from "@/data/career";
import { FOOTER_SOCIAL_LINKS } from "@/data/nav";
import {
  DEMO_ALUMNUS,
  DEMO_STUDENT,
  INITIAL_STUDENTS,
  INITIAL_APPLICATIONS,
  INITIAL_REFERRALS,
  INITIAL_CONVERSATIONS,
  INITIAL_MESSAGES,
  INITIAL_NOTIFICATIONS,
  INITIAL_CHAT_REPORTS,
} from "@/data/opportunitiesNetwork";

export type SubmittableItemType =
  | "alumni"
  | "achievement"
  | "opportunity"
  | "mentor"
  | "ticket"
  | "giveBack"
  | "business"
  | "event"
  | "profile-update"
  | "registration"
  | "mentor-signup"
  | "mentorship-request"
  | "event-registration"
  | "give-back-offer";

export interface PublishedContentState {
  notices: BulletinItem[];
  newsStories: SuccessStory[];
  events: PortalEvent[];
}

export interface SubmittedQueueItem {
  id: string;
  type: SubmittableItemType;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  submittedBy: string;
  payload: Record<string, any>;
  adminNote?: string;
  reviewedAt?: string;
}

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: "alumni" | "admin" | "guest" | "alumnus" | "student";
  batch?: number;
  course?: string;
  avatarUrl?: string;
  company?: string;
  designation?: string;
  skills?: string[];
  resumeFileName?: string;
  enrollmentNumber?: string;
  yearOfStudy?: string;
}

export interface SocialLink {
  name: string;
  href: string;
  label: string;
}

export const INITIAL_SUBMITTED_QUEUE: SubmittedQueueItem[] = [
  {
    id: "sub-reg-1",
    type: "registration",
    status: "pending",
    createdAt: "2026-10-28",
    submittedBy: "Sunil Mathur",
    payload: {
      id: "alm-new-1",
      name: "Sunil Mathur",
      email: "sunil.mathur@mocktech.com",
      phone: "+91 98290 88776",
      batch: 2017,
      degree: "BCA",
      course: "BCA (Computer Applications)",
      department: "Information Technology & Computer Applications",
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      company: "CloudScale Systems",
      designation: "Staff DevOps Engineer",
      domain: "Technology & Software",
      linkedinUrl: "https://linkedin.com/in/sunil-mathur-sample",
      bio: "Cloud infrastructure architect specializing in Kubernetes, AWS and distributed systems.",
      skills: ["Kubernetes", "AWS", "Terraform", "Go"],
      verified: true,
      openToMentoring: true,
      openToHiring: true,
    },
  },
  {
    id: "sub-prof-1",
    type: "profile-update",
    status: "pending",
    createdAt: "2026-10-27",
    submittedBy: "Pooja Singhal",
    payload: {
      userId: "alm-3",
      alumniId: "alm-3",
      email: "pooja.singhal@sample.mock",
      fullName: "Pooja Singhal",
      changesSummary: {
        company: "FinServ Capital",
        designation: "Associate Director",
        city: "Mumbai",
      },
      note: "Promoted to Associate Director of Financial Products, relocation to Mumbai",
    },
  },
  {
    id: "sub-ach-1",
    type: "achievement",
    status: "pending",
    createdAt: "2026-10-27",
    submittedBy: "Dr. Neha Sharma",
    payload: {
      id: "story-new-1",
      title: "Selected for National AI Healthcare Innovation Cohort 2026",
      name: "Dr. Neha Sharma",
      alumniName: "Dr. Neha Sharma",
      batch: 2015,
      degree: "M.Sc Biotech",
      category: "Healthcare & Research",
      summary: "Recognized among 20 researchers developing low-cost point-of-care diagnostics using computer vision.",
      pullQuote: "The early research grounding at the institute provided the discipline needed for high-stakes healthcare technology.",
      story: "Dr. Neha Sharma (Batch of 2015) was chosen as an innovation fellow in the National AI Healthcare Cohort. Her team is pioneering automated mobile microscopy for rural healthcare centres.",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    },
  },
  {
    id: "sub-opp-1",
    type: "opportunity",
    status: "pending",
    createdAt: "2026-10-26",
    submittedBy: "Kunal Bhatia",
    payload: {
      id: "job-new-1",
      title: "Associate Product Manager",
      company: "Nexus Digital Commerce",
      location: "Jaipur / Hybrid",
      type: "Full-time",
      workplace: "Hybrid",
      category: "Technology",
      description: "Looking for an energetic APM to drive our supplier dashboard and logistics tracking modules. Mentorship provided by senior alumni.",
      requirements: [
        "0-2 years in product management or analytics",
        "Proficiency with SQL and product analytics (Mixpanel/Amplitude)",
        "Alumni preferred",
      ],
      postedByAlumniName: "Kunal Bhatia",
      postedByBatch: 2016,
      applyUrl: "mailto:careers@nexusdigital.mock",
      contactEmail: "kunal@nexusdigital.mock",
      salaryRange: "₹8 - ₹12 LPA",
      experienceLevel: "Entry-to-Mid",
    },
  },
  {
    id: "sub-mnt-1",
    type: "mentor-signup",
    status: "pending",
    createdAt: "2026-10-25",
    submittedBy: "Gaurav Sen",
    payload: {
      id: "mnt-new-1",
      name: "Gaurav Sen",
      batch: 2014,
      role: "Engineering Manager",
      company: "FinScale Payments",
      domain: "Technology & Software",
      expertise: ["System Design", "Backend Architecture", "Interview Prep"],
      experienceYears: 10,
      bio: "Engineering leader passionate about mentoring junior developers transitioning to distributed architectures.",
      preferredFrequency: "Bi-weekly",
      mode: "Virtual 1-on-1",
      available: true,
      maxMentees: 3,
    },
  },
  {
    id: "sub-req-1",
    type: "mentorship-request",
    status: "pending",
    createdAt: "2026-10-29",
    submittedBy: "Aman Saxena",
    payload: {
      id: "req-new-1",
      studentName: "Aman Saxena",
      studentEmail: "aman.saxena@student.poddar.mock",
      batch: 2025,
      course: "BCA",
      targetRole: "Full Stack Engineer",
      mentorName: "Priyanka Saxena",
      mentorId: "mnt-1",
      message: "Would love 30 minutes of guidance on portfolio projects and tech interview preparation for startup roles in Jaipur / NCR.",
    },
  },
  {
    id: "sub-tkt-1",
    type: "ticket",
    status: "pending",
    createdAt: "2026-10-25",
    submittedBy: "Divya Kulkarni",
    payload: {
      id: "tkt-2",
      ticketNumber: "TK-2026-0843",
      name: "Divya Kulkarni",
      email: "divya.k@finmatrix.mock",
      phone: "+91 94140 54321",
      batch: "2018",
      category: "Profile Update Assistance",
      subject: "Updating current corporate designation and city",
      message: "Please update my profile designation to Senior Risk Analyst at Hyderabad.",
      status: "Open",
    },
  },
  {
    id: "sub-biz-1",
    type: "business",
    status: "pending",
    createdAt: "2026-10-26",
    submittedBy: "Ananya Verma",
    payload: {
      id: "biz-new-1",
      name: "Clay & Craft Ceramics Studio",
      businessName: "Clay & Craft Ceramics Studio",
      ownerName: "Ananya Verma",
      founderName: "Ananya Verma",
      batch: 2018,
      category: "Art, Craft & Design",
      industry: "Design & Crafts",
      city: "Jaipur",
      state: "Rajasthan",
      website: "https://clayandcraft.mock",
      description: "Handcrafted architectural ceramics, bespoke tableware, and clay design workshops.",
      offerText: "15% discount for Poddar alumni and students with code PODDAR15",
      verified: true,
    },
  },
  {
    id: "sub-gb-1",
    type: "give-back-offer",
    status: "pending",
    createdAt: "2026-10-28",
    submittedBy: "Kavita Rawat",
    payload: {
      id: "gb-new-1",
      fullName: "Kavita Rawat",
      email: "kavita.rawat@samplebrand.mock",
      phone: "+91 98292 11002",
      batch: 2014,
      type: "Guest Lecture / Workshop",
      topic: "Brand Storytelling and Consumer Behavior in Digital First Era",
      organization: "Omni Brand Labs",
      message: "Happy to take a 2-hour Saturday masterclass for final year BBA/MBA marketing students.",
    },
  },
  {
    id: "sub-evr-1",
    type: "event-registration",
    status: "pending",
    createdAt: "2026-10-29",
    submittedBy: "Suresh Goyal",
    payload: {
      id: "evr-new-1",
      eventId: "ev-1",
      eventTitle: "Annual Alumni Meet & Homecoming 2026",
      registrationNumber: "REG-2026-0042",
      fullName: "Suresh Goyal",
      email: "suresh.goyal@mockcorp.com",
      phone: "+91 98292 44332",
      batch: 2011,
      course: "BBA",
      ticketsCount: 2,
      dietaryPreference: "Vegetarian",
    },
  },
];

interface PortalState {
  // Datasets
  alumni: AlumniProfile[];
  events: PortalEvent[];
  jobs: JobOpportunity[];
  bulletin: BulletinItem[];
  stories: SuccessStory[];
  businesses: AlumniBusiness[];
  mentors: Mentor[];
  tickets: HelpDeskTicket[];
  giveBacks: GiveBackSubmission[];
  socialLinks: SocialLink[];

  // Submissions queue
  submittedQueue: SubmittedQueueItem[];
  ticketCounter: number;
  eventRegCounter: number;

  // Published Content Layer (for Admin additions & edits)
  publishedContent: PublishedContentState;

  // Phase 6: Opportunities Network State
  students: StudentUser[];
  jobApplications: JobApplication[];
  referrals: ReferralRequest[];
  conversations: ChatConversation[];
  messages: Record<string, ChatMessage[]>;
  notifications: PortalNotification[];
  savedJobIds: string[];
  blockedUserIds: string[];
  chatReports: ChatReport[];

  // Auth / session state
  currentUser: CurrentUser | null;
  isAdminAuthenticated: boolean;

  // Actions
  getNextTicketNumber: () => string;
  getNextEventRegNumber: () => string;
  publishContent: (kind: "notices" | "newsStories" | "events", item: any) => void;
  updateContent: (kind: "notices" | "newsStories" | "events", id: string, patch: any) => void;
  removeContent: (kind: "notices" | "newsStories" | "events", id: string) => void;
  submitItem: (type: SubmittableItemType, item: any) => string;
  approveItem: (type: SubmittableItemType, id: string) => void;
  rejectItem: (type: SubmittableItemType, id: string, note?: string) => void;
  setTicketStatus: (id: string, status: "Open" | "In Review" | "Resolved", note?: string) => void;
  login: (user: CurrentUser) => void;
  logout: () => void;
  setAdminAuthenticated: (val: boolean) => void;
  updateSocialLinks: (links: SocialLink[]) => void;
  resetDemo: () => void;

  // Phase 6 Actions
  registerStudent: (student: Omit<StudentUser, "id" | "joinedDate" | "isActive">) => StudentUser;
  applyToJob: (params: { jobId: string; coverNote: string; resumeFileName?: string; askReferral?: boolean }) => { success: boolean; application?: JobApplication; error?: string };
  withdrawApplication: (applicationId: string) => void;
  setApplicationStatus: (applicationId: string, status: ApplicationStatus, note?: string) => void;
  requestReferral: (params: { jobId: string; referrerId: string; message: string; resumeFileName?: string }) => { success: boolean; referral?: ReferralRequest; error?: string };
  respondReferral: (referralId: string, action: "accept" | "decline" | "referred", declineReason?: string) => void;
  offerReferral: (applicationId: string) => void;
  startConversation: (targetUserId: string, jobContext?: { jobId: string; jobTitle: string; company: string }, initialMessage?: string) => string;
  sendMessage: (conversationId: string, text: string) => void;
  markConversationRead: (conversationId: string) => void;
  reportConversation: (conversationId: string, reportedUserId: string, reason: string, note: string) => void;
  blockUser: (userId: string) => void;
  unblockUser: (userId: string) => void;
  addNotification: (notif: Omit<PortalNotification, "id" | "createdAt" | "read">) => void;
  markNotificationsRead: () => void;
  markNotificationAsRead: (id: string) => void;
  closePosting: (jobId: string, reason?: string) => void;
  reopenPosting: (jobId: string) => void;
  removePosting: (jobId: string, reason?: string) => void;
  deactivateStudent: (studentId: string) => void;
  reactivateStudent: (studentId: string) => void;
  toggleSaveJob: (jobId: string) => void;
  switchDemoUser: (role: "alumnus" | "student") => void;
  updateStudentProfile: (patch: Partial<StudentUser>) => void;
  dismissReport: (reportId: string) => void;
  warnUserReport: (reportId: string) => void;
  blockUserReport: (reportId: string) => void;
}

const DEFAULT_CURRENT_USER: CurrentUser = DEMO_ALUMNUS;

export const usePortalStore = create<PortalState>()(
  persist(
    (set, get) => ({
      alumni: INITIAL_ALUMNI,
      events: INITIAL_EVENTS,
      jobs: INITIAL_JOBS,
      bulletin: INITIAL_BULLETIN,
      stories: INITIAL_SUCCESS_STORIES,
      businesses: INITIAL_BUSINESSES,
      mentors: INITIAL_MENTORS,

      // Phase 6 Opportunities Network Initial State
      students: INITIAL_STUDENTS,
      jobApplications: INITIAL_APPLICATIONS,
      referrals: INITIAL_REFERRALS,
      conversations: INITIAL_CONVERSATIONS,
      messages: INITIAL_MESSAGES,
      notifications: INITIAL_NOTIFICATIONS,
      savedJobIds: ["job-1", "job-9"],
      blockedUserIds: [],
      chatReports: INITIAL_CHAT_REPORTS,
      tickets: [
        {
          id: "tkt-1",
          ticketNumber: "TK-2026-0842",
          name: "Rohan Mehra",
          email: "rohan@byteorbit.mock",
          phone: "+91 98290 12345",
          batch: "2020",
          category: "Certificate / Document Assistance",
          subject: "Official Transcripts for Master's Application in Germany",
          message: "Requesting sealed official transcripts for BCA 2017-2020 batch.",
          createdAt: "2026-10-22",
          status: "In Review",
        },
        {
          id: "tkt-2",
          ticketNumber: "TK-2026-0843",
          name: "Divya Kulkarni",
          email: "divya.k@finmatrix.mock",
          phone: "+91 94140 54321",
          batch: "2018",
          category: "Profile Update Assistance",
          subject: "Updating current corporate designation and city",
          message: "Please update my profile designation to Senior Risk Analyst at Hyderabad.",
          createdAt: "2026-10-25",
          status: "Open",
        },
      ],
      giveBacks: [
        {
          id: "gb-1",
          fullName: "Aditya Narang",
          email: "aditya@zenithventures.mock",
          phone: "+91 98291 99999",
          batch: 2012,
          type: "Offer Internships",
          organization: "Zenith AgriVentures",
          message: "We would like to hire 4 pre-final year students for summer logistics internships.",
          createdAt: "2026-10-26",
          status: "approved",
        },
      ],
      socialLinks: FOOTER_SOCIAL_LINKS,
      currentUser: DEFAULT_CURRENT_USER,
      isAdminAuthenticated: false,

      submittedQueue: INITIAL_SUBMITTED_QUEUE,
      ticketCounter: 1,
      eventRegCounter: 1,

      publishedContent: {
        notices: [],
        newsStories: [],
        events: [],
      },

      getNextTicketNumber: () => {
        const seq = get().ticketCounter ?? 1;
        return `PDR-2026-${String(seq).padStart(4, "0")}`;
      },

      getNextEventRegNumber: () => {
        const seq = get().eventRegCounter ?? 1;
        return `REG-2026-${String(seq).padStart(4, "0")}`;
      },

      publishContent: (kind, item) => {
        const id = item.id || `${kind}-${Date.now()}`;
        const timestamp = new Date().toISOString().split("T")[0];
        const publishedItem = { ...item, id, status: "approved" as const, date: item.date || timestamp, postedDate: timestamp };
        set({
          publishedContent: {
            ...get().publishedContent,
            [kind]: [publishedItem, ...(get().publishedContent[kind] || [])],
          },
        });
      },

      updateContent: (kind, id, patch) => {
        set({
          publishedContent: {
            ...get().publishedContent,
            [kind]: (get().publishedContent[kind] || []).map((item) =>
              item.id === id ? { ...item, ...patch } : item
            ),
          },
        });
      },

      removeContent: (kind, id) => {
        set({
          publishedContent: {
            ...get().publishedContent,
            [kind]: (get().publishedContent[kind] || []).filter((item) => item.id !== id),
          },
        });
      },

      submitItem: (type, item) => {
        const id = `${type}-${Date.now()}`;
        const timestamp = new Date().toISOString().split("T")[0];
        const submittedBy =
          item.submittedBy ||
          item.email ||
          item.name ||
          item.fullName ||
          item.founderName ||
          item.postedByAlumniName ||
          get().currentUser?.email ||
          "Anonymous";

        let finalPayload = { ...item };

        // 1. Process specific dataset models
        switch (type) {
          case "alumni":
          case "registration": {
            const newItem: AlumniProfile = {
              id,
              name: item.name || item.fullName || "Alumnus",
              email: item.email || "",
              batch: Number(item.batch) || 2024,
              course: item.course || "General",
              company: item.company || "Independent",
              designation: item.designation || "Professional",
              city: item.city || "Jaipur",
              country: item.country || "India",
              domain: item.domain || (item.domainTags?.[0] as DomainCategory) || "IT & Technology",
              linkedInUrl: item.linkedInUrl || "",
              expertiseTags: item.expertiseTags || item.domainTags || ["Alumni Network"],
              bio: item.bio || "Poddar Group alumnus registered via the alumni network gateway.",
              status: "pending",
              ...item,
            };
            set({ alumni: [newItem, ...get().alumni] });
            finalPayload = newItem;
            break;
          }
          case "achievement": {
            const newItem: SuccessStory = {
              ...item,
              id,
              status: "pending",
            };
            set({ stories: [newItem, ...get().stories] });
            finalPayload = newItem;
            break;
          }
          case "opportunity": {
            const newItem: JobOpportunity = {
              id,
              title: item.title,
              company: item.company,
              location: item.location || "Remote",
              type: item.type || "Full-Time",
              experience: item.experience || "1-3 Years",
              domain: item.domain || "IT & Technology",
              description: item.description || "",
              requirements: item.requirements || ["Poddar alumnus qualification preferred"],
              postedByAlumniName: item.postedByAlumniName || get().currentUser?.name || "Verified Alumnus",
              postedByBatch: Number(item.postedByBatch || get().currentUser?.batch || 2020),
              applicationLinkOrEmail: item.applicationLinkOrEmail || item.link || "careers@poddar.mock",
              postedDate: timestamp,
              deadline: item.deadline || "2026-12-31",
              status: "live", // LIVE IMMEDIATELY for Opportunities Network
              workMode: item.workMode || "Hybrid",
              openings: item.openings || 1,
              salaryRange: item.salaryRange,
              skills: item.skills || [],
              whoCanApply: item.whoCanApply || "Both",
              applyMethod: item.applyMethod || "portal",
              canRefer: item.canRefer ?? true,
              referralSlots: item.referralSlots ?? 2,
              posterId: item.posterId || get().currentUser?.id || "alm-1",
              viewsCount: 1,
              ...item,
            };
            set({
              jobs: [newItem, ...get().jobs],
              notifications: [
                {
                  id: "notif-post-" + Date.now(),
                  userId: get().currentUser?.id || "alm-1",
                  title: "Opportunity Live!",
                  message: `Your job posting '${newItem.title}' at ${newItem.company} is live immediately on Career Hub.`,
                  type: "job",
                  link: `/career-hub/jobs`,
                  read: false,
                  createdAt: new Date().toISOString(),
                },
                ...get().notifications,
              ],
            });
            finalPayload = newItem;
            break;
          }
          case "mentor":
          case "mentor-signup": {
            const newItem: Mentor = {
              id,
              name: item.name || get().currentUser?.name || "Alumnus Mentor",
              batch: Number(item.batch || get().currentUser?.batch || 2018),
              designation: item.designation || "Industry Specialist",
              company: item.company || "Enterprise",
              domain: item.domain || (item.expertiseAreas?.[0] as DomainCategory) || "IT & Technology",
              topics: item.topics || item.expertiseAreas || ["Career Guidance"],
              slotsAvailable: Number(item.slotsAvailable || 3),
              bio: item.bio || "Dedicated alumnus mentor guiding the next generation.",
              linkedinUrl: item.linkedinUrl || "https://linkedin.com",
              status: "pending",
              ...item,
            };
            set({ mentors: [newItem, ...get().mentors] });
            finalPayload = newItem;
            break;
          }
          case "mentorship-request": {
            finalPayload = {
              id,
              status: "pending",
              createdAt: timestamp,
              ...item,
            };
            break;
          }
          case "profile-update": {
            finalPayload = {
              id,
              status: "pending",
              createdAt: timestamp,
              changesSummary: item.changesSummary || item,
              ...item,
            };
            break;
          }
          case "ticket": {
            const seq = get().ticketCounter ?? 1;
            const ticketNumber = item.ticketNumber || `PDR-2026-${String(seq).padStart(4, "0")}`;
            set({ ticketCounter: seq + 1 });

            const newTicket: HelpDeskTicket = {
              id,
              ticketNumber,
              name: item.name || get().currentUser?.name || "Alumnus",
              email: item.email || get().currentUser?.email || "alumni@poddar.mock",
              phone: item.phone || "+91 98000 00000",
              batch: item.batch ? String(item.batch) : "2020",
              category: item.category || "General Query",
              subject: item.subject || `Support Ticket [${item.category || "General"}]`,
              message: item.message || "",
              createdAt: timestamp,
              status: "Open",
              ...item,
            };
            set({ tickets: [newTicket, ...get().tickets] });
            finalPayload = newTicket;
            break;
          }
          case "giveBack":
          case "give-back-offer": {
            const newGiveBack: GiveBackSubmission = {
              ...item,
              id,
              fullName: item.fullName || item.name || get().currentUser?.name || "Alumnus",
              email: item.email || get().currentUser?.email || "alumni@poddar.mock",
              phone: item.phone || "+91 98000 00000",
              batch: Number(item.batch || get().currentUser?.batch || 2020),
              type: item.type || "Guest Speaker",
              organization: item.organization || item.company || "Independent",
              message: item.message || "",
              createdAt: timestamp,
              status: "pending",
            };
            set({ giveBacks: [newGiveBack, ...get().giveBacks] });
            finalPayload = newGiveBack;
            break;
          }
          case "event-registration": {
            const seq = get().eventRegCounter ?? 1;
            const registrationNumber = item.registrationNumber || `REG-2026-${String(seq).padStart(4, "0")}`;
            set({ eventRegCounter: seq + 1 });
            finalPayload = {
              id,
              eventId: item.eventId || "evt-annual-2026",
              eventTitle: item.eventTitle || "Annual Global Alumni Homecoming 2026",
              fullName: item.fullName || item.name || get().currentUser?.name || "Alumnus",
              email: item.email || get().currentUser?.email || "alumni@poddar.mock",
              phone: item.phone || "+91 98000 00000",
              batch: item.batch ? String(item.batch) : "2020",
              course: item.course || "BCA",
              ticketsCount: Number(item.ticketsCount || 1),
              dietaryPreference: item.dietaryPreference || "Vegetarian",
              notes: item.notes || "",
              status: "confirmed",
              createdAt: timestamp,
              ...item,
              registrationNumber,
            };
            break;
          }
          case "business": {
            const newBiz: AlumniBusiness = {
              ...item,
              id,
              status: "pending",
            };
            set({ businesses: [newBiz, ...get().businesses] });
            finalPayload = newBiz;
            break;
          }
          case "event": {
            const newEvent: PortalEvent = {
              ...item,
              id,
              status: "pending",
            };
            set({ events: [newEvent, ...get().events] });
            finalPayload = newEvent;
            break;
          }
        }

        // 2. Persist in unified submittedQueue as required by Phase 3 & Admin
        const queueRecord: SubmittedQueueItem = {
          id,
          type,
          status: "pending",
          createdAt: timestamp,
          submittedBy,
          payload: finalPayload,
        };

        set({ submittedQueue: [queueRecord, ...get().submittedQueue] });
        return id;
      },

      approveItem: (type, id) => {
        const timestamp = new Date().toISOString().split("T")[0];
        const queueItem = get().submittedQueue.find((q) => q.id === id || q.payload?.id === id);

        // Update submitted queue record
        set({
          submittedQueue: get().submittedQueue.map((q) =>
            q.id === id || q.payload?.id === id
              ? { ...q, status: "approved" as const, reviewedAt: timestamp }
              : q
          ),
        });

        switch (type) {
          case "alumni":
          case "registration": {
            const alumnusExists = get().alumni.some(
              (a) => a.id === id || (queueItem?.payload?.id && a.id === queueItem.payload.id)
            );
            if (alumnusExists) {
              set({
                alumni: get().alumni.map((a) =>
                  a.id === id || a.id === queueItem?.payload?.id
                    ? { ...a, status: "approved" as ApprovalStatus }
                    : a
                ),
              });
            } else if (queueItem && queueItem.payload) {
              const p = queueItem.payload;
              const newAlumnus: AlumniProfile = {
                id: p.id || id,
                name: p.name || p.fullName || "Alumnus",
                email: p.email || "alumni@sample.mock",
                batch: Number(p.batch || 2020),
                course: p.course || p.degree || "BCA",
                company: p.company || "Independent",
                designation: p.designation || "Professional",
                domain: (p.domain as DomainCategory) || "IT & Technology",
                city: p.city || p.currentCity || "Jaipur",
                country: p.country || "India",
                status: "approved",
                linkedInUrl: p.linkedinUrl || p.linkedInUrl || "",
                bio: p.bio || "",
                expertiseTags: Array.isArray(p.skills)
                  ? p.skills
                  : Array.isArray(p.expertiseTags)
                  ? p.expertiseTags
                  : typeof p.skills === "string"
                  ? p.skills.split(",").map((s: string) => s.trim())
                  : ["Technology"],
                featured: false,
                avatarUrl: p.avatarUrl || "",
              };
              set({ alumni: [newAlumnus, ...get().alumni] });
            }
            break;
          }
          case "profile-update": {
            if (queueItem && queueItem.payload) {
              const p = queueItem.payload;
              const changes = p.changesSummary || p;
              const targetEmail = p.email;
              const targetId = p.userId || p.alumniId || p.id;
              set({
                alumni: get().alumni.map((a) => {
                  if (a.id === targetId || (targetEmail && a.email === targetEmail)) {
                    return { ...a, ...changes, status: "approved" as ApprovalStatus };
                  }
                  return a;
                }),
              });
            }
            break;
          }
          case "achievement": {
            const storyExists = get().stories.some(
              (s) => s.id === id || (queueItem?.payload?.id && s.id === queueItem.payload.id)
            );
            if (storyExists) {
              set({
                stories: get().stories.map((s) =>
                  s.id === id || s.id === queueItem?.payload?.id
                    ? { ...s, status: "approved" as ApprovalStatus }
                    : s
                ),
              });
            } else if (queueItem && queueItem.payload) {
              const p = queueItem.payload;
              const newStory: SuccessStory = {
                id: p.id || id,
                title: p.title || "Alumni Achievement",
                alumniName: p.alumniName || p.name || p.fullName || "Distinguished Alumnus",
                batch: Number(p.batch || 2015),
                course: p.degree || p.course || "BCA",
                category: (p.category as any) || "Leadership",
                companyOrOrg: p.company || p.companyOrOrg || "Independent",
                summary: p.summary || p.story || "",
                fullStory: p.story || p.summary || "",
                quote: p.pullQuote || p.quote || p.summary || "",
                featuredImage:
                  p.imageUrl ||
                  p.featuredImage ||
                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
                status: "approved",
              };
              set({ stories: [newStory, ...get().stories] });
            }
            break;
          }
          case "opportunity": {
            const jobExists = get().jobs.some(
              (j) => j.id === id || (queueItem?.payload?.id && j.id === queueItem.payload.id)
            );
            if (jobExists) {
              set({
                jobs: get().jobs.map((j) =>
                  j.id === id || j.id === queueItem?.payload?.id
                    ? { ...j, status: "approved" as ApprovalStatus }
                    : j
                ),
              });
            } else if (queueItem && queueItem.payload) {
              const p = queueItem.payload;
              const newJob: JobOpportunity = {
                id: p.id || id,
                title: p.title || "Job Opportunity",
                company: p.company || "Hiring Partner",
                location: p.location || "Jaipur / Remote",
                type: (p.type as any) || "Full-Time",
                experience: p.experience || p.experienceLevel || "Mid-Level",
                domain: (p.domain as DomainCategory) || "IT & Technology",
                description: p.description || "",
                requirements: Array.isArray(p.requirements)
                  ? p.requirements
                  : typeof p.requirements === "string"
                  ? p.requirements.split("\n").filter(Boolean)
                  : ["Relevant degree and experience"],
                postedByAlumniName: p.postedByAlumniName || p.submittedBy || "Alumnus",
                postedByBatch: Number(p.postedByBatch || 2018),
                applicationLinkOrEmail: p.applyUrl || p.contactEmail || "mailto:careers@example.mock",
                postedDate: new Date().toISOString().split("T")[0],
                deadline: p.deadline || "2026-12-31",
                status: "approved",
              };
              set({ jobs: [newJob, ...get().jobs] });
            }
            break;
          }
          case "mentor":
          case "mentor-signup": {
            const mentorExists = get().mentors.some(
              (m) => m.id === id || (queueItem?.payload?.id && m.id === queueItem.payload.id)
            );
            if (mentorExists) {
              set({
                mentors: get().mentors.map((m) =>
                  m.id === id || m.id === queueItem?.payload?.id
                    ? { ...m, status: "approved" as ApprovalStatus }
                    : m
                ),
              });
            } else if (queueItem && queueItem.payload) {
              const p = queueItem.payload;
              const newMentor: Mentor = {
                id: p.id || id,
                name: p.name || "Alumni Mentor",
                batch: Number(p.batch || 2015),
                designation: p.designation || p.role || "Senior Specialist",
                company: p.company || "Enterprise",
                domain: (p.domain as DomainCategory) || "IT & Technology",
                topics: Array.isArray(p.expertise)
                  ? p.expertise
                  : Array.isArray(p.topics)
                  ? p.topics
                  : typeof p.expertise === "string"
                  ? p.expertise.split(",").map((s: string) => s.trim())
                  : ["Career Guidance"],
                slotsAvailable: Number(p.maxMentees || p.slotsAvailable || 3),
                bio: p.bio || "Alumnus mentor guiding students and early career graduates.",
                linkedinUrl: p.linkedinUrl || "",
                status: "approved",
              };
              set({ mentors: [newMentor, ...get().mentors] });
            }
            break;
          }
          case "mentorship-request": {
            // Updated in queue
            break;
          }
          case "ticket": {
            get().setTicketStatus(id, "Resolved", "Request approved by administrator");
            break;
          }
          case "giveBack":
          case "give-back-offer": {
            const gbExists = get().giveBacks.some((g) => g.id === id);
            if (gbExists) {
              set({
                giveBacks: get().giveBacks.map((g) =>
                  g.id === id ? { ...g, status: "approved" as ApprovalStatus } : g
                ),
              });
            } else if (queueItem && queueItem.payload) {
              const p = queueItem.payload;
              const newGb: GiveBackSubmission = {
                ...p,
                id: p.id || id,
                fullName: p.fullName || p.name || "Alumnus",
                email: p.email || "alumni@sample.mock",
                phone: p.phone || "+91 98000 00000",
                batch: Number(p.batch || 2020),
                type: p.type || "Guest Speaker",
                organization: p.organization || "Independent",
                message: p.message || "",
                createdAt: timestamp,
                status: "approved",
              };
              set({ giveBacks: [newGb, ...get().giveBacks] });
            }
            break;
          }
          case "event-registration": {
            // Already updated in queue
            break;
          }
          case "business": {
            const bizExists = get().businesses.some(
              (b) => b.id === id || (queueItem?.payload?.id && b.id === queueItem.payload.id)
            );
            if (bizExists) {
              set({
                businesses: get().businesses.map((b) =>
                  b.id === id || b.id === queueItem?.payload?.id
                    ? { ...b, status: "approved" as ApprovalStatus }
                    : b
                ),
              });
            } else if (queueItem && queueItem.payload) {
              const p = queueItem.payload;
              const newBiz: AlumniBusiness = {
                id: p.id || id,
                name: p.name || p.businessName || "Alumni Venture",
                founderName: p.founderName || p.ownerName || "Alumnus Founder",
                batch: Number(p.batch || 2016),
                industry: (p.industry as DomainCategory) || "Business & Entrepreneurship",
                foundedYear: Number(p.foundedYear || 2021),
                city: p.city || "Jaipur",
                website: p.website || "https://example.mock",
                description: p.description || "",
                logoPlaceholder: p.logoPlaceholder || "AV",
                discountOffer: p.offerText || p.discountOffer || "Exclusive offer for Poddar alumni",
                status: "approved",
              };
              set({ businesses: [newBiz, ...get().businesses] });
            }
            break;
          }
          case "event": {
            set({
              events: get().events.map((e) =>
                e.id === id ? { ...e, status: "approved" as ApprovalStatus } : e
              ),
            });
            break;
          }
        }
      },

      rejectItem: (type, id, note) => {
        const timestamp = new Date().toISOString().split("T")[0];
        // Update submitted queue record
        set({
          submittedQueue: get().submittedQueue.map((q) =>
            q.id === id || q.payload?.id === id
              ? {
                  ...q,
                  status: "rejected" as const,
                  adminNote: note || q.adminNote,
                  reviewedAt: timestamp,
                }
              : q
          ),
        });

        switch (type) {
          case "alumni":
          case "registration":
            set({
              alumni: get().alumni.map((a) => (a.id === id ? { ...a, status: "rejected" as ApprovalStatus } : a)),
            });
            break;
          case "achievement":
            set({
              stories: get().stories.map((s) => (s.id === id ? { ...s, status: "rejected" as ApprovalStatus } : s)),
            });
            break;
          case "opportunity":
            set({
              jobs: get().jobs.map((j) => (j.id === id ? { ...j, status: "rejected" as ApprovalStatus } : j)),
            });
            break;
          case "mentor":
          case "mentor-signup":
            set({
              mentors: get().mentors.map((m) => (m.id === id ? { ...m, status: "rejected" as ApprovalStatus } : m)),
            });
            break;
          case "ticket":
            get().setTicketStatus(id, "In Review", note || "Ticket marked as rejected / closed");
            break;
          case "giveBack":
          case "give-back-offer":
            set({
              giveBacks: get().giveBacks.map((g) => (g.id === id ? { ...g, status: "rejected" as ApprovalStatus } : g)),
            });
            break;
          case "business":
            set({
              businesses: get().businesses.map((b) => (b.id === id ? { ...b, status: "rejected" as ApprovalStatus } : b)),
            });
            break;
          case "event":
            set({
              events: get().events.map((e) => (e.id === id ? { ...e, status: "rejected" as ApprovalStatus } : e)),
            });
            break;
        }
      },

      setTicketStatus: (id, status, note) => {
        const timestamp = new Date().toISOString().split("T")[0];
        set({
          tickets: get().tickets.map((t) => {
            if (t.id === id || t.ticketNumber === id) {
              const updatedHistory = [
                ...(t.statusHistory || []),
                { status, date: timestamp, note: note || `Status updated to ${status}` },
              ];
              return {
                ...t,
                status,
                adminNote: note !== undefined ? note : t.adminNote,
                statusHistory: updatedHistory,
              };
            }
            return t;
          }),
          submittedQueue: get().submittedQueue.map((q) => {
            if (q.id === id || q.payload?.ticketNumber === id || q.payload?.id === id) {
              return {
                ...q,
                status: status === "Resolved" ? "approved" : "pending",
                adminNote: note !== undefined ? note : q.adminNote,
                reviewedAt: timestamp,
                payload: {
                  ...q.payload,
                  status,
                  adminNote: note !== undefined ? note : q.payload?.adminNote,
                },
              };
            }
            return q;
          }),
        });
      },

      login: (user) => set({ currentUser: user, isAdminAuthenticated: user.role === "admin" }),
      logout: () => set({ currentUser: null, isAdminAuthenticated: false }),
      setAdminAuthenticated: (val) => set({ isAdminAuthenticated: val }),
      updateSocialLinks: (links) => set({ socialLinks: links }),

      // ==========================================
      // Phase 6: Opportunities Network Actions
      // ==========================================
      registerStudent: (studentData) => {
        const id = "stu-" + Date.now();
        const today = new Date().toISOString().split("T")[0];
        const newStudent: StudentUser = {
          ...studentData,
          id,
          joinedDate: today,
          isActive: true,
        };
        const studentUser: CurrentUser = {
          id: newStudent.id,
          name: newStudent.name,
          email: newStudent.email,
          role: "student",
          course: newStudent.course,
          batch: 2026,
          skills: newStudent.skills,
          resumeFileName: newStudent.resumeFileName,
          enrollmentNumber: newStudent.enrollmentNumber,
          yearOfStudy: newStudent.yearOfStudy,
        };
        set({
          students: [newStudent, ...get().students],
          currentUser: studentUser,
          isAdminAuthenticated: false,
          notifications: [
            {
              id: "notif-" + Date.now(),
              userId: id,
              title: "Welcome to Poddar Opportunities Network!",
              message: "Your student account is active immediately. You can now explore live opportunities, apply, and connect with alumni.",
              type: "system",
              link: "/career-hub/jobs",
              read: false,
              createdAt: new Date().toISOString(),
            },
            ...get().notifications,
          ],
        });
        return newStudent;
      },

      applyToJob: ({ jobId, coverNote, resumeFileName, askReferral }) => {
        const user = get().currentUser;
        if (!user) {
          return { success: false, error: "Please log in or register to apply." };
        }
        const job = get().jobs.find((j) => j.id === jobId);
        if (!job) {
          return { success: false, error: "Opportunity not found." };
        }
        if (job.status === "closed" || job.status === "removed") {
          return { success: false, error: "This opportunity is no longer accepting applications." };
        }
        if (job.posterId === user.id) {
          return { success: false, error: "You cannot apply to your own posting." };
        }
        const isStudent = user.role === "student";
        if (job.whoCanApply === "Students" && !isStudent) {
          return { success: false, error: "This posting is reserved for current students only." };
        }
        if (job.whoCanApply === "Alumni" && isStudent) {
          return { success: false, error: "This posting is reserved for verified alumni only." };
        }
        const existing = get().jobApplications.find(
          (a) => a.jobId === jobId && a.applicantId === user.id && a.status !== "Withdrawn"
        );
        if (existing) {
          return { success: false, error: "You have already applied for this position." };
        }

        const today = new Date().toISOString().split("T")[0];
        const appId = "app-" + Date.now();
        const resume = resumeFileName || user.resumeFileName || "Profile_Summary.pdf";

        let refRequestId: string | undefined = undefined;
        if (askReferral && job.posterId && job.canRefer && (job.referralSlots ?? 0) > 0) {
          refRequestId = "ref-" + Date.now();
          const newRef: ReferralRequest = {
            id: refRequestId,
            jobId,
            jobTitle: job.title,
            company: job.company,
            requesterId: user.id,
            requesterName: user.name,
            requesterRole: isStudent ? "student" : "alumnus",
            requesterCourseOrCompany: user.course || user.company || "Poddar Institutions",
            referrerId: job.posterId,
            referrerName: job.postedByAlumniName,
            message: `Referral requested alongside application for ${job.title}: "${coverNote.slice(0, 140)}..."`,
            resumeFileName: resume,
            status: "Requested",
            createdAt: today,
            updatedAt: today,
            history: [{ status: "Requested", date: today }],
          };
          set({ referrals: [newRef, ...get().referrals] });
        }

        const newApp: JobApplication = {
          id: appId,
          jobId,
          jobTitle: job.title,
          company: job.company,
          applicantId: user.id,
          applicantName: user.name,
          applicantRole: isStudent ? "student" : "alumnus",
          applicantCourseOrCompany: user.course || user.company || "Poddar Institutions",
          applicantEmail: user.email,
          coverNote,
          resumeFileName: resume,
          appliedDate: today,
          status: "Applied",
          statusHistory: [{ status: "Applied", date: today, note: "Application submitted through Opportunities Network." }],
          referralRequestId: refRequestId,
        };

        const newNotifs: PortalNotification[] = [
          {
            id: "notif-app-" + Date.now(),
            userId: user.id,
            title: "Application Submitted Successfully",
            message: `Your application for ${job.title} at ${job.company} has been delivered.`,
            type: "application",
            link: "/dashboard/applications",
            read: false,
            createdAt: new Date().toISOString(),
          },
        ];

        if (job.posterId) {
          newNotifs.push({
            id: "notif-poster-" + Date.now(),
            userId: job.posterId,
            title: "New Application Received",
            message: `${user.name} applied for ${job.title}.`,
            type: "application",
            link: `/dashboard/postings/${job.id}`,
            read: false,
            createdAt: new Date().toISOString(),
          });
        }

        set({
          jobApplications: [newApp, ...get().jobApplications],
          notifications: [...newNotifs, ...get().notifications],
        });

        return { success: true, application: newApp };
      },

      withdrawApplication: (applicationId) => {
        const today = new Date().toISOString().split("T")[0];
        set({
          jobApplications: get().jobApplications.map((a) =>
            a.id === applicationId
              ? {
                  ...a,
                  status: "Withdrawn",
                  statusHistory: [...a.statusHistory, { status: "Withdrawn", date: today, note: "Withdrawn by applicant." }],
                }
              : a
          ),
        });
      },

      setApplicationStatus: (applicationId, status, note) => {
        const today = new Date().toISOString().split("T")[0];
        const app = get().jobApplications.find((a) => a.id === applicationId);
        if (!app) return;

        const notif: PortalNotification = {
          id: "notif-status-" + Date.now(),
          userId: app.applicantId,
          title: `Application Update: ${status}`,
          message: `Your application for ${app.jobTitle} at ${app.company} has moved to ${status}.${note ? ` Note: ${note}` : ""}`,
          type: "application",
          link: "/dashboard/applications",
          read: false,
          createdAt: new Date().toISOString(),
        };

        set({
          jobApplications: get().jobApplications.map((a) =>
            a.id === applicationId
              ? {
                  ...a,
                  status,
                  statusHistory: [...a.statusHistory, { status, date: today, note }],
                }
              : a
          ),
          notifications: [notif, ...get().notifications],
        });
      },

      requestReferral: ({ jobId, referrerId, message, resumeFileName }) => {
        const user = get().currentUser;
        if (!user) return { success: false, error: "Please log in to request a referral." };
        if (referrerId === user.id) return { success: false, error: "You cannot request a referral from yourself." };

        const job = get().jobs.find((j) => j.id === jobId);
        if (!job) return { success: false, error: "Job opportunity not found." };

        const existing = get().referrals.find(
          (r) => r.jobId === jobId && r.requesterId === user.id && r.referrerId === referrerId && (r.status === "Requested" || r.status === "Accepted")
        );
        if (existing) {
          return { success: false, error: "You already have an active referral request for this position." };
        }

        const today = new Date().toISOString().split("T")[0];
        const refId = "ref-" + Date.now();
        const isStudent = user.role === "student";

        const newRef: ReferralRequest = {
          id: refId,
          jobId,
          jobTitle: job.title,
          company: job.company,
          requesterId: user.id,
          requesterName: user.name,
          requesterRole: isStudent ? "student" : "alumnus",
          requesterCourseOrCompany: user.course || user.company || "Poddar Institutions",
          referrerId,
          referrerName: job.postedByAlumniName,
          message,
          resumeFileName: resumeFileName || user.resumeFileName || "Candidate_Resume.pdf",
          status: "Requested",
          createdAt: today,
          updatedAt: today,
          history: [{ status: "Requested", date: today }],
        };

        const notif: PortalNotification = {
          id: "notif-ref-" + Date.now(),
          userId: referrerId,
          title: "New Referral Request",
          message: `${user.name} requested an internal referral for ${job.title}.`,
          type: "referral",
          link: "/dashboard/referrals",
          read: false,
          createdAt: new Date().toISOString(),
        };

        set({
          referrals: [newRef, ...get().referrals],
          notifications: [notif, ...get().notifications],
        });

        return { success: true, referral: newRef };
      },

      respondReferral: (referralId, action, declineReason) => {
        const today = new Date().toISOString().split("T")[0];
        const ref = get().referrals.find((r) => r.id === referralId);
        if (!ref) return;

        let newStatus: ReferralStatus = "Accepted";
        let statusNote = "";

        if (action === "accept") {
          newStatus = "Accepted";
          statusNote = "Referral request accepted. Direct chat initiated.";

          get().startConversation(
            ref.requesterId,
            { jobId: ref.jobId, jobTitle: ref.jobTitle, company: ref.company },
            `Hi ${ref.requesterName}, I have accepted your referral request for ${ref.jobTitle} at ${ref.company}. Let's chat here!`
          );
        } else if (action === "referred") {
          newStatus = "Referred";
          statusNote = "Official internal referral submitted to talent acquisition.";

          set({
            jobs: get().jobs.map((j) =>
              j.id === ref.jobId && (j.referralSlots ?? 0) > 0
                ? { ...j, referralSlots: (j.referralSlots ?? 1) - 1 }
                : j
            ),
            jobApplications: get().jobApplications.map((a) =>
              a.jobId === ref.jobId && a.applicantId === ref.requesterId
                ? { ...a, referredBy: ref.referrerName }
                : a
            ),
          });
        } else if (action === "decline") {
          newStatus = "Declined";
          statusNote = declineReason || "Referral declined.";
        }

        const notif: PortalNotification = {
          id: "notif-ref-resp-" + Date.now(),
          userId: ref.requesterId,
          title: `Referral ${newStatus}!`,
          message: `${ref.referrerName} marked your referral request for ${ref.jobTitle} as ${newStatus}.${declineReason ? ` Reason: ${declineReason}` : ""}`,
          type: "referral",
          link: "/dashboard/referrals",
          read: false,
          createdAt: new Date().toISOString(),
        };

        set({
          referrals: get().referrals.map((r) =>
            r.id === referralId
              ? {
                  ...r,
                  status: newStatus,
                  declineReason: action === "decline" ? declineReason : r.declineReason,
                  updatedAt: today,
                  history: [...r.history, { status: newStatus, date: today, note: statusNote }],
                }
              : r
          ),
          notifications: [notif, ...get().notifications],
        });
      },

      offerReferral: (applicationId) => {
        const app = get().jobApplications.find((a) => a.id === applicationId);
        if (!app) return;
        const user = get().currentUser;
        const referrerName = user?.name || "Alumnus Referrer";

        set({
          jobApplications: get().jobApplications.map((a) =>
            a.id === applicationId ? { ...a, referredBy: referrerName } : a
          ),
          notifications: [
            {
              id: "notif-offer-ref-" + Date.now(),
              userId: app.applicantId,
              title: "Referral Endorsement Added!",
              message: `${referrerName} added an internal referral endorsement to your application for ${app.jobTitle}.`,
              type: "referral",
              link: "/dashboard/applications",
              read: false,
              createdAt: new Date().toISOString(),
            },
            ...get().notifications,
          ],
        });
      },

      startConversation: (targetUserId, jobContext, initialMessage) => {
        const current = get().currentUser;
        if (!current) return "";

        const targetStudent = get().students.find((s) => s.id === targetUserId);
        const currentIsStudent = current.role === "student";
        if (currentIsStudent && targetStudent) {
          throw new Error("Student-to-student messaging is not permitted on the Opportunities Network.");
        }

        const existing = get().conversations.find((c) =>
          c.participantIds.includes(current.id) && c.participantIds.includes(targetUserId)
        );

        if (existing) {
          if (initialMessage) {
            get().sendMessage(existing.id, initialMessage);
          }
          return existing.id;
        }

        const targetAlum = get().alumni.find((a) => a.id === targetUserId);
        const targetName = targetStudent?.name || targetAlum?.name || "Member";
        const targetRole = targetStudent ? "student" : "alumnus";
        const targetCourseOrCompany = targetStudent?.course || targetAlum?.company || "Poddar Community";

        const convId = "conv-" + Date.now();
        const now = new Date().toISOString();

        const newConv: ChatConversation = {
          id: convId,
          participantIds: [current.id, targetUserId],
          participants: [
            {
              id: current.id,
              name: current.name,
              role: currentIsStudent ? "student" : "alumnus",
              courseOrCompany: current.course || current.company,
            },
            {
              id: targetUserId,
              name: targetName,
              role: targetRole,
              courseOrCompany: targetCourseOrCompany,
            },
          ],
          jobContext,
          lastMessage: initialMessage || "Conversation started",
          lastMessageAt: now,
          unreadCount: {
            [targetUserId]: initialMessage ? 1 : 0,
            [current.id]: 0,
          },
        };

        const initialMsgs: ChatMessage[] = initialMessage
          ? [
              {
                id: "msg-" + Date.now(),
                conversationId: convId,
                senderId: current.id,
                senderName: current.name,
                senderRole: currentIsStudent ? "student" : "alumnus",
                text: initialMessage,
                createdAt: now,
                read: false,
              },
            ]
          : [];

        set({
          conversations: [newConv, ...get().conversations],
          messages: {
            ...get().messages,
            [convId]: initialMsgs,
          },
        });

        if (initialMessage) {
          setTimeout(() => {
            const replies = [
              "Thank you for reaching out! I have received your message and will get back to you shortly.",
              "Glad to connect on the Poddar Network! How can I assist you with this opportunity?",
              "Thanks for contacting me. Let me review the details and get back to you soon.",
            ];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];
            const replyMsg: ChatMessage = {
              id: "msg-sim-" + Date.now(),
              conversationId: convId,
              senderId: targetUserId,
              senderName: targetName,
              senderRole: targetRole,
              text: randomReply,
              createdAt: new Date().toISOString(),
              read: false,
            };
            set({
              messages: {
                ...get().messages,
                [convId]: [...(get().messages[convId] || []), replyMsg],
              },
              conversations: get().conversations.map((c) =>
                c.id === convId
                  ? {
                      ...c,
                      lastMessage: randomReply,
                      lastMessageAt: new Date().toISOString(),
                      unreadCount: { ...c.unreadCount, [current.id]: (c.unreadCount[current.id] || 0) + 1 },
                    }
                  : c
              ),
              notifications: [
                {
                  id: "notif-msg-" + Date.now(),
                  userId: current.id,
                  title: `New Message from ${targetName}`,
                  message: randomReply,
                  type: "message",
                  link: `/messages?conv=${convId}`,
                  read: false,
                  createdAt: new Date().toISOString(),
                },
                ...get().notifications,
              ],
            });
          }, 2000);
        }

        return convId;
      },

      sendMessage: (conversationId, text) => {
        const current = get().currentUser;
        if (!current) return;
        const conv = get().conversations.find((c) => c.id === conversationId);
        if (!conv || conv.isBlocked) return;

        const otherParticipant = conv.participants.find((p) => p.id !== current.id);
        const otherId = otherParticipant?.id || "";
        const now = new Date().toISOString();

        const userMsg: ChatMessage = {
          id: "msg-" + Date.now(),
          conversationId,
          senderId: current.id,
          senderName: current.name,
          senderRole: current.role === "student" ? "student" : "alumnus",
          text,
          createdAt: now,
          read: true,
        };

        set({
          messages: {
            ...get().messages,
            [conversationId]: [...(get().messages[conversationId] || []), userMsg],
          },
          conversations: get().conversations.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  lastMessage: text,
                  lastMessageAt: now,
                  unreadCount: { ...c.unreadCount, [otherId]: (c.unreadCount[otherId] || 0) + 1 },
                }
              : c
          ),
        });

        setTimeout(() => {
          const cannedResponses = [
            "Thank you for sharing! I have noted your details and will coordinate with the team.",
            "Sounds good! Feel free to review the role requirements, and we can discuss any specific questions.",
            "Understood. Let me check the schedule and follow up with the next steps shortly.",
            "Great connecting on the Opportunities Network! Let me know if you need any additional guidance.",
          ];
          const responseText = cannedResponses[Math.floor(Math.random() * cannedResponses.length)];
          const replyMsg: ChatMessage = {
            id: "msg-reply-" + Date.now(),
            conversationId,
            senderId: otherId,
            senderName: otherParticipant?.name || "Alumnus",
            senderRole: otherParticipant?.role || "alumnus",
            text: responseText,
            createdAt: new Date().toISOString(),
            read: false,
          };

          set({
            messages: {
              ...get().messages,
              [conversationId]: [...(get().messages[conversationId] || []), replyMsg],
            },
            conversations: get().conversations.map((c) =>
              c.id === conversationId
                ? {
                    ...c,
                    lastMessage: responseText,
                    lastMessageAt: new Date().toISOString(),
                    unreadCount: { ...c.unreadCount, [current.id]: (c.unreadCount[current.id] || 0) + 1 },
                  }
                : c
            ),
            notifications: [
              {
                id: "notif-msg-" + Date.now(),
                userId: current.id,
                title: `New Message from ${otherParticipant?.name || "Member"}`,
                message: responseText,
                type: "message",
                link: `/messages?conv=${conversationId}`,
                read: false,
                createdAt: new Date().toISOString(),
              },
              ...get().notifications,
            ],
          });
        }, 1800);
      },

      markConversationRead: (conversationId) => {
        const current = get().currentUser;
        if (!current) return;
        set({
          conversations: get().conversations.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  unreadCount: { ...c.unreadCount, [current.id]: 0 },
                }
              : c
          ),
        });
      },

      reportConversation: (conversationId, reportedUserId, reason, note) => {
        const current = get().currentUser;
        if (!current) return;
        const conv = get().conversations.find((c) => c.id === conversationId);
        const msgs = get().messages[conversationId] || [];
        const reportedUser = conv?.participants.find((p) => p.id === reportedUserId);

        const newReport: ChatReport = {
          id: "rep-" + Date.now(),
          conversationId,
          reportedById: current.id,
          reportedByName: current.name,
          reportedUserId,
          reportedUserName: reportedUser?.name || "Reported User",
          reason,
          note,
          createdAt: new Date().toISOString(),
          status: "open",
          transcriptPreview: msgs.slice(-5).map((m) => ({
            sender: m.senderName,
            text: m.text,
            time: new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          })),
        };

        set({
          chatReports: [newReport, ...get().chatReports],
          notifications: [
            {
              id: "notif-rep-" + Date.now(),
              userId: current.id,
              title: "Report Submitted",
              message: "Thank you for alerting us. The administrator will review this conversation transcript.",
              type: "system",
              read: false,
              createdAt: new Date().toISOString(),
            },
            ...get().notifications,
          ],
        });
      },

      blockUser: (userId) => {
        set({
          blockedUserIds: [...new Set([...get().blockedUserIds, userId])],
          conversations: get().conversations.map((c) =>
            c.participantIds.includes(userId)
              ? { ...c, isBlocked: true, blockedById: get().currentUser?.id }
              : c
          ),
        });
      },

      unblockUser: (userId) => {
        set({
          blockedUserIds: get().blockedUserIds.filter((id) => id !== userId),
          conversations: get().conversations.map((c) =>
            c.participantIds.includes(userId)
              ? { ...c, isBlocked: false, blockedById: undefined }
              : c
          ),
        });
      },

      addNotification: (notif) => {
        const newN: PortalNotification = {
          ...notif,
          id: "notif-" + Date.now(),
          createdAt: new Date().toISOString(),
          read: false,
        };
        set({ notifications: [newN, ...get().notifications] });
      },

      markNotificationsRead: () => {
        const user = get().currentUser;
        if (!user) return;
        set({
          notifications: get().notifications.map((n) =>
            n.userId === user.id ? { ...n, read: true } : n
          ),
        });
      },

      markNotificationAsRead: (id) => {
        set({
          notifications: get().notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        });
      },

      closePosting: (jobId, reason) => {
        const job = get().jobs.find((j) => j.id === jobId);
        if (!job) return;
        set({
          jobs: get().jobs.map((j) => (j.id === jobId ? { ...j, status: "closed" as JobStatus } : j)),
          notifications: job.posterId
            ? [
                {
                  id: "notif-close-" + Date.now(),
                  userId: job.posterId,
                  title: "Posting Closed",
                  message: `Your job posting '${job.title}' has been marked closed.${reason ? ` Reason: ${reason}` : ""}`,
                  type: "job",
                  link: "/dashboard/postings",
                  read: false,
                  createdAt: new Date().toISOString(),
                },
                ...get().notifications,
              ]
            : get().notifications,
        });
      },

      reopenPosting: (jobId) => {
        set({
          jobs: get().jobs.map((j) => (j.id === jobId ? { ...j, status: "live" as JobStatus } : j)),
        });
      },

      removePosting: (jobId, reason) => {
        const job = get().jobs.find((j) => j.id === jobId);
        if (!job) return;
        set({
          jobs: get().jobs.map((j) => (j.id === jobId ? { ...j, status: "removed" as JobStatus } : j)),
          notifications: job.posterId
            ? [
                {
                  id: "notif-remove-" + Date.now(),
                  userId: job.posterId,
                  title: "Posting Removed by Admin",
                  message: `Your job posting '${job.title}' was removed by administrator.${reason ? ` Reason: ${reason}` : ""}`,
                  type: "system",
                  link: "/dashboard/postings",
                  read: false,
                  createdAt: new Date().toISOString(),
                },
                ...get().notifications,
              ]
            : get().notifications,
        });
      },

      deactivateStudent: (studentId) => {
        set({
          students: get().students.map((s) => (s.id === studentId ? { ...s, isActive: false } : s)),
        });
      },

      reactivateStudent: (studentId) => {
        set({
          students: get().students.map((s) => (s.id === studentId ? { ...s, isActive: true } : s)),
        });
      },

      toggleSaveJob: (jobId) => {
        const saved = get().savedJobIds;
        if (saved.includes(jobId)) {
          set({ savedJobIds: saved.filter((id) => id !== jobId) });
        } else {
          set({ savedJobIds: [...saved, jobId] });
        }
      },

      switchDemoUser: (role) => {
        if (role === "student") {
          set({ currentUser: DEMO_STUDENT, isAdminAuthenticated: false });
        } else {
          set({ currentUser: DEMO_ALUMNUS, isAdminAuthenticated: false });
        }
      },

      updateStudentProfile: (patch) => {
        const cur = get().currentUser;
        if (!cur) return;
        set({
          currentUser: { ...cur, ...patch },
          students: get().students.map((s) => (s.id === cur.id ? { ...s, ...patch } : s)),
        });
      },

      dismissReport: (reportId) => {
        set({
          chatReports: get().chatReports.map((r) =>
            r.id === reportId ? { ...r, status: "dismissed" as const, actionTaken: "Dismissed by admin after review." } : r
          ),
        });
      },

      warnUserReport: (reportId) => {
        const rep = get().chatReports.find((r) => r.id === reportId);
        if (!rep) return;
        set({
          chatReports: get().chatReports.map((r) =>
            r.id === reportId ? { ...r, status: "actioned" as const, actionTaken: "Formal warning notification sent to user." } : r
          ),
          notifications: [
            {
              id: "notif-warn-" + Date.now(),
              userId: rep.reportedUserId,
              title: "Institutional Moderation Notice",
              message: "A chat conversation was flagged and reviewed. Please adhere strictly to Poddar Opportunities Network community guidelines.",
              type: "system",
              read: false,
              createdAt: new Date().toISOString(),
            },
            ...get().notifications,
          ],
        });
      },

      blockUserReport: (reportId) => {
        const rep = get().chatReports.find((r) => r.id === reportId);
        if (!rep) return;
        get().blockUser(rep.reportedUserId);
        set({
          chatReports: get().chatReports.map((r) =>
            r.id === reportId ? { ...r, status: "actioned" as const, actionTaken: "User chat privileges blocked." } : r
          ),
        });
      },

      resetDemo: () =>
        set({
          alumni: INITIAL_ALUMNI,
          events: INITIAL_EVENTS,
          jobs: INITIAL_JOBS,
          bulletin: INITIAL_BULLETIN,
          stories: INITIAL_SUCCESS_STORIES,
          businesses: INITIAL_BUSINESSES,
          mentors: INITIAL_MENTORS,
          students: INITIAL_STUDENTS,
          jobApplications: INITIAL_APPLICATIONS,
          referrals: INITIAL_REFERRALS,
          conversations: INITIAL_CONVERSATIONS,
          messages: INITIAL_MESSAGES,
          notifications: INITIAL_NOTIFICATIONS,
          savedJobIds: ["job-1", "job-9"],
          blockedUserIds: [],
          chatReports: INITIAL_CHAT_REPORTS,
          tickets: [
            {
              id: "tkt-1",
              ticketNumber: "TK-2026-0842",
              name: "Rohan Mehra",
              email: "rohan@byteorbit.mock",
              phone: "+91 98290 12345",
              batch: "2020",
              category: "Certificate / Document Assistance",
              subject: "Official Transcripts for Master's Application in Germany",
              message: "Requesting sealed official transcripts for BCA 2017-2020 batch.",
              createdAt: "2026-10-22",
              status: "In Review",
            },
          ],
          giveBacks: [
            {
              id: "gb-1",
              fullName: "Aditya Narang",
              email: "aditya@zenithventures.mock",
              phone: "+91 98291 99999",
              batch: 2012,
              type: "Offer Internships",
              organization: "Zenith AgriVentures",
              message: "We would like to hire 4 pre-final year students for summer logistics internships.",
              createdAt: "2026-10-26",
              status: "approved",
            },
          ],
          socialLinks: FOOTER_SOCIAL_LINKS,
          currentUser: DEFAULT_CURRENT_USER,
          isAdminAuthenticated: false,
          submittedQueue: INITIAL_SUBMITTED_QUEUE,
          ticketCounter: 1,
          eventRegCounter: 1,
          publishedContent: {
            notices: [],
            newsStories: [],
            events: [],
          },
        }),
    }),
    {
      name: "poddar_alumni_portal_state_v1",
      storage: createJSONStorage(() => localStorage),
      merge: (persistedState: any, currentState) => ({
        ...currentState,
        ...persistedState,
        students: persistedState?.students?.length ? persistedState.students : currentState.students,
        jobApplications: persistedState?.jobApplications?.length ? persistedState.jobApplications : currentState.jobApplications,
        referrals: persistedState?.referrals?.length ? persistedState.referrals : currentState.referrals,
        conversations: persistedState?.conversations?.length ? persistedState.conversations : currentState.conversations,
        messages: persistedState?.messages ? persistedState.messages : currentState.messages,
        notifications: persistedState?.notifications?.length ? persistedState.notifications : currentState.notifications,
        savedJobIds: persistedState?.savedJobIds || currentState.savedJobIds,
        blockedUserIds: persistedState?.blockedUserIds || currentState.blockedUserIds,
        chatReports: persistedState?.chatReports?.length ? persistedState.chatReports : currentState.chatReports,
      }),
    }
  )
);

