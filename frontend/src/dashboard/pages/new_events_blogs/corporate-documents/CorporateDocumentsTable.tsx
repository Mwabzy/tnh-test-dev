import { FC } from "react";
import { CorporateDocument } from "@/types";

interface CorporateDocumentsTableProps {
  data: CorporateDocument[];
  onEdit: (document: CorporateDocument) => void;
  onDelete: (id: string) => void;
  onTogglePublish: (document: CorporateDocument) => void;
  deletingId?: string | null;
  togglingId?: string | null;
}

const CorporateDocumentsTable: FC<CorporateDocumentsTableProps> = ({
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
        No corporate documents available. Add a new document.
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-serif font-semibold mb-4">
        Corporate Documents
      </h2>
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
          {data.map((document) => (
            <tr key={document.id} className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium">{document.title}</td>
              <td className="p-3 text-sm text-gray-700">
                {document.fileUrl ? (
                  <a
                    href={document.fileUrl}
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
                  const isPublished = document.isPublished !== false;
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
                        onClick={() => onTogglePublish(document)}
                        disabled={togglingId === document.id}
                        className={`text-xs px-2 py-1 rounded border ${
                          togglingId === document.id
                            ? "border-gray-300 text-gray-400 cursor-not-allowed"
                            : "border-gray-400 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {togglingId === document.id
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
                  onClick={() => onEdit(document)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  disabled={deletingId === document.id}
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    document.id !== undefined && onDelete(document.id)
                  }
                  className={`px-3 py-1 rounded text-white ${
                    deletingId === document.id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                  disabled={deletingId === document.id}
                >
                  {deletingId === document.id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CorporateDocumentsTable;
