import { useEffect, useState } from "react";
import { ClinicalService } from "@/types";
import ServiceList from "@/components/services/ServiceList";

const ServiceCards = () => {
  const [services, setServices] = useState<ClinicalService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:5003/clinical-services");
        const data = await res.json();

        console.log("Fetched services:", data);
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <p>Loading services...</p>;

  return <ServiceList services={services} />;
};

export default ServiceCards;
