import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ClinicalFaqForm from "./ClinicalFaqForm";
import ClinicalFaqsTables from "./ClinicalFaqTable";
import {
  fetchClinicalFaqs,
  createClinicalFaq,
  updateClinicalFaq,
  deleteClinicalFaq,
} from "@/api/api";

import { clinicalFaq } from "@/types";

// ---------------- PARENT ----------------
const ClinicalFaqsParent = () => {
  const [faqs, setFaqs] = useState<clinicalFaq[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingFaq, setEditingFaq] = useState<clinicalFaq | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // ---------------- FETCH ----------------
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchClinicalFaqs();
        setFaqs(data);
      } catch (err: any) {
        toast.error(err.message || "Failed to load FAQs");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ---------------- ACTIONS ----------------
  const handleAdd = () => {
    setEditingFaq(null);
    setShowForm(true);
  };

  const handleEdit = (faq: clinicalFaq) => {
    setEditingFaq(faq);
    setShowForm(true);
  };

  const handleSave = async (faq: clinicalFaq) => {
    try {
      const payload = {
        brief: faq.brief,
        startTime: faq.startTime,
        stopTime: faq.stopTime,
      };

      const saved = editingFaq?.id
        ? await updateClinicalFaq(editingFaq.id, payload)
        : await createClinicalFaq(payload);

      setFaqs((prev) =>
        editingFaq?.id
          ? prev.map((f) => (f.id === saved.id ? saved : f))
          : [...prev, saved],
      );

      toast.success("FAQ saved successfully");
      setShowForm(false);
      setEditingFaq(null);
    } catch (err: any) {
      toast.error(err.message || "Save failed");
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;

    try {
      setDeletingId(deleteConfirmId);
      await deleteClinicalFaq(deleteConfirmId);
      setFaqs((prev) => prev.filter((f) => f.id !== deleteConfirmId));
      toast.success("FAQ deleted");
    } catch (err: any) {
      toast.error(err.message || "Delete failed");
    } finally {
      setDeletingId(null);
      setDeleteConfirmId(null);
    }
  };

  // ---------------- UI ----------------
  if (loading) return <p>Loading FAQs...</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Clinical FAQs</h1>
        {!showForm && (
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add FAQ
          </button>
        )}
      </div>

      {showForm ? (
        <ClinicalFaqForm
          initialData={editingFaq}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <ClinicalFaqsTables
          data={faqs as any}
          onEdit={handleEdit as any}
          onDelete={(id) => setDeleteConfirmId(id)}
          deletingId={deletingId}
        />
      )}

      {/* DELETE CONFIRMATION */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-80">
            <p className="mb-4">Delete this FAQ?</p>
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

export default ClinicalFaqsParent;
