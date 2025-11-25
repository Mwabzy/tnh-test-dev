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
  { src: minet, alt: "minet" },
  { src: oldmutual, alt: "oldmutual" },
  { src: cicgroup, alt: "cicgroup" },
  { src: aar, alt: "aarinsurance" },
];

const InsuranceSlider = () => {
  const content = useIntlayer("insurance_slider");

  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 mx-5 bg-white max-w-screen">
      <h2 className="text-xl sm:text-3xl font-bold text-center mb-6 text-red-900">
        {content.insurance}
      </h2>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-6" // reduced spacing
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
        >
          {[...images, ...images].map((image, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-28 sm:w-32 lg:w-36 flex justify-center items-center"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-14 sm:h-16 object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default InsuranceSlider;
