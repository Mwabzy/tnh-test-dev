import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ClinicalService } from "@/types";
import { FaCalendarCheck, FaChevronRight } from "react-icons/fa";
import { fetchClinicalServices } from "@/api/api";

interface andersonListProps {
  services?: ClinicalService[];
}

const ITEMS_PER_PAGE = 6;

const AndersonList: React.FC<andersonListProps> = () => {
  const [data, setData] = useState<ClinicalService[]>([]);
  const [search, setSearch] = useState("");
  const [letterFilter, setLetterFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetching via API instance
  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const services = await fetchClinicalServices();
        setData(services);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Unable to load services.");
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  // Filter logic
  // const filteredServices = data.filter((service) => {
  //   const matchesSearch = service.title
  //     .toLowerCase()
  //     .includes(search.toLowerCase());
  //   const matchesLetter =
  //     !letterFilter || service.title.charAt(0).toUpperCase() === letterFilter;

  //   return matchesSearch && matchesLetter;
  // });

  // Filter logic - only show services with "Anderson" location
const filteredServices = data.filter((service) => {
  const hasAndersonLocation = service.locations?.some(loc => 
    loc.toLowerCase().includes('anderson')
  );
  
  const matchesSearch = service.title
    .toLowerCase()
    .includes(search.toLowerCase());
  const matchesLetter =
    !letterFilter || service.title.charAt(0).toUpperCase() === letterFilter;

  return hasAndersonLocation && matchesSearch && matchesLetter;
});

  // Pagination
  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentServices = filteredServices.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const resetFilters = () => {
    setSearch("");
    setLetterFilter(null);
    setCurrentPage(1);
  };

  if (loading)
    return (
      <div className="py-20 text-center text-gray-600">
        Loading clinical services...
      </div>
    );

  if (error)
    return <div className="py-20 text-center text-red-600">{error}</div>;

  return (
    <div className="py-16 px-6 flex flex-col md:flex-row justify-center max-w-7xl mx-auto gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 md:sticky md:top-20 mb-8 md:mb-0">
        <button
          onClick={resetFilters}
          className="mb-6 text-sm bg-gray-200 hover:bg-gray-300 rounded px-4 py-2 w-full"
        >
          Reset all filters
        </button>

        {/* Search */}
        <div className="mb-6">
          <label
            htmlFor="search"
            className="block font-semibold mb-2 font-serif"
          >
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

        {/* Letter Filter */}
        <div>
          <p className="font-semibold mb-2 font-serif">
            Filter Specialty by First Letter
          </p>
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

      {/* Service Cards */}
      <main className="flex-1">
        <p className="mb-6 text-sm text-gray-700">
          Displaying {filteredServices.length} Anderson Specialty
          Clinics
        </p>

        <div className="grid grid-cols-1 gap-8 max-w-150">
          {currentServices.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {item.images?.length > 0 && (
                <img
                  className="w-full h-60 object-cover rounded-t-lg"
                  src={item.images[0].url}
                  alt={item.images[0].alt || "Service image"}
                />
              )}

              <div className="p-6">
                <h5 className="text-xl font-semibold text-red-900 mb-3 font-serif">
                  {item.title}
                </h5>
                <p className="text-gray-700 mb-6 leading-relaxed text-justify">
                  {item.overview}
                </p>

                {item.locations && (
                  <p className="text-sm text-gray-600 mb-4">
                    <strong>Available at:</strong> {item.locations.join(", ")}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  {item.isBookable && (
                    <Link
                      to={`/booking-calendar?serviceId=${item.id}`}
                      className="flex items-center gap-2 text-red-900 px-4 py-2 rounded-md hover:bg-red-900 hover:text-white transition w-full sm:w-auto"
                    >
                      Book Appointment <FaCalendarCheck />
                    </Link>
                  )}

                  <Link
                    to={`/service-detail/${item.id}`}
                    className="flex items-center gap-2 text-red-900 px-4 py-2 rounded-md hover:bg-red-900 hover:text-white transition w-full sm:w-auto"
                  >
                    Read More <FaChevronRight />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
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

export default AndersonList;
