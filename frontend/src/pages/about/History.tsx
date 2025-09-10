import Heading from "@/components/Heading";
import React, { useEffect, useState } from "react";

// Main History Section
const History: React.FC = () => {
  return (
    <>
      <Heading
        image_url="https://cms.thenairobihosp.org/uploads/who_we_are_8fbeb1073c.jpg"
        style="image"
        title="Our History"
        description="The Nairobi Hospital has a rich history. The
              foundation stone of what was to become the leading provider of
              healthcare services in the East African region, was laid on the
              morning of 20th October 1952 by none other than Sir Evelyn Baring,
              the then Governor of Kenya Colony."
      />

      <section className="bg-gray-50 py-12 px-4">
        <div>
          <div className="max-w-7xl mx-auto bg-white  rounded-lg shadow-lg p-4 mb-7">
            <div className="flex flex-col md:flex-row gap-4 item-center">
              <div>
                <img
                  src="https://cms.thenairobihosp.org/uploads/key_milestones_2133f54e6e.jpg"
                  alt="Milestone Visual"
                  className="rounded-md shadow"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-semibold text-red-900 font-serif mb-2">
                  Key Milestones
                </h3>
                <p className="text-gray-600 text-lg mb-4">
                  Since its inception, the Nairobi Hospital has been a “ground
                  breaker” medically, as well as socially. Below are some of our
                  key milestones:
                </p>
                <MilestoneCarousel />
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-red-900 mb-6 text-center">
              Our Rich History
            </h1>
            <p>
              <strong>The Nairobi Hospital</strong> has a rich history. The
              foundation stone of what was to become the leading provider of
              healthcare services in the East African region, was laid on the
              morning of 20th October 1952 by none other than Sir Evelyn Baring,
              the then Governor of Kenya Colony. This is the day our
              independence heroes were rounded up and the fight for
              self-determination began in earnest. At that moment of darkness in
              the history of our country, and in spite of the events of the
              night before, The Nairobi Hospital was born. Indeed, this
              historical twist resonates well with the institution’s guiding
              motto ‘Lux in Tenebris’ – Light in Darkness.
            </p>
          </div>
          <div className="flex justify-between items-center my-11 max-w-7xl mx-auto flex-col md:flex-row">
            <div className="w-full md:w-[50%]">
              <h1 className="text-4xl font-medium font-serif text-left text-red-900">
                Our Timelines
              </h1>
              <p className="text-gray-700 text-sm leading-relaxed mt-4">
                Opening its doors in 1954 as the European Hospital, the
                institution has grown from humble beginnings to a modern
                high-technology facility with more than 363 bed-capacity, six
                outpatient centers and a global medivac centre. In 1956, The
                Nairobi Hospital’s Cicely McDonnell School of Nursing was
                established. It was aptly named after Cicely McDonnell who had
                made immense personal contribution to the welfare and health
                Kenyans and set high professional standards for maternity
                nursing in Nairobi. Indeed, most graduates from the School of
                Nursing are absorbed into The Nairobi Hospital’s team. The
                combination of highly skilled medical specialists and modern
                medical and non-medical technology has placed the hospital in a
                position to undertake a wide range of routine and complex
                investigations and procedures including Open Heart Surgery,
                Kidney Transplants, Trauma Care, Orthopaedic Surgery,
                Neurosurgery, Laparoscopic Surgery, and Cancer Therapy among
                others. Today, The Nairobi Hospital is renowned for emergency
                and trauma care, disaster response and critical care and has
                excellent facilities for providing high-quality clinical and
                nursing care. The Anderson Specialty Centre opened in 2017 and
                has a variety of Specialty clinics including Orthopaedic, Well
                Baby and Executive Clinic.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center w-full md:w-[40%] bg-red-900 rounded-lg shadow-lg px-6 py-4 text-white mt-8 md:mt-0">
              <div className="p-4">
                <h2 className="text-2xl font-medium font-serif mb-4">
                  History of Firsts
                </h2>
                <p className=" mb-4 text-sm">
                  The Nairobi Hospital is a pacesetter in medical practice in
                  Kenya and has recorded several firsts locally and in the East
                  and Central African region with milestones that include:
                </p>
                <ul className="text-gray-200 text-sm space-y-2 list-disc list-item">
                  <li>First private nursing training college in Kenya</li>
                  <li>First institution to offer Diploma in Theatre Nursing</li>
                  <li>
                    First hospital to fit a duo chamber pacemaker on a patient
                  </li>
                  <li>First institution to offer hip replacement</li>
                  <li>First eye bank in East Africa</li>
                  <li>First complete video gastroenterology system</li>
                  <li>
                    First human papillomavirus (HPV) i.e. cancer of the cervix
                    testing
                  </li>
                  <li>First tumour markers testing facility</li>
                  <li>First hospital enterprise resource management system</li>
                  <li>First brachytherapy centre</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Milestone Carousel Component
const MilestoneCarousel: React.FC = () => {
  const milestones = [
    "1974: We performed the first Kidney transplant in Africa",
    "1981: First private hospital in East Africa to establish a Cardiac Unit",
    "1992: Launched the first Cancer Treatment Centre in the region",
    "2000: Introduced the first digital radiology system in Kenya",
    "2015: Pioneered robotic surgery in private healthcare",
    "2022: Opened the most advanced private ICU in East Africa",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % milestones.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [milestones.length]);

  return (
    <div className="">
      <div className="border-l-4 border-red-900 pl-4 text-red-900 font-semibold text-lg transition-all duration-500 ease-in-out min-h-[48px] flex items-center">
        {milestones[current]}
      </div>

      <div className="mt-4 flex space-x-2">
        {milestones.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index ? "bg-red-700" : "bg-gray-300"
            }`}
            aria-label={`Go to milestone ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default History;
