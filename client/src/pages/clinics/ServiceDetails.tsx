import { useParams } from "react-router";
import { ClinicalService } from "@/types";
import ServiceTemplate from "@/components/services/ServiceTemplate";
import ServiceList from "@/components/services/ServiceList";
import Heading from "@/components/Heading";
import clinicalServices from "@/data/clinicalServices.json"; // Directly import the raw data

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();

  const service = (clinicalServices as ClinicalService[]).find(
    (item) => item.id === Number(id)
  );

  if (!service) {
    return (
      <div className="text-center mt-10 text-red-600">Service not found.</div>
    );
  }

  // If the service has nested clinics
  if (service.clinics && service.clinics.length > 0) {
    return (
      <>
        <Heading
          image_url={service.image.url}
          title={service.title}
          description={service.tagline}
          style="image"
        />
        <ServiceList services={service.clinics} />
      </>
    );
  }

  // Otherwise render full template
  return <ServiceTemplate serviceTypes={service as ClinicalService} />;
};

export default ServiceDetail;
