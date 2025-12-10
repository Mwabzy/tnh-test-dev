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
} from "@/api/api";
import toast from "react-hot-toast";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [availableServices, setAvailableServices] = useState<ClinicalService[]>(
    []
  );

  useEffect(() => {
    async function loadDoctors() {
      setLoading(true);
      try {
        const data = await fetchDoctors();
        setDoctors(data);
        setError(null);
      } catch (err: any) {
        setError("Error loading doctors");
      } finally {
        setLoading(false);
      }
    }

    loadDoctors();
  }, []);

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

  const handleSaveDoctor = async (doctor: Doctor) => {
    setLoading(true);
    try {
      if (doctor.id) {
        await updateDoctor(doctor.id, doctor);
        setDoctors((prev) =>
          prev.map((d) => (d.id === doctor.id ? doctor : d))
        );
      } else {
        const newDoctor = await createDoctor(doctor);
        setDoctors((prev) => [...prev, newDoctor]);
      }
      setShowForm(false);
    } catch (err) {
      toast.error("Failed to save doctor");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDoctor = async (id: number) => {
    setDeletingId(id);
    try {
      await deleteDoctor(id);
      setDoctors((prev) => prev.filter((doctor) => doctor.id !== id));
    } catch (err) {
      toast.error("Failed to delete doctor");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Doctors</h1>
      <div className="flex justify-between mb-6">
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Add Doctor
        </button>
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
      ) : (
        <DoctorDashboardTable
          data={doctors}
          onEdit={(doctor) => {
            setEditingDoctor(doctor);
            setShowForm(true);
          }}
          onDelete={handleDeleteDoctor}
          deletingId={deletingId}
        />
      )}
    </div>
  );
};

export default DoctorsPage;
