import {
  BriefcaseMedical,
  MarsStroke,
  PillBottle,
  SquareActivity,
} from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import ServiceCard from "@/components/ServiceCard";
import { useIntlayer } from "react-intlayer"


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
            <h1 className="text-4xl md:text-5xl text-center md:text-left font-serif font-bold text-red-900">
              {content.title}
            </h1>
            <p className="text-black mt-2">
              The Nairobi Hospital offers a wide range of clinical services to
              meet the healthcare needs of our patients.
            </p>
          </motion.div>
        </div>
        <button className="bg-red-900 text-white  hidden md:block px-4 py-2 rounded-md font-semibold">
          <Link to={`/clinical-services`}>All Services</Link>
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
          title="Dentistry Services"
          description="The Nairobi Hospital’s Dental Clinic provides expert care, including cleanings, restorations, and orthodontics, ensuring optimal oral health with advanced technology."
          icon={
            <BriefcaseMedical className="mt-2 mr-4 text-red-900 h-8 w-8 md:h-10 md:w-10" />
          }
          active={true}
        />

        <ServiceCard
          link={`/service-detail/pharmacy-services`}
          title="Pharmacy Services"
          description="The Nairobi Hospital Pharmacy offers quality, safe, and efficient inpatient, outpatient, and clinical services, dispensing vetted medicines at optimal prices."
          icon={
            <PillBottle className="mt-2 mr-4 text-red-900 h-8 w-8 md:h-10 md:w-10" />
          }
          active={false}
        />

        <ServiceCard
          link={`/service-detail/gynaecology-services`}
          title="Gynaecology Services"
          description="The Nairobi Hospital’s Gynaecology Clinic offers specialized care for women’s reproductive health, including screenings, treatments, and family planning with compassion."
          icon={
            <MarsStroke className="mt-2 mr-4 text-red-900 h-8 w-8 md:h-10 md:w-10" />
          }
          active={false}
        />

        <ServiceCard
          link={`/service-detail/antenatal-services`}
          title="Antenatal Clinic Services"
          description="The Nairobi Hospital’s Antenatal Clinic provides comprehensive care for expectant mothers, including screenings, counseling, and support throughout pregnancy."
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
