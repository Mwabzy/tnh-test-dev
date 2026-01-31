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
import RichTextEditor from "@/components/RichTextEditor";

interface Props {
  initialData?: ClinicalService | null;
  onSave: (service: ClinicalService | FormData) => Promise<any>;
  onCancel: () => void;
  availableDoctors: Doctor[];
}

type FeatureImageDraft =
  | {
      kind: "existing";
      url: string;
      alt?: string;
      id?: number;
    }
  | {
      kind: "new";
      file: File;
      alt?: string;
    };

type FeatureForm = Omit<Feature, "image"> & {
  image?: FeatureImageDraft;
  // Translation fields for feature
  title_fr?: string;
  title_es?: string;
  title_zh?: string;
  title_ru?: string;
  description_fr?: string;
  description_es?: string;
  description_zh?: string;
  description_ru?: string;
};

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
  const [tagline, _setTagline] = useState(initialData?.tagline || "");
  const [overview, setOverview] = useState(initialData?.overview || "");
  const [detailedDescription, setDetailedDescription] = useState(
    initialData?.detailedDescription || "",
  );

  // Translation states
  const [taglineTranslations, _setTaglineTranslations] = useState({
    fr: initialData?.tagline_fr || "",
    es: initialData?.tagline_es || "",
    zh: initialData?.tagline_zh || "",
    ru: initialData?.tagline_ru || "",
  });

  const [overviewTranslations, setOverviewTranslations] = useState({
    fr: initialData?.overview_fr || "",
    es: initialData?.overview_es || "",
    zh: initialData?.overview_zh || "",
    ru: initialData?.overview_ru || "",
  });

  const [detailedDescriptionTranslations, setDetailedDescriptionTranslations] =
    useState({
      fr: initialData?.detailedDescription_fr || "",
      es: initialData?.detailedDescription_es || "",
      zh: initialData?.detailedDescription_zh || "",
      ru: initialData?.detailedDescription_ru || "",
    });

  // Track which translation panel is open
  const [openTranslation, setOpenTranslation] = useState<
    "tagline" | "overview" | "detailedDescription" | null
  >(null);

  const toggleTranslation = (
    field: "tagline" | "overview" | "detailedDescription",
  ) => {
    setOpenTranslation((prev) => (prev === field ? null : field));
  };

  const [features, setFeatures] = useState<FeatureForm[]>(() => {
    if (!initialData) return [];

    return (initialData.features_read || []).map((f) => ({
      title: f.title,
      title_fr: f.title_fr || "",
      title_es: f.title_es || "",
      title_zh: f.title_zh || "",
      title_ru: f.title_ru || "",
      description: f.description,
      description_fr: f.description_fr || "",
      description_es: f.description_es || "",
      description_zh: f.description_zh || "",
      description_ru: f.description_ru || "",
      image: f.image
        ? {
            kind: "existing",
            url: f.image.url,
            alt: f.image.alt,
            id: f.image.id,
          }
        : undefined,
    }));
  });

  const [selectedDoctors, setSelectedDoctors] = useState<Doctor[]>(
    initialData?.doctors || [],
  );

  const [doctorInput, setDoctorInput] = useState("");

  const [testimonials, setTestimonials] = useState<Testimonial[]>(
    initialData?.testimonials || [],
  );
  const [contact, setContact] = useState<ContactInfo>({
    phone: initialData?.contact?.phone || "",
    email: initialData?.contact?.email || "",
  });
  const [isBookable, setIsBookable] = useState(
    initialData?.isBookable ?? false,
  );
  const [hasReadMore, setHasReadMore] = useState(
    initialData?.hasReadMore ?? false,
  );
  const [images, setImages] = useState<Image[]>(
    (initialData?.images || []).map((img) => ({
      ...img,
      alt: img.alt || "",
    })),
  );

  const [locations, setLocations] = useState<string[]>(
    initialData?.locations || [],
  );

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; tagline?: string }>(
    {},
  );
  const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);
  const [newImages, setNewImages] = useState<NewImage[]>([]);

  // Feature translation state
  const [openFeatureTranslations, setOpenFeatureTranslations] = useState<
    number | null
  >(null);

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
    key: keyof FeatureForm,
    value: string,
  ) => {
    setFeatures(
      features.map((f, i) => (i === index ? { ...f, [key]: value } : f)),
    );
  };

  const addFeature = () =>
    setFeatures([
      ...features,
      {
        title: "",
        description: "",
        title_fr: "",
        title_es: "",
        title_zh: "",
        title_ru: "",
        description_fr: "",
        description_es: "",
        description_zh: "",
        description_ru: "",
      },
    ]);

  const removeFeature = (index: number) =>
    setFeatures(features.filter((_, i) => i !== index));

  const handleFeatureImageAltChange = (index: number, alt: string) => {
    setFeatures((prev) =>
      prev.map((f, i) =>
        i === index && f.image ? { ...f, image: { ...f.image, alt } } : f,
      ),
    );
  };

  const handleFeatureImageUpload = (index: number, file: File) => {
    setFeatures((prev) =>
      prev.map((f, i) =>
        i === index ? { ...f, image: { kind: "new", file, alt: "" } } : f,
      ),
    );
  };

  const removeFeatureImage = (index: number) => {
    setFeatures((prev) =>
      prev.map((f, i) => (i === index ? { ...f, image: undefined } : f)),
    );
  };

  const featuresPayload = features.map((f) => ({
    title: f.title,
    title_fr: f.title_fr,
    title_es: f.title_es,
    title_zh: f.title_zh,
    title_ru: f.title_ru,
    description: f.description,
    description_fr: f.description_fr,
    description_es: f.description_es,
    description_zh: f.description_zh,
    description_ru: f.description_ru,
    image:
      f.image && "url" in f.image
        ? { url: f.image.url, alt: f.image.alt }
        : null,
  }));

  const removeDoctor = (id: number) => {
    setSelectedDoctors((prev) => prev.filter((d) => d.id !== id));
  };

  const handleTestimonialChange = (
    index: number,
    key: keyof Testimonial,
    value: string,
  ) => {
    setTestimonials(
      testimonials.map((t, i) => (i === index ? { ...t, [key]: value } : t)),
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
    value: string,
  ) => {
    setImages(
      images.map((img, i) => (i === index ? { ...img, [key]: value } : img)),
    );
  };

  const removeImage = (index: number) => {
    const img = images[index];
    const imgId = img.id;
    if (typeof imgId === "number") {
      setImagesToDelete((prev: number[]) => [...prev, imgId]);
    }
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix errors in the form.");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("tagline", tagline);
    formData.append("tagline_fr", taglineTranslations.fr);
    formData.append("tagline_es", taglineTranslations.es);
    formData.append("tagline_zh", taglineTranslations.zh);
    formData.append("tagline_ru", taglineTranslations.ru);

    formData.append("overview", overview);
    formData.append("overview_fr", overviewTranslations.fr);
    formData.append("overview_es", overviewTranslations.es);
    formData.append("overview_zh", overviewTranslations.zh);
    formData.append("overview_ru", overviewTranslations.ru);

    formData.append("detailedDescription", detailedDescription);
    formData.append(
      "detailedDescription_fr",
      detailedDescriptionTranslations.fr,
    );
    formData.append(
      "detailedDescription_es",
      detailedDescriptionTranslations.es,
    );
    formData.append(
      "detailedDescription_zh",
      detailedDescriptionTranslations.zh,
    );
    formData.append(
      "detailedDescription_ru",
      detailedDescriptionTranslations.ru,
    );

    formData.append("isBookable", String(isBookable));
    formData.append("hasReadMore", String(hasReadMore));
    formData.append("features", JSON.stringify(featuresPayload));

    features.forEach((f, index) => {
      if (f.image && "file" in f.image) {
        formData.append("feature_images_files", f.image.file);
        formData.append("feature_images_alt", f.image.alt || "");
        formData.append("feature_images_index", String(index));
      }
    });

    formData.append(
      "doctor_ids",
      JSON.stringify(selectedDoctors.map((d) => d.id)),
    );

    formData.append("testimonials", JSON.stringify(testimonials));
    formData.append("contact", JSON.stringify(contact));
    formData.append("locations", JSON.stringify(locations));
    formData.append("clinics", JSON.stringify([]));

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
        <label className="font-semibold block mb-1">
          Overview {requiredMark}
        </label>
        <RichTextEditor
          value={overview}
          onChange={(html, plainText) => {
            setOverview(html);

            console.log("Plain text:", plainText);
          }}
          placeholder="Enter overview here..."
          minHeight="150px"
        />

        <button
          type="button"
          className="text-blue-600 text-sm underline mt-1 block"
          onClick={() => toggleTranslation("overview")}
        >
          {openTranslation === "overview"
            ? "Hide Translations"
            : "Show Overview Translations"}
        </button>

        {openTranslation === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2 mt-2">
            {(["fr", "es", "zh", "ru"] as const).map((lang) => (
              <RichTextEditor
                key={lang}
                value={overviewTranslations[lang]}
                onChange={(html) =>
                  setOverviewTranslations((prev) => ({
                    ...prev,
                    [lang]: html,
                  }))
                }
                placeholder={`Overview (${lang})...`}
                minHeight="120px"
              />
            ))}
          </div>
        )}
      </div>

      {/* Detailed Description */}
      <div>
        <label className="font-semibold block mb-1">
          Detailed Description {requiredMark}
        </label>
        <RichTextEditor
          value={detailedDescription}
          onChange={(html, plainText) => {
            setDetailedDescription(html);
            // If you need the plain text for any purpose
            console.log("Plain text:", plainText);
          }}
          placeholder="Enter detailed description here..."
          minHeight="200px"
        />

        <button
          type="button"
          className="text-blue-600 text-sm underline mt-1 block"
          onClick={() => toggleTranslation("detailedDescription")}
        >
          {openTranslation === "detailedDescription"
            ? "Hide Translations"
            : "Show Detailed Description Translations"}
        </button>

        {openTranslation === "detailedDescription" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2 mt-2">
            {(["fr", "es", "zh", "ru"] as const).map((lang) => (
              <RichTextEditor
                key={lang}
                value={detailedDescriptionTranslations[lang]}
                onChange={(html) =>
                  setDetailedDescriptionTranslations((prev) => ({
                    ...prev,
                    [lang]: html,
                  }))
                }
                placeholder={`Detailed Description (${lang})...`}
                minHeight="150px"
              />
            ))}
          </div>
        )}
      </div>

      {/* Features */}
      <div>
        <label className="font-semibold">Features {requiredMark}</label>

        {features.map((f, i) => (
          <div key={i} className="space-y-1 border p-2 mb-2 rounded">
            {/* Feature Title */}
            <div>
              <input
                type="text"
                placeholder="Feature title"
                className="border p-1 w-full"
                value={f.title}
                onChange={(e) =>
                  handleFeatureChange(i, "title", e.target.value)
                }
              />

              <button
                type="button"
                className="text-blue-600 text-sm underline mt-1 block"
                onClick={() =>
                  setOpenFeatureTranslations(
                    openFeatureTranslations === i ? null : i,
                  )
                }
              >
                {openFeatureTranslations === i
                  ? "Hide Title Translations"
                  : "Show Title Translations"}
              </button>

              {openFeatureTranslations === i && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2 mt-2">
                  {(["fr", "es", "zh", "ru"] as const).map((lang) => (
                    <input
                      key={`title-${lang}`}
                      type="text"
                      placeholder={`Title (${lang})`}
                      className="border p-1 w-full"
                      value={
                        (f[`title_${lang}` as keyof FeatureForm] as string) ||
                        ""
                      }
                      onChange={(e) =>
                        handleFeatureChange(
                          i,
                          `title_${lang}` as keyof FeatureForm,
                          e.target.value,
                        )
                      }
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Feature Description */}
            <div>
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
                className="text-blue-600 text-sm underline mt-1 block"
                onClick={() =>
                  setOpenFeatureTranslations(
                    openFeatureTranslations === i ? null : i,
                  )
                }
              >
                {openFeatureTranslations === i
                  ? "Hide Description Translations"
                  : "Show Description Translations"}
              </button>

              {openFeatureTranslations === i && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2 mt-2">
                  {(["fr", "es", "zh", "ru"] as const).map((lang) => (
                    <textarea
                      key={`desc-${lang}`}
                      placeholder={`Description (${lang})`}
                      className="border p-1 w-full"
                      value={
                        (f[
                          `description_${lang}` as keyof FeatureForm
                        ] as string) || ""
                      }
                      onChange={(e) =>
                        handleFeatureChange(
                          i,
                          `description_${lang}` as keyof FeatureForm,
                          e.target.value,
                        )
                      }
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Feature Image */}
            <div className="flex gap-2 mb-2 items-center">
              {f.image && "url" in f.image && (
                <img
                  src={f.image.url}
                  alt={f.image.alt || ""}
                  className="w-24 h-24 object-cover border"
                />
              )}

              {f.image && "file" in f.image && (
                <img
                  src={URL.createObjectURL(f.image.file)}
                  alt=""
                  className="w-24 h-24 object-cover border"
                />
              )}

              {f.image && (
                <input
                  type="text"
                  placeholder="Alt text"
                  className="border p-2 w-full"
                  value={f.image.alt || ""}
                  onChange={(e) =>
                    handleFeatureImageAltChange(i, e.target.value)
                  }
                />
              )}

              <input
                type="file"
                accept="image/*"
                hidden
                id={`feature-image-${i}`}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFeatureImageUpload(i, file);
                  e.target.value = "";
                }}
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  className="text-blue-600 text-sm underline"
                  onClick={() =>
                    document.getElementById(`feature-image-${i}`)?.click()
                  }
                >
                  {!f.image && "Add Image"}
                </button>

                {f.image && (
                  <button
                    type="button"
                    className="text-red-500 text-sm cursor-pointer"
                    onClick={() => removeFeatureImage(i)}
                  >
                    ✕ Remove Image
                  </button>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => removeFeature(i)}
              className="text-red-500 text-sm cursor-pointer"
            >
              ✕ Remove Feature
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
              className="text-red-500 text-sm cursor-pointer"
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
        <label className="font-semibold">Contact Info {requiredMark}</label>
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
              className="text-red-500 cursor-pointer"
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
                    i === idx ? { ...ni, alt: e.target.value } : ni,
                  ),
                )
              }
            />

            <button
              type="button"
              className="text-red-500 cursor-pointer"
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
        <label className="font-semibold">Locations {requiredMark}</label>

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
