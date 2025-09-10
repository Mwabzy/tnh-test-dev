import care1 from "@/assets/images/image2.jpg";
import care2 from "@/assets/images/image1.png";
import care3 from "@/assets/images/image3.png";
import care4 from "@/assets/images/image4.jpg";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useIntlayer } from "react-intlayer";
import { useState, useEffect } from "react";

const imageMap: Record<string, string> = {
  care1: (care1 as any).src || care1,
  care2: (care2 as any).src || care2,
  care3: (care3 as any).src || care3,
  care4: (care4 as any).src || care4,
};

const Hero = () => {
  const rawContent: any = useIntlayer("heroContent");
  const heroData = rawContent?.content ?? rawContent;

  const slides = heroData?.slides || [];
  const [index, setIndex] = useState(0);

  // auto-rotation
  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) return null;

  const currentSlide = slides[index];
  const imageKey = currentSlide?.imageKey;
  const currentImage = imageMap[imageKey] || imageMap["care1"];

  return (
    <section className="bg-red-900 mt-8 text-white p-5 md:p-16 rounded-2xl mx-[1%] md:mx-[2%] w-auto">
      <div className="grid xl:grid-cols-2 gap-6 items-center">
        {/* Text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index + "-text"}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center space-y-4"
          >
            <h1 className="text-3xl md:text-6xl font-bold leading-tight font-serif">
              {currentSlide?.title}
            </h1>
            <p className="text-lg md:text-xl pb-4 font-sans">
              {currentSlide?.description}
            </p>

            {/* Static Buttons */}
            <div className="flex space-x-4">
              <button className="bg-white text-black px-5 py-2 rounded-lg font-semibold">
                <Link to="/clinics">{heroData?.services_button}</Link>
              </button>
              <Link to="/about" className="flex items-center space-x-2">
                <span>{heroData?.about_button}</span>
                <span className="text-xl">→</span>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={imageKey} // <-- force re-render on slide change
            src={currentImage}
            alt="Hero Slide"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl w-full h-[65vh] object-cover shadow-lg"
          />
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;
