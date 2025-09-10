import { RelatedServices } from "@/types";

const RelatedServiceCard: React.FC<RelatedServices> = ({
  title,
  description,
  image,
  link,
}) => (
  <div className="w-full h-full min-h-[400px]">
    <a
      href={link}
      className="bg-white shadow-md rounded-lg p-4 flex flex-col hover:shadow-lg transition"
    >
      <img
        src={image}
        alt={title}
        className="w-full  min-h-[32px] object-cover rounded-t-lg mb-4"
      />
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </a>
  </div>
);

export default RelatedServiceCard;
