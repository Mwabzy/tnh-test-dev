// import { getPayload, isAuthenticated, isTokenValid } from "@/utils/auth";
import axios from "axios";

//import { CSR } from "@/types";
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";
console.log("API Base URL:", BASE_URL);
// const BASE_URL = "http://localhost:8000/api/v1";

const CLINICS_API = "/clinical-services/";
const DOCTORS_API = "/doctors/";
const TEAM_API = "/team-members/";
const BLOGS_API = "/blog-posts/";
const CSR_API = "/csr/";
const OUTPATIENT_CENTER_API = "/outpatient-centers/";
const CLINICAL_FAQS_API = "/clinical-faqs/";
const ROOM_WARDS_API = "/room-wards/";
const BOOKING_API = "/send_email/";
const CAREERS_API = "/careers/";
const TENDERS_API = "/tenders/";
const PUBLIC_STATEMENTS_API = "/public-statements/";
const INTERVIEWS_API = "/interviews/";
const CORPORATE_DOCUMENTS_API = "/corporate-documents/";
const HERO_API = "/hero/";
const USER_ENQUIRIES_API = "/user-enquiries/";
const RECIPIENT_EMAIL_SETTINGS_API = "/recipient-email-settings/";

// Axios Instance
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token only for write operations (public GETs should not require auth)

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (isAuthenticated(token) && isTokenValid(getPayload(token))) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// AUTH

export const loginUser = async (username: string, password: string) => {
  const res = await api.post(`/auth/login/`, { username, password });
  return res.data;
};

