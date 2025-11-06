import { ClinicalService } from "@/types";
import ContactForm from "../ContactForm";
import ProfileCard from "./ProfileCard";
import RelatedServiceCard from "./RelatedServiceCard";
import Heading from "../Heading";
import { Mail, MapPin, Phone } from "lucide-react";
import TestimonialCarousel from "../TestimonialCarousel";
import clinicalServices from "@/data/clinicalServices2.json";
import { Link } from "react-router";

export interface ServiceTemplateProps {
  serviceTypes: ClinicalService;
}

const ServiceTemplate: React.FC<ServiceTemplateProps> = ({ serviceTypes }) => {
  const {
    images,
    title,
    tagline,
    detailedDescription,
    doctors,
    contact,
    features,
    isBookable,
    testimonials,
  } = serviceTypes;

  const mainImage = images?.[0];

  const allServices: ClinicalService[] = clinicalServices as ClinicalService[];

  const relatedServices = allServices
    .filter((service) => service.id !== serviceTypes.id) // exclude current service
    .slice(0, 2);

  return (
    <>
      {mainImage && (
        <Heading
          image_url={mainImage.url}
          title={title}
          description={tagline}
          style="background"
        />
      )}

      <div className="flex flex-col lg:flex-row items-start justify-center w-full max-w-7xl mx-auto mt-8 gap-8">
        <div className="w-full lg:w-[70%] pr-10">
          {/* Service Overview */}
          <section className="mb-8 mx-5">
            <h2 className="text-2xl font-semibold mb-4">{title}</h2>
            <p className="text-gray-700 mb-4">{detailedDescription}</p>
          </section>

          {/* Our Team */}
          {doctors && doctors.length > 0 && (
            <section className="mb-8">
              <div className="space-y-6 mx-5">
                <h3 className="text-xl font-medium mb-4 text-center">
                  Our Team
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                  {doctors.map((doctor) => (
                    <ProfileCard key={doctor.name} {...doctor} />
                  ))}
                </div>
              </div>
            </section>
          )}
          {features && features.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Key Features</h3>
              <ul className="list-disc pl-6 space-y-3">
                {features.map((feature, index) => (
                  <li key={index}>
                    <span className="font-semibold text-gray-900">
                      {feature.title}
                    </span>
                    {feature.description && (
                      <p className="text-gray-700 text-sm mt-1 ml-2">
                        {feature.description}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-[30%]">
          {mainImage && (
            <div className="flex items-center justify-center mb-8 mx-5">
              <img
                src={mainImage.url}
                alt={mainImage.alt || "Service image"}
                className="w-full rounded-xl shadow-md object-cover max-h-[300px]"
              />
            </div>
          )}

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
                <a href={`tel:${contact?.phone?.trim() || "+254703082000"}`}>
                  {contact?.phone?.trim() || "+254703082000"}
                </a>
              </span>
              <span className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-red-900" aria-label="Mail icon" />
                <a
                  href={`mailto:${
                    contact?.email?.trim() || "hosp@nbihosp.org"
                  }`}
                >
                  {contact?.email?.trim() || "hosp@nbihosp.org"}
                </a>
              </span>
              <div className="flex items-center gap-2">
                <MapPin
                  className="h-5 w-5 text-red-900"
                  aria-label="Location icon"
                />
                {contact?.address || "Argwings Kodhek Road, Nairobi"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form & Testimonials */}
      <div>
        {isBookable && (
          <ContactForm contactInfo={contact} title="Book an Appointment" />
        )}
        {testimonials && testimonials.length > 0 && (
          <TestimonialCarousel testimonials={testimonials} />
        )}

        {/* Related Services */}
        {relatedServices && relatedServices.length > 0 && (
          <section className="bg-red-50 py-12 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-bold text-red-900">
                  Related Services
                </h2>
                <Link
                  to="/clinical-services"
                  className="hidden md:block bg-red-900 text-white py-2 px-4 rounded-lg shadow hover:bg-yellow-600 cursor-pointer "
                >
                  All Services
                </Link>
              </div>
              <div className="flex flex-col md:flex-row max-w-7xl mx-auto gap-6 items-center justify-center">
                {relatedServices.map((service) => (
                  <RelatedServiceCard key={service.id} {...service} />
                ))}
              </div>
              <div className="flex justify-center mt-6">
                <button className="md:hidden bg-red-900 text-white py-2 px-4 rounded-lg shadow hover:bg-yellow-600">
                  All Services
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default ServiceTemplate;
