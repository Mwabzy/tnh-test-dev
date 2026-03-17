import { FC, useState, DragEvent } from "react";
import { Doctor } from "@/types";

interface DoctorDashboardTableProps {
  data: Doctor[];
  onEdit: (doctor: Doctor) => void;
  onDelete: (id: number) => void;
  deletingId?: number | null;
  onReorder?: (nextOrder: Doctor[]) => void;
}

const DoctorDashboardTable: FC<DoctorDashboardTableProps> = ({
  data,
  onEdit,
  onDelete,
  deletingId = null,
  onReorder,
}) => {
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [dragOverId, setDragOverId] = useState<number | null>(null);

  const moveItem = (list: Doctor[], fromId: number, toId: number) => {
    const fromIndex = list.findIndex((item) => item.id === fromId);
    const toIndex = list.findIndex((item) => item.id === toId);
    if (fromIndex === -1 || toIndex === -1) return list;
    const updated = [...list];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    return updated;
  };

  const handleDrop = (targetId: number) => {
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

  const handleDragStart = (id: number, event: DragEvent) => {
    setDraggingId(id);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", String(id));
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    setDragOverId(null);
  };

  const handleDragOver = (id: number, event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    setDragOverId(id);
  };

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
            <th className="p-3 w-24">Order</th>
            <th className="p-3">Name</th>
            <th className="p-3">Role</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((doctor, index) => {
            const doctorId = doctor.id;
            return (
            <tr
              key={doctorId ?? index}
              className={`border-b hover:bg-gray-50 ${
                dragOverId === doctorId ? "bg-blue-50" : ""
              }`}
              onDragOver={(event) => {
                if (!doctorId) return;
                handleDragOver(doctorId, event);
              }}
              onDrop={(event) => {
                if (!doctorId) return;
                event.preventDefault();
                handleDrop(doctorId);
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
                    draggable={Boolean(doctorId)}
                    onDragStart={(event) => {
                      if (!doctorId) return;
                      handleDragStart(doctorId, event);
                    }}
                    onDragEnd={handleDragEnd}
                  >
                    Drag
                  </button>
                </div>
              </td>
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
                  onClick={() => doctor.id !== undefined && onDelete(doctor.id)}
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorDashboardTable;
