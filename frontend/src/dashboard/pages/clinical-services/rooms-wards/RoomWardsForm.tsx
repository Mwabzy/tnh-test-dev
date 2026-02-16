import { useState } from "react";
import toast from "react-hot-toast";
import RichTextEditor from "@/components/RichTextEditor";
import { RoomWard } from "@/types";

type RoomWardPayload = Pick<
  RoomWard,
  "title" | "name_fr" | "name_es" | "name_zh" | "name_ru"
> & {
  features?: RoomWard["features"];
  image_file?: File | null;
};

interface Props {
  initialData?: RoomWard | null;
  onSave: (payload: RoomWardPayload) => Promise<void>;
  onCancel: () => void;
}

const requiredMark = <span className="text-red-600">*</span>;

const RoomWardsForm: React.FC<Props> = ({ initialData, onSave, onCancel }) => {
  const [name, setName] = useState(initialData?.title ?? "");

  const [nameTranslations, setNameTranslations] = useState({
    fr: initialData?.name_fr ?? "",
    es: initialData?.name_es ?? "",
    zh: initialData?.name_zh ?? "",
    ru: initialData?.name_ru ?? "",
  });

  const [openTranslations, setOpenTranslations] = useState(false);
  const [featuresHtml, setFeaturesHtml] = useState(
    initialData?.features?.[0]?.title ?? "",
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string }>({});

  const validate = () => {
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = "Name is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix form errors.");
      return;
    }

    const payload: RoomWardPayload = {
      title: name,
      name_fr: nameTranslations.fr,
      name_es: nameTranslations.es,
      name_zh: nameTranslations.zh,
      name_ru: nameTranslations.ru,
      features: featuresHtml.trim() ? [{ title: featuresHtml }] : [],
      image_file: imageFile,
    };

    setLoading(true);
    try {
      await onSave(payload);
      toast.success("Room/Ward saved successfully");
    } catch {
      toast.error("Failed to save Room/Ward");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label className="font-semibold">Name {requiredMark}</label>

        <input
          type="text"
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

        <button
          type="button"
          className="text-blue-600 text-sm underline mt-1"
          onClick={() => setOpenTranslations(!openTranslations)}
        >
          {openTranslations ? "Hide Translations" : "Show Name Translations"}
        </button>

        {openTranslations && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            {(["fr", "es", "zh", "ru"] as const).map((lang) => (
              <input
                key={lang}
                type="text"
                placeholder={`Name (${lang})`}
                className="border p-2"
                value={nameTranslations[lang]}
                onChange={(e) =>
                  setNameTranslations((prev) => ({
                    ...prev,
                    [lang]: e.target.value,
                  }))
                }
              />
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="font-semibold">Features</label>
        <RichTextEditor
          value={featuresHtml}
          onChange={(html) => setFeaturesHtml(html)}
          placeholder="Enter feature details..."
          minHeight="140px"
        />
      </div>

      <div>
        <label className="font-semibold">Image</label>
        <input
          type="file"
          accept="image/*"
          className="border p-2 w-full"
          onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
        />
        {initialData?.image && !imageFile && (
          <img
            src={initialData.image}
            alt={initialData.title}
            className="mt-2 h-20 w-20 rounded object-cover"
          />
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded"
          disabled={loading}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-green-600"
          }`}
        >
          {loading ? "Saving..." : "Save Room/Ward"}
        </button>
      </div>
    </form>
  );
};

export default RoomWardsForm;

