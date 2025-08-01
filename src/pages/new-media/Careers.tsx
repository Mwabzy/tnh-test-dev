import { FC } from "react";
import OpportunityTemplate from "./opportunity/OpportunityTemplate";

type CareersProps = {};

const careersData = [
  {
    opportunity: "System Analyst & LIMS Administrator",
    description: "Develop and maintain software applications.",
    location: "On-site",
    opportunityType: "Full-time",
    datePosted: "2023-10-01",
    closingDate: "3rd August 2025",
  },
  {
    opportunity: "Senior Registrar",
    description: " Pediatricts",
    location: "On-site",
    opportunityType: "2 Years Contract",
    datePosted: "2023-10-05",
    closingDate: "31st July 2025",
  },
  {
    opportunity: "Locum Specialist",
    description: " Radiologist",
    location: "On-site",
    opportunityType: "Part-time",
    datePosted: "2023-10-05",
    closingDate: "31st July 2025",
  },
  {
    opportunity: "Clinical Radiation",
    description: "Oncologist",
    location: "On-site",
    opportunityType: "Part-time",
    datePosted: "2023-10-05",
    closingDate: "31st July 2025",
  },
];

const Careers: FC<CareersProps> = () => {
  return (
    <div>
      <OpportunityTemplate
        title="Join Our Team"
        description="Explore exciting career opportunities with us."
        testimonials={[
          {
            name: "Jane Doe",
            title: "Software Engineer",
            quote: "Working here has been a transformative experience.",
            image: "https://www.freepik.com/free-psd/happy-woman-dancing-isolated_269178755.htm#fromView=search&page=1&position=11&uuid=4341da1b-d692-4ffc-88ff-f2b7a82b674c&query=peoplee.jpg",
          },
          {
            name: "John Smith",
            title: "Product Manager",
            quote: "The team is incredibly supportive and innovative.",
            image: "https://www.freepik.com/free-photo/portrait-smart-professional-african-american-man-standing-with-hands-crossed-chest-confident-pose_16080284.htm#fromView=search&page=1&position=10&uuid=4341da1b-d692-4ffc-88ff-f2b7a82b674c&query=people",
          },
        ]}
        contactInfo={{
          emails: [{ type: "general", address: "" }],
          phone: "123-456-7890",
        }}
        opportunities={careersData}
      />
    </div>
  );
};

export default Careers;
