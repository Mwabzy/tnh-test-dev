import { FC, JSX } from "react";
import { Link } from "react-router";
// import { ClinicalService } from "@/types";  // only needed if you use it
import clinicalServices from "@/data/clinicalServices.json"; 

interface ServiceCardProps {
  title?: string;
  description?: string;
  icon: JSX.Element;
  link: string;
  active: boolean;
}

const ServiceCard: FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  link,
  active,
}) => {
  
  return (
    <Link to={link} className="w-full">
      <div
        className={`md:flex items-center gap-4 p-6 py-8 rounded-lg transition duration-300 hover:bg-orange-200 hover:shadow-md cursor-pointer w-full ${
          active ? "bg-orange-200" : "bg-background"
        }`}
      >
        {/* Icon Container */}
        <div className="flex items-center justify-center md:w-1/6 sm:w-1/4 w-[20%]">
          <div className="text-red-900">{icon}</div>
        </div>

        {/* Title */}
        <div className="flex items-center w-full md:w-2/5 sm:w-2/3">
          <h2 className="text-2xl sm:text-3xl font-serif text-red-900">
            {title}
          </h2>
        </div>

        {/* Description */}
        <div className="flex items-center w-full sm:w-2/3">
          <p className="text-base text-gray-700 mt-1 sm:mx-6 mx-4">
            {description}
          </p>
        </div>
      </div>
      {!active && <hr className="border-gray-300" />}
    </Link>
  );
};

export default ServiceCard;
