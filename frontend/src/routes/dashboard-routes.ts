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
    component: lazyLoad(() => import("@/dashboard/pages/ClinicalServices")),
  },

  about: {
    name: "Doctor Profiles",
    path: "doctor-profiles",
    component: lazyLoad(() => import("@/dashboard/pages/DoctorProfiles")),
  },
};

export const DashboardRoutesPath: Record<
  keyof typeof DashboardRoutes,
  UIRoutesType
> = DashboardRoutes;
