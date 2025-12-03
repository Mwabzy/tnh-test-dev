import { FC } from "react";
import { ClinicalService } from "@/types";

interface DashboardTableProps {
  data: ClinicalService[];
  onEdit: (service: ClinicalService) => void;
  onDelete: (id: number) => void; // triggers parent modal
  deletingId?: number | null; // loading state on delete button
}

const DashboardTable: FC<DashboardTableProps> = ({
  data,
  onEdit,
  onDelete,
  deletingId = null,
}) => {
  if (data.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
        No data available. Add a new clinical service.
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Clinical Services</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Title</th>
            <th className="p-3">Tagline</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium">{item.title}</td>
              <td className="p-3">{item.tagline}</td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => onEdit(item)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  disabled={deletingId === item.id}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className={`px-3 py-1 rounded text-white ${
                    deletingId === item.id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                  disabled={deletingId === item.id}
                >
                  {deletingId === item.id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
