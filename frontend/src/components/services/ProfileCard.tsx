import { Doctor } from "@/types";

type ProfileCardProps = Doctor & { bookHref?: string };

// Doctor Profile Card Component
const ProfileCard: React.FC<ProfileCardProps> = ({ name, title, image, bio, bookHref }) => (
  <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
    <img
      src={image}
      alt={`Dr. ${name}`}
      className="w-24 h-24 rounded-full mb-4 object-cover"
    />
    <h4 className="text-lg font-semibold">{name}</h4>
    <p className="text-sm text-gray-600 mb-2">{title}</p>
    <p className="text-sm text-gray-700 mb-4">{bio}</p>
    {bookHref && (
      <a
        href={bookHref}
        className="mt-2 inline-block bg-red-900 text-white px-3 py-1 rounded text-sm hover:bg-red-800"
      >
        Book with Dr {name.split(" ")[0]}
      </a>
    )}
  </div>
);

export default ProfileCard;