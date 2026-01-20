import { useEffect, useState } from "react";
import { ContactInfo, outpatientCenter } from "@/types";

interface Props {
  initialData: outpatientCenter | null;
  onSave: (center: outpatientCenter) => void;
  onCancel: () => void;
}

const OutpatientCenterForm = ({ initialData, onSave, onCancel }: Props) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [timings, setTimings] = useState("");

  const [contact, setContact] = useState<ContactInfo>({
    phone: "",
    email: "",
  });

  /* 🔁 Sync form when editing */
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setLocation(initialData.location || "");
      setDescription(initialData.description || "");
      setTimings(initialData.timings || "");
      setContact({
        phone: initialData.contact?.phone || "",
        email: initialData.contact?.email || "",
      });
    } else {
      setName("");
      setLocation("");
      setDescription("");
      setTimings("");
      setContact({ phone: "", email: "" });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave({
      id: initialData?.id,
      name,
      location,
      description,
      timings,
      contact,
    });
  };

  return (
    <form
      className="border p-6 rounded space-y-4 bg-white"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold">
        {initialData ? "Edit Outpatient Center" : "Add Outpatient Center"}
      </h2>

      {/* Name */}
      <input
        className="border p-2 w-full"
        placeholder="Center Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      {/* Location */}
      <input
        className="border p-2 w-full"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />

      {/* Description */}
      <textarea
        className="border p-2 w-full"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Timings */}
      <input
        className="border p-2 w-full"
        placeholder="Operating Timings"
        value={timings}
        onChange={(e) => setTimings(e.target.value)}
      />

      {/* Contact */}
      <input
        className="border p-2 w-full"
        placeholder="Phone"
        value={contact.phone}
        onChange={(e) =>
          setContact({ ...contact, phone: e.target.value })
        }
      />

      <input
        className="border p-2 w-full"
        placeholder="Email"
        type="email"
        value={contact.email}
        onChange={(e) =>
          setContact({ ...contact, email: e.target.value })
        }
      />

      {/* Actions */}
      <div className="flex gap-4 pt-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default OutpatientCenterForm;
