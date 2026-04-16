import { JSX, useEffect, useMemo } from "react";
import { Navigate, useNavigate } from "react-router";
import { getPayload, isTokenValid, setupLogoutTimer } from "@/utils/auth";

interface ProtectedRouteProps {
  children: JSX.Element;
}



const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const payload = useMemo(() => getPayload(token), [token]);
  const valid = isTokenValid(payload);
    // Auto-logout timer
  useEffect(() => {
    if (!payload) return;
    return setupLogoutTimer(payload, navigate);
  }, [navigate, payload]);


  // Handle invalid token immediately
  if (!valid) {
    localStorage.removeItem("token");
    return <Navigate to="/dashboard/auth" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
