import { useState, useEffect } from "react";
import CsrTable from "./CsrTable";
import CsrForm from "./CsrForm";
import { CSR } from "@/types";
import { fetchCsr, createCsr, updateCsr, deleteCsr } from "@/api/api";
import toast from "react-hot-toast";

const Csr = () => {
  const title = "Corporate Social Responsibility";

  const [csrs, setCsrs] = useState<CSR[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingCsr, setEditingCsr] = useState<CSR | null>(null);

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Load CSR list
  useEffect(() => {
    async function loadCsr() {
      setLoading(true);
      try {
        const data = await fetchCsr();
        setCsrs(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Error loading CSR");
      } finally {
        setLoading(false);
      }
    }
    loadCsr();
  }, []);

  /* CREATE / UPDATE (Doctors-style) */
  const handleSaveCsr = async (formData: FormData) => {
    try {
      if (editingCsr?.id != null) {
        // UPDATE
        const csrId = String(editingCsr.id).trim();
        if (!csrId) {
          toast.error("Invalid CSR ID");
          return;
        }
        const updated = await updateCsr(csrId, formData);
        setCsrs((prev) =>
          prev.map((c) => (String(c.id) === String(updated.id) ? updated : c)),
        );
        toast.success("CSR updated successfully!");
      } else {
        // CREATE
        const created = await createCsr(formData);
        setCsrs((prev) => [...prev, created]);
        toast.success("CSR created successfully!");
      }

      setShowForm(false);
      setEditingCsr(null);
    } catch (err: any) {
      toast.error("Failed to save CSR");
      throw err;
    }
  };

  const handleEdit = (csr: CSR) => {
    setEditingCsr(csr);
    setShowForm(true);
  };

  const handleDeleteClick = (id: string) => setDeleteConfirmId(id);

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;

    setDeletingId(deleteConfirmId);
    try {
      await deleteCsr(deleteConfirmId);
      setCsrs((prev) =>
        prev.filter((c) => String(c.id) !== String(deleteConfirmId)),
      );
      toast.success("CSR deleted successfully!");
    } catch {
      toast.error("Failed to delete CSR");
    } finally {
      setDeletingId(null);
      setDeleteConfirmId(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{title}</h1>

        {!showForm && !loading && (
          <button
            onClick={() => {
              setEditingCsr(null);
              setShowForm(true);
            }}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add CSR
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading CSR List...</p>
      ) : error ? (
        <p className="text-red-500 mb-4">{error}</p>
      ) : showForm ? (
        <CsrForm
          initialData={editingCsr}
          onSave={handleSaveCsr}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <CsrTable
          data={csrs}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          deletingId={deletingId}
        />
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <p className="text-lg mb-4">
              Are you sure you want to delete this CSR entry?
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
      )}
    </div>
  );
};

export default Csr;
