import { Link } from "react-router";
import clinicalServices from "@/data/clinicalServices.json";

const Services = () => {
  const servicesToShow = clinicalServices.slice(0, 3);
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-red-900 mb-4">
          Our Key Services
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Comprehensive healthcare services delivered by world-class medical
          professionals using state-of-the-art technology
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-[5%]">
        {servicesToShow.map((item) => (
          <div
            key={item.name}
            className="max-w-sm bg-white border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700 shadow-2xl border-yellow-00 border-y-yellow-600"
          >
            <img
              className="rounded-t-lg w-full h-56 object-cover"
              src={
                Array.isArray(item.image.src)
                  ? item.image.src[0]
                  : item.image.src
              }
              alt={item.image.alt}
            />
            <div className="p-5">
              <h5 className="mb-2 text-xl sm:text-2xl md:text-2xl  font-bold tracking-tight text-gray-900 dark:text-white ">
                {item.name}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {item.description}
              </p>
              <Link
                to={`/service-detail/${item.id}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-900 rounded-lg hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-600 dark:bg-red-900 dark:hover:bg-red-900 dark:focus:ring-red-800 shadow-lg shadow-red-900/50 "
              >
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
      {clinicalServices.length > 4 && (
        <div className="flex flex-col mt-15 md:flex-row items-center justify-between bg-white shadow-md rounded-xl p-6">
          {/* Text Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold text-gray-900">
              Explore All Our Services
            </h3>
            <p className="text-gray-600 mt-1">
              Discover our complete range of medical specialties
            </p>
          </div>

          {/* Button Section */}
          <Link
            to="/clinics"
            className="mt-4 md:mt-0 inline-flex items-center px-3 py-2 
                   text-white ml-6 rounded-lg text-sm font-medium transition 
                   bg-gradient-to-r from-red-700 to-yellow-600 hover:from-yellow-600 focus:ring-4 focus:outline-none hover:to-red-900 shadow-lg shadow-red-900/50"
          >
            View All Services
            <span className="ml-2">→</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Services;
