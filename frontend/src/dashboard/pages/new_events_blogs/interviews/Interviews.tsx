import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Interview } from "@/types";
import {
  fetchInterviews,
  createInterview,
  updateInterview,
  deleteInterview,
} from "@/api/api";
import InterviewsForm from "./InterviewsForm";
import InterviewsTable from "./InterviewsTable";

const InterviewsPage = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingInterview, setEditingInterview] =
    useState<Interview | null>(null);

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  useEffect(() => {
    async function loadInterviews() {
      setLoading(true);
      try {
        const data = await fetchInterviews();
        setInterviews(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Error loading interviews");
      } finally {
        setLoading(false);
      }
    }

    loadInterviews();
  }, []);

  const handleAdd = () => {
    setEditingInterview(null);
    setShowForm(true);
  };

  const handleSave = async (payload: Interview) => {
    try {
      if (editingInterview?.id) {
        const updated = await updateInterview(editingInterview.id, payload);
        setInterviews((prev) =>
          prev.map((item) => (item.id === updated.id ? updated : item)),
        );
      } else {
        const created = await createInterview(payload);
        setInterviews((prev) => [created, ...prev]);
      }

      setShowForm(false);
      setEditingInterview(null);
      toast.success("Saved successfully!");
    } catch (err: any) {
      toast.error(`Error saving interview: ${err.message}`);
    }
  };

  const handleDeleteClick = (id: string) => setDeleteConfirmId(id);

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;

    try {
      setDeletingId(deleteConfirmId);
      await deleteInterview(deleteConfirmId);
      setInterviews((prev) => prev.filter((item) => item.id !== deleteConfirmId));
      setDeleteConfirmId(null);
      toast.success("Deleted successfully!");
    } catch (err: any) {
      toast.error(`Error deleting interview: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  const handleTogglePublish = async (interview: Interview) => {
    if (!interview.id) return;
    const isPublished = interview.isPublished !== false;

    try {
      setTogglingId(interview.id);
      const updated = await updateInterview(interview.id, {
        isPublished: !isPublished,
      });
      setInterviews((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item)),
      );
      toast.success(isPublished ? "Unpublished" : "Published");
    } catch (err: any) {
      toast.error(`Error updating status: ${err.message}`);
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Interviews</h1>

        {!showForm && !loading && (
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add Interview
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading interviews...</p>
      ) : error ? (
        <p className="text-red-500 mb-4">{error}</p>
      ) : showForm ? (
        <InterviewsForm
          initialData={editingInterview}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <InterviewsTable
          data={interviews}
          onEdit={(item) => {
            setEditingInterview(item);
            setShowForm(true);
          }}
          onDelete={handleDeleteClick}
          onTogglePublish={handleTogglePublish}
          deletingId={deletingId}
          togglingId={togglingId}
        />
      )}

      {deleteConfirmId &&
        (() => {
          const item = interviews.find((i) => i.id === deleteConfirmId);
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

export default InterviewsPage;
