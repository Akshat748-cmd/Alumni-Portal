import { SuccessStory, AlumniBusiness } from "./types";
import { IMAGES } from "./images";

export const INITIAL_SUCCESS_STORIES: SuccessStory[] = [
  {
    id: "st-1",
    alumniName: "Vikramaditya Rathore",
    batch: 2008,
    course: "MBA (Finance & Strategy)",
    title: "Sample Profile: Professional Diligence in Advisory Leadership",
    category: "Leadership",
    companyOrOrg: "Apex Capital Advisory (Sample Enterprise)",
    summary:
      "Managing Director Vikramaditya shares his journey building a client-focused financial advisory practice in western India.",
    fullStory:
      "Grounded in disciplined financial modeling and ethical principles developed at Poddar, Vikramaditya guided his practice through multiple market cycles, building enduring corporate advisory partnerships across manufacturing and service sectors.",
    featuredImage: IMAGES.portraits.p2,
    quote: "Institutional ethics and relentless diligence are the truest compound interest in professional finance.",
    status: "approved",
  },
  {
    id: "st-2",
    alumniName: "Ananya Deshmukh",
    batch: 2014,
    course: "MCA (Software Systems)",
    title: "Sample Profile: Architecture Leadership in Distributed Cloud Systems",
    category: "Award",
    companyOrOrg: "NovaCrest Cloud Solutions (Sample Enterprise)",
    summary:
      "Ananya was recognized at an industry technology forum for architecting reliable distributed systems and open-source tooling.",
    fullStory:
      "Ananya progressed from systems analyst to Principal Cloud Architect. Her collaborative open-source contributions to container networking have supported modern infrastructure deployments across tech teams.",
    featuredImage: IMAGES.portraits.p1,
    quote: "Complex distributed challenges can be resolved by designing decoupled, reliable boundaries.",
    status: "approved",
  },
  {
    id: "st-3",
    alumniName: "Aditya Narang",
    batch: 2012,
    course: "BBA (Entrepreneurship)",
    title: "Sample Venture: Expanding Rural Cold Chain Storage Solutions",
    category: "Leadership",
    companyOrOrg: "Zenith AgriVentures (Sample Venture)",
    summary:
      "Aditya's venture partners with regional farmers and retail supply chains to minimize post-harvest horticulture wastage.",
    fullStory:
      "Starting from a single regional storage facility, Aditya and his team developed modular micro-chambers that preserve fruit and vegetable quality, significantly assisting regional agricultural realization.",
    featuredImage: IMAGES.portraits.p7,
    quote: "Technology fulfills its true purpose when it meaningfully supports grassroots producers.",
    status: "approved",
  },
  {
    id: "st-4",
    alumniName: "Dr. Priyamvada Joshi",
    batch: 2011,
    course: "M.Sc (Biotechnology)",
    title: "Sample Appointment: Helming Clinical Diagnostic Operations",
    category: "Promotion",
    companyOrOrg: "Aarogya Diagnostics Labs (Sample Enterprise)",
    summary:
      "Dr. Joshi was promoted to lead laboratory operations across regional facilities, introducing automated molecular screening workflows.",
    fullStory:
      "Following her master's studies at Poddar, Dr. Joshi pursued specialized pathology research. Under her clinical direction, the diagnostic centers implemented rigorous quality auditing and accessible preventive screening panels.",
    featuredImage: IMAGES.portraits.p3,
    quote: "Methodological precision in laboratory diagnostics translates directly into better health outcomes.",
    status: "approved",
  },
  {
    id: "st-5",
    alumniName: "Raghavendra Singhania",
    batch: 2006,
    course: "BBA (International Business)",
    title: "Sample Recognition: Traditional Artisan Jewelry & Ethical Craft Stewardship",
    category: "Hall of Fame",
    companyOrOrg: "Singhania Heritage Gems (Sample Enterprise)",
    summary:
      "A dedicated patron of traditional Rajasthani craftsmen, Raghavendra has brought authentic Jadau and Kundan jewelry designs to international exhibitions.",
    fullStory:
      "Raghavendra established fair-wage artisan cooperatives across Jaipur, training apprentice jewelers while prioritizing certified sourcing for colored gemstones.",
    featuredImage: IMAGES.portraits.p4,
    quote: "Preserving cultural craft traditions thrives when paired with contemporary business ethics.",
    status: "approved",
  },
  {
    id: "st-6",
    alumniName: "Vivek Bhargava",
    batch: 2009,
    course: "MBA (Banking)",
    title: "Sample Promotion: Appointed Senior Risk Specialist at FinPulse",
    category: "Promotion",
    companyOrOrg: "FinPulse NeoBank (Sample Enterprise)",
    summary:
      "Vivek assumed risk stewardship at a digital financial platform, managing credit analytics and audit compliance.",
    fullStory:
      "With extensive background in banking and portfolio risk, Vivek implements automated assessment models and fraud prevention safeguards.",
    featuredImage: IMAGES.portraits.p6,
    quote: "Sustainable financial growth requires disciplined, proactive risk governance.",
    status: "approved",
  },
  {
    id: "st-7",
    alumniName: "Sunita Verma",
    batch: 2009,
    course: "B.Ed & MA (Education)",
    title: "Sample Citation: Activity-Based Mathematics Pedagogy Initiative",
    category: "Award",
    companyOrOrg: "Pratham Vidya Academy (Sample School)",
    summary:
      "Recognized for developing interactive numeracy curriculum implemented across community learning centers.",
    fullStory:
      "Dean Sunita Verma designed the 'Joyful Numbers' initiative, utilizing cultural counting games and puzzles to teach foundational mathematics with measurable engagement.",
    featuredImage: IMAGES.portraits.p5,
    quote: "Every learner is an intuitive mathematician when concepts are shared with patience and empathy.",
    status: "approved",
  },
  {
    id: "st-8",
    alumniName: "Kabir Sharma",
    batch: 2016,
    course: "MBA (Marketing)",
    title: "Sample Showcase: Digital Awareness Campaign Recognized for Brand Impact",
    category: "Award",
    companyOrOrg: "Pulse Media Works (Sample Agency)",
    summary:
      "VP Kabir Sharma spearheaded a creative digital awareness initiative promoting online literacy in regional communities.",
    fullStory:
      "Reaching diverse regional audiences through short-form informative content, Kabir's communication campaign blended relatable storytelling with clear educational takeaways.",
    featuredImage: IMAGES.portraits.p8,
    quote: "Authentic resonance and audience empathy inspire lasting community trust.",
    status: "approved",
  },
];

