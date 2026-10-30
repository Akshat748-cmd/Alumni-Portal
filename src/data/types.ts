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
  status: ApprovalStatus;
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

