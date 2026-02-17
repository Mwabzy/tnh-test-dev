export type ContactEmailEntry = {
  type: string;
  address: string;
};

export type PageContactInfo = {
  phone: string;
  emails: ContactEmailEntry[];
};

export const PAGE_CONTACT_INFO: PageContactInfo = {
  phone: "+254 703 082 000",
  emails: [
    { type: "general", address: "hosp@nbihosp.org" },
    { type: "medical", address: "medicalenquiries@nbihosp.org" },
    { type: "service", address: "customer.service@nbihosp.org" },
    { type: "clinic", address: "clinic@nbihosp.org" },
  ],
};
