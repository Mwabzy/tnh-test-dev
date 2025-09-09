import { useState } from "react";
import { ClinicalService, ContactInfo, EmailEntry } from "@/types";

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
  const [features, setFeatures] = useState<string[]>(
    initialData?.features || []
  );
  const [doctors, setDoctors] = useState(initialData?.doctors || []);

  const [contact, setContact] = useState<ContactInfo>({
    phone: initialData?.contact?.phone || "",
    emails: initialData?.contact?.emails || [],
  });
  const [relatedServices, setRelatedServices] = useState(
    initialData?.relatedServices || []
  );
  const [imageUrl, setImageUrl] = useState(initialData?.image?.url || "");
  const [imageAlt, setImageAlt] = useState(initialData?.image?.alt || "");

  // --- Features handlers ---
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addFeature = () => setFeatures([...features, ""]);
  const removeFeature = (index: number) =>
    setFeatures(features.filter((_, i) => i !== index));

  // --- Testimonial handlers ---
  // const handleTestimonialChange = (
  //   index: number,
  //   key: keyof (typeof testimonial)[0],
  //   value: string
  // ) => {
  //   const newTestimonial = [...testimonial];
  //   newTestimonial[index][key] = value;
  //   setTestimonial(newTestimonial);
  // };

  const handleDoctorChange = (
    index: number,
    key: keyof (typeof doctors)[0],
    value: string
  ) => {
    const updatedDoctors = [...doctors];
    // @ts-ignore
    updatedDoctors[index][key] = value;
    setDoctors(updatedDoctors);
  };

  const addDoctor = () => {
    setDoctors([...doctors, { name: "", title: "", image: "", bio: "" }]);
  };

  const removeDoctor = (index: number) => {
    setDoctors(doctors.filter((_, i) => i !== index));
  };

  // const addTestimonial = () =>
  //   setTestimonial([
  //     ...testimonial,
  //     { name: "", title: "", image: "", quote: "" },
  //   ]);
  // const removeTestimonial = (index: number) =>
  //   setTestimonial(testimonial.filter((_, i) => i !== index));

  // --- Contact emails handlers ---
  const handleEmailChange = (
    index: number,
    key: keyof EmailEntry,
    value: string
  ) => {
    const updatedEmails = [...(contact.emails || [])];
    updatedEmails[index] = { ...updatedEmails[index], [key]: value };
    setContact({ ...contact, emails: updatedEmails });
  };

  const addEmailField = () => {
    setContact({
      ...contact,
      emails: [...(contact.emails || []), { type: "", address: "" }],
    });
  };

  const removeEmailField = (index: number) => {
    const updatedEmails = [...(contact.emails || [])];
    updatedEmails.splice(index, 1);
    setContact({ ...contact, emails: updatedEmails });
  };

  // --- Related services handlers ---
  const handleRelatedServiceChange = (
    index: number,
    key: keyof (typeof relatedServices)[0],
    value: string | number
  ) => {
    const newRelated = [...relatedServices];
    // @ts-ignore
    newRelated[index][key] = value;
    setRelatedServices(newRelated);
  };

  const addRelatedService = () => {
    setRelatedServices([...relatedServices, { id: 0, title: "", image: "" }]);
  };

  const removeRelatedService = (index: number) => {
    setRelatedServices(relatedServices.filter((_, i) => i !== index));
  };

  // --- Submit ---
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
      features,
      doctors,
      // testimonial: testimonial.filter((t) => t.name || t.quote), // filter empty
      contact,
      relatedServices,
      image: { url: imageUrl, alt: imageAlt },
    };
    onSave(newService);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <label className="font-semibold">Features</label>
        {features.map((feature, i) => (
          <div key={i} className="flex gap-2 mb-1">
            <input
              type="text"
              className="border p-2 flex-grow"
              value={feature}
              onChange={(e) => handleFeatureChange(i, e.target.value)}
              placeholder={`Feature #${i + 1}`}
            />
            <button
              type="button"
              onClick={() => removeFeature(i)}
              className="px-2 text-red-500"
            >
              ✕
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

      <div>
        <label className="font-semibold">Doctors</label>
        {doctors.map((doctor, i) => (
          <div key={i} className="border p-2 mb-2 rounded space-y-1">
            <input
              type="text"
              placeholder="Name"
              className="border p-1 w-full"
              value={doctor.name}
              onChange={(e) => handleDoctorChange(i, "name", e.target.value)}
            />
            <input
              type="text"
              placeholder="Title"
              className="border p-1 w-full"
              value={doctor.title}
              onChange={(e) => handleDoctorChange(i, "title", e.target.value)}
            />
            <input
              type="text"
              placeholder="Image URL"
              className="border p-1 w-full"
              value={doctor.image}
              onChange={(e) => handleDoctorChange(i, "image", e.target.value)}
            />
            <textarea
              placeholder="Bio"
              className="border p-1 w-full"
              value={doctor.bio}
              onChange={(e) => handleDoctorChange(i, "bio", e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeDoctor(i)}
              className="px-2 text-red-500"
            >
              Remove Doctor
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

      {/* <div>
        <label className="font-semibold">Testimonials</label>
        {testimonial.map((t, i) => (
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
              className="px-2 text-red-500"
            >
              Remove Testimonial
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
      </div> */}

      <div>
        <label className="font-semibold">Contact Info</label>
        <input
          type="text"
          placeholder="Phone"
          className="border p-2 w-full"
          value={contact.phone}
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
        />
        {contact.emails?.map((email, index) => (
          <div key={index} className="flex gap-2 my-1">
            <input
              type="text"
              placeholder="Type (Work, Personal)"
              className="border p-2 w-1/2"
              value={email.type}
              onChange={(e) => handleEmailChange(index, "type", e.target.value)}
            />
            <input
              type="email"
              placeholder="Email Address"
              className="border p-2 flex-grow"
              value={email.address}
              onChange={(e) =>
                handleEmailChange(index, "address", e.target.value)
              }
            />
            <button
              type="button"
              onClick={() => removeEmailField(index)}
              className="px-2 text-red-500"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addEmailField}
          className="text-blue-600 text-sm underline"
        >
          + Add Email
        </button>
      </div>

      <div>
        <label className="font-semibold">Related Services</label>
        {relatedServices.map((r, i) => (
          <div key={i} className="flex gap-2 mb-1">
            <input
              type="number"
              placeholder="ID"
              className="border p-2 w-16"
              value={r.id}
              onChange={(e) =>
                handleRelatedServiceChange(i, "id", Number(e.target.value))
              }
            />
            <input
              type="text"
              placeholder="Title"
              className="border p-2 flex-grow"
              value={r.title}
              onChange={(e) =>
                handleRelatedServiceChange(i, "title", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Image URL"
              className="border p-2 flex-grow"
              value={r.image}
              onChange={(e) =>
                handleRelatedServiceChange(i, "image", e.target.value)
              }
            />
            <button
              type="button"
              onClick={() => removeRelatedService(i)}
              className="px-2 text-red-500"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addRelatedService}
          className="text-blue-600 text-sm underline"
        >
          + Add Related Service
        </button>
      </div>

      <div>
        <label className="font-semibold">Image URL</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <div>
        <label className="font-semibold">Image Alt Text</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={imageAlt}
          onChange={(e) => setImageAlt(e.target.value)}
        />
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
