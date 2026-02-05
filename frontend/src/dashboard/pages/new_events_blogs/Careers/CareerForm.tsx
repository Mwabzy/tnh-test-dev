import { useState } from "react";
import { JobListing } from "@/types";
import toast from "react-hot-toast";

interface CareerFormProps {
  initialData?: JobListing | null;
  onSave: (job: JobListing | FormData) => Promise<void>;
  onCancel: () => void;
}

const CareerForm = ({ initialData, onSave, onCancel }: CareerFormProps) => {
  const [opportunity, setOpportunity] = useState(
    initialData?.opportunity ?? "",
  );
  const [description, setDescription] = useState(
    initialData?.description ?? "",
  );
  const [location, setLocation] = useState(initialData?.location ?? "");
  const [opportunityType, setOpportunityType] = useState(
    initialData?.opportunityType ?? "",
  );
  const [datePosted, setDatePosted] = useState(initialData?.datePosted ?? "");
  const [closingDate, setClosingDate] = useState(
    initialData?.closingDate ?? "",
  );
  const [file, setFile] = useState<File | null>(null);
  const [existingFileUrl, setExistingFileUrl] = useState(
    initialData?.fileUrl ?? "",
  );
  const [saving, setSaving] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();

      formData.append("opportunity", opportunity);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("opportunityType", opportunityType);
      formData.append("datePosted", datePosted);
      formData.append("closingDate", closingDate);

      // Append file if new one selected
      if (file) {
        formData.append("file", file);
      } else if (existingFileUrl) {
        formData.append("existingFileUrl", existingFileUrl);
      }

      await onSave(formData);
    } catch (err) {
      toast.error("Failed to save job opportunity");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <h2 className="text-xl font-serif font-semibold">
        {initialData?.id ? "Edit Career Opportunity" : "Add Career Opportunity"}
      </h2>

      {/* Opportunity Title */}
      <div>
        <label className="font-medium block mb-1">Opportunity Title</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={opportunity}
          onChange={(e) => setOpportunity(e.target.value)}
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="font-medium block mb-1">Description</label>
        <textarea
          className="border p-2 w-full"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {/* Location */}
      <div>
        <label className="font-medium block mb-1">Location</label>
        <select
          className="border p-2 w-full"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        >
          <option value="">Select location</option>
          <option value="On-site">On-site</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>

      {/* Opportunity Type */}
      <div>
        <label className="font-medium block mb-1">Opportunity Type</label>
        <select
          className="border p-2 w-full"
          value={opportunityType}
          onChange={(e) => setOpportunityType(e.target.value)}
          required
        >
          <option value="">Select type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>
      </div>

      {/* Date Posted */}
      <div>
        <label className="font-medium block mb-1">Date Posted</label>
        <input
          type="date"
          className="border p-2 w-full"
          value={datePosted}
          onChange={(e) => setDatePosted(e.target.value)}
          required
        />
      </div>

      {/* Closing Date */}
      <div>
        <label className="font-medium block mb-1">Closing Date</label>
        <input
          type="date"
          className="border p-2 w-full"
          value={closingDate}
          onChange={(e) => setClosingDate(e.target.value)}
          required
        />
      </div>

      {/* File Upload */}
      <div>
        <label className="font-medium block mb-1">Job Document (PDF)</label>

        {existingFileUrl && !file && (
          <div className="mb-2 p-2 bg-gray-50 border rounded">
            <p className="text-sm text-gray-600">
              Current file:{" "}
              <a
                href={existingFileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Document
              </a>
            </p>
          </div>
        )}

        {file && (
          <div className="mb-2 p-2 bg-gray-50 border rounded flex justify-between items-center">
            <p className="text-sm text-gray-600">New file: {file.name}</p>
            <button
              type="button"
              onClick={() => setFile(null)}
              className="text-red-500 text-sm"
            >
              ✕ Remove
            </button>
          </div>
        )}

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          hidden
          id="job-file-upload"
          onChange={handleFileSelect}
        />
        <button
          type="button"
          onClick={() => document.getElementById("job-file-upload")?.click()}
          className="text-blue-600 text-sm underline"
        >
          {file || existingFileUrl ? "Change File" : "+ Upload File"}
        </button>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className={`px-4 py-2 rounded text-white flex items-center gap-2 ${
            saving ? "bg-gray-400 cursor-not-allowed" : "bg-green-600"
          }`}
        >
          {saving && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 108 8h-4l3 3 3-3h-4a8 8 0 01-8 8z"
              />
            </svg>
          )}
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default CareerForm;
