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

  const [description ] = useState("");
  const [contact ] = useState<ContactInfo>({
      phone: initialData?.contact?.phone || "",
      email: initialData?.contact?.email || "",
    });
  const [timings, ] = useState("");

 
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setLocation(initialData.location);
    } else {
      setName("");
      setLocation("");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave({
      id: initialData?.id,
      name,
      location,
      description,
      contact,
      timings,
    });
  };

  return (
    <form className="border p-4 rounded space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold">
        {initialData ? "Edit Center" : "Add Center"}
      </h2>

      <input
        className="border p-2 w-full"
        placeholder="Center name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <div className="flex gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
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
