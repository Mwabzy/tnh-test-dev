import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  exp: number; // expiration time in seconds
}

// Helper: Decode token and return payload or null
export const getPayload = (token: string | null): JwtPayload | null => {
  if (!token) return null;
  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
};

// Helper: Check if token is valid (not expired)
export const isTokenValid = (payload: JwtPayload | null): boolean => {
  if (!payload) return false;
  const now = Date.now() / 1000;
  return payload.exp > now;
};

export const isAuthenticated = (token: string | null): boolean => {
  return !!token && token.trim() !== "";
};

// Helper: Set up auto-logout timer
export const setupLogoutTimer = (
  payload: JwtPayload,
  navigate: (to: string, options?: { replace?: boolean }) => void
) => {
  const now = Date.now() / 1000;
  const timeUntilExpiry = Math.max(payload.exp - now, 0) * 1000;

  console.log("Setting logout timer for:", timeUntilExpiry, "ms");

  const timer = setTimeout(() => {
    localStorage.removeItem("token");
    navigate("/dashboard/auth", { replace: true });
  }, timeUntilExpiry);

  return () => clearTimeout(timer); // Return cleanup function
};