export const registerUser = async (
  username: string,
  email: string,
  password: string,
) => {
  const res = await api.post(`/auth/register/`, {
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

export async function fetchClinicalServiceByPath(path: string) {
  const res = await api.get(`${CLINICS_API}by-path/`, {
    params: { path },
  });
  return res.data;
}

type TranslationLang = "fr" | "es" | "zh" | "ru";
type TranslatableClinicalField =
  | "title"
  | "tagline"
  | "overview"
  | "detailedDescription";
type TranslatableClinicalFeatureField = "title" | "description";

type ClinicalServiceFeatureTranslationPreviewPayload = Partial<
  Record<TranslatableClinicalFeatureField, string>
>;

type ClinicalServiceFeatureTranslationPreviewResponse = Partial<
  Record<
    TranslatableClinicalFeatureField,
    Partial<Record<TranslationLang, string>>
  >
>;

export type ClinicalServiceTranslationPreviewPayload = Partial<
  Record<TranslatableClinicalField, string>
> & {
  features?: ClinicalServiceFeatureTranslationPreviewPayload[];
};

export type ClinicalServiceTranslationPreviewResponse = Partial<
  Record<TranslatableClinicalField, Partial<Record<TranslationLang, string>>>
> & {
  features?: ClinicalServiceFeatureTranslationPreviewResponse[];
};

export async function fetchClinicalServiceTranslationPreview(
  payload: ClinicalServiceTranslationPreviewPayload,
) {
  const res = await api.post(`${CLINICS_API}translate-preview/`, payload);
  return res.data as ClinicalServiceTranslationPreviewResponse;
}

type TranslatableDoctorField = "role" | "bio";
type TranslatableOutpatientCenterField = "description";
type TranslatableBlogField =
  | "title"
  | "subtitle"
  | "blog_subtitle"
  | "short_desc"
  | "long_desc"
  | "spotlight_title"
  | "spotlight_points"
  | "category";
type TranslatableCsrField =
  | "title"
  | "subtitle"
  | "blog_subtitle"
  | "description"
  | "short_desc"
  | "long_desc";

export type DoctorTranslationPreviewPayload = Partial<
  Record<TranslatableDoctorField, string>
>;
export type DoctorTranslationPreviewResponse = Partial<
  Record<TranslatableDoctorField, Partial<Record<TranslationLang, string>>>
>;

export type OutpatientCenterTranslationPreviewPayload = Partial<
  Record<TranslatableOutpatientCenterField, string>
>;
export type OutpatientCenterTranslationPreviewResponse = Partial<
  Record<
    TranslatableOutpatientCenterField,
    Partial<Record<TranslationLang, string>>
  >
>;

export type BlogTranslationPreviewPayload = Partial<
  Record<TranslatableBlogField, string>
>;
export type BlogTranslationPreviewResponse = Partial<
  Record<TranslatableBlogField, Partial<Record<TranslationLang, string>>>
>;

export type CsrTranslationPreviewPayload = Partial<
  Record<TranslatableCsrField, string>
>;
export type CsrTranslationPreviewResponse = Partial<
  Record<TranslatableCsrField, Partial<Record<TranslationLang, string>>>
>;

export async function fetchDoctorTranslationPreview(
  payload: DoctorTranslationPreviewPayload,
) {
  const res = await api.post(`${DOCTORS_API}translate-preview/`, payload);
  return res.data as DoctorTranslationPreviewResponse;
}

export async function fetchOutpatientCenterTranslationPreview(
  payload: OutpatientCenterTranslationPreviewPayload,
) {
  const res = await api.post(
    `${OUTPATIENT_CENTER_API}translate-preview/`,
    payload,
  );
  return res.data as OutpatientCenterTranslationPreviewResponse;
}

export async function fetchBlogTranslationPreview(
  payload: BlogTranslationPreviewPayload,
) {
  const res = await api.post(`${BLOGS_API}translate-preview/`, payload);
  return res.data as BlogTranslationPreviewResponse;
}

export async function fetchCsrTranslationPreview(
  payload: CsrTranslationPreviewPayload,
) {
  const res = await api.post(`${CSR_API}translate-preview/`, payload);
  return res.data as CsrTranslationPreviewResponse;
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

export async function reorderClinicalServices(orderedIds: number[]) {
  const res = await api.patch(`${CLINICS_API}reorder/`, {
    ordered_ids: orderedIds,
  });
  return res.data;
}

type ClinicalServiceImageMetaPayload = {
  alt?: string;
  focalX?: number;
  focalY?: number;
};

export async function updateClinicalServiceImageMeta(
  imageId: number,
  payload: ClinicalServiceImageMetaPayload,
) {
  const formData = new FormData();
  if (payload.alt !== undefined) formData.append("alt", payload.alt);
  if (payload.focalX !== undefined) {
    formData.append("focalX", String(payload.focalX));
  }
  if (payload.focalY !== undefined) {
    formData.append("focalY", String(payload.focalY));
  }

  return api.patch(
    `${BASE_URL}/clinical-service-images/${imageId}/`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
}

export async function updateImageAlt(imageId: number, alt: string) {
  return updateClinicalServiceImageMeta(imageId, { alt });
}

export async function updateFeatureImageAlt(
  featureImageId: number,
  alt: string,
) {
  return api.patch(
    `${BASE_URL}/clinical-service-feature-images/${featureImageId}/`,
    { alt },
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
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

export async function reorderDoctors(orderedIds: number[]) {
  const res = await api.patch(`${DOCTORS_API}reorder/`, {
    ordered_ids: orderedIds,
  });
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

export async function reorderTeamMembers(orderedIds: string[]) {
  const res = await api.patch(`${TEAM_API}reorder/`, {
    ordered_ids: orderedIds,
  });
  return res.data;
}

// BLOG POSTS

export const fetchBlogPosts = async () => {
  const response = await api.get(`${BLOGS_API}`);
  return response.data;
};

export const fetchBlogPostById = async (id: string) => {
  const response = await api.get(`${BLOGS_API}${id}/`);
  return response.data;
};

export const createBlogPosts = async (data: any) => {
  console.log("Creating Blog Post with data:", data);
  const response = await api.post(BLOGS_API, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateBlogPosts = async (id: string, data: any) => {
  const response = await api.patch(`${BLOGS_API}${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
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
  const response = await api.post(CSR_API, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function updateCsr(id: string | number, data: any) {
  const response = await api.patch(`${CSR_API}${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function deleteCsr(id: string) {
  const res = await api.delete(`${CSR_API}${id}/`);
  return res.data;
}

// outpatient centers
export async function fetchOutpatientCenter() {
  const res = await api.get(OUTPATIENT_CENTER_API);
  return res.data;
}

export async function fetchOutpatientCenterById(id: number) {
  const res = await api.get(`${OUTPATIENT_CENTER_API}${id}/`);
  return res.data;
}

export async function createOutpatientCenter(data: any) {
  const res = await api.post(OUTPATIENT_CENTER_API, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function updateOutpatientCenter(id: number, data: any) {
  const res = await api.patch(`${OUTPATIENT_CENTER_API}${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function deleteOutpatientCenter(id: number) {
  const res = await api.delete(`${OUTPATIENT_CENTER_API}${id}/`);
  return res.data;
}

export async function sendEmail(data: any) {
  const res = await api.post(BOOKING_API, data);
  return res.data;
}
// ---------------- CLINICAL FAQS ----------------
export async function fetchClinicalFaqs() {
  const res = await api.get(CLINICAL_FAQS_API);
  return res.data;
}

export async function createClinicalFaq(data: any) {
  const res = await api.post(CLINICAL_FAQS_API, data);
  return res.data;
}

export async function updateClinicalFaq(id: number, data: any) {
  const res = await api.patch(`${CLINICAL_FAQS_API}${id}/`, data);
  return res.data;
}

export async function deleteClinicalFaq(id: number) {
  const res = await api.delete(`${CLINICAL_FAQS_API}${id}/`);
  return res.data;
}

export async function fetchClinicalFaqById(data: any) {
  const res = await api.post(CLINICAL_FAQS_API, data);
  return res.data;
}

// ROOM WARDS
export async function fetchRoomWards() {
  const res = await api.get(ROOM_WARDS_API);
  return res.data;
}

export async function fetchRoomWardById(id: number) {
  const res = await api.get(`${ROOM_WARDS_API}${id}/`);
  return res.data;
}

export async function createRoomWard(data: any) {
  const res = await api.post(ROOM_WARDS_API, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function updateRoomWard(id: number, data: any) {
  const res = await api.patch(`${ROOM_WARDS_API}${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function deleteRoomWard(id: number) {
  const res = await api.delete(`${ROOM_WARDS_API}${id}/`);
  return res.data;
}

// CAREERS / JOB LISTINGS

export async function fetchJobListings() {
  const res = await api.get(CAREERS_API);
  return res.data;
}

export async function fetchJobListingById(id: string) {
  const res = await api.get(`${CAREERS_API}${id}/`);
  return res.data;
}

export async function createJobListing(data: any) {
  console.log("Creating Job Listing with data:", data);
  const res = await api.post(CAREERS_API, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function updateJobListing(id: string, data: any) {
  const res = await api.patch(`${CAREERS_API}${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function deleteJobListing(id: string) {
  const res = await api.delete(`${CAREERS_API}${id}/`);
  return res.data;
}

// TENDERS

export async function fetchTenders() {
  const res = await api.get(TENDERS_API);
  return res.data;
}

export async function fetchTenderById(id: string) {
  const res = await api.get(`${TENDERS_API}${id}/`);
  return res.data;
}

export async function createTender(data: any) {
  console.log("Creating Tender with data:", data);
  const res = await api.post(TENDERS_API, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function updateTender(id: string, data: any) {
  const res = await api.patch(`${TENDERS_API}${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function deleteTender(id: string) {
  const res = await api.delete(`${TENDERS_API}${id}/`);
  return res.data;
}

// PUBLIC STATEMENTS

export async function fetchPublicStatements() {
  const res = await api.get(PUBLIC_STATEMENTS_API);
  return res.data;
}

export async function createPublicStatement(data: any) {
  const res = await api.post(PUBLIC_STATEMENTS_API, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function updatePublicStatement(id: string, data: any) {
  const res = await api.patch(`${PUBLIC_STATEMENTS_API}${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function deletePublicStatement(id: string) {
  const res = await api.delete(`${PUBLIC_STATEMENTS_API}${id}/`);
  return res.data;
}

// INTERVIEWS

export async function fetchInterviews() {
  const res = await api.get(INTERVIEWS_API);
  return res.data;
}

export async function createInterview(data: any) {
  const res = await api.post(INTERVIEWS_API, data);
  return res.data;
}

export async function updateInterview(id: string, data: any) {
  const res = await api.patch(`${INTERVIEWS_API}${id}/`, data);
  return res.data;
}

export async function deleteInterview(id: string) {
  const res = await api.delete(`${INTERVIEWS_API}${id}/`);
  return res.data;
}

// CORPORATE DOCUMENTS

export async function fetchCorporateDocuments() {
  const res = await api.get(CORPORATE_DOCUMENTS_API);
  return res.data;
}

export async function createCorporateDocument(data: any) {
  const res = await api.post(CORPORATE_DOCUMENTS_API, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function updateCorporateDocument(id: string, data: any) {
  const res = await api.patch(`${CORPORATE_DOCUMENTS_API}${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function deleteCorporateDocument(id: string) {
  const res = await api.delete(`${CORPORATE_DOCUMENTS_API}${id}/`);
  return res.data;
}

//HERO
export async function fetchHero() {
  const res = await api.get(HERO_API);
  return res.data;
}

export async function fetchHeroById(id: number) {
  const res = await api.get(`${HERO_API}${id}/`);
  return res.data;
}

export async function createHero(data: any) {
  console.log("Creating Hero with data:", data);
  const res = await api.post(HERO_API, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function updateHero(id: number, data: any) {
  const res = await api.patch(`${HERO_API}${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function deleteHero(id: number) {
  const res = await api.delete(`${HERO_API}${id}/`);
  return res.data;
}

// USER ENQUIRIES
export async function fetchUserEnquiries(category?: string) {
  const token = localStorage.getItem("token");
  const res = await api.get(USER_ENQUIRIES_API, {
    params: category ? { category } : undefined,
    headers:
      token && token !== "null" && token !== "undefined"
        ? { Authorization: `Bearer ${token}` }
        : undefined,
  });
  return res.data;
}

export async function createUserEnquiry(data: any) {
  const res = await api.post(USER_ENQUIRIES_API, data);
  return res.data;
}

export async function updateUserEnquiry(id: string, data: any) {
  const res = await api.patch(`${USER_ENQUIRIES_API}${id}/`, data);
  return res.data;
}

export async function deleteUserEnquiry(id: string) {
  const res = await api.delete(`${USER_ENQUIRIES_API}${id}/`);
  return res.data;
}

// RECIPIENT EMAIL SETTINGS
export async function fetchRecipientEmailSettings() {
  const res = await api.get(RECIPIENT_EMAIL_SETTINGS_API);
  return res.data;
}

export async function updateRecipientEmailSetting(
  id: string | number,
  data: any,
) {
  const res = await api.patch(`${RECIPIENT_EMAIL_SETTINGS_API}${id}/`, data);
  return res.data;
}
