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

      {/* Filters and Content */}
      <div className="max-w-7xl mx-auto px-4">{children}</div>

      <ContactForm contactInfo={{ phone: "" }} />
    </>
  );
};

export default DoctorBrief;
