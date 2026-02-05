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

  eventsAnnouncements: {
    name: "Events & Announcements",
    path: "events-announcements",
    component: lazyLoad(
      () => import("@/dashboard/pages/new_events_blogs/EventsAnnouncememnts"),
    ),
  },

  latestNews: {
    name: "Latest News",
    path: "latest-news",
    component: lazyLoad(
      () => import("@/dashboard/pages/new_events_blogs/LatestNews"),
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
};

export const DashboardRoutesPath: Record<
  keyof typeof DashboardRoutes,
  UIRoutesType
> = DashboardRoutes;
