import Heading from "@/components/Heading";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { FC } from "react";
import InsuranceSlider from "../home/InsuranceSlider";
import OpcList from "../patients-visitors/outpatient-centers/OutpatientCenterList";
import ContactForm from "@/components/ContactForm";

type ContactProps = object;

const Contact: FC<ContactProps> = () => {
  return (
    <div>
      <Heading
        image_url="https://cms.thenairobihosp.org/uploads/contact_us_8fbeb1073c.jpg"
        style="image"
        title="Contact Us"
        description="We are here to help you. Reach out to us for any inquiries or assistance."
      />
      <ContactForm contactInfo={{
                    phone: "+254 703 082 000",
                    emails: [
                      { type: "general", address: "hosp@nbihosp.org" },
                      { type: "medical", address: "medicalenquiries@nbihosp.org" },
                      { type: "service", address: "customer.service@nbihosp.org" },
                      { type: "clinic", address: "clinic@nbihosp.org" },
                    ],
                  }} />
      <OpcList />
      <TestimonialCarousel testimonials={[
        {
          name: "Sarah Johnson",
          title: "Patient",
          image: "/assets/testimonials/sarah-johnson.jpg",
          quote: "The cardiology team at The Nairobi Hospital saved my life. Their care and expertise are unmatched.",
        },
        {
          name: "John Smith",
          title: "Patient",
          image: "/assets/testimonials/john-smith.jpg",
          quote: "I am grateful for the exceptional care I received from the cardiology team.",
        },
      ]} />
      <InsuranceSlider />
    </div>
  );
};

export default Contact;
