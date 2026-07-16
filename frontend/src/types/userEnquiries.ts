export const USER_ENQUIRY_CATEGORIES = [
  "Bookings",
  "General enquiries",
  "Medical enquiries",
  "School of Nursing",
  "Job enquiries",
] as const;

export type UserEnquiryCategory = (typeof USER_ENQUIRY_CATEGORIES)[number];

export const EMAIL_STATUS_SENT = "email sent";
export const EMAIL_STATUS_FAILED = "email not sent";

export interface UserEnquiry {
  id: string;
  category: UserEnquiryCategory;
  fullName: string;
  email: string;
  phone?: string;
  message?: string;
  recipientEmail: string;
  service?: string;
  doctor?: string;
  location?: string;
  appointmentDate?: string | null;
  appointmentTime?: string | null;
  emailStatus?: string;
  createdAt: string;
  updatedAt: string;
}
