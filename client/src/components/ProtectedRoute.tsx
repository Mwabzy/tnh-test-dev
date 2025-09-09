import { Navigate } from "react-router";
import { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/dashboard/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
