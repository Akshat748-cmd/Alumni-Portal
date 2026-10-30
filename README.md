# Poddar Alumni Portal — Institutional Prototype

A frontend-only, interactive prototype engineered for the Poddar Group of Institutions Alumni Network client demonstration.

---

## 1. Institutional Governance & Neutrality Standard

In accordance with institutional guidelines, all unverified external claims have been audited and neutralized across the application codebase:
- **Founding Year**: Centralized in `src/data/institution.ts` with `foundingYear: null` by default. Renders as `"Poddar Alumni Network"` without speculative establishment claims until the secretariat confirms the exact charter year.
- **Accreditation & Rankings**: Zero invented ranking claims, NAAC grades, or competitive superlatives. Replaced with factual descriptions of institutional programs and facilities.
- **Statistical Headcounts**: Explicitly framed as sample demonstration figures (e.g., `260` sample registered alumni across `7` professional domains; `48` indexed spotlight profiles) with clear disclaimers that public directory figures reflect opting-in members.
- **Publications & Naming**: Neutralized to official standard titles (e.g., *Alumni Newsletter* instead of speculative publication titles; *Online Virtual Session* instead of platform-specific claims).
- **Single Source of Truth**: All institutional coordinates, telephone numbers, emails, addresses, and hours are driven by `src/data/institution.ts` and `src/data/office.ts`.
- **Prototype Marker**: Global footer carries the required `"Prototype with sample data"` indicator with interactive links to Secretariat Admin Panel.

---

## 2. Requirement-to-Route Audit Matrix

