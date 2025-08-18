import { Link } from "react-router";
import clinicalServices from "@/data/clinicalServices.json";

const ServicesBrief = () => {
  return (
    <div className="rounded-lg p-6 md:p-10 text-center  bg-orange-200 dark:border-gray-700 shadow-xl mx-[7%] mb-20">
      <h2 className="text-2xl md:text-4xl font-bold mb-6 text-red-900">
        Our Clinical Services
      </h2>

      <div className="flex flex-col md:grid-cols-2 lg:flex-row lg:flex-wrap justify-center gap-4 text-red-900">
        {clinicalServices.map((item) => (
          <div key={item.name}>
            <Link to={`/service-detail/${item.id}`}>
              <li>{item.name}</li>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesBrief;
