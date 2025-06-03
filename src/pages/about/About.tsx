import Heading from "@/components/Heading";
import { FC } from "react";
import Opc from "../home/opc";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import InsuranceSlider from "../home/InsuranceSlider";
import ContactForm from "@/components/ContactForm";

type AboutProps = object;

const About: FC<AboutProps> = () => {
  return (
    <>
      <Heading
        image_url="https://cms.thenairobihosp.org/uploads/who_we_are_8fbeb1073c.jpg"
        style="image"
        title="Who We Are"
        description="The Nairobi Hospital is a non-profit organization that is leading in medical expertise and service provision, with deservedly earned recognition throughout East Africa and beyond as an advanced diagnostic, treatment and referral centre."
      />

      <div className=" bg-orange-200">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col items-center justify-center mt-11">
            <h1 className="text-5xl font-bold font-serif text-center text-red-900 text-lg md:text-4xl">
              70+ Years of Healthcare <br /> with a difference.
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
                Vision
              </h3>
              <p className="text-gray-700 text-sm">
                The renowned modern patient-centered healthcare facility in an
                atmosphere of trust, safety and comfort.
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
                Mission
              </h3>
              <p className="text-gray-700 text-sm">
                To offer exceptional multi-specialty healthcare services by
                harnessing innovative, dynamic & integrational patient-centered
                strategies, towards achieving sustainable growth.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mt-11 w-full flex-col md:flex-row">
          <div className="w-[80%] md:w-[50%]">
            <h1 className="text-4xl font-medium font-serif text-left text-red-900">
              Compassionate Care by Expert <br /> Healthcare Professionals
            </h1>
            <p className="text-gray-700 text-sm leading-relaxed mt-4">
              We take pride in our highly qualified professionals who deliver
              our mission every day, translating their knowledge and expertise
              to internationally compliant practices in healthcare provision.
              Courtesy, consideration and unreserved respect towards our
              patients’ privacy, dignity and confidentiality have helped us earn
              their trust and goodwill time and again. Our dedicated nursing
              staff provides professional care within a friendly and comfortable
              environment, ensuring a pleasant and anxiety-free time in hospital
              for our patients and their families.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center w-[90%] md:w-[40%] bg-red-900 rounded-lg shadow-lg px-6 py-4 text-white mt-8 md:mt-0">
            <div className="p-4">
              <h2 className="text-2xl font-medium font-serif mb-4">
                What We value
              </h2>
              <ul className="text-gray-200 text-sm space-y-2 list-disc list-item">
                <li>
                  <strong>Dedication:</strong> Efficient service and great value
                  for patients and families.
                </li>
                <li>
                  <strong>Empathy:</strong> Warm, friendly, and caring
                  environment for recovery.
                </li>
                <li>
                  <strong>Inspiration:</strong> Empowering staff to achieve
                  extraordinary goals and careers.
                </li>
                <li>
                  <strong>Quality:</strong> Superior performance and quality to
                  strengthen the hospital’s core.
                </li>
                <li>
                  <strong>Partnerships:</strong> Strong internal and external
                  collaborations.
                </li>
                <li>
                  <strong>Integrity & Accountability:</strong> Honoring
                  commitments under high accountability.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between mt-11 w-full space-y-8 md:space-y-0 md:flex-row">
          <div className="flex flex-col items-center justify-center text-center text-red-900">
            <h2 className="text-5xl font-medium font-serif mb-4">22+</h2>
            <p className="text-xl font-serif">Specialists</p>
          </div>

          <div className="flex flex-col items-center justify-center text-center text-red-900">
            <h2 className="text-5xl font-medium font-serif mb-4">70+</h2>
            <p className="text-xl font-serif">Healthcare Experience</p>
          </div>

          <div className="flex flex-col items-center justify-center text-center text-red-900">
            <h2 className="text-5xl font-medium font-serif mb-4">80%</h2>
            <p className="text-xl font-serif">Patient Satisfaction</p>
          </div>

          <div className="flex flex-col items-center justify-center text-center text-red-900">
            <h2 className="text-5xl font-medium font-serif mb-4">40M+</h2>
            <p className="text-xl font-serif">Patients Treated</p>
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
