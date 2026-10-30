export interface NavSubItem {
  title: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface NavItem {
  id: string;
  order: number;
  title: string;
  href: string;
  description: string;
  items: NavSubItem[];
}

export const MAIN_NAVIGATION: NavItem[] = [
  {
    id: "join-network",
    order: 1,
    title: "Join the Network",
    href: "/join",
    description: "Connect to your alma mater, update credentials, and explore membership benefits",
    items: [
      {
        title: "Register / Login",
        href: "/join/auth",
        description: "Access your personalized Poddar alumni dashboard and directory access",
      },
      {
        title: "Update My Profile",
        href: "/join/profile",
        description: "Keep your professional designation, domain tags, and contact details current",
      },
      {
        title: "Membership (Optional)",
        href: "/join/membership",
        description: "Discover life membership tiers, patron circles, and exclusive privileges",
      },
    ],
  },
  {
    id: "alumni-bulletin",
    order: 2,
    title: "Alumni Bulletin",
    href: "/bulletin",
    description: "Official institutional updates, news letters, and time-critical opportunities",
    items: [
      {
        title: "Announcements",
        href: "/bulletin/announcements",
        description: "Official institutional notices, campus developments, and governance news",
      },
      {
        title: "College Updates",
        href: "/bulletin/college-updates",
        description: "Academic milestones, accreditations, and infrastructure expansions",
      },
      {
        title: "Newsletters",
        href: "/bulletin/newsletters",
        description: "Quarterly Poddar Chronicle editions and archived institutional digests",
      },
      {
        title: "Important Opportunities",
        href: "/bulletin/opportunities",
        description: "Time-sensitive grants, awards nominations, and executive invitations",
      },
    ],
  },
  {
    id: "alumni-spotlight",
    order: 3,
    title: "Alumni Spotlight",
    href: "/spotlight",
    description: "Celebrating trailblazers, leadership promotions, and entrepreneurial ventures",
    items: [
      {
        title: "Alumni News",
        href: "/spotlight/news",
        description: "Media features, thought leadership, and institutional achievements",
      },
      {
        title: "Success Stories",
        href: "/spotlight/success-stories",
        description: "Inspiring journeys from Poddar classrooms to global boardrooms",
      },
      {
        title: "Promotions & Awards",
        href: "/spotlight/awards",
        description: "Honoring alumni recognized by national and international organizations",
      },
      {
        title: "Entrepreneurs & Startups",
        href: "/spotlight/entrepreneurs",
        description: "Alumni founders scaling groundbreaking ventures across industries",
      },
      {
        title: "Distinguished Alumni",
        href: "/spotlight/distinguished",
        description: "Hall of Fame recipients and lifetime institutional contributors",
      },
      {
        title: "Share Your Achievement",
        href: "/spotlight/share",
        description: "Submit personal milestones and recognitions for community spotlight",
      },
    ],
  },
  {
    id: "reunions-gatherings",
    order: 4,
    title: "Reunions & Gatherings",
    href: "/reunions",
    description: "Campus homecomings, regional chapter meets, and masterclass webinars",
    items: [
      {
        title: "Upcoming Events",
        href: "/reunions/upcoming",
        description: "Browse the calendar of worldwide gatherings and networking forums",
      },
      {
        title: "Reunions",
        href: "/reunions/batch",
        description: "Annual homecoming celebrations, batch milestone reunions, and jubilees",
      },
      {
        title: "Webinars & Workshops",
        href: "/reunions/webinars",
        description: "Interactive virtual knowledge exchange sessions led by industry pioneers",
      },
      {
        title: "Register Online",
        href: "/reunions/register",
        description: "Reserve your seat, view attendee rosters, and download digital passes",
      },
      {
        title: "Photos / Highlights",
        href: "/reunions/gallery",
        description: "Memories, photo archives, and video recaps from past events",
      },
    ],
  },
  {
    id: "alumni-directory",
    order: 5,
    title: "Alumni Directory",
    href: "/directory",
    description: "Search verified alumni, explore industry domains, and connect globally",
    items: [
      {
        title: "Search Alumni",
        href: "/directory/search",
        description: "Filter verified alumni by batch, course, company, industry, or location",
      },
      {
        title: "Explore by Domain",
        href: "/directory/domains",
        description: "Discover alumni categorized across key industry sectors and domains",
      },
      {
        title: "Business Directory",
        href: "/directory/businesses",
        description: "Support and partner with businesses founded and managed by alumni",
      },
      {
        title: "Connect",
        href: "/directory/connect",
        description: "Send direct connection requests, professional intros, and messages",
      },
    ],
  },
  {
    id: "career-hub",
    order: 6,
    title: "Career Hub",
    href: "/career-hub",
    description: "Career mobility, executive opportunities, upskilling, and mentorship programs",
    items: [
      {
        title: "Jobs & Internships",
        href: "/career-hub/jobs",
        description: "Curated vacancies and internship listings from top alumni employers",
      },
      {
        title: "Post an Opportunity",
        href: "/career-hub/post",
        description: "Hire trusted talent from your alma mater by listing open roles",
      },
      {
        title: "Learning & Upskilling",
        href: "/career-hub/upskilling",
        description: "Executive certificates, alumni discount courses, and specialized workshops",
      },
      {
        title: "Find a Mentor",
        href: "/career-hub/find-mentor",
        description: "Get 1-on-1 guidance from established leaders in your chosen domain",
      },
      {
        title: "Become a Mentor",
        href: "/career-hub/become-mentor",
        description: "Shape the next generation of Poddar graduates by sharing your expertise",
      },
    ],
  },
  {
    id: "give-back",
    order: 7,
    title: "Give Back",
    href: "/give-back",
    description: "Contribute knowledge, institutional partnerships, and campus engagements",
    items: [
      {
        title: "Guest Speaker",
        href: "/give-back/speaker",
        description: "Deliver keynote guest lectures and share industry best practices",
      },
      {
        title: "Offer Internships",
        href: "/give-back/internships",
        description: "Create summer training opportunities for bright pre-final year students",
      },
      {
        title: "Hire Poddar Students",
        href: "/give-back/hire",
        description: "Partner with campus training & placement cell for campus recruitment",
      },
      {
        title: "Mentor Students",
        href: "/give-back/mentor",
        description: "Guide current undergraduate and postgraduate students through capstones",
      },
      {
        title: "Collaborate with Poddar",
        href: "/give-back/collaborate",
        description: "Academic advisory boards, curriculum reviews, and research alliances",
      },
      {
        title: "Business Collaboration",
        href: "/give-back/business-networking",
        description: "Enterprise consulting, B2B procurement, and incubation support",
      },
    ],
  },
  {
    id: "who-we-are",
    order: 8,
    title: "Who We Are",
    href: "/who-we-are",
    description: "Mission, charter, and governance of the Poddar Alumni Association",
    items: [
      {
        title: "About Alumni Network",
        href: "/who-we-are/about",
        description: "Historical heritage, foundational values, and global alumni network reach",
      },
      {
        title: "Objective",
        href: "/who-we-are/objective",
        description: "Strategic mission, core objectives, and community impact goals",
      },
      {
        title: "Alumni Office",
        href: "/who-we-are/office",
        description: "Dedicated secretariat, leadership team, and operational coordinates",
      },
    ],
  },
  {
    id: "help-desk",
    order: 9,
    title: "Help Desk",
    href: "/help-desk",
    description: "Dedicated assistance for transcripts, certificates, events, and queries",
    items: [
      {
        title: "Submit a Query / Request",
        href: "/help-desk/query",
        description: "File an official support ticket for institutional assistance",
      },
      {
        title: "Certificate / Document Assistance",
        href: "/help-desk/documents",
        description: "Request transcripts, degree verification, migration certificates, and LORs",
      },
      {
        title: "Event Queries",
        href: "/help-desk/events",
        description: "Inquiries regarding registrations, travel logistics, and accommodations",
      },
      {
        title: "Profile Update Assistance",
        href: "/help-desk/profile-support",
        description: "Assistance with account verification, email updates, and badge credentials",
      },
      {
        title: "Suggestions & Feedback",
        href: "/help-desk/feedback",
        description: "Share constructive recommendations to help us elevate network initiatives",
      },
      {
        title: "Contact Alumni Office",
        href: "/help-desk/contact",
        description: "Official direct hotline, email addresses, and campus visit hours",
      },
    ],
  },
];

export const FOOTER_SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/school/poddarinstitutes/",
    label: "Poddar Alumni on LinkedIn",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/poddarinstitutes/",
    label: "Poddar Alumni on Instagram",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/poddarinstitutes/",
    label: "Poddar Alumni on Facebook",
  },
];

export const ADMIN_LINK = {
  title: "Admin Panel",
  href: "/admin",
  description: "Administrative moderation queue, approvals, metrics, and portal settings",
};

