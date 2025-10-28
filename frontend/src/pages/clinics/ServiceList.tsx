import { useState } from "react";
import { Link } from "react-router";
import { ClinicalService } from "@/types";
import { FaCalendarCheck, FaUserMd } from "react-icons/fa";
import clinicalServices from "@/data/clinicalServices2.json";

const services: ClinicalService[] = clinicalServices as ClinicalService[];

const ALL_LOCATIONS = [
  "Main Hospital",
  "Anderson Specialty",
  "Capital Center OPC",
  "Galleria OPC",
  "Kiambu OPC",
  "Roslyn Riviera OPC",
  "South Field OPC",
  "Warwick OPC",
];

const ITEMS_PER_PAGE = 6;

const ServiceList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState<string[]>([]);
  const [letterFilter, setLetterFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter logic
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(search.toLowerCase()) ||
      service.tagline.toLowerCase().includes(search.toLowerCase());

    const matchesLocation =
      locations.length === 0 || locations.includes(service.location);

    const matchesLetter =
      !letterFilter || service.title.charAt(0).toUpperCase() === letterFilter;

    return matchesSearch && matchesLocation && matchesLetter;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentServices = filteredServices.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" }); // scroll up on page change
    }
  };

  const toggleLocation = (loc: string) => {
    setLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearch("");
    setLocations([]);
    setLetterFilter(null);
    setCurrentPage(1);
  };

  return (
    <div className="bg-gray-50 py-16 px-6 flex flex-col md:flex-row justify-center max-w-7xl mx-auto md:mx-40 gap-8">
      {/* Filters sidebar */}
      <aside className="w-full md:w-64 md:sticky md:top-20  mb-8 md:mb-0">
        <button
          onClick={resetFilters}
          className="mb-6 text-sm bg-gray-200 hover:bg-gray-300 rounded px-4 py-2 w-full"
        >
          Reset all filters
        </button>

        <div className="mb-6">
          <label htmlFor="search" className="block font-semibold mb-2">
            By Specialty
          </label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search specialties..."
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>

        <div className="mb-6">
          <p className="font-semibold mb-2">By Location</p>
          {ALL_LOCATIONS.map((loc) => (
            <label
              key={loc}
              className="flex items-center space-x-2 mb-1 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={locations.includes(loc)}
                onChange={() => toggleLocation(loc)}
                className="w-4 h-4"
              />
              <span>{loc}</span>
            </label>
          ))}
        </div>

        <div>
          <p className="font-semibold mb-2">Filter Specialty by First Letter</p>
          <div className="flex flex-wrap gap-2">
            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
              <button
                key={letter}
                onClick={() => {
                  setLetterFilter((prev) => (prev === letter ? null : letter));
                  setCurrentPage(1);
                }}
                className={`w-8 h-8 flex items-center justify-center rounded-full border text-sm font-semibold ${
                  letterFilter === letter
                    ? "bg-red-900 text-white border-red-900"
                    : "border-gray-300 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Cards */}
      <main className="flex-1">
        <p className="mb-6 text-sm text-gray-700">
          Displaying {filteredServices.length} of {services.length} Specialty
          Clinics
        </p>

        <div className="grid grid-cols-1 gap-8 max-w-150">
          {currentServices.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                className="w-full h-60 object-cover rounded-t-lg"
                src={item.image.url}
                alt={item.image.alt || "Service image"}
              />
              <div className="p-6">
                <h5 className="text-xl font-semibold text-red-900 mb-3 font-serif">
                  {item.title}
                </h5>
                <p className="text-gray-700 mb-6 leading-relaxed text-justify">
                  {item.overview}
                </p>

                <div className="flex gap-4">
                  <Link
                    to="/booking-calendar"
                    className="flex items-center gap-2 text-red-900 px-4 py-2 rounded-md hover:bg-red-900 hover:text-white transition"
                  >
                    <FaCalendarCheck />
                    Book Appointment
                  </Link>

                  <Link
                    to={`/doctor-profiles`}
                    className="flex items-center gap-2 text-red-900 px-4 py-2 rounded-md hover:bg-red-900 hover:text-white transition"
                  >
                    <FaUserMd />
                    Find a Doctor
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-10">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm rounded-md border border-gray-300 disabled:opacity-40 hover:bg-gray-100"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`px-3 py-2 text-sm rounded-md border ${
                  currentPage === i + 1
                    ? "bg-red-900 text-white border-red-900"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm rounded-md border border-gray-300 disabled:opacity-40 hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ServiceList;
