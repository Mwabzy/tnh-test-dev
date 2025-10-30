interface Image {
  url: string;
  alt?: string;
}

interface Feature {
  title: string;
  description?: string;
}

interface Doctor {
  name: string;
  title: string;
  image: string;
  bio: string;
}

interface Testimonial {
  name: string;
  title: string;
  image: string;
  quote: string;
}

interface ContactInfo {
  phone: string;
  email?: string;
  address?: string;
}

export interface ClinicalService {
  id: number;
  title: string;
  tagline: string;
  overview: string;
  detailedDescription?: string;
  features: Feature[];
  doctors?: Doctor[];
  testimonial?: Testimonial[];
  contact: ContactInfo;
  isBookable: boolean;
  hasReadMore: boolean;
  timingsOnOverview?: string;
  clinics?: ClinicalService[];
  images: Image[];
  locations: string[];
}
