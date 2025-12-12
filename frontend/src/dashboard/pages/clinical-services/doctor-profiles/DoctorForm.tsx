import { useState } from "react";
import { Doctor, ClinicalService } from "@/types";
import Select from "react-select";

interface DoctorFormProps {
  initialData?: Doctor | null;
  onSave: (doctor: Doctor) => void;
  onCancel: () => void;
  availableServices: ClinicalService[];
}

interface DoctorFormState {
  id?: number | null;
  name: string;
  role: string;
  bio: string;
  image: string;
  services_offered: (number | null)[];
  research_publications: string;
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
    research_publications: initialData?.research_publications ?? "",
    awards: initialData?.awards ?? [],
  });

  const [serviceInput, setServiceInput] = useState("");

  const filteredServices = availableServices.filter((s) => {
    if (!serviceInput) return false;
    return s.title.toLowerCase().includes(serviceInput.toLowerCase());
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleaned = {
      name: formData.name,
      role: formData.role,
      bio: formData.bio,
      image: formData.image,
      research_publications: formData.research_publications,
      awards: formData.awards,
      services_offered: formData.services_offered.filter(
        (s): s is number => s !== null
      ),
    };

    onSave(cleaned);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <h2 className="text-xl  font-serif font-semibold ">
        {formData.id ? "Edit Doctor" : "Add Doctor"}
      </h2>

      <label htmlFor="Doctorname" className="block mb-1 font-medium">
        Doctor's Name
      </label>
      <input
        id="Doctorname"
        type="text"
        placeholder="Name"
        className="border p-2 w-full"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      <label htmlFor="role" className="block mb-1 font-medium">
        Doctor's Role
      </label>
      <input
        id="role"
        type="text"
        placeholder="Role"
        className="border p-2 w-full"
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
      />

      <label htmlFor="bio" className="block mb-1 font-medium">
        Add Bio
      </label>
      <textarea
        id="bio"
        placeholder="Bio"
        className="border p-2 w-full"
        value={formData.bio}
        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
      />

      <label htmlFor="image" className="block mb-1 font-medium">
        Image URL
      </label>
      <input
        id="image"
        type="text"
        placeholder="Image URL"
        className="border p-2 w-full"
        value={formData.image}
        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
      />

      {/* Research Publications*/}
      <div>
        <label className="font-semibold">
          Research Publications (comma separated)
        </label>
        <input
          type="text"
          className="border p-2 w-full mt-1"
          placeholder="e.g. Study A, Study B, Study C"
          value={formData.research_publications}
          onChange={(e) =>
            setFormData({ ...formData, research_publications: e.target.value })
          }
        />
      </div>

      {/* Awards */}
      <div>
        <label className="font-serif font-semibold">
          Awards (comma separated)
        </label>
        <input
          type="text"
          className="border p-2 w-full mt-1"
          placeholder="e.g. Award A, Award B"
          value={formData.awards.join(", ")}
          onChange={(e) =>
            setFormData({
              ...formData,
              awards: e.target.value
                .split(",")
                .map((a) => a.trim())
                .filter((a) => a.length > 0),
            })
          }
        />
      </div>

      {/* SERVICES */}
      <div>
        <label className="font-serif font-semibold">Services Offered</label>

        <Select
          isMulti
          options={filteredServices.map((service) => ({
            value: service.id,
            label: service.title,
          }))}
          value={availableServices
            .filter((s) => formData.services_offered.includes(s.id))
            .map((s) => ({ value: s.id, label: s.title }))}
          onChange={(selected) => {
            const ids = selected.map((s) => s.value);
            setFormData((prev) => ({
              ...prev,
              services_offered: ids,
            }));
          }}
          onInputChange={(value) => setServiceInput(value)}
          placeholder="Search services..."
          noOptionsMessage={() =>
            serviceInput.length < 1
              ? "Start typing to search..."
              : "No results found"
          }
          filterOption={null}
          className="mt-2"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-gray-400 text-white rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default DoctorForm;
