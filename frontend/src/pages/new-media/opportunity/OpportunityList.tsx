import { FC } from "react";
import OpportunityItem, { Opportunity } from "./OpportunityItem";

interface OpportunityListProps {
  opportunities: Opportunity[];
}

const OpportunityList: FC<OpportunityListProps> = ({ opportunities }) => {
  return (
    <div className="w-full flex justify-center px-4 md:px-8">
      {/* Constrained content wrapper */}
      <div className="w-full max-w-6xl bg-[#f6f1f1] rounded-xl p-4 md:p-6">
        <p className="text-xs md:text-sm text-orange-700 mb-4">
          NB: The Nairobi Hospital does not charge a fee at any stage of the
          recruitment process (application, interview meeting, processing, or
          training).
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-red-900 text-white text-sm uppercase tracking-wide">
                <th className="px-4 py-3 text-left">Reference Number</th>
                <th className="px-4 py-3 text-left">Vacant Position</th>
                <th className="px-4 py-3 text-left">Closing Date</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
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
        <div className="mt-6 flex flex-col md:flex-row justify-between gap-6 text-sm text-gray-700">
          {/* LEFT TEXT */}
          <p className="md:w-2/3 leading-relaxed">
            Haven’t found what you are looking for? We are always searching for
            new talent to join us, please send your CV to{" "}
            <span className="text-red-800 font-medium">
              recruitment@nbihosp.org
            </span>{" "}
            with your preferred role as the subject, and we will contact you if
            your qualification meets any future roles
          </p>

          {/* RIGHT CONTACT INFO */}
          <div className="md:w-1/3 text-left md:text-right leading-relaxed">
            <p>Director, Human Resources</p>
            <p>The Nairobi Hospital</p>
            <p>P.O. Box 30026 – 00100</p>
            <p>NAIROBI</p>
            <p>
              Email:{" "}
              <span className="text-red-800 font-medium">
                recruitment@nbihosp.org
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityList;
