// AlumniInfo.tsx
import ContactForm from "@/components/ContactForm";
import Heading from "@/components/Heading";
import React from "react";

const alumniData = {
  vision:
    "To be the center of excellence in health care training in the region providing world class professional education and service",
  mission:
    "To train world class health care professionals by offering excellent training, engaging in research, and community outreach using cutting edge technology and innovation.",
  values: [
    "Excellence",
    "Respect",
    "Educational access",
    "Holistic development",
    "Integrity",
    "Partnership",
  ],
  objectivesTitle:
    "The Objectives of the Cecily McDonell CHS Alumni Association",
  objectives: [
    "To encourage, foster, and promote close relations among the alumni themselves.",
    "To promote a sustained sense of belonging to The Nairobi Hospital Cecily McDonell School of Nursing to Alumni by being in regular contact with them.",
    "To provide and disseminate information regarding Cecily McDonell CHS, its graduates, faculties, and students to the Alumni.",
    "To assist and support the efforts in obtaining funds for development and support for the needy students.",
    "To guide and assist the Alumni who have recently completed their courses of study to keep them engaged in productive pursuits useful to society.",
    "To provide a forum for the Alumni for exchange of ideas on academic, cultural and social issues of the day by organizing and coordinating reunion activities of the Alumni.",
    "To let the Alumni, acknowledge their gratitude to the Cecily McDonell CHS.",
  ],
  registrationTitle: "Membership Registration & Subscriptions",
  registrationInfo: [
    "Registration fee is Ksh. 500.",
    "Subscription fees of Ksh. 200 per month or Ksh. 2,400 per annum.",
  ],
  accountTitle: "Cecily McDonell CHS Alumni Association Account",
  accountDetails: [
    "The account number is 5503210019.",
    "The account name is Sara, Frederick & Margaret.",
    "The Pay Bill Number is 880100",
  ],
};

const AlumniInfo: React.FC = () => {
  return (
    <>
      <Heading
        image_url="https://lh3.googleusercontent.com/aida-public/AB6AXuBCBXUN1JxBmGMt8j6gJYC7YdQjw94pMuRi4rHhD-ruDxkZ5WVj7Da-q34shVdYoC0FvSgUFRU3hAyjy7uaSvsYrtZvR3S5plT67Y7c7USNMfg-qW7PCuhvGXktJWWWNg5MenYv3lW8rNRtUudE6iXkLwq9YnPURXb-f1J6Mrnk2uoBUqQ9Hj4YGucKbOmR9eMRWqcTvmsxt70nahOEjx-8PXEMjxq37qSUL-rZfDi6wRKx00r7LZMOqALWasn4JIrww1Y8bB9w7Auf"
        title="College of Health Sciences"
        description="College Alumni Information"
        style="image"
      />

      <div className="bg-white p-8 max-w-7xl shadow-xl my-8 mx-4 rounded-md md:mx-auto text-gray-800">
        <h1 className="text-2xl font-bold mb-4 text-center">
          The Nairobi Hospital College of Health Sciences Alumni
        </h1>

        <div className="mb-6">
          <p>
            <span className="font-bold">Vision:</span> {alumniData.vision}
          </p>
          <p className="mt-2">
            <span className="font-bold">Mission:</span> {alumniData.mission}
          </p>
          <p className="mt-2">
            <span className="font-bold">Values:</span>{" "}
            {alumniData.values.join(", ")}.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            {alumniData.objectivesTitle}
          </h2>
          <ol className="list-decimal list-inside space-y-1">
            {alumniData.objectives.map((obj, i) => (
              <li key={i}>{obj}</li>
            ))}
          </ol>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-red-800 mb-2">
              {alumniData.registrationTitle}
            </h2>
            <ol className="list-decimal list-inside space-y-1">
              {alumniData.registrationInfo.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-red-800 mb-2">
              {alumniData.accountTitle}
            </h2>
            <ol className="list-decimal list-inside space-y-1">
              {alumniData.accountDetails.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <div className="border-2 shadow-xl my-8 w-[90%] p-4 rounded-md mx-auto text-gray-800">
        <ContactForm contactInfo={{ phone: "+254 703 082 000" }} />
      </div>
    </>
  );
};

export default AlumniInfo;