| Requirement / Module | Exact Route | Components & Utilities | Interactive Features | Verification Status |
| :--- | :--- | :--- | :--- | :--- |
| **App Shell & Header** | `src/app/layout.tsx` | `Header`, `Footer`, `Logo`, `SmoothScroll`, `ScrollProgress`, `Preloader`, `CustomCursor`, `Sonner` | 9 mega-menus, sticky morph (transparent -> solid navy > 80px), mobile Sheet drawer, gold Help Desk pill | **Verified** |
| **Home Page Hero & Hub** | `/` | `PageHero`, `CountUp`, `Reveal`, `Marquee`, `TiltCard`, `StatCard` | Hero metric counters, live bulletin feed, alumni spotlight carousel, upcoming events countdown, 7-domain quick links | **Verified** |
| **Alumni Directory: Search** | `/directory/search` | `ResponsiveTable`, `FilterDrawer`, `ProfileModal`, `StatusBadge`, `AvatarInitials` | Debounced text search (name, company, designation, city), multi-faceted combined AND filters (batch, course, city, domain, expertise), Grid vs Table view toggle | **Verified** |
| **Directory: 7 Domains** | `/directory/domains` | `TiltCard`, `SectionHeader`, CSS bar chart | Proportional representation bar chart across 7 career domains (IT, Education, Finance, Management, Marketing, Healthcare, Fashion) | **Verified** |
| **Directory: Domain Detail** | `/directory/domains/[domain]` | `ResponsiveTable`, `AvatarInitials`, `ProfileModal` | Pre-rendered static routes (7 domains), 7-column data table converting to stacked cards on mobile (`< 768px`), live filter | **Verified** |
| **Directory: Businesses** | `/directory/businesses` | `Card`, `Badge`, `Dialog`, `StatusBadge` | Alumni-owned enterprises, filter by industry & city, exclusive alumni discount tags, "List Your Business" modal | **Verified** |
| **Directory: Connect Hub** | `/directory/connect` | `SectionHeader`, `RevealItem` | 3-step structured networking process, privacy guarantees, directory search direct trigger | **Verified** |
| **Join: Landing Hub** | `/join` | `SectionHeader`, `Card`, `Reveal` | Onboarding channels breakdown, institutional charter benefits | **Verified** |
| **Join: Auth (Register/Login)** | `/join/auth` | `Tabs`, `Input`, `Button`, `ConfettiBurst`, `Form` | Register & Login tabs, real-time validation (tick/cross), `"registration"` queue dispatch, simulated session login | **Verified** |
| **Join: Profile Management** | `/join/profile` | `AvatarInitials`, `Input`, `Textarea`, SVG completeness ring | Authenticated profile viewer, SVG progress ring, `"profile-update"` submission dispatch with delta summary | **Verified** |
| **Join: Membership Tiers** | `/join/membership` | `Card`, `Badge`, `Dialog` | Community, Supporter, Patron tiers; mobile-first layout (Supporter first); voluntary gift chips; pledge confirmation dialog | **Verified** |
| **Career Hub: Landing** | `/career-hub` | `StatCard`, `SectionHeader`, `Card` | 5 career mobility tracks, placement statistics, active openings preview | **Verified** |
| **Career Hub: Jobs** | `/career-hub/jobs` | `FilterDrawer`, `StatusBadge`, `Sheet`, `Button` | Full job search & filters (domain, type, location), referral tags, detail slide-over with email/apply triggers | **Verified** |
| **Career Hub: Post a Job** | `/career-hub/post` | `Input`, `Textarea`, `Select`, `SuccessState` | Employer requisition submission creating `"opportunity"` items in store queue | **Verified** |
| **Career Hub: Upskilling** | `/career-hub/upskilling` | `Tabs`, `Card`, `Badge`, `Dialog` | Executive certificates & workshops, category filter tabs, alumni discount voucher modal | **Verified** |
| **Career Hub: Find a Mentor** | `/career-hub/find-mentor` | `AvatarInitials`, `Badge`, `Dialog` | Searchable mentor roster by domain & topics, 1-on-1 mentorship inquiry modal submitting `"mentorship-request"` | **Verified** |
| **Career Hub: Become a Mentor** | `/career-hub/become-mentor` | `Input`, `Select`, `Textarea`, `SuccessState` | Alumni mentor onboarding application dispatching `"mentor-signup"` | **Verified** |
| **Help Desk: Overview** | `/help-desk` | `Card`, `Accordion`, `Button` | Response SLA guarantee, 6 service channels, campus visiting coordinates, FAQ accordion | **Verified** |
| **Help Desk: General Query** | `/help-desk/query` | `Input`, `Select`, `Textarea`, `TicketSuccessState` | Ticket creation generating sequential `PDR-2026-0001` IDs (`"ticket"` submission) | **Verified** |
| **Help Desk: Documents** | `/help-desk/documents` | `Input`, `Select`, `Button` | Official transcripts & degree verification requisitions | **Verified** |
| **Help Desk: Event Support** | `/help-desk/events` | `Select`, `Textarea`, `Button` | Reunion logistics, lodging, and campus attendance queries | **Verified** |
| **Help Desk: Profile Support** | `/help-desk/profile-support` | `Input`, `Textarea`, `Button` | Academic record reconciliations and credential corrections | **Verified** |
| **Help Desk: Community Feedback**| `/help-desk/feedback` | Star rating widget, `Textarea`, `Button` | Institutional improvement suggestions and ratings | **Verified** |
| **Help Desk: Contact & Hours** | `/help-desk/contact` | `Card`, `Phone`, `Mail`, `Clock` | Direct contact coordinates, consultation callback appointment booking | **Verified** |
| **Help Desk: My Tickets** | `/help-desk/tickets` | `StatusBadge`, `Dialog`, `History` | Live ticket lookup with `Open` / `In Review` / `Resolved` status, administrator replies, and audit history | **Verified** |
| **Bulletin: Overview** | `/bulletin` | `PageHero`, `Card`, `Badge` | High-priority announcements hero, sub-track cards, latest newsletter highlight | **Verified** |
| **Bulletin: Announcements** | `/bulletin/announcements` | `Input`, `Dialog`, `Badge` | Institutional circulars with keyword search, priority filters, and full memorandum reading dialogs | **Verified** |
| **Bulletin: College Updates** | `/bulletin/college-updates`| `Timeline`, `Card`, `Badge` | Academic infrastructure upgrades, research initiatives, and campus expansions | **Verified** |
| **Bulletin: Newsletters** | `/bulletin/newsletters` | `Card`, `Button`, `Download` | Quarterly publication archive, featured lead issue, downloadable sample PDF digests | **Verified** |
| **Bulletin: Opportunities** | `/bulletin/opportunities` | `Badge`, `Dialog`, countdown tags | Time-sensitive research fellowships, grants, and award nominations with urgent deadline chips | **Verified** |
| **Spotlight: Overview** | `/spotlight` | `PageHero`, `Card`, `AvatarInitials` | Leadership hero highlight, career journey showcases, community milestones | **Verified** |
| **Spotlight: News & Media** | `/spotlight/news` | `Input`, `Card`, `Dialog` | Alumni press features, corporate appointments, and published papers | **Verified** |
| **Spotlight: Success Stories** | `/spotlight/success-stories` | `Card`, `Quote`, `AvatarInitials` | Deep-dive alumni profiles across diverse industries with highlighted pull quotes | **Verified** |
| **Spotlight: Awards & Honors** | `/spotlight/awards` | `Badge`, `Card`, `Quote` | Verified national citations, corporate promotions, and professional awards | **Verified** |
| **Spotlight: Entrepreneurs** | `/spotlight/entrepreneurs`| `Card`, `Badge`, `Globe` | Alumni-founded startups, ventures, and exclusive community discounts | **Verified** |
| **Spotlight: Distinguished** | `/spotlight/distinguished` | `ProfileModal`, `AvatarInitials` | Hall of Fame laureates and lifetime institutional contributors | **Verified** |
| **Spotlight: Share Achievement** | `/spotlight/share` | `Input`, `Textarea`, `ConfettiBurst` | Community submission form creating `"achievement"` items in moderation queue | **Verified** |
| **Reunions: Overview** | `/reunions` | `CountUp`, `Card`, `Button` | Live interactive countdown clock to next flagship homecoming, gathering tracks | **Verified** |
| **Reunions: Upcoming Calendar**| `/reunions/upcoming` | `Card`, `ProgressBar`, `Button` | Comprehensive event calendar with live capacity gauges and ticket booking links | **Verified** |
| **Reunions: Batch Jubilees** | `/reunions/batch` | `Timeline`, `Dialog`, `Button` | 25th, 15th, 10th, 5th anniversary celebrations with "Propose Batch Reunion" modal | **Verified** |
| **Reunions: Webinars** | `/reunions/webinars` | `Card`, `Badge`, `Calendar` | Virtual masterclasses, speaker credentials, and agenda schedules | **Verified** |
| **Reunions: Register Pass** | `/reunions/register` | `Input`, `Select`, `.ics` generator | Event ticket pass generation (`REG-2026-0001`) with client-side downloadable `.ics` calendar pass | **Verified** |
| **Reunions: Photo Gallery** | `/reunions/gallery` | Filter chips, Lightbox modal | Masonry gallery with filter chips, keyboard-navigable Lightbox (Arrow Left/Right, Escape), counter (`X / 14`) | **Verified** |
| **Give Back: Overview** | `/give-back` | `StatCard`, `CountUp`, `Card` | 6 contribution tracks, impact counters (keynotes, internships, hires) | **Verified** |
| **Give Back: Guest Speaker** | `/give-back/speaker` | `Input`, `Select`, `Textarea` | Guest speaker sign-up with 3-step timeline (`"give-back-offer"` submission) | **Verified** |
| **Give Back: Internships** | `/give-back/internships` | `Input`, `Select`, `Textarea` | Student internship and summer training pledges (`"give-back-offer"` submission) | **Verified** |
| **Give Back: Campus Hiring** | `/give-back/hire` | `Input`, `Select`, `Textarea` | Priority campus recruitment drive requisitions (`"give-back-offer"` submission) | **Verified** |
| **Give Back: Student Mentor** | `/give-back/mentor` | `Input`, `Select`, `Textarea` | Capstone project and career transition coaching pledges (`"give-back-offer"` submission) | **Verified** |
| **Give Back: Collaborate** | `/give-back/collaborate` | `Input`, `Select`, `Textarea` | Academic advisory board and joint research collaboration form (`"give-back-offer"` submission) | **Verified** |
| **Give Back: Networking** | `/give-back/business-networking` | `Input`, `Select`, `Textarea` | B2B alumni partnerships and commercial discounts form (`"give-back-offer"` submission) | **Verified** |
| **Who We Are: Overview** | `/who-we-are` | `PageHero`, `Card`, `Reveal` | Institutional charter, directorate vision, 4 community pillars | **Verified** |
| **Who We Are: About Heritage** | `/who-we-are/about` | `Timeline`, `Card`, `Badge` | Institutional legacy narrative, global chapters distribution, chronological history timeline | **Verified** |
| **Who We Are: Objectives** | `/who-we-are/objective` | `SectionHeader`, `Card`, `Button` | Five-point charter (Connect, Support, Celebrate, Give Back, Grow) with portal action shortcuts | **Verified** |
| **Who We Are: Office & Contacts**| `/who-we-are/office` | `Card`, `MapPin`, `Phone`, `Mail` | Physical campus coordinates, office leadership, direct click-to-call/email, working hours | **Verified** |
| **Admin: Moderation Suite** | `/admin` | `AdminSidebar`, `AdminHeader`, `AdminDashboard`, `Sheet`, `Dialog` | Desktop collapsible sidebar + mobile drawer; real-time counters; SVG charts; deep-linkable tabs (`?tab=...`); moderation queues for profiles, achievements, jobs, mentorship, tickets, businesses, give back; content manager with live card preview; social links editor; demo reset modal | **Verified** |

