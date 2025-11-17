import { teamMembers } from "./DoctorProfiles";
import { useParams } from "react-router";
import { FC } from "react";

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  image: string;
  description: string[];
  languages: string[];
  email?: string;
  phone?: string;
  clinicDepartment: string;
  schedule: string[];
  location: string;
  licensingDetails: string;
  awardsAndRecognition: string[];
  ResearchAndPublications: string[];
  servicesOffered: string[];
  socialMediaWebsite?: string[];
}

const DoctorDetails: FC = () => {
  const { id } = useParams();
  const user = teamMembers.find((person) => person.id === id);

  if (!user)
    return (
      <p className="text-center mt-10 text-red-600 font-semibold text-lg">
        Doctor not found.
      </p>
    );
  // compute image src safely (handle external URLs)
  const imageSrc = user.image && (user.image as string).startsWith("http") ? user.image : `/${user.image}`;

  // Ensure `description`, `awardsAndRecognition`, and `ResearchAndPublications` are arrays
  const descriptionArray: string[] = Array.isArray(user.description)
    ? user.description
    : user.description
    ? [user.description]
    : [];

  const awards: string[] = Array.isArray(user.awardsAndRecognition)
    ? user.awardsAndRecognition
    : user.awardsAndRecognition
    ? [user.awardsAndRecognition]
    : [];

  const publications: string[] = Array.isArray(user.ResearchAndPublications)
    ? user.ResearchAndPublications
    : user.ResearchAndPublications
    ? [user.ResearchAndPublications]
    : [];

  const firstParagraph = descriptionArray.length > 0 ? descriptionArray[0] : (user.bio || "");

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <img
            src={imageSrc}
            alt={user.name}
            className="w-52 h-64 object-cover rounded-2xl shadow-xl border-2 border-gray-500"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-red-900">
              {user.name}
            </h1>
            <p className="text-xl text-red-700 mt-1 italic">{user.title}</p>

            <p className="mt-5 text-gray-700 leading-relaxed max-w-xl">
              {firstParagraph}
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
              {user.email && (
                <p>
                  <span className="font-semibold text-gray-700">Email:</span>{" "}
                  <a
                    href={`mailto:${user.email}`}
                    className="text-red-700 hover:underline"
                  >
                    {user.email}
                  </a>
                </p>
              )}
              {user.phone && (
                <p>
                  <span className="font-semibold text-gray-700">Phone:</span>{" "}
                  <a
                    href={`tel:${user.phone}`}
                    className="text-red-700 hover:underline"
                  >
                    {user.phone}
                  </a>
                </p>
              )}
              <p>
                <span className="font-semibold text-gray-700">Department:</span>{" "}
                {user.clinicDepartment}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Location:</span>{" "}
                {user.location}
              </p>
              <p className="sm:col-span-2">
                <span className="font-semibold text-gray-700">Licensing:</span>{" "}
                {user.licensingDetails}
              </p>
            </div>

            <div className="mt-6">
              <span className="font-semibold text-gray-700">Languages:</span>{" "}
              <span className="text-gray-700">{(user.languages && user.languages.join) ? user.languages.join(", ") : (user.languages || user.languagesSpoken || "")}</span>
            </div>

            <div className="mt-6">
              <span className="font-semibold text-gray-700">Schedule:</span>
              {Array.isArray(user.schedule) ? (
                <ul className="list-disc list-inside mt-1 text-gray-700 space-y-1">
                  {user.schedule.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700 mt-1">{user.schedule || ""}</p>
              )}
            </div>
          </div>
        </div>

        <section className="mt-16 border-t border-indigo-200 pt-10">
          <h2 className="text-3xl font-semibold text-red-900 mb-6">
            About {user.name}
          </h2>
          <div className="space-y-5 text-gray-700 leading-relaxed max-w-4xl">
            {descriptionArray.slice(1).map((para: string, i: number) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        <section className="mt-12 grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-2xl font-semibold text-red-800 mb-3 border-b border-indigo-300 pb-1">
              Services Offered
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {user.servicesOffered.map((service, i) => (
                <li key={i}>{service}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-red-800 mb-3 border-b border-indigo-300 pb-1">
              Awards & Recognition
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {awards.map((award: string, i: number) => (
                <li key={i}>{award}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-red-800 mb-3 border-b border-indigo-300 pb-1">
              Research & Publications
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {publications.map((pub: string, i: number) => (
                <li key={i}>{pub}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DoctorDetails;
