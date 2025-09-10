
// import Layout from "@/components/layout/layout";
import { RoutesPath, UIRoutesType } from "./routes-path";
import { Route, Routes } from "react-router";
import { JSX } from "react";
import Layout from "@/components/layout/layout";

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
    </Routes>
  );
}