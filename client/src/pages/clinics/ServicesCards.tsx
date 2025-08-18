import { ClinicalService } from "@/types"; 
import clinicalServices from "@/data/clinicalServices.json";
import ServiceList from "@/components/services/ServiceList";

const mapToClinicalService = (json: any): ClinicalService => ({
  id: Number(json.id),
  title: json.name,
  tagline: json.description,
  overview: json["long-description"] ?? "",
  features: Object.values(json.accordionItems || {}).map((item: any) => item.title),
  image: { 
    url: Array.isArray(json.image.src) ? json.image.src[0] : json.image.src,
    alt: json.image.alt ?? "" 
  },
  doctors: [], // ✅ stub until Strapi data comes
  testimonial: {
    name: "",
    title: "",
    image: "",
    quote: ""
  },
  contact: {
    phone: "",
    emails: [],
  },
  relatedServices: []
});


const ServiceCards = () => {
  // ✅ transform JSON into ClinicalService[]
  const services: ClinicalService[] = (clinicalServices as any[]).map(
    mapToClinicalService
  );

  return (
    <>
      <ServiceList services={services} />
    </>
  );
};

export default ServiceCards;
