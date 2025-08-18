import { Doctor } from "./index";
import { ContactInfo } from "./contact";
import { Testimonial } from "./testimonial";

export interface ClinicalService {
  id: number;
  title: string;
  tagline: string;
  overview: string;
  features: string[];
  doctor: Doctor[];
  testimonial: Testimonial;
  contact: ContactInfo;
  relatedServices: {
    id: number;
    title: string;
    thumbnail: { url: string };
  }[];
  image: {
    url: string;
    alt?: string;
  };
 imageAlt?: string;
  doctors: Doctor[];
}