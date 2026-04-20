import { useState, useEffect } from "react";
import DashboardTable from "./DashboardTable";
import { Doctor, ClinicalService } from "@/types";
import ClinicalServiceForm from "./ClinicalServiceForm";
import {
  createClinicalService,
  updateClinicalService,
  deleteClinicalService,
  fetchDoctors,
  reorderClinicalServices,
} from "@/api/api";

import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  fetchServices,
  removeService,
  reorderServices,
  upsertService,
} from "@/store/servicesSlice";

import toast from "react-hot-toast";

const ClinicalServices = () => {
  const dispatch = useAppDispatch();
  const { services, loading, error } = useAppSelector((state) => state.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const [AvailableDoctors, setAvailableDoctors] = useState<Doctor[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<ClinicalService | null>(
    null,
  );
  const [locationQuery, setLocationQuery] = useState("");

  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // const sortByOrder = (list: ClinicalService[]) =>
  //   [...list].sort((a, b) => {
  //     const orderA = a.order ?? 0;
  //     const orderB = b.order ?? 0;
  //     if (orderA !== orderB) return orderA - orderB;
  //     return (a.id ?? 0) - (b.id ?? 0);
  //   });

  const applySubsetOrder = (
    fullList: ClinicalService[],
    subset: ClinicalService[],
  ) => {
    const subsetIds = new Set(subset.map((item) => item.id));
    let subsetIndex = 0;
    return fullList.map((item) =>
      subsetIds.has(item.id) ? subset[subsetIndex++] : item,
    );
  };

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

  const normalizedQuery = locationQuery.trim().toLowerCase();
  const filteredServices = normalizedQuery
    ? services.filter((service) => {
        const titleMatch = String(service.title ?? "")
          .toLowerCase()
          .includes(normalizedQuery);
        const locationMatch = Array.isArray(service.locations)
          ? service.locations.some((loc) =>
              String(loc ?? "")
                .toLowerCase()
                .includes(normalizedQuery),
            )
          : false;

        return titleMatch || locationMatch;
      })
    : services;

  const handleSave = async (service: ClinicalService | FormData) => {
    const wantsFtOnHomepage =
      service instanceof FormData
        ? String(service.get("ftOnHomepage")).toLowerCase() === "true"
        : Boolean(service.ftOnHomepage);

    if (wantsFtOnHomepage) {
      const featuredWithoutCurrent = services.filter(
        (item) =>
          Boolean(item.ftOnHomepage) &&
          (!editingService || item.id !== editingService.id),
      ).length;

      if (featuredWithoutCurrent >= 3) {
        toast.error("unselect another ft on homepage service to add a new one");
        return;
      }
    }

    try {
      let result;

      if (service instanceof FormData) {
        // FORM DATA (images upload)
        if (editingService) {
          result = await updateClinicalService(editingService.id, service);
        } else {
          result = await createClinicalService(service);
        }
      } else {
        // JSON PAYLOAD (existing behavior)
        const payload = {
          ...service,
          doctorIds: service.doctorIds ?? [],
        };

        if (editingService) {
          result = await updateClinicalService(service.id, payload);
        } else {
          result = await createClinicalService(payload);
        }
      }

      dispatch(upsertService(result));

      setShowForm(false);
      setEditingService(null);
      toast.success("Clinical service saved successfully!");
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
      dispatch(removeService(deleteConfirmId));
      setDeleteConfirmId(null);
      toast.success("Deleted successfully!");
    } catch (err: any) {
      toast.error(`Error deleting service: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  const handleReorder = async (nextOrder: ClinicalService[]) => {
    const previous = services;
    const merged = applySubsetOrder(services, nextOrder);
    dispatch(reorderServices(merged.map((item) => item.id)));

    try {
      await reorderClinicalServices(merged.map((item) => item.id));
      toast.success("Order updated successfully!");
    } catch (err: any) {
      dispatch(reorderServices(previous.map((item) => item.id)));
      toast.error(`Failed to update order: ${err?.message ?? "Unknown error"}`);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 mb-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-serif font-bold">Clinical Services</h1>

        {!showForm && (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              placeholder="Search service by title or location"
              className="w-full sm:w-80 border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
            {!loading && (
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-green-600 text-white rounded-md"
              >
                Add Service
              </button>
            )}
          </div>
        )}
      </div>

      {loading ? (
        <p>Loading Services...</p>
      ) : error ? (
        <p className="text-red-500 mb-4">{error}</p>
      ) : showForm ? (
        <>
          <h2 className="text-xl font-serif font-bold  mb-4">
            {editingService ? "Edit Service" : "Add Service"}
          </h2>
          <ClinicalServiceForm
            initialData={editingService}
            onSave={handleSave}
            onCancel={() => setShowForm(false)}
            availableDoctors={AvailableDoctors}
          />
        </>
      ) : filteredServices.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
          No clinical services match that location.
        </div>
      ) : (
        <DashboardTable
          data={filteredServices}
          onEdit={(service) => {
            setEditingService(service);
            setShowForm(true);
          }}
          onDelete={handleDeleteClick}
          deletingId={deletingId}
          onReorder={handleReorder}
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
