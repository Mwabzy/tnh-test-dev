import { Link } from "react-router";
import clinicalServices from "@/data/clinicalServices.json";

const Services = () => {
  const servicesToShow = clinicalServices.slice(0, 4);
  return (
    <div className="flex flex-col items-center justify-center mt-2">
      <h1 className="font-bold text-3xl text-red-900 mb-4 ">
        Clinical Services
      </h1>

      <div className="flex flex-wrap items-center px-[5%] gap-6 justify-center">
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
        <Link
          to="/clinics"
          className="mt-8 inline-flex items-center px-6 py-3 text-white bg-yellow-600 rounded-lg hover:bg-red-900 text-lg font-semibold transition"
        >
          See more clinics
        </Link>
      )}
    </div>
  );
};

export default Services;
