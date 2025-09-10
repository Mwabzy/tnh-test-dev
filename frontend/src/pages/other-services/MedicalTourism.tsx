import ServiceTemplate, {
  ServiceTemplateProps,
} from "@/components/services/ServiceTemplate";

const MedicalTourism: React.FC = () => {
  const serviceData: ServiceTemplateProps = {
    title: "Medical Tourism",
    tagline: "World-class healthcare with seamless travel support ",
    image:
      "https://img.freepik.com/free-photo/stethoscope-globe-blue-background_23-2147817245.jpg?ga=GA1.1.1005706692.1749537837&semt=ais_items_boosted&w=740",
    imageAlt: "Cardiologist performing an EKG",
    overview:
      "At NBI Hospital, we combine cutting-edge medical expertise with personalized care for patients worldwide. Our dedicated medical tourism team ensures a hassle-free experience, from treatment planning to travel coordination. ",
    features: [
      "Internationally accredited facilities with state-of-the-art technology. ",
      "Multilingual staff and personalized patient coordinators. ",
      "Affordable, transparent pricing with no hidden costs. ",
      "Seamless visa, travel, and accommodation support.",
    ],
    title2: "Services Offered (Highlighted services):",
    features2: [
      "Cardiology and Heart Surgery  ",
      "Orthopedic Surgery ",
      "Oncology and Cancer Treatment",
    ],
    title3: "Treatment Process(Journey): ",
    features3: [
      "Submit inquiry via contact form. ",
      "Receive personalized treatment plan and cost estimate. ",
      "Coordinate travel with our team. ",
    ],

    doctors: [
      {
        name: "Dr. Sarah Kimani, Medical Tourism Coordinator ",
        title: "Board-Certified Cardiologist",
        image:
          "https://i1.rgstatic.net/ii/profile.image/672136616243211-1537261265662_Q512/Sarah-Kimani.jpg",
        bio: "Assists international patients with treatment plans and travel logistics.",
      },
      {
        name: "Dr. James Otieno, Chief Surgeon ",
        title: "Interventional Cardiologist",
        image:
          "https://img.freepik.com/premium-photo/portrait-young-man-standing-against-white-background_1048944-20365307.jpg?ga=GA1.1.1005706692.1749537837&semt=ais_items_boosted&w=740",
        bio: "Leads surgical team with 15 years of experience.",
      },
    ],

    testimonial: {
      name: "Ahmed, 45, UAE",
      title: "Patient",
      image:
        "https://img.freepik.com/free-photo/muslim-man-wearing-ghutra-robe_482257-89105.jpg?ga=GA1.1.1005706692.1749537837&semt=ais_items_boosted&w=740",
      quote:
        "The team made my surgery and recovery stress-free. I felt at home!",
    },
    contact: {
      phone: " +254 555 987 6543 ",
      emails: [{ type: "general", address: "medtourism@nbihosp.org " }],
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

export default MedicalTourism;
