export interface JobListing {
  id: string;
  title: string;
  location: string;
  description: string;
  requirements: string;
  opportunityType: "Full-time" | "Part-time" | "Contract" | "Internship";
  datePosted: string;
  closingDate?: string;
  fileUrl?: string;
}
