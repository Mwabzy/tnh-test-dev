import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import RoomWardsForm from "./RoomWardsForm";
import RoomWardsTable from "./RoomWardsTable";

import {
  fetchRoomWards,
  createRoomWard,
  updateRoomWard,
  deleteRoomWard,
} from "@/api/api";

import { RoomWard } from "@/types";

// ---------------- PARENT ----------------
const RoomWards = () => {
  const [roomWards, setRoomWards] = useState<RoomWard[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<RoomWard | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // ---------------- FETCH ----------------
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchRoomWards();
        setRoomWards(data);
      } catch (err: any) {
        toast.error(err.message || "Failed to load room/wards");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ---------------- ACTIONS ----------------
  const handleAdd = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (item: RoomWard) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleSave = async (
    item: Pick<
      RoomWard,
      "title" | "name_fr" | "name_es" | "name_zh" | "name_ru" | "features"
    > & { image_file?: File | null },
  ) => {
    try {
      const payload = new FormData();
      payload.append("title", item.title);
      payload.append("name_fr", item.name_fr ?? "");
      payload.append("name_es", item.name_es ?? "");
      payload.append("name_zh", item.name_zh ?? "");
      payload.append("name_ru", item.name_ru ?? "");
      payload.append("features", JSON.stringify(item.features ?? []));
      if (item.image_file) {
        payload.append("image_file", item.image_file);
      }

      const saved = editingItem?.id
        ? await updateRoomWard(editingItem.id, payload)
        : await createRoomWard(payload);

      setRoomWards((prev) =>
        editingItem?.id
          ? prev.map((rw) => (rw.id === saved.id ? saved : rw))
          : [...prev, saved],
      );

      toast.success("Saved successfully");
      setShowForm(false);
      setEditingItem(null);
    } catch (err: any) {
      toast.error(err.message || "Save failed");
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;

    try {
      setDeletingId(deleteConfirmId);
      await deleteRoomWard(deleteConfirmId);
      setRoomWards((prev) => prev.filter((rw) => rw.id !== deleteConfirmId));
      toast.success("Deleted successfully");
    } catch (err: any) {
      toast.error(err.message || "Delete failed");
    } finally {
      setDeletingId(null);
      setDeleteConfirmId(null);
    }
  };

  // ---------------- UI ----------------
  if (loading) return <p>Loading Room/Wards...</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Rooms & Wards</h1>
        {!showForm && (
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add Room/Ward
          </button>
        )}
      </div>

      {showForm ? (
        <RoomWardsForm
          initialData={editingItem}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <RoomWardsTable
          data={roomWards as any}
          onEdit={handleEdit as any}
          onDelete={(id) => setDeleteConfirmId(id)}
          deletingId={deletingId}
        />
      )}

      {/* DELETE CONFIRMATION */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-80">
            <p className="mb-4">Delete this item?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                {deletingId ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomWards;

