import { INSTITUTION } from "./institution";

export interface AlumniOfficeContact {
  institution: string;
  department: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  contact: {
    emailGeneral: string;
    emailHelpdesk: string;
    emailTranscripts: string;
    phonePrimary: string;
    phoneSecondary: string;
    tollFree: string;
  };
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  leadership: {
    director: string;
    designation: string;
    secretary: string;
    secretaryDesignation: string;
  };
}

export const ALUMNI_OFFICE: AlumniOfficeContact = {
  institution: INSTITUTION.institutionName,
  department: "Alumni Relations & Career Development Secretariat",
  address: INSTITUTION.contact.address,
  contact: {
    emailGeneral: INSTITUTION.contact.email,
    emailHelpdesk: INSTITUTION.contact.helpdeskEmail,
    emailTranscripts: INSTITUTION.contact.transcriptsEmail,
    phonePrimary: INSTITUTION.contact.phone,
    phoneSecondary: INSTITUTION.contact.secondaryPhone,
    tollFree: INSTITUTION.contact.tollFree,
  },
  hours: INSTITUTION.contact.officeHours,
  leadership: {
    director: "Prof. (Dr.) Mahendra Pratap Sharma",
    designation: "Director, Alumni Relations & Institutional Advancement",
    secretary: "Mrs. Vandana Mathur",
    secretaryDesignation: "Executive Secretary, Poddar Alumni Association",
  },
};

