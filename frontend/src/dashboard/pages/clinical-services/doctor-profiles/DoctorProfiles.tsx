import { useState, useEffect } from "react";
import DoctorDashboardTable from "./DoctorDashboardTable";
import DoctorForm from "./DoctorForm";
import { Doctor, ClinicalService } from "@/types";
import {
  fetchDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  fetchClinicalServices,
  reorderDoctors,
} from "@/api/api";
import toast from "react-hot-toast";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true); // page-level loading
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [availableServices, setAvailableServices] = useState<ClinicalService[]>(
    []
  );
  const [locationQuery, setLocationQuery] = useState("");

  const sortByOrder = (list: Doctor[]) =>
    [...list].sort((a, b) => {
      const orderA = a.order ?? 0;
      const orderB = b.order ?? 0;
      if (orderA !== orderB) return orderA - orderB;
      return (a.id ?? 0) - (b.id ?? 0);
    });

  const applySubsetOrder = (fullList: Doctor[], subset: Doctor[]) => {
    const subsetIds = new Set(subset.map((item) => item.id));
    let subsetIndex = 0;
    return fullList.map((item) =>
      subsetIds.has(item.id) ? subset[subsetIndex++] : item,
    );
  };

  // Load doctors on mount
  useEffect(() => {
    async function loadDoctors() {
      setLoading(true);
      try {
        const data = await fetchDoctors();
        console.log("Fetched data from API:", data);
        setDoctors(sortByOrder(Array.isArray(data) ? data : []));
        setError(null);
      } catch (err) {
        setError("Error loading doctors");
      } finally {
        setLoading(false);
      }
    }
    loadDoctors();
  }, []);

  // Load clinical services
  useEffect(() => {
    async function loadServices() {
      try {
        const services = await fetchClinicalServices();
        setAvailableServices(services);
      } catch (err) {
        console.error("Failed to load services", err);
      }
    }
    loadServices();
  }, []);

  const handleSaveDoctor = async (doctor: Doctor | FormData) => {
    try {
      if (editingDoctor?.id) {
        // UPDATE
        const updated = await updateDoctor(
          editingDoctor.id,
          doctor as FormData
        );
        setDoctors((prev) =>
          sortByOrder(prev.map((d) => (d.id === updated.id ? updated : d))),
        );
        toast.success("Doctor updated successfully!");
      } else {
        // CREATE
        const newDoctor = await createDoctor(doctor as FormData);
        setDoctors((prev) => sortByOrder([...prev, newDoctor]));
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
      await deleteDoctor(id);
      setDoctors((prev) => prev.filter((doctor) => doctor.id !== id));
      toast.success("Doctor deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete doctor");
    } finally {
      setDeletingId(null);
    }
  };

  const handleReorder = async (nextOrder: Doctor[]) => {
    const previous = doctors;
    const merged = applySubsetOrder(doctors, nextOrder);
    setDoctors(merged);

    try {
      const orderedIds = merged
        .map((item) => item.id)
        .filter((id): id is number => typeof id === "number");
      if (orderedIds.length !== merged.length) {
        throw new Error("Missing doctor id for reorder.");
      }
      await reorderDoctors(orderedIds);
      toast.success("Order updated successfully!");
    } catch (err: any) {
      setDoctors(previous);
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
