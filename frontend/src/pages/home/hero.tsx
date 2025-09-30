import accident  from "@/assets/heroimages/heroimage1.jpg";
import hospitalview from "@/assets/heroimages/heroimage2.jpg";

import { Link } from "react-router"; // Assuming react-router-dom
import { motion, AnimatePresence } from "framer-motion";
import { useIntlayer } from "react-intlayer";
import { useState, useEffect } from "react";

// Modern bundlers often handle this, so you might just be able to use the import directly.
const imageMap: Record<string, string> = {
  accident: accident,
  hospitalview: hospitalview,
};

const Hero = () => {
  const rawContent: any = useIntlayer("heroContent");
  const heroData = rawContent?.content ?? rawContent;

  const slides = heroData?.slides || [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) return null;

  const currentSlide = slides[index];

  const rawImageKey = currentSlide?.imageKey;
  const imageKey =
  typeof rawImageKey === "string" ? rawImageKey : rawImageKey?.key;
 
  const currentImage = imageMap[imageKey] || imageMap["hospitalview"];

  return (
    <section className="relative w-full h-[80vh] overflow-hidden rounded-2xl mt-8 mx-[1%] md:mx-[2%]">
      {/* Background image slider */}
      <AnimatePresence mode="wait">
        <motion.img
          key={index} // <-- THE FIX IS HERE
          src={currentImage}
          alt="Hero background"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"

        />
      </AnimatePresence>

      {/* Gradient overlay left side */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-900 via-red-900/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex items-center h-full w-full px-6 md:px-16">
        <div className="max-w-2xl text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={index + "-text"} // This key was already correct
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-3xl md:text-6xl font-bold leading-tight font-serif">
                {currentSlide?.title}
              </h1>
              <p className="text-lg md:text-xl font-sans">
                {currentSlide?.description}
              </p>
              <div className="flex space-x-4">
                <Link
                  to="/clinics"
                  className="bg-white text-black px-5 py-2 rounded-lg font-semibold shadow"
                >
                  {heroData?.services_button}
                </Link>
                <Link to="/about" className="flex items-center space-x-2">
                  <span>{heroData?.about_button}</span>
                  <span className="text-xl">→</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Hero;
