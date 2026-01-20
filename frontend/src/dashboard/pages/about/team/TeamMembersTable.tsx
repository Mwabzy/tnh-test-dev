import { FC } from "react";
import { TeamMember } from "@/types";

interface TeamMembersTableProps {
  data: TeamMember[];
  onEdit: (member: TeamMember) => void;
  onDelete: (id: string) => void;
  deletingId?: string | null;
}

const TeamMembersTable: FC<TeamMembersTableProps> = ({
  data,
  onEdit,
  onDelete,
  deletingId = null,
}) => {
  if (data.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
        No team members available. Add a new member.
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Team Members</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Role</th>
            <th className="p-3">Group</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((member) => (
            <tr key={member.id} className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium">{member.name}</td>
              <td className="p-3">{member.role}</td>
              <td className="p-3">{member.group || "-"}</td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => onEdit(member)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  disabled={deletingId === member.id}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(member.id)}
                  className={`px-3 py-1 rounded text-white ${
                    deletingId === member.id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                  disabled={deletingId === member.id}
                >
                  {deletingId === member.id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamMembersTable;
