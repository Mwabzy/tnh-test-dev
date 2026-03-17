import { useState, useEffect } from "react";
import CareerDashboardTable from "./CareerTable";
import CareerForm from "./CareerForm";
import { JobListing } from "@/types";
import {
  fetchJobListings,
  createJobListing,
  updateJobListing,
  deleteJobListing,
} from "@/api/api";
import toast from "react-hot-toast";

const CareersPage = () => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<JobListing | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  // Load job listings on mount
  useEffect(() => {
    async function loadJobs() {
      setLoading(true);
      try {
        const data = await fetchJobListings();
        console.log("Fetched job listings from API:", data);
        setJobs(data);
        setError(null);
      } catch (err) {
        setError("Error loading job opportunities");
      } finally {
        setLoading(false);
      }
    }
    loadJobs();
  }, []);

  const handleSaveJob = async (job: FormData) => {
    try {
      if (editingJob?.id) {
        // UPDATE
        const updated = await updateJobListing(editingJob.id, job);
        setJobs((prev) => prev.map((j) => (j.id === updated.id ? updated : j)));
        toast.success("Job opportunity updated successfully!");
      } else {
        // CREATE
        const newJob = await createJobListing(job);
        setJobs((prev) => [...prev, newJob]);
        toast.success("Job opportunity created successfully!");
      }

      setShowForm(false);
      setEditingJob(null);
    } catch (err) {
      toast.error("Failed to save job opportunity");
      throw err;
    }
  };

  const handleDeleteJob = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteJobListing(id);
      setJobs((prev) => prev.filter((job) => job.id !== id));
      toast.success("Job opportunity deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete job opportunity");
    } finally {
      setDeletingId(null);
    }
  };

  const handleTogglePublish = async (job: JobListing) => {
    if (!job?.id) return;
    const nextStatus = !(job.isPublished ?? true);
    const formData = new FormData();
    formData.append("isPublished", String(nextStatus));

    setTogglingId(job.id);
    try {
      const updated = await updateJobListing(job.id, formData);
      setJobs((prev) =>
        prev.map((j) => (j.id === job.id ? { ...j, ...updated } : j)),
      );
      toast.success(
        nextStatus ? "Job published successfully!" : "Job unpublished.",
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
        <h1 className="text-3xl font-bold mb-6">Career Opportunities</h1>

        {!loading && (
          <button
            onClick={() => {
              setError(null);
              setShowForm((prev) => !prev);
              if (showForm) {
                setEditingJob(null);
              }
            }}
            className="px-4 py-2 bg-green-600 text-white font-serif rounded-md"
          >
            {showForm ? "Back to List" : "Add Opportunity"}
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading Career Opportunities...</p>
      ) : showForm ? (
        <CareerForm
          initialData={editingJob}
          onSave={handleSaveJob}
          onCancel={() => {
            setShowForm(false);
            setEditingJob(null);
          }}
        />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <CareerDashboardTable
          data={jobs}
          onEdit={(job) => {
            setEditingJob(job);
            setShowForm(true);
          }}
          onDelete={handleDeleteJob}
          onTogglePublish={handleTogglePublish}
          deletingId={deletingId}
          togglingId={togglingId}
        />
      )}
    </div>
  );
};

export default CareersPage;
