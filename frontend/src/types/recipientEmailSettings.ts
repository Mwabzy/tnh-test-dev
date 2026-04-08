import { UserEnquiryCategory } from "./userEnquiries";

export interface RecipientEmailSetting {
  id: string | number;
  category: UserEnquiryCategory;
  email: string;
  createdAt: string;
  updatedAt: string;
}
