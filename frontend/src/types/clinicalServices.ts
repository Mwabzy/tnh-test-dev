export interface Image {
  id?: number;
  url: string;
  alt?: string;
}

export interface Feature {
  title: string;
  title_fr?: string;
  title_es?: string;
  title_zh?: string;
  title_ru?: string;
  description?: string;
  description_fr?: string;
  description_es?: string;
  description_zh?: string;
  description_ru?: string;
  image?: {
    url: string;
    alt?: string;
  };
}

export interface FeatureImage {
  id: number;
  feature_index: number;
  url: string;
  alt?: string;
}

export interface Doctor {
  id?: number;
  name: string;
  role: string;
  role_fr?: string;
  role_es?: string;
  role_zh?: string;
  role_ru?: string;
  bio: string;
  bio_fr?: string;
  bio_es?: string;
  bio_zh?: string;
  bio_ru?: string;
  image?: Image[];
  services_offered?: ClinicalService[];
  research_publications?: string[];
  awards?: string[];
  locations?: string[];
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
  tagline_fr?: string;
  tagline_es?: string;
  tagline_zh?: string;
  tagline_ru?: string;
  overview: string;
  overview_fr?: string;
  overview_es?: string;
  overview_zh?: string;
  overview_ru?: string;
  detailedDescription?: string;
  detailedDescription_fr?: string;
  detailedDescription_es?: string;
  detailedDescription_zh?: string;
  detailedDescription_ru?: string;
  features: Feature[];
  features_read?: (Feature & {
    image?: { id: number; url: string; alt?: string } | null;
  })[];
  feature_images?: FeatureImage[];
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
  clinicId: string;
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
  description_fr?: string;
  description_es?: string;
  description_zh?: string;
  description_ru?: string;
  contact: ContactInfo;
  location: string;
  timings: Timings[];
  image: Image[];
}

export interface clinicalFaq {
  id?: number;
  brief?: string;
  startTime: string;
  stopTime: string;
  question: string;
  answer: string;
  question_fr?: string;
  question_es?: string;
  question_zh?: string;
  question_ru?: string;

  answer_fr?: string;
  answer_es?: string;
  answer_zh?: string;
  answer_ru?: string;
}
