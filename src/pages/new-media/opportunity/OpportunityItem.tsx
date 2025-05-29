import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FC } from "react";

export interface Opportunity {
  opportunity: string;
  description: string;
  location: string;
  opportunityType: string;
  datePosted: string;
  closingDate?: string;
  
}

interface OpportunityItemProps {
  opportunity: Opportunity;
  action: () => void;
}

const OpportunityItem: FC<OpportunityItemProps> = ({
  opportunity,
  action,
}) => {
  return (
    <Card className="flex flex-col p-4 border border-gray-300 rounded w-full">
      <CardContent className="flex flex-col gap-2 items-start w-full ">
        <div className="flex justify-between items-center w-full">
          <h3 className="flex text-lg font-semibold font-serif">
            {opportunity.opportunity}
          </h3>
          <Badge className="bg-orange-200 flex">
            Date Posted: {opportunity.datePosted}
          </Badge>
        </div>
        <p className="text-gray-600">{opportunity.description}</p>
        <div className="flex gap-2">
          <Badge className="bg-orange-200">{opportunity.location}</Badge>
          <Badge className="bg-orange-200">{opportunity.opportunityType}</Badge>
        </div>
        <Button
          variant="link"
          className="px-0 font-serif text-base"
          onClick={action}
        >
          View More
        </Button>
      </CardContent>
    </Card>
  );
};

export default OpportunityItem;
