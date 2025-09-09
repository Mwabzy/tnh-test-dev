import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ClinicalService } from "@/types";
import ServiceTemplate from "@/components/services/ServiceTemplate";
import ServiceList from "@/components/services/ServiceList";
import Heading from "@/components/Heading";
//import clinicalServices from "@/data/clinicalServices.json";

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<ClinicalService | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(
          `http://localhost:5003/clinical-services/${id}`
        );
        const data = await res.json();

        console.log("Fetched service:", data);
        setService(data);
      } catch (error) {
        console.error("Error fetching service:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchService();
  }, [id]);

  if (loading) return <p>Loading service...</p>;

  if (!service) {
    return (
      <div className="text-center mt-10 text-red-600">Service not found.</div>
    );
  }

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

  return <ServiceTemplate serviceTypes={service} />;
};

export default ServiceDetail;
