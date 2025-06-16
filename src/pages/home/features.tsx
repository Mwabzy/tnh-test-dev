import patient from "@/assets/static/patient-icon.png";
import location from "@/assets/static/location-icon.png";
import doctor from "@/assets/static/doctors-icon.png";
import { useNavigate } from "react-router";
import { useIntlayer } from "react-intlayer";

const Features = () => {
  const navigate = useNavigate();
  const content = useIntlayer("featuresContent");
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-20  md:grid-cols-3 text-center">
          {/* Card 1 */}
          <div
            className="flex flex-col items-center space-y-2 shadow-xl p-6 md:p-6 cursor-pointer hover:shadow-2xl transition-shadow duration-300 ease-in-out"
            onClick={() => navigate("/booking")}
          >
            <img src={doctor} alt="Icon 1" className="h-12 w-12" />
            <h3 className="text-lg  font-semibold text-red-900">
              {" "}
              {content.find_doctor}
            </h3>
            <p className=" mt-2">{content.find_doctor_description} </p>
          </div>

          {/* Card 2 */}
          <div
            className="flex flex-col items-center space-y-2 shadow-xl p-6 cursor-pointer hover:shadow-2xl transition-shadow duration-300 ease-in-out"
            onClick={() => navigate("/clinical-services")}
          >
            <img src={patient} alt="Icon 2" className="h-12 w-12 " />
            <h3 className="text-lg font-semibold  text-red-900">
              {" "}
              {content.clinical_services}
            </h3>
            <p className="mt-2">
              {" "}
              {content.clinical_services_description}
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="flex flex-col items-center space-y-2 shadow-xl p-6 cursor-pointer hover:shadow-2xl transition-shadow duration-300 ease-in-out"
            onClick={() => navigate("/outpatient-clinics")}
          >
            <img src={location} alt="Icon 3" className="h-12 w-12" />
            <h3 className="text-lg font-semibold text-red-900">
              {" "}
              {content.getting_to_hospital}
            </h3>
            <p className="mt-2">
              {" "}
              {content.getting_to_hospital_description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
