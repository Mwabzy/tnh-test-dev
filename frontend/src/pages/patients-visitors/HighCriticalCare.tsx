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

const HighCriticalCare: FC = () => {
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
                Introduction
              </h2>
              <p className="text-gray-700">
                The ultra-modern CCU has been designed in line with the JCI
                standards. It has been fitted with smart glass, rendering
                curtains obsolete and making it infection control compliant. The
                rooms are also fitted with hermetic doors which are
                internationally accepted in health care institutions as they are
                antimicrobial and scratch proof.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white shadow-xl rounded-2xl p-5 border border-gray-200">
                <h2 className="text-xl font-bold text-red-900 mb-3">
                  Services
                </h2>
                <p className="text-gray-700 whitespace-pre-line">
                  Phototherapy And Warming Of Term Babies After Delivery
                  Ventilating Neonates (Capacity Of 23 Neonates) Isolation Room
                  (Accommodates 2 Neonates)
                </p>
              </div>
              <div className="bg-white shadow-xl rounded-2xl p-5 border border-gray-200">
                <h2 className="text-xl font-bold text-red-900 mb-3">
                  Capacity
                </h2>
                <p className="text-gray-700">
                  The Critical Care Unit has a total capacity of 16 rooms; 3 of
                  which are negative pressure isolation rooms and 2 are
                  anterooms.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white shadow-xl rounded-2xl p-5 border border-gray-200">
                <h2 className="text-xl font-bold text-red-900 mb-3">
                  Training
                </h2>
                <p className="text-gray-700">
                  All the nurses and doctors receive regular ACLS (Advanced
                  Cardiac Life Support) training and are equipped with the most
                  up-to-date evidence-based practice in accordance with American
                  Resuscitation Protocols.
                </p>
              </div>
              <div className="bg-white shadow-xl rounded-2xl p-5 border border-gray-200">
                <h2 className="text-xl font-bold text-red-900 mb-3">
                  Staffing
                </h2>
                <p className="text-gray-700">
                  The Critical Care Unit is managed by 10 doctors and 54
                  registered nurses, 37 of whom are trained critical care
                  nurses.
                </p>
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
                  Have Additional Questions?
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
                  Visiting Hours
                </h2>
                <p className="text-gray-700 text-center">
                  2.00pm – 4.00pm: One visitor per patient.
                </p>
                <p className="text-gray-700 text-center">
                  *Children under 12 years are not allowed in the wards.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="nicu">
            <AccordionTrigger>Neonatal Intensive Care (NICU)</AccordionTrigger>
            <AccordionContent>
              Due to the increased number of births resulting from improved
              technology, the number of premature neonates in the hospital has
              increased, necessitating the establishment of an ultra-modern
              Neonatal Intensive Care Unit (NICU), which is in the new Maternity
              Ward.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="hdu">
            <AccordionTrigger>High Dependency Unit</AccordionTrigger>
            <AccordionContent>
              The High Dependency Unit serves to offer patients a place to
              transition from the Critical Care Unit while still needing close
              monitoring. Similarly, patients who do not require admission to
              CCU but are too sick to be in the wards are admitted in the unit.
              It comprises of five ward beds and two isolation rooms.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="covid">
            <AccordionTrigger>COVID-19 Isolation ICU</AccordionTrigger>
            <AccordionContent>
              The UN-TNH Treatment Facility was created to serve both UN staff
              and Kenyans with complex COVID-19 management needs. It has 18 ICU
              beds and 45 HDU beds, all convertible to ICU beds. The facility
              includes dialysis and ECMO, a first in East and Central Africa.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default HighCriticalCare;