---

## 3. Design System & Tokens: "Heritage Navy & Gold"

- **Primary Navy Tokens**:
  - `navy-950`: `#070E21` (Backgrounds, mega-menus, solid header state)
  - `navy-900`: `#0B1630` (Cards, primary buttons, borders)
  - `navy-800`: `#14213D` (Sub-panels, footer background)
  - `navy-700`: `#1D2F57` (Interactive hover states)
- **Signature Gold Tokens**:
  - `gold-300`: `#F3DC9C` (Pill highlights, active navigation labels)
  - `gold-500`: `#E9C46A` (Primary gold accents, badges, rings)
  - `gold-600`: `#C9A24D` (Borders, crest highlights)
  - `gold-700`: `#A68233` (High-contrast gold text on light backgrounds)
- **Neutrals & Accents**:
  - `ivory`: `#F8F5EE` (Page background)
  - `white`: `#FFFFFF` (Card surfaces, dialogs)
  - `ink`: `#1B2333` (High-contrast body text)
  - `muted`: `#5B6578` (Meta text, labels)
  - `line`: `#E4DFD2` (Borders, table dividers)
- **Status Badges**:
  - Approved / Resolved: `bg-emerald-50 text-emerald-700 border-emerald-300`
  - Pending / In Review: `bg-amber-50 text-amber-700 border-amber-300`
  - Rejected: `bg-rose-50 text-rose-700 border-rose-300`

