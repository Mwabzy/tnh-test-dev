import { FC } from "react";
import OpportunityItem, { Opportunity } from "./OpportunityItem";

interface OpportunityListProps {
  opportunities: Opportunity[];
}

const OpportunityList: FC<OpportunityListProps> = ({ opportunities }) => {
  const action = (fileUrl?: string) => {
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    } else {
      alert("No file available for this opportunity.");
    }
  };

  return (
    <div className="w-[95%] md:w-full flex flex-col items-center justify-center gap-4 mx-auto container">
      {opportunities.map((opportunity, index) => (
        <OpportunityItem
          key={index}
          opportunity={{
            ...opportunity,
            fileUrl: opportunity.fileUrl ?? ""
          }}
          action={action}
        />
      ))}
    </div>
  );
};

export default OpportunityList;
