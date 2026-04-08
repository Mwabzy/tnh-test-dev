import { RecipientEmailSetting, UserEnquiryCategory } from "@/types";

export const DEFAULT_USER_ENQUIRY_RECIPIENT = "iansmithxv@gmail.com";

export const USER_ENQUIRY_SUBJECT_OPTIONS = [
  "General enquiries",
  "Medical enquiries",
  "School of Nursing",
  "Job enquiries",
] as const;

export const USER_ENQUIRY_RECIPIENT_MAP: Record<UserEnquiryCategory, string> = {
  Bookings: DEFAULT_USER_ENQUIRY_RECIPIENT,
  "General enquiries": "iansmithm3@gmail.com",
  "Medical enquiries": "smithke98@gmail.com",
  "School of Nursing": "morgansmithk2@gmail.com",
  "Job enquiries": "smithcarter254@gmail.com",
};

export const getUserEnquiryRecipient = (category?: string) =>
  USER_ENQUIRY_RECIPIENT_MAP[category as UserEnquiryCategory] ??
  DEFAULT_USER_ENQUIRY_RECIPIENT;

export const buildRecipientEmailMap = (
  settings?: RecipientEmailSetting[],
): Record<UserEnquiryCategory, string> => {
  const merged = { ...USER_ENQUIRY_RECIPIENT_MAP };
  (settings ?? []).forEach((setting) => {
    merged[setting.category] = setting.email;
  });
  return merged;
};
