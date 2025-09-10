import { Doctor } from "@/types";

// Doctor Profile Card Component
const ProfileCard: React.FC<Doctor> = ({ name, title, image, bio }) => (
  <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
    <img
      src={image}
      alt={`Dr. ${name}`}
      className="w-24 h-24 rounded-full mb-4 object-cover"
    />
    <h4 className="text-lg font-semibold">{name}</h4>
    <p className="text-sm text-gray-600 mb-2">{title}</p>
    <p className="text-sm text-gray-700">{bio}</p>
  </div>
);

export default ProfileCard;