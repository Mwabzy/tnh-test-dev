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
        <div className="flex-1">
          <p className="text-sm font-semibold text-red-900 uppercase">
            Highest Level of Service
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold leading-tight">
            We provide the best cleaning{" "}
            <span className="relative inline-block">
              <span className="relative z-10">services</span>
              <span className="absolute left-0 bottom-1 w-full h-2 bg-red-800 opacity-80 z-0 rotate-[-2deg]" />
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
              <span className="w-[100] h-[100] mb-4 flex items-center justify-center">
                {service.icon}
              </span>
            )}
            <h3 className="text-lg font-semibold text-[#0A0A23] leading-snug">
              {service.title}
            </h3>
            <span className="mt-2 text--600 group-hover:translate-x-1 transition-transform">
              →
            </span>
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
    <section className="bg-gray-50 py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto text-center md:text-left">
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#0A0A23] leading-snug">
          The process we have been doing for{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-[#0A0A23]">over 25 years</span>
            <span className="absolute left-0 bottom-1 w-full h-2 bg-red-800 opacity-80 z-0 rotate-[-2deg]" />
          </span>{" "}
          of service
        </h2>

        {/* Description */}
        <p className="text-gray-600 mt-6 max-w-3xl">
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
