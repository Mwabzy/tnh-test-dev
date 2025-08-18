import { WashingMachine } from "lucide-react";
import { Shirt } from "lucide-react";
import { PackageCheck } from "lucide-react";
import { Boxes } from "lucide-react";
import Heading from "@/components/Heading";
import { useIntlayer } from "react-intlayer";

const steps = [
  {
    title: "Washing and Cleaning",
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
  const content = useIntlayer("laundry_services");
  return (
    <>
      <Heading
        image_url="https://cms.thenairobihosp.org/uploads/laundry_services_2d4f1b8c3a.jpg"
        style="image"
        title={Array.isArray(content.title) ? content.title[0]?.value ?? "" : content.title}
        description={Array.isArray(content.description) ? content.description[0]?.value ?? "" : content.description}
      />
      <section className="px-6 mt-16 md:px-16 py-12 bg-white text-[#0A0A23]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="flex-1 text-gray-600 space-y-4">
            <h1 className="mt-3 text-4xl md:text-5xl font-extrabold leading-tight">
              {content.subtitle}
            </h1>
            <p>
              {Array.isArray(content.subdesciption)
                ? content.subdesciption[0]?.value ?? ""
                : content.subdesciption}
            </p>
            <p>
              {Array.isArray(content.paragraph)
                ? content.paragraph[0]?.value ?? ""
                : content.paragraph}
            </p>
          </div>

          <div className="flex-1 ml-15">
            <p className="text-md font-semibold text-red-900 uppercase">
              {Array.isArray(content.levelservice) ? content.levelservice[0]?.value ?? "" : content.levelservice}
            </p>

            <h1 className="text-lg mt-3 font-semibold">
             {Array.isArray(content.offer) ? content.offer[0]?.value?? "": content.offer}{" "}
            </h1>

            <ul className="list-disc list-outside space-y-1 text-gray-700">
              <li>{Array.isArray(content.point1) ? content.point1[0]?.value?? "":content.point1}</li>
              <li>{Array.isArray(content.point2) ? content.point2[0]?.value?? "":content.point2}</li>
              <li>{Array.isArray(content.point3) ? content.point3[0]?.value?? "":content.point3}</li>
            </ul>

            <h1 className="text-lg mt-5 font-semibold">
              {Array.isArray(content.benefits) ? content.benefits[0]?.value?? "":content.benefits}{" "}
            </h1>
            <ul className="list-disc list-outside space-y-1 text-gray-700">
              <li>{Array.isArray(content.efficiency) ? content.efficiency[0]?.value?? "":content.efficiency}</li>
              <li>{Array.isArray(content.quality) ? content.quality[0]?.value?? "":content.quality}</li>
              <li>{Array.isArray(content.afford) ? content.afford[0]?.value?? "":content.afford}</li>
              <li>{Array.isArray(content.results) ? content.results[0]?.value?? "":content.results}</li>
              <li>{Array.isArray(content.needs) ? content.needs[0]?.value?? "":content.needs}</li>
              <li>
                {Array.isArray(content.equipments) ? content.equipments[0]?.value?? "":content.equipments}
              </li>
              <li>{Array.isArray(content.advice) ? content.advice[0]?.value?? "":content.advice}</li>
              <li>{Array.isArray(content.team) ? content.results[0]?.value?? "":content.team}</li>
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
           {Array.isArray(content.process) ? content.process[0]?.value?? "":content.process}
            </h2>

            <p className="text-gray-600 text-lg mt-6 max-w-3xl">
              {Array.isArray(content.departments)
                ? content.departments[0]?.value ?? ""
                : content.departments}
            </p>

            <p className="text-gray-600 text-lg mt-6 max-w-3xl">
              {Array.isArray(content.safetyofclients)
                ? content.safetyofclients[0]?.value ?? ""
                : content.safetyofclients}
            </p>

            <p className="text-gray-600 text-lg mt-6 max-w-3xl">
               {Array.isArray(content.laundry)
                ? content.laundry[0]?.value ?? ""
                : content.laundry}
            </p>
          </div>

          {/* Right Content */}
          <div className="flex-1 text-left">
            <h2 className="text-xl md:text-3xl font-extrabold text-[#0A0A23] leading-snug">
             {Array.isArray(content.patners) ? content.patners[0]?.value?? "":content.patners}
            </h2>

            <p className="text-gray-600 mt-6 max-w-3xl">
               {Array.isArray(content.proud) ? content.proud[0]?.value?? "":content.proud}
            </p>

            <ul className="list-disc list-inside text-lg text-gray-600 mt-6 max-w-3xl">
              <li>  {Array.isArray(content.proudpoint1) ? content.proudpoint1[0]?.value?? "":content.proudpoint1}</li>
              <li> {Array.isArray(content.proudpoint2) ? content.proudpoint2[0]?.value?? "":content.proudpoint2}</li>
              <li>  {Array.isArray(content.proudpoint3) ? content.proudpoint3[0]?.value?? "":content.proudpoint3}</li>
              <li>  {Array.isArray(content.proudpoint4) ? content.proudpoint4[0]?.value?? "":content.proudpoint4}</li>
              <li>{Array.isArray(content.proudpoint5) ? content.proudpoint5[0]?.value?? "":content.proudpoint5}</li>
              <li>{Array.isArray(content.proudpoint6) ? content.proudpoint6[0]?.value?? "":content.proudpoint6}</li>
              <li>{Array.isArray(content.proudpoint7) ? content.proudpoint7[0]?.value?? "":content.proudpoint7}</li>
              <li>{Array.isArray(content.proudpoint8) ? content.proudpoint8[0]?.value?? "":content.proudpoint8}</li>
              <li>{Array.isArray(content.proudpoint9) ? content.proudpoint9[0]?.value?? "":content.proudpoint9}</li>
            </ul>

            <p className="text-gray-600 mt-6 max-w-3xl">
              {Array.isArray(content.works) ? content.works[0]?.value?? "":content.works}
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
           {Array.isArray(content.serv) ? content.serv[0]?.value?? "":content.serv} <br /> {Array.isArray(content.book) ? content.book[0]?.value?? "":content.book}
          </h1>
          <p className="text-black/80 text-sm">
            {Array.isArray(content.import) ? content.import[0]?.value?? "":content.import}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-center">
            <a
              href="tel:+254703082000"
              className="bg-orange-200 text-black font-semibold px-6 py-3 rounded-full shadow-md"
            >
              {Array.isArray(content.call) ? content.call[0]?.value?? "":content.call}
            </a>
            <button className="border border-black px-6 py-3 rounded-full font-semibold hover:bg-black hover:text-white transition">
              {Array.isArray(content.make) ? content.make[0]?.value?? "":content.make}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LaundryServices;
