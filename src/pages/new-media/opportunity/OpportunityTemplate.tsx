import Heading from "@/components/Heading";
import { Badge } from "lucide-react";
import { FunctionComponent } from "react";
import OpportunityList from "./OpportunityList";
import TestimonialCarousel, {
  Testimonial,
} from "@/components/TestimonialCarousel";
import ContactForm from "@/components/ContactForm";
import { Opportunity } from "./OpportunityItem";

interface OpportunityTemplateProps {
  title?: string;
  description?: string;
  testimonials?: Testimonial[];
  contactInfo?: {
    emails: { type: string; address: string }[];
    phone: string;
  };
  opportunities?: Opportunity[];
}

const OpportunityTemplate: FunctionComponent<OpportunityTemplateProps> = ({
  title,
  description,
  testimonials = [],
  contactInfo = {
    emails: [{ type: "general", address: "" }],
    phone: "",
  },
  opportunities = [],
}) => {
  return (
    <div>
      <Heading style="background" title={title} description={description} />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center my-10">
          <Badge className="bg-orange-200 mb-5">Current Openings</Badge>
          <h2 className="text-4xl font-semibold text-center font-serif mb-8">
            Join us and shape <br /> the future together
          </h2>
          <OpportunityList opportunities={opportunities} />
        </div>
        <TestimonialCarousel testimonials={testimonials} />
        <ContactForm contactInfo={contactInfo} />
      </div>
    </div>
  );
};

export default OpportunityTemplate;
