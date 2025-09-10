import {
  BriefcaseMedical,
  MarsStroke,
  PillBottle,
  SquareActivity,
} from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import ServiceCard from "@/components/ServiceCard";
import { useIntlayer } from "react-intlayer";

// Define the slideUp animation variants
const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const ServicesSection = () => {
  const content = useIntlayer("servicesSection");
  return (
    <div className="px-4 py-10 max-w-7xl flex flex-col mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="">
          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            <h1 className="text-3xl md:text-5xl text-center md:text-left font-serif font-bold text-red-900">
              {content.title}
            </h1>
            <p className="text-black mt-2">
              {content.description ||
                "Explore our comprehensive range of clinical services designed to meet your healthcare needs with excellence and compassion."}
            </p>
          </motion.div>
        </div>
        <button className="bg-red-900 text-white  hidden md:block px-4 py-2 rounded-md font-semibold">
          <Link to={`/clinical-services`}>{content.allservices}</Link>
        </button>
      </div>

      <motion.div
        variants={slideUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col gap-1 md:gap-2"
      >
        <ServiceCard
          link={`/service-detail/dentistry-services`}
          title={
            Array.isArray(content.dentalservices)
            ? content.dentalservices.map((node: { value: string }) => node.value).join('')
            : "Dental Services"
          }
          description={
            Array.isArray(content.dentaldescription)
              ? content.dentaldescription.map((node: { value: string })=> node.value).join('')
              : "The Nairobi Hospital Dental Clinic provides comprehensive dental care, including preventive, restorative, and cosmetic services, ensuring optimal oral health for all patients."
          }
          icon={
            <BriefcaseMedical className="mt-2 mr-4 text-red-900 h-8 w-8 md:h-10 md:w-10" />
          }
          active={true}
        />
<ServiceCard
  link={`/service-detail/pharmacy-services`}
   title={
    Array.isArray(content.pharmacyservices)
      ? content.pharmacyservices.map((node: { value: string }) => node.value).join('')
      : "Pharmacy Services"
  }
  description={
    Array.isArray(content.pharmacydescription)
      ? content.pharmacydescription.map((node: { value: string }) => node.value).join('') 
      : "The Nairobi Hospital Pharmacy provides a wide range of medications and health products, ensuring safe and effective treatment options for all patients."
  }
  icon={
    <PillBottle className="mt-2 mr-4 text-red-900 h-8 w-8 md:h-10 md:w-10" />
  }
  active={false}
/>
      
        <ServiceCard
          link={`/service-detail/gynaecology-services`}
          title={
            Array.isArray(content.gynaecologyservices)
              ? content.gynaecologyservices.map((node: { value: string }) => node.value).join('')
              : "Gynaecology Services"
          }
          description={
            Array.isArray(content.gynaecologydescription)
              ? content.gynaecologydescription.map((node: { value: string }) => node.value).join('')
              : "The Nairobi Hospital Gynaecology Clinic offers specialized care for women’s reproductive health, including screenings, treatments, and support for various conditions."
          }
          icon={
            <MarsStroke className="mt-2 mr-4 text-red-900 h-8 w-8 md:h-10 md:w-10" />
          }
          active={false}
        />

        <ServiceCard
          link={`/service-detail/antenatal-services`}
          title={
            Array.isArray(content.antenatalservices)
              ? content.antenatalservices.map((node: { value: string }) => node.value).join('')
              : "Antenatal Services"
          }
          description={
            Array.isArray(content.antenataldescription)
              ? content.antenataldescription.map((node: { value: string }) => node.value).join('')
              : "The Nairobi Hospital provides comprehensive antenatal care, ensuring the health and well-being of both mother and baby throughout pregnancy."
          }
          icon={
            <SquareActivity className="mt-2 mr-4 text-red-900 h-8 w-8 md:h-10 md:w-10" />
          }
          active={false}
        />
      </motion.div>
    </div>
  );
};

export default ServicesSection;
