import { WashingMachine } from "lucide-react";
import { Shirt } from "lucide-react";
import { PackageCheck } from "lucide-react";
import { Boxes } from "lucide-react";
import Heading from "@/components/Heading";

const steps = [
  {
    title: "Washing and Disinfection",
    icon: <WashingMachine />,
    description:
      "Our clinic provides a wide range of oral care services, from checkups to fitting braces. we are ready.",
  },
  {
    title: " Drying and Ironing",
    icon: <Shirt />,
    description:
      "Our clinic provides a wide range of oral care services, from checkups to fitting braces. we are ready.",
  },
  {
    title: " Folding and Packaging",
    icon: <PackageCheck />,
    description:
      "Our clinic provides a wide range of oral care services, from checkups to fitting braces. we are ready.",
  },
  {
    title: "Collection and Sorting",
    icon: <Boxes />,
    description:
      "Our clinic provides a wide range of oral care services, from checkups to fitting braces. we are ready.",
  },
];

const LaundryServices = () => {
  return (
    <>
      <Heading
        image_url="https://cms.thenairobihosp.org/uploads/laundry_services_2d4f1b8c3a.jpg"
        style="image"
        title="Laundry Services"
        description="We provide the quality laundry services. "
      />
      <section className="px-6 mt-16 md:px-16 py-12 bg-white text-[#0A0A23]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="flex-1 text-gray-600 space-y-4">
            <h1 className="mt-3 text-4xl md:text-5xl font-extrabold leading-tight">
              We provide the best cleaning services.
            </h1>
            <p>
              The Nairobi Hospital boasts the largest laundry in East and
              Sub-Saharan Africa. The laundry is located at Anderson Centre and
              is equipped with state-of-the-art equipment which includes a
              12-chamber hygiene Tunnel washer-Africa’s largest, barrier washers
              for handling infected/foul linen, stand alone high spin washers
              for customized laundry and several assortment of finishing
              equipment and back up. The Laundry does not only process linen but
              provides holistic linen solutions to the entire hospital, it’s
              outlets and our external customers.
            </p>
            <p>
              Our team of experts who have been in the profession for years
              focuses on helping you achieve optimal oral health.
            </p>
          </div>

          <div className="flex-1 ml-15">
            <p className="text-md font-semibold text-red-900 uppercase">
              Highest Level of Service
            </p>

            <h1 className="text-lg mt-3 font-semibold">
              The services we offer include:{" "}
            </h1>

            <ul className="list-disc list-outside space-y-1 text-gray-700">
              <li>Same Day Service</li>
              <li>Express Service</li>
              <li>Scheduled Laundry (e.g., Mon, Wed, Friday) or as agreed</li>
            </ul>

            <h1 className="text-lg mt-5 font-semibold">
              The Benefits of using our laundry:{" "}
            </h1>
            <ul className="list-disc list-outside space-y-1 text-gray-700">
              <li>Speed / Efficiency</li>
              <li>Quality</li>
              <li>Affordability</li>
              <li>Professional Results</li>
              <li>Understanding of Current Needs (e.g., Infection Control)</li>
              <li>
                Modern Equipment Allowing Customized Programs for Your Laundry
                Items, with Backup Available
              </li>
              <li>Textile Advice</li>
              <li>Caring and Professional Team</li>
            </ul>
          </div>
        </div>

        <div className=" max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-4 gap-10 text-center">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center shadow-xl rounded-xl py-5 hover:scale-105 transition-transform cursor-pointer"
            >
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
      </section>
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:space-x-12 space-y-16 md:space-y-0">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl md:text-3xl font-extrabold text-[#0A0A23] leading-snug">
              The process we have been doing <br />
              for over 20 years of service.
            </h2>

            <p className="text-gray-600 text-lg mt-6 max-w-3xl">
              The department's regulatory compliance is guaranteed. The design
              of our facility meets all the recommendations and requirements
              governing a healthcare laundry...
            </p>

            <p className="text-gray-600 text-lg mt-6 max-w-3xl">
              The safety of our clients, hospital staff and patients is our
              number 1 priority, infection prevention starts with a clean
              environment...
            </p>

            <p className="text-gray-600 text-lg mt-6 max-w-3xl">
              “Laundry is one thing that is never noticed until it’s not done”.
            </p>
          </div>

          {/* Right Content */}
          <div className="flex-1 text-left">
            <h2 className="text-xl md:text-3xl font-extrabold text-[#0A0A23] leading-snug">
              Our Partners
            </h2>

            <p className="text-gray-600 mt-6 max-w-3xl">
              We are proud to partner with a variety of organizations to provide
              the best laundry services possible. Our partners include:
            </p>

            <ul className="list-disc list-inside text-lg text-gray-600 mt-6 max-w-3xl">
              <li>Hotels</li>
              <li>Apartments</li>
              <li>Guest Houses</li>
              <li>Commercial Laundries</li>
              <li>Hospitals</li>
              <li>Nursing Homes</li>
              <li>Private Clinics</li>
              <li>Walk-ins / Individuals / Staff</li>
              <li>Spas / Salons / Beauty Parlors</li>
            </ul>

            <p className="text-gray-600 mt-6 max-w-3xl">
              How it works: You drop it! We clean it! You pick it! <br />
              The Outcome: “We present You” <br />
              Rates: Our rates are very competitive in the market.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-white pb-10 px-6 md:px-0">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <p className="uppercase font-bold text-sm tracking-wide text-red-800">
            Contact Us
          </p>
          <h1 className="text-4xl font-extrabold leading-tight text-[#0A0A23]">
            Discuss our services <br /> or make a booking
          </h1>
          <p className="text-black/80 text-sm">
            We know how important clean and fresh laundry is, so don’t hesitate
            to give us a call or book your service online!
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

export default LaundryServices;
