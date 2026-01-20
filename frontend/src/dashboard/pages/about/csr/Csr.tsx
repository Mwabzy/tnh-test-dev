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

  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Load CSR data
  useEffect(() => {
    async function loadCsr() {
      setLoading(true);
      try {
        const data: CSR[] = await fetchCsr();
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

  const handleAdd = () => {
    setEditingCsr(null);
    setShowForm(true);
  };

  const handleSave = async (data: FormData) => {
    try {
      const csr = Object.fromEntries(data) as unknown as CSR;
      if (editingCsr) {
        updateCsr(editingCsr.id, csr);
        // Convert id to string if the API expects string
        const updated = await updateCsr(String(editingCsr.id), csr);
        setCsrs((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
      } else {
        createCsr(csr);
        // const created =  createCsr(csr);
        // setCsrs((prev) => [...prev, created]);
      }

      setShowForm(false);
      setEditingCsr(null);
      toast.success("CSR saved successfully!");
    } catch (err: any) {
      toast.error(`Error saving CSR: ${err.message}`);
    }
  };

  const handleEdit = (csr: CSR) => {
    setEditingCsr(csr);
    setShowForm(true);
  };

  const handleDeleteClick = (id: number) => setDeleteConfirmId(id);

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      setDeletingId(deleteConfirmId);
      // Convert id to string if the API expects string
      await deleteCsr(String(deleteConfirmId));
      setCsrs((prev) => prev.filter((m) => m.id !== deleteConfirmId));
      setDeleteConfirmId(null);
      toast.success("Deleted successfully!");
    } catch (err: any) {
      toast.error(`Error deleting CSR: ${err.message}`);
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
          onSave={handleSave}
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
