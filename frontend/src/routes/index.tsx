import { RoutesPath, UIRoutesType } from "./routes-path";
import { Navigate, Route, Routes } from "react-router";
import { JSX } from "react";
import Layout from "@/components/layout/layout";
import DashboardLayout from "@/dashboard/DashboardLayout";
// import DashboardHome from "@/dashboard/DashboardHome";
// import ClinicalServices from "@/dashboard/pages/ClinicalServices";
import AuthPage from "@/dashboard/auth/AuthPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import { DashboardRoutesPath } from "./dashboard-routes";
import NotFound from "@/dashboard/pages/NotFound";

/**
 * Automatically generated from the routes defined in the routes folder.
 * @returns {JSX.Element}
 */

// const handleAuthSuccess = (token: string) => {
//   localStorage.setItem("token", token);
//   // Optional: navigate to dashboard home
// };

const legacyRedirects = [
  { from: "/who-we-are", to: "/about-us" },
  { from: "/board-of-management", to: "/about-us/board-of-management" },
  { from: "/board-of-trustees", to: "/about-us/board-of-trustees" },
  { from: "/senior-management-team", to: "/about-us/senior-management" },
  {
    from: "/accreditation-and-certification",
    to: "/about-us/accreditation-certification",
  },
  { from: "/inpatients/rooms-and-wards", to: "/inpatient/rooms-wards" },
  { from: "/inpatients/admission-and-discharge", to: "/inpatient/admission" },
  { from: "/inpatients/high-critical-care", to: "/inpatient/critical-care" },
];

export function AppRoutes(): JSX.Element {
  return (
    <Routes>
      {/* Protected Routes */}
      <Route element={<Layout />}>
        {legacyRedirects.map((redirect) => (
          <Route
            key={redirect.from}
            path={redirect.from}
            element={<Navigate to={redirect.to} replace />}
          />
        ))}
        {Object.entries(RoutesPath).map(([key, route]) => {
          const typedRoute = route as UIRoutesType;
          return (
            <Route
              key={key}
              path={typedRoute.path}
              element={<typedRoute.component />}
            />
          );
        })}
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/dashboard/auth" element={<AuthPage />} />

      {/*Protected Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {Object.entries(DashboardRoutesPath).map(([key, route]) => {
          const typedRoute = route as UIRoutesType;
          return (
            <Route
              key={key}
              path={typedRoute.path}
              element={<typedRoute.component />}
            />
          );
        })}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
