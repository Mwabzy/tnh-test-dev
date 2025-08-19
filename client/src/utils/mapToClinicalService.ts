// src/utils/mapToClinicalService.ts
import { ClinicalService } from "@/types";
import rawClinicalServices from "@/data/clinicalServices.json";


export const mapToClinicalService = (json: any): ClinicalService => ({
  id: Number(json.id),
  title: json.name,
  tagline: json.description,
  overview: json["long-description"] ?? "",
  features: Object.values(json.accordionItems || {}).map(
    (item: any) => item.title
  ),
  image: {
    url: Array.isArray(json.image.src) ? json.image.src[0] : json.image.src,
    alt: json.image.alt ?? "",
  },
  doctors: [], // stub until Strapi integration
  testimonial: {
    name: "",
    title: "",
    image: "",
    quote: "",
  },
  contact: {
    phone: "",
    emails: [],
  },
  relatedServices: [],
});

export const clinicalServices: ClinicalService[] = rawClinicalServices.map(
  mapToClinicalService
);
