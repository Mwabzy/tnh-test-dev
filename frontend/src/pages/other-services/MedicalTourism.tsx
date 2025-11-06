import ServiceTemplate from "@/components/services/ServiceTemplate";
import { useIntlayer } from "react-intlayer";
import { ClinicalService } from "@/types";

const MedicalTourism: React.FC = () => {
  const content = useIntlayer("medical_tourism");

  const serviceData: ClinicalService = {
    id: 1,
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
      {
        title: Array.isArray(content.medicalfeature1)
          ? content.medicalfeature1[0]?.value ?? ""
          : content.medicalfeature1,
      },
      {
        title: Array.isArray(content.medicalfeature2)
          ? content.medicalfeature2[0]?.value ?? ""
          : content.medicalfeature2,
      },
      {
        title: Array.isArray(content.medicalfeature3)
          ? content.medicalfeature3[0]?.value ?? ""
          : content.medicalfeature3,
      },
      {
        title: Array.isArray(content.medicalfeature4)
          ? content.medicalfeature4[0]?.value ?? ""
          : content.medicalfeature4,
      },
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

    testimonials: [
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
      email: "medtourism@nbihosp.org",
    },

    isBookable: false,
    hasReadMore: true,

    images: [
      {
        url: "https://img.freepik.com/free-photo/stethoscope-globe-blue-background_23-2147817245.jpg",
        alt: "Cardiologist performing an EKG",
      },
    ],
    locations: ["Nairobi, Kenya"],

    detailedDescription:
      "We assist international patients with travel, treatment coordination, and world-class healthcare services.",
  };

  return <ServiceTemplate serviceTypes={serviceData} />;
};

export default MedicalTourism;
