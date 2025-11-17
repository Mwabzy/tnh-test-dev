import { FC, useState } from "react";
import ContactForm from "@/components/ContactForm";
import hospitalview from "@/assets/heroimages/heroimage2.JPG";
import Heading from "@/components/Heading";
import { FaUserMd, FaCalendarCheck } from "react-icons/fa";
import { Link } from "react-router";
import doctorsData from "@/data/doctors.json";

type Doctor = {
  name: string;
  title: string;
  image: string;
  bio: string;
  specialization: string;
  medicalQualifications: string;
  yearsOfExperience: string;
  languagesSpoken: string;
  contactEmail?: string;
  contactPhone?: string;
  clinicDepartment: string;
  schedule: string;
  location: string;
  licensingDetails: string;
  servicesOffered: string[];
  awardsAndRecognition: string | string[];
  researchAndPublications: string | string[];
  socialMedia: string;
  id: string;
  // additional optional fields used by DoctorDetails
  description?: string[];
  languages?: string[];
  email?: string;
  phone?: string;
  ResearchAndPublications?: string[];
  awards?: string[];
};

// Transform doctors.json data into TeamMember format
export const teamMembers: Doctor[] = (doctorsData as any[]).map((doctor: any, idx: number) => {
  const descriptionArr = doctor.bio ? [doctor.bio] : [];
  const languagesArr = doctor.languagesSpoken
    ? (doctor.languagesSpoken as string).split(/,|;/).map((s: string) => s.trim()).filter(Boolean)
    : [];
  const scheduleArr = doctor.schedule
    ? (doctor.schedule as string).split(/,|;|\n/).map((s: string) => s.trim()).filter(Boolean)
    : [];

  return {
    name: doctor.name,
    title: doctor.title,
    // keep external placeholder URLs as-is; DoctorDetails will handle prefixing
    image: doctor.image && doctor.image.length > 0 ? doctor.image : `https://via.placeholder.com/400x500?text=${encodeURIComponent(doctor.name)}`,
    bio: doctor.bio,
    specialization: doctor.specialization,
    medicalQualifications: doctor.medicalQualifications,
    yearsOfExperience: doctor.yearsOfExperience,
    languagesSpoken: doctor.languagesSpoken,
    contactEmail: doctor.contactEmail,
    contactPhone: doctor.contactPhone,
    clinicDepartment: doctor.clinicDepartment,
    // provide schedule as an array for DoctorDetails
    // @ts-ignore
    schedule: scheduleArr,
    location: doctor.location,
    licensingDetails: doctor.licensingDetails,
    servicesOffered: doctor.servicesOffered || [],
    // provide awards & research as arrays so DoctorDetails can iterate
    awardsAndRecognition: doctor.awardsAndRecognition ? (Array.isArray(doctor.awardsAndRecognition) ? doctor.awardsAndRecognition : [doctor.awardsAndRecognition]) : [],
    // also expose ResearchAndPublications in the shape DoctorDetails expects
    ResearchAndPublications: doctor.researchAndPublications ? (Array.isArray(doctor.researchAndPublications) ? doctor.researchAndPublications : [doctor.researchAndPublications]) : [],
    // @ts-ignore
    socialMedia: doctor.socialMedia || "",
    id: `doctor-${idx}`,
    // additional fields expected by DoctorDetails
    description: descriptionArr,
    languages: languagesArr,
    socialMediaWebsite: doctor.socialMedia ? [doctor.socialMedia] : [],
    // populate email/phone fields with common keys used in DoctorDetails
    email: doctor.contactEmail || doctor.email || "",
    phone: doctor.contactPhone || doctor.phone || "",
  } as any;
});

const ITEMS_PER_PAGE = 6;

