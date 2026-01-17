import { useEffect, useState } from "react";
import OutpatientCenterTable from "./OutpatientCenterTable";
import OutpatientCenterForm from "./OutpatientCenterForm";
import { outpatientCenter } from "@/types";
import {
  fetchOutpatientCenter,
  createOutpatientCenter,
  updateOutpatientCenter,
  deleteOutpatientCenter,
} from "@/api/api";
import toast from "react-hot-toast";

const OutpatientCenterPage = () => {
  

  const [centers, setCenters] = useState<outpatientCenter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingCenter, setEditingCenter] =
    useState<outpatientCenter | null>(null);

  const [deletingId, setDeletingId] = useState<number | null>(null);


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

  

  const startCreate = () => {
     setError(null);  
    setEditingCenter(null);
    setShowForm(true);
  };

  const startEdit = (center: outpatientCenter) => {
    setEditingCenter(center);
    setShowForm(true);
  };

  const handleSave = async (center: outpatientCenter) => {
    try {
      if (center.id) {
        const updated = await updateOutpatientCenter(center.id, center);
        setCenters((prev) =>
          prev.map((c) => (c.id === updated.id ? updated : c))
        );
        toast.success("Center updated");
      } else {
        const created = await createOutpatientCenter(center);
        setCenters((prev) => [...prev, created]);
        toast.success("Center created");
      }

      setShowForm(false);
      setEditingCenter(null);
    } catch {
      toast.error("Failed to save center");
    }
  };

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

  

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Outpatient Centers</h1>

        {!showForm && !loading && (
          <button
            onClick={startCreate}
            
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add Center
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
          onCancel={() => setShowForm(false)}
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
