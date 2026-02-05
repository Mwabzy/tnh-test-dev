export interface JobListing {
  id: string;
  opportunity: string;
  description: string;
  location: "On-site" | "Remote" | "Hybrid";
  opportunityType: "Full-time" | "Part-time" | "Contract" | "Internship";
  datePosted: string;
  closingDate: string;
  fileUrl: string;
}
