import { useParams } from "react-router";
import clinicalServices from "@/data/clinicalServices.json";

import ServiceList from "@/components/services/ServiceList";
import Heading from "@/components/Heading";
import ServiceTemplate from "@/components/services/ServiceTemplate";

type Contact = {
  phone: string;
  location: string;
};

type Clinic = {
  id: string;
  name: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
};

type Service = {
  id: string;
  name: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  clinics?: Clinic[];
  contact?: Contact;
};

const ServiceDetails = () => {
  const { id } = useParams();
  const service = clinicalServices.find(
    (item) => item.id === String(id)
  ) as Service;

  if (!service)
    return (
      <div className="text-center mt-10 text-red-600">Service not found.</div>
    );

  if (service.clinics && service.clinics.length > 0) {
    return (
      <>
        <Heading
          image_url={service.image.src}
          title={service.name}
          description={service.description}
          style="image"
        />
        <ServiceList
          services={service.clinics.map((clinic) => ({
            id: clinic.id,
            name: clinic.name,
            description: clinic.description,
            image: clinic.image,
          }))}
        />
      </>
    );
  }

  return (
    <>
      <ServiceTemplate
        title={service.name}
        tagline={service.description}
        image={service.image?.src}
        imageAlt={service.image?.alt}
        overview={service.description}
        features={[
          "State-of-the-art cardiac imaging.",
          "24/7 heart attack response team.",
          "Personalized rehabilitation programs.",
        ]}
        contact={{
          phone:
            service.contact?.phone?.trim() || ("+254 703 082 000" as string),
          emails: [{ type: "general", address: "hosp@nbihosp.org" }],
        }}
        testimonial={{
          name: "Sarah Johnson",
          title: "Patient",
          image:
            "https://images.unsplash.com/photo-1601922029620-4f8b1c3d2a5e?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          quote:
            "The cardiology team at The Nairobi Hospital saved my life. Their care and expertise are unmatched.",
        }}
        doctors={[
          {
            name: "Dr. Jane Doe",
            title: "Board-Certified Cardiologist",
            image:
              "https://images.unsplash.com/photo-1643297654416-05795d62e39c?q=80&w=3253&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            bio: "With 20 years of experience, Dr. Doe specializes in heart disease prevention and treatment.",
          },
          {
            name: "Dr. John Smith",
            title: "Interventional Cardiologist",
            image: "/assets/doctors/john-smith.jpg",
            bio: "Dr. Smith is an expert in minimally invasive cardiac procedures.",
          },
        ]}
        relatedServices={[
          {
            title: "Neurology Services",
            description: "Expert care for brain and nervous system conditions.",
            image:
              "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            link: "/services/neurology",
          },
          {
            title: "Rehabilitation Programs",
            description: "Personalized recovery plans for optimal health.",
            image:
              "https://images.unsplash.com/photo-1504813184591-01572f98c85f?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            link: "/services/rehabilitation",
          },
        ]}
      />
    </>
  );
};

export default ServiceDetails;
