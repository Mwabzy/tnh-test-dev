import { FC } from "react";
import { Doctor } from "@/types";

interface DoctorDashboardTableProps {
  data: Doctor[];
  onEdit: (doctor: Doctor) => void;
  onDelete: (id: number) => void;
  deletingId?: number | null;
}

const DoctorDashboardTable: FC<DoctorDashboardTableProps> = ({
  data,
  onEdit,
  onDelete,
  deletingId = null,
}) => {
  if (data.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
        No doctors available. Add a new doctor.
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-serif font-semibold mb-4">Doctors</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Role</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((doctor) => (
            <tr key={doctor.id} className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium">{doctor.name}</td>
              <td className="p-3">{doctor.role}</td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => onEdit(doctor)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  disabled={deletingId === doctor.id}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(doctor.id)}
                  className={`px-3 py-1 rounded text-white ${
                    deletingId === doctor.id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                  disabled={deletingId === doctor.id}
                >
                  {deletingId === doctor.id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorDashboardTable;
