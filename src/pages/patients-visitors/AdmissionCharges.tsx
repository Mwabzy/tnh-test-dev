import Heading from "@/components/Heading";
import { FC } from "react";

import { CheckCircle } from "lucide-react";

const guidelines = [
  "Overnight admission is required for all major surgeries scheduled.",
  "Patients coming directly from the admitting doctor should present a completed pre-admission form at the admission desk.",
  "Patients are required to present negative COVID-19 test results, not older than 3 days upon admission.",
  "Patients booked for day surgeries must present themselves at the hospital two hours prior to the time of the planned surgery.",
  "The attending consultant is required to be on the pre-approved panel list of doctors for third-party payers and if not, approval should be sought from the insurance before admission.",
  "A full deposit should be made before or upon admission for all cash paying patients.",
  "The hospital will require the following for all scheduled/day cases:\n• A letter of undertaking from your employer\n• A duly filled preauthorization form and a letter of undertaking from your insurance on the day of admission",
  "All emergency admissions from the doctor's clinic must be accompanied by a completed preauthorization form.",
  "All NHIF contributors will be required to provide the following:\n• A valid NHIF card, with up-to-date contributions\n• Identification documents of the contributor and/or dependant that were used during the NHIF registration\n• If the patient is a dependant (spouse or child) they must be listed on the contributor's card\n• If the dependant is above the age of 21 and is schooling, a letter from their learning institution bearing a reference number will be required.",
];

const dischargeNote = `The discharge process should take a maximum of 2 hours where all the required documents are available. 
Should it take longer, please contact the nurse in charge of the ward you were admitted in for assistance.`;

type AdmissionChargesProps = object;

const AdmissionCharges: FC<AdmissionChargesProps> = () => {
  return (
    <div>
      <Heading
        image_url="https://cms.thenairobihosp.org/uploads/admission_charges_8fbeb1073c.jpg"
        style="image"
        title="Admission Charges"
        description="Explore our admission charges and ensure a smooth experience during your stay."
      />
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center gap-2 mb-6">
          <CheckCircle className="text-red-700" size={28} />
          <h1 className="text-2xl font-semibold text-red-900">
            Admissions & Discharge
          </h1>
        </div>

        <p className="mb-6 text-gray-700">
          Please observe the following guidelines for admission and planned
          theatre bookings, whether surgical or medical.
        </p>

        <div className="bg-white shadow-xl border-red-200 rounded-xl p-6 space-y-4">
          {guidelines.map((item, index) => (
            <div
              key={index}
              className="text-gray-800 text-sm whitespace-pre-line"
            >
              <span className="font-semibold text-red-700">{index + 1}. </span>
              {item}
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-gray-600">{dischargeNote}</p>
      </section>
    </div>
  );
};

export default AdmissionCharges;
