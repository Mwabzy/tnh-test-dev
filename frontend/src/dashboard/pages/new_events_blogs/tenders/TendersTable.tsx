import { FC } from "react";
import { TenderListing } from "@/types";

interface TendersDashboardTableProps {
  data: TenderListing[];
  onEdit: (tender: TenderListing) => void;
  onDelete: (id: string) => void;
  deletingId?: string | null;
}

const TendersDashboardTable: FC<TendersDashboardTableProps> = ({
  data,
  onEdit,
  onDelete,
  deletingId = null,
}) => {
  if (data.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
        No tender opportunities available. Add a new opportunity.
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-serif font-semibold mb-4">
        Tender Opportunities
      </h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Opportunity</th>
            <th className="p-3">Reference Number</th>
            <th className="p-3">Description</th>
            <th className="p-3">Type</th>
            <th className="p-3">Date Posted</th>
            <th className="p-3">Closing Date</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((tender) => (
            <tr key={tender.id} className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium">{tender.opportunity}</td>
              <td className="p-3 text-sm text-gray-700">
                {tender.referenceNumber}
              </td>
              <td className="p-3">{tender.description}</td>
              <td className="p-3">
                <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded text-sm">
                  {tender.opportunityType}
                </span>
              </td>
              <td className="p-3 text-sm text-gray-600">
                {tender.datePosted}
              </td>
              <td className="p-3">
                <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded text-sm">
                  {tender.closingDate}
                </span>
              </td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => onEdit(tender)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  disabled={deletingId === tender.id}
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    tender.id !== undefined && onDelete(tender.id)
                  }
                  className={`px-3 py-1 rounded text-white ${
                    deletingId === tender.id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                  disabled={deletingId === tender.id}
                >
                  {deletingId === tender.id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TendersDashboardTable;
