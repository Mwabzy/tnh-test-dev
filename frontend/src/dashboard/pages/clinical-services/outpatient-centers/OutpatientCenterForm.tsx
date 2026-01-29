import { useEffect, useState } from "react";
import { ContactInfo, outpatientCenter, Timings, Image } from "@/types";

export type Clinic = {
  id: number;
  name: string;
};

interface Props {
  initialData: outpatientCenter | null;
  onSave: (center: outpatientCenter | FormData) => void;
  onCancel: () => void;
  clinics: Clinic[];
}

type NewImage = {
  file: File;
  alt: string;
};

const EMPTY_CONTACT: ContactInfo = {
  phone: "",
  email: "",
};

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

  /* Images */
  const [images, setImages] = useState<Image[]>([]);
  const [newImages, setNewImages] = useState<NewImage[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);

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

    if (Array.isArray(initialData.timings) && initialData.timings.length > 0) {
      setTimings(
        initialData.timings.map((t: any) => ({
          clinicId: t.clinic ? String(t.clinic) : "",
          day: t.day || "",
          startTime: t.start_time || t.startTime || "",
          stopTime: t.stop_time || t.stopTime || "",
        })),
      );
    } else {
      // auto-create one row for editing
      setTimings([{ clinicId: "", day: "", startTime: "", stopTime: "" }]);
    }

    let parsedContact: ContactInfo = EMPTY_CONTACT;

    if (initialData.contact) {
      if (typeof initialData.contact === "string") {
        try {
          parsedContact = JSON.parse(initialData.contact);
        } catch {
          parsedContact = EMPTY_CONTACT;
        }
      } else {
        parsedContact = {
          phone: initialData.contact.phone ?? "",
          email: initialData.contact.email ?? "",
        };
      }
    }

    setContact({
      phone: parsedContact.phone || "",
      email: parsedContact.email || "",
    });
  }, [initialData]);

  //Logging if clinics & timings were received
  useEffect(() => {
    console.log("clinics:", clinics);
    console.log("timings:", timings);
  }, [clinics, timings]);

  useEffect(() => {
    if (initialData) {
      if (!initialData.timings || initialData.timings.length === 0) {
        setTimings([{ clinicId: "", day: "", startTime: "", stopTime: "" }]);
      }
    }
  }, [initialData]);

  /* Image handlers */
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selected = Array.from(e.target.files).map((file) => ({
      file,
      alt: "",
    }));

    setNewImages((prev) => [...prev, ...selected]);
    e.target.value = "";
  };

  const updateExistingAlt = (index: number, value: string) => {
    setImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, alt: value } : img)),
    );
  };

  const removeExistingImage = (index: number) => {
    setImages((prevImages) => {
      const img = prevImages[index];

      if (img && typeof img.id === "number") {
        setImagesToDelete((prev) => [...prev, img.id!]);
      }

      return prevImages.filter((_, i) => i !== index);
    });
  };

  /* Submit */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedTimings = timings.map((t) => ({
      ...t,
      clinicId: t.clinicId ? Number(t.clinicId) : null,
    }));

    const formData = new FormData();

    formData.append("name", name);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("timings", JSON.stringify(cleanedTimings));

    formData.append("contact", JSON.stringify(contact));

    newImages.forEach((img) => {
      formData.append("images_files", img.file);
      formData.append("images_files_alt", img.alt || "");
    });

    imagesToDelete.forEach((id) => {
      formData.append("images_to_delete", String(id));
    });

    onSave(formData);
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

      {/* Images */}
      <div>
        <label className="font-semibold">Center Images</label>

        {/* Existing images */}
        {images.map((img, i) => (
          <div key={`existing-${i}`} className="flex gap-2 items-center mb-2">
            {img.url && (
              <img
                src={img.url}
                alt={img.alt || ""}
                className="w-20 h-20 object-cover border rounded"
              />
            )}
            <input
              type="text"
              placeholder="Alt text"
              className="border p-2 flex-1"
              value={img.alt}
              onChange={(e) => updateExistingAlt(i, e.target.value)}
            />
            <button
              type="button"
              className="text-red-500 text-sm"
              onClick={() => removeExistingImage(i)}
            >
              ✕ Remove
            </button>
          </div>
        ))}

        {/* New images */}
        {newImages.map((img, i) => (
          <div key={`new-${i}`} className="flex gap-2 items-center mb-2">
            <img
              src={URL.createObjectURL(img.file)}
              alt={img.alt || ""}
              className="w-20 h-20 object-cover border rounded"
            />
            <input
              type="text"
              placeholder="Alt text"
              className="border p-2 flex-1"
              value={img.alt}
              onChange={(e) =>
                setNewImages((prev) =>
                  prev.map((ni, idx) =>
                    idx === i ? { ...ni, alt: e.target.value } : ni,
                  ),
                )
              }
            />
            <button
              type="button"
              className="text-red-500 text-sm"
              onClick={() =>
                setNewImages((prev) => prev.filter((_, idx) => idx !== i))
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
          id="outpatient-image-upload"
          onChange={handleImageSelect}
        />

        <button
          type="button"
          onClick={() =>
            document.getElementById("outpatient-image-upload")?.click()
          }
          className="text-blue-600 text-sm underline mt-2"
        >
          + Add Image
        </button>
      </div>

      <div>
        <label className="font-semibold">Clinic Timings</label>

        {timings.map((t, i) => {
          const selectedClinic = clinics.find(
            (c) => c.id === Number(t.clinicId),
          );

          return (
            <div
              key={i}
              className="grid grid-cols-4 gap-2 items-center border p-2 mb-2 rounded"
            >
              {/* Clinic search */}
              <div className="relative">
                <input
                  className="border p-2 w-full"
                  placeholder="Search clinic..."
                  value={
                    selectedClinic ? selectedClinic.name : clinicSearch[i] || ""
                  }
                  readOnly={!!selectedClinic}
                  onChange={(e) =>
                    setClinicSearch((prev) => ({
                      ...prev,
                      [i]: e.target.value,
                    }))
                  }
                />

                {/* Show dropdown only while typing */}
                {!selectedClinic && clinicSearch[i]?.trim() && (
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
          );
        })}

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
