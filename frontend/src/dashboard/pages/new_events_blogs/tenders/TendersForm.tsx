import { useState } from "react";
import { TenderListing } from "@/types";
import toast from "react-hot-toast";

interface TendersFormProps {
  initialData?: TenderListing | null;
  onSave: (tender: TenderListing | FormData) => Promise<void>;
  onCancel: () => void;
}

const TendersForm = ({ initialData, onSave, onCancel }: TendersFormProps) => {
  const [opportunity, setOpportunity] = useState(
    initialData?.opportunity ?? "",
  );
  const [referenceNumber, setReferenceNumber] = useState(
    initialData?.referenceNumber ?? "",
  );
  const [datePosted, setDatePosted] = useState(initialData?.datePosted ?? "");
  const [closingDate, setClosingDate] = useState(
    initialData?.closingDate ?? "",
  );
  const [file, setFile] = useState<File | null>(null);
  const [existingFileUrl, _setExistingFileUrl] = useState(
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
      formData.append("referenceNumber", referenceNumber);
      formData.append("datePosted", datePosted);
      formData.append("closingDate", closingDate);

      if (file) {
        formData.append("file", file);
      } else if (existingFileUrl) {
        formData.append("existingFileUrl", existingFileUrl);
      }

      await onSave(formData);
    } catch (err) {
      toast.error("Failed to save tender");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <h2 className="text-xl font-serif font-semibold">
        {initialData?.id ? "Edit Tender Opportunity" : "Add Tender Opportunity"}
      </h2>

      <div>
        <label className="font-medium block mb-1">Tender Title</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={opportunity}
          onChange={(e) => setOpportunity(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="font-medium block mb-1">REFERENCE NUMBER</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={referenceNumber}
          onChange={(e) => setReferenceNumber(e.target.value)}
          required
        />
      </div>

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

      <div>
        <label className="font-medium block mb-1">Tender Document (PDF)</label>

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
              âœ• Remove
            </button>
          </div>
        )}

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          hidden
          id="tender-file-upload"
          onChange={handleFileSelect}
        />
        <button
          type="button"
          onClick={() => document.getElementById("tender-file-upload")?.click()}
          className="text-blue-600 text-sm underline"
        >
          {file || existingFileUrl ? "Change File" : "+ Upload File"}
        </button>
      </div>

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

export default TendersForm;
