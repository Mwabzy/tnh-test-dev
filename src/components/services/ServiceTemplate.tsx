import { Doctor, RelatedService } from "@/types";
import ContactForm, { ContactInfo } from "../ContactForm";
import ProfileCard from "./ProfileCard";
import RelatedServiceCard from "./RelatedServiceCard";
import Heading from "../Heading";
import { Mail, MapPin, Phone } from "lucide-react";
import TestimonialCarousel from "../TestimonialCarousel";

export interface ServiceTemplateProps {
  title: string;
  tagline: string;
  image: string;
  imageAlt: string;
  overview: string;
  features: string[];
  doctors: Doctor[];
  testimonial: { name: string; title: string; image: string; quote: string };
  contact: ContactInfo;
  relatedServices: RelatedService[];
}

const ServiceTemplate: React.FC<ServiceTemplateProps> = ({
  title,
  tagline,
  image,
  imageAlt,
  overview,
  features,
  doctors,
  testimonial,
  contact,
  relatedServices,
}) => {
  return (
    <>
      <Heading
        image_url={image}
        title={title}
        description={tagline}
        style="background"
      />

      <div className="flex flex-col lg:flex-row items-start justify-center w-full max-w-7xl mx-auto mt-8 gap-8">
        <div className="w-full lg:w-[70%] pr-10">
          {/* Service Overview */}
          <section className="mb-8 mx-5">
            <h2 className="text-2xl font-semibold mb-4">
              The Nairobi Hospital Cardiology Services
            </h2>
            <p className="text-gray-700 mb-4">{overview}</p>
            <ul className="list-disc pl-5 space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="text-gray-700">
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          {/* Additional Information */}
          <section className="mb-8">
            <div className="space-y-6 mx-5">
              {/* Our Team */}
              <div>
                <h3 className="text-xl font-medium mb-4 text-center">
                  Our Team
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                  {doctors.map((doctor, index) => (
                    <ProfileCard key={index} {...doctor} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="w-full lg:w-[30%]">
          <div className="flex items-center justify-center mb-8 mx-5">
            <img
              src={image}
              alt={imageAlt}
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

      <div>
        {/* Primary CTA (Contact Form) */}
        <section className="mb-8">
          <ContactForm contactInfo={contact} />
        </section>

        {/* Testimonial */}
        <TestimonialCarousel testimonials={[testimonial]} />

        {/* Related Services */}
        <section className="bg-red-50 py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-4xl font-bold text-red-900">
                  Related Services
                </h2>
              </div>
              <button className="hidden md:block bg-red-900 text-white py-2 px-4 rounded-lg shadow hover:bg-yellow-600">
                All Services
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row max-w-7xl mx-auto gap-6 items-center justify-center">
            {relatedServices.map((service, index) => (
              <RelatedServiceCard key={index} {...service} />
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <button className="md:hidden bg-red-900 text-white py-2 px-4 rounded-lg shadow hover:bg-yellow-600">
              All Services
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServiceTemplate;
