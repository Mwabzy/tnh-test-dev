import patient from "@/assets/static/patient-icon.png";
import location from "@/assets/static/location-icon.png";
import doctor from "@/assets/static/doctors-icon.png";
import { useNavigate } from "react-router";

const Features = () => {
  const navigate = useNavigate();
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
              Find a Doctor
            </h3>
            <p className=" mt-2">
              Connecting you to trusted Doctors anytime, anywhere Wheather you
              need a routine check-up, Specialist advice, or Urgent Care.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="flex flex-col items-center space-y-2 shadow-xl p-6 md:p-6 cursor-pointer hover:shadow-2xl transition-shadow duration-300 ease-in-out"
            onClick={() => navigate("/clinical-services")}
          >
            <img src={patient} alt="Icon 2" className="h-12 w-12 " />
            <h3 className="text-lg font-semibold  text-red-900">
              Clinical Services
            </h3>
            <p className="mt-2">
              The Nairobi Hospital offers a wide range of clinical services to
              meet the healthcare needs of our patients.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="flex flex-col items-center space-y-2 shadow-xl p-6 cursor-pointer hover:shadow-2xl transition-shadow duration-300 ease-in-out"
            onClick={() => navigate("/outpatient-clinics")}
          >
            <img src={location} alt="Icon 3" className="h-12 w-12" />
            <h3 className="text-lg font-semibold text-red-900">
              Getting to the Hospital
            </h3>
            <p className="mt-2">
              We want your visit to be easy. Find directions, parking, and
              transport info. Visit our Location & Directions page.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
