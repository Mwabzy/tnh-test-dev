import { useEffect, useState } from "react";
import { ContactInfo, outpatientCenter, Timings, Image } from "@/types";
import RichTextEditor from "@/components/RichTextEditor"; // Adjust the import path as needed

export type Clinic = {
  id: number;
  title: string;
};

interface Props {
  initialData: outpatientCenter | null;
  onSave: (center: outpatientCenter | FormData) => Promise<any>;
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
  const [path, setPath] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [timings, setTimings] = useState<Timings[]>([]);
  const [clinicSearch, setClinicSearch] = useState<Record<number, string>>({});
  const [contact, setContact] = useState<ContactInfo>({
    phone: "",
    email: "",
  });

  /* Images */
  const [images, setImages] = useState<Image[]>(
    (initialData?.image || []).map((img) => ({
      ...img,
      alt: img.alt || "",
    })),
  );
  const [newImages, setNewImages] = useState<NewImage[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);

  /* Translation state for description */
  const [descriptionTranslations, setDescriptionTranslations] = useState({
    fr: initialData?.description_fr || "",
    es: initialData?.description_es || "",
    zh: initialData?.description_zh || "",
    ru: initialData?.description_ru || "",
  });

  // Track which translation panel is open
  const [openTranslation, setOpenTranslation] = useState<"description" | null>(
    null,
  );

  // Add a new state for plain text description (useful for summaries, etc.)
  const [_descriptionPlainText, setDescriptionPlainText] = useState("");

  const toggleTranslation = () => {
    setOpenTranslation((prev) =>
      prev === "description" ? null : "description",
    );
  };

  const DAYS = [
    "monday - friday",
    "monday - saturday",
    "monday - sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
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
      setPath("");
      setLocation("");
      setDescription("");
      setDescriptionPlainText("");
      setTimings([]);
      setContact({ phone: "", email: "" });
      setDescriptionTranslations({
        fr: "",
        es: "",
        zh: "",
        ru: "",
      });
      setImages([]);
      return;
    }

    setName(initialData.name || "");
    setPath(initialData.path || "");
    setLocation(initialData.location || "");
    setDescription(initialData.description || "");
    setDescriptionPlainText(
      initialData.description
        ? initialData.description.replace(/<[^>]*>/g, "")
        : "",
    );

    // Set translations
    setDescriptionTranslations({
      fr: initialData.description_fr || "",
      es: initialData.description_es || "",
      zh: initialData.description_zh || "",
      ru: initialData.description_ru || "",
    });

    // Set images
    setImages(
      (initialData.image || []).map((img) => ({
        ...img,
        alt: img.alt || "",
      })),
    );

    if (Array.isArray(initialData.timings) && initialData.timings.length > 0) {
      setTimings(
        initialData.timings.map((t: any) => ({
          clinicId: t.clinic?.id
            ? String(t.clinic.id)
            : t.clinic
              ? String(t.clinic)
              : t.clinicId
                ? String(t.clinicId)
                : "",
          day: t.day || "",
          month: t.month || "",
          startTime: t.start_time || t.startTime || "",
          stopTime: t.stop_time || t.stopTime || "",
        })),
      );
    } else {
      // auto-create one row for editing
      setTimings([
        { clinicId: "", day: "", month: "", startTime: "", stopTime: "" },
      ]);
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
        setTimings([
          { clinicId: "", day: "", month: "", startTime: "", stopTime: "" },
        ]);
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true); // start loader

    const cleanedTimings = timings.map((t) => ({
      clinic: t.clinicId ? Number(t.clinicId) : null,
      day: t.day,
      month: t.month || "",
      startTime: t.startTime,
      stopTime: t.stopTime,
    }));
    const selectedServices = Array.from(
      new Set(
        cleanedTimings
          .map((t) => t.clinic)
          .filter((clinic): clinic is number =>
            Number.isFinite(Number(clinic)),
          ),
      ),
    );

    const formData = new FormData();
    formData.append("name", name);
    formData.append("path", path.trim());
    formData.append("location", location);
    formData.append("description", description);

    formData.append("description_fr", descriptionTranslations.fr);
    formData.append("description_es", descriptionTranslations.es);
    formData.append("description_zh", descriptionTranslations.zh);
    formData.append("description_ru", descriptionTranslations.ru);

    formData.append("timings", JSON.stringify(cleanedTimings));
    formData.append("services_offered", JSON.stringify(selectedServices));
    formData.append("contact", JSON.stringify(contact));

