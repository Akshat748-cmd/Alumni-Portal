import {
  AlumniProfile,
  PortalEvent,
  JobOpportunity,
  BulletinItem,
  SuccessStory,
  AlumniBusiness,
  Mentor,
  LearningProgram,
  GalleryItem,
  DomainCategory,
} from "@/data/types";
import { INITIAL_ALUMNI } from "@/data/alumni";
import { INITIAL_EVENTS } from "@/data/events";
import { INITIAL_JOBS } from "@/data/jobs";
import { INITIAL_BULLETIN, INITIAL_NEWSLETTERS } from "@/data/bulletin";
import { INITIAL_SUCCESS_STORIES, INITIAL_BUSINESSES } from "@/data/spotlight";
import { INITIAL_MENTORS, INITIAL_LEARNING_PROGRAMS } from "@/data/career";
import { INITIAL_GALLERY } from "@/data/gallery";
import { DOMAIN_STATS } from "@/data/domains";
import { ALUMNI_OFFICE } from "@/data/office";
import { usePortalStore } from "@/store/portal";

/**
 * Data Access Layer (DAL)
 * Merges seeded static datasets with store's dynamically published items.
 * Public pages retrieve data through these functions.
 */

export function getNotices(): BulletinItem[] {
  if (typeof window === "undefined") {
    return INITIAL_BULLETIN.filter((b) => b.status === "approved");
  }
  const published = usePortalStore.getState().publishedContent?.notices || [];
  const storeBulletin = usePortalStore.getState().bulletin?.filter((b) => b.status === "approved") || [];
  const merged = [...published, ...storeBulletin, ...INITIAL_BULLETIN.filter((b) => b.status === "approved")];
  const seen = new Set<string>();
  return merged.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

export function getNewsStories(): SuccessStory[] {
  if (typeof window === "undefined") {
    return INITIAL_SUCCESS_STORIES.filter((s) => s.status === "approved");
  }
  const published = usePortalStore.getState().publishedContent?.newsStories || [];
  const storeStories = usePortalStore.getState().stories?.filter((s) => s.status === "approved") || [];
  const merged = [...published, ...storeStories, ...INITIAL_SUCCESS_STORIES.filter((s) => s.status === "approved")];
  const seen = new Set<string>();
  return merged.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

export function getEvents(): PortalEvent[] {
  if (typeof window === "undefined") {
    return INITIAL_EVENTS.filter((e) => e.status === "approved");
  }
  const published = usePortalStore.getState().publishedContent?.events || [];
  const storeEvents = usePortalStore.getState().events?.filter((e) => e.status === "approved") || [];
  const merged = [...published, ...storeEvents, ...INITIAL_EVENTS.filter((e) => e.status === "approved")];
  const seen = new Set<string>();
  return merged.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

export function getGallery(): GalleryItem[] {
  return INITIAL_GALLERY;
}

export function getNewsletters() {
  return INITIAL_NEWSLETTERS;
}

export const AlumniApi = {
  async getApprovedAlumni(): Promise<AlumniProfile[]> {
    return INITIAL_ALUMNI.filter((a) => a.status === "approved");
  },

  async getAlumniById(id: string): Promise<AlumniProfile | undefined> {
    return INITIAL_ALUMNI.find((a) => a.id === id);
  },

  async getAlumniByDomain(domain: DomainCategory): Promise<AlumniProfile[]> {
    return INITIAL_ALUMNI.filter((a) => a.status === "approved" && a.domain === domain);
  },

  async getFeaturedAlumni(): Promise<AlumniProfile[]> {
    return INITIAL_ALUMNI.filter((a) => a.status === "approved" && a.featured);
  },

  async getDomains() {
    return DOMAIN_STATS;
  },
};

export const EventsApi = {
  async getAllEvents(): Promise<PortalEvent[]> {
    return INITIAL_EVENTS.filter((e) => e.status === "approved");
  },

  async getEventById(id: string): Promise<PortalEvent | undefined> {
    return INITIAL_EVENTS.find((e) => e.id === id);
  },
};

export const CareerApi = {
  async getJobs(): Promise<JobOpportunity[]> {
    return INITIAL_JOBS.filter((j) => j.status === "approved");
  },

  async getMentors(): Promise<Mentor[]> {
    return INITIAL_MENTORS.filter((m) => m.status === "approved");
  },

  async getLearningPrograms(): Promise<LearningProgram[]> {
    return INITIAL_LEARNING_PROGRAMS;
  },
};

export const ContentApi = {
  async getBulletin(): Promise<BulletinItem[]> {
    return INITIAL_BULLETIN.filter((b) => b.status === "approved");
  },

  async getNewsletters() {
    return INITIAL_NEWSLETTERS;
  },

  async getSuccessStories(): Promise<SuccessStory[]> {
    return INITIAL_SUCCESS_STORIES.filter((s) => s.status === "approved");
  },

  async getBusinesses(): Promise<AlumniBusiness[]> {
    return INITIAL_BUSINESSES.filter((b) => b.status === "approved");
  },

  async getGallery(): Promise<GalleryItem[]> {
    return INITIAL_GALLERY;
  },

  async getAlumniOffice() {
    return ALUMNI_OFFICE;
  },
};

