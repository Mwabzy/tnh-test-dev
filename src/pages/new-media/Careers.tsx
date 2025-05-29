import { FC } from "react";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import ContactForm from "@/components/ContactForm";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import OpportunityList from "./opportunity/OpportunityList";
import OpportunityTemplate from "./opportunity/OpportunityTemplate";

type CareersProps = {
  
};

const careersData = [
  {
    opportunity: "Software Engineer",
    description: "Develop and maintain software applications.",
    location: "Remote",
    opportunityType: "Full-time",
    datePosted: "2023-10-01",
    closingDate: "2023-11-01",
  },
  {
    opportunity: "Product Manager",
    description: "Lead product development and strategy.",
    location: "On-site",
    opportunityType: "Full-time",
    datePosted: "2023-10-05",
    closingDate: "2023-11-05",
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
            image: "https://example.com/jane.jpg",
          },
          {
            name: "John Smith",
            title: "Product Manager",
            quote: "The team is incredibly supportive and innovative.",
            image: "https://example.com/john.jpg",
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
