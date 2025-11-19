import { JSX, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
//import * as jwt_decode_module from "jwt-decode";
//import type { JwtPayload } from "jwt-decode";

interface ProtectedRouteProps {
  children: JSX.Element;
}

// interface JWTPayload extends JwtPayload {
//   exp: number;
//   iat: number;
// }

// const jwt_decode = jwt_decode_module as unknown as (
//   token: string
// ) => JWTPayload;

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsValid(false);
      return;
    }

    try {
      // const payload = jwt_decode(token);
      const expiry = Date.now() + 600000;
      const now = Date.now();
      console.log("Token expiry time (ms):", expiry);

      // Logout  when token  expires
      const timeUntilExpiry = expiry - now;
      const timer = setTimeout(() => {
        localStorage.removeItem("token");
        navigate("/dashboard/auth", { replace: true });
      }, timeUntilExpiry);

      setIsValid(true);

      return () => clearTimeout(timer);
    } catch (err) {
      console.error("Invalid token:", err);

      setIsValid(false);
    }
  }, [navigate]);

  if (isValid === null) return <div>Loading...</div>;
  if (!isValid) return <Navigate to="/dashboard/auth" replace />;

  return children;
};

export default ProtectedRoute;
