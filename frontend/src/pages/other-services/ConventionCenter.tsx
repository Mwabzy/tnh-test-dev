import {
  Wifi,
  MicVocal,
  Projector,
  AirVent,
  UtensilsCrossed,
} from "lucide-react";
import { useIntlayer } from "react-intlayer";
import React from "react";
import { MapPin, Users, Star, Monitor, Coffee, Plane, Building } from 'lucide-react';


import Heading from "@/components/Heading";
const ImageSlider = ({ images }: { images: string[] }) => {
  const [index, setIndex] = React.useState(0);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
      <img
        src={images[index]}
        alt=""
        className="h-full w-full object-cover transition-all duration-500"
      />

      
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
      >
        ◀
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
      >
        ▶
      </button>
    </div>
  );
};


const steps = [
  {
    title: "WiFi",
    icon: <Wifi />,
  },
  {
    title: "Public address system",
    icon: <MicVocal />,
  },
  {
    title: "Projectors and smart boards",
    icon: <Projector />,
  },
  {
    title: "Air conditioner",
    icon: <AirVent />,
  },
  {
    title: "Catering services",
    icon: <UtensilsCrossed />,
  },
];

const ConventionCenter = () => {
  const content = useIntlayer("convention_center");
  return (
    <>
      <Heading
        image_url="https://cms.thenairobihosp.org/uploads/laundry_services_2d4f1b8c3a.jpg"
        style="image"
        title={Array.isArray(content.conventiontitle) ? content.title[0]?.value ?? "" : content.conventiontitle}
        description={
          Array.isArray(content.conventiondesc)
            ? content.conventiondesc[0]?.value ?? ""
            : (content.conventiondesc as string ?? "")
        }
      />
      <section className="px-6 mt-16 md:px-16 py-12 bg-white text-[#0A0A23]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="flex justify-center mt-5">
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
              {Array.isArray(content.conventionp) ? content.conventionp[0]?.value ?? "" : content.conventionp}
            </p>

            <p>
              {" "}
                {Array.isArray(content.conventionp1) ? content.conventionp1[0]?.value ?? "" : content.conventionp1}
            </p>

            <p>
              {" "}
              {Array.isArray(content.conventionp2) ? content.conventionp2[0]?.value ?? "" : content.conventionp2}
            </p>
          </div>
        </div>

        <div className=" max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
          {steps.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center shadow-xl rounded-xl py-5 hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-red-800 mb-5">
                {typeof feature.icon === "string" ? (
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-8 h-8 text-white"
                  />
                ) : (
                  <span className="w-8 h-8 text-white flex items-center justify-center">
                    {feature.icon}
                  </span>
                )}
              </div>
              <h4 className="text-lg font-semibold text-[#0A0A23]">
                {feature.title}
              </h4>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:space-x-12 space-y-16 md:space-y-0">
          {/* Left Content */}
          <div className="text-center md:text-center">
            <h2 className="text-xl md:text-3xl font-extrabold text-[#0A0A23] leading-snug">
               {Array.isArray(content.years) ? content.years[0]?.value ?? "" : content.years}
            </h2>

            <p className="text-gray-600 text-lg mt-6 ">
              {content.conventionp3[0]?.value ?? ""}
            </p>

            <p className="text-gray-600 text-lg mt-6 ">
              {content.conventionp4[0]?.value ?? ""}
            </p>

            <p className="text-gray-600 text-lg mt-6 ">
              {content.conventionp5[0]?.value ?? ""}
            </p>
          </div>

          
          {/* Grid Card Content */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
  
  {/* CARD 1 */}
  <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition">
    <ImageSlider
      images={[
        "https://cms.thenairobihosp.org/uploads/convention_1.jpg",
        "https://cms.thenairobihosp.org/uploads/convention_2.jpg",
      ]}
    />
    <div className="p-6">
      <h3 className="text-xl font-bold text-[#0A0A23] uppercase">
        Event Spaces
      </h3>
      <p className="text-gray-600 mt-2">
        Spacious halls suitable for conferences, seminars & exhibitions.
      </p>
    </div>
  </div>

  {/* CARD 2 */}
  <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition">
    <ImageSlider
      images={[
        "https://cms.thenairobihosp.org/uploads/convention_services_1.jpg",
        "https://cms.thenairobihosp.org/uploads/convention_services_2.jpg",
      ]}
    />
    <div className="p-6">
      <h3 className="text-xl font-bold text-[#0A0A23] uppercase">
        Service Excellence
      </h3>
      <p className="text-gray-600 mt-2">
        Premium amenities with modern equipment for all events.
      </p>
    </div>
  </div>

  {/* CARD 3 */}
  <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition">
    <ImageSlider
      images={[
        "https://cms.thenairobihosp.org/uploads/convention_location_1.jpg",
        "https://cms.thenairobihosp.org/uploads/convention_location_2.jpg",
      ]}
    />
    <div className="p-6">
      <h3 className="text-xl font-bold text-[#0A0A23] uppercase">
        Strategic Location
      </h3>
      <p className="text-gray-600 mt-2">
        Easily accessible with beautiful surrounding views.
      </p>
    </div>
  </div>
   {/* CARD 4 */}
  <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition">
    <ImageSlider
      images={[
        "https://cms.thenairobihosp.org/uploads/convention_location_1.jpg",
        "https://cms.thenairobihosp.org/uploads/convention_location_2.jpg",
      ]}
    />
    <div className="p-6">
      <h3 className="text-xl font-bold text-[#0A0A23] uppercase">
        Strategic Location
      </h3>
      <p className="text-gray-600 mt-2">
        Easily accessible with beautiful surrounding views.
      </p>
    </div>
  </div>
   {/* CARD 5 */}
  <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition">
    <ImageSlider
      images={[
        "https://cms.thenairobihosp.org/uploads/convention_location_1.jpg",
        "https://cms.thenairobihosp.org/uploads/convention_location_2.jpg",
      ]}
    />
    <div className="p-6">
      <h3 className="text-xl font-bold text-[#0A0A23] uppercase">
        Strategic Location
      </h3>
      <p className="text-gray-600 mt-2">
        Easily accessible with beautiful surrounding views.
      </p>
    </div>
  </div>

</div>

          
        </div>
      </section>

      <div className="bg-white pb-10 px-6 md:px-0">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <p className="uppercase font-bold text-sm tracking-wide text-red-800">
             {Array.isArray(content.contactus) ? content.contactus[0]?.value ?? "" : content.contactus}
          </p>
          <h1 className="text-4xl font-extrabold leading-tight text-[#0A0A23]">
             {Array.isArray(content.booking) ? content.booking[0]?.value ?? "" : content.booking}
          </h1>
          <p className="text-black/80 text-lg">
             {Array.isArray(content.invite) ? content.invite[0]?.value ?? "" : content.invite}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-center">
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
