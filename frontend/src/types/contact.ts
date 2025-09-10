export interface EmailEntry {
  type: string;
  address: string;
}

export interface ContactInfo {
  phone: string;
  emails?: EmailEntry[]; // Optional array of email entries
}
