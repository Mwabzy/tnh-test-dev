import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { fetchClinicalServices } from "@/api/api";
import { ClinicalService } from "@/types";
import { useIntlayer } from "react-intlayer";

const stripHtml = (value: string) =>
  value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const truncateText = (value: string, maxLength: number) =>
  value.length > maxLength ? `${value.slice(0, maxLength).trim()}...` : value;

const Services = () => {
  const servicedata = useIntlayer("heroContent");
  const [services, setServices] = useState<ClinicalService[]>([]);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchClinicalServices();
        setServices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load clinical services for homepage:", error);
      }
    };

    loadServices();
  }, []);

  const servicesToShow = useMemo(
    () => services.filter((item) => Boolean(item.ftOnHomepage)).slice(0, 3),
    [services],
  );

  return (
    <div className="bg-red-900 flex flex-col items-center justify-center mt-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl mt-6 font-serif font-extrabold text-white mb-4">
          {servicedata?.service_title}
        </h2>
        <p className="text-lg font-sans text-white max-w-2xl mx-auto">
          {servicedata?.service_description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-[5%]">
        {servicesToShow.map((item) => (
          <div
            key={item.id}
            className="max-w-sm bg-red-900  rounded-lg  dark:bg-gray-800"
          >
            {item.images?.[0]?.url && (
              <img
                className="rounded-t-lg w-full h-56 object-cover"
                src={item.images[0].url}
                alt={item.images[0].alt || item.title}
              />
            )}
            <div className="p-5 px-0">
              <h5 className="mb-2 text-xl sm:text-2xl md:text-2xl font-serif  font-bold tracking-tight text-white dark:text-white ">
                {item.title}
              </h5>
              <p className="mb-3 font-sans font-normal text-white ">
                {truncateText(stripHtml(item.overview || ""), 180)}
              </p>
              <Link
                to={`/service-detail/${encodeURI(item.path || String(item.id))}`}
                className="text-white font-semibold mt-4 inline-flex items-center group"
              >
                Read More
                <svg
                  className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {services.length > 3 && (
        <div className="flex flex-col mt-15 mx-4  items-center justify-between bg-white shadow-md rounded-xl p-6 mb-10">
          {/* Text Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl text-center font-serif font-semibold text-gray-900">
              {servicedata.exploreservice_button}
            </h3>
            <p className="text-gray-600 font-sans m-1 mb-2">
              {servicedata?.exploreservice_description}
            </p>
          </div>

          {/* Button Section */}
          <Link
            to="/clinical-services"
            className="mt-4 md:mt-0 inline-flex items-center px-3 py-2 
                   text-white ml-6 rounded-lg text-sm font-medium transition 
                   bg-yellow-600  hover:bg-red-900 font-serif"
          >
            {servicedata.service_button}
            <span className="ml-2">→</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Services;
