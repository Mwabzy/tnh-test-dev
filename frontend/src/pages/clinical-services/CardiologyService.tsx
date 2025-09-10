import ServiceTemplate, {
  ServiceTemplateProps,
} from "@/components/services/ServiceTemplate";

const CardiologyService: React.FC = () => {
  const serviceData: ServiceTemplateProps = {
    title: "Cardiology",
    tagline: "Comprehensive heart care for all ages",
    image:
      "https://images.unsplash.com/photo-1659353887019-b142198f2668?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Cardiologist performing an EKG",
    overview:
      "Our cardiology department offers advanced diagnostics and personalized treatment plans to support your heart health. From preventive screenings to emergency interventions, our team is here for you.",
    features: [
      "State-of-the-art cardiac imaging.",
      "24/7 heart attack response team.",
      "Personalized rehabilitation programs.",
    ],
    doctors: [
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
    ],

    testimonial: {
      name: "Sarah Johnson",
      title: "Patient",
      image:
        "https://images.unsplash.com/photo-1601922029620-4f8b1c3d2a5e?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      quote:
        "The cardiology team at The Nairobi Hospital saved my life. Their care and expertise are unmatched.",
    },
    contact: {
      phone: "+254 555 123 4567",
      emails: [{ type: "general", address: "cardiology@nbihosp.org" }],
    },
    relatedServices: [
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
    ],
  };

  return <ServiceTemplate {...serviceData} />;
};

export default CardiologyService;
