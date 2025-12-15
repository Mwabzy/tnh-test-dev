import { useState } from "react";
import { Doctor, ClinicalService } from "@/types";
import Select from "react-select";
import toast from "react-hot-toast";

interface DoctorFormProps {
  initialData?: Doctor | null;
  onSave: (doctor: Doctor) => Promise<void>;
  onCancel: () => void;
  availableServices: ClinicalService[];
}

interface DoctorFormState {
  id?: number | null;
  name: string;
  role: string;
  bio: string;
  image: string;
  services_offered: number[];
  research_publications: string[];
  awards: string[];
}

const DoctorForm = ({
  initialData,
  onSave,
  onCancel,
  availableServices,
}: DoctorFormProps) => {
  const [formData, setFormData] = useState<DoctorFormState>({
    id: initialData?.id ?? null,
    name: initialData?.name ?? "",
    role: initialData?.role ?? "",
    bio: initialData?.bio ?? "",
    image: initialData?.image ?? "",
    services_offered: initialData?.services_offered ?? [],
    research_publications: Array.isArray(initialData?.research_publications)
      ? initialData!.research_publications
      : [],

    awards: Array.isArray(initialData?.awards) ? initialData!.awards : [],
  });

  const [serviceInput, setServiceInput] = useState("");
  const [saving, setSaving] = useState(false);

  const filteredServices = availableServices.filter((s) => {
    if (!serviceInput) return false;
    return s.title.toLowerCase().includes(serviceInput.toLowerCase());
  });

  /* -------------------- helpers -------------------- */

  const updateListItem = (
    key: "awards" | "research_publications",
    index: number,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addListItem = (key: "awards" | "research_publications") => {
    setFormData((prev) => ({
      ...prev,
      [key]: [...prev[key], ""],
    }));
  };

  const removeListItem = (
    key: "awards" | "research_publications",
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  };

  /* -------------------- submit -------------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const cleaned: Doctor = {
      id: formData.id ?? undefined,
      name: formData.name,
      role: formData.role,
      bio: formData.bio,
      image: formData.image,
      services_offered: formData.services_offered,
      research_publications: formData.research_publications.filter(
        (p) => p.trim().length > 0
      ),
      awards: formData.awards.filter((a) => a.trim().length > 0),
    };

    try {
      await onSave(cleaned);
    } catch {
      toast.error("Failed to save doctor");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <h2 className="text-xl font-serif font-semibold">
        {formData.id ? "Edit Doctor" : "Add Doctor"}
      </h2>

      {/* Name */}
      <label className="font-medium">Doctor's Name</label>
      <input
        type="text"
        className="border p-2 w-full"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      {/* Role */}
      <label className="font-medium">Doctor's Role</label>
      <input
        type="text"
        className="border p-2 w-full"
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
      />

      {/* Bio */}
      <label className="font-medium">Bio</label>
      <textarea
        className="border p-2 w-full"
        value={formData.bio}
        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
      />

      {/* Image */}
      <label className="font-medium">Image URL</label>
      <input
        type="text"
        className="border p-2 w-full"
        value={formData.image}
        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
      />

      {/* Research & Publications */}
      <div>
        <label className="font-serif font-semibold">
          Research & Publications
        </label>

        {formData.research_publications.map((item, i) => (
          <div key={i} className="border p-2 mb-2 rounded flex gap-2">
            <input
              type="text"
              className="p-2 w-full"
              placeholder="e.g. Journal of Cardiology (2022)"
              value={item}
              onChange={(e) =>
                updateListItem("research_publications", i, e.target.value)
              }
            />
            <button
              type="button"
              onClick={() => removeListItem("research_publications", i)}
              className="text-red-500"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => addListItem("research_publications")}
          className="text-blue-600 text-sm underline"
        >
          + Add Publication
        </button>
      </div>

      {/* Awards */}
      <div>
        <label className="font-serif font-semibold">Awards</label>

        {formData.awards.map((item, i) => (
          <div key={i} className="border p-2 mb-2 rounded flex gap-2">
            <input
              type="text"
              className=" p-2 w-full"
              placeholder="e.g. Best Surgeon Award 2021"
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

      {/* Services */}
      <div>
        <label className="font-serif font-semibold">Services Offered</label>
        <Select
          isMulti
          options={filteredServices.map((s) => ({
            value: s.id,
            label: s.title,
          }))}
          value={availableServices
            .filter((s) => formData.services_offered.includes(s.id))
            .map((s) => ({
              value: s.id,
              label: s.title,
            }))}
          onChange={(vals) =>
            setFormData({
              ...formData,
              services_offered: vals.map((v) => v.value),
            })
          }
          onInputChange={setServiceInput}
          filterOption={null}
          placeholder="Search services..."
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {saving ? "Saving..." : "Save"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="px-4 py-2 bg-gray-400 text-white rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default DoctorForm;
