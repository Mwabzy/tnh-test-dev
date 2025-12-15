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
        import("@/dashboard/pages/clinical-services/clinics/ClinicalServices")
    ),
  },

  doctors: {
    name: "Doctor Profiles",
    path: "doctor-profiles",
    component: lazyLoad(
      () =>
        import(
          "@/dashboard/pages/clinical-services/doctor-profiles/DoctorProfiles"
        )
    ),
  },

  boardM: {
    name: "Board of Management",
    path: "board-of-management",
    component: lazyLoad(
      () => import("@/dashboard/pages/about/BoardOfManagement")
    ),
  },

  boardT: {
    name: "Board of Management",
    path: "board-of-management",
    component: lazyLoad(
      () => import("@/dashboard/pages/about/BoardOfManagement")
    ),
  },

  seniorM: {
    name: "Board of Management",
    path: "board-of-management",
    component: lazyLoad(
      () => import("@/dashboard/pages/about/BoardOfManagement")
    ),
  },
};

export const DashboardRoutesPath: Record<
  keyof typeof DashboardRoutes,
  UIRoutesType
> = DashboardRoutes;
