import { FC } from "react";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import ContactForm from "@/components/ContactForm";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import OpportunityList from "./opportunity/OpportunityList";
import OpportunityTemplate from "./opportunity/OpportunityTemplate";

type TendersProps = {
  
};

const tendersData = [
    {
        opportunity: "Web Development Tender",
        description: "Seeking a vendor for web development services.",
        location: "Remote",
        opportunityType: "Tender",
        datePosted: "2023-10-01",
        closingDate: "2023-11-01",
        fileUrl: "https://example.com/tender1.pdf",
    },
    {
        opportunity: "Graphic Design Tender",
        description: "Looking for graphic design services for our new project.",
        location: "Remote",
        opportunityType: "Tender",
        datePosted: "2023-10-05",
        closingDate: "2023-11-05",
        fileUrl: "https://example.com/tender2.pdf",
    },
];



const Tenders: FC<TendersProps> = () => {
  return (
    <div>
     <OpportunityTemplate
        title="Opportunities for Tenders"
        description="Find exciting tender opportunities with us."
        testimonials={[
          {
            name: "Jane Doe",
            title: "Software Engineer",
            quote: "The process of working on tenders has been a transformative experience.",
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
        opportunities={tendersData}
      />
    </div>
  );
};

export default Tenders;
