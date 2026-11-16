export type ApprovalStatus = "approved" | "pending" | "rejected";

export type DomainCategory =
  | "Business & Entrepreneurship"
  | "Finance & Banking"
  | "IT & Technology"
  | "Marketing & Advertising"
  | "Education"
  | "Healthcare"
  | "Jewellery & Fashion";

export interface AlumniProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  batch: number; // 2005-2024
  course: string;
  company: string;
  designation: string;
  city: string;
  country: string;
  domain: DomainCategory;
  linkedInUrl: string;
  expertiseTags: string[];
  bio: string;
  status: ApprovalStatus;
  featured?: boolean;
  membershipTier?: "General" | "Life Member" | "Patron Fellow";
}

export interface DomainStat {
  id: string;
  name: DomainCategory;
  sampleCount: number;
  description: string;
  iconName: string;
}

export interface PortalEvent {
  id: string;
  title: string;
  type: "reunion" | "webinar" | "workshop";
  date: string;
  time: string;
  location: string;
  isVirtual: boolean;
  virtualLink?: string;
  speaker?: string;
  speakerRole?: string;
  description: string;
  attendeeCount: number;
  capacity: number;
  imageUrl: string;
  status: ApprovalStatus;
}

export type JobStatus = ApprovalStatus | "live" | "closed" | "removed";

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-Time" | "Internship" | "Remote" | "Contract";
  experience: string;
  domain: DomainCategory;
  description: string;
  requirements: string[];
  postedByAlumniName: string;
  postedByBatch: number;
  applicationLinkOrEmail: string;
  postedDate: string;
  deadline: string;
  status: JobStatus;
  workMode?: "Remote" | "Hybrid" | "On-site";
  openings?: number;
  salaryRange?: string;
  skills?: string[];
  whoCanApply?: "Students" | "Alumni" | "Both";
  applyMethod?: "portal" | "external";
  canRefer?: boolean;
  referralSlots?: number;
  posterId?: string;
  viewsCount?: number;
}

export interface BulletinItem {
  id: string;
  title: string;
  category: "Announcement" | "College Update" | "Opportunity";
  date: string;
  excerpt: string;
  content: string;
  priority: "High" | "Normal";
  fileAttachment?: string;
  status: ApprovalStatus;
}

export interface NewsletterIssue {
  id: string;
  volume: string;
  issue: string;
  title: string;
  publishDate: string;
  quarter: string;
  theme: string;
  downloadUrl: string;
  coverImage: string;
}

export interface SuccessStory {
  id: string;
  alumniName: string;
  batch: number;
  course: string;
  title: string;
  category: "Promotion" | "Award" | "Leadership" | "Hall of Fame";
  companyOrOrg: string;
  summary: string;
  fullStory: string;
  featuredImage: string;
  quote?: string;
  status: ApprovalStatus;
}

export interface AlumniBusiness {
  id: string;
  name: string;
  founderName: string;
  batch: number;
  industry: DomainCategory;
  foundedYear: number;
  website: string;
  city: string;
  description: string;
  logoPlaceholder: string;
  discountOffer?: string;
  status: ApprovalStatus;
}

export interface Mentor {
  id: string;
  name: string;
  batch: number;
  designation: string;
  company: string;
  domain: DomainCategory;
  topics: string[];
  slotsAvailable: number;
  bio: string;
  linkedinUrl: string;
  status: ApprovalStatus;
}

export interface LearningProgram {
  id: string;
  title: string;
  provider: string;
  duration: string;
  format: "Executive Weekend" | "Self-Paced" | "Live Cohort";
  category: DomainCategory;
  description: string;
  alumniPerk: string;
  link: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  event: string;
  year: number;
  imageUrl: string;
  caption: string;
}

