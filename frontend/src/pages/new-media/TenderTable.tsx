import { FC } from "react";
import { Opportunity } from "./opportunity/OpportunityItem";

interface TenderTableProps {
  tenders: Opportunity[];
}

const TenderTable: FC<TenderTableProps> = ({ tenders }) => {
  return (
    <div className="w-[95%] md:w-full mx-auto">
      <div className="overflow-x-auto border border-red-100 rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-red-900 text-white text-sm uppercase tracking-wide">
              <th className="p-4 text-left">Reference Number</th>
              <th className="p-4 text-center">Tender</th>
              <th className="p-4 text-left">Closing Date</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {tenders.map((tender, index) => {
              const tenderText = tender.opportunity;
              return (
                <tr
                  key={
                    tender.referenceNumber ??
                    tender.opportunity ??
                    index
                  }
                  className="border-b border-red-200"
                >
                  <td className="p-4 text-sm text-gray-900 whitespace-nowrap">
                    {tender.referenceNumber || "-"}
                  </td>
                  <td className="p-4 text-sm text-gray-900 text-center uppercase leading-7">
                    {tenderText}
                  </td>
                  <td className="p-4 text-sm text-gray-900 whitespace-nowrap">
                    {tender.closingDate ?? "-"}
                  </td>
                  <td className="p-4 text-sm">
                    {tender.fileUrl ? (
                      <a
                        href={tender.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-600 font-semibold hover:underline"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-gray-400">No file</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TenderTable;
