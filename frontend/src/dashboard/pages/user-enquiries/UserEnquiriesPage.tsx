import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  createUserEnquiry,
  deleteUserEnquiry,
  fetchUserEnquiries,
  updateUserEnquiry,
} from "@/api/api";
import { UserEnquiry, UserEnquiryCategory } from "@/types";
import UserEnquiryForm from "./UserEnquiryForm";
import UserEnquiryTable from "./UserEnquiryTable";

interface UserEnquiriesPageProps {
  category: UserEnquiryCategory;
}

const UserEnquiriesPage = ({ category }: UserEnquiriesPageProps) => {
  const [enquiries, setEnquiries] = useState<UserEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEnquiry, setEditingEnquiry] = useState<UserEnquiry | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    async function loadEnquiries() {
      setLoading(true);
      try {
        const data = await fetchUserEnquiries(category);
        setEnquiries(data);
        setError(null);
      } catch (err) {
        console.error("Error loading user enquiries:", err);
        setError("Error loading user enquiries.");
      } finally {
        setLoading(false);
      }
    }

    loadEnquiries();
  }, [category]);

  const handleSave = async (payload: Partial<UserEnquiry>) => {
    if (editingEnquiry?.id) {
      const updated = await updateUserEnquiry(editingEnquiry.id, payload);
      setEnquiries((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item)),
      );
      toast.success("Enquiry updated successfully.");
    } else {
      const created = await createUserEnquiry(payload);
      setEnquiries((prev) => [created, ...prev]);
      toast.success("Enquiry created successfully.");
    }

    setShowForm(false);
    setEditingEnquiry(null);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteUserEnquiry(id);
      setEnquiries((prev) => prev.filter((item) => item.id !== id));
      toast.success("Enquiry deleted successfully.");
    } catch (err) {
      console.error("Error deleting enquiry:", err);
      toast.error("Failed to delete enquiry.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold mb-6">{category}</h1>

        {!loading && (
          <button
            onClick={() => {
              setError(null);
              setShowForm((prev) => !prev);
              if (showForm) {
                setEditingEnquiry(null);
              }
            }}
            className="px-4 py-2 bg-green-600 text-white font-serif rounded-md"
          >
            {showForm ? "Back to List" : "Add Entry"}
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading {category.toLowerCase()}...</p>
      ) : showForm ? (
        <UserEnquiryForm
          category={category}
          initialData={editingEnquiry}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingEnquiry(null);
          }}
        />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <UserEnquiryTable
          category={category}
          data={enquiries}
          deletingId={deletingId}
          onEdit={(enquiry) => {
            setEditingEnquiry(enquiry);
            setShowForm(true);
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default UserEnquiriesPage;
