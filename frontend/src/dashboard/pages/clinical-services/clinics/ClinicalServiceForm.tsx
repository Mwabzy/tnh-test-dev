import { useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";
import {
  ClinicalService,
  ContactInfo,
  Doctor,
  Feature,
  Image,
  Testimonial,
} from "@/types";
import { updateImageAlt } from "@/api/api";

interface Props {
  initialData?: ClinicalService | null;
  onSave: (service: ClinicalService | FormData) => Promise<any>;
  onCancel: () => void;
  availableDoctors: Doctor[];
}

const requiredMark = <span className="text-red-600">*</span>;

const locationOptions = [
  { value: "Main Hospital", label: "Main Hospital" },
  { value: "Anderson Centre", label: "Anderson Centre" },
  { value: "Capital Outpatient Centre", label: "Capital Outpatient Centre" },
  { value: "Galleria Outpatient Centre", label: "Galleria Outpatient Centre" },
  { value: "Kiambu Outpatient Centre", label: "Kiambu Outpatient Centre" },
  { value: "Rosslyn Outpatient Centre", label: "Rosslyn Outpatient Centre" },
  {
    value: "Southfield Outpatient Centre",
    label: "Southfield Outpatient Centre",
  },
  { value: "Warwick Outpatient Centre", label: "Warwick Outpatient Centre" },
];

const ClinicalServiceForm: React.FC<Props> = ({
  initialData,
  onSave,
  onCancel,
  availableDoctors,
}) => {
  type NewImage = {
    file: File;
    alt: string;
  };

  const [title, setTitle] = useState(initialData?.title || "");
  const [tagline, setTagline] = useState(initialData?.tagline || "");
  const [overview, setOverview] = useState(initialData?.overview || "");
  const [detailedDescription, setDetailedDescription] = useState(
    initialData?.detailedDescription || ""
  );
  const [features, setFeatures] = useState<Feature[]>(
    initialData?.features || []
  );

  const [selectedDoctors, setSelectedDoctors] = useState<Doctor[]>(
    initialData?.doctors || []
  );

  const [doctorInput, setDoctorInput] = useState("");

  const [testimonials, setTestimonials] = useState<Testimonial[]>(
    initialData?.testimonials || []
  );
  const [contact, setContact] = useState<ContactInfo>({
    phone: initialData?.contact?.phone || "",
    email: initialData?.contact?.email || "",
  });
  const [isBookable, setIsBookable] = useState(
    initialData?.isBookable ?? false
  );
  const [hasReadMore, setHasReadMore] = useState(
    initialData?.hasReadMore ?? false
  );
  const [images, setImages] = useState<Image[]>(
    (initialData?.images || []).map((img) => ({
      ...img,
      alt: img.alt || "",
    }))
  );

  const [locations, setLocations] = useState<string[]>(
    initialData?.locations || []
  );

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; tagline?: string }>(
    {}
  );
  // const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);
  const [newImages, setNewImages] = useState<NewImage[]>([]);

  //  Filter doctors when typing
  const filteredDoctors = availableDoctors.filter((doc) => {
    if (!doctorInput) return false;
    const q = doctorInput.toLowerCase();
    return (
      doc.name.toLowerCase().includes(q) || doc.role.toLowerCase().includes(q)
    );
  });

  const validate = () => {
    const newErrors: any = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!tagline.trim()) newErrors.tagline = "Tagline is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFeatureChange = (
    index: number,
    key: keyof Feature,
    value: string
  ) => {
    setFeatures(
      features.map((f, i) => (i === index ? { ...f, [key]: value } : f))
    );
  };

  const addFeature = () =>
    setFeatures([...features, { title: "", description: "" }]);
  const removeFeature = (index: number) =>
    setFeatures(features.filter((_, i) => i !== index));

  // const addDoctor = (doctor: Doctor) => {
  //   if (selectedDoctors.some((d) => d.id === doctor.id)) return;
  //   setSelectedDoctors((prev) => [...prev, doctor]);
  // };

  const removeDoctor = (id: number) => {
    setSelectedDoctors((prev) => prev.filter((d) => d.id !== id));
  };

  const handleTestimonialChange = (
    index: number,
    key: keyof Testimonial,
    value: string
  ) => {
    setTestimonials(
      testimonials.map((t, i) => (i === index ? { ...t, [key]: value } : t))
    );
  };
  const addTestimonial = () =>
    setTestimonials([
      ...testimonials,
      { name: "", title: "", image: "", quote: "" },
    ]);
  const removeTestimonial = (index: number) =>
    setTestimonials(testimonials.filter((_, i) => i !== index));

  const handleImageChange = (
    index: number,
    key: keyof Image,
    value: string
  ) => {
    setImages(
      images.map((img, i) => (i === index ? { ...img, [key]: value } : img))
    );
  };

  const removeImage = (index: number) => {
    const img = images[index];

    // capture id in a local variable and ensure it's a number
    const imgId = img.id;
    if (typeof imgId === "number") {
      setImagesToDelete((prev: number[]) => [...prev, imgId]);
    }

    setImages(images.filter((_, i) => i !== index));
  };

  // const handleLocationChange = (index: number, value: string) => {
  //   setLocations(locations.map((loc, i) => (i === index ? value : loc)));
  // };
  // const addLocation = () => setLocations([...locations, ""]);
  // const removeLocation = (index: number) =>
  //   setLocations(locations.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix errors in the form.");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("tagline", tagline);
    formData.append("overview", overview);
    formData.append("detailedDescription", detailedDescription);
    formData.append("isBookable", String(isBookable));
    formData.append("hasReadMore", String(hasReadMore));
    formData.append("features", JSON.stringify(features));
    formData.append("doctors", JSON.stringify(selectedDoctors));
    formData.append("testimonials", JSON.stringify(testimonials));
    formData.append("contact", JSON.stringify(contact));
    formData.append("locations", JSON.stringify(locations));

    // Append new image files
    newImages.forEach((img) => {
      formData.append("images_files", img.file);
      formData.append("images_files_alt", img.alt);
    });

    // Append IDs of images to delete
    imagesToDelete.forEach((id) => {
      formData.append("images_to_delete", String(id));
    });

    setLoading(true);
    try {
      // Save the service (backend handles new images & deletions)
      await onSave(formData);

      // Update alt text for existing images
      for (const img of images) {
        if (img.id && img.alt !== undefined) {
          try {
            await updateImageAlt(img.id, img.alt);
          } catch (err) {
            console.error("Failed to update image alt:", img.id);
          }
        }
      }

      // Reset state
      setImagesToDelete([]);
      setNewImages([]);
    } catch (error) {
      toast.error("Error saving the clinical service.");
    } finally {
      setLoading(false);
    }
  };

  const disabledClass = loading ? "opacity-50 pointer-events-none" : "";

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${disabledClass}`}>
      {/* Title */}
      <div>
        <label className="font-semibold">
          Title {requiredMark}
          <input
            type="text"
            className="border p-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
      </div>

      {/* Tagline */}
      <div>
        <label className="font-semibold">
          Tagline {requiredMark}
          <input
            type="text"
            className="border p-2 w-full"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
          />
        </label>
        {errors.tagline && (
          <p className="text-red-600 text-sm">{errors.tagline}</p>
        )}
      </div>

      {/* Overview */}
      <div>
        <label className="font-semibold">Overview</label>
        <textarea
          className="border p-2 w-full"
          value={overview}
          onChange={(e) => setOverview(e.target.value)}
        />
      </div>

      {/* Detailed Description */}
      <div>
        <label className="font-semibold">Detailed Description</label>
        <textarea
          className="border p-2 w-full"
          value={detailedDescription}
          onChange={(e) => setDetailedDescription(e.target.value)}
        />
      </div>

      {/* Features */}
      <div>
        <label className="font-semibold">Features</label>

        {features.map((f, i) => (
          <div key={i} className="space-y-1 border p-2 mb-2 rounded">
            <input
              type="text"
              placeholder="Feature title"
              className="border p-1 w-full"
              value={f.title}
              onChange={(e) => handleFeatureChange(i, "title", e.target.value)}
            />
            <textarea
              placeholder="Description"
              className="border p-1 w-full"
              value={f.description}
              onChange={(e) =>
                handleFeatureChange(i, "description", e.target.value)
              }
            />
            <button
              type="button"
              onClick={() => removeFeature(i)}
              className="text-red-500 text-sm"
            >
              ✕ Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addFeature}
          className="text-blue-600 text-sm underline"
        >
          + Add Feature
        </button>
      </div>

      {/* Doctors Selection*/}
      <div>
        <label className="font-semibold">Doctors</label>

        <Select
          isMulti
          options={filteredDoctors.map((doc) => ({
            value: doc.id,
            label: `${doc.name} — ${doc.role}`,
            doctor: doc,
          }))}
          value={selectedDoctors.map((doc) => ({
            value: doc.id,
            label: `${doc.name} — ${doc.role}`,
            doctor: doc,
          }))}
          onInputChange={(value) => setDoctorInput(value)}
          onChange={(vals) => {
            if (!vals) setSelectedDoctors([]);
            else setSelectedDoctors(vals.map((v) => v.doctor));
          }}
          noOptionsMessage={() =>
            doctorInput.length < 1
              ? "Start typing to search..."
              : "No results found"
          }
          filterOption={null}
          placeholder="Search doctors..."
          className="mt-2"
        />

        {/* Selected doctor tags */}
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedDoctors.map((doc) => (
            <div
              key={doc.id}
              className="border rounded-full px-3 py-1 bg-blue-50 flex items-center gap-2"
            >
              <span>{doc.name}</span>
              <button
                type="button"
                className="text-red-500"
                onClick={() => removeDoctor(doc.id!)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div>
        <label className="font-semibold">Testimonials</label>
        {testimonials.map((t, i) => (
          <div key={i} className="border p-2 mb-2 rounded space-y-1">
            <input
              type="text"
              placeholder="Name"
              className="border p-1 w-full"
              value={t.name}
              onChange={(e) =>
                handleTestimonialChange(i, "name", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Title"
              className="border p-1 w-full"
              value={t.title}
              onChange={(e) =>
                handleTestimonialChange(i, "title", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Image URL"
              className="border p-1 w-full"
              value={t.image}
              onChange={(e) =>
                handleTestimonialChange(i, "image", e.target.value)
              }
            />
            <textarea
              placeholder="Quote"
              className="border p-1 w-full"
              value={t.quote}
              onChange={(e) =>
                handleTestimonialChange(i, "quote", e.target.value)
              }
            />
            <button
              type="button"
              onClick={() => removeTestimonial(i)}
              className="text-red-500 text-sm"
            >
              ✕ Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addTestimonial}
          className="text-blue-600 text-sm underline"
        >
          + Add Testimonial
        </button>
      </div>

      {/* Contact */}
      <div>
        <label className="font-semibold">Contact Info</label>
        <input
          type="text"
          placeholder="Phone"
          className="border p-2 w-full"
          value={contact.phone}
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mt-2"
          value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
        />
      </div>

      {/* Images */}
      <div>
        <label className="font-semibold">Images</label>

        {/* Existing images (already saved) */}
        {images.map((img, i) => (
          <div key={`existing-${i}`} className="flex gap-2 mb-2 items-center">
            {img.url && (
              <img
                src={img.url}
                alt={img.alt || ""}
                className="w-20 h-20 object-cover border"
              />
            )}

            <input
              type="text"
              placeholder="Alt text"
              className="border p-2 grow"
              value={img.alt}
              onChange={(e) => handleImageChange(i, "alt", e.target.value)}
            />

            <button
              type="button"
              onClick={() => removeImage(i)}
              className="text-red-500"
            >
              ✕ Remove
            </button>
          </div>
        ))}

        {/* New images (not yet saved) */}
        {newImages.map((img, idx) => (
          <div key={`new-${idx}`} className="flex gap-2 mb-2 items-center">
            <img
              src={URL.createObjectURL(img.file)}
              alt=""
              className="w-20 h-20 object-cover border"
            />

            <input
              type="text"
              placeholder="Alt text"
              className="border p-2 grow"
              value={img.alt}
              onChange={(e) =>
                setNewImages((prev) =>
                  prev.map((ni, i) =>
                    i === idx ? { ...ni, alt: e.target.value } : ni
                  )
                )
              }
            />

            <button
              type="button"
              className="text-red-500"
              onClick={() =>
                setNewImages((prev) => prev.filter((_, i) => i !== idx))
              }
            >
              ✕ Remove
            </button>
          </div>
        ))}

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          multiple
          hidden
          id="image-upload"
          onChange={(e) => {
            const files = e.target.files;
            if (!files) return;

            const mapped = Array.from(files).map((file) => ({
              file,
              alt: "",
            }));

            setNewImages((prev) => [...prev, ...mapped]);
            e.target.value = "";
          }}
        />

        {/* Add Image button */}
        <button
          type="button"
          onClick={() => document.getElementById("image-upload")?.click()}
          className="text-blue-600 text-sm underline mt-2"
        >
          + Add Image
        </button>
      </div>

      {/* Locations */}
      <div>
        <label className="font-semibold">Locations</label>

        <Select
          isMulti
          options={locationOptions}
          value={locations.map((loc) => ({
            value: loc,
            label: loc,
          }))}
          onChange={(vals) => {
            setLocations(vals ? vals.map((v) => v.value) : []);
          }}
          placeholder="Select locations..."
          className="mt-2"
        />
      </div>
      {/* Toggles */}
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isBookable}
            onChange={(e) => setIsBookable(e.target.checked)}
          />
          Is Bookable
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={hasReadMore}
            onChange={(e) => setHasReadMore(e.target.checked)}
          />
          Has Read More
        </label>
      </div>

      {/* Buttons */}
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
          disabled={loading}
          className={`px-4 py-2 rounded text-white flex items-center gap-2 ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600"
          }`}
        >
          {loading && (
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
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default ClinicalServiceForm;
