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
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Title</th>
            <th className="p-3">Author</th>
            <th className="p-3">Short Description</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((csr) => (
            <tr key={csr.id} className="border-b hover:bg-gray-50">
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
