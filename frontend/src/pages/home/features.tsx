import patient from "@/assets/static/patient-icon.png";
import location from "@/assets/static/location-icon.png";
import doctor from "@/assets/static/doctors-icon.png";
import { useNavigate } from "react-router";
import { useIntlayer } from "react-intlayer";

const Features = () => {
  const navigate = useNavigate();
  const content = useIntlayer("featuresContent");

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-red-900 mb-4">
            Quick Accesss
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access our essential services quickly and efficiently
          </p>
        </div>

        <div className="grid gap-20 md:grid-cols-3 text-center">
          {/* Card 1 */}
          <div className="flex flex-col items-center justify-between bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <img src={doctor} alt="Icon 1" className="h-12 w-12 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">
              {content.find_doctor}
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              {content.find_doctor_description}
            </p>
            <button
              onClick={() => navigate("/doctor-profiles")}
              className="mt-4 w-full py-2 rounded-lg bg-red-900 text-white font-medium hover:bg-yellow-600 transition"
            >
              Search
            </button>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center justify-between bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <img src={patient} alt="Icon 2" className="h-12 w-12 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">
              {content.clinical_services}
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              {content.clinical_services_description}
            </p>
            <button
              onClick={() => navigate("/medical-tourism")}
              className="mt-4 w-full py-2 rounded-lg bg-red-900 text-white font-medium hover:bg-yellow-600 transition"
            >
              Learn More
            </button>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center justify-between bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <img src={location} alt="Icon 3" className="h-12 w-12 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">
              {content.getting_to_hospital}
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              {content.getting_to_hospital_description}
            </p>
            <button
              onClick={() => navigate("/outpatient-clinics")}
              className="mt-4 w-full py-2 rounded-lg bg-red-900 text-white font-medium hover:bg-yellow-600 transition"
            >
              Get Directions
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
