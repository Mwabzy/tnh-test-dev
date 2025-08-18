import { Link } from "react-router";
import { ClinicalService } from "@/types";


// Define the shape of a single service item

// Define the props for the ServiceList component
interface ServiceListProps {
    services: ClinicalService[];
}

const ServiceList: React.FC<ServiceListProps> = ({ services }) => {
    return (
    <div className="flex flex-col items-center bg-red-900 py-20 justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 px-[5%] gap-6 justify-center">
        {services.map((item) => (
          <div
            key={item.id}
            className="max-w-xl bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
          >
            <img
              className="rounded-t-lg w-full h-56 object-cover"
              src={item.image?.url || "/placeholder.png"}
              alt={item.imageAlt || "Service image"}
            />
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white font-serif">
                {item.title}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {item.tagline}
              </p>
              <Link
                to={`/service-detail/${item.id}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-900 rounded-lg hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-600 dark:bg-red-900 dark:hover:bg-red-900 dark:focus:ring-red-800"
              >
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
