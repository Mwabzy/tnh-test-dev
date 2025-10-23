// App.tsx
import React from "react";
import galleria from "@/assets/opc_images/galleria.jpg";
import kiambu from "@/assets/opc_images/kiambu.jpeg";
import capital from "@/assets/opc_images/capital.jpg";
import southfield from "@/assets/opc_images/southfield.png";
import warwick from "@/assets/opc_images/warwick.png";
import rosslyn from "@/assets/opc_images/rosslyn.jpeg";
import anderson from "@/assets/opc_images/anderson.jpg";
import { Link } from "react-router";

interface OutpatientCenter {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
}

const outpatientCenters: OutpatientCenter[] = [
  {
    id: "galleria-opc",
    name: "Galleria OPC",
    location: "Langata Road, Nairobi",
    imageUrl: galleria,
  },
  {
    id: "kiambu-opc",
    name: "Kiambu OPC",
    location: "Kiambu Road, Nairobi",
    imageUrl: kiambu,
  },
  {
    id: "capital-opc",
    name: "Capital Center OPC",
    location: "Mombasa Road",
    imageUrl: capital,
  },
  {
    id: "galleria-opc",
    name: "South Field Mall OPC",
    location: "Outering Road, Nairobi",
    imageUrl: southfield,
  },
  {
    id: "warwick-opc",
    name: "Warwick Center OPC",
    location: "Gigiri, Nairobi",
    imageUrl: warwick,
  },
  {
    id: "rosslyn-opc",
    name: "Rosslyn Riviera OPC",
    location: "Limuru Road, Nairobi",
    imageUrl: rosslyn,
  },
  {
    id: "anderson-opc",
    name: "Anderson Specialty",
    location: "Argwings Kodhek Rd, Nairobi",
    imageUrl: anderson,
  },
];

const Opc: React.FC = () => {
  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Top-left title section */}
        <div className="flex flex-col justify-center bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-3xl font-serif font-bold mb-3">Outpatient Centers</h2>
          <p className="text-gray-600 font-sans mb-6 text-sm">
            Learn more about The Nairobi Hospital’s outpatient centers or choose
            a specific location.
          </p>
          <Link
            to="/outpatient-centers"
            className="border border-red-700 text-red-700 px-4 py-2 font-sans rounded-full w-fit hover:bg-blue-50 transition"
          >
            Explore all locations
          </Link>
        </div>

        {/* Outpatient cards */}

        {outpatientCenters.map((center, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <Link to={`/outpatient-center/${center.id}`}>
              <div className="relative h-48 sm:h-56 md:h-full">
                <img
                  src={center.imageUrl}
                  alt={center.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-4 text-white">
                  <h3 className="font-semibold text-lg flex items-center justify-between">
                    {center.name} <span className="text-xl font-light">›</span>
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
