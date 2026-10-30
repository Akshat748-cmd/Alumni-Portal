import { BulletinItem, NewsletterIssue } from "./types";
import { IMAGES } from "./images";

export const INITIAL_BULLETIN: BulletinItem[] = [
  {
    id: "blt-1",
    title: "Poddar Group of Institutions Receives Academic Excellence & Curriculum Recognition",
    category: "College Update",
    date: "2026-10-24",
    priority: "High",
    excerpt:
      "Academic review committees have commended Poddar Group for its industry-integrated pedagogy, practical learning initiatives, and student amenities.",
    content:
      "The Academic Affairs Committee has reviewed and commended instructional standards across departments. This milestone highlights dedicated pedagogical programs, industry partnerships, and campus learning facilities. Alumni are invited to participate in the upcoming virtual symposium.",
    status: "approved",
  },
  {
    id: "blt-2",
    title: "Call for Proposals: Poddar Alumni Innovation Catalyst Fund (Sample Initiative)",
    category: "Opportunity",
    date: "2026-10-19",
    priority: "High",
    excerpt:
      "Applications are open for collaborative venture guidance, incubation workspace access, and seed assistance dedicated to alumni founders.",
    content:
      "In partnership with alumni mentors, we are pleased to announce the Innovation Catalyst initiative. Collaborative early-stage ventures founded by alumni and final-year students can apply for incubation workspace access and advisory mentorship.",
    status: "approved",
  },
  {
    id: "blt-3",
    title: "Official Notification: Annual Alumni General Assembly & Regional Chapter Meet",
    category: "Announcement",
    date: "2026-10-15",
    priority: "Normal",
    excerpt:
      "Notice is hereby given for the annual meeting of the Poddar Alumni Association to ratify chapter guidelines and plan regional initiatives.",
    content:
      "The Annual General Assembly of the Poddar Alumni Association will convene on Saturday, December 19, 2026, at 11:30 AM at the Main Campus Auditorium. Agenda items include ratification of regional chapter guidelines, presentation of annual activity reports, and nomination of regional conveners.",
    status: "approved",
  },
  {
    id: "blt-4",
    title: "Inauguration of the High-Performance Computing & Applied Technology Center",
    category: "College Update",
    date: "2026-10-08",
    priority: "Normal",
    excerpt:
      "Poddar expands computing infrastructure with an advanced laboratory dedicated to student capstones and collaborative alumni research initiatives.",
    content:
      "The new computing lab features enterprise computing clusters, high-throughput network backbones, and collaborative workstations. Alumni working in data science and computing are invited to collaborate on capstones with faculty.",
    status: "approved",
  },
  {
    id: "blt-5",
    title: "Call for Nominations: Annual Alumni Recognition Awards (Sample Nomination)",
    category: "Opportunity",
    date: "2026-09-30",
    priority: "High",
    excerpt:
      "Nominate peers or self-nominate across categories including Professional Leadership, Public Service, Entrepreneurship, and Research.",
    content:
      "At the annual gathering, Poddar honors graduates who have created notable societal or professional impact. The nomination window is open until November 25, 2026. Submissions are reviewed by an independent committee of senior faculty and alumni advisors.",
    status: "approved",
  },
  {
    id: "blt-6",
    title: "Alumni Chapter Expansion: Regional Hubs Coordinated Across Key Metros",
    category: "Announcement",
    date: "2026-09-20",
    priority: "Normal",
    excerpt:
      "Regional alumni groups are now active with local chapter conveners and periodic networking meetups scheduled.",
    content:
      "To foster camaraderie and professional networking for alumni stationed across diverse cities, chapter networks have been organized. Connect with your regional coordinator via the Alumni Directory to join official networking circles.",
    status: "approved",
  },
  {
    id: "blt-7",
    title: "New Professional Certificate in Sustainable Business Practice Announced",
    category: "Opportunity",
    date: "2026-09-10",
    priority: "Normal",
    excerpt:
      "Special alumni concessions on the newly introduced weekend executive development diploma starting next semester.",
    content:
      "Co-developed with experienced practitioners, this program equips managers to navigate sustainability frameworks and organizational reporting standards.",
    status: "approved",
  },
  {
    id: "blt-8",
    title: "Alumni Community Wellness & Health Screening Camp Report",
    category: "College Update",
    date: "2026-08-28",
    priority: "Normal",
    excerpt:
      "Alumni, students, and staff participated in the campus community wellness drive organized with medical volunteers.",
    content:
      "The Alumni Office conveys sincere gratitude to voluntary blood donors and alumni medical volunteers who assisted during the health camp.",
    status: "approved",
  },
];

export const INITIAL_NEWSLETTERS: NewsletterIssue[] = [
  {
    id: "nl-1",
    volume: "Vol. VIII",
    issue: "Issue 3",
    title: "Poddar Alumni Newsletter - Autumn Edition",
    publishDate: "October 2026",
    quarter: "Q3 2026",
    theme: "Leading Through Innovation: Digital Technology & Community Growth",
    downloadUrl: "#",
    coverImage: IMAGES.hero.convocation.src,
  },
  {
    id: "nl-2",
    volume: "Vol. VIII",
    issue: "Issue 2",
    title: "Poddar Alumni Newsletter - Summer Edition",
    publishDate: "July 2026",
    quarter: "Q2 2026",
    theme: "Professional Footprints: Alumni Enterprises & Global Projects",
    downloadUrl: "#",
    coverImage: IMAGES.events[1].src,
  },
  {
    id: "nl-3",
    volume: "Vol. VIII",
    issue: "Issue 1",
    title: "Poddar Alumni Newsletter - Spring Edition",
    publishDate: "April 2026",
    quarter: "Q1 2026",
    theme: "Campus & Community: Academic Progress and Student Capstones",
    downloadUrl: "#",
    coverImage: IMAGES.campus[0].src,
  },
  {
    id: "nl-4",
    volume: "Vol. VII",
    issue: "Issue 4",
    title: "Poddar Alumni Newsletter - Winter Edition",
    publishDate: "December 2025",
    quarter: "Q4 2025",
    theme: "Entrepreneurial Circles: Alumni Founders and Early Ventures",
    downloadUrl: "#",
    coverImage: IMAGES.events[2].src,
  },
  {
    id: "nl-5",
    volume: "Vol. VII",
    issue: "Issue 3",
    title: "Poddar Alumni Newsletter - Autumn Edition",
    publishDate: "September 2025",
    quarter: "Q3 2025",
    theme: "Mentorship Matters: Guidance for Tomorrow's Graduates",
    downloadUrl: "#",
    coverImage: IMAGES.events[3].src,
  },
  {
    id: "nl-6",
    volume: "Vol. VII",
    issue: "Issue 2",
    title: "Poddar Alumni Newsletter - Summer Edition",
    publishDate: "June 2025",
    quarter: "Q2 2025",
    theme: "Innovations in Healthcare & Laboratory Science",
    downloadUrl: "#",
    coverImage: IMAGES.campus[2].src,
  },
];

