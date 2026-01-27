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


  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setLocation(initialData.location || "");
      setDescription(initialData.description || "");
      setTimings(Array.isArray(initialData.timings) ? initialData.timings : []);
      setContact({
        phone: initialData.contact?.phone || "",
        email: initialData.contact?.email || "",
      });
      setImages(
        (initialData.image || []).map((img) => ({
          ...img,
          alt: img.alt || "",
        }))
      );
    } else {
      setName("");
      setLocation("");
      setDescription("");
      setTimings([]);
      setContact({ phone: "", email: "" });
      setImages([]);
      setNewImages([]);
      setImagesToDelete([]);
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
      prev.map((img, i) => (i === index ? { ...img, alt: value } : img))
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

    const formData = new FormData();

    formData.append("name", name);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("timings", JSON.stringify(timings));
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
                    idx === i ? { ...ni, alt: e.target.value } : ni
                  )
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

      {/* Timings */}
      <div>
        <label className="font-semibold">Clinic Timings</label>

        {timings.map((t, i) => (
          <div
            key={i}
            className="grid grid-cols-4 gap-2 items-center border p-2 mb-2 rounded"
          >
            <select
              className="border p-2"
              value={t.clinicId ?? ""}
              onChange={(e) =>
                setTimings((prev) =>
                  prev.map((row, idx) =>
                    idx === i ? { ...row, clinicId: e.target.value } : row
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

            <input
              type="time"
              className="border p-2"
              value={t.stopTime}
              onChange={(e) =>
                setTimings((prev) =>
                  prev.map((row, idx) =>
                    idx === i ? { ...row, stopTime: e.target.value } : row
                  )
                )
              }
            />

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

      {/* Contact */}
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
