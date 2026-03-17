export interface TenderListing {
  id: string;
  opportunity: string;
  referenceNumber: string;
  isPublished?: boolean;
  datePosted: string;
  closingDate: string;
  fileUrl: string;
}
