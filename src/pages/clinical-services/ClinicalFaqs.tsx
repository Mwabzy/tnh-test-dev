import Heading from "@/components/Heading";
import { Mail, MapPin, Phone } from "lucide-react";
import { FunctionComponent } from "react";
import FAQs from "../clinics/FAQs";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import ContactForm from "@/components/ContactForm";

interface ClinicalFaqsProps {}

const ClinicalFaqs: FunctionComponent<ClinicalFaqsProps> = () => {
  return (
    <>
      <Heading
        style="background"
        title="Clinical FAQs"
        description="Frequently Asked Questions about our clinical services."
      />
      <div className="flex flex-col lg:flex-row items-start justify-center w-full max-w-7xl mx-auto mt-8 gap-8">
        <div className="w-full lg:w-[70%] pr-10">
          {/* Service Overview */}
          <section className="mb-8 mx-5">
            <h2 className="text-2xl font-semibold mb-4">
              The Nairobi Hospital Cardiology Services
            </h2>
            <p className="text-gray-700 mb-4">
              Frequently Asked Questions (FAQs) about our clinical services are
              designed to provide you with quick and easy access to important
              information. Whether you have questions about our services,
              procedures, or general inquiries, we aim to address your concerns
              effectively.
            </p>
          </section>
          <section className="mx-5 mb-18">
            <FAQs
                faqData={[
                    {
                    question: "What are the operating hours of the hospital?",
                    answer:
                        "The Nairobi Hospital operates 24/7, providing round-the-clock medical care.",
                    },
                    {
                    question: "How can I book an appointment?",
                    answer:
                        "You can book an appointment by calling our helpline or visiting our website.",
                    },
                    {
                    question: "What insurance plans do you accept?",
                    answer:
                        "We accept a wide range of insurance plans. Please contact our billing department for details.",
                    },
                    {
                    question: "Do you offer emergency services?",
                    answer:
                        "Yes, we have a fully equipped emergency department available 24/7.",
                    },
                ]}
            />
            </section>
        </div>

        <div className="w-full lg:w-[30%]">
          <div className="flex items-center justify-center mb-8 mx-5">
            <img
              src="https://images.unsplash.com/photo-1663465374413-83cba00bff6f?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Clinical FAQs"
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

      <div className="w-full  mt-8">
        <TestimonialCarousel
        testimonials={[
          {
            name: "Dr. Jane Doe",
            title: "Cardiologist",
            image: "https://images.unsplash.com/photo-1506812571787-1f8b2c4d3e5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
            quote: "The Nairobi Hospital provides exceptional care and support for all our patients.",
          },
          {
            name: "Dr. John Smith",
            title: "Cardiologist",
            image: "https://images.unsplash.com/photo-1506812571787-1f8b2c4d3e5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
            quote: "Our team is dedicated to providing the best possible care for our patients.",
          },
        ]}
        />
      <ContactForm
        contactInfo={{
          phone: "+254 703082000",
          emails: [
            { type: "general", address: ""}]
        }}
        />
      </div>
    </>
  );
};

export default ClinicalFaqs;
