import { FC, useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import { FaUserMd, FaCalendarCheck } from "react-icons/fa";
import Heading from "@/components/Heading";
import ContactForm from "@/components/ContactForm";
import hospitalview from "@/assets/heroimages/heroimage2.jpg";
import { fetchDoctors } from "@/api/api";
import { PAGE_CONTACT_INFO } from "@/lib/contactInfo";

import { useIntlayer } from "react-intlayer";
import DOMPurify from "dompurify";
import { addClassesToDescription } from "@/components/services/utilities";

// Truncate bio to first 3 sentences
const truncateBioToThreeSentences = (
  bio: string,
  maxLength: number = 280,
): string => {
  if (!bio) return "";
  const sentences = bio.match(/[^.!?]+[.!?]+/g) || [bio];
  let result = sentences.slice(0, 3).join("").trim();
  if (result.length > maxLength)
    result = result.substring(0, maxLength).trim() + "...";
  else if (sentences.length > 3) result += "...";
  return result;
};

// Doctor type
type Doctor = {
  id: string;
  order?: number;
  name: string;
  role?: string;
  images: string[];
  bio: string;
  services_offered?: {
    id: number;
    title?: string;
    locations?: string[];
  }[];
  specialization?: string;
  medicalQualifications?: string;
  yearsOfExperience?: string;
  languagesSpoken?: string;
  contactEmail?: string;
  contactPhone?: string;
  clinicDepartment?: string;
  schedule?: string[];
  location?: string;
  locations?: string[];
  licensingDetails?: string;
  servicesOffered?: string[];
  awardsAndRecognition?: string[];
  ResearchAndPublications?: string[];
  socialMedia?: string;
  description?: string[];
  languages?: string[];
  email?: string;
  phone?: string;
  socialMediaWebsite?: string[];
};

const ITEMS_PER_PAGE = 6;

const sanitizeLocationValue = (value: unknown): string | null => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

const extractDoctorLocations = (doctor: any): string[] => {
  const unique = new Set<string>();

  const addLocation = (value: unknown) => {
    const cleaned = sanitizeLocationValue(value);
    if (cleaned) unique.add(cleaned);
  };

  // Backward-compatible direct location shapes
  addLocation(doctor?.location);
  if (Array.isArray(doctor?.locations)) {
    doctor.locations.forEach(addLocation);
  }

  // Primary source: locations on dashboard clinical services linked to doctor
  if (Array.isArray(doctor?.services_offered)) {
    doctor.services_offered.forEach((service: any) => {
      if (Array.isArray(service?.locations)) {
        service.locations.forEach(addLocation);
      }
      addLocation(service?.location);
    });
  }

  return Array.from(unique);
};

const DoctorProfiles: FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyClinic, setSpecialtyClinic] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [firstLetter, setFirstLetter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Fetch doctors from API
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setLoading(true);
        const data = await fetchDoctors();
        console.log("Fetched doctors data:", data);
        const ordered = Array.isArray(data)
          ? [...data].sort((a: any, b: any) => {
              const orderA = a.order ?? 0;
              const orderB = b.order ?? 0;
              if (orderA !== orderB) return orderA - orderB;
              return (a.id ?? 0) - (b.id ?? 0);
            })
          : [];
        const transformed = ordered.map((doc: any, idx: number) => {
          const doctorLocations = extractDoctorLocations(doc);

          return {
            ...doc,
            id: doc.id || `doctor-${idx}`,
            role: doc.role || doc.specialization || "",
            specialization: doc.specialization || doc.role || "",
            description: doc.bio ? [doc.bio] : [],
            languages: doc.languagesSpoken
              ? doc.languagesSpoken.split(/,|;/).map((s: string) => s.trim())
              : [],
            schedule: doc.schedule
              ? doc.schedule.split(/,|;|\n/).map((s: string) => s.trim())
              : [],
            socialMediaWebsite: doc.socialMedia ? [doc.socialMedia] : [],
            email: doc.contactEmail || "",
            phone: doc.contactPhone || "",
            locations: doctorLocations,
            location: doctorLocations[0] || "",
            images:
              doc.images?.map((img: any) => img.url).filter(Boolean) ||
              doc.image?.map((img: any) => img.url).filter(Boolean) ||
              [],
            awardsAndRecognition: doc.awardsAndRecognition
              ? Array.isArray(doc.awardsAndRecognition)
                ? doc.awardsAndRecognition
                : [doc.awardsAndRecognition]
              : [],
            ResearchAndPublications: doc.researchAndPublications
              ? Array.isArray(doc.researchAndPublications)
                ? doc.researchAndPublications
                : [doc.researchAndPublications]
              : [],
          };
        });
        setDoctors(transformed);
      } catch (err) {
        console.error(err);
        setError("Failed to load doctors.");
      } finally {
        setLoading(false);
      }
    };
    loadDoctors();
  }, []);

  const locations = useMemo(() => {
    const unique = new Set<string>();
    doctors.forEach((doctor) => {
      if (Array.isArray(doctor.locations)) {
        doctor.locations.forEach((loc) => {
          const cleaned = sanitizeLocationValue(loc);
          if (cleaned) unique.add(cleaned);
        });
      }
    });
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [doctors]);

  useEffect(() => {
    setSelectedLocations((prev) =>
      prev.filter((selected) =>
        locations.some(
          (available) =>
            available.toLowerCase().trim() === selected.toLowerCase().trim(),
        ),
      ),
    );
  }, [locations]);

  // Filters
  const filteredDoctors = doctors.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.role?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

    const matchesClinic = specialtyClinic
      ? member.clinicDepartment
          ?.toLowerCase()
          .includes(specialtyClinic.toLowerCase())
      : true;

    const doctorLocations = (
      Array.isArray(member.locations) ? member.locations : [member.location]
    )
      .map((loc) => sanitizeLocationValue(loc))
      .filter((loc): loc is string => Boolean(loc));

    const matchesLocation =
      selectedLocations.length > 0
        ? selectedLocations.some((selected) =>
            doctorLocations.some(
              (doctorLoc) =>
                doctorLoc.toLowerCase().trim() ===
                selected.toLowerCase().trim(),
            ),
          )
        : true;

    const matchesFirstLetter = firstLetter
      ? member.name.charAt(0).toLowerCase() === firstLetter.toLowerCase()
      : true;

    return (
      matchesSearch && matchesClinic && matchesLocation && matchesFirstLetter
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredDoctors.length / ITEMS_PER_PAGE);
  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handlePrev = () => currentPage > 1 && setCurrentPage((p) => p - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage((p) => p + 1);

  const toggleLocation = (loc: string) => {
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc],
    );
  };
  const content = useIntlayer("clinicalistContent");

  const resetFilters = () => {
    setSearchTerm("");
    setSpecialtyClinic("");
    setSelectedLocations([]);
    setFirstLetter("");
    setCurrentPage(1);
  };

  if (loading) return <p className="text-center mt-10">Loading doctors...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <>
      <Heading
        image_url={hospitalview}
        style="background"
        title={content.doctorProfiletitle?.[0]?.value}
        description={content.doctorProfiledescription?.[0]?.value}
      />

      <div className="flex flex-col lg:flex-row gap-6 mt-6 md:mx-40 mb-10">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-1/4 bg-white rounded-lg shadow-md border p-6 md:sticky md:top-28 h-fit">
          <h3 className="font-bold font-serif text-xl text-red-900 mb-6 pb-3">
            {content.narrowyoursearch}
          </h3>

          {/* Doctor Name Filter */}
          <div className="mb-6">
            <label className="block text-base font-serif font-semibold text-gray-800 mb-3">
              {content.doctorsname}
            </label>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search name..."
              className="w-full border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 rounded-md px-4 py-2 text-sm transition-colors duration-200"
            />
          </div>

          {/* Specialty Filter */}
          <div className="mb-6">
            <label className="block text-base font-serif font-semibold text-gray-800 mb-3">
              {content.doctorspecialty}
            </label>
            <input
              value={specialtyClinic}
              onChange={(e) => setSpecialtyClinic(e.target.value)}
              placeholder="e.g. Renal Unit"
              className="w-full border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 rounded-md px-4 py-2 text-sm transition-colors duration-200"
            />
          </div>

          {/* Location Filter */}
          <div className="mb-6">
            <label className="block text-base font-serif font-semibold text-gray-800 mb-3">
              {content.locationfilter}
            </label>
            {locations.length > 0 ? (
              <div className="space-y-2">
                {locations.map((loc) => (
                  <div key={loc} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedLocations.includes(loc)}
                      onChange={() => toggleLocation(loc)}
                      className="mr-3 w-4 h-4 text-red-600 border-2 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                    />
                    <span
                      className="text-sm text-gray-700 hover:text-red-900 cursor-pointer select-none"
                      onClick={() => toggleLocation(loc)}
                    >
                      {loc}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No locations available.</p>
            )}
          </div>

          {/* First Letter Filter */}
          <div className="mb-6">
            <label className="block text-base font-serif font-semibold text-gray-800 mb-3">
              {content.byfirstletter}
            </label>
            <div className="grid grid-cols-6 gap-2">
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  onClick={() => setFirstLetter(letter)}
                  className={`w-8 h-8 rounded-full text-sm font-medium border-2 transition-all duration-200 ${
                    firstLetter === letter
                      ? "bg-red-900 text-white border-red-900 shadow-md transform scale-105"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:border-red-300 hover:text-red-900"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={resetFilters}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-md transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md border border-gray-300"
          >
            {content.resetallFilters}
          </button>
        </div>

        {/* Doctors List */}
        <div className="flex-1">
          {paginatedDoctors.length > 0 ? (
            paginatedDoctors.map((member) => {
              const doctorRole =
                member.role?.trim() || member.specialization?.trim();
              const doctorImage = member.images[0] || "/placeholder-doctor.png";

              return (
                <div
                  key={member.id}
                  className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-lg shadow-md mb-6 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-2">
                    <img
                      src={doctorImage}
                      alt={member.name}
                      className="w-full md:w-56 md:h-60 object-cover rounded"
                    />
                  </div>
                  <div className="md:w-2/3 p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold font-serif text-red-900 mb-2">
                        {member.name}
                      </h3>
                      {doctorRole && (
                        <p className="inline-flex items-center rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs md:text-sm font-semibold text-red-800 mb-3">
                          {doctorRole}
                        </p>
                      )}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(
                            addClassesToDescription(
                              truncateBioToThreeSentences(member.bio),
                            ) ?? "",
                          ),
                        }}
                        className="prose prose-gray max-w-none text-gray-600 text-sm font-sans leading-relaxed prose-ul:list-disc prose-ol:list-decimal prose-ul:pl-6 prose-ol:pl-6"
                      ></div>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-4">
                      <Link
                        to={`/booking-calendar?doctorId=${member.id}`}
                        className="flex items-center justify-center gap-2 text-red-900 border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-red-50 hover:border-red-300 transition font-medium"
                      >
                        <FaCalendarCheck />
                        {content.bookingtitle}
                      </Link>
                      <Link
                        to={`/doctor-details/${member.id}`}
                        className="flex items-center justify-center gap-2 text-red-900 border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-red-50 hover:border-red-300 transition font-medium"
                      >
                        <FaUserMd />
                        {content.viewprofile}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500 mt-10">
              {content.noDoctorsFound}
            </p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      <ContactForm contactInfo={PAGE_CONTACT_INFO} />
    </>
  );
};

export default DoctorProfiles;
