export const DEFAULT_SITE_URL = "https://thenairobihosp.org";
export const SITE_NAME = "The Nairobi Hospital";
export const DEFAULT_DESCRIPTION =
  "The Nairobi Hospital offers specialist care, diagnostics, outpatient services, inpatient treatment, and patient support in Nairobi, Kenya.";
export const DEFAULT_OG_IMAGE =
  "https://cms.thenairobihosp.org/uploads/nai_hospital_1ce6949b74.jpg";
export const DEFAULT_ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
export const NOINDEX_ROBOTS = "noindex, nofollow";

type StaticSeoEntry = {
  title: string;
  description: string;
  noindex?: boolean;
};

const STATIC_SEO: Record<string, StaticSeoEntry> = {
  "/": {
    title: "Leading Private Hospital in Nairobi, Kenya",
    description:
      "Access doctors, specialist clinics, diagnostics, inpatient care, outpatient centers, and patient services at The Nairobi Hospital.",
  },
  "/about-us": {
    title: "About The Nairobi Hospital",
    description:
      "Learn about The Nairobi Hospital, our history, leadership, accreditation, and commitment to quality healthcare in Kenya.",
  },
  "/about-us/board-of-management": {
    title: "Board of Management",
    description:
      "Meet the Board of Management guiding strategy, governance, and service excellence at The Nairobi Hospital.",
  },
  "/about-us/board-of-trustees": {
    title: "Board of Trustees",
    description:
      "Explore the Board of Trustees and their role in stewardship at The Nairobi Hospital.",
  },
  "/about-us/senior-management": {
    title: "Senior Management",
    description:
      "Get to know the senior management team supporting operations and patient care at The Nairobi Hospital.",
  },
  "/about-us/history": {
    title: "Our History",
    description:
      "Discover key milestones in the history and growth of The Nairobi Hospital.",
  },
  "/about-us/accreditation-certification": {
    title: "Accreditation and Certification",
    description:
      "Review the hospital's accreditation, certifications, and quality standards.",
  },
  "/clinical-services": {
    title: "Clinical Services",
    description:
      "Browse clinical specialties, diagnostics, treatment services, and care pathways available at The Nairobi Hospital.",
  },
  "/anderson-services": {
    title: "Anderson Specialty Services",
    description:
      "Explore specialist services and clinics available through Anderson at The Nairobi Hospital.",
  },
  "/anderson-list": {
    title: "Anderson Clinic Listing",
    description:
      "View Anderson clinic specialties and available services at The Nairobi Hospital.",
  },
  "/outpatient-centers": {
    title: "Outpatient Centers",
    description:
      "Find outpatient centers operated by The Nairobi Hospital for accessible consultations, diagnostics, and follow-up care.",
  },
  "/contact": {
    title: "Contact The Nairobi Hospital",
    description:
      "Reach The Nairobi Hospital for appointments, general enquiries, medical enquiries, and customer support.",
    noindex: true,
  },
  "/contact-us": {
    title: "Contact Us",
    description:
      "Find phone numbers, email contacts, and support information for The Nairobi Hospital.",
  },
  "/doctor-profiles": {
    title: "Find a Doctor",
    description:
      "Search doctor profiles, specialties, clinics, and appointment options at The Nairobi Hospital.",
  },
  "/booking": {
    title: "Book an Appointment",
    description:
      "Book appointments with doctors and services at The Nairobi Hospital.",
  },
  "/booking-calendar": {
    title: "Appointment Calendar",
    description:
      "Choose available appointment dates and continue your booking with The Nairobi Hospital.",
    noindex: true,
  },
  "/medical-tourism": {
    title: "International Patients and Medical Tourism",
    description:
      "Learn about medical tourism support, international patient coordination, and treatment access at The Nairobi Hospital.",
  },
  "/admission-charges": {
    title: "Admission Charges",
    description:
      "Review admission-related information and patient guidance from The Nairobi Hospital.",
  },
  "/rooms-and-wards": {
    title: "Rooms and Wards",
    description:
      "Explore room categories, ward options, and inpatient accommodation at The Nairobi Hospital.",
    noindex: true,
  },
  "/high-critical-care": {
    title: "High and Critical Care",
    description:
      "Find information about high dependency and critical care services at The Nairobi Hospital.",
    noindex: true,
  },
  "/clinical-faqs": {
    title: "Clinical FAQs",
    description:
      "Read frequently asked questions about clinical services, appointments, and patient care.",
  },
  "/outpatient-clinics": {
    title: "Outpatient Clinics",
    description:
      "Browse outpatient clinic listings and access points across The Nairobi Hospital network.",
    noindex: true,
  },
  "/news": {
    title: "News",
    description:
      "Read the latest hospital news, updates, and announcements from The Nairobi Hospital.",
  },
  "/blogs": {
    title: "Blog",
    description:
      "Explore blog articles, health stories, and educational content from The Nairobi Hospital.",
  },
  "/events-announcements": {
    title: "Events and Announcements",
    description:
      "Stay up to date with events, announcements, and public updates from The Nairobi Hospital.",
  },
  "/news/careers": {
    title: "Careers",
    description:
      "View career opportunities and join The Nairobi Hospital team.",
  },
  "/news/tenders": {
    title: "Tenders",
    description:
      "See open tenders and procurement opportunities published by The Nairobi Hospital.",
  },
  "/college/about-college": {
    title: "About the College",
    description:
      "Learn about The Nairobi Hospital College of Health Sciences and its programmes.",
  },
  "/college/tuition-and-sponsorships": {
    title: "Tuition and Sponsorships",
    description:
      "Review tuition details and sponsorship information for the College of Health Sciences.",
  },
  "/college/facilities-and-downloads": {
    title: "Facilities and Downloads",
    description:
      "Access college facilities information, brochures, and downloadable resources.",
  },
  "/college/student-alumni": {
    title: "Student Alumni",
    description:
      "Read about students, alumni, and community from the College of Health Sciences.",
  },
  "/college/college-faqs": {
    title: "College FAQs",
    description:
      "Find answers to frequently asked questions about the College of Health Sciences.",
  },
  "/inpatient/admission": {
    title: "Admission Process",
    description:
      "Understand the admission process for inpatient care at The Nairobi Hospital.",
  },
  "/inpatient/rooms-wards": {
    title: "Inpatient Rooms and Wards",
    description:
      "Learn about rooms, wards, and accommodation options for admitted patients.",
  },
  "/inpatient/critical-care": {
    title: "Critical Care",
    description:
      "Get information about critical care support and services at The Nairobi Hospital.",
  },
  "/inpatient/surgery": {
    title: "Theatre and Surgery",
    description:
      "Explore theatre and surgical services available for inpatient treatment.",
  },
  "/inpatient/infection-control": {
    title: "Infection Control",
    description:
      "Read about infection prevention and control practices at The Nairobi Hospital.",
  },
  "/a-laboratory-services": {
    title: "Laboratory Services",
    description: "Laboratory services information from The Nairobi Hospital.",
    noindex: true,
  },
  "/a-pharmacy-services": {
    title: "Pharmacy Services",
    description: "Pharmacy services information from The Nairobi Hospital.",
    noindex: true,
  },
  "/a-radiology-services": {
    title: "Radiology Services",
    description: "Radiology services information from The Nairobi Hospital.",
    noindex: true,
  },
  "/about/csr": {
    title: "Corporate Social Responsibility",
    description:
      "Corporate social responsibility highlights from The Nairobi Hospital.",
    noindex: true,
  },
};

