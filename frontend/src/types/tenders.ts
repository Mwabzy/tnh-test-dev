export interface TenderListing {
  id: string;
  opportunity: string;
  referenceNumber: string;
  description: string;
  opportunityType: "Tender";
  datePosted: string;
  closingDate: string;
  fileUrl: string;
}
