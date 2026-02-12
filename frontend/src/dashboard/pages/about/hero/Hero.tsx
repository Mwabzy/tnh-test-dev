import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import HeroTable from "./HeroTable";
import HeroForm from "./HeroForm";

import { HeroSlide } from "@/types";
import {
  fetchHero,
  createHero,
  updateHero,
  deleteHero,
} from "@/api/api";

const Hero = () => {
  const title = "Hero Slides";

  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);

  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Load slides
  useEffect(() => {
    async function loadSlides() {
      setLoading(true);
      try {
        const data = await fetchHero();
        setSlides(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Error loading Hero slides");
      } finally {
        setLoading(false);
      }
    }
    loadSlides();
  }, []);

  // CREATE / UPDATE
  const handleSaveSlide = async (formData: FormData) => {
    try {
      if (editingSlide?.id) {
        const updated = await updateHero(editingSlide.id, formData);
        setSlides((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
        toast.success("Slide updated successfully!");
      } else {
        const created = await createHero(formData);
        setSlides((prev) => [...prev, created]);
        toast.success("Slide created successfully!");
      }

      setShowForm(false);
      setEditingSlide(null);
    } catch (err: any) {
      toast.error("Failed to save slide");
      throw err;
    }
  };

  const handleEdit = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setShowForm(true);
  };

  const handleDeleteClick = (id: number) => setDeleteConfirmId(id);

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;

    setDeletingId(deleteConfirmId);
    try {
      await deleteHero(deleteConfirmId);
      setSlides((prev) => prev.filter((s) => s.id !== deleteConfirmId));
      toast.success("Slide deleted successfully!");
    } catch {
      toast.error("Failed to delete slide");
    } finally {
      setDeletingId(null);
      setDeleteConfirmId(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{title}</h1>

        {!showForm && !loading && (
          <button
            onClick={() => {
              setEditingSlide(null);
              setShowForm(true);
            }}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add Slide
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading slides...</p>
      ) : error ? (
        <p className="text-red-500 mb-4">{error}</p>
      ) : showForm ? (
        <HeroForm
          initialData={editingSlide}
          onSave={handleSaveSlide}
          onCancel={() => {
            setShowForm(false);
            setEditingSlide(null);
          }}
        />
      ) : (
        <HeroTable
          data={slides}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          deletingId={deletingId}
        />
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <p className="text-lg mb-4">Are you sure you want to delete this slide?</p>
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

export default Hero;
