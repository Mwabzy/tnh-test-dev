import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ClinicalService } from "@/types";
import ServiceTemplate from "@/components/services/ServiceTemplate";
import ServiceList from "@/pages/clinics/ServiceList";
import Heading from "@/components/Heading";
import { fetchClinicalServiceById, fetchClinicalServiceByPath } from "@/api/api";
import { ServiceDetailSkeleton } from "@/components/layout/page-skeletons";

const ServiceDetail = () => {
  const params = useParams<{ "*": string }>();
  const rawPath = params["*"];
  let path = rawPath;

  if (rawPath) {
    try {
      path = decodeURIComponent(rawPath);
    } catch {
      path = rawPath;
    }
  }

  const [service, setService] = useState<ClinicalService | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      if (!path) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const isNumericPath = /^\d+$/.test(path);

      try {
        const data = isNumericPath
          ? await fetchClinicalServiceById(Number(path))
          : await fetchClinicalServiceByPath(path);
        setService(data);
      } catch (primaryError) {
        if (isNumericPath) {
          try {
            const data = await fetchClinicalServiceByPath(path);
            setService(data);
            return;
          } catch (fallbackError) {
            console.error("Error fetching service by id and path:", {
              primaryError,
              fallbackError,
            });
          }
        } else {
          console.error("Error fetching service by path:", primaryError);
        }

        setService(null);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [path]);

  if (loading) return <ServiceDetailSkeleton />;

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
