import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DoctorDashboardTable from "./DoctorDashboardTable";
import DoctorForm from "./DoctorForm";
import { Doctor } from "@/types";
import toast from "react-hot-toast";
import type { AppDispatch, RootState } from "@/store";
import {
  createDoctorEntry,
  deleteDoctorEntry,
  fetchDoctorsList,
  reorderDoctorEntries,
  updateDoctorEntry,
} from "@/store/doctorsSlice";
import { fetchServices } from "@/store/servicesSlice";

const DoctorsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { doctors, loading, error, initialized } = useSelector(
    (state: RootState) => state.doctors,
  );
  const availableServices = useSelector(
    (state: RootState) => state.services.services,
  );
  const [showForm, setShowForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [locationQuery, setLocationQuery] = useState("");

  const applySubsetOrder = (fullList: Doctor[], subset: Doctor[]) => {
    const subsetIds = new Set(subset.map((item) => item.id));
    let subsetIndex = 0;
    return fullList.map((item) =>
      subsetIds.has(item.id) ? subset[subsetIndex++] : item,
    );
  };

  // Load doctors on mount
  useEffect(() => {
    if (!initialized && !loading) {
      void dispatch(fetchDoctorsList());
    }
  }, [dispatch, initialized, loading]);

  // Load clinical services
  useEffect(() => {
    if (availableServices.length === 0) {
      void dispatch(fetchServices());
    }
  }, [availableServices.length, dispatch]);

  const handleSaveDoctor = async (doctor: Doctor | FormData) => {
    try {
      if (editingDoctor?.id) {
        await dispatch(
          updateDoctorEntry({
            id: editingDoctor.id,
            payload: doctor as FormData,
          }),
        ).unwrap();
        toast.success("Doctor updated successfully!");
      } else {
        await dispatch(createDoctorEntry(doctor as FormData)).unwrap();
        toast.success("Doctor created successfully!");
      }

      setShowForm(false);
      setEditingDoctor(null);
    } catch (err) {
      toast.error("Failed to save doctor");
      throw err;
    }
  };

  const handleDeleteDoctor = async (id: number) => {
    setDeletingId(id);
    try {
      await dispatch(deleteDoctorEntry(id)).unwrap();
      toast.success("Doctor deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete doctor");
    } finally {
      setDeletingId(null);
    }
  };

  const handleReorder = async (nextOrder: Doctor[]) => {
    const merged = applySubsetOrder(doctors, nextOrder);

    try {
      const orderedIds = merged
        .map((item) => item.id)
        .filter((id): id is number => typeof id === "number");
      if (orderedIds.length !== merged.length) {
        throw new Error("Missing doctor id for reorder.");
      }
      await dispatch(reorderDoctorEntries(orderedIds)).unwrap();
      toast.success("Order updated successfully!");
    } catch (err: any) {
      void dispatch(fetchDoctorsList());
      toast.error(`Failed to update order: ${err?.message ?? "Unknown error"}`);
    }
  };

  const normalizedQuery = locationQuery.trim().toLowerCase();
  const filteredDoctors = normalizedQuery
    ? doctors.filter((doctor) => {
        const locations = Array.isArray(doctor.locations)
          ? doctor.locations
          : [];
        const nameMatch = String(doctor.name ?? "")
          .toLowerCase()
          .includes(normalizedQuery);
        const roleMatch = String(doctor.role ?? "")
          .toLowerCase()
          .includes(normalizedQuery);
        const locationMatch = locations.some((loc) =>
          String(loc ?? "").toLowerCase().includes(normalizedQuery),
        );

        return nameMatch || roleMatch || locationMatch;
      })
    : doctors;

  return (
    <div>
      <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold mb-6">Doctors</h1>

        {!showForm && (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              placeholder="Search doctors by name, role, or location"
              className="w-full sm:w-80 border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
            {!loading && (
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 bg-green-600 text-white font-serif rounded-md"
              >
                Add Doctor
              </button>
            )}
          </div>
        )}
      </div>

      {loading ? (
        <p>Loading Doctors...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : showForm ? (
        <DoctorForm
          initialData={editingDoctor}
          onSave={handleSaveDoctor}
          onCancel={() => setShowForm(false)}
          availableServices={availableServices}
        />
      ) : filteredDoctors.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
          No doctors match that location.
        </div>
      ) : (
        <DoctorDashboardTable
          data={filteredDoctors}
          onEdit={(doctor) => {
            setEditingDoctor(doctor);
            setShowForm(true);
          }}
          onDelete={handleDeleteDoctor}
          deletingId={deletingId}
          onReorder={handleReorder}
        />
      )}
    </div>
  );
};

export default DoctorsPage;
