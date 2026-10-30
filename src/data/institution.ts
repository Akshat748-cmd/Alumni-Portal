/**
 * Institution Single Source of Truth
 * Holds customizable placeholder coordinates for the client demo.
 * When real client credentials/details are provided, edit only this file.
 */

export interface InstitutionContact {
  email: string;
  helpdeskEmail: string;
  transcriptsEmail: string;
  phone: string;
  secondaryPhone: string;
  tollFree: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  officeHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
}

export interface InstitutionConfig {
  institutionName: string;
  shortName: string;
  portalName: string;
  foundingYear: number | null; // null by default; UI hides it when null
  contact: InstitutionContact;
  socialLinks: {
    linkedin: string;
    instagram: string;
    facebook: string;
  };
  sampleStats: {
    totalAlumni: number;
    domainsCount: number;
    disclaimer: string;
  };
}

export const INSTITUTION: InstitutionConfig = {
  institutionName: "Poddar Group of Institutions",
  shortName: "Poddar",
  portalName: "Poddar Alumni Network",
  foundingYear: null, // Set to null to omit unverified founding claims
  contact: {
    email: "alumni@poddarinstitutes.org",
    helpdeskEmail: "alumni.helpdesk@poddarinstitutes.org",
    transcriptsEmail: "transcripts@poddarinstitutes.org",
    phone: "+91 141 278 4930",
    secondaryPhone: "+91 141 278 4931",
    tollFree: "1800-120-0000",
    address: {
      line1: "Poddar Campus, Sector 7, Shipra Path",
      line2: "Mansarovar",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302020",
      country: "India",
    },
    officeHours: {
      weekdays: "09:30 AM – 05:30 PM (Monday to Friday)",
      saturday: "10:00 AM – 02:00 PM (1st & 3rd Saturday)",
      sunday: "Closed (Online requests active)",
    },
  },
  socialLinks: {
    linkedin: "https://www.linkedin.com/school/poddarinstitutes/",
    instagram: "https://www.instagram.com/poddarinstitutes/",
    facebook: "https://www.facebook.com/poddarinstitutes/",
  },
  sampleStats: {
    totalAlumni: 260,
    domainsCount: 7,
    disclaimer: "Sample figures for prototype demonstration",
  },
};

