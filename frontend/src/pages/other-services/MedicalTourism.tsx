import ServiceTemplate from "@/components/services/ServiceTemplate";
import { useIntlayer } from "react-intlayer";
import { ClinicalService } from "@/types";

const MedicalTourism: React.FC = () => {
  const content = useIntlayer("medical_tourism");
  const serviceData: ClinicalService = {
    id: 1, // Temporary static ID
    title: Array.isArray(content.medicaltitle)
      ? content.medicaltitle[0]?.value ?? ""
      : content.medicaltitle,
    tagline: Array.isArray(content.medicaltag)
      ? content.medicaltag[0]?.value ?? ""
      : content.medicaltag,
    overview: Array.isArray(content.medicalview)
      ? content.medicalview[0]?.value ?? ""
      : content.medicalview,
    features: [
      Array.isArray(content.medicalfeature1)
        ? content.medicalfeature1[0]?.value ?? ""
        : content.medicalfeature1,
      Array.isArray(content.medicalfeature2)
        ? content.medicalfeature2[0]?.value ?? ""
        : content.medicalfeature2,
      Array.isArray(content.medicalfeature3)
        ? content.medicalfeature3[0]?.value ?? ""
        : content.medicalfeature3,
      Array.isArray(content.medicalfeature4)
        ? content.medicalfeature4[0]?.value ?? ""
        : content.medicalfeature4,
    ],
    doctors: [
      {
        name: "Dr. Sarah Kimani, Medical Tourism Coordinator",
        title: Array.isArray(content.careertitle1)
          ? content.careertitle1[0]?.value ?? ""
          : content.careertitle1,
        image:
          "https://i1.rgstatic.net/ii/profile.image/672136616243211-1537261265662_Q512/Sarah-Kimani.jpg",
        bio: "Assists international patients with treatment plans and travel logistics.",
      },
      {
        name: "Dr. James Otieno, Chief Surgeon",
        title: "Interventional Cardiologist",
        image:
          "https://img.freepik.com/premium-photo/portrait-young-man-standing-against-white-background_1048944-20365307.jpg",
        bio: "Leads surgical team with 15 years of experience.",
      },
    ],
    testimonial: [
      {
        name: "Ahmed, 45, UAE",
        title: Array.isArray(content.testimoni)
          ? content.testimoni[0]?.value ?? ""
          : content.testimoni,
        image:
          "https://img.freepik.com/free-photo/muslim-man-wearing-ghutra-robe_482257-89105.jpg",
        quote:
          "The team made my surgery and recovery stress-free. I felt at home!",
      },
    ],
    contact: {
      phone: "+254 555 987 6543",
      emails: [{ type: "general", address: "medtourism@nbihosp.org" }],
    },
    isbookable: true, // You can set this based on logic or content
    relatedServices: [
      {
        id: 2,
        title: Array.isArray(content.careertitle2)
          ? content.careertitle2[0]?.value ?? ""
          : content.careertitle2,
        description: "Expert care for brain and nervous system conditions.",
        image:
          "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0",
        link: "/services/neurology",
      },
      {
        id: 3,
        title: "Rehabilitation Programs",
        description: "Personalized recovery plans for optimal health.",
        image:
          "https://images.unsplash.com/photo-1504813184591-01572f98c85f?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.1.0",
        link: "/services/rehabilitation",
      },
    ],
    image: {
      url: "https://img.freepik.com/free-photo/stethoscope-globe-blue-background_23-2147817245.jpg",
      alt: "Cardiologist performing an EKG",
    },
  };

  return <ServiceTemplate serviceTypes={serviceData} />;
};

export default MedicalTourism;
