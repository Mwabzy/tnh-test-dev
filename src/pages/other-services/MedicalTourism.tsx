import ServiceTemplate, {
  ServiceTemplateProps,
} from "@/components/services/ServiceTemplate";
import { useIntlayer } from "react-intlayer";

const MedicalTourism: React.FC = () => {
  const content = useIntlayer("medical_tourism");
  const serviceData: ServiceTemplateProps = {
    title: Array.isArray(content.medicaltitle) ? content.medicaltitle[0]?.value ?? "" : content.medicaltitle,
    tagline: Array.isArray(content.medicaltag) ? content.medicaltag[0]?.value ?? "" : content.medicaltag,
    image:
      "https://img.freepik.com/free-photo/stethoscope-globe-blue-background_23-2147817245.jpg?ga=GA1.1.1005706692.1749537837&semt=ais_items_boosted&w=740",
    imageAlt: "Cardiologist performing an EKG",
    overview:
Array.isArray(content.medicalview) ? content.medicalview[0]?.value ?? "" : content.medicalview,    
features: [
    Array.isArray(content.medicalfeature1) ? content.medicalfeature1[0]?.value ?? "" : content.medicalfeature1,
    Array.isArray(content.medicalfeature2) ? content.medicalfeature2[0]?.value ?? "" : content.medicalfeature2,
    Array.isArray(content.medicalfeature3) ? content.medicalfeature3[0]?.value ?? "" : content.medicalfeature3,
    Array.isArray(content.medicalfeature4) ? content.medicalfeature4[0]?.value ?? "" : content.medicalfeature4,
    ],
    title2: Array.isArray(content.servoffer) ? content.servoffer[0]?.value ?? "" : content.servoffer,
    features2: [
    Array.isArray(content.medicalfeature5) ? content.medicalfeature5[0]?.value ?? "" : content.medicalfeature5,
    Array.isArray(content.medicalfeature6) ? content.medicalfeature6[0]?.value ?? "" : content.medicalfeature6,
    Array.isArray(content.medicalfeature7) ? content.medicalfeature7[0]?.value ?? "" : content.medicalfeature7,
    Array.isArray(content.medicalfeature8) ? content.medicalfeature8[0]?.value ?? "" : content.medicalfeature8,
    ],
    title3: Array.isArray(content.treatprocess) ? content.treatprocess[0]?.value ?? "" : content.treatprocess,
    features3: [
     Array.isArray(content.medicalfeature9) ? content.medicalfeature9[0]?.value ?? "" : content.medicalfeature9,
    Array.isArray(content.medicalfeature10) ? content.medicalfeature10[0]?.value ?? "" : content.medicalfeature10,
    Array.isArray(content.medicalfeature11) ? content.medicalfeature11[0]?.value ?? "" : content.medicalfeature11,
    ],

    doctors: [
      {
        name: "Dr. Sarah Kimani, Medical Tourism Coordinator ",
        title:  Array.isArray(content.careertitle1) ? content.careertitle1[0]?.value ?? "" : content.careertitle1,
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
      title: Array.isArray(content.testimoni) ? content.testimoni[0]?.value ?? "" : content.testimoni,
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
        title:  Array.isArray(content.careertitle2) ? content.careertitle2[0]?.value ?? "" : content.careertitle2,
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
