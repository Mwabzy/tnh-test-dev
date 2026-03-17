import { useEffect, useState } from "react";
import TendersDashboardTable from "./TendersTable";
import TendersForm from "./TendersForm";
import { TenderListing } from "@/types";
import {
  fetchTenders,
  createTender,
  updateTender,
  deleteTender,
} from "@/api/api";
import toast from "react-hot-toast";

const TendersPage = () => {
  const [tenders, setTenders] = useState<TenderListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTender, setEditingTender] = useState<TenderListing | null>(
    null,
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  useEffect(() => {
    async function loadTenders() {
      setLoading(true);
      try {
        const data = await fetchTenders();
        console.log("Fetched tenders from API:", data);
        setTenders(data);
        setError(null);
      } catch (err) {
        setError("Error loading tenders");
      } finally {
        setLoading(false);
      }
    }
    loadTenders();
  }, []);

  const handleSaveTender = async (tender: TenderListing | FormData) => {
    try {
      if (editingTender?.id) {
        const updated = await updateTender(editingTender.id, tender as FormData);
        setTenders((prev) =>
          prev.map((t) => (t.id === updated.id ? updated : t)),
        );
        toast.success("Tender updated successfully!");
      } else {
        const newTender = await createTender(tender as FormData);
        setTenders((prev) => [...prev, newTender]);
        toast.success("Tender created successfully!");
      }

      setShowForm(false);
      setEditingTender(null);
    } catch (err) {
      toast.error("Failed to save tender");
      throw err;
    }
  };

  const handleDeleteTender = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteTender(id);
      setTenders((prev) => prev.filter((tender) => tender.id !== id));
      toast.success("Tender deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete tender");
    } finally {
      setDeletingId(null);
    }
  };

  const handleTogglePublish = async (tender: TenderListing) => {
    if (!tender?.id) return;
    const nextStatus = !(tender.isPublished ?? true);
    const formData = new FormData();
    formData.append("isPublished", String(nextStatus));

    setTogglingId(tender.id);
    try {
      const updated = await updateTender(tender.id, formData);
      setTenders((prev) =>
        prev.map((t) => (t.id === tender.id ? { ...t, ...updated } : t)),
      );
      toast.success(
        nextStatus ? "Tender published successfully!" : "Tender unpublished.",
      );
    } catch (err) {
      toast.error("Failed to update publish status");
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold mb-6">Tender Opportunities</h1>

        {!loading && (
          <button
            onClick={() => {
              setError(null);
              setShowForm((prev) => !prev);
              if (showForm) {
                setEditingTender(null);
              }
            }}
            className="px-4 py-2 bg-green-600 text-white font-serif rounded-md"
          >
            {showForm ? "Back to List" : "Add Opportunity"}
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading Tender Opportunities...</p>
      ) : showForm ? (
        <TendersForm
          initialData={editingTender}
          onSave={handleSaveTender}
          onCancel={() => {
            setShowForm(false);
            setEditingTender(null);
          }}
        />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <TendersDashboardTable
          data={tenders}
          onEdit={(tender) => {
            setEditingTender(tender);
            setShowForm(true);
          }}
          onDelete={handleDeleteTender}
          onTogglePublish={handleTogglePublish}
          deletingId={deletingId}
          togglingId={togglingId}
        />
      )}
    </div>
  );
};

export default TendersPage;
