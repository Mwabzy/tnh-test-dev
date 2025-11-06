// import Layout from "@/components/layout/layout";
import { RoutesPath, UIRoutesType } from "./routes-path";
import { Route, Routes } from "react-router";
import { JSX } from "react";
import Layout from "@/components/layout/layout";
import DashboardLayout from "@/dashboard/DashboardLayout";
import DashboardHome from "@/dashboard/DashboardHome";
import ClinicalServices from "@/dashboard/pages/ClinicalServices";
import AuthPage from "@/dashboard/pages/AuthPage";
import ProtectedRoute from "@/components/ProtectedRoute";

/**
 * Automatically generated from the routes defined in the routes folder.
 * @returns {JSX.Element}
 */
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
      {/* Catch-all route */}
      {/* <Route path="*" element={<Navigate to="/" replace />} /> */}

      <Route
        path="/dashboard/auth"
        element={<AuthPage onAuthSuccess={(token) => console.log(token)} />}
      />

      {/* Protected dashboard pages without Navbar & Footer */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="clinical-services" element={<ClinicalServices />} />
      </Route>
    </Routes>
  );
}
