import { useState } from "react";
import { ClinicalService, Image } from "@/types";
import { Doctor } from "@/types/clinicalServices";
import Select from "react-select";
import toast from "react-hot-toast";
import RichTextEditor from "@/components/RichTextEditor"; // Adjust path as needed

interface DoctorFormProps {
  initialData?: Doctor | null;
  onSave: (doctor: Doctor | FormData) => Promise<void>;
  onCancel: () => void;
  availableServices: ClinicalService[];
}

type NewImage = {
  file: File;
  alt: string;
};

const DoctorForm = ({
  initialData,
  onSave,
  onCancel,
  availableServices,
}: DoctorFormProps) => {
  const [name, setName] = useState(initialData?.name ?? "");
  const [role, setRole] = useState(initialData?.role ?? "");
  const [bio, setBio] = useState(initialData?.bio ?? "");
  const [servicesOffered, setServicesOffered] = useState<number[]>(
    initialData?.services_offered
      ? initialData.services_offered.map((s) => s.id)
      : [],
  );

  const [researchPublications, setResearchPublications] = useState<string[]>(
    Array.isArray(initialData?.research_publications)
      ? initialData!.research_publications
      : [],
  );
  const [awards, setAwards] = useState<string[]>(
    Array.isArray(initialData?.awards) ? initialData!.awards : [],
  );

  const [images, setImages] = useState<Image[]>(
    (initialData?.image || []).map((img) => ({
      ...img,
      alt: img.alt || "",
    })),
  );
  const [newImages, setNewImages] = useState<NewImage[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);

  const [serviceInput, setServiceInput] = useState("");
  const [saving, setSaving] = useState(false);
  // Translation state
  const [roleTranslations, setRoleTranslations] = useState({
    fr: initialData?.role_fr || "",
    es: initialData?.role_es || "",
    zh: initialData?.role_zh || "",
    ru: initialData?.role_ru || "",
  });

  const [bioTranslations, setBioTranslations] = useState({
    fr: initialData?.bio_fr || "",
    es: initialData?.bio_es || "",
    zh: initialData?.bio_zh || "",
    ru: initialData?.bio_ru || "",
  });

  const [openTranslation, setOpenTranslation] = useState<"role" | "bio" | null>(
    null,
  );

  const toggleTranslation = (field: "role" | "bio") => {
    setOpenTranslation((prev) => (prev === field ? null : field));
  };

  /* Filtered Services for search */
  const filteredServices = availableServices.filter((s) => {
    if (!serviceInput) return false;
    return s.title.toLowerCase().includes(serviceInput.toLowerCase());
  });

  /* Awards & Publications Helpers */
  const updateListItem = (
    key: "awards" | "researchPublications",
    index: number,
    value: string,
  ) => {
    const setter = key === "awards" ? setAwards : setResearchPublications;
    const list = key === "awards" ? awards : researchPublications;
    setter(list.map((item, i) => (i === index ? value : item)));
  };

  const addListItem = (key: "awards" | "researchPublications") => {
    const setter = key === "awards" ? setAwards : setResearchPublications;
    const list = key === "awards" ? awards : researchPublications;
    setter([...list, ""]);
  };

  const removeListItem = (
    key: "awards" | "researchPublications",
    index: number,
  ) => {
    const setter = key === "awards" ? setAwards : setResearchPublications;
    const list = key === "awards" ? awards : researchPublications;
    setter(list.filter((_, i) => i !== index));
  };

  /* Existing Images */
  const handleExistingImageChange = (index: number, value: string) => {
    setImages(
      images.map((img, i) => (i === index ? { ...img, alt: value } : img)),
    );
  };

  const removeExistingImage = (index: number) => {
    const img = images[index];
    if (img.id != null) {
      // Ensure id is number
      setImagesToDelete((prev) => [...prev, img.id as number]);
    }
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  /* New Images */
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const mapped = Array.from(e.target.files).map((file) => ({
      file,
      alt: "",
    }));
    setNewImages((prev) => [...prev, ...mapped]);
    e.target.value = "";
  };

  /* Bio editor handler */
  const handleBioChange = (html: string, plainText: string) => {
    setBio(html);
  };

  /* Bio translation handlers */
  const handleBioTranslationChange =
    (lang: keyof typeof bioTranslations) =>
    (html: string, plainText: string) => {
      setBioTranslations((prev) => ({
        ...prev,
        [lang]: html,
      }));
    };

  /* Submit */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("role", role);
      formData.append("role_fr", roleTranslations.fr);
      formData.append("role_es", roleTranslations.es);
      formData.append("role_zh", roleTranslations.zh);
      formData.append("role_ru", roleTranslations.ru);

      // Use HTML content from rich text editor
      formData.append("bio", bio);
      formData.append("bio_fr", bioTranslations.fr);
      formData.append("bio_es", bioTranslations.es);
      formData.append("bio_zh", bioTranslations.zh);
      formData.append("bio_ru", bioTranslations.ru);
      formData.append("services_offered_ids", JSON.stringify(servicesOffered));
      formData.append(
        "research_publications",
        JSON.stringify(researchPublications),
      );
      formData.append("awards", JSON.stringify(awards));

      // Append new images
      newImages.forEach((img) => {
        if (img.file) {
          formData.append("images_files", img.file);
          formData.append("images_files_alt", img.alt || "");
        }
      });

      // Append images to delete
      imagesToDelete.forEach((id) => {
        formData.append("images_to_delete", String(id));
      });

      await onSave(formData);
    } catch (err) {
      toast.error("Failed to save doctor");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <h2 className="text-xl font-serif font-semibold">
        {initialData?.id ? "Edit Doctor" : "Add Doctor"}
      </h2>

      {/* Name */}
      <label className="font-medium">Doctor's Name</label>
      <input
        type="text"
        className="border p-2 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {/* Role */}
      <label className="font-medium block mb-1">Doctor's Role</label>
      <input
        type="text"
        className="border p-2 w-full"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <button
        type="button"
        className="text-blue-600 text-sm underline block"
        onClick={() => toggleTranslation("role")}
      >
        {openTranslation === "role"
          ? "Hide Translations"
          : "Show Role Translations"}
      </button>

      {openTranslation === "role" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
          {(["fr", "es", "zh", "ru"] as const).map((lang) => (
            <input
              key={lang}
              type="text"
              placeholder={`Role (${lang})`}
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

      {/* Bio - Now using RichTextEditor */}
      <label className="font-medium block mb-1">Bio</label>
      <RichTextEditor
        value={bio}
        onChange={handleBioChange}
        placeholder="Enter doctor's bio..."
        minHeight="200px"
      />

      <button
        type="button"
        className="text-blue-600 text-sm underline mt-2 block"
        onClick={() => toggleTranslation("bio")}
      >
        {openTranslation === "bio"
          ? "Hide Translations"
          : "Show Bio Translations"}
      </button>

      {openTranslation === "bio" && (
        <div className="space-y-4 mb-2">
          {(["fr", "es", "zh", "ru"] as const).map((lang) => (
            <div key={lang}>
              <label className="block text-sm font-medium mb-1">
                Bio ({lang})
              </label>
              <RichTextEditor
                value={bioTranslations[lang]}
                onChange={handleBioTranslationChange(lang)}
                placeholder={`Enter bio in ${lang}...`}
                minHeight="150px"
              />
            </div>
          ))}
        </div>
      )}

      {/* Services */}
      <label className="font-serif font-semibold">Services Offered</label>
      <Select
        isMulti
        options={filteredServices.map((s) => ({ value: s.id, label: s.title }))}
        value={availableServices
          .filter((s) => servicesOffered.includes(s.id))
          .map((s) => ({ value: s.id, label: s.title }))}
        onChange={(vals) => setServicesOffered(vals.map((v) => v.value))}
        onInputChange={setServiceInput}
        filterOption={null}
        placeholder="Start typing to search..."
      />

      {/* Research & Awards */}
      <div>
        <label className="font-serif font-semibold">
          Research & Publications
        </label>
        {researchPublications.map((item, i) => (
          <div key={i} className="border p-2 mb-2 rounded flex gap-2">
            <input
              type="text"
              className="p-2 w-full"
              value={item}
              onChange={(e) =>
                updateListItem("researchPublications", i, e.target.value)
              }
            />
            <button
              type="button"
              onClick={() => removeListItem("researchPublications", i)}
              className="text-red-500"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addListItem("researchPublications")}
          className="text-blue-600 text-sm underline"
        >
          + Add Publication
        </button>
      </div>

      <div>
        <label className="font-serif font-semibold">Awards</label>
        {awards.map((item, i) => (
          <div key={i} className="border p-2 mb-2 rounded flex gap-2">
            <input
              type="text"
              className="p-2 w-full"
              value={item}
              onChange={(e) => updateListItem("awards", i, e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeListItem("awards", i)}
              className="text-red-500"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addListItem("awards")}
          className="text-blue-600 text-sm underline"
        >
          + Add Award
        </button>
      </div>

      {/* Images */}
      <div>
        <label className="font-semibold">Images</label>

        {/* Existing */}
        {images.map((img, i) => (
          <div key={`existing-${i}`} className="flex gap-2 mb-2 items-center">
            {img.url && (
              <img
                src={img.url}
                alt={img.alt || ""}
                className="w-20 h-20 object-cover border"
              />
            )}
            <input
              type="text"
              placeholder="Alt text"
              className="border p-2 grow"
              value={img.alt}
              onChange={(e) => handleExistingImageChange(i, e.target.value)}
            />
            <button
              type="button"
              className="text-red-500"
              onClick={() => removeExistingImage(i)}
            >
              ✕ Remove
            </button>
          </div>
        ))}

        {/* New */}
        {newImages.map((img, idx) => (
          <div key={`new-${idx}`} className="flex gap-2 mb-2 items-center">
            <img
              src={URL.createObjectURL(img.file)}
              alt={img.alt || ""}
              className="w-20 h-20 object-cover border"
            />
            <input
              type="text"
              placeholder="Alt text"
              className="border p-2 grow"
              value={img.alt}
              onChange={(e) =>
                setNewImages((prev) =>
                  prev.map((ni, i) =>
                    i === idx ? { ...ni, alt: e.target.value } : ni,
                  ),
                )
              }
            />
            <button
              type="button"
              className="text-red-500"
              onClick={() =>
                setNewImages((prev) => prev.filter((_, i) => i !== idx))
              }
            >
              ✕ Remove
            </button>
          </div>
        ))}

        <input
          type="file"
          accept="image/*"
          multiple
          hidden
          id="doctor-image-upload"
          onChange={handleImageSelect}
        />
        <button
          type="button"
          onClick={() =>
            document.getElementById("doctor-image-upload")?.click()
          }
          className="text-blue-600 text-sm underline mt-2"
        >
          + Add Image
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

export default DoctorForm;