export const INITIAL_BUSINESSES: AlumniBusiness[] = [
  {
    id: "biz-1",
    name: "Singhania Heritage Gems",
    founderName: "Raghavendra Singhania",
    batch: 2006,
    industry: "Jewellery & Fashion",
    foundedYear: 2009,
    website: "https://singhaniaheritage.mock",
    city: "Jaipur",
    description:
      "Heritage high-jewellery house specializing in certified natural Colombian emeralds, Mozambican rubies, and royal Rajasthani Jadau heirlooms.",
    logoPlaceholder: "SHG",
    discountOffer: "Exclusive 15% making charge waiver for Poddar alumni with valid portal ID.",
    status: "approved",
  },
  {
    id: "biz-2",
    name: "NovaCrest Cloud Solutions",
    founderName: "Ananya Deshmukh (Co-Founder)",
    batch: 2014,
    industry: "IT & Technology",
    foundedYear: 2019,
    website: "https://novacrest.mock",
    city: "Bengaluru",
    description:
      "Enterprise cloud architecture, Kubernetes automation, serverless modernization, and 24/7 Managed DevSecOps consulting.",
    logoPlaceholder: "NCS",
    discountOffer: "Free 1-month architecture audit for alumni-founded startups.",
    status: "approved",
  },
  {
    id: "biz-3",
    name: "Zenith AgriVentures",
    founderName: "Aditya Narang",
    batch: 2012,
    industry: "Business & Entrepreneurship",
    foundedYear: 2017,
    website: "https://zenithagri.mock",
    city: "Pune",
    description:
      "Tech-enabled farm-to-enterprise fresh produce supply chain integrating farm-gate cold storage and direct logistics.",
    logoPlaceholder: "ZAV",
    discountOffer: "Priority B2B procurement terms for alumni food services and restaurant chains.",
    status: "approved",
  },
  {
    id: "biz-4",
    name: "Aarogya Diagnostics Labs",
    founderName: "Dr. Priyamvada Joshi (Founding Director)",
    batch: 2011,
    industry: "Healthcare",
    foundedYear: 2016,
    website: "https://aarogyalabs.mock",
    city: "Delhi NCR",
    description:
      "NABL-accredited diagnostic labs providing molecular pathology, preventative health packages, and corporate health checkups.",
    logoPlaceholder: "ADL",
    discountOffer: "25% discount on all comprehensive annual wellness health checks for alumni and families.",
    status: "approved",
  },
  {
    id: "biz-5",
    name: "Pulse Media Works",
    founderName: "Kabir Sharma (Founding Partner)",
    batch: 2016,
    industry: "Marketing & Advertising",
    foundedYear: 2020,
    website: "https://pulsemedia.mock",
    city: "Mumbai",
    description:
      "Performance creative agency specializing in omnichannel brand launches, creator influencer campaigns, and narrative production.",
    logoPlaceholder: "PMW",
    discountOffer: "Complimentary branding strategy playbook for early-stage alumni ventures.",
    status: "approved",
  },
  {
    id: "biz-6",
    name: "Trivecta Audit Partners",
    founderName: "Gaurav Sen",
    batch: 2007,
    industry: "Finance & Banking",
    foundedYear: 2012,
    website: "https://trivecta.mock",
    city: "Kolkata",
    description:
      "Chartered accountancy firm offering statutory audits, transfer pricing, corporate taxation advisory, and due diligence services.",
    logoPlaceholder: "TAP",
    discountOffer: "Complimentary initial tax structure advisory consultation for new alumni businesses.",
    status: "approved",
  },
];

