import { Doctor } from "./doctors";
import { ContactInfo } from "./contact";
import { Testimonial } from "./testimonial";

export interface ClinicalService {
  id: number;
  title: string;
  tagline: string;
  overview: string;
  //longDescription: string;
  features: string[];
  doctors: Doctor[];
  testimonial?: Testimonial[];
  contact: ContactInfo;
  //bookingAllowed?: boolean;
  clinics?: ClinicalService[]; // Sub clinincs like Anderson specialty clinics
  relatedServices?: {
    id: number;
    title: string;
    image: string;
    imageAlt?: string;
    description?: string;
    link?: string;
  }[];

  image: {
    url: string;
    alt?: string;
  };
}
