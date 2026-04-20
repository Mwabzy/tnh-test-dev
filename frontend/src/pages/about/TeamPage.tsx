import ContactForm from "@/components/ContactForm";
import Heading from "@/components/Heading";
import { PAGE_CONTACT_INFO } from "@/lib/contactInfo";
import React from "react";
import { Link } from "react-router";

type TeamPageProps = {
  title: string;
  description: string;
  members: TeamMember[];
};

type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
  group: string;
};

// layout for the whole page
const TeamPage: React.FC<TeamPageProps> = ({ title, description, members }) => {
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
      <ContactForm contactInfo={PAGE_CONTACT_INFO} />
    </>
  );
};

//layout for cards
const TeamCard: React.FC<TeamMember> = ({ name, role, id, image }) => (
  <Link to={`/member-page/${id}`}>
    <div className="group relative rounded-lg overflow-hidden">
      {/* Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-[320px] object-cover 
        transition-transform duration-500 ease-in-out 
        group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-500"></div>

      {/* Text */}
      <div className="absolute bottom-0 w-full p-4 z-20">
        <h3 className="text-white text-lg font-bold drop-shadow-md">{name}</h3>
        <p className="text-white text-sm drop-shadow-md">{role}</p>
      </div>
    </div>
  </Link>
);
export default TeamPage;
