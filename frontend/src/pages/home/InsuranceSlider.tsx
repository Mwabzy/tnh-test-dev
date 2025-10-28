import { motion } from "framer-motion";
import amref from "@/assets/images/Amref.png";
import Uap from "@/assets/images/UAP-LOGO.png";
import cigma from "@/assets/images/cigna.png";
import madison from "@/assets/images/madison.png";
import jubilee from "@/assets/images/jubilee.png";
import minet from "@/assets/images/minet.png";
import oldmutual from "@/assets/images/oldmutual.png";
import cicgroup from "@/assets/images/cicgroup.png";
import aar from "@/assets/images/aarinsurance.png";

import { useIntlayer } from "react-intlayer";

const images = [
  { src: amref, alt: "Amref" },
  { src: Uap, alt: "UAP" },
  { src: cigma, alt: "Cigna" },
  { src: madison, alt: "Madison" },
  { src: jubilee, alt: "Jubilee" },
  { src: minet, alt: "minet"},
  { src: oldmutual, alt: "oldmutual"},
  { src: cicgroup, alt: "cicgroup"},
  { src: aar, alt: "aarinsurance"},
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
              className="flex-shrink-0 w-40 sm:w-48 lg:w-56 border  p-4  flex justify-center items-center bg-white"
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
