import { Hospital } from "lucide-react";
import { Link } from "react-router";
import opcData from "@/data/opcData.json";

const OutpatientCenterList: React.FC = () => {
  return (
    <>
      <div className="max-w-7xl mx-10 lg:mx-auto my-20 ">
        <h2 className="text-3xl md:text-4xl text-center  font-bold mb-6 text-red-900">
          Our Outpatient Clinics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 ">
          {opcData.map((opc, index) => (
            <div
              key={index}
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
                to={`/outpatient-center/${opc.id}`}
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
