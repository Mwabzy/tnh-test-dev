import { useState, useEffect } from "react";
import DashboardTable from "./DashboardTable";
import { Doctor, ClinicalService } from "@/types";
import ClinicalServiceForm from "./ClinicalServiceForm";
import {
  fetchClinicalServices,
  createClinicalService,
  updateClinicalService,
  deleteClinicalService,
  fetchDoctors,
} from "@/api/api";
import toast from "react-hot-toast";

const ClinicalServices = () => {
  const [services, setServices] = useState<ClinicalService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [AvailableDoctors, setAvailableDoctors] = useState<Doctor[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<ClinicalService | null>(
    null
  );

  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

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

  useEffect(() => {
    async function loadDoctors() {
      try {
        const services = await fetchDoctors();
        setAvailableDoctors(services);
      } catch (err) {
        console.error("Failed to load services", err);
      }
    }
    loadDoctors();
  }, []);

  const handleAdd = () => {
    setEditingService(null);
    setShowForm(true);
  };

  const handleSave = async (service: ClinicalService) => {
    try {
      const payload = {
        ...service,
        doctorIds: service.doctorIds ?? [],
      };

      if (editingService) {
        const updated = await updateClinicalService(service.id, payload);
        setServices((prev) =>
          prev.map((s) => (s.id === updated.id ? updated : s))
        );
      } else {
        const created = await createClinicalService(payload);
        setServices((prev) => [...prev, created]);
      }

      setShowForm(false);
      setEditingService(null);
      setError(null);
      toast.success("Service saved successfully!");
    } catch (err: any) {
      toast.error(`Error saving service: ${err.message}`);
    }
  };

  const handleDeleteClick = (id: number) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = async () => {
    if (deleteConfirmId === null) return;
    try {
      setDeletingId(deleteConfirmId);
      await deleteClinicalService(deleteConfirmId);
      setServices((prev) => prev.filter((s) => s.id !== deleteConfirmId));
      setDeleteConfirmId(null);
      toast.success("Deleted successfully!");
    } catch (err: any) {
      toast.error(`Error deleting service: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Clinical Services</h1>

        {!showForm && !loading && (
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add Service
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading Services...</p>
      ) : error ? (
        <p className="text-red-500 mb-4">{error}</p>
      ) : showForm ? (
        <>
          <h2 className="text-xl font-bold mb-4">
            {editingService ? "Edit Service" : "Add Service"}
          </h2>
          <ClinicalServiceForm
            initialData={editingService}
            onSave={handleSave}
            onCancel={() => setShowForm(false)}
            availableDoctors={AvailableDoctors}
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
          deletingId={deletingId}
        />
      )}

      {/* Delete Modal */}
      {deleteConfirmId !== null &&
        (() => {
          const service = services.find((s) => s.id === deleteConfirmId);
          return (
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
              <div className="bg-white p-6 rounded shadow-lg w-80">
                <p className="text-lg mb-4">
                  Are you sure you want to delete{" "}
                  <strong>{service?.title}</strong>?
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

export default ClinicalServices;
