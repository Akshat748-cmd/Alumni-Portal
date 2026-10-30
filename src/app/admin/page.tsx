"use client";

import React, { useState, Suspense, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  AdminSidebar,
} from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminProfilesQueue } from "@/components/admin/AdminProfilesQueue";
import { AdminAchievementsQueue } from "@/components/admin/AdminAchievementsQueue";
import { AdminOpportunitiesQueue } from "@/components/admin/AdminOpportunitiesQueue";
import { AdminMentorshipQueue } from "@/components/admin/AdminMentorshipQueue";
import { AdminTicketsQueue } from "@/components/admin/AdminTicketsQueue";
import { AdminBusinessesQueue } from "@/components/admin/AdminBusinessesQueue";
import { AdminGiveBackQueue } from "@/components/admin/AdminGiveBackQueue";
import { AdminContentManager } from "@/components/admin/AdminContentManager";
import { AdminSocialManager } from "@/components/admin/AdminSocialManager";
import { AdminResetModal } from "@/components/admin/AdminResetModal";
import { usePortalStore } from "@/store/portal";
import { Sheet, SheetContent } from "@/components/ui/sheet";

function AdminPanelContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const tabParam = searchParams.get("tab") || "dashboard";
  const [activeTab, setActiveTab] = useState(tabParam);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const { submittedQueue, tickets } = usePortalStore();

  // Sync state if URL query param changes
  React.useEffect(() => {
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [tabParam, activeTab]);

  const handleSelectTab = (tabId: string) => {
    if (tabId === "reset") {
      setResetModalOpen(true);
      return;
    }
    setActiveTab(tabId);
    startTransition(() => {
      router.push(`/admin?tab=${tabId}`);
    });
  };

  // Derive counts dynamically
  const pendingProfiles = submittedQueue.filter(
    (q) => (q.type === "registration" || q.type === "profile-update" || q.type === "alumni") && q.status === "pending"
  ).length;

  const pendingAchievements = submittedQueue.filter(
    (q) => q.type === "achievement" && q.status === "pending"
  ).length;

  const pendingOpportunities = submittedQueue.filter(
    (q) => q.type === "opportunity" && q.status === "pending"
  ).length;

  const pendingMentorship = submittedQueue.filter(
    (q) => (q.type === "mentor-signup" || q.type === "mentorship-request" || q.type === "mentor") && q.status === "pending"
  ).length;

  const openTickets = tickets.filter((t) => t.status !== "Resolved").length;

  const pendingBusinesses = submittedQueue.filter(
    (q) => q.type === "business" && q.status === "pending"
  ).length;

  const pendingGiveback = submittedQueue.filter(
    (q) => (q.type === "give-back-offer" || q.type === "giveBack" || q.type === "event-registration") && q.status === "pending"
  ).length;

  const totalPending =
    pendingProfiles +
    pendingAchievements +
    pendingOpportunities +
    pendingMentorship +
    openTickets +
    pendingBusinesses +
    pendingGiveback;

  const counts: Record<string, number> = {
    profiles: pendingProfiles,
    achievements: pendingAchievements,
    opportunities: pendingOpportunities,
    mentorship: pendingMentorship,
    tickets: openTickets,
    businesses: pendingBusinesses,
    giveback: pendingGiveback,
  };

  const tabLabels: Record<string, string> = {
    dashboard: "Secretariat Dashboard",
    profiles: "Alumni Profiles Moderation",
    achievements: "Achievements & Spotlight",
    opportunities: "Career Opportunities & Jobs",
    mentorship: "Mentorship Programme Desk",
    queries: "Help Desk Support Inquiries",
    businesses: "Alumni Business Directory",
    giveback: "Give Back & Gathering Bookings",
    content: "Institutional Content Manager",
    social: "Social Media Handles",
    reset: "Secretariat Prototype Settings",
  };

  return (
    <div className="min-h-screen flex w-full bg-slate-50 font-sans">
      {/* Desktop Sidebar: sticky top-0 h-dvh with its own internal scroll if needed */}
      <AdminSidebar
        currentTab={activeTab}
        onSelectTab={handleSelectTab}
        counts={counts}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="hidden lg:flex shrink-0 sticky top-0 h-dvh overflow-y-auto"
      />

      {/* Mobile Drawer (Sheet) */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" showCloseButton={false} className="p-0 w-72 bg-navy-950 border-r border-navy-800 h-dvh">
          <AdminSidebar
            currentTab={activeTab}
            onSelectTab={handleSelectTab}
            counts={counts}
            collapsed={false}
            onCloseMobile={() => setMobileMenuOpen(false)}
            className="h-full w-full border-none"
          />
        </SheetContent>
      </Sheet>

      {/* Main Administrative Workplace Area with normal page scroll */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <AdminHeader
          currentTabLabel={tabLabels[activeTab] || "Admin Desk"}
          totalPending={totalPending}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onOpenResetModal={() => setResetModalOpen(true)}
        />

        {/* Dynamic Tab Body - Native scrolling with ample bottom padding */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-32 sm:pb-36">
          <div className="max-w-7xl mx-auto">
            {activeTab === "dashboard" && (
              <AdminDashboard
                counts={counts}
                totalSubmitted={submittedQueue.length}
                queue={submittedQueue}
                onNavigateTab={handleSelectTab}
              />
            )}

            {activeTab === "profiles" && <AdminProfilesQueue />}

            {activeTab === "achievements" && <AdminAchievementsQueue />}

            {activeTab === "opportunities" && <AdminOpportunitiesQueue />}

            {activeTab === "mentorship" && <AdminMentorshipQueue />}

            {activeTab === "queries" && <AdminTicketsQueue />}

            {activeTab === "businesses" && <AdminBusinessesQueue />}

            {activeTab === "giveback" && <AdminGiveBackQueue />}

            {activeTab === "content" && <AdminContentManager />}

            {activeTab === "social" && <AdminSocialManager />}

            {activeTab === "reset" && (
              <div className="p-8 max-w-xl mx-auto text-center rounded-2xl bg-card border border-line shadow-navy-soft space-y-4">
                <h3 className="font-serif text-xl font-bold text-navy-950">
                  Prototype Environment Reset
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  Resetting demo state cleans temporary localStorage entries and restores pre-seeded demo records for all approval queues.
                </p>
                <button
                  onClick={() => setResetModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-colors"
                >
                  Open Reset Confirmation Dialog
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Global Reset Dialog */}
      <AdminResetModal
        open={resetModalOpen}
        onOpenChange={setResetModalOpen}
      />
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center bg-slate-50 text-xs font-mono text-muted">
          Loading Secretariat Administrative Panel...
        </div>
      }
    >
      <AdminPanelContent />
    </Suspense>
  );
}
