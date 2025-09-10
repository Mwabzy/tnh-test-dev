import clinicalServices from "@/data/clinicalServices.json";
import ServiceList from "@/components/services/ServiceList";

const ServiceCards = () => {
  return (
    <>
      <ServiceList services={clinicalServices} />
    </>
  );
};

export default ServiceCards;
