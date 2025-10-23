import { useParams } from "react-router";

import opcData from "@/data/opcData.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, MapPin, Phone } from "lucide-react";

type AccordionItem = {
  title: string;
  Subject: string;
};

type Opc = {
  id: string;
  name: string;
  description: string;
  contact: string;
  email: string;
  location: string;
  accordionItems?: Record<string, AccordionItem>;
};

const OutpatientCenterDetails = () => {
  const { id } = useParams();
  const details = opcData.find((item) => item.id === String(id)) as Opc;

  if (!details)
    return (
      <div className="text-center mt-10 text-red-600">Service not found.</div>
    );

  return (
    <>
      <section className="bg-red-900 text-white p-5 md:p-16  ">
        <div className="grid md:grid-cols gap-2 lg:px-36">
          {/* Text Content */}
          <div className="flex flex-col justify-center space-y-4 max-w-xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {details.name}
            </h1>
            <p className="text-lg md:text-xl">{details.location}</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-10">
        <div className="flex-1 space-y-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">About the clinic</h2>
            <p className="mt-2 text-gray-700">{details.description}</p>
            <p></p>
          </div>

          <h2 className="text-2xl text-red-900 font-bold underline">
            CLINICAL SERVICES OFFERED
          </h2>

          {/* Accordion */}
          <div className="">
            <Accordion type="single" collapsible className="w-full">
              {details.accordionItems &&
                Object.keys(details.accordionItems).map((key, index) => {
                  const item = details.accordionItems![key];
                  return (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{item.title}</AccordionTrigger>
                      <AccordionContent>{item.Subject}</AccordionContent>
                    </AccordionItem>
                  );
                })}
            </Accordion>
          </div>
        </div>

        {/* Contact Card */}
        {/* <div className="lg:w-[300px] w-full bg-red-50 h-min rounded-xl p-6 shadow-md text-sm text-gray-800">
          <h3 className="font-semibold mb-4">Have Additional Questions?</h3>
          <ul className="space-y-2">
            <li>📍 {details.location}</li>
            <li>📞 {details.contact}</li>
            <li>✉️ {details.email}</li>
          </ul>
          <button className="mt-4 text-green-700 hover:underline">
            Contact Us →
          </button>
        </div> */}
        <div className="w-full lg:w-[300px] bg-red-50 h-min rounded-xl p-6 shadow-md text-sm text-gray-800">
          <h3 className="font-semibold mb-4 text-xl">
            Have Additional Questions?
          </h3>

          <div className="flex flex-col space-y-2 items-start text-lg">
            <span className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-red-900" aria-label="Phone icon" />
              <a className="text-sm " href="tel:+254703082000">
                {details.contact}
              </a>
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-red-900" aria-label="Mail icon" />
              <a className="text-sm" href="mailto:hosp@nbihosp.org">
                {details.email}
              </a>
            </span>
            <span className="flex items-center gap-2">
              <MapPin
                className="h-5 w-5 text-red-900"
                aria-label="Location icon"
              />
              <span className="text-sm">{details.location}</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OutpatientCenterDetails;
