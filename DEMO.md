# Poddar Alumni Portal — 5-Minute Client Demo Script

This script is designed for presenting the interactive prototype to the Poddar Group of Institutions secretariat, alumni board, and directorate. It showcases how every requirement is met with real-time interactivity.

---

## Pre-Demo Checklist (30 seconds)
1. Open the portal at `http://localhost:3000/`.
2. Ensure browser window is maximized or displayed on presentation display.
3. If previously tested, click **Reset Demo Data** from `/admin` or footer to start with fresh seeded records.

---

## ⏱️ Minute 0:00 – 1:00: Institutional Identity & Alumni Directory
**Target Routes**: `/` and `/directory/search`

### What to say:
> "Welcome to the new Poddar Alumni Portal prototype. Designed with a bespoke Heritage Navy and Gold aesthetic, this platform elevates our institution's digital presence to match premier global universities while honoring our academic roots in Jaipur."

### Click-through actions:
1. **Show sticky header morph**:
   - Scroll down 100px on the home page. Point out how the header smoothly transitions from transparent over the hero to solid navy with soft shadow.
   - Hover over the 9 mega-menus to demonstrate rich multi-column dropdowns.
2. **Show Hero counters**:
   - Point to the live animated `CountUp` numbers showing registered alumni, domains, and global chapter cities.
3. **Navigate to Alumni Directory** (`/directory/search`):
   - Type `"Aarav"` or `"Pranav"` in the search bar — demonstrate instant debounced search across names, companies, and designations.
   - Click the **Filter Drawer** (or mobile drawer) and filter by **Domain** (*IT & Technology*) and **Batch** (*2023*).
   - Click **View Profile** on an alumnus to open the comprehensive `ProfileModal` showing education, current designation, skills, and bio.
   - Toggle from **Grid View** to **Table View** to demonstrate institutional tabular data presentation.

---

## ⏱️ Minute 1:00 – 2:00: Member Onboarding & Giving Back
**Target Routes**: `/join/auth` and `/give-back/speaker`

### What to say:
> "An alumni network thrives when onboarding is frictionless and giving back is structured. Every submission on this portal follows a verified institutional moderation workflow."

### Click-through actions:
1. **Show Onboarding & Profile Verification** (`/join/auth`):
   - Switch between **Login** and **Register** tabs.
   - Note the real-time form validation indicators (green checkmarks for valid fields, red alerts for invalid input).
   - Point out the authenticated session indicator in the header showing the current logged-in alumnus (*Vikramaditya Rathore, Class of 2008*).
2. **Navigate to Give Back: Guest Speaker** (`/give-back/speaker`):
   - Highlight the 3-step timeline (Submit Proposal → Secretariat Review → Calendar Confirmation).
   - Enter a sample lecture topic: `"AI Architecture in Banking"` and submit.
   - Show the instant confirmation alert noting that the submission has entered the Secretariat queue for moderation.

---

## ⏱️ Minute 2:00 – 3:00: Career Hub & Mentorship Engine
**Target Routes**: `/career-hub/jobs` and `/career-hub/find-mentor`

### What to say:
> "Career mobility and peer mentorship are central pillars for Poddar graduates. Our Career Hub connects students and lateral alumni directly with hiring opportunities posted by their own alumni community."

### Click-through actions:
1. **Show Job & Internship Directory** (`/career-hub/jobs`):
   - Filter by **Full-Time** and **IT & Technology**.
   - Click on an opportunity (e.g. *Senior Python Engineer*).
   - Point out the job details sheet: salary band, alumni referrer name (*Class of 2016*), requirements list, and one-click application action.
2. **Show Find a Mentor** (`/career-hub/find-mentor`):
   - Point to domain-specific mentor badges (*Technology, Finance, Education*).
   - Click **Request Mentorship** on a mentor profile.
   - Demonstrate the guided booking modal where a student selects their career goal and submits an inquiry directly to the mentor.

---

## ⏱️ Minute 3:00 – 4:00: Secretariat Administrative Moderation Desk
**Target Route**: `/admin`

### What to say:
> "Now let us step behind the scenes into the Secretariat Admin Moderation Desk. Nothing appears publicly on the portal without administrative verification, protecting the institution's brand reputation."

### Click-through actions:
1. **Show Admin Dashboard** (`/admin?tab=dashboard`):
   - Highlight the real-time metric cards showing pending submissions across all 7 queues.
   - Point out the inline SVG charts: **Submissions Volume by Workflow** and the **Moderation Pipeline Status** breakdown donut.
2. **Review & Approve an Alumni Registration** (`/admin?tab=profiles`):
   - Click on **Alumni Profiles** in the sidebar.
   - Click **Details** on an applicant to view their full credentials, degree, company, and skills.
   - Click **Approve**. Point out the green success toast notification confirming the applicant is now indexed in the public directory.
