import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ClinicalService } from "@/types";
//import clinicalServices from "@/data/clinicalServices.json";

const ServicesBrief = () => {
  const [services, setServices] = useState<ClinicalService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:5003/clinical-services");
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
    <div className="rounded-lg p-6 md:p-10 text-center  bg-orange-200 dark:border-gray-700 shadow-xl mx-[7%] mb-20">
      <h2 className="text-2xl md:text-4xl font-bold mb-6 text-red-900">
        Our Clinical Services
      </h2>

      <div className="flex flex-col md:grid-cols-2 lg:flex-row lg:flex-wrap justify-center gap-4 text-red-900">
        {services.map((item) => (
          <div key={item.title}>
            <Link to={`/service-detail/${item.id}`}>
              <li>{item.title}</li>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesBrief;
