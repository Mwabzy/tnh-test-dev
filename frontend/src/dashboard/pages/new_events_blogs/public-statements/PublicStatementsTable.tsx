import { FC } from "react";
import { PublicStatement } from "@/types";

interface PublicStatementsTableProps {
  data: PublicStatement[];
  onEdit: (statement: PublicStatement) => void;
  onDelete: (id: string) => void;
  onTogglePublish: (statement: PublicStatement) => void;
  deletingId?: string | null;
  togglingId?: string | null;
}

const PublicStatementsTable: FC<PublicStatementsTableProps> = ({
  data,
  onEdit,
  onDelete,
  onTogglePublish,
  deletingId = null,
  togglingId = null,
}) => {
  if (data.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
        No public statements available. Add a new statement.
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-serif font-semibold mb-4">Public Statements</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Title</th>
            <th className="p-3">File</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((statement) => (
            <tr key={statement.id} className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium">{statement.title}</td>
              <td className="p-3 text-sm text-gray-700">
                {statement.fileUrl ? (
                  <a
                    href={statement.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View file
                  </a>
                ) : (
                  "—"
                )}
              </td>
              <td className="p-3">
                {(() => {
                  const isPublished = statement.isPublished !== false;
                  return (
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {isPublished ? "Published" : "Unpublished"}
                      </span>
                      <button
                        type="button"
                        onClick={() => onTogglePublish(statement)}
                        disabled={togglingId === statement.id}
                        className={`text-xs px-2 py-1 rounded border ${
                          togglingId === statement.id
                            ? "border-gray-300 text-gray-400 cursor-not-allowed"
                            : "border-gray-400 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {togglingId === statement.id
                          ? "Saving..."
                          : isPublished
                            ? "Unpublish"
                            : "Publish"}
                      </button>
                    </div>
                  );
                })()}
              </td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => onEdit(statement)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  disabled={deletingId === statement.id}
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    statement.id !== undefined && onDelete(statement.id)
                  }
                  className={`px-3 py-1 rounded text-white ${
                    deletingId === statement.id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                  disabled={deletingId === statement.id}
                >
                  {deletingId === statement.id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PublicStatementsTable;
