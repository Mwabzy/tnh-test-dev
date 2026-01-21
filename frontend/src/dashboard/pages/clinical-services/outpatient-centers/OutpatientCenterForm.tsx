import { useEffect, useState } from "react";
import { ContactInfo, outpatientCenter, Timings } from "@/types";


export type Clinic = {
  id: number;
  name: string;
};

interface Props {
  initialData: outpatientCenter | null;
  onSave: (center: outpatientCenter) => void;
  onCancel: () => void;
  clinics: Clinic[];
}


const OutpatientCenterForm = ({
  initialData,
  onSave,
  onCancel,
  clinics,
}: Props) => {

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
const [timings, setTimings] = useState<Timings[]>([]);

  const [contact, setContact] = useState<ContactInfo>({
    phone: "",
    email: "",
  });

  const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];



  /* 🔁 Sync form when editing */
  useEffect(() => {
  if (initialData) {
    setName(initialData.name || "");
    setLocation(initialData.location || "");
    setDescription(initialData.description || "");

    setTimings(
      Array.isArray(initialData.timings)
        ? initialData.timings
        : []
    );

    setContact({
      phone: initialData.contact?.phone || "",
      email: initialData.contact?.email || "",
    });
  } else {
    setName("");
    setLocation("");
    setDescription("");
    setTimings([]);
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
      <div>
      <label className="font-semibold">Clinic Timings</label>

       {timings.map((t, i) => (
        <div
      key={i}
      className="grid grid-cols-4 gap-2 items-center border p-2 mb-2 rounded"
       >
      {/* Clinic */}
      <select
        className="border p-2"
        value={t.clinicId ?? ""}
        onChange={(e) =>
          setTimings((prev) =>
            prev.map((row, idx) =>
              idx === i
                ? { ...row, clinicId: Number(e.target.value) }
                : row
            )
          )
        }
      >
        <option value="">Select Clinic</option>
        {clinics.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Day */}
      <select
        className="border p-2"
        value={t.day}
        onChange={(e) =>
          setTimings((prev) =>
            prev.map((row, idx) =>
              idx === i ? { ...row, day: e.target.value } : row
            )
          )
        }
      >
        <option value="">Day</option>
        {DAYS.map((d) => (
          <option key={d} value={d}>
            {d.charAt(0).toUpperCase() + d.slice(1)}
          </option>
        ))}
      </select>

      {/* Start Time */}
      <input
        type="time"
        className="border p-2"
        value={t.startTime}
        onChange={(e) =>
          setTimings((prev) =>
            prev.map((row, idx) =>
              idx === i ? { ...row, startTime: e.target.value } : row
            )
          )
        }
      />

      {/* End Time */}
      <input
        type="time"
        className="border p-2"
        value={t. stopTime}
        onChange={(e) =>
          setTimings((prev) =>
            prev.map((row, idx) =>
              idx === i ? { ...row, stopTime: e.target.value } : row
            )
          )
        }
      />

      {/* Remove */}
      <button
        type="button"
        className="text-red-500 text-sm col-span-4 text-right"
        onClick={() =>
          setTimings((prev) => prev.filter((_, idx) => idx !== i))
        }
      >
        ✕ Remove
      </button>
    </div>
    ))}

  <button
    type="button"
    onClick={() =>
      setTimings((prev) => [
        ...prev,
        { clinicId: null, day: "", startTime: "", stopTime: "" },
      ])
    }
    className="text-blue-600 text-sm underline"
  >
    + Add Timing
  </button>
</div>


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
