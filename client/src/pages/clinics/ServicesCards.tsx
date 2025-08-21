//import { useEffect, useState } from "react";
import { ClinicalService } from "@/types";
import clinicalServices from "@/data/clinicalServices.json";
import ServiceList from "@/components/services/ServiceList";

const ServiceCards = () => {
  const services = clinicalServices as ClinicalService[];
  // const [services, setServices] = useState<ClinicalService[]>([]);
  // const [loading, setLoading] = useState(true);

  //  useEffect(() => {
  //   const fetchServices = async () => {
  //     try {
  //       const res = await fetch("http://localhost:1337/api/clinical-services"); 
  //       const data = await res.json();

  //       // Strapi usually returns data in { data: [...] } format
  //       const formatted = data.data.map((item: any) => ({
  //         id: item.id,
  //         ...item.attributes,
  //       }));
  //         console.log("Fetched services:", formatted);
  //       setServices(formatted);
  //     } catch (error) {
  //       console.error("Error fetching services:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchServices();
  // }, []);


  // if (loading) return <p>Loading services...</p>;

  

  return (
    <>
      <ServiceList services={services as ClinicalService[]} />
    </>
  );
};

export default ServiceCards;
