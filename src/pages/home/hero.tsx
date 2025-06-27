import care1 from "@/assets/images/image2.jpg";
import care2 from "@/assets/images/image1.png";
import care3 from "@/assets/images/image3.png";
import care4 from "@/assets/images/image4.jpg";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useIntlayer } from "react-intlayer";
import { useState } from "react";
import { useEffect } from "react";



const Hero = () => {
  const content = useIntlayer("heroContent");

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};
const allImages = [care1, care2, care3, care4];
const [currentImages, setCurrentImages] = useState([
  care1,
  care2,
  care3,
  care4,
]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const shuffled = [...allImages].sort(() => 0.5 - Math.random());

      setCurrentImages(shuffled.slice(0, 4));
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="bg-red-900 mt-8 text-white p-5  md:p-16 rounded-2xl mx-[1%] md:mx-[2%] w-auto">
      <div className="grid xl:grid-cols-2 gap-6">
        {/* Text Content */}
        <div className="flex flex-col justify-center space-y-4">
          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-3xl md:text-6xl  font-bold leading-tight font-serif">
              {content.title}
            </h1>
            <p className="text-lg md:text-xl pb-4 font-sans">
              {content.description}
            </p>
          </motion.div>
          <div className="flex space-x-4">
            <button className="bg-white text-black px-5 py-2 rounded-lg font-semibold">
              <Link to="/clinics">{content.services_button}</Link>
            </button>
            <Link to="/about" className="flex items-center space-x-2">
              <span>{content.about_button}</span>
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>

        {/* Image Grid - UNCHANGED LAYOUT, but with dynamic image sources */}
        <div className="grid grid-cols-2 grid-rows-3 gap-2 max-h-[65vh]">
          <img
            src={currentImages[0]}
            className="rounded-lg w-full h-full object-cover col-span-1 row-span-1"
            alt="Image 1"
          />
          <img
            src={currentImages[1]}
            className="rounded-lg w-full h-full object-cover col-span-1 row-span-2"
            alt="Image 2"
          />
          <img
            src={currentImages[2]}
            className="rounded-lg w-full h-full object-cover col-span-1 row-span-2"
            alt="Image 3"
          />
          <img
            src={currentImages[3]}
            className="rounded-lg w-full h-full object-cover col-span-1 row-span-1"
            alt="Image 4"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
