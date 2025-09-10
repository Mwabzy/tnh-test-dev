import Heading from "@/components/Heading";
import { FC } from "react";

import { CheckCircle } from "lucide-react";
import { useIntlayer } from "react-intlayer";

type AdmissionChargesProps = object;

const AdmissionCharges: FC<AdmissionChargesProps> = () => {
  const content = useIntlayer("admission_charges");

  const guidelines = [
    content.guideline1,
    content.guideline2,
    content.guideline3,
    content.guideline4,
    content.guideline5,
    content.guideline6,
    content.guideline7,
    content.guideline8,
  ];

  return (
    <div>
      <Heading
        image_url="https://cms.thenairobihosp.org/uploads/admission_charges_8fbeb1073c.jpg"
        style="image"
        title={content.admissiontitle}
        description={content.admissiondesc}
      />
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center gap-2 mb-6">
          <CheckCircle className="text-red-700" size={28} />
          <h1 className="text-2xl font-semibold text-red-900">
            {content.admissionsubtitle}
          </h1>
        </div>

        <p className="mb-6 text-gray-700">{content.admissionp}</p>

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

        <p className="mt-6 text-sm text-gray-600">{content.admnote}</p>
      </section>
    </div>
  );
};

export default AdmissionCharges;
