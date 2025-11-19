import { useState } from "react";
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
  onSave: (service: ClinicalService) => void;
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

  // --- Feature handlers ---
  const handleFeatureChange = (
    index: number,
    key: keyof Feature,
    value: string
  ) => {
    const newFeatures = [...features];
    newFeatures[index] = { ...newFeatures[index], [key]: value };
    setFeatures(newFeatures);
  };

  const addFeature = () =>
    setFeatures([...features, { title: "", description: "" }]);
  const removeFeature = (index: number) =>
    setFeatures(features.filter((_, i) => i !== index));

  // --- Doctor handlers ---
  const handleDoctorChange = (
    index: number,
    key: keyof Doctor,
    value: string
  ) => {
    const updated = [...doctors];
    updated[index] = { ...updated[index], [key]: value };
    setDoctors(updated);
  };

  const addDoctor = () =>
    setDoctors([...doctors, { name: "", title: "", image: "", bio: "" }]);
  const removeDoctor = (index: number) =>
    setDoctors(doctors.filter((_, i) => i !== index));

  // --- Testimonial handlers ---
  const handleTestimonialChange = (
    index: number,
    key: keyof Testimonial,
    value: string
  ) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [key]: value };
    setTestimonials(updated);
  };

  const addTestimonial = () =>
    setTestimonials([
      ...testimonials,
      { name: "", title: "", image: "", quote: "" },
    ]);
  const removeTestimonial = (index: number) =>
    setTestimonials(testimonials.filter((_, i) => i !== index));

  // --- Image handlers ---
  const handleImageChange = (
    index: number,
    key: keyof Image,
    value: string
  ) => {
    const updated = [...images];
    updated[index] = { ...updated[index], [key]: value };
    setImages(updated);
  };

  const addImage = () => setImages([...images, { url: "", alt: "" }]);
  const removeImage = (index: number) =>
    setImages(images.filter((_, i) => i !== index));

  // --- Location handlers ---
  const handleLocationChange = (index: number, value: string) => {
    const updated = [...locations];
    updated[index] = value;
    setLocations(updated);
  };
  const addLocation = () => setLocations([...locations, ""]);
  const removeLocation = (index: number) =>
    setLocations(locations.filter((_, i) => i !== index));

  // --- Submit handler ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !tagline.trim()) {
      alert("Please fill required fields");
      return;
    }

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

    onSave(newService);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="font-semibold">
          Title {requiredMark}
          <input
            type="text"
            className="border p-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label className="font-semibold">
          Tagline {requiredMark}
          <input
            type="text"
            className="border p-2 w-full"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label className="font-semibold">Overview</label>
        <textarea
          className="border p-2 w-full"
          value={overview}
          onChange={(e) => setOverview(e.target.value)}
        />
      </div>

      <div>
        <label className="font-semibold">Detailed Description</label>
        <textarea
          className="border p-2 w-full"
          value={detailedDescription}
          onChange={(e) => setDetailedDescription(e.target.value)}
        />
      </div>

      {/* --- Features --- */}
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
              placeholder="Description (optional)"
              className="border p-1 w-full"
              value={f.description || ""}
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

      {/* --- Doctors --- */}
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

      {/* --- Testimonials --- */}
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
              value={t.image || ""}
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

      {/* --- Contact Info --- */}
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
          value={contact.email || ""}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
        />
      </div>

      {/* --- Images --- */}
      <div>
        <label className="font-semibold">Images</label>
        {images.map((img, i) => (
          <div key={i} className="flex gap-2 mb-1">
            <input
              type="text"
              placeholder="Image URL"
              className="border p-2 flex-grow"
              value={img.url}
              onChange={(e) => handleImageChange(i, "url", e.target.value)}
            />
            <input
              type="text"
              placeholder="Alt text"
              className="border p-2 flex-grow"
              value={img.alt || ""}
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

      {/* --- Locations --- */}
      <div>
        <label className="font-semibold">Locations</label>
        {locations.map((loc, i) => (
          <div key={i} className="flex gap-2 mb-1">
            <input
              type="text"
              className="border p-2 flex-grow"
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

      {/* --- Toggles --- */}
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
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;
