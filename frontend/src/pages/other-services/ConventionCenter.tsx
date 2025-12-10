import React, { useState } from "react";
import { useIntlayer } from "react-intlayer";
import {
  Wifi,
  MicVocal,
  Projector,
  AirVent,
  UtensilsCrossed,
} from "lucide-react";

import Heading from "@/components/Heading";

// --- IMAGE SLIDER COMPONENT ---
interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
      <img
        src={images[index]}
        alt={`Slide ${index + 1}`}
        className="h-full w-full object-cover transition-all duration-500"
      />

      {/* Previous Button */}
      <button
        onClick={handlePrev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white z-20"
      >
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

      {/* Next Button */}
      <button
        onClick={handleNext}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white z-20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

// --- FEATURES DATA ---
const steps = [
  { title: "WiFi", icon: <Wifi /> },
  { title: "Public address system", icon: <MicVocal /> },
  { title: "Projectors and smart boards", icon: <Projector /> },
  { title: "Air conditioner", icon: <AirVent /> },
  { title: "Catering services", icon: <UtensilsCrossed /> },
];

const ConventionCenter = () => {
  const content = useIntlayer("convention_center");

  return (
    <>
      {/* HEADING */}
      <Heading
        image_url="https://cms.thenairobihosp.org/uploads/laundry_services_2d4f1b8c3a.jpg"
        style="image"
        title={
          Array.isArray(content.conventiontitle)
            ? content.conventiontitle[0]?.value ?? ""
            : content.conventiontitle
        }
        description={
          Array.isArray(content.conventiondesc)
            ? content.conventiondesc[0]?.value ?? ""
            : content.conventiondesc
        }
      />

      {/* ABOUT SECTION */}
      <section className="px-6 mt-16 md:px-16 py-12 bg-white text-[#0A0A23]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="flex justify-center mt-5 md:w-1/2">
            <img
              src="https://cms.thenairobihosp.org/uploads/who_we_are_8fbeb1073c.jpg"
              alt=""
              className="max-h-[60vh] object-cover rounded-lg shadow-lg w-full"
            />
          </div>

          <div className="flex-1 text-gray-600 space-y-4">
            <h1 className="mt-3 text-4xl md:text-5xl font-extrabold leading-tight">
              {content.subtitle}
            </h1>

            <p>
              {Array.isArray(content.conventionp)
                ? content.conventionp[0]?.value ?? ""
                : content.conventionp}
            </p>

            <p>
              {Array.isArray(content.conventionp1)
                ? content.conventionp1[0]?.value ?? ""
                : content.conventionp1}
            </p>

            <p>
              {Array.isArray(content.conventionp2)
                ? content.conventionp2[0]?.value ?? ""
                : content.conventionp2}
            </p>
          </div>
        </div>

        {/* FEATURES */}
        <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
          {steps.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center shadow-xl rounded-xl py-5 hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-red-800 mb-5">
                <span className="text-white">{feature.icon}</span>
              </div>
              <h4 className="text-lg font-semibold text-[#0A0A23]">
                {feature.title}
              </h4>
            </div>
          ))}
        </div>
      </section>

      {/* CARD SECTION */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl ml-50 text-left">
          <h2 className="text-xl md:text-3xl font-extrabold text-[#0A0A23] leading-snug">
            {Array.isArray(content.years)
              ? content.years[0]?.value ?? ""
              : content.years}
          </h2>

          <p className="text-gray-600  text-lg mt-6">
            {content.conventionp3[0]?.value ?? ""}
          </p>

          <p className="text-gray-600  text-lg mt-6">
            {content.conventionp4[0]?.value ?? ""}
          </p>

          <p className="text-gray-600  text-lg mt-6">
            {content.conventionp5[0]?.value ?? ""}
          </p>
        </div>

        {/* CARDS */}
        <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Amphitheater",
              seats: "1 × 350-seated hall",
              description:
                "Spacious halls suitable for conferences, seminars & exhibitions.",
              images: [
                "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800",
              ],
            },
            {
              title: "Capacity Collapsible Room",
              seats: "1 × 150-seater hall",
              description:
                "Premium amenities with modern equipment for all events.",
              images: [
                "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800",
              ],
            },
            {
              title: "Plenary Room",
              seats: "1 × 80-seater Room",
              description:
                "Easily accessible with beautiful surrounding views.",
              images: [
                "https://images.pexels.com/photos/2675268/pexels-photo-2675268.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800",
              ],
            },
            {
              title: "Meeting Room",
              seats: "4 × 25-seater Room",
              description:
                "Easily accessible with beautiful surrounding views.",
              images: [
                "https://images.pexels.com/photos/2675268/pexels-photo-2675268.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800",
              ],
            },
            {
              title: "Meeting Room",
              seats: "4 × 16-seater Room",
              description:
                "Easily accessible with beautiful surrounding views.",
              images: [
                "https://images.pexels.com/photos/2675268/pexels-photo-2675268.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800",
              ],
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition"
            >
              <ImageSlider images={card.images} />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0A0A23] uppercase">
                  {card.title}
                </h3>
                <p className="text-red-800 text-sm mt-1">{card.seats}</p>
                <p className="text-gray-600 mt-2">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <div className="bg-white pb-10 px-6 md:px-0">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <p className="uppercase font-bold text-sm tracking-wide text-red-800">
            {Array.isArray(content.contactus)
              ? content.contactus[0]?.value ?? ""
              : content.contactus}
          </p>

          <h1 className="text-4xl font-extrabold leading-tight text-[#0A0A23]">
            {Array.isArray(content.booking)
              ? content.booking[0]?.value ?? ""
              : content.booking}
          </h1>

          <p className="text-black/80 text-lg">
            {Array.isArray(content.invite)
              ? content.invite[0]?.value ?? ""
              : content.invite}
          </p>

          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
            <a
              href="tel:+254703082000"
              className="bg-orange-200 text-black font-semibold px-6 py-3 rounded-full shadow-md"
            >
              Call us: +254 703 082 000
            </a>

            <button className="border border-black px-6 py-3 rounded-full font-semibold hover:bg-black hover:text-white transition">
              Make a booking
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConventionCenter;
