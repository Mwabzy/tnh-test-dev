import ContactForm from "@/components/ContactForm";
import Heading from "@/components/Heading";
import React from "react";
import { Link } from "react-router";
import hospitalview from "@/assets/heroimages/heroimage2.jpg";

type TeamPageProps = {
  title: string;
  description: string;
  members: TeamMember[];
  children?: React.ReactNode;
};

type TeamMember = {
  name: string;
  id?: string;
  title: string;
  image: string;
};

// layout for the whole page
const DoctorBrief: React.FC<TeamPageProps> = ({
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

      {/* (the search bar) */}
      {children}

      <section className="py-12 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
            {members.map((member, index) => (
              <TeamCard key={index} {...member} />
            ))}
          </div>
        </div>
      </section>
      <ContactForm contactInfo={{ phone: "" }} />
    </>
  );
};

// layout for individual cards
const TeamCard: React.FC<TeamMember> = ({ name, title, id, image }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
    <div className="relative group">
      <img
        src={image}
        alt={name}
        className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>

    <div className="p-4 text-center">
      <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
      <p className="text-sm text-gray-600 mb-4">{title}</p>

      <div className="flex justify-center gap-2 mt-auto">
        <Link
          to={`/doctor-details/${id}`}
          className="bg-red-900 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition"
        >
          View Profile
        </Link>
        <a
          href="#contact"
          className="border border-red-700 text-red-700 px-3 py-1 rounded-md text-sm hover:bg-red-100 transition"
        >
          Book Appointment
        </a>
      </div>
    </div>
  </div>
);

export default DoctorBrief;
