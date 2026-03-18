import { useState } from "react";
import { PublicStatement } from "@/types";
import toast from "react-hot-toast";

interface PublicStatementsFormProps {
  initialData?: PublicStatement | null;
  onSave: (statement: FormData) => Promise<void>;
  onCancel: () => void;
}

const PublicStatementsForm = ({
  initialData,
  onSave,
  onCancel,
}: PublicStatementsFormProps) => {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const existingFileUrl = initialData?.fileUrl ?? "";

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
      formData.append("title", title);

      if (file) {
        formData.append("file", file);
      }

      await onSave(formData);
    } catch (err) {
      toast.error("Failed to save public statement");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <h2 className="text-xl font-serif font-semibold">
        {initialData?.id ? "Edit Public Statement" : "Add Public Statement"}
      </h2>

      <div>
        <label className="font-medium block mb-1">Title</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="font-medium block mb-1">Statement File</label>

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
              Remove
            </button>
          </div>
        )}

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          hidden
          id="public-statement-file-upload"
          onChange={handleFileSelect}
        />
        <button
          type="button"
          onClick={() =>
            document.getElementById("public-statement-file-upload")?.click()
          }
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
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default PublicStatementsForm;
