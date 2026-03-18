import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CorporateDocument } from "@/types";
import {
  fetchCorporateDocuments,
  createCorporateDocument,
  updateCorporateDocument,
  deleteCorporateDocument,
} from "@/api/api";
import CorporateDocumentsForm from "./CorporateDocumentsForm";
import CorporateDocumentsTable from "./CorporateDocumentsTable";

const CorporateDocumentsPage = () => {
  const [documents, setDocuments] = useState<CorporateDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingDocument, setEditingDocument] =
    useState<CorporateDocument | null>(null);

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  useEffect(() => {
    async function loadDocuments() {
      setLoading(true);
      try {
        const data = await fetchCorporateDocuments();
        setDocuments(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Error loading corporate documents");
      } finally {
        setLoading(false);
      }
    }

    loadDocuments();
  }, []);

  const handleAdd = () => {
    setEditingDocument(null);
    setShowForm(true);
  };

  const handleSave = async (data: FormData) => {
    try {
      if (editingDocument?.id) {
        const updated = await updateCorporateDocument(editingDocument.id, data);
        setDocuments((prev) =>
          prev.map((item) => (item.id === updated.id ? updated : item)),
        );
      } else {
        const created = await createCorporateDocument(data);
        setDocuments((prev) => [created, ...prev]);
      }

      setShowForm(false);
      setEditingDocument(null);
      toast.success("Saved successfully!");
    } catch (err: any) {
      toast.error(`Error saving document: ${err.message}`);
    }
  };

  const handleDeleteClick = (id: string) => setDeleteConfirmId(id);

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;

    try {
      setDeletingId(deleteConfirmId);
      await deleteCorporateDocument(deleteConfirmId);
      setDocuments((prev) => prev.filter((item) => item.id !== deleteConfirmId));
      setDeleteConfirmId(null);
      toast.success("Deleted successfully!");
    } catch (err: any) {
      toast.error(`Error deleting document: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  const handleTogglePublish = async (document: CorporateDocument) => {
    if (!document.id) return;
    const isPublished = document.isPublished !== false;
    const formData = new FormData();
    formData.append("isPublished", String(!isPublished));

    try {
      setTogglingId(document.id);
      const updated = await updateCorporateDocument(document.id, formData);
      setDocuments((prev) =>
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
        <h1 className="text-2xl font-bold">Corporate Documents</h1>

        {!showForm && !loading && (
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add Document
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading documents...</p>
      ) : error ? (
        <p className="text-red-500 mb-4">{error}</p>
      ) : showForm ? (
        <CorporateDocumentsForm
          initialData={editingDocument}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <CorporateDocumentsTable
          data={documents}
          onEdit={(item) => {
            setEditingDocument(item);
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
          const item = documents.find((i) => i.id === deleteConfirmId);
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

export default CorporateDocumentsPage;
