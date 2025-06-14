import Heading from "@/components/Heading";
import { Mail, MapPin, Phone } from "lucide-react";
import { FunctionComponent } from "react";
import FAQs from "../clinics/FAQs";
import ContactForm from "@/components/ContactForm";

interface CollegeFaqsProps {}

const CollegeFaqs: FunctionComponent<CollegeFaqsProps> = () => {
  return (
    <>
      <Heading
        style="background"
        title="College FAQs"
        description="Frequently Asked Questions aboutthe College of Health Sciences."
      />
      <div className="flex flex-col lg:flex-row items-start justify-center w-full max-w-7xl mx-auto mt-8 gap-8">
        <div className="w-full lg:w-[70%] pr-10">
          {/* Service Overview */}
          <section className="mb-8 mx-5">
            <h2 className="text-2xl font-semibold mb-4">
              The Nairobi Hospital College of Health Sciences
            </h2>
            <p className="text-gray-700 mb-4">
              Frequently Asked Questions (FAQs) about our school of nursing are
              designed to provide you with quick and easy access to important
              information. Whether you have questions about our services or
              general inquiries, we aim to address your concerns effectively.
            </p>
          </section>
          <section className="mx-5 mb-18">
            <FAQs
              faqData={[
                {
                  question: "When is it appropriate to submit my application?",
                  answer: "We accept applications throughout the year.",
                },
                {
                  question:
                    "After submission of the application, what is the next step?",
                  answer:
                    "You will be notified in writing when you are scheduled for an interview. The outcome of the interview will also be communicated roughly 2 weeks after the interview.",
                },
                {
                  question:
                    "What if I do not meet your minimum requirement, do you offer bridging courses?",
                  answer: "Unfortunately, we are not a center for bridging.",
                },
                {
                  question: "Do you offer certificate courses?",
                  answer: "No, our courses start at the diploma level.",
                },
                {
                  question:
                    "How long does it take to upgrade from the certificate in nursing to the diploma level?",
                  answer: "It will take 2 years to upgrade.",
                },
                {
                  question: "Do you accept credit transfers?",
                  answer:
                    "Yes, we accept credit transfers from recognized nursing institutions.",
                },
                {
                  question:
                    "Do you offer accommodation facilities, uniform and meals to students?",
                  answer:
                    "We provide accommodation at a fee. Meals are offered on a pay-as-you-eat (PAYE) basis. We guide students on where to purchase uniforms.",
                },
                {
                  question: "Do you provide books for nursing training?",
                  answer:
                    "No, but we have a fully equipped medical library with print and online resources.",
                },
                {
                  question: "Are visitors allowed to see the students?",
                  answer:
                    "Yes, but in accordance with the rules and regulations of the institution.",
                },
                {
                  question: "Do you allow time off during training?",
                  answer:
                    "Students are allowed 31 days of leave every training year. Days and nights off are outlined in the students’ handbook.",
                },
                {
                  question:
                    "Is your school accredited and by which organization?",
                  answer:
                    "Yes, we are accredited by the Nursing Council of Kenya (NCK) and the Technical and Vocational Education Training Authority (TVETA).",
                },
                {
                  question: "How many students do you admit per class?",
                  answer:
                    "Our maximum class size for the diploma class is 40 students. Post-basic courses may admit up to 30 students.",
                },
                {
                  question: "Do you have an age limit for KRN training?",
                  answer: "No, there is no set age limit.",
                },
                {
                  question: "Can I get employment abroad after training?",
                  answer:
                    "Yes, our nursing programs are recognized internationally.",
                },
                {
                  question:
                    "Am I guaranteed of a job at the Nairobi Hospital after training?",
                  answer: "Yes, after a successful recruitment process.",
                },
                {
                  question: "Can I get a scholarship for training?",
                  answer:
                    "We are working with the LEAP program for educational loans.",
                },
              ]}
            />
          </section>
        </div>

        <div className="w-full lg:w-[30%]">
          <div className="flex items-center justify-center mb-8 mx-5">
            <img
              src="https://img.freepik.com/premium-photo/young-woman-carries-oversized-books-her-head-with-question-marks-floating-around-air_176697-13098.jpg?ga=GA1.1.1216082383.1749889385&semt=ais_hybrid&w=740"
              alt="College FAQs"
              className="w-full rounded-xl shadow-md object-cover max-h-[300px]"
            />
          </div>
          <div className="w-full bg-red-50 h-min rounded-xl p-6 shadow-md text-sm text-gray-800">
            <h3 className="font-semibold mb-4 text-xl">
              Have Additional Questions?
            </h3>

            <div className="flex flex-col space-y-2 items-start text-lg">
              <span className="flex items-center gap-2">
                <Phone
                  className="h-5 w-5 text-red-900"
                  aria-label="Phone icon"
                />
                <a href="tel:+254703082000">+254 703082000</a>
              </span>
              <span className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-red-900" aria-label="Mail icon" />
                <a href="mailto:hosp@nbihosp.org">hosp@nbihosp.org</a>
              </span>
              <div className="flex items-center gap-2">
                <MapPin
                  className="h-5 w-5 text-red-900"
                  aria-label="Location icon"
                />
                Argwings Kodhek Road, Nairobi
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-2 shadow-xl my-2 w-[90%] p-4 mb-8 rounded-md mx-auto text-gray-800">
        <ContactForm contactInfo={{ phone: "+254 703 082 000" }} />
      </div>
    </>
  );
};

export default CollegeFaqs;
