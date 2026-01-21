import { FC } from "react";
import { outpatientCenter } from "@/types";

interface Props {
  data: outpatientCenter[];
  onEdit: (center: outpatientCenter) => void;
  onDelete: (id: number) => void;
  deletingId?: number | null;
}

const OutpatientCenterTable: FC<Props> = ({
  data,
  onEdit,
  onDelete,
  deletingId = null,
}) => {
  if (data.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
        No outpatient centers available. Add a new center.
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Location</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((center) => (
            <tr
              key={center.id}
              className="border-b hover:bg-gray-50"
            >
              <td className="p-3 font-medium">{center.name}</td>
              <td className="p-3">{center.location}</td>

              <td className="p-3 flex gap-2">
                <button
                  onClick={() => onEdit(center)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  disabled={deletingId === center.id}
                >
                  Edit
                </button>

                <button
                  onClick={() => center.id && onDelete(center.id)}
                  disabled={deletingId === center.id}
                  className={`px-3 py-1 rounded text-white ${
                    deletingId === center.id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {deletingId === center.id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OutpatientCenterTable;
