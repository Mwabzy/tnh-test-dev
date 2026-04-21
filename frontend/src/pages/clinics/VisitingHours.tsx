import Heading from "@/components/Heading";
//import { useIntlayer } from "react-intlayer";
import ContactForm from "@/components/ContactForm";
import { PAGE_CONTACT_INFO } from "@/lib/contactInfo";
import Bed from "@/assets/images/icu_bed.jpg";

const VisitingHours = () => {
  // const content = useIntlayer("clinicalistContent");

  const timings = [
    {
      period: "Afternoon",
      time: "12:00 PM - 1:00 PM",
    },
    {
      period: "Evening",
      time: "4:00 PM - 6:00 PM",
    },
  ];

  const title = "Visiting Hours";
  const tagline =
    "We welcome visitors during our designated hours. Please adhere to the scheduled times to ensure a comfortable environment for our patients.";

  return (
    <div className="min-h-screen bg-gray-50">
      <Heading
        image_url={Bed}
        title={title}
        description={tagline}
        style="background"
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {title}
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {timings.map((timing, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-lg font-semibold text-red-900 mb-2">
                  {timing.period}
                </h3>
                <p className="text-xl font-bold text-gray-800">{timing.time}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <p className="text-center text-gray-600">
              Please note that visiting hours may be restricted during special
              circumstances. For more information, please contact our reception.
            </p>
          </div>
        </div>
      </div>
      <ContactForm
        contactInfo={PAGE_CONTACT_INFO}
        title="Have any enquiries?"
      />
    </div>
  );
};

export default VisitingHours;
