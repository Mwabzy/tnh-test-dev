import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ClinicalService } from "@/types";
//import clinicalServices from "@/data/clinicalServices2.json";

const ServicesBrief = () => {
  const [services, setServices] = useState<ClinicalService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:8000/clinical-services/");
        const data = await res.json();

        console.log("Fetched services:", data);
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <p>Loading services brief...</p>;

  return (
    <div className="rounded-lg p-6 md:p-10 text-center bg-orange-200 dark:border-gray-700 shadow-xl mx-[7%] mb-20">
      <h2 className="text-2xl md:text-4xl font-bold mb-6 text-red-900">
        Our Clinical Services
      </h2>

      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-red-900">
        {services.map((item) => (
          <li
            key={item.title}
            className="flex items-center before:content-['•'] before:mr-2 text-red-900 before:text-lg"
          >
            <Link
              to={`/service-detail/${item.id}`}
              className="hover:text-red-700 transition-colors"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesBrief;
