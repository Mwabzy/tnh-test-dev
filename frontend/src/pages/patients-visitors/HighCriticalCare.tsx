import Heading from "@/components/Heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
//import Image from "next/image";
import { FC } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useIntlayer } from "react-intlayer";

const HighCriticalCare: FC = () => {
  const content = useIntlayer("high_critical_care");
  return (
    <div>
      <Heading
        image_url="https://cms.thenairobihosp.org/uploads/high_critical_care_8fbeb1073c.jpg"
        style="image"
        title="High Critical Care"
        description="Explore our high critical care services for patients requiring specialized attention and monitoring."
      />{" "}
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-5 border border-gray-200">
              <h2 className="text-xl font-bold text-red-900 mb-3">
                {content.hcccintro}
              </h2>
              <p className="text-gray-700">{content.hccp1}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white shadow-xl rounded-2xl p-5 border border-gray-200">
                <h2 className="text-xl font-bold text-red-900 mb-3">
                  {content.hcch2}
                </h2>
                <p className="text-gray-700 whitespace-pre-line">
                  {content.hccp2}
                </p>
              </div>
              <div className="bg-white shadow-xl rounded-2xl p-5 border border-gray-200">
                <h2 className="text-xl font-bold text-red-900 mb-3">
                  {content.hccp3}
                </h2>
                <p className="text-gray-700">{content.hccp4}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white shadow-xl rounded-2xl p-5 border border-gray-200">
                <h2 className="text-xl font-bold text-red-900 mb-3">
                  {content.hcch3}
                </h2>
                <p className="text-gray-700">{content.hccp5}</p>
              </div>
              <div className="bg-white shadow-xl rounded-2xl p-5 border border-gray-200">
                <h2 className="text-xl font-bold text-red-900 mb-3">
                  {content.hcch4}
                </h2>
                <p className="text-gray-700">{content.hccp6}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* <Image
              src="/mnt/data/5e666d1a-344e-4d78-81f7-885d227f44ad.png"
              alt="Nurse Image"
              width={600}
              height={400}
              className="rounded-2xl shadow-xl"
            /> */}
            <div>*image here</div>
            <div className="bg-red-50 shadow-xl rounded-2xl p-6 border  border-red-200">
              <div className="flex flex-col space-y-2 items-start text-lg">
                <h2 className="text-center text-lg font-semibold mb-3">
                  {content.hccquestion}
                </h2>

                <span className="flex items-center justify-center gap-2">
                  <Phone
                    className="h-5 w-5 text-red-900"
                    aria-label="Phone icon"
                  />{" "}
                  <a href="tel:+254 703082000">+254 703082000</a>
                </span>
                <span className="flex items-center justify-center gap-2">
                  <Mail
                    className="h-5 w-5 text-red-900"
                    aria-label="Mail icon"
                  />
                  <a href="mailto: hosp@nbihosp.org"> hosp@nbihosp.org</a>
                </span>
                <span className="flex items-center justify-center gap-2">
                  <MapPin
                    className="h-5 w-5 text-red-900 space-x-2"
                    aria-label="Location icon"
                  />{" "}
                  Argwings Kodhek Road, Nairobi
                </span>
              </div>
            </div>
            <div className="flex justify-center w-full">
              <div className="bg-white  rounded-2xl p-5 border border-gray-200 w-full md:w-2/3">
                <h2 className="text-xl font-bold text-red-900 mb-3 text-center">
                  {content.hccvisitinghours}
                </h2>
                <p className="text-gray-700 text-center">2</p>
                <p className="text-gray-700 text-center">
                  {content.hccvisitinghoursdetails}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="nicu">
            <AccordionTrigger>{content.nicutitle1}</AccordionTrigger>
            <AccordionContent>{content.nicutext1}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="hdu">
            <AccordionTrigger>{content.nicutitle2}</AccordionTrigger>
            <AccordionContent>{content.nicutext2}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="covid">
            <AccordionTrigger>{content.nicutitle3}</AccordionTrigger>
            <AccordionContent>{content.nicutext3}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default HighCriticalCare;
