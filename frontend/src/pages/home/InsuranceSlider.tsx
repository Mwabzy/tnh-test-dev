import { useState, useEffect } from "react";
import amref from "@/assets/images/Amref.png";
import Uap from "@/assets/images/UAP-LOGO.png";
import cigma from "@/assets/images/cigna.png";
import madison from "@/assets/images/madison.png";
import jubilee from "@/assets/images/jubilee.png";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";

interface Image {
  src: string;
  alt: string;
}

const images: Image[] = [
  { src: amref, alt: "Amref" },
  { src: Uap, alt: "UAP" },
  { src: cigma, alt: "Cigna" },
  { src: madison, alt: "Madison" },
  { src: jubilee, alt: "Jubilee" },
];

const InsuranceSlider = () => {
  const [index, setIndex] = useState(0);

  const visibleItems = 4;
  const totalItems = images.length;

  const movePrev = () => {
    setIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const moveNext = () => {
    setIndex((prev) => (prev + 1) % totalItems);
  };

  const getVisibleImages = () => {
    const visible = [];
    for (let i = 0; i < visibleItems; i++) {
      visible.push(images[(index + i) % totalItems]);
    }
    return visible;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      moveNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 mx-5 bg-white">
      <h2 className="text-xl sm:text-3xl font-bold text-center mb-6 text-red-900">
        Our Insurance Partners
      </h2>

      <div className="relative w-full max-w-5xl">
        {/* Left Arrow */}
        <button
          onClick={movePrev}
          className="absolute -left-4 lg:-left-10 top-1/2 -translate-y-1/2 z-10 
               hover:bg-[#dcb887] bg-yellow-500  text-sm sm:text-base
               p-1 sm:p-3 rounded-3xl lg:rounded-full shadow-3xl border cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>

        {/* Carousel Track */}
        <div className="w-full flex justify-between ">
          {getVisibleImages().map((image, i) => (
            <div
              key={i}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center p-2 lg:p-3"
            >
              <div className="border rounded-lg lg:p-4 md:p-3 shadow-md flex justify-center items-center w-full lg:h-32">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={moveNext}
          className="absolute -right-4 lg:-right-10 top-1/2 -translate-y-1/2 z-10 
                hover:bg-[#dcb887] bg-yellow-500 text-sm sm:text-base
               p-1 sm:p-3 rounded-3xl lg:rounded-full shadow-md border cursor-pointer"
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center space-x-2 mt-4">
        {images.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === index ? "bg-red-700 scale-125" : "bg-gray-300"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default InsuranceSlider;
