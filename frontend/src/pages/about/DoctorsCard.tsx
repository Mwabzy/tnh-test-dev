import ContactForm from "@/components/ContactForm";
import Heading from "@/components/Heading";
import React from "react";
import { Link } from "react-router";

type TeamPageProps = {
  title: string;
  description: string;
  members: TeamMember[];
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
}) => {
  return (
    <>
      <Heading
        image_url="https://cms.thenairobihosp.org/uploads/our_team_2f0b1c7d3a.jpg"
        style="background"
        title={title}
        description={description}
      />
      <section className="py-12 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

//layout for cards
const TeamCard: React.FC<TeamMember> = ({ name, title, id, image }) => (
  <div className="relative bg-grey-300 rounded-lg overflow-hidden text-center p-3">
    <Link to={`/doctor-details/${id}`}>
      <div className="group relative ">
        <img
          src={image}
          alt={name}
          className="w-70 h-100 shadow-md mx-auto object-cover rounded-lg mb-4 transform transition-transform duration-800 group-hover:scale-110"
        />
        <div className="absolute inset-0 rounded-lg group-hover:bg-black/50 transition group-hover:scale-110 duration-800 z-10"></div>

        <div className="absolute bottom-0 w-full p-4 transition-opacity duration-800 opacity-100 md:opacity-0 md:group-hover:opacity-100 z-20">
          <h3 className="mt-4 text-white text-2xl font-bold">{name}</h3>
          <p className=" text-white text-sm mt-1">{title}</p>
        </div>
      </div>
    </Link>
  </div>
);

export default DoctorBrief;