3. **Review Support Inquiries** (`/admin?tab=queries`):
   - Show an open transcript assistance ticket (`PDR-2026-0001`).
   - Click **Manage Ticket**, update the status from **Open** to **In Review**, type a secretariat note, and click **Save Status**.
   - Note that the alumnus immediately sees this progress in their **My Tickets** portal view (`/help-desk/tickets`).

---

## ⏱️ Minute 4:00 – 5:00: Live Publishing, Social Links & Demo Reset
**Target Routes**: `/admin?tab=content`, `/admin?tab=social`, `/bulletin`

### What to say:
> "The secretariat can also publish official campus announcements, update social handles, and manage calendar events in real time without touching code."

### Click-through actions:
1. **Publish a Live Notice** (`/admin?tab=content`):
   - Click **Create New Notice**.
   - Type title: `"Global Alumni Research Grant Applications Open 2027"`.
   - Point to the **Live Card Preview** on the right side of the form, which shows the card exactly as it will appear publicly.
   - Click **Publish Immediately**.
   - Open `/bulletin` in a new tab to show the announcement appearing live at the top of the feed!
2. **Edit Social Media Handles** (`/admin?tab=social`):
   - Show how the secretariat can update institutional LinkedIn, Instagram, or YouTube URLs and immediately see them reflect in the global footer.
3. **Environment Reset** (Sidebar: *Reset Demo Data*):
   - Click **Reset Demo Data**.
   - Confirm in the modal dialog. Show that all sample queues, tickets, counters, and initial datasets are instantly restored for the next demonstration.

---

## ⏱️ Minute 5:00 – 8:00: Opportunities Network Bonus Module (Interactive Loop)
**Target Routes**: `/career-hub`, `/career-hub/jobs`, `/dashboard`, `/messages`, `/admin?tab=live_postings`

### What to say:
> "Now let us experience the standout feature of this release: the Opportunities Network. This creates a living loop where alumni post real vacancies and offer internal referral slots, while enrolled students apply directly, get endorsed, and chat in real-time."

### Click-through actions:
1. **Show Opportunities Network Entry Cards** (`/career-hub`):
   - Point out the top 3 featured cards with the gold **New** badges (*Jobs & Internships*, *Post an Opportunity*, *Applications & Referrals*).
2. **Switch Persona to Student (Aarav Mehta)**:
   - Click the user avatar in the header or on `/dashboard`, select **Switch to Student (Aarav)**.
   - Show the Student Career Dashboard with active application counters, referral requests, and unread chats.
3. **Apply & Request Referral as Student** (`/career-hub/jobs`):
   - Browse the jobs list; point out the **Referral Slots Available** badges and **Eligibility** tags.
   - Click **Apply** on a role (e.g. *Associate Full Stack Engineer* at *Apex Capital Advisory*).
   - Show the Apply Dialog with the pre-attached resume, cover note counter, and checked box: *"Also request internal referral from Vikramaditya Rathore"*. Click **Submit Application**.
4. **Switch Persona to Alumnus (Vikramaditya Rathore)**:
   - In the header dropdown, click **Switch to Alumnus (Vikramaditya)**.
   - Click the notification bell to see the real-time alert: *"New Application Received from Aarav Mehta"*.
   - Open `/dashboard/postings` and click **Review Applicants** for that job.
   - Change Aarav's status from **Applied** to **Interviewing**. Click **Endorse Referral**.
5. **Demonstrate Simulated Chat** (`/messages`):
   - Open the conversation with Aarav Mehta.
   - Type: `"Hello Aarav, I reviewed your GitHub projects and was impressed. When are you free for a virtual technical round?"`
   - Press Enter. Watch the typing indicator appear and a contextual simulated reply arrive within 1.8 seconds!
   - Highlight the top banner: *"Evaluation Mode: replies are simulated for evaluation."*
6. **Secretariat Moderation of Opportunities & Safety** (`/admin`):
   - Show `/admin?tab=live_postings` to demonstrate one-click closing and removal of postings.
   - Show `/admin?tab=students` with one-click student deactivation.
   - Show `/admin?tab=chat_reports` and click **View Transcript** to audit flagged peer messages.

---

## Key Talking Points for Board Questions
- **Is this mobile responsive?** "Yes, 100% mobile-first. Tables automatically convert to stacked touch-friendly cards on smartphones, inputs are sized at 16px to prevent iOS auto-zoom, and all tap targets exceed the 44px minimum accessibility guideline."
- **How does this connect to our real database in the future?** "The application utilizes a clean Data Access Layer (`src/lib/api.ts`) and unified state store (`src/store/portal.ts`). Swapping the current mock store with REST or GraphQL endpoints requires zero UI redesign."
- **Are there any invented institutional claims?** "No. All numbers are marked as sample demonstration data, contact coordinates read from a single central configuration file, and no unverified rankings or external claims are made."

