export interface Image {
  id?: number;
  url: string;
  alt?: string;
}

export interface Feature {
  title: string;
  description?: string;
  image?: {
    url: string;
    alt?: string;
  };
}

export interface Doctor {
  id?: number;
  name: string;
  role: string;
  bio: string;
  image?: Image[];
  services_offered?: ClinicalService[];
  research_publications?: string[];
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

export interface Timings {
  services_offered?: ClinicalService[];
  day: string;
  startTime: string;
  stopTime: string;
}

export interface outpatientCenter {
  id?: number;
  name: string;
  slug?: string;
  description: string;
  contact: ContactInfo;
  location: string;
  timings: Timings[];
}
