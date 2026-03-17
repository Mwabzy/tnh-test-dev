import { FC, useState, DragEvent } from "react";
import { TeamMember } from "@/types";

interface TeamMembersTableProps {
  data: TeamMember[];
  onEdit: (member: TeamMember) => void;
  onDelete: (id: string) => void;
  deletingId?: string | null;
  onReorder?: (nextOrder: TeamMember[]) => void;
}

const TeamMembersTable: FC<TeamMembersTableProps> = ({
  data,
  onEdit,
  onDelete,
  deletingId = null,
  onReorder,
}) => {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const moveItem = (list: TeamMember[], fromId: string, toId: string) => {
    const fromIndex = list.findIndex((item) => item.id === fromId);
    const toIndex = list.findIndex((item) => item.id === toId);
    if (fromIndex === -1 || toIndex === -1) return list;
    const updated = [...list];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    return updated;
  };

  const handleDrop = (targetId: string) => {
    if (draggingId === null || draggingId === targetId) {
      setDraggingId(null);
      setDragOverId(null);
      return;
    }
    const nextOrder = moveItem(data, draggingId, targetId);
    onReorder?.(nextOrder);
    setDraggingId(null);
    setDragOverId(null);
  };

  const handleDragStart = (id: string, event: DragEvent) => {
    setDraggingId(id);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", id);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    setDragOverId(null);
  };

  const handleDragOver = (id: string, event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    setDragOverId(id);
  };

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
            <th className="p-3 w-24">Order</th>
            <th className="p-3">Name</th>
            <th className="p-3">Role</th>
            <th className="p-3">Group</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((member, index) => (
            <tr
              key={member.id}
              className={`border-b hover:bg-gray-50 ${
                dragOverId === member.id ? "bg-blue-50" : ""
              }`}
              onDragOver={(event) => handleDragOver(member.id, event)}
              onDrop={(event) => {
                event.preventDefault();
                handleDrop(member.id);
              }}
            >
              <td className="p-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs">
                    {index + 1}
                  </span>
                  <button
                    type="button"
                    className="text-xs text-gray-500 hover:text-gray-800 cursor-move"
                    draggable
                    onDragStart={(event) => handleDragStart(member.id, event)}
                    onDragEnd={handleDragEnd}
                  >
                    Drag
                  </button>
                </div>
              </td>
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
