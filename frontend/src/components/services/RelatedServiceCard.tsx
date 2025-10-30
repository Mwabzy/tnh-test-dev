import { RelatedServices } from "@/types";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router";

const RelatedServiceCard: React.FC<RelatedServices> = ({
  id,
  title,
  overview,
  images,
}) => (
  <div className="w-full max-w-lg bg-white shadow-md rounded-lg overflow-hidden flex flex-col transition hover:shadow-xl">
    <img
      src={images[0]?.url}
      alt={title}
      className="w-full h-56 object-cover"
    />

    <div className="flex flex-col justify-between flex-1 p-4">
      <div>
        <h4 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h4>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{overview}</p>
      </div>

      <Link
        to={`/service-detail/${id}`}
        className="mt-auto inline-flex items-center justify-center gap-2 bg-red-900 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-red-800 transition"
      >
        Read More <FaChevronRight size={12} />
      </Link>
    </div>
  </div>
);

export default RelatedServiceCard;
