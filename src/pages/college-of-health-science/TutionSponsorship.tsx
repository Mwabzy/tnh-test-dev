import React, { useState } from "react";

const TuitionSponsorship = () => {
  const [activeTab, setActiveTab] = useState("basic");

  const postBasicPrograms = [
    {
      title: "Kenya Registered Oncology Nursing (KRON)",
      mode: "Full-time",
      duration: "1 year",
      intake: "September of each year",
      capacity: "30",
      tuition: "KSh. 273,150 per year",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Tuition & Sponsorship</h1>

      {/* Tabs */}
      <div className="flex space-x-6 border-b border-gray-200 mb-6">
        <button
          className={`pb-2 ${
            activeTab === "basic"
              ? "border-b-2 border-black font-medium"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("basic")}
        >
          Basic Nursing
        </button>
        <button
          className={`pb-2 ${
            activeTab === "post"
              ? "border-b-2 border-black font-medium"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("post")}
        >
          Post-Basic Nursing
        </button>
      </div>

 
      {activeTab === "basic" && (
        <div>
          <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
            <img
              src="https://images.pexels.com/photos/5206922/pexels-photo-5206922.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Basic Nursing Program"
              className="rounded-md object-cover w-full md:w-1/2"
            />
            <div className="md:w-1/2">
              <h2 className="text-lg font-semibold mb-2">
                Kenya Registered Nursing (KRN) Program
              </h2>
              <p className="text-sm text-gray-700 mb-4">
                The KRN program at Nursing Academy offers comprehensive training
                in nursing practice, preparing students for registration as
                nurses in Kenya. The program combines theoretical knowledge with
                practical experience in diverse healthcare settings.
              </p>

              <h3 className="text-md font-semibold mb-4 mt-8">
                Minimum Entry Requirements
              </h3>
              <ul className="space-y-3 text-sm text-gray-800">
                <li className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <span>
                    KCSE mean grade of C+ (plus)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <span>
                    Minimum of C+ in English, Biology, and Chemistry
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <span>
                    Minimum of C in Mathematics or Physics
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <span>
                    Must be a Kenyan citizen or have a valid student visa
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-md font-semibold mb-4">Program Details</h3>
            <ul className="text-sm space-y-2">
              <li className="grid grid-cols-2 border-b py-2">
                <span>Mode of Study</span>
                <span className="text-gray-700">Full-time</span>
              </li>
              <li className="grid grid-cols-2 border-b py-2">
                <span>Duration</span>
                <span className="text-gray-700">4 years</span>
              </li>
              <li className="grid grid-cols-2 border-b py-2">
                <span>Intake Periods</span>
                <span className="text-gray-700">January & July</span>
              </li>
              <li className="grid grid-cols-2 border-b py-2">
                <span>Student Capacity</span>
                <span className="text-gray-700">
                  100 students per intake
                </span>
              </li>
              <li className="grid grid-cols-2 border-b py-2">
                <span>Annual Tuition Fees</span>
                <span className="text-gray-700">Ksh 199,000</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Post-Basic Nursing Content */}
      {activeTab === "post" && (
        <div>
          <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
            <img
              src="https://img.freepik.com/free-photo/portrait-happy-african-american-woman-surgeon-standing-operating-room-ready-work-patient-female-medical-worker-surgical-uniform-operation-theater_657921-38.jpg?w=740"
              alt="Post-Basic Nursing Program"
              className="rounded-md object-cover w-full md:w-1/2"
            />
            <div className="md:w-1/2">
              <h2 className="text-lg font-semibold mb-2">
                Post-Basic Nursing Programs
              </h2>
              <p className="text-sm text-gray-700 mb-4">
                The post-basic nursing program is designed for registered nurses
                seeking to advance their skills in specialized areas such as
                oncology nursing. These programs combine advanced clinical
                training and research-based practice.
              </p>

              <h3 className="text-md font-semibold mb-4 mt-8">
                Minimum Entry Requirements
              </h3>
              <ul className="space-y-3 text-sm text-gray-800">
                <li className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <span>Be a Registered Nurse</span>
                </li>
                <li className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <span>
                    Have one-year post-registration work experience
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <span>Have a valid nursing practice license</span>
                </li>
              </ul>
            </div>
          </div>

          {postBasicPrograms.map((program, idx) => (
            <div key={idx} className="mb-8">
              <h3 className="text-md font-semibold mb-4">
                {program.title} – Program Details
              </h3>
              <ul className="text-sm space-y-2">
                <li className="grid grid-cols-2 border-b py-2">
                  <span>Mode of Study</span>
                  <span className="text-gray-700">{program.mode}</span>
                </li>
                <li className="grid grid-cols-2 border-b py-2">
                  <span>Duration</span>
                  <span className="text-gray-700">{program.duration}</span>
                </li>
                <li className="grid grid-cols-2 border-b py-2">
                  <span>Intake Period</span>
                  <span className="text-gray-700">{program.intake}</span>
                </li>
                <li className="grid grid-cols-2 border-b py-2">
                  <span>Student Capacity</span>
                  <span className="text-gray-700">{program.capacity}</span>
                </li>
                <li className="grid grid-cols-2 border-b py-2">
                  <span>Tuition Fee</span>
                  <span className="text-gray-700">{program.tuition}</span>
                </li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TuitionSponsorship;
