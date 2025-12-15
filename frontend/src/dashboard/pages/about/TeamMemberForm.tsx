import { useState } from "react";
import toast from "react-hot-toast";
import { TeamMember } from "@/types";

interface Props {
  initialData?: TeamMember | null;
  fixedGroup?: "BT" | "BM" | "SM";
  onSave: (member: Partial<TeamMember>) => Promise<void>;
  onCancel: () => void;
}

const TeamMemberForm: React.FC<Props> = ({
  initialData,
  fixedGroup,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState(initialData?.name ?? "");
  const [role, setRole] = useState(initialData?.role ?? "");
  const [image, setImage] = useState(initialData?.image ?? "");
  const [description, setDescription] = useState(
    initialData?.description ?? ""
  );

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; role?: string }>({});

  const group = fixedGroup ?? initialData?.group;

  const validate = () => {
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!role.trim()) errs.role = "Role is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    setLoading(true);

    try {
      await onSave({
        id: initialData?.id,
        name,
        role,
        image,
        description,
        group,
      });

      toast.success("Team member saved successfully!");
    } catch (err: any) {
      toast.error(err?.message || "Failed to save team member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-lg p-6 space-y-5"
    >
      <h2 className="text-xl font-semibold">
        {initialData ? "Edit Team Member" : "Add Team Member"}
      </h2>

      {/* Name */}
      <div>
        <label className="block font-medium mb-1">Name *</label>
        <input
          type="text"
          className="border p-2 w-full rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Role */}
      <div>
        <label className="block font-medium mb-1">Role *</label>
        <input
          type="text"
          className="border p-2 w-full rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        {errors.role && (
          <p className="text-red-600 text-sm mt-1">{errors.role}</p>
        )}
      </div>

      {/* Image */}
      <div>
        <label className="block font-medium mb-1">Image URL</label>
        <input
          type="text"
          className="border p-2 w-full rounded"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea
          className="border p-2 w-full rounded min-h-[100px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Group (read-only when fixed) */}
      {group && (
        <div>
          <label className="block font-medium mb-1">Group</label>
          <input
            type="text"
            className="border p-2 w-full rounded bg-gray-100 cursor-not-allowed"
            value={
              group === "BT"
                ? "Board of Trustees"
                : group === "BM"
                ? "Board of Management"
                : "Senior Management"
            }
            disabled
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default TeamMemberForm;
