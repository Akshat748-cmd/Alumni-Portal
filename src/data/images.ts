export interface ImageAsset {
  src: string;
  alt: string;
  category: "campus" | "graduation" | "networking" | "events" | "portraits" | "general";
  blurDataURL?: string;
}

// Low-quality SVG data URI placeholder for instant loading without flash
export const DEFAULT_BLUR_DATA_URL =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%230B1630' /%3E%3Cstop offset='100%25' stop-color='%23C9A24D' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)' /%3E%3C/svg%3E";

export const IMAGES = {
  hero: {
    campusMain: {
      src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80",
      alt: "Poddar Group of Institutions Campus Quadrangle",
      category: "campus" as const,
      blurDataURL: DEFAULT_BLUR_DATA_URL,
    },
    convocation: {
      src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80",
      alt: "Poddar Alumni Annual Convocation and Graduation Day",
      category: "graduation" as const,
      blurDataURL: DEFAULT_BLUR_DATA_URL,
    },
    networking: {
      src: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1920&q=80",
      alt: "Global Alumni Leadership Conference and Networking",
      category: "networking" as const,
      blurDataURL: DEFAULT_BLUR_DATA_URL,
    },
  },
  events: [
    {
      id: "ev-1",
      src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
      alt: "Annual Silver Jubilee Reunion 2026",
      category: "events" as const,
    },
    {
      id: "ev-2",
      src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
      alt: "Global AI & Technology Leadership Summit",
      category: "events" as const,
    },
    {
      id: "ev-3",
      src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80",
      alt: "Entrepreneurship & Startup Pitch Day",
      category: "events" as const,
    },
    {
      id: "ev-4",
      src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
      alt: "Alumni Mentorship Circle & Career Clinic",
      category: "events" as const,
    },
    {
      id: "ev-5",
      src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
      alt: "Finance and Fintech Masterclass",
      category: "events" as const,
    },
    {
      id: "ev-6",
      src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
      alt: "Design, Jewellery & Innovation Workshop",
      category: "events" as const,
    },
  ],
  campus: [
    {
      id: "camp-1",
      src: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
      alt: "Poddar Institute Main Academic Block",
      category: "campus" as const,
    },
    {
      id: "camp-2",
      src: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80",
      alt: "Central Knowledge Repository & Library",
      category: "campus" as const,
    },
    {
      id: "camp-3",
      src: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=1200&q=80",
      alt: "High-Tech Innovation & Computing Labs",
      category: "campus" as const,
    },
  ],
  portraits: {
    p1: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    p2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    p3: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
    p4: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    p5: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80",
    p6: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&q=80",
    p7: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80",
    p8: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80",
  },
  placeholders: {
    navyGoldFallback:
      "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%230B1630' /%3E%3Cstop offset='100%25' stop-color='%231D2F57' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)' /%3E%3Ccircle cx='400' cy='280' r='60' fill='%23C9A24D' fill-opacity='0.25' stroke='%23E9C46A' stroke-width='2' /%3E%3Cpath d='M375 280 L425 280 M400 255 L400 305' stroke='%23F3DC9C' stroke-width='2' stroke-linecap='round' /%3E%3Ctext x='400' y='380' font-family='sans-serif' font-size='18' font-weight='600' fill='%23F3DC9C' text-anchor='middle'%3EPODDAR ALUMNI NETWORK%3C/text%3E%3C/svg%3E",
  },
};