type DynamicSeoEntry = {
  pattern: RegExp;
  title: string;
  description: string;
  noindex?: boolean;
};

const DYNAMIC_SEO: DynamicSeoEntry[] = [
  {
    pattern: /^\/doctor-details\/[^/]+\/?$/i,
    title: "Doctor Profile",
    description:
      "Review doctor information, specialties, and appointment options at The Nairobi Hospital.",
  },
  {
    pattern: /^\/outpatient-center\/[^/]+\/?$/i,
    title: "Outpatient Center Details",
    description:
      "View services, location, and contact details for a Nairobi Hospital outpatient center.",
  },
  {
    pattern: /^\/service-detail\/[^/]+\/?$/i,
    title: "Clinical Service Details",
    description:
      "Read about a clinical service, available care options, and related information at The Nairobi Hospital.",
  },
  {
    pattern: /^\/blog\/[^/]+\/?$/i,
    title: "Blog Article",
    description:
      "Read a health article or hospital update published by The Nairobi Hospital.",
  },
  {
    pattern: /^\/news\/[^/]+\/?$/i,
    title: "News Article",
    description:
      "Read a news update or story from The Nairobi Hospital.",
  },
  {
    pattern: /^\/events-announcements\/[^/]+\/?$/i,
    title: "Event or Announcement",
    description:
      "Read event and announcement details from The Nairobi Hospital.",
  },
  {
    pattern: /^\/csr-detail\/[^/]+\/?$/i,
    title: "CSR Story",
    description:
      "Learn more about a corporate social responsibility initiative by The Nairobi Hospital.",
  },
  {
    pattern: /^\/member-page\/[^/]+\/?$/i,
    title: "Leadership Profile",
    description:
      "Read leadership and team profile information from The Nairobi Hospital.",
  },
  {
    pattern: /^\/dashboard(\/.*)?$/i,
    title: "Dashboard",
    description: "Administrative dashboard for The Nairobi Hospital website.",
    noindex: true,
  },
];

