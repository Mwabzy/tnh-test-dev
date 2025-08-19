import { Doctor } from "./doctors";
import { ContactInfo } from "./contact";
import { Testimonial } from "./testimonial";

export interface ClinicalService {
  id: number;
  title: string;
  tagline: string;
  overview: string;
  features: string[];
  doctors: Doctor[];
  testimonial: Testimonial;
  contact: ContactInfo;
  relatedServices: {
    id: number;
    name: string;
    image: string;
    imageAlt?: string;  
    description?: string;
    link?: string;
  }[];

  image: {
    url: string;
    alt?: string;
  };
 imageAlt?: string;

}