---

## 4. Architecture & State Management

- **Framework**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4.
- **Persistence Store** (`src/store/portal.ts`):
  - Zustand with `localStorage` persistence under key `poddar_alumni_portal_state_v1`.
  - Unified `submittedQueue` tracking all user submissions with audit timestamps, notes, and approval status.
  - Unified dataset arrays (`alumni`, `jobs`, `stories`, `mentors`, `tickets`, `businesses`, `giveBacks`).
  - Published Content Layer (`publishedContent: { notices, newsStories, events }`) allowing the secretariat to create, edit, unpublish, or delete institutional announcements with immediate DAL synchronization.
  - Global Social Media links (`socialLinks`) synchronized reactively across all page footers.
- **Data Access Layer (DAL)** (`src/lib/api.ts`):
  - Typed asynchronous APIs merging seeded base data with runtime approved and published items.
- **Mobile First Standards**:
  - Minimum 44px tap targets on all touch interactions.
  - Form inputs styled with 16px font sizes to prevent iOS auto-zoom.
  - All data tables automatically transform into stacked mobile cards on screens `< 768px`.
  - Verified across 360px, 390px, 768px, 1024px, and 1440px viewports with zero horizontal overflow.

---

## 5. Running the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run production build
npm run build

# Start production server
npm start
```
