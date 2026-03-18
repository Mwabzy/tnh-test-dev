import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PublicStatement } from "@/types";
import {
  fetchPublicStatements,
  createPublicStatement,
  updatePublicStatement,
  deletePublicStatement,
} from "@/api/api";
import PublicStatementsForm from "./PublicStatementsForm";
import PublicStatementsTable from "./PublicStatementsTable";

const PublicStatementsPage = () => {
  const [statements, setStatements] = useState<PublicStatement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingStatement, setEditingStatement] =
    useState<PublicStatement | null>(null);

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  useEffect(() => {
    async function loadStatements() {
      setLoading(true);
      try {
        const data = await fetchPublicStatements();
        setStatements(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Error loading public statements");
      } finally {
        setLoading(false);
      }
    }

    loadStatements();
  }, []);

  const handleAdd = () => {
    setEditingStatement(null);
    setShowForm(true);
  };

  const handleSave = async (data: FormData) => {
    try {
      if (editingStatement?.id) {
        const updated = await updatePublicStatement(editingStatement.id, data);
        setStatements((prev) =>
          prev.map((item) => (item.id === updated.id ? updated : item)),
        );
      } else {
        const created = await createPublicStatement(data);
        setStatements((prev) => [created, ...prev]);
      }

      setShowForm(false);
      setEditingStatement(null);
      toast.success("Saved successfully!");
    } catch (err: any) {
      toast.error(`Error saving statement: ${err.message}`);
    }
  };

  const handleDeleteClick = (id: string) => setDeleteConfirmId(id);

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;

    try {
      setDeletingId(deleteConfirmId);
      await deletePublicStatement(deleteConfirmId);
      setStatements((prev) => prev.filter((item) => item.id !== deleteConfirmId));
      setDeleteConfirmId(null);
      toast.success("Deleted successfully!");
    } catch (err: any) {
      toast.error(`Error deleting statement: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  const handleTogglePublish = async (statement: PublicStatement) => {
    if (!statement.id) return;
    const isPublished = statement.isPublished !== false;
    const formData = new FormData();
    formData.append("isPublished", String(!isPublished));

    try {
      setTogglingId(statement.id);
      const updated = await updatePublicStatement(statement.id, formData);
      setStatements((prev) =>
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
        <h1 className="text-2xl font-bold">Public Statements</h1>

        {!showForm && !loading && (
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add Statement
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading statements...</p>
      ) : error ? (
        <p className="text-red-500 mb-4">{error}</p>
      ) : showForm ? (
        <PublicStatementsForm
          initialData={editingStatement}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <PublicStatementsTable
          data={statements}
          onEdit={(item) => {
            setEditingStatement(item);
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
          const item = statements.find((i) => i.id === deleteConfirmId);
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

export default PublicStatementsPage;