    images.forEach((img, index) => {
      formData.append(`images[${index}][id]`, String(img.id));
      formData.append(`images[${index}][alt]`, img.alt || "");
    });

    newImages.forEach((img) => {
      if (img.file) {
        formData.append("images_files", img.file);
        formData.append("images_files_alt", img.alt || "");
      }
    });

    imagesToDelete.forEach((id) => {
      formData.append("images_to_delete", String(id));
    });

    try {
      await onSave(formData);
    } finally {
      setSubmitting(false);
    }
  };

  // Handler for description changes from RichTextEditor
  const handleDescriptionChange = (html: string, plainText: string) => {
    setDescription(html);
    setDescriptionPlainText(plainText);
  };

  return (
    <form
      className="border p-6 rounded space-y-4 bg-white"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold">
        {initialData ? "Edit Outpatient Center" : "Add Outpatient Center"}
      </h2>

      <div>
        <label className="font-medium block mb-1">Center Name</label>
        <input
          className="border p-2 w-full"
          placeholder="Enter center name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <input
        className="border p-2 w-full"
        placeholder="Path (URL slug)"
        value={path}
        onChange={(e) => setPath(e.target.value)}
      />

      <div>
        <label className="font-medium block mb-1">Center Location</label>
        <input
          className="border p-2 w-full"
          placeholder="Enter center location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="font-medium block mb-1">Description</label>
        <RichTextEditor
          key={initialData?.id || "new-center"}
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter center description..."
          minHeight="200px"
        />

        <button
          type="button"
          className="text-blue-600 text-sm underline mt-1 block"
          onClick={toggleTranslation}
        >
          {openTranslation === "description"
            ? "Hide Translations"
            : "Show Description Translations"}
        </button>

        {openTranslation === "description" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            {(["fr", "es", "zh", "ru"] as const).map((lang) => (
              <div key={lang} className="border rounded overflow-hidden">
                <div className="p-2 bg-gray-50 text-sm font-medium">
                  Description ({lang.toUpperCase()})
                </div>
                <RichTextEditor
                  value={descriptionTranslations[lang]}
                  onChange={(html, _plainText) => {
                    setDescriptionTranslations((prev) => ({
                      ...prev,
                      [lang]: html,
                    }));
                  }}
                  placeholder={`Enter description in ${lang.toUpperCase()}...`}
                  minHeight="150px"
                />
              </div>
            ))}
          </div>
        )}
      </div>

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
              placeholder="Image alt text"
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
              placeholder="Image alt text"
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
              className="grid grid-cols-5 gap-2 items-center border p-2 mb-2 rounded"
            >
              {/* Clinic search */}
              <div className="relative">
                <input
                  className="border p-2 w-full"
                  placeholder="Search clinic/service..."
                  value={
                    selectedClinic
                      ? selectedClinic.title
                      : clinicSearch[i] || ""
                  }
                  //    readOnly={!!selectedClinic}
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
                        c.title
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
                          {c.title}
                        </button>
                      ))}

                    {/* Show no results if nothing matches */}
                    {clinics.filter((c) =>
                      c.title
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

              <select
                className="border p-2"
                value={t.month || ""}
                onChange={(e) =>
                  setTimings((prev) =>
                    prev.map((row, idx) =>
                      idx === i ? { ...row, month: e.target.value } : row,
                    ),
                  )
                }
              >
                <option value="">All Months</option>
                {MONTHS.map((m) => (
                  <option key={m} value={m}>
                    {m}
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
                className="text-red-500 text-sm col-span-5 text-right"
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
              { clinicId: "", day: "", month: "", startTime: "", stopTime: "" },
            ])
          }
          className="text-blue-600 text-sm underline"
        >
          + Add Timing
        </button>
      </div>

      <input
        className="border p-2 w-full"
        placeholder="Enter phone number"
        value={contact.phone}
        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
      />

      <input
        className="border p-2 w-full"
        placeholder="Enter email address"
        type="email"
        value={contact.email}
        onChange={(e) => setContact({ ...contact, email: e.target.value })}
      />

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded"
          disabled={submitting}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={submitting}
          className={`px-4 py-2 rounded text-white flex items-center gap-2 ${
            submitting ? "bg-gray-400 cursor-not-allowed" : "bg-green-600"
          }`}
        >
          {submitting && (
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
          {submitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default OutpatientCenterForm;
