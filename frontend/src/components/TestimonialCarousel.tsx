import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIntlayer } from "react-intlayer";

// Define the shape of a single testimonial
export interface Testimonial {
  name: string;
  title?: string;
  image?: string;
  quote: string;
}

// Define the props for the component
interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({
  testimonials,
}: TestimonialCarouselProps) {
  const [index, setIndex] = useState<number>(0);

  const prev = () =>
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  const next = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 40000);

    return () => clearInterval(interval);
  }, [index]);

  // Check if testimonials exist and have at least one item
  if (!testimonials || testimonials.length === 0) {
    return <div className="max-w-7xl mx-auto">No testimonials available</div>;
  }

  const { name, title, image, quote } = testimonials[index];
  const content = useIntlayer("testimonial_carousel");

  return (
    <section className="bg-orange-200 py-14 md:py-20 w-full">
      <div className="max-w-7xl mx-auto flex flex-col items-start justify-center px-6 gap-6">
        <div className="flex items-start  w-full">
          <h2 className="flex text-3xl md:text-5xl font-semibold text-red-900 font-serif w-full">
            {content.clientsay}
          </h2>
          <div className="flex items-center justify-end w-full">
            <div className="hidden md:flex justify-between items-center">
              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-red-900 flex items-center justify-center text-red-900 hover:bg-gray-100"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-red-900 flex items-center justify-center text-red-900 hover:bg-gray-100"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full gap-2">
          <blockquote className="text-xl md:text-2xl w-full text-black font-serif">
            “{quote}”
          </blockquote>

          <div className="mt-2">
            <h3 className="text-lg font-semibold text-red-900">{name}</h3>
            <p className="text-gray-600">{title}</p>
          </div>

          <div className="flex md:hidden justify-between items-center">
            {/* Navigation Buttons */}
            <div className="flex justify-between gap-4 mx-auto">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-red-900 flex items-center justify-center text-red-900 hover:bg-gray-100"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-red-900 flex items-center justify-center text-red-900 hover:bg-gray-100"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
