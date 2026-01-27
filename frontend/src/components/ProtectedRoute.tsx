import { JSX, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
  children: JSX.Element;
}

interface JwtPayload {
  exp: number; // expiration time in seconds
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let payload: JwtPayload | null = null;
  let isTokenValid = false;

  if (token) {
    try {
      payload = jwtDecode<JwtPayload>(token);
      const now = Date.now() / 1000;
      isTokenValid = payload.exp > now;

      if (!isTokenValid) {
        localStorage.removeItem("token");
      } else {
        console.log(
          "Token is valid. Will expire in:",
          Math.round(payload.exp - now),
          "seconds",
        );
      }
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
    }
  }

  // Auto-logout timer
  useEffect(() => {
    if (!payload) return;

    const now = Date.now() / 1000;
    const timeUntilExpiry = Math.max(payload.exp - now, 0) * 1000;

    console.log("Setting logout timer for:", timeUntilExpiry, "ms");

    const timer = setTimeout(() => {
      localStorage.removeItem("token");
      navigate("/dashboard/auth", { replace: true });
    }, timeUntilExpiry);

    return () => clearTimeout(timer);
  }, [navigate, payload]);

  if (!isTokenValid) {
    return <Navigate to="/dashboard/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
