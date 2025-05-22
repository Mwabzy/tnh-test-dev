import { WashingMachine } from "lucide-react";
import { Shirt } from "lucide-react";
import { PackageCheck } from 'lucide-react';
import { Boxes } from 'lucide-react';
import { Sparkles } from 'lucide-react';
import { Shield } from 'lucide-react';
import { WandSparkles } from 'lucide-react';
import { ShieldAlert } from 'lucide-react';





const services = [
  {
    title: "Washing and Disinfection",
    icon: <WashingMachine />,
  },
  {
    title: " Drying and Ironing",
    icon: <Shirt />,
  },
  {
    title: " Folding and Packaging",
    icon:  <PackageCheck />,
  },
  {
    title: "Collection and Sorting",
    icon: <Boxes/> ,
  },
];

const HeroSection = () => {
  return (
    <section className="px-6 mt-16 md:px-16 py-12 bg-white text-[#0A0A23]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        <div className="flex-1 ml-15">
          <p className="text-sm font-semibold text-red-900 uppercase">
            Highest Level of Service
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold leading-tight">
            We provide the best cleaning{" "}
            <span className="relative inline-block">
              <span className="relative z-10">services</span>
              <img
            src="https://img.freepik.com/premium-vector/stroke-with-bright-orange-watercolor-brush-cool-refreshing-color-vector-graphics_654163-400.jpg?ga=GA1.1.1163846917.1747898838&semt=ais_hybrid&w=740"
            alt="Paint stroke background"
            className="absolute left-0 top-1/2 -translate-y-1/2 h-18 w-150 object-contain"
      />
            </span>
          </h1>
        </div>

        <div className="flex-1 text-gray-600 space-y-4">
          <p>
            Our clinic provides a wide range of oral care services, from
            checkups to fitting braces. We use only advanced technologies to
            keep your smile looking the best.
          </p>
          <p>
            Our team of experts who have been in the profession for years
            focuses on helping you achieve optimal oral health.
          </p>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 max-w-7xl mx-auto  sm:grid-cols-2 md:grid-cols-4 gap-8">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="flex py-12 mx-auto flex-col items-start group hover:scale-105 transition-transform"
          >
            {typeof service.icon === "string" ? (
              <img
                src={service.icon}
                alt={service.title}
                className="w-20 h-20 mb-4"
              />
            ) : (
              <span className="w-20 h-20 mb-4 flex items-center justify-center">
                {service.icon}
              </span>
            )}
            <h3 className="text-lg font-semibold text-[#0A0A23] leading-snug">
              {service.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

const steps = [
  {
    title: "1. Hygiene & Clean",
    icon:  <Sparkles />,
    description:
      "Our clinic provides a wide range of oral care services, from checkups to fitting braces. we are ready.",
  },
  {
    title: "2. Safety Check",
    icon:    <Shield />,
    description:
      "Our clinic provides a wide range of oral care services, from checkups to fitting braces. we are ready.",
  },
  {
    title: "3. Deep Cleaning",
    icon: <WandSparkles />,
    description:
      "Our clinic provides a wide range of oral care services, from checkups to fitting braces. we are ready.",
  },
  {
    title: "4. Health Inspection",
    icon: <ShieldAlert/>,
    description:
      "Our clinic provides a wide range of oral care services, from checkups to fitting braces. we are ready.",
  },
];

const ExperienceSection = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto text-center md:text-left">
        {/* Title */}
      <h2 className="text-3xl md:text-5xl font-extrabold text-[#0A0A23] leading-snug ml-15">
  The process we have been doing <br />
  for{" "}
  <span className="relative inline-block">
    <span className="relative z-10 text-[#0A0A23]">over 25 years</span>
    <img
      src="https://img.freepik.com/free-psd/neon-orange-brush-stroke-background_53876-81626.jpg?t=st=1747908833~exp=1747912433~hmac=093d119a6debb16636b346ed439ddb8786a442ec5b78630898db3428650df341&w=826"
      alt="Paint stroke background"
      className="absolute left-0 bottom-0 h-15 w-full object-contain z-0"
    />
  </span>{" "}
  of service
</h2>


        {/* Description */}
        <p className="text-gray-600 mt-6 max-w-3xl ml-15">
          Our clinic provides a wide range of oral care services, from checkups
          to fitting braces. We use only advanced technologies to keep your
          smile looking the best. Our clinic provides a wide range of oral care
          services,
        </p>

        {/* Process Steps */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-10 text-center">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-red-800 mb-5">
                {typeof step.icon === "string" ? (
                  <img
                    src={step.icon}
                    alt={step.title}
                    className="w-8 h-8 text-white"
                  />
                ) : (
                  <span className="w-8 h-8 text-white flex items-center justify-center">
                    {step.icon}
                  </span>
                )}
              </div>
              <h4 className="text-lg font-semibold text-[#0A0A23]">
                {step.title}
              </h4>
              <p className="text-sm text-gray-600 mt-2">{step.description}</p>
            </div>
          ))}
        </div>

         <div className="max-w-2xl space-y-6 mt-30 ml-15">
        {/* <p className="uppercase font-bold text-sm tracking-wide">Contact Us</p> */}
        {/* <h1 className="text-4xl font-extrabold leading-tight">
          Discuss our services <br/> or make an{' '}
          <span className="relative inline-block">
            <span className="relative z-10">appointment</span>
            <svg
              className="absolute bottom-0 left-0 w-full h-3 z-0"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path
                d="M0,6 C20,10 80,0 100,6 L100,10 L0,10 Z"
                fill="#FFD600"
              />
            </svg>
          </span>
        </h1>
        <p className="text-black/80 text-sm leading-relaxed">
          We know what a sore tooth is, so do not hesitate to reach us via the phone or to make an appointment online!
        </p>

        <div className="flex flex-col ml-20 items-end gap-4 md:flex-row">
          <button className="bg-orange-100 text-black font-semibold px-6 py-3 rounded-full shadow-md">
            Call us: +254 703 082 000
          </button>
          <button className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-red-600 transition">
            Make An Appointment
          </button>
        </div> */}
      </div>
      </div>
     </section>
  );
};
      
    

const LaundryServices = () => (
  <>
    <HeroSection />
    <ExperienceSection />
  </>
);

export default LaundryServices;
