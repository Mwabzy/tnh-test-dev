import { useState, useEffect } from "react";
import DashboardTable from "../DashboardTable";
import { ClinicalService } from "@/types";
import ServiceForm from "../components/ServiceForm";
import {
  fetchClinicalServices,
  createClinicalService,
  updateClinicalService,
  deleteClinicalService,
} from "@/api/api";

const ClinicalServices = () => {
  const [services, setServices] = useState<ClinicalService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<ClinicalService | null>(
    null
  );
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  useEffect(() => {
    async function loadServices() {
      setLoading(true);
      try {
        const data = await fetchClinicalServices();
        setServices(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Error loading clinical services");
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  const handleAdd = () => {
    setEditingService(null);
    setShowForm(true);
  };

  const handleSave = async (service: ClinicalService) => {
    try {
      if (editingService) {
        const updated = await updateClinicalService(service.id, service);
        setServices((prev) =>
          prev.map((s) => (s.id === updated.id ? updated : s))
        );
      } else {
        const created = await createClinicalService(service);
        setServices((prev) => [...prev, created]);
      }
      setShowForm(false);
      setEditingService(null);
      setError(null);
    } catch (err: any) {
      alert(`Error saving service: ${err.message}`);
    }
  };

  const handleDeleteClick = (id: number) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = async () => {
    if (deleteConfirmId === null) return;
    try {
      await deleteClinicalService(deleteConfirmId);
      setServices((prev) => prev.filter((s) => s.id !== deleteConfirmId));
      setDeleteConfirmId(null);
      setError(null);
    } catch (err: any) {
      alert(`Error deleting service: ${err.message}`);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmId(null);
  };

  if (loading) return <p>Loading clinical services...</p>;

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Clinical Services</h1>
        {!showForm && (
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Service
          </button>
        )}
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {showForm ? (
        <>
          <h2 className="text-xl font-bold mb-4">
            {editingService ? "Edit Service" : "Add Service"}
          </h2>
          <ServiceForm
            initialData={editingService}
            onSave={handleSave}
            onCancel={() => setShowForm(false)}
          />
        </>
      ) : (
        <DashboardTable
          data={services}
          onEdit={(service) => {
            setEditingService(service);
            setShowForm(true);
          }}
          onDelete={handleDeleteClick}
        />
      )}

      {deleteConfirmId !== null &&
        (() => {
          const serviceToDelete = services.find(
            (s) => s.id === deleteConfirmId
          );
          return (
            <div className="fixed inset-0 bg-red-400/10 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-lg w-80">
                <p className="mb-4 text-lg">
                  Are you sure you want to delete{" "}
                  <strong>{serviceToDelete?.title}</strong>?
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={cancelDelete}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
    </div>
  );
};

export default ClinicalServices;
