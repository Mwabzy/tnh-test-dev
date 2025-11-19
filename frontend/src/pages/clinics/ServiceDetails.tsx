import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ClinicalService } from "@/types";
import ServiceTemplate from "@/components/services/ServiceTemplate";
import ServiceList from "@/pages/clinics/ServiceList";
import Heading from "@/components/Heading";
import { fetchClinicalServiceById } from "@/api/api";

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<ClinicalService | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      if (!id) return;

      try {
        const data = await fetchClinicalServiceById(Number(id)); // ✅ use API helper
        console.log("Fetched service from API:", data);
        setService(data);
      } catch (error) {
        console.error("Error fetching service:", error);
        setService(null);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
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
          image_url={service.images?.[2]?.url}
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
