import { lazyLoad } from "@/components/layout/lazy-load";
import { UIRoutesType } from "./routes-path";

const DashboardRoutes = {
  home: {
    name: "Dashboard Home",
    path: "",
    component: lazyLoad(() => import("@/dashboard/DashboardHome")),
  },

  clinicalServices: {
    name: "Clinical Services",
    path: "clinical-services",
    component: lazyLoad(
      () =>
        import("@/dashboard/pages/clinical-services/clinics/ClinicalServices"),
    ),
  },

  doctors: {
    name: "Doctor Profiles",
    path: "doctor-profiles",
    component: lazyLoad(
      () =>
        import("@/dashboard/pages/clinical-services/doctor-profiles/DoctorProfiles"),
    ),
  },

  hero: {
    name: "Hero Section",
    path: "hero-section",
    component: lazyLoad(() => import("@/dashboard/pages/about/hero/Hero")),
  },

  boardM: {
    name: "Board of Management",
    path: "board-of-management",
    component: lazyLoad(
      () => import("@/dashboard/pages/about/team/BoardOfManagement"),
    ),
  },

  boardT: {
    name: "Board of Trustees",
    path: "board-of-trustees",
    component: lazyLoad(
      () => import("@/dashboard/pages/about/team/BoardOfTrustees"),
    ),
  },

  seniorM: {
    name: "Senior Management",
    path: "senior-management",
    component: lazyLoad(
      () => import("@/dashboard/pages/about/team/SeniorManagement"),
    ),
  },

  blogPosts: {
    name: "Blog Posts",
    path: "blog-posts",
    component: lazyLoad(
      () => import("@/dashboard/pages/new_events_blogs/ArticlesBlogs"),
    ),
  },

  latestNews: {
    name: "News Articles",
    path: "latest-news",
    component: lazyLoad(
      () => import("@/dashboard/pages/new_events_blogs/LatestNews"),
    ),
  },
  publicStatements: {
    name: "Public Statements",
    path: "public-statements",
    component: lazyLoad(
      () =>
        import(
          "@/dashboard/pages/new_events_blogs/public-statements/PublicStatements"
        ),
    ),
  },
  interviews: {
    name: "Interviews",
    path: "interviews",
    component: lazyLoad(
      () =>
        import(
          "@/dashboard/pages/new_events_blogs/interviews/Interviews"
        ),
    ),
  },
  corporateDocuments: {
    name: "Corporate Documents",
    path: "corporate-documents",
    component: lazyLoad(
      () =>
        import(
          "@/dashboard/pages/new_events_blogs/corporate-documents/CorporateDocuments"
        ),
    ),
  },
  CSR: {
    name: "Corporate Social Responsibility",
    path: "corporate-social-responsibility",
    component: lazyLoad(() => import("@/dashboard/pages/about/csr/Csr")),
  },
  OPC: {
    name: "outpatient centers",
    path: "outpatient-centers",
    component: lazyLoad(
      () =>
        import("@/dashboard/pages/clinical-services/outpatient-centers/OutpatientCenter"),
    ),
  },
  RoomWards: {
    name: "Rooms & Wards",
    path: "rooms-and-wards",
    component: lazyLoad(
      () => import("@/dashboard/pages/clinical-services/rooms-wards/RoomWards"),
    ),
  },
  Careers: {
    name: "Careers",
    path: "careers",
    component: lazyLoad(
      () => import("@/dashboard/pages/new_events_blogs/Careers/Careers"),
    ),
  },
  Tenders: {
    name: "Tenders",
    path: "tenders",
    component: lazyLoad(
      () => import("@/dashboard/pages/new_events_blogs/tenders/Tenders"),
    ),
  },
  ClinicalFaqs: {
    name: "Clinical FAQs",
    path: "clinical-faqs",
    component: lazyLoad(
      () =>
        import("@/dashboard/pages/clinical-services/clinical-faqs/ClinicalFaq"),
    ),
  },
  RoomWard: {
    name: "RoomWard",
    path: "rooms-wards",
    component: lazyLoad(
      () => import("@/dashboard/pages/clinical-services/rooms-wards/RoomWards"),
    ),
  },
};

export const DashboardRoutesPath: Record<
  keyof typeof DashboardRoutes,
  UIRoutesType
> = DashboardRoutes;
