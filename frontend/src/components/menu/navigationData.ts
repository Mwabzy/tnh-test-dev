import {
  Home,
  Info,
  Heart,
  GraduationCap,
  Newspaper,
  Building2,
} from "lucide-react";

export const NAVIGATION_CONTENT = [
  {
    labelKey: "home",
    icon: Home,
    link: "/",
  },
  {
    labelKey: "about_us",
    icon: Info,
    sections: [
      {
        title: "OUR STORY",
        items: [
          { title: "Our History", href: "/about-us/history" },
          { title: "Vision, Mission & Core Values", href: "/about-us" },
        ],
      },
      {
        title: "CORPORATE GOVERNANCE",
        items: [
          { title: "Board of Trustees", href: "/about-us/board-of-trustees" },
          {
            title: "Board of Management",
            href: "/about-us/board-of-management",
          },
          { title: "Senior Management", href: "/about-us/senior-management" },
        ],
      },
      {
        title: "ACCREDITATIONS & QUALITY",
        items: [
          {
            title: "Local Accreditations",
            href: "/about-us/accreditation-certification",
          },
          {
            title: "International Certifications",
            href: "/about-us/accreditation-certification",
          },
          {
            title: "Quality & Patient Safety",
            href: "/about-us/accreditation-certification",
          },
        ],
      },
      {
        title: "INSTITUTIONAL DOCUMENTS",
        items: [
          { title: "Strategic Plan", href: "/about/strategic-plan" },
          { title: "Corporate Social Responsibility", href: "/about/csr" },
        ],
      },
      {
        title: "IMAGE",
        image: "/assets/opc_images/anderson.jpg",
        link: "/about-us",
        caption: "Leadership & Governance at the Nairobi Hospital",
      },
    ],
  },
  {
    labelKey: "clinical_services",
    icon: Heart,
    sections: [
      {
        title: "CLINICAL SERVICES",
        items: [
          { title: "Anderson Specialty Clinics", href: "/clinical-services" },
          {
            title: "Accident and Emergency",
            href: "/clinical-services/accident-emergency",
          },
          {
            title: "Pharmacy Services",
            href: "/clinical-services/pharmacy-services",
          },
          {
            title: "Laboratory Services",
            href: "/clinical-services/laboratory-services",
          },
          {
            title: "Radiology Services",
            href: "/clinical-services/radiology-services",
          },
          {
            title: "Endoscopy Services",
            href: "/clinical-services/endoscopy-services",
          },
          {
            title: "Dental Procedures",
            href: "/clinical-services/dental-procedures",
          },
        ],
      },
      {
        title: "MORE SERVICES",
        items: [
          {
            title: "Physical Medicine Centre",
            href: "/clinical-services/physical-medicine-center",
          },
          {
            title: "Psychosocial Department",
            href: "/clinical-services/psychosocial-department",
          },
          {
            title: "Cath Lab Services",
            href: "/clinical-services/cath-lab-services",
          },
          {
            title: "Antenatal Services",
            href: "/clinical-services/antenatal-services",
          },
          {
            title: "Renal Services",
            href: "/clinical-services/renal-services",
          },
          {
            title: "Oncology Services",
            href: "/clinical-services/oncology-services",
          },
        ],
      },
      {
        title: "OUTPATIENT SERVICES",
        items: [
          { title: "Chandaria A&E Centre", href: "/outpatient/a-e" },
          {
            title: "Capital Outpatient Centre",
            href: "/outpatient-center/capital-opc",
          },
          {
            title: "Galleria Outpatient Centre",
            href: "/outpatient-center/galleria-opc",
          },
          {
            title: "Kiambu Outpatient Centre",
            href: "/outpatient-center/kiambu-opc",
          },
          {
            title: "Rosslyn Outpatient Centre",
            href: "/outpatient-center/rosslyn-opc",
          },
          {
            title: "Southfield Outpatient Centre",
            href: "/outpatient-center/southfield-opc",
          },
          {
            title: "Warwick Outpatient Centre",
            href: "/outpatient-center/warwick-opc",
          },
        ],
      },
      {
        title: "INPATIENT & CRITICAL CARE",
        items: [
          { title: "Admission Process", href: "/inpatient/admission" },
          { title: "Rooms and Wards", href: "/inpatient/rooms-wards" },
          { title: "Critical Care Services", href: "/inpatient/critical-care" },
          { title: "Theatre & Surgery", href: "/inpatient/surgery" },
          { title: "Infection Control", href: "/inpatient/infection-control" },
        ],
      },
      {
        title: "IMAGE",
        image: "/assets/opc_images/anderson.jpg",
        link: "/clinical/medical-specialties",
        caption: "Leadership & Governance at the Nairobi Hospital",
      },
    ],
  },
  {
    labelKey: "college_of_health_sciences",
    icon: GraduationCap,
    sections: [
      {
        title: "SCHOOL INFORMATION",
        items: [
          { title: "About the college", href: "/college/about-college" },
          {
            title: "Programmes, Admission & Sponsorships",
            href: "/college/tuition-and-sponsorships",
          },
          {
            title: "Facilities and Downloads",
            href: "/college/facilities-and-downloads",
          },
        ],
      },
      {
        title: "EXTRAS",
        items: [
          { title: "Alumni Network", href: "/college/student-alumni" },
          { title: "FAQs", href: "/college/college-faqs" },
        ],
      },
      {
        title: "IMAGE",
        image: "/assets/opc_images/anderson.jpg",
        link: "/college/student-alumni",
        caption: "Leadership & Governance at the Nairobi Hospital",
      },
    ],
  },
  {
    labelKey: "notices_and_opportunities",
    icon: Newspaper,
    sections: [
      {
        title: "NEWS & MEDIA",
        items: [
          { title: "Latest News", href: "/news" },
          { title: "Events & Announcements", href: "/news" },
          { title: "Health Articles & Blogs", href: "/news/" },
        ],
      },
      {
        title: "TENDERS",
        items: [
          { title: "Open Tenders", href: "/tenders/open" },
          { title: "Supplier Information", href: "/tenders/suppliers" },
          { title: "Procurement Guidelines", href: "/tenders/guidelines" },
        ],
      },
      {
        title: "CAREERS",
        items: [
          { title: "Job Vacancies", href: "/careers/jobs" },
          { title: "Volunteer Opportunities", href: "/careers/volunteer" },
          { title: "Submit Your CV", href: "/careers/submit-cv" },
        ],
      },
      {
        title: "IMAGE",
        image: "/assets/opc_images/anderson.jpg",
        link: "/careers/volunteer",
        caption: "Leadership & Governance at the Nairobi Hospital",
      },
    ],
  },
  {
    labelKey: "other_services",
    icon: Building2,
    sections: [
      {
        title: "HOSPITAL FACILITIES",
        items: [
          {
            title: "Convention & Conference Centre",
            href: "/convention-center",
          },
          { title: "Parking & Transport", href: "#" },
          { title: "Security & Safety", href: "#" },
        ],
      },
      {
        title: "SUPPORT SERVICES",
        items: [
          { title: "Laundry & Housekeeping", href: "/laundry-services" },
          { title: "Catering Services", href: "/about-us/board-of-trustees" },
          {
            title: "Patient Support Services",
            href: "/about-us/board-of-management",
          },
        ],
      },
      {
        title: "IMAGE",
        image: "/assets/opc_images/anderson.jpg",
        link: "/about-us/board-of-management",
        caption: "Leadership & Governance at the Nairobi Hospital",
      },
    ],
  },
];

export type NavigationContentKeys =
  (typeof NAVIGATION_CONTENT)[number]["labelKey"];
