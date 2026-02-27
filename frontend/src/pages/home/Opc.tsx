// App.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { useIntlayer } from "react-intlayer";
import { fetchOutpatientCenter } from "@/api/api";

interface OutpatientCenter {
  id: number;
  path?: string | null;
  slug?: string | null;
  name: string;
  location: string;
  imageUrl?: string | null;
}

const Opc: React.FC = () => {
  const opcdata = useIntlayer("heroContent");
  const [outpatientCenters, setOutpatientCenters] = useState<
    OutpatientCenter[]
  >([]);
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
            path: center.path ?? null,
            slug: center.slug ?? null,
            name: center.name ?? center.title ?? "",
            location: center.location ?? "",
            imageUrl:
              center.image?.[0]?.url ??
              center.image?.url ??
              center.imageUrl ??
              null,
          }))
          .filter((c: OutpatientCenter) => c.id && c.name);
        setOutpatientCenters(mapped.slice(0, 7));
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
    <div className="px-4 py-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Top-left title section */}
        <div className="flex flex-col justify-center bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-3xl font-serif font-bold mb-3">
            {opcdata.opctitle}
          </h2>
          <p className="text-gray-600 font-sans mb-6 text-sm">
            {opcdata.opcdesc}.
          </p>
          <Link
            to="/outpatient-centers"
            className="border border-red-700 text-red-700 px-4 py-2 font-sans rounded-full w-fit hover:bg-blue-50 transition"
          >
            {opcdata.explorelocation_button}
          </Link>
        </div>

        {/* Outpatient cards */}
        {loading && (
          <div className="col-span-full text-gray-500 text-sm">
            Loading outpatient centers...
          </div>
        )}

        {!loading && error && (
          <div className="col-span-full text-red-600 text-sm">{error}</div>
        )}

        {!loading &&
          !error &&
          outpatientCenters.map((center) => (
            <div
              key={center.path ?? center.slug ?? center.id}
              className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Link
                to={`/outpatient-center/${encodeURI(String(center.path ?? center.slug ?? center.id))}`}
              >
                <div className="relative h-48 sm:h-56 md:h-full">
                  {center.imageUrl ? (
                    <img
                      src={center.imageUrl}
                      alt={center.name}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300" />
                  )}
                  <div className="bg-gradient-to-t from-black to-transparent absolute inset-0 flex flex-col justify-end p-4 text-white">
                    <h3 className="font-semibold text-lg flex items-center justify-between">
                      {center.name} <span className="text-xl font-light">{">"}</span>
                    </h3>
                    <p className="text-sm">{center.location}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Opc;
