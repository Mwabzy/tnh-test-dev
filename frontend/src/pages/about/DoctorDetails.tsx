import { FC, useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router";
import { fetchDoctorById, fetchClinicalServices } from "@/api/api";

export interface Doctor {
  id: string | number;
  name: string;
  role: string;
  image?: { id: number; url: string; alt?: string }[] | null;
  bio?: string;
  description?: string[] | string;
  languages?: string[];
  email?: string;
  phone?: string;
  clinicDepartment?: string;
  schedule?: string[];
  location?: string;
  licensingDetails?: string;
  awards?: string[];
  research_publications?: string[];
  services_offered?: number[]; // IDs from backend
  socialMediaWebsite?: string[];
}

export interface ClinicalService {
  id: number;
  name: string;
}

const DoctorDetails: FC = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allServices, setAllServices] = useState<ClinicalService[]>([]);

  // Fetch all clinical services
  useEffect(() => {
    async function loadServices() {
      try {
        const services = await fetchClinicalServices();
        setAllServices(services);
      } catch (err) {
        console.error("Failed to load services", err);
      }
    }
    loadServices();
  }, []);

  // Load doctor by ID
  useEffect(() => {
    if (!id) return;

    const numericId = Number(id);
    if (isNaN(numericId)) {
      setError("Invalid doctor ID.");
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchDoctorById(numericId)
      .then((data) => {
        setDoctor(data);
        setError(null);
      })
      .catch(() => setError("Doctor not found."))
      .finally(() => setLoading(false));
  }, [id]);

  // Filter services offered by this doctor
  const servicesOffered = useMemo(() => {
    if (!doctor || !allServices || !doctor.services_offered) return [];
    return allServices.filter((service) =>
      doctor.services_offered!.includes(service.id)
    );
  }, [doctor, allServices]);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  if (error || !doctor)
    return (
      <p className="text-center mt-10 text-red-600 font-semibold text-lg">
        {error || "Doctor not found."}
      </p>
    );

  // Image handling
  const imageSrc =
    Array.isArray(doctor.image) && doctor.image.length > 0
      ? doctor.image[0].url
      : "/placeholder-doctor.png";

  const imageAlt =
    Array.isArray(doctor.image) && doctor.image.length > 0
      ? doctor.image[0].alt || doctor.name
      : doctor.name;

  // Description
  const descriptionArray = doctor.description
    ? Array.isArray(doctor.description)
      ? doctor.description
      : [doctor.description]
    : doctor.bio
    ? [doctor.bio]
    : [];

  // Awards and publications
  const awards = Array.isArray(doctor.awards) ? doctor.awards : [];
  const publications = Array.isArray(doctor.research_publications)
    ? doctor.research_publications
    : [];

  const firstParagraph = descriptionArray.length > 0 ? descriptionArray[0] : "";

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-52 h-64 object-cover rounded-2xl shadow-xl border-2 border-gray-500"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-red-900">
              {doctor.name}
            </h1>
            <p className="text-xl text-red-700 mt-1 italic">{doctor.role}</p>

            <p className="mt-5 text-gray-700 leading-relaxed max-w-xl">
              {firstParagraph}
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
              {doctor.email && (
                <p>
                  <span className="font-semibold text-gray-700">Email:</span>{" "}
                  <a
                    href={`mailto:${doctor.email}`}
                    className="text-red-700 hover:underline"
                  >
                    {doctor.email}
                  </a>
                </p>
              )}
              {doctor.phone && (
                <p>
                  <span className="font-semibold text-gray-700">Phone:</span>{" "}
                  <a
                    href={`tel:${doctor.phone}`}
                    className="text-red-700 hover:underline"
                  >
                    {doctor.phone}
                  </a>
                </p>
              )}
              {doctor.clinicDepartment && (
                <p>
                  <span className="font-semibold text-gray-700">
                    Department:
                  </span>{" "}
                  {doctor.clinicDepartment}
                </p>
              )}
              {doctor.location && (
                <p>
                  <span className="font-semibold text-gray-700">Location:</span>{" "}
                  {doctor.location}
                </p>
              )}
              {doctor.licensingDetails && (
                <p className="sm:col-span-2">
                  <span className="font-semibold text-gray-700">
                    Licensing:
                  </span>{" "}
                  {doctor.licensingDetails}
                </p>
              )}
            </div>

            {doctor.languages && doctor.languages.length > 0 && (
              <div className="mt-6">
                <span className="font-semibold text-gray-700">Languages:</span>{" "}
                <span className="text-gray-700">
                  {doctor.languages.join(", ")}
                </span>
              </div>
            )}

            {doctor.schedule && doctor.schedule.length > 0 && (
              <div className="mt-6">
                <span className="font-semibold text-gray-700">Schedule:</span>
                <ul className="list-disc list-inside mt-1 text-gray-700 space-y-1">
                  {doctor.schedule.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {descriptionArray.length > 1 && (
          <section className="mt-16 border-t border-indigo-200 pt-10">
            <h2 className="text-3xl font-semibold text-red-900 mb-6">
              About {doctor.name}
            </h2>
            <div className="space-y-5 text-gray-700 leading-relaxed max-w-4xl">
              {descriptionArray.slice(1).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>
        )}

        <section className="mt-12 grid md:grid-cols-3 gap-10">
          {servicesOffered.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-red-800 mb-3 border-b border-indigo-300 pb-1">
                Services Offered
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {servicesOffered.map((service) => (
                  <li key={service.id}>
                    <Link
                      to={`/service-detail/${service.id}`}
                      className="text-red-700 hover:underline"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {awards.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-red-800 mb-3 border-b border-indigo-300 pb-1">
                Awards & Recognition
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {awards.map((award, i) => (
                  <li key={i}>{award}</li>
                ))}
              </ul>
            </div>
          )}

          {publications.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-red-800 mb-3 border-b border-indigo-300 pb-1">
                Research & Publications
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {publications.map((pub, i) => (
                  <li key={i}>{pub}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default DoctorDetails;
