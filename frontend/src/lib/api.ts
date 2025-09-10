export const API_URL = "http://localhost:1337/api";

// Helper to build populate query
export const fetchFromStrapi = async (endpoint: string) => {
  const res = await fetch(`${API_URL}${endpoint}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${res.status}`);
  }
  return res.json();
};
