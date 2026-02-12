import { useEffect, useState } from "react";
import { HeroSlide } from "@/types";

type Props = {
  initialData: HeroSlide | null;
  onSave: (formData: FormData) => Promise<void>;
  onCancel: () => void;
};

const HeroForm = ({ initialData, onSave, onCancel }: Props) => {
  const isEdit = Boolean(initialData?.id);

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(
    initialData?.description ?? "",
  );
  const [imageKey, setImageKey] = useState(
    initialData?.imageKey ?? "hospitalview",
  );
  const [order, setOrder] = useState<number>(initialData?.order ?? 0);
  const [isActive, setIsActive] = useState<boolean>(
    initialData?.isActive ?? true,
  );

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTitle(initialData?.title ?? "");
    setDescription(initialData?.description ?? "");
    setImageKey(initialData?.imageKey ?? "hospitalview");
    setOrder(initialData?.order ?? 0);
    setIsActive(initialData?.isActive ?? true);
    setImageFile(null);
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("description", description);
      fd.append("imageKey", imageKey);
      fd.append("order", String(order));
      fd.append("isActive", String(isActive));

      // Optional file upload
      if (imageFile) fd.append("image", imageFile);

      await onSave(fd);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border rounded p-4 space-y-4"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {isEdit ? "Edit Slide" : "Add Slide"}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 border rounded"
        >
          Cancel
        </button>
      </div>

      <div className="grid gap-3">
        <label className="grid gap-1">
          <span className="text-sm font-medium">Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded px-3 py-2"
            required
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium">Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded px-3 py-2 min-h-[90px]"
            required
          />
        </label>

        <div className="grid md:grid-cols-2 gap-3">
          <label className="grid gap-1">
            <span className="text-sm font-medium">Image Key</span>
            <select
              value={imageKey}
              onChange={(e) => setImageKey(e.target.value)}
              className="border rounded px-3 py-2"
            >
              <option value="hospitalview">hospitalview</option>
              <option value="accident">accident</option>
            </select>
            <span className="text-xs text-gray-500">
              Use your frontend map keys (e.g. accident / hospitalview).
            </span>
          </label>

          <label className="grid gap-1">
            <span className="text-sm font-medium">Order</span>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              className="border rounded px-3 py-2"
            />
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="isActive"
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          <label htmlFor="isActive" className="text-sm">
            Active
          </label>
        </div>

        <label className="grid gap-1">
          <span className="text-sm font-medium">Upload Image (optional)</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
          />
          <span className="text-xs text-gray-500">
            If your backend supports file upload; otherwise remove this field.
          </span>
        </label>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          {saving ? "Saving..." : isEdit ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default HeroForm;
