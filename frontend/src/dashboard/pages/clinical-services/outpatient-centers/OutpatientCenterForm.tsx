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
  const [clinicSearch, setClinicSearch] = useState<Record<number, string>>({});

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

  const HOURS = [
    "12:00 AM",
    "1:00 AM",
    "2:00 AM",
    "3:00 AM",
    "4:00 AM",
    "5:00 AM",
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
    "11:00 PM",
  ];

  const getValidEndTimes = (startTime: string) => {
    const startIndex = HOURS.indexOf(startTime);
    return startIndex === -1 ? HOURS : HOURS.slice(startIndex + 1);
  };

  // Sync the clinicSearch map
  useEffect(() => {
    const searchMap: Record<number, string> = {};
    timings.forEach((t, i) => {
      const clinic = clinics.find((c) => c.id === Number(t.clinicId));
      if (clinic) searchMap[i] = clinic.name;
    });
    setClinicSearch(searchMap);
  }, [timings, clinics]);

  /* Sync form when editing */
  useEffect(() => {
    if (!initialData) {
      setName("");
      setLocation("");
      setDescription("");
      setTimings([]);
      setContact({ phone: "", email: "" });
      return;
    }

    setName(initialData.name || "");
    setLocation(initialData.location || "");
    setDescription(initialData.description || "");
    setTimings(
      (Array.isArray(initialData.timings) ? initialData.timings : []).map(
        (t) => ({
          ...t,
          clinicId: t.clinicId ? String(t.clinicId) : "",
        }),
      ),
    );
    setContact({
      phone: initialData.contact?.phone || "",
      email: initialData.contact?.email || "",
    });
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

      <input
        className="border p-2 w-full"
        placeholder="Center Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        className="border p-2 w-full"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />

      <textarea
        className="border p-2 w-full"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div>
        <label className="font-semibold">Clinic Timings</label>

        {timings.map((t, i) => (
          <div
            key={i}
            className="grid grid-cols-4 gap-2 items-center border p-2 mb-2 rounded"
          >
            {/* Clinic search */}
            <div className="relative">
              <input
                className="border p-2 w-full"
                placeholder="Search clinic..."
                // Show what user types or selected clinic
                value={
                  clinicSearch[i]?.trim() ||
                  clinics.find((c) => c.id === Number(t.clinicId))?.name ||
                  ""
                }
                onChange={(e) =>
                  setClinicSearch((prev) => ({
                    ...prev,
                    [i]: e.target.value,
                  }))
                }
              />

              {/* Show dropdown only while typing */}
              {clinicSearch[i]?.trim() && (
                <div className="absolute z-10 bg-white border w-full max-h-40 overflow-y-auto rounded shadow">
                  {clinics
                    .filter((c) =>
                      c.name
                        .toLowerCase()
                        .includes(clinicSearch[i]!.toLowerCase()),
                    )
                    .map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                        onClick={() => {
                          // Save selected clinic in timings
                          setTimings((prev) =>
                            prev.map((row, idx) =>
                              idx === i
                                ? { ...row, clinicId: String(c.id) }
                                : row,
                            ),
                          );
                          // Clear search to close dropdown
                          setClinicSearch((prev) => ({
                            ...prev,
                            [i]: "",
                          }));
                        }}
                      >
                        {c.name}
                      </button>
                    ))}

                  {/* Show no results if nothing matches */}
                  {clinics.filter((c) =>
                    c.name
                      .toLowerCase()
                      .includes(clinicSearch[i]!.toLowerCase()),
                  ).length === 0 && (
                    <div className="px-3 py-2 text-sm text-gray-400">
                      No results
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Day */}
            <select
              className="border p-2"
              value={t.day}
              onChange={(e) =>
                setTimings((prev) =>
                  prev.map((row, idx) =>
                    idx === i ? { ...row, day: e.target.value } : row,
                  ),
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

            {/* Start time */}
            <select
              className="border p-2"
              value={t.startTime}
              onChange={(e) =>
                setTimings((prev) =>
                  prev.map((row, idx) => {
                    if (idx !== i) return row;
                    const newStart = e.target.value;
                    const startIndex = HOURS.indexOf(newStart);
                    const endIndex = HOURS.indexOf(row.stopTime);
                    return {
                      ...row,
                      startTime: newStart,
                      stopTime:
                        row.stopTime && endIndex <= startIndex
                          ? ""
                          : row.stopTime,
                    };
                  }),
                )
              }
            >
              <option value="">Start Time</option>
              {HOURS.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>

            {/* End time */}
            <select
              className="border p-2"
              value={t.stopTime}
              disabled={!t.startTime}
              onChange={(e) =>
                setTimings((prev) =>
                  prev.map((row, idx) =>
                    idx === i ? { ...row, stopTime: e.target.value } : row,
                  ),
                )
              }
            >
              <option value="">End Time</option>
              {getValidEndTimes(t.startTime).map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>

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
              { clinicId: "", day: "", startTime: "", stopTime: "" },
            ])
          }
          className="text-blue-600 text-sm underline"
        >
          + Add Timing
        </button>
      </div>

      <input
        className="border p-2 w-full"
        placeholder="Phone"
        value={contact.phone}
        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
      />

      <input
        className="border p-2 w-full"
        placeholder="Email"
        type="email"
        value={contact.email}
        onChange={(e) => setContact({ ...contact, email: e.target.value })}
      />

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