export type ResolvedSeo = {
  title: string;
  description: string;
  canonicalPath: string;
  noindex: boolean;
};

const normalizePathname = (pathname: string): string => {
  if (!pathname) return "/";
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (normalized.length > 1 && normalized.endsWith("/")) {
    return normalized.slice(0, -1);
  }
  return normalized;
};

const formatTitle = (title: string): string =>
  title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

const humanizeFallbackTitle = (pathname: string): string => {
  const segment = normalizePathname(pathname)
    .split("/")
    .filter(Boolean)
    .pop();

  if (!segment) return SITE_NAME;

  return segment
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

export const buildCanonicalUrl = (
  pathname: string,
  siteUrl: string = DEFAULT_SITE_URL,
): string => {
  const canonicalPath = normalizePathname(pathname);
  return new URL(canonicalPath, `${siteUrl.replace(/\/+$/, "")}/`).toString();
};

export const resolveSeo = (pathname: string): ResolvedSeo => {
  const canonicalPath = normalizePathname(pathname);
  const staticMatch = STATIC_SEO[canonicalPath];

  if (staticMatch) {
    return {
      title: formatTitle(staticMatch.title),
      description: staticMatch.description,
      canonicalPath,
      noindex: Boolean(staticMatch.noindex),
    };
  }

  const dynamicMatch = DYNAMIC_SEO.find(({ pattern }) =>
    pattern.test(canonicalPath),
  );

  if (dynamicMatch) {
    return {
      title: formatTitle(dynamicMatch.title),
      description: dynamicMatch.description,
      canonicalPath,
      noindex: Boolean(dynamicMatch.noindex),
    };
  }

  return {
    title: formatTitle(humanizeFallbackTitle(canonicalPath)),
    description: DEFAULT_DESCRIPTION,
    canonicalPath,
    noindex: false,
  };
};

export const buildStructuredData = (
  canonicalUrl: string,
  title: string,
  description: string,
) => {
  const siteUrl = new URL(canonicalUrl).origin;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Hospital",
        "@id": `${siteUrl}#hospital`,
        name: SITE_NAME,
        url: siteUrl,
        image: DEFAULT_OG_IMAGE,
        telephone: "+254 703 082 000",
        email: "hosp@nbihosp.org",
        address: {
          "@type": "PostalAddress",
          postOfficeBoxNumber: "P.O. Box 30026 - 00100 GPO",
          addressLocality: "Nairobi",
          addressCountry: "KE",
        },
        sameAs: [
          "https://www.facebook.com/TheNairobiHosp",
          "https://twitter.com/thenairobihosp",
          "https://www.linkedin.com/company/thenairobihospital",
          "https://www.youtube.com/channel/UChUuucNLoxQqFKgVW2G5AlA",
          "https://www.instagram.com/nairobihosp/",
          "https://www.tiktok.com/@thenairobihospital/",
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: title,
        description,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${siteUrl}#website`,
          name: SITE_NAME,
          url: siteUrl,
        },
        about: {
          "@id": `${siteUrl}#hospital`,
        },
      },
    ],
  };
};
