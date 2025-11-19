import { RoutesPath, UIRoutesType } from "./routes-path";
import { Route, Routes } from "react-router";
import { JSX } from "react";
import Layout from "@/components/layout/layout";
import DashboardLayout from "@/dashboard/DashboardLayout";
// import DashboardHome from "@/dashboard/DashboardHome";
// import ClinicalServices from "@/dashboard/pages/ClinicalServices";
import AuthPage from "@/dashboard/pages/AuthPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import { DashboardRoutesPath } from "./dashboard-routes";

/**
 * Automatically generated from the routes defined in the routes folder.
 * @returns {JSX.Element}
 */

// const handleAuthSuccess = (token: string) => {
//   localStorage.setItem("token", token);
//   // Optional: navigate to dashboard home
// };

export function AppRoutes(): JSX.Element {
  return (
    <Routes>
      {/* Protected Routes */}
      <Route element={<Layout />}>
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
      </Route>
    </Routes>
  );
}
