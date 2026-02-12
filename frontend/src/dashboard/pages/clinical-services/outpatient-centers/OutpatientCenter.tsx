import { useEffect, useState } from "react";
import OutpatientCenterTable from "./OutpatientCenterTable";
import OutpatientCenterForm from "./OutpatientCenterForm";
import { outpatientCenter } from "@/types";
import {
  fetchOutpatientCenter,
  createOutpatientCenter,
  updateOutpatientCenter,
  deleteOutpatientCenter,
  fetchClinicalServices,
} from "@/api/api";
import toast from "react-hot-toast";

const OutpatientCenterPage = () => {
  const [centers, setCenters] = useState<outpatientCenter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingCenter, setEditingCenter] = useState<outpatientCenter | null>(
    null,
  );

  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [clinics, setClinics] = useState<{ id: number; title: string }[]>([]);

  /* -------------------- Load clinics -------------------- */
  useEffect(() => {
    const loadClinics = async () => {
      try {
        const data = await fetchClinicalServices();
        setClinics(
          data.map((c: any) => ({
            id: c.id,
            title: c.title ?? c.name ?? c.service_name ?? "",
          })),
        );
      } catch {
        toast.error("Failed to load clinics");
      }
    };

    loadClinics();
  }, []);

  /* -------------------- Load centers -------------------- */
  useEffect(() => {
    const loadCenters = async () => {
      try {
        setLoading(true);
        const data = await fetchOutpatientCenter();
        setCenters(data);
      } catch {
        setError("Failed to load outpatient centers");
      } finally {
        setLoading(false);
      }
    };

    loadCenters();
  }, []);

  /* -------------------- UI actions -------------------- */
  const startCreate = () => {
    setError(null);
    setEditingCenter(null);
    setShowForm(true);
  };

  const startEdit = (center: outpatientCenter) => {
    setEditingCenter(center);
    console.log("Editing center:", center);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingCenter(null);
  };

  /* -------------------- Save (CREATE or UPDATE) -------------------- */
  const handleSave = async (payload: outpatientCenter | FormData) => {
    try {
      let saved: outpatientCenter;

      // UPDATE
      if (editingCenter?.id) {
        saved = await updateOutpatientCenter(editingCenter.id, payload);
        setCenters((prev) => prev.map((c) => (c.id === saved.id ? saved : c)));
        toast.success("Center updated");
      }
      // CREATE
      else {
        saved = await createOutpatientCenter(payload);
        setCenters((prev) => [...prev, saved]);
        toast.success("Center created");
      }

      closeForm();
    } catch {
      toast.error("Failed to save center");
    }
  };

  /* -------------------- Delete -------------------- */
  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await deleteOutpatientCenter(id);
      setCenters((prev) => prev.filter((c) => c.id !== id));
      toast.success("Center deleted");
    } catch {
      toast.error("Failed to delete center");
    } finally {
      setDeletingId(null);
    }
  };

  /* -------------------- Render -------------------- */
  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Outpatient Centers</h1>

        {!showForm && !loading && (
          <button
            onClick={startCreate}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add Outpatient Center
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : showForm ? (
        <OutpatientCenterForm
          initialData={editingCenter}
          onSave={handleSave}
          onCancel={closeForm}
          clinics={clinics}
        />
      ) : (
        <OutpatientCenterTable
          data={centers}
          onEdit={startEdit}
          onDelete={handleDelete}
          deletingId={deletingId}
        />
      )}
    </div>
  );
};

export default OutpatientCenterPage;
