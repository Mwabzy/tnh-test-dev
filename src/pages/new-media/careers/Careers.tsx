import { FC } from "react";
import CareerList from "./CareerList";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
// import ContactForm from "@/components/ContactForm";
// import TestimonialCarousel from "@/components/TestimonialCarousel";

type CareersProps = object;

const careersData = [
  {
    position: "Software Engineer",
    description: "Develop and maintain software applications.",
    location: "Remote",
    jobType: "Full-time",
    datePosted: "2023-10-01",
    closingDate: "2023-11-01",
  },
  {
    position: "Product Manager",
    description: "Lead product development and strategy.",
    location: "On-site",
    jobType: "Full-time",
    datePosted: "2023-10-05",
    closingDate: "2023-11-05",
  },
];

const Careers: FC<CareersProps> = () => {
  return (
    <div>
      <Heading
        style="background"
        title="Careers"
        description="Join our team and make a difference in the world of healthcare."
      />

      <div className="flex flex-col items-center justify-center my-10">
        <Badge className="bg-orange-200 mb-5">
          Current Openings
        </Badge>
        <h2 className="text-4xl font-semibold text-center font-serif mb-8">Join our team and shape <br /> the future together</h2>
       <CareerList jobs={careersData} />
      </div>
      {/* <TestimonialCarousel />
      <ContactForm /> */}
      
    </div>
  );
};

export default Careers;
