import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import OutpatientCenterTable from "./OutpatientCenterTable";
import OutpatientCenterForm from "./OutpatientCenterForm";
import { outpatientCenter } from "@/types";
import {
  fetchClinicalServices,
} from "@/api/api";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  createOutpatientCenterEntry,
  deleteOutpatientCenterEntry,
  fetchOutpatientCenters,
  updateOutpatientCenterEntry,
} from "@/store/outpatientCentersSlice";

const OutpatientCenterPage = () => {
  const dispatch = useAppDispatch();
  const { centers, loading, error, initialized } = useAppSelector(
    (state) => state.outpatientCenters,
  );

  const [showForm, setShowForm] = useState(false);
  const [editingCenter, setEditingCenter] = useState<outpatientCenter | null>(
    null,
  );
  const [locationQuery, setLocationQuery] = useState("");

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
    if (!initialized && !loading) {
      void dispatch(fetchOutpatientCenters());
    }
  }, [dispatch, initialized, loading]);

  /* -------------------- UI actions -------------------- */
  const startCreate = () => {
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
      if (editingCenter?.id) {
        await dispatch(
          updateOutpatientCenterEntry({
            id: editingCenter.id,
            payload,
          }),
        ).unwrap();
        toast.success("Center updated");
      } else {
        await dispatch(createOutpatientCenterEntry(payload)).unwrap();
        toast.success("Center created");
      }

      closeForm();
    } catch (saveError) {
      console.error("Failed to save outpatient center:", saveError);
      toast.error("Failed to save center");
    }
  };

  /* -------------------- Delete -------------------- */
  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await dispatch(deleteOutpatientCenterEntry(id)).unwrap();
      toast.success("Center deleted");
    } catch (deleteError) {
      console.error("Failed to delete outpatient center:", deleteError);
      toast.error("Failed to delete center");
    } finally {
      setDeletingId(null);
    }
  };

  const normalizedQuery = locationQuery.trim().toLowerCase();
  const filteredCenters = normalizedQuery
    ? centers.filter((center) =>
        String(center.name ?? "")
          .toLowerCase()
          .includes(normalizedQuery) ||
        String(center.location ?? "")
          .toLowerCase()
          .includes(normalizedQuery),
      )
    : centers;

  /* -------------------- Render -------------------- */
  return (
    <div>
      <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">Outpatient Centers</h1>

        {!showForm && (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="Search outpatient centers by name or location"
                className="w-full border border-gray-300 rounded-md px-9 py-2 text-sm"
              />
            </div>
            {!loading && (
              <button
                onClick={startCreate}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Add Outpatient Center
              </button>
            )}
          </div>
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
      ) : filteredCenters.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
          No outpatient centers match that location.
        </div>
      ) : (
        <OutpatientCenterTable
          data={filteredCenters}
          onEdit={startEdit}
          onDelete={handleDelete}
          deletingId={deletingId}
        />
      )}
    </div>
  );
};

export default OutpatientCenterPage;
