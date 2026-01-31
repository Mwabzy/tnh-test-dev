import { useState } from "react";
import toast from "react-hot-toast";
import { TeamMember } from "@/types";
import RichTextEditor from "@/components/RichTextEditor";

interface Props {
  initialData?: TeamMember | null;
  onSave: (member: TeamMember | FormData) => Promise<any>;
  onCancel: () => void;
}

const requiredMark = <span className="text-red-600">*</span>;

const TeamMemberForm: React.FC<Props> = ({ initialData, onSave, onCancel }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [role, setRole] = useState(initialData?.role || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [group, _setGroup] = useState(initialData?.group || "");

  // For storing plain text description (if needed)
  const [_plainDescription, setPlainDescription] = useState("");

  // Translation states
  const [roleTranslations, setRoleTranslations] = useState({
    fr: initialData?.role_fr || "",
    es: initialData?.role_es || "",
    zh: initialData?.role_zh || "",
    ru: initialData?.role_ru || "",
  });

  const [descriptionTranslations, setDescriptionTranslations] = useState({
    fr: initialData?.description_fr || "",
    es: initialData?.description_es || "",
    zh: initialData?.description_zh || "",
    ru: initialData?.description_ru || "",
  });

  const [groupTranslations, setGroupTranslations] = useState({
    fr: initialData?.group_fr || "",
    es: initialData?.group_es || "",
    zh: initialData?.group_zh || "",
    ru: initialData?.group_ru || "",
  });

  // Track which translation panel is open
  const [openTranslation, setOpenTranslation] = useState<
    "role" | "description" | "group" | null
  >(null);

  const toggleTranslation = (field: "role" | "description" | "group") => {
    setOpenTranslation((prev) => (prev === field ? null : field));
  };

  // Images
  const [existingImage, setExistingImage] = useState<{
    url: string;
    alt: string;
    id?: number;
  } | null>(
    initialData?.image
      ? {
          url: initialData.image,
          alt: (initialData as any).image_alt || "",
        }
      : null,
  );
  const [newImage, setNewImage] = useState<{ file: File; alt: string } | null>(
    null,
  );
  const [imageToDelete, setImageToDelete] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; role?: string }>({});

  const validate = () => {
    const newErrors: any = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!role.trim()) newErrors.role = "Role is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setNewImage({ file: e.target.files[0], alt: "" });
    e.target.value = "";
  };

  const handleRemoveExistingImage = () => {
    setImageToDelete(true);
    setExistingImage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix errors in the form.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("role", role);
      formData.append("description", description);
      formData.append("group", group);

      // Append translation fields
      formData.append("role_fr", roleTranslations.fr);
      formData.append("role_es", roleTranslations.es);
      formData.append("role_zh", roleTranslations.zh);
      formData.append("role_ru", roleTranslations.ru);

      formData.append("description_fr", descriptionTranslations.fr);
      formData.append("description_es", descriptionTranslations.es);
      formData.append("description_zh", descriptionTranslations.zh);
      formData.append("description_ru", descriptionTranslations.ru);

      formData.append("group_fr", groupTranslations.fr);
      formData.append("group_es", groupTranslations.es);
      formData.append("group_zh", groupTranslations.zh);
      formData.append("group_ru", groupTranslations.ru);

      if (newImage) {
        formData.append("image_file", newImage.file);
        formData.append("image_alt", newImage.alt);
      }

      if (existingImage && !imageToDelete) {
        formData.append("image_alt", existingImage.alt);
      }

      if (imageToDelete) {
        formData.append("image_to_delete", "true");
      }

      await onSave(formData);
      toast.success("Team member saved successfully!");
    } catch {
      toast.error("Failed to save team member.");
    } finally {
      setLoading(false);
    }
  };

  const disabledClass = loading ? "opacity-50 pointer-events-none" : "";

  // Map group codes to display names
  const groupDisplayName =
    {
      BM: "Board of Management",
      BT: "Board of Trustees",
      SM: "Senior Management",
    }[group] || "—";

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${disabledClass}`}>
      <div>
        <label className="font-semibold">
          Name {requiredMark}
          <input
            type="text"
            className="border p-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
      </div>

      {/* Role with Translations */}
      <div>
        <label className="font-semibold">
          Role {requiredMark}
          <input
            type="text"
            className="border p-2 w-full"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </label>
        {errors.role && <p className="text-red-600 text-sm">{errors.role}</p>}

        <button
          type="button"
          className="text-blue-600 text-sm underline block mt-1"
          onClick={() => toggleTranslation("role")}
        >
          {openTranslation === "role"
            ? "Hide Role Translations"
            : "Show Role Translations"}
        </button>

        {openTranslation === "role" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            {(["fr", "es", "zh", "ru"] as const).map((lang) => (
              <input
                key={`role-${lang}`}
                type="text"
                placeholder={`Role (${lang.toUpperCase()})`}
                className="border p-2 w-full"
                value={roleTranslations[lang]}
                onChange={(e) =>
                  setRoleTranslations((prev) => ({
                    ...prev,
                    [lang]: e.target.value,
                  }))
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Description with RichTextEditor */}
      <div>
        <label className="font-semibold">Description</label>
        <div className="mt-2">
          <RichTextEditor
            value={description}
            onChange={(html, plainText) => {
              setDescription(html);
              setPlainDescription(plainText);
            }}
            placeholder="Enter team member description..."
            minHeight="200px"
          />
        </div>

        <button
          type="button"
          className="text-blue-600 text-sm underline block mt-3"
          onClick={() => toggleTranslation("description")}
        >
          {openTranslation === "description"
            ? "Hide Description Translations"
            : "Show Description Translations"}
        </button>

        {openTranslation === "description" && (
          <div className="mt-3 space-y-3">
            {(["fr", "es", "zh", "ru"] as const).map((lang) => (
              <div key={`description-${lang}`}>
                <label className="block text-sm font-medium mb-1">
                  Description ({lang.toUpperCase()})
                </label>
                <RichTextEditor
                  value={descriptionTranslations[lang]}
                  onChange={(html, _plainText) => {
                    setDescriptionTranslations((prev) => ({
                      ...prev,
                      [lang]: html,
                    }));
                  }}
                  placeholder={`Description in ${lang.toUpperCase()}...`}
                  minHeight="150px"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Group with Translations */}
      <div>
        <label className="font-semibold">Group</label>
        <div className="border p-2 w-full bg-gray-100 text-gray-700 rounded">
          {groupDisplayName}
        </div>

        <button
          type="button"
          className="text-blue-600 text-sm underline block mt-1"
          onClick={() => toggleTranslation("group")}
        >
          {openTranslation === "group"
            ? "Hide Group Translations"
            : "Show Group Translations"}
        </button>

        {openTranslation === "group" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            {(["fr", "es", "zh", "ru"] as const).map((lang) => (
              <input
                key={`group-${lang}`}
                type="text"
                placeholder={`Group Display Name (${lang.toUpperCase()})`}
                className="border p-2 w-full"
                value={groupTranslations[lang]}
                onChange={(e) =>
                  setGroupTranslations((prev) => ({
                    ...prev,
                    [lang]: e.target.value,
                  }))
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Image with Alt Text */}
      <div>
        <label className="font-semibold">Image</label>
        <div className="flex flex-col gap-2 mt-2">
          {(existingImage || newImage) && (
            <div className="flex gap-2 items-center">
              <img
                src={
                  existingImage
                    ? existingImage.url
                    : newImage
                      ? URL.createObjectURL(newImage.file)
                      : ""
                }
                className="w-20 h-20 object-cover border"
                alt="Preview"
              />
              <input
                type="text"
                placeholder="Alt text"
                className="border p-2 grow"
                value={existingImage ? existingImage.alt : newImage?.alt || ""}
                onChange={(e) => {
                  const val = e.target.value;
                  if (existingImage)
                    setExistingImage({ ...existingImage, alt: val });
                  else if (newImage) setNewImage({ ...newImage, alt: val });
                }}
              />
              <button
                type="button"
                className="text-red-500"
                onClick={() => {
                  if (existingImage) handleRemoveExistingImage();
                  else setNewImage(null);
                }}
              >
                ✕ Remove
              </button>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            hidden
            id="team-member-image-upload"
            onChange={handleImageSelect}
          />
          <button
            type="button"
            className="text-blue-600 text-sm underline"
            onClick={() =>
              document.getElementById("team-member-image-upload")?.click()
            }
          >
            + Add Image
          </button>
        </div>
      </div>

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
          className={`px-4 py-2 rounded text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600"
          }`}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default TeamMemberForm;
