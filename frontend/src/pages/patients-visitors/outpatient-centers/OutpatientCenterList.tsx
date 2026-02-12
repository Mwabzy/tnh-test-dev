import { useEffect, useState } from "react";
import { Hospital } from "lucide-react";
import { Link } from "react-router";
import { fetchOutpatientCenter } from "@/api/api";

type OutpatientCenter = {
  id: number;
  slug?: string | null;
  name: string;
  location: string;
};

const OutpatientCenterList: React.FC = () => {
  const [centers, setCenters] = useState<OutpatientCenter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCenters = async () => {
      try {
        setLoading(true);
        const data = await fetchOutpatientCenter();
        const list = Array.isArray(data)
          ? data
          : data?.results ?? data?.data ?? [];
        const mapped = list
          .map((center: any) => ({
            id: center.id,
            slug: center.slug ?? null,
            name: center.name ?? center.title ?? "",
            location: center.location ?? "",
          }))
          .filter((c: OutpatientCenter) => c.id && c.name);
        setCenters(mapped);
        setError(null);
      } catch {
        setError("Failed to load outpatient centers.");
      } finally {
        setLoading(false);
      }
    };

    loadCenters();
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-10 lg:mx-auto my-20 ">
        <h2 className="text-3xl md:text-4xl text-center  font-bold mb-6 text-red-900">
          Our Outpatient Clinics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 ">
          {loading && (
            <div className="col-span-full text-center text-gray-500">
              Loading outpatient centers...
            </div>
          )}

          {!loading && error && (
            <div className="col-span-full text-center text-red-600">
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            centers.map((opc) => (
              <div
                key={opc.slug ?? opc.id}
                className="border dark:border-gray-700 shadow-xl rounded-lg p-8 text-center hover:shadow-md transition-all"
              >
                <div className="flex justify-center mb-4">
                  <Hospital className="text-amber-400 w-10 h-10" />
                </div>
                <h2 className="text-xl font-semibold text-red-700 mb-2">
                  {opc.name}
                </h2>
                <p className="text-gray-700 mb-2">{opc.location}</p>

                <Link
                  to={`/outpatient-center/${opc.slug ?? opc.id}`}
                  className="bg-yellow-600 hover:bg-red-700 text-white cursor-pointer py-2 px-14 rounded-3xl w-full transition-all"
                >
                  Learn More
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default OutpatientCenterList;
