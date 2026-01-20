import { useState, useEffect } from "react";
import BlogTable from "./BlogTable";
import BlogForm from "./BlogForms";
import { Blog } from "@/types";
import {
  fetchBlogPosts,
  createBlogPosts,
  updateBlogPosts,
  deleteBlogPosts,
} from "@/api/api";
import toast from "react-hot-toast";

const EventsAnnouncements = () => {
  const group = "EVENTS"; // unique identifier for this section
  const title = "Events & Announcements";

  const [items, setItems] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Blog | null>(null);

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Load events & announcements
  useEffect(() => {
    async function loadItems() {
      setLoading(true);
      try {
        const data = await fetchBlogPosts(); // fetch only EVENTS group
        setItems(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Error loading events & announcements");
      } finally {
        setLoading(false);
      }
    }

    loadItems();
  }, []);

  const handleAdd = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleSave = async (data: FormData) => {
    try {
      data.append("group", group); // mark this item with EVENTS group
      const item = Object.fromEntries(data) as unknown as Blog;

      if (editingItem?.id) {
        const updated = await updateBlogPosts(editingItem.id, item);
        setItems((prev) =>
          prev.map((i) => (i.id === updated.id ? updated : i)),
        );
      } else {
        const created = await createBlogPosts(item);
        setItems((prev) => [created, ...prev]);
      }

      setShowForm(false);
      setEditingItem(null);
      toast.success("Saved successfully!");
    } catch (err: any) {
      toast.error(`Error saving item: ${err.message}`);
    }
  };

  const handleDeleteClick = (id: string) => setDeleteConfirmId(id);

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;

    try {
      setDeletingId(deleteConfirmId);
      await deleteBlogPosts(deleteConfirmId);
      setItems((prev) => prev.filter((i) => i.id !== deleteConfirmId));
      setDeleteConfirmId(null);
      toast.success("Deleted successfully!");
    } catch (err: any) {
      toast.error(`Error deleting item: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{title}</h1>

        {!showForm && !loading && (
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add Event / Announcement
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading events & announcements...</p>
      ) : error ? (
        <p className="text-red-500 mb-4">{error}</p>
      ) : showForm ? (
        <BlogForm
          initialData={editingItem}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
          group={"EVENTS"}
        />
      ) : (
        <BlogTable
          data={items}
          onEdit={(item) => {
            setEditingItem(item);
            setShowForm(true);
          }}
          onDelete={handleDeleteClick}
          deletingId={deletingId}
        />
      )}

      {deleteConfirmId &&
        (() => {
          const item = items.find((i) => i.id === deleteConfirmId);
          return (
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
              <div className="bg-white p-6 rounded shadow-lg w-96">
                <p className="text-lg mb-4">
                  Are you sure you want to delete <strong>{item?.title}</strong>
                  ?
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded"
                  >
                    {deletingId ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
    </div>
  );
};

export default EventsAnnouncements;
