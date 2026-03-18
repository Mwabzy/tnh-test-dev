import { FC } from "react";
import { Interview } from "@/types";

interface InterviewsTableProps {
  data: Interview[];
  onEdit: (interview: Interview) => void;
  onDelete: (id: string) => void;
  onTogglePublish: (interview: Interview) => void;
  deletingId?: string | null;
  togglingId?: string | null;
}

const InterviewsTable: FC<InterviewsTableProps> = ({
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
        No interviews available. Add a new interview.
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-serif font-semibold mb-4">Interviews</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Title</th>
            <th className="p-3">Video</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((interview) => (
            <tr key={interview.id} className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium">{interview.title}</td>
              <td className="p-3 text-sm text-gray-700">
                {interview.videoUrl ? (
                  <a
                    href={interview.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View video
                  </a>
                ) : (
                  "—"
                )}
              </td>
              <td className="p-3">
                {(() => {
                  const isPublished = interview.isPublished !== false;
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
                        onClick={() => onTogglePublish(interview)}
                        disabled={togglingId === interview.id}
                        className={`text-xs px-2 py-1 rounded border ${
                          togglingId === interview.id
                            ? "border-gray-300 text-gray-400 cursor-not-allowed"
                            : "border-gray-400 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {togglingId === interview.id
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
                  onClick={() => onEdit(interview)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  disabled={deletingId === interview.id}
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    interview.id !== undefined && onDelete(interview.id)
                  }
                  className={`px-3 py-1 rounded text-white ${
                    deletingId === interview.id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                  disabled={deletingId === interview.id}
                >
                  {deletingId === interview.id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InterviewsTable;
