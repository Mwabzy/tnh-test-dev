import { motion } from "framer-motion";
import { useIntlayer } from "react-intlayer";

// Import insurance company logos
import britam from "@/assets/images/britam.png";
import jubilee from "@/assets/images/jubilee.png";
import madison from "@/assets/images/madison.png";
import aar from "@/assets/images/aarinsurance.png";
import oldmutual from "@/assets/images/oldmutual.png";
import cicgroup from "@/assets/images/cicgroup.png";
import uap from "@/assets/images/UAP-LOGO.png";
import cigna from "@/assets/images/cigna.png";
import coop from "@/assets/images/coopinsurance.png";
import minet from "@/assets/images/minet.png";

const images = [
  { src: britam, alt: "Britam Insurance" },
  { src: jubilee, alt: "Jubilee Insurance" },
  { src: madison, alt: "Madison Insurance" },
  { src: oldmutual, alt: "Old Mutual Insurance"},
  { src: cicgroup, alt: "CIC Group Insurance"},
  { src: aar, alt: "AAR Insurance"},
  { src: uap, alt: "UAP Insurance"},
  { src: cigna, alt: "Cigna Insurance"},
  { src: coop, alt: "Cooperative Insurance"},
  { src: minet, alt: "Minet Insurance"},
];

const InsuranceSlider = () => {
  const content = useIntlayer("insurance_slider");

  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 mx-5 bg-white">
      <h2 className="text-xl sm:text-3xl font-bold text-center mb-6 text-red-900">
        {content.insurance}
      </h2>

      <div className="relative w-screen overflow-hidden">
        {/* Infinite Scrolling Track */}
        <motion.div
          className="flex gap-12"
          animate={{
            x: ["0%", "-100%"],
          }}
          transition={{
            ease: "linear",
            duration: 25, // Adjust speed
            repeat: Infinity,
          }}
        >
          {[...images, ...images].map((image, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-40 sm:w-48 lg:w-56 border p-4 flex justify-center items-center bg-white"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-16 object-contain transition duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default InsuranceSlider;
