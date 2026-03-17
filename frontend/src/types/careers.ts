export interface JobListing {
  id: string;
  referenceNumber?: string;
  isPublished?: boolean;
  title: string;
  location: string;
  opportunityType: "Full-time" | "Part-time" | "Contract" | "Internship";
  datePosted: string;
  closingDate?: string;
  fileUrl?: string;
}
