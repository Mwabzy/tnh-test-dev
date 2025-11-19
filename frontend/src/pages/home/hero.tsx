import accident from "../../assets/heroimages/heroimage1.jpg";
import hospitalview from "../../assets/heroimages/heroimage2.jpg";

import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useIntlayer } from "react-intlayer";
import { useState, useEffect } from "react";

const imageMap: Record<string, string> = {
  accident: accident,
  hospitalview: hospitalview,
};

const Hero = () => {
  const rawContent: any = useIntlayer("heroContent");
  const heroData = rawContent?.content ?? rawContent;

  const slides = heroData?.slides || [];
  const [index, setIndex] = useState(0);

  //  Auto-rotation
  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  if (!slides.length) return null;

  const currentSlide = slides[index];
  const rawImageKey = currentSlide?.imageKey;
  const imageKey =
    typeof rawImageKey === "string" ? rawImageKey : rawImageKey?.key;
  const currentImage = imageMap[imageKey] || imageMap["hospitalview"];

  //  navigation handlers
  const handlePrev = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const handleNext = () => setIndex((prev) => (prev + 1) % slides.length);

  return (
    <>
      {/* DESKTOP SECTION */}
      <section className="hidden md:block relative max-w-screen h-[80vh] overflow-hidden rounded-2xl mt-8 mx-[2%]">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={currentImage}
            alt="Hero background"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-r from-red-900 via-red-900/60 to-transparent z-10" />

        <div className="relative z-10 flex items-center h-full w-full px-16">
          <div className="max-w-2xl ml-8 text-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={index + "-text"}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                className="space-y-6"
              >
                <h1 className="text-6xl font-bold leading-tight font-serif">
                  {currentSlide?.title}
                </h1>
                <p className="text-xl font-sans">{currentSlide?.description}</p>
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

        {/* DESKTOP ARROWS */}
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white z-20"
        >
          {/* Left arrow icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white z-20"
        >
          {/* Right arrow icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </section>

      {/* MOBILE SECTION */}
      <section className="block md:hidden relative max-w-screen h-[80vh] overflow-hidden rounded-2xl mt-8 mx-[2%]">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={currentImage}
            alt="Hero background"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-b from-red-900 via-red-900/60 to-transparent" />

        <div className="relative z-10 flex py-6 h-full w-full px-6">
          <div className="max-w-2xl text-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={index + "-text-mobile"}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                className="space-y-6"
              >
                <h1 className="text-3xl font-bold leading-tight font-serif">
                  {currentSlide?.title}
                </h1>
                <p className="text-lg font-sans">{currentSlide?.description}</p>
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

        {/* MOBILE ARROWS */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-between px-6 z-20">
          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            aria-label="Next slide"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </section>
    </>
  );
};

export default Hero;
