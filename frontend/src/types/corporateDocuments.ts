export interface CorporateDocument {
  id?: string;
  title: string;
  isPublished?: boolean;
  file?: File | null;
  fileUrl?: string;
  created_at?: string;
}
