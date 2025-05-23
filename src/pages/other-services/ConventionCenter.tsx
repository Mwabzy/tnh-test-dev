import {
  Wifi,
  MicVocal,
  Projector,
  AirVent,
  UtensilsCrossed,
} from "lucide-react";

import Heading from "@/components/Heading";

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
  return (
    <>
      <Heading
        image_url="https://cms.thenairobihosp.org/uploads/laundry_services_2d4f1b8c3a.jpg"
        style="image"
        title="Convention Center"
        description="We have different rooms for different meeting capacities."
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
              The Nairobi Hospital Convention Centre
            </h1>
            <p>
              Located at Anderson Centre, The Nairobi Hospital Convention Centre
              is one of the most practical meeting facilities in Nairobi. It
              provides modern amenities at a central location that is easily
              accessible from any point in Nairobi
            </p>

            <p>
              {" "}
              The Nairobi Hospital Convention Centre (TNHCC) combines the
              impassioned dedication of its capable personnel with an extensive
              range of premium venues, services and facilities.
            </p>

            <p>
              {" "}
              This innovative venue offers a comprehensive array of services for
              international and locally based clients, playing host to prominent
              global conferences, trade shows, concerts and celebrated stage
              productions. Our expertise in transforming the ordinary into the
              extraordinary has seen elegant conferences, glamorous banquets and
              exhibitions come to life. We roll out the red carpet, whether it
              is a discreet business meeting or an international exhibition.
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
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl md:text-3xl font-extrabold text-[#0A0A23] leading-snug">
              The process we have been doing <br />
              for over 20 years of service.
            </h2>

            <p className="text-gray-600 text-lg mt-6 max-w-3xl">
              Since opening in 2017, our mandate has been to generate economic
              and community benefits for Nairobi while filling a perceptible gap
              in the destination tourism infrastructure, with the potential to
              deliver a phenomenal impact on the national economy.
            </p>

            <p className="text-gray-600 text-lg mt-6 max-w-3xl">
              TNHCC has since continued to raise the profile of Nairobi as a
              sought-after Conference Tourism destination. It is also gradually
              maintaining and growing the economic and social contributions it
              makes to the destination.
            </p>

            <p className="text-gray-600 text-lg mt-6 max-w-3xl">
              Located on Nairobi’s Upper Hill business hub with the iconic
              presence of Ngong Hills backdrop and a stone’s throw from The
              Nairobi National Park, TNHCC offers a unique combination of
              world-class venue and facilities, service-orientated flexibility
              and professional staff committed to exceeding the expectations of
              our clients and their guests.
            </p>
          </div>

          {/* Right Content */}
          <div className="flex-1 text-left">
            <h2 className="text-xl md:text-3xl font-extrabold text-[#0A0A23] leading-snug">
              Room Types
            </h2>

            <p className="text-gray-600 mt-6 max-w-3xl">
              We have different rooms for different meeting capacities. Choose
              from the following room sizes:
            </p>

            <ul className="list-disc list-inside text-lg text-gray-600 mt-6 max-w-3xl">
              <li>1 × 350-seater Amphitheater</li>
              <li>1 × 150-seater Capacity Collapsible Room</li>
              <li>1 × 80-seater Plenary Room</li>
              <li>4 × 25-seater Meeting Rooms</li>
              <li>4 × 16-seater Meeting Rooms</li>
            </ul>
            <p className="text-gray-600 text-lg mt-6 max-w-3xl">
              This multi-purpose convention Centre was designed to amaze you
              with the possibilities ─ providing highly advanced technology
              services, large-scale capacity venues, fully equipped boardrooms
              and onsite five-star catering.
            </p>
            <p className="text-gray-600 text-lg mt-6 max-w-3xl">
              The state-of-the-art Nairobi Hospital Convention Centre offers
              convenient access to all the major visitor amenities (5-star
              Hotels; Leading Commercial Banks, Royal Nairobi Golf Club; Jomo
              Kenyatta International Airport; Wilson Airport and Shopping
              Malls).
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
          <p className="text-black/80 text-lg">
            We invite you to take your meeting to a higher level at The Nairobi
            Hospital Convention Centre. Give us a call or book your service
            online!
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
