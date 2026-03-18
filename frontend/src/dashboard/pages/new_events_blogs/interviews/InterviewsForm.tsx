import { useState } from "react";
import { Interview } from "@/types";
import toast from "react-hot-toast";

interface InterviewsFormProps {
  initialData?: Interview | null;
  onSave: (payload: Interview) => Promise<void>;
  onCancel: () => void;
}

const InterviewsForm = ({
  initialData,
  onSave,
  onCancel,
}: InterviewsFormProps) => {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl ?? "");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (!title.trim() || !videoUrl.trim()) {
        toast.error("Please provide a title and video URL.");
        return;
      }

      await onSave({ title: title.trim(), videoUrl: videoUrl.trim() });
    } catch (err) {
      toast.error("Failed to save interview");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <h2 className="text-xl font-serif font-semibold">
        {initialData?.id ? "Edit Interview" : "Add Interview"}
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
        <label className="font-medium block mb-1">Video URL</label>
        <input
          type="url"
          className="border p-2 w-full"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          required
        />
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

export default InterviewsForm;
