import { useState } from "react";
import toast from "react-hot-toast";
import { TeamMember } from "@/types";

interface Props {
  initialData?: TeamMember | null;
  onSave: (member: TeamMember) => Promise<any>;
  onCancel: () => void;
}

const requiredMark = <span className="text-red-600">*</span>;

const TeamMemberForm: React.FC<Props> = ({ initialData, onSave, onCancel }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [role, setRole] = useState(initialData?.role || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [group, setGroup] = useState(initialData?.group || "");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; role?: string }>({});

  const validate = () => {
    const newErrors: any = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!role.trim()) newErrors.role = "Role is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix errors in the form.");
      return;
    }

    setLoading(true);

    const newMember: TeamMember = {
      id: initialData?.id || Date.now().toString(),
      name,
      role,
      image,
      description,
      group,
    };

    try {
      await onSave(newMember);
      toast.success("Team member saved successfully!");
    } catch {
      toast.error("Failed to save team member.");
    } finally {
      setLoading(false);
    }
  };

  const disabledClass = loading ? "opacity-50 pointer-events-none" : "";

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
      </div>

      <div>
        <label className="font-semibold">Image URL</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      <div>
        <label className="font-semibold">Description</label>
        <textarea
          className="border p-2 w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="font-semibold">Group</label>
        <div className="border p-2 w-full bg-gray-100 text-gray-700 rounded">
          {{
            BM: "Board of Management",
            BT: "Board of Trustees",
            SM: "Senior Management",
          }[group] || "—"}
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
