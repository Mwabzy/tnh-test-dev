import { FC } from "react";
import { CSR } from "@/types";

interface CsrTableProps {
  data: CSR[];
  onEdit: (csr: CSR) => void;
  onDelete: (id: number) => void;
  deletingId?: number | null;
}

const CsrTable: FC<CsrTableProps> = ({
  data,
  onEdit,
  onDelete,
  deletingId = null,
}) => {
  if (data.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
        No CSR entries available. Add a new entry.
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">
        Corporate Social Responsibility
      </h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Cover</th>
            <th className="p-3">Title</th>
            <th className="p-3">Author</th>
            <th className="p-3">Short Description</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((csr) => (
            <tr key={csr.id} className="border-b hover:bg-gray-50">
              <td className="p-3">
                {csr.coverImage ? (
                  <img
                    src={csr.coverImage}
                    alt={csr.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                    No Image
                  </div>
                )}
              </td>
              <td className="p-3 font-medium">{csr.title}</td>
              <td className="p-3">{csr.author}</td>
              <td className="p-3">{csr.shortdesc}</td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => onEdit(csr)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  disabled={deletingId === csr.id}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(csr.id)}
                  className={`px-3 py-1 rounded text-white ${
                    deletingId === csr.id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                  disabled={deletingId === csr.id}
                >
                  {deletingId === csr.id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CsrTable;
