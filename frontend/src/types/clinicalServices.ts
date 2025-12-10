export interface Image {
  url: string;
  alt?: string;
}

export interface Feature {
  title: string;
  description?: string;
}

export interface Doctor {
  id?: number;
  name: string;
  role: string;
  bio: string;
  image?: string;
  services_offered?: number[];
  research_publications?: string;
  awards?: string[];
}

export interface Testimonial {
  name: string;
  title: string;
  image?: string;
  quote: string;
}

export interface ContactInfo {
  phone: string;
  email?: string;
}

export interface ClinicalService {
  id: number;
  title: string;
  tagline: string;
  overview: string;
  detailedDescription?: string;
  features: Feature[];
  doctors?: Doctor[];
  doctorIds?: string[];
  testimonials?: Testimonial[];
  contact: ContactInfo;
  isBookable: boolean;
  hasReadMore: boolean;
  timingsOnOverview?: string;
  clinics?: ClinicalService[];
  images: Image[];
  locations: string[];
}
