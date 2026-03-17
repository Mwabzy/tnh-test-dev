import { FC } from "react";
import { JobListing } from "@/types";

interface CareerDashboardTableProps {
  data: JobListing[];
  onEdit: (job: JobListing) => void;
  onDelete: (id: string) => void;
  onTogglePublish: (job: JobListing) => void;
  deletingId?: string | null;
  togglingId?: string | null;
}

const CareerDashboardTable: FC<CareerDashboardTableProps> = ({
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
        No job opportunities available. Add a new opportunity.
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-serif font-semibold mb-4">
        Career Opportunities
      </h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">REF. Number</th>
            <th className="p-3">Job Name</th>
            <th className="p-3">Status</th>
            <th className="p-3">Closing Date</th>
            <th className="p-3">File</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((job) => (
            <tr key={job.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{job.referenceNumber ?? "-"}</td>
              <td className="p-3 font-medium">{job.title}</td>
              <td className="p-3">
                {(() => {
                  const isPublished = job.isPublished !== false;
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
                        onClick={() => onTogglePublish(job)}
                        disabled={togglingId === job.id}
                        className={`text-xs px-2 py-1 rounded border ${
                          togglingId === job.id
                            ? "border-gray-300 text-gray-400 cursor-not-allowed"
                            : "border-gray-400 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {togglingId === job.id
                          ? "Saving..."
                          : isPublished
                            ? "Unpublish"
                            : "Publish"}
                      </button>
                    </div>
                  );
                })()}
              </td>
              <td className="p-3 text-sm text-gray-600">
                {job.closingDate ?? "-"}
              </td>
              <td className="p-3">
                {job.fileUrl ? (
                  <a
                    href={job.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    View
                  </a>
                ) : (
                  <span className="text-gray-400 text-sm">No file</span>
                )}
              </td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => onEdit(job)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  disabled={deletingId === job.id}
                >
                  Edit
                </button>
                <button
                  onClick={() => job.id !== undefined && onDelete(job.id)}
                  className={`px-3 py-1 rounded text-white ${
                    deletingId === job.id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                  disabled={deletingId === job.id}
                >
                  {deletingId === job.id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CareerDashboardTable;