export interface HelpDeskTicket {
  id: string;
  ticketNumber: string;
  name: string;
  email: string;
  phone: string;
  batch: string;
  category:
    | "Certificate / Document Assistance"
    | "Event Queries"
    | "Profile Update Assistance"
    | "Suggestions & Feedback"
    | "General Query";
  subject: string;
  message: string;
  createdAt: string;
  status: "Open" | "In Review" | "Resolved";
  adminNote?: string;
  statusHistory?: Array<{ status: string; date: string; note?: string }>;
}

export interface GiveBackSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  batch: number;
  type:
    | "Guest Speaker"
    | "Offer Internships"
    | "Hire Poddar Students"
    | "Mentor Students"
    | "Collaborate with Poddar"
    | "Business Collaboration";
  organization: string;
  message: string;
  createdAt: string;
  status: ApprovalStatus;
}

// ==========================================
// Phase 6: Opportunities Network Types
// ==========================================

export type PortalUserRole = "alumnus" | "student" | "admin" | "alumni" | "guest";

export interface StudentUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  enrollmentNumber: string;
  course: string;
  yearOfStudy: string;
  skills: string[];
  linkedinUrl?: string;
  avatarUrl?: string;
  joinedDate: string;
  isActive: boolean;
  resumeFileName?: string;
  bio?: string;
}

export type WorkMode = "Remote" | "Hybrid" | "On-site";
export type WhoCanApply = "Students" | "Alumni" | "Both";
export type ApplyMethod = "portal" | "external";

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: "alumni" | "alumnus" | "student" | "admin" | "guest";
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

export type ApplicationStatus =
  | "Applied"
  | "Shortlisted"
  | "Interview"
  | "Interviewing"
  | "Selected"
  | "Offered"
  | "Not selected"
  | "Rejected"
  | "Reviewed"
  | "Withdrawn";

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  applicantId: string;
  applicantName: string;
  applicantRole: "student" | "alumnus";
  applicantCourseOrCompany: string;
  applicantEmail: string;
  coverNote: string;
  resumeFileName: string;
  appliedDate: string;
  status: ApplicationStatus;
  statusHistory: Array<{ status: ApplicationStatus; date: string; note?: string }>;
  referredBy?: string;
  referralRequestId?: string;
}

export type ReferralStatus = "Requested" | "Accepted" | "Referred" | "Declined";

export interface ReferralRequest {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  requesterId: string;
  requesterName: string;
  requesterRole: "student" | "alumnus";
  requesterCourseOrCompany: string;
  referrerId: string;
  referrerName: string;
  message: string;
  resumeFileName?: string;
  status: ReferralStatus;
  createdAt: string;
  updatedAt: string;
  declineReason?: string;
  history: Array<{ status: ReferralStatus; date: string; note?: string }>;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: "student" | "alumnus";
  text: string;
  createdAt: string;
  read: boolean;
}

export interface ChatConversation {
  id: string;
  participantIds: string[];
  participants: Array<{
    id: string;
    name: string;
    role: "student" | "alumnus";
    avatarUrl?: string;
    courseOrCompany?: string;
  }>;
  jobContext?: {
    jobId: string;
    jobTitle: string;
    company: string;
  };
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount: Record<string, number>;
  isBlocked?: boolean;
  blockedById?: string;
}

export interface PortalNotification {
  id: string;
  userId: string;
  targetRole?: "alumnus" | "student" | "all";
  title: string;
  message: string;
  type: "application" | "referral" | "message" | "job" | "system";
  link?: string;
  read: boolean;
  createdAt: string;
}

export interface ChatReport {
  id: string;
  conversationId: string;
  reportedById: string;
  reportedByName: string;
  reporterName?: string;
  reportedUserId: string;
  reportedUserName: string;
  reason: string;
  note?: string;
  notes?: string;
  createdAt: string;
  status: "open" | "dismissed" | "actioned" | "pending" | "warned" | "user_blocked";
  actionTaken?: string;
  transcriptPreview?: Array<{ sender: string; text: string; time: string }>;
}


