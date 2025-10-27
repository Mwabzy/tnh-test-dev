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
          href="/booking-calendar"
          className="bg-red-900 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600 transition w-full"
        >
          Book Appointment
        </a>
      </div>
    </div>
  </div>
);

export default DoctorBrief;
