import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const USER_API = `${BASE_URL}/auth/`;
const CLINICS_API = `${BASE_URL}/clinical-services/`;
const DOCTORS_API = `${BASE_URL}/doctors/`;
const TEAM_API = `${BASE_URL}/team-members/`;
const BLOGS_API = `${BASE_URL}/blog-posts/`;
const CSR_API = `${BASE_URL}/csr/`;

// Axios Instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// AUTH

export const loginUser = async (username: string, password: string) => {
  const res = await api.post(`${USER_API}login/`, { username, password });
  return res.data;
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const res = await api.post(`${USER_API}register/`, {
    username,
    email,
    password,
  });
  return res.data;
};

// CLINICAL SERVICES
export async function fetchClinicalServices() {
  const res = await api.get(CLINICS_API);
  return res.data;
}

export async function fetchClinicalServiceById(id: number) {
  const res = await api.get(`${CLINICS_API}${id}/`);
  return res.data;
}

export async function createClinicalService(data: any) {
  console.log(" Creating Clinical Service with data:", data);
  const res = await api.post(CLINICS_API, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function updateClinicalService(id: number, data: any) {
  const res = await api.patch(`${CLINICS_API}${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function deleteClinicalService(id: number) {
  const res = await api.delete(`${CLINICS_API}${id}/`);
  return res.data;
}

export async function updateImageAlt(imageId: number, alt: string) {
  return api.patch(`${BASE_URL}/clinical-service-images/${imageId}/`, { alt });
}

//DOCTORS' PROFILES

export async function fetchDoctors() {
  const res = await api.get(DOCTORS_API);
  return res.data;
}

export async function fetchDoctorById(id: number) {
  const res = await api.get(`${DOCTORS_API}${id}/`);
  return res.data;
}

export async function createDoctor(data: any) {
  console.log("Creating Doctor with data:", data);
  const res = await api.post(DOCTORS_API, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function updateDoctor(id: number, data: any) {
  const res = await api.patch(`${DOCTORS_API}${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function deleteDoctor(id: number) {
  const res = await api.delete(`${DOCTORS_API}${id}/`);
  return res.data;
}

// TEAM MEMBERS

export async function fetchTeamMembers() {
  const res = await api.get(TEAM_API);
  return res.data;
}

export async function fetchTeamMemberById(id: string) {
  const res = await api.get(`${TEAM_API}${id}/`);
  return res.data;
}

export async function createTeamMember(data: any) {
  console.log("Creating Team Member with data:", data);
  const res = await api.post(TEAM_API, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function updateTeamMember(id: string, data: any) {
  const res = await api.patch(`${TEAM_API}${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function deleteTeamMember(id: string) {
  const res = await api.delete(`${TEAM_API}${id}/`);
  return res.data;
}

// BLOG POSTS

export const fetchBlogPosts = async () => {
  const response = await api.get(`${BLOGS_API}`);
  return response.data;
};

export const fetchBlogPostById = async (id: string) => {
  const response = await api.get(`${BLOGS_API}/${id}`);
  return response.data;
};

export const createBlogPosts = async (data: any) => {
  console.log("Creating Blog Post with data:", data);
  const response = await api.post(`${BLOGS_API}`, data);
  return response.data;
};

export const updateBlogPosts = async (id: string, data: any) => {
  const response = await api.patch(`${BLOGS_API}${id}/`, data);
  return response.data;
};

export const deleteBlogPosts = async (id: string) => {
  const response = await api.delete(`${BLOGS_API}${id}/`);
  return response.data;
};

// CSR

export async function fetchCsr() {
  const res = await api.get(CSR_API);
  return res.data;
}

export async function fetchCsrById(id: string) {
  const res = await api.get(`${CSR_API}${id}/`);
  return res.data;
}

export async function createCsr(data: any) {
  console.log("Creating CSR with data:", data);
  const res = await api.post(CSR_API, data);
  return res.data;
}

export async function updateCsr(id: string, data: any) {
  const res = await api.patch(`${CSR_API}${id}/`, data);
  return res.data;
}

export async function deleteCsr(id: string) {
  const res = await api.delete(`${CSR_API}${id}/`);
  return res.data;
}
