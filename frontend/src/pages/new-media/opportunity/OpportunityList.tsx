import { FC } from "react";
import OpportunityItem, { Opportunity } from "./OpportunityItem";

interface OpportunityListProps {
  opportunities: Opportunity[];
}

const OpportunityList: FC<OpportunityListProps> = ({ opportunities }) => {
  return (
    <div className="w-[95%] md:w-full flex flex-col items-center justify-center mx-auto container">
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-red-900 text-white text-sm uppercase tracking-wide">
              <th className="p-3 text-left">Reference Number</th>
              <th className="p-3 text-left">Vacant Position</th>
              <th className="p-3 text-left">Closing Date</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {opportunities.map((opportunity, index) => (
              <OpportunityItem
                key={
                  opportunity.referenceNumber ??
                  opportunity.opportunity ??
                  index
                }
                opportunity={{
                  ...opportunity,
                  fileUrl: opportunity.fileUrl ?? "",
                }}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OpportunityList;