const DoctorProfiles: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyClinic, setSpecialtyClinic] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [firstLetter, setFirstLetter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const locations = [
    "Main Hospital",
    "Anderson clinic",
    "The Nairobi Hospital",
    "Anderson Specialty",
    "Capital Center OPC",
    "Galleria OPC",
    "Kiambu OPC",
    "Roslyn Riviera OPC",
    "South Field OPC",
    "Warwick OPC",
  ];

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Filtering Logic
  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClinic = specialtyClinic
      ? member.clinicDepartment
          ?.toLowerCase()
          .includes(specialtyClinic.toLowerCase())
      : true;

    const matchesLocation =
      selectedLocations.length > 0
        ? selectedLocations.some(loc => member.location.toLowerCase().includes(loc.toLowerCase()))
        : true;

    const matchesFirstLetter = firstLetter
      ? member.name.charAt(0).toLowerCase() === firstLetter.toLowerCase()
      : true;

    return (
      matchesSearch && matchesClinic && matchesLocation && matchesFirstLetter
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrev = () => currentPage > 1 && setCurrentPage((p) => p - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage((p) => p + 1);

  const toggleLocation = (loc: string) => {
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSpecialtyClinic("");
    setSelectedLocations([]);
    setFirstLetter("");
    setCurrentPage(1);
  };

  return (
    <>
      <Heading
        image_url={hospitalview}
        style="background"
        title="Doctors' Profiles"
        description="Get to know our doctors and their areas of expertise."
      />

      <div className="flex flex-col lg:flex-row gap-6 mt-6 md:mx-40 mb-10 ">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-1/4 bg-white rounded-lg shadow-md border p-6 md:sticky md:top-28 h-fit">
          <h3 className="font-bold font-serif text-xl text-red-900 mb-6 pb-3">
            Narrow your search
          </h3>

          {/* By Doctor's Name */}
          <div className="mb-6">
            <label className="block text-base font-serif font-semibold text-gray-800 mb-3">
              By Doctor's Name
            </label>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search name..."
              className="w-full border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 rounded-md px-4 py-2 text-sm transition-colors duration-200"
            />
          </div>

          {/* By Specialty Clinic */}
          <div className="mb-6">
            <label className="block text-base font-serif font-semibold text-gray-800 mb-3">
              By Specialty Clinic
            </label>
            <input
              value={specialtyClinic}
              onChange={(e) => setSpecialtyClinic(e.target.value)}
              placeholder="e.g. Renal Unit"
              className="w-full border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 rounded-md px-4 py-2 text-sm transition-colors duration-200"
            />
          </div>

          {/* By Location */}
          <div className="mb-6">
            <label className="block text-base font-serif font-semibold text-gray-800 mb-3">
              By Location
            </label>
            <div className="space-y-2">
              {locations.map((loc) => (
                <div key={loc} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedLocations.includes(loc)}
                    onChange={() => toggleLocation(loc)}
                    className="mr-3 w-4 h-4 text-red-600 border-2 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                  />
                  <span className="text-sm text-gray-700 hover:text-red-900 cursor-pointer select-none" onClick={() => toggleLocation(loc)}>
                    {loc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Filter by First Name */}
          <div className="mb-6">
            <label className="block text-base font-serif font-semibold text-gray-800 mb-3">
              Filter by First Name
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

          {/* Reset Filters */}
          <button
            onClick={resetFilters}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-md transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md border border-gray-300"
          >
            Reset all filters
          </button>
        </div>

        {/* Doctors List */}
        <div className="flex-1">
          {paginatedMembers.length > 0 ? (
            paginatedMembers.map((member, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-lg shadow-sm mb-6 overflow-hidden hover:shadow-md transition"
              >
                {/* Doctor Image */}
                <div className="p-2">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-3/4 md:w-50 md:h-50 object-cover rounded"
                  />
                </div>

                {/* Doctor Info */}
                <div className="md:w-2/3 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold font-serif text-red-800">
                      {member.name}
                    </h3>
                    <p className="text-gray-700 font-serif font-medium mb-2">
                      {member.title}, {member.location}
                    </p>
                    <p className="text-gray-600 text-sm font-sans leading-relaxed">
                      {member.bio.slice(0, 320)}...
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-4 ">
                    <Link
                      to={`/booking-calendar?doctorName=${encodeURIComponent(member.name)}&doctorTitle=${encodeURIComponent(member.title)}`}
                      className="flex items-center justify-center gap-2 text-red-900  px-4 py-2 rounded-md text-sm hover:bg-red-900 hover:text-white transition"
                    >
                      <FaCalendarCheck />
                      Book Appointment
                    </Link>
                    <Link
                      to={`/doctor-details/${member.id}`}
                      className="flex items-center justify-center gap-2 text-red-900  px-4 py-2 rounded-md text-sm hover:bg-red-900 hover:text-white transition"
                    >
                      <FaUserMd />
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-10">
              No doctors found matching your filters.
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
      <ContactForm contactInfo={{ phone: "" }} />
    </>
  );
};

export default DoctorProfiles;
