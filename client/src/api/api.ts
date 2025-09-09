const USER_API = "http://localhost:5003/auth";
const CLINICS_API = "http://localhost:5003/clinical-services";

// Auth

export const loginUser = async (username: string, password: string) => {
  const res = await fetch(`${USER_API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
};

export const registerUser = async (username: string, password: string) => {
  const res = await fetch(`${USER_API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
};

// Auth Token Helpers

function getAuthToken() {
  return localStorage.getItem("token") || "";
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: getAuthToken(), // 👈 NO 'Bearer' prefix
  };
}

//Clinical Services API

export async function fetchClinicalServices() {
  const res = await fetch(CLINICS_API, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch clinical services");
  return res.json();
}

export async function fetchClinicalServiceById(id: number) {
  const res = await fetch(`${CLINICS_API}/${id}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch clinical service");
  return res.json();
}

export async function createClinicalService(data: any) {
  console.log("🛰️ Creating Clinical Service with data:", data);
  const res = await fetch(CLINICS_API, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create clinical service");
  return res.json();
}

export async function updateClinicalService(id: number, data: any) {
  const res = await fetch(`${CLINICS_API}/${id}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update clinical service");
  return res.json();
}

export async function deleteClinicalService(id: number) {
  const res = await fetch(`${CLINICS_API}/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete clinical service");
  return res.json();
}
