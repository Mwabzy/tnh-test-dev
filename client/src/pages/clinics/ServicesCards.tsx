import { ClinicalService } from "@/types";
import clinicalServices from "@/data/clinicalServices.json";
import ServiceList from "@/components/services/ServiceList";

import { useParams } from "react-router";

const ServiceCards = () => {
  const { id } = useParams<{ id: string }>();

  const services = (clinicalServices as ClinicalService[]).filter(
    (item) => item.id === Number(id)
  );

  return (
    <>
      <ServiceList services={services as ClinicalService[]} />
    </>
  );
};

export default ServiceCards;
