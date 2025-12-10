import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const USER_API = `${BASE_URL}/auth/`;
const CLINICS_API = `${BASE_URL}/clinical-services/`;
const DOCTORS_API = `${BASE_URL}/doctors/`;

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
  const res = await api.post(CLINICS_API, data);
  return res.data;
}

export async function updateClinicalService(id: number, data: any) {
  const res = await api.patch(`${CLINICS_API}${id}/`, data);
  return res.data;
}

export async function deleteClinicalService(id: number) {
  const res = await api.delete(`${CLINICS_API}${id}/`);
  return res.data;
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
  const res = await api.post(DOCTORS_API, data);
  return res.data;
}

export async function updateDoctor(id: number, data: any) {
  const res = await api.patch(`${DOCTORS_API}${id}/`, data);
  return res.data;
}

export async function deleteDoctor(id: number) {
  const res = await api.delete(`${DOCTORS_API}${id}/`);
  return res.data;
}
