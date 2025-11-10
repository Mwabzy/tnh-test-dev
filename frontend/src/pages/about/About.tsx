import Heading from "@/components/Heading";
import { FC } from "react";
import Opc from "../home/opc";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import InsuranceSlider from '@/components/InsuranceSlider';
import ContactForm from "@/components/ContactForm";
import { useIntlayer } from "react-intlayer";

type AboutProps = object;

const About: FC<AboutProps> = () => {
  const content = useIntlayer("aboutUsPage");

  return (
    <>
      <Heading
        image_url="https://cms.thenairobihosp.org/uploads/who_we_are_8fbeb1073c.jpg"
        style="image"
        title={content.headingTitle[0]?.value ?? ""}
        description={content.headingContent[0]?.value ?? ""}
      />

      <div className=" bg-orange-200 5013667">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col items-center justify-center mt-11">
            <h1 className=" font-bold font-serif text-center text-red-900 text-lg md:text-4xl">
              {content.tagLine}
            </h1>
          </div>

          <div className="flex justify-center mt-11">
            <img
              src="https://cms.thenairobihosp.org/uploads/who_we_are_8fbeb1073c.jpg"
              alt="About Image"
              className="max-h-[60vh] object-cover rounded-lg shadow-lg w-full md:max-h-[50vh]"
            />
          </div>

          <div className="flex items-center justify-center mt-11 gap-4 w-full flex-col md:flex-row">
            <div className="p-6 rounded-xl text-center bg-gray-50 w-full md:w-1/2 min-h-[200px]">
              <div className="flex items-center justify-center">
                <img
                  src="https://cms.thenairobihosp.org/uploads/Frame_37f3952532.svg"
                  alt="Vision"
                />
              </div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                {content.visionTitle}
              </h3>
              <p className="text-gray-700 text-sm">
                {content.visionDescription}
              </p>
            </div>
            <div className="p-6 rounded-xl text-center bg-gray-50 w-full md:w-1/2 min-h-[200px]">
              <div className="flex items-center justify-center">
                <img
                  src="https://cms.thenairobihosp.org/uploads/mission_97f94cb17a.svg"
                  alt="Mission"
                />
              </div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                {content.missionTitle}
              </h3>
              <p className="text-gray-700 text-sm">
                {content.missionDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mt-11 w-full flex-col md:flex-row">
          <div className="w-[80%] md:w-[50%]">
            <h1 className="text-4xl font-medium font-serif text-left text-red-900">
              {content.sectionTitle}
            </h1>
            <p className="text-gray-700 text-sm leading-relaxed mt-4">
              {content.sectionDescription}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center w-[90%] md:w-[40%] bg-red-900 rounded-lg shadow-lg px-6 py-4 text-white mt-8 md:mt-0">
            <div className="p-4">
              <h2 className="text-2xl font-medium font-serif mb-4">
                {content.valuesTitle}
              </h2>
              <ul className="text-gray-200 text-sm space-y-2 list-disc list-item">
                <li>
                  <strong>{content.dedicationTitle}:</strong>
                  {content.dedicationDescription}
                </li>
                <li>
                  <strong>{content.empathyTitle}:</strong>{" "}
                  {content.empathyDescription}
                </li>
                <li>
                  <strong>{content.inspirationTitle}:</strong>{" "}
                  {content.inspirationDescription}
                </li>
                <li>
                  <strong>{content.qualityTitle}:</strong>{" "}
                  {content.qualityDescription}
                </li>
                <li>
                  <strong>{content.partnershipsTitle}:</strong>{" "}
                  {content.partnershipsDescription}
                </li>
                <li>
                  <strong>{content.integrityTitle}:</strong>{" "}
                  {content.integrityDescription}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between mt-11 w-full space-y-8 md:space-y-0 md:flex-row">
          <div className="flex flex-col items-center justify-center text-center text-red-900">
            <h2 className="text-5xl font-medium font-serif mb-4">22+</h2>
            <p className="text-xl font-serif">{content.specialists}</p>
          </div>

          <div className="flex flex-col items-center justify-center text-center text-red-900">
            <h2 className="text-5xl font-medium font-serif mb-4">70+</h2>
            <p className="text-xl font-serif">{content.healthcareExperience}</p>
          </div>

          <div className="flex flex-col items-center justify-center text-center text-red-900">
            <h2 className="text-5xl font-medium font-serif mb-4">80%</h2>
            <p className="text-xl font-serif">{content.patientSatisfaction}</p>
          </div>

          <div className="flex flex-col items-center justify-center text-center text-red-900">
            <h2 className="text-5xl font-medium font-serif mb-4">40M+</h2>
            <p className="text-xl font-serif">{content.patientsTreated}</p>
          </div>
        </div>
      </div>

      <Opc />
      <TestimonialCarousel
        testimonials={[
          {
            name: "Sarah Johnson",
            title: "Patient",
            image: "/assets/testimonials/sarah-johnson.jpg",
            quote:
              "The cardiology team at The Nairobi Hospital saved my life. Their care and expertise are unmatched.",
          },
          {
            name: "John Smith",
            title: "Patient",
            image: "/assets/testimonials/john-smith.jpg",
            quote:
              "I am grateful for the exceptional care I received from the cardiology team.",
          },
        ]}
      />
      <InsuranceSlider />
      <ContactForm
        contactInfo={{
          phone: "+254 703 082 000",
          emails: [
            { type: "general", address: "hosp@nbihosp.org" },
            { type: "medical", address: "medicalenquiries@nbihosp.org" },
            { type: "service", address: "customer.service@nbihosp.org" },
            { type: "clinic", address: "clinic@nbihosp.org" },
          ],
        }}
      />
    </>
  );
};

export default About;
