import { FC, useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ClinicalService } from "@/types";
import { useIntlayer } from "react-intlayer";
import DOMPurify from "dompurify";
import { addClassesToDescription } from "@/components/services/utilities";
import { FaCalendarCheck } from "react-icons/fa";
import { applyDocumentSeo, trimMetaDescription } from "@/lib/seoDom";
import type { AppDispatch, RootState } from "@/store";
import { fetchDoctorEntry, fetchDoctorsList } from "@/store/doctorsSlice";
import { fetchServices } from "@/store/servicesSlice";

export interface Doctor {
  id: string | number;
  name: string;
  role: string;
  images?: { id: number; url: string; alt?: string }[] | null;
  // Backward-compatible fallback for older payloads.
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
  services_offered?: ClinicalService[]; // IDs from backend
  socialMediaWebsite?: string[];
}

const DoctorDetails: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { doctors, loading: doctorsLoading, initialized } = useSelector(
    (state: RootState) => state.doctors,
  );
  const services = useSelector((state: RootState) => state.services.services);
  const servicesLoading = useSelector((state: RootState) => state.services.loading);
  const [error, setError] = useState<string | null>(null);

  const content = useIntlayer("doctorContent");
  const numericId = Number(id);
  const doctor = useMemo(
    () => doctors.find((entry) => Number(entry.id) === numericId) ?? null,
    [doctors, numericId],
  );
  const servicesOffered = useMemo(
    () =>
      (doctor?.services_offered ?? [])
        .map((service) =>
          services.find((entry) => entry.id === service.id) ?? service,
        )
        .filter(Boolean) as ClinicalService[],
    [doctor, services],
  );

  useEffect(() => {
    if (!id) return;
    if (isNaN(numericId)) {
      setError("Invalid doctor ID.");
      return;
    }
    if (!initialized && !doctorsLoading) {
      void dispatch(fetchDoctorsList());
    }
    if (services.length === 0 && !servicesLoading) {
      void dispatch(fetchServices());
    }
    if (!doctor) {
      void dispatch(fetchDoctorEntry(numericId))
        .unwrap()
        .then(() => setError(null))
        .catch(() => setError("Failed to load doctor data."));
    } else {
      setError(null);
    }
  }, [
    dispatch,
    doctor,
    doctorsLoading,
    id,
    initialized,
    numericId,
    services.length,
    servicesLoading,
  ]);

  if (doctorsLoading && !doctor)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  if (error || !doctor)
    return (
      <p className="text-center mt-10 text-red-600 font-semibold text-lg">
        {error || "Doctor not found."}
      </p>
    );

  // Image handling: backend returns `images`; keep `image` as fallback.
  const doctorImages =
    Array.isArray(doctor.images) && doctor.images.length > 0
      ? doctor.images
      : Array.isArray(doctor.image) && doctor.image.length > 0
        ? doctor.image
        : [];

  const imageSrc =
    doctorImages.length > 0 ? doctorImages[0].url : "/placeholder-doctor.png";

  const imageAlt =
    doctorImages.length > 0 ? doctorImages[0].alt || doctor.name : doctor.name;

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

  useEffect(() => {
    if (!doctor) return;

    const description = trimMetaDescription(
      `${doctor.role || ""} ${firstParagraph}`.trim(),
      `${doctor.name} profile at The Nairobi Hospital.`,
    );
    const primaryImage =
      Array.isArray(doctor.images) && doctor.images.length > 0
        ? doctor.images[0].url
        : Array.isArray(doctor.image) && doctor.image.length > 0
          ? doctor.image[0].url
          : undefined;

    applyDocumentSeo({
      title: `${doctor.name} | The Nairobi Hospital`,
      description,
      canonicalPath: window.location.pathname,
      image: primaryImage,
    });
  }, [doctor, firstParagraph]);

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

            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  addClassesToDescription(firstParagraph) ?? "",
                ),
              }}
              className="mt-5 prose prose-gray max-w-xl text-gray-700 leading-relaxed prose-ul:list-disc prose-ol:list-decimal prose-ul:pl-6 prose-ol:pl-6"
            ></div>

            {/* Book Appointment Button */}
            <div className="mt-6">
              <Link
                to={`/booking-calendar?doctorId=${doctor.id}&doctorName=${encodeURIComponent(doctor.name)}&doctorTitle=${encodeURIComponent(doctor.role)}`}
                className="inline-flex w-full sm:w-auto max-w-full items-center gap-2 bg-red-900 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-red-800 transition-all duration-300 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
              >
                <FaCalendarCheck className="shrink-0" aria-hidden="true" />
                <span className="text-left whitespace-normal break-words leading-snug">
                  {content.bookappointment}{" "}
                  <span className="font-semibold">{doctor.name}</span>
                </span>
              </Link>
            </div>

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
                    {content.department}:
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
                    {content.licensingDetails}:
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
            <div className="space-y-5 max-w-4xl">
              {descriptionArray.slice(1).map((para, i) => (
                <div
                  key={i}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      addClassesToDescription(para) ?? "",
                    ),
                  }}
                  className="prose prose-gray max-w-none text-gray-700 leading-relaxed prose-ul:list-disc prose-ol:list-decimal prose-ul:pl-6 prose-ol:pl-6"
                ></div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-12 grid md:grid-cols-3 gap-10">
          {servicesOffered.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-red-800 mb-3 border-b border-indigo-300 pb-1">
                {content.servicecesOffered}
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {servicesOffered.map((service) => (
                  <li key={service.id}>
                    <Link
                      to={`/service-detail/${encodeURI(service.path || String(service.id))}`}
                      className="text-red-700 hover:underline"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {awards.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-red-800 mb-3 border-b border-indigo-300 pb-1">
                {content.awards}
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
                {content.researchPublications}
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
