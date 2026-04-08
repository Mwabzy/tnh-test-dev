import { FC } from "react";
import { UserEnquiry, UserEnquiryCategory } from "@/types";

interface UserEnquiryTableProps {
  category: UserEnquiryCategory;
  data: UserEnquiry[];
  onEdit: (enquiry: UserEnquiry) => void;
  onDelete: (id: string) => void;
  deletingId?: string | null;
}

const UserEnquiryTable: FC<UserEnquiryTableProps> = ({
  category,
  data,
  onEdit,
  onDelete,
  deletingId = null,
}) => {
  if (data.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
        No {category.toLowerCase()} entries available. Add a new entry.
      </div>
    );
  }

  const isBookingCategory = category === "Bookings";

  return (
    <div className="bg-white shadow rounded-lg p-6 overflow-x-auto">
      <table className="w-full border-collapse min-w-[760px]">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Full Name</th>
            {isBookingCategory ? (
              <>
                <th className="p-3">Service</th>
                <th className="p-3">Location</th>
                <th className="p-3">Appointment</th>
              </>
            ) : (
              <th className="p-3">User Email</th>
            )}
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((enquiry) => (
            <tr key={enquiry.id} className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium">{enquiry.fullName}</td>
              {isBookingCategory ? (
                <>
                  <td className="p-3">{enquiry.service || "-"}</td>
                  <td className="p-3">{enquiry.location || "-"}</td>
                  <td className="p-3">
                    {[enquiry.appointmentDate || "-", enquiry.appointmentTime || "-"].join(" / ")}
                  </td>
                </>
              ) : (
                <td className="p-3">{enquiry.email}</td>
              )}
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => onEdit(enquiry)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  disabled={deletingId === enquiry.id}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(enquiry.id)}
                  className={`px-3 py-1 rounded text-white ${
                    deletingId === enquiry.id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                  disabled={deletingId === enquiry.id}
                >
                  {deletingId === enquiry.id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserEnquiryTable;
