import { useState } from "react";
import toast from "react-hot-toast";

import {
  ClinicalService,
  ContactInfo,
  Doctor,
  Feature,
  Image,
  Testimonial,
} from "@/types";

interface Props {
  initialData?: ClinicalService | null;
  onSave: (service: ClinicalService) => Promise<any>; // async
  onCancel: () => void;
}

const requiredMark = <span className="text-red-600">*</span>;

const ServiceForm: React.FC<Props> = ({ initialData, onSave, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [tagline, setTagline] = useState(initialData?.tagline || "");
  const [overview, setOverview] = useState(initialData?.overview || "");
  const [detailedDescription, setDetailedDescription] = useState(
    initialData?.detailedDescription || ""
  );
  const [features, setFeatures] = useState<Feature[]>(
    initialData?.features || []
  );
  const [doctors, setDoctors] = useState<Doctor[]>(initialData?.doctors || []);
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
  const [images, setImages] = useState<Image[]>(initialData?.images || []);
  const [locations, setLocations] = useState<string[]>(
    initialData?.locations || []
  );

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; tagline?: string }>(
    {}
  );

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

  const handleDoctorChange = (
    index: number,
    key: keyof Doctor,
    value: string
  ) => {
    setDoctors(
      doctors.map((d, i) => (i === index ? { ...d, [key]: value } : d))
    );
  };
  const addDoctor = () =>
    setDoctors([...doctors, { name: "", title: "", image: "", bio: "" }]);
  const removeDoctor = (index: number) =>
    setDoctors(doctors.filter((_, i) => i !== index));

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
  const addImage = () => setImages([...images, { url: "", alt: "" }]);
  const removeImage = (index: number) =>
    setImages(images.filter((_, i) => i !== index));

  const handleLocationChange = (index: number, value: string) => {
    setLocations(locations.map((loc, i) => (i === index ? value : loc)));
  };
  const addLocation = () => setLocations([...locations, ""]);
  const removeLocation = (index: number) =>
    setLocations(locations.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix errors in the form.");
      return;
    }

    setLoading(true);

    const newService: ClinicalService = {
      id: initialData?.id || Date.now(),
      title,
      tagline,
      overview,
      detailedDescription,
      features,
      doctors,
      testimonials,
      contact,
      isBookable,
      hasReadMore,
      timingsOnOverview: initialData?.timingsOnOverview || "",
      clinics: initialData?.clinics || [],
      images,
      locations,
    };

    try {
      await onSave(newService);
      toast.success("Service saved successfully!");
    } catch (err) {
      toast.error("Failed to save service.");
    } finally {
      setLoading(false);
    }
  };

  const disabledClass = loading ? "opacity-50 pointer-events-none" : "";

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${disabledClass}`}>
      {/*   Title */}
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

      {/*Tagline*/}
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

      {/* Overview*/}
      <div>
        <label className="font-semibold">Overview</label>
        <textarea
          className="border p-2 w-full"
          value={overview}
          onChange={(e) => setOverview(e.target.value)}
        />
      </div>

      {/*Detailed Description */}
      <div>
        <label className="font-semibold">Detailed Description</label>
        <textarea
          className="border p-2 w-full"
          value={detailedDescription}
          onChange={(e) => setDetailedDescription(e.target.value)}
        />
      </div>

      {/*Features*/}
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

      {/* Doctors */}
      <div>
        <label className="font-semibold">Doctors</label>
        {doctors.map((d, i) => (
          <div key={i} className="border p-2 mb-2 rounded space-y-1">
            <input
              type="text"
              placeholder="Name"
              className="border p-1 w-full"
              value={d.name}
              onChange={(e) => handleDoctorChange(i, "name", e.target.value)}
            />
            <input
              type="text"
              placeholder="Title"
              className="border p-1 w-full"
              value={d.title}
              onChange={(e) => handleDoctorChange(i, "title", e.target.value)}
            />
            <input
              type="text"
              placeholder="Image URL"
              className="border p-1 w-full"
              value={d.image}
              onChange={(e) => handleDoctorChange(i, "image", e.target.value)}
            />
            <textarea
              placeholder="Bio"
              className="border p-1 w-full"
              value={d.bio}
              onChange={(e) => handleDoctorChange(i, "bio", e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeDoctor(i)}
              className="text-red-500 text-sm"
            >
              ✕ Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addDoctor}
          className="text-blue-600 text-sm underline"
        >
          + Add Doctor
        </button>
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

      {/*Contact Info*/}
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

      {/* Images upload*/}
      <div>
        <label className="font-semibold">Images</label>
        {images.map((img, i) => (
          <div key={i} className="flex gap-2 mb-1">
            <input
              type="text"
              placeholder="Image URL"
              className="border p-2 grow"
              value={img.url}
              onChange={(e) => handleImageChange(i, "url", e.target.value)}
            />
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
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addImage}
          className="text-blue-600 text-sm underline"
        >
          + Add Image
        </button>
      </div>

      {/* ---------- LOCATIONS ---------- */}
      <div>
        <label className="font-semibold">Locations</label>
        {locations.map((loc, i) => (
          <div key={i} className="flex gap-2 mb-1">
            <input
              type="text"
              className="border p-2 grow"
              value={loc}
              onChange={(e) => handleLocationChange(i, e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeLocation(i)}
              className="text-red-500"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addLocation}
          className="text-blue-600 text-sm underline"
        >
          + Add Location
        </button>
      </div>

      {/* Checkboxes */}
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

export default ServiceForm;
