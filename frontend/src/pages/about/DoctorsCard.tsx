import React from "react";
import Heading from "@/components/Heading";
import ContactForm from "@/components/ContactForm";
import hospitalview from "@/assets/heroimages/heroimage2.jpg";

type TeamPageProps = {
  title: string;
  description: string;
  members: any[];
  children?: React.ReactNode;
};

const DoctorsCard: React.FC<TeamPageProps> = ({
  title,
  description,
  members,
  children,
}) => {
  return (
    <>
      <Heading
        image_url={hospitalview}
        style="background"
        title={title}
        description={description}
      />

      {/* Filters and Content */}
      <div className="max-w-7xl mx-auto px-4">{children}</div>

      <ContactForm contactInfo={{ phone: "" }} />
    </>
  );
};

// layout for individual cards
const TeamCard: React.FC<TeamMember> = ({ name, title, id, image }) => (
  <div className="relative bg-white w-70 h-100 rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300">
    {/* Doctor Image */}
    <img
      src={image}
      alt={name}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />

    {/* Overlay Content (hidden until hover) */}
    <div className="absolute inset-0 bg-black/30 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end items-center text-center p-4">
      <h3 className="text-lg font-semibold text-white">{name}</h3>
      <p className="text-sm text-gray-200 mb-4">{title}</p>

      <div className="flex flex-col gap-2 w-full max-w-[160px] mx-auto">
        <Link
          to={`/doctor-details/${id}`}
          className="bg-red-900 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600 transition w-full"
        >
          View Profile
        </Link>
        <a
          href="#contact"
          className="bg-red-900 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600 transition w-full"
        >
          Book Appointment
        </a>
      </div>
    </div>
  </div>
);

export default DoctorBrief;
