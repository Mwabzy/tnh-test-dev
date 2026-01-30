import { useState } from "react";
import toast from "react-hot-toast";
import { CSR } from "@/types";
import RichTextEditor from "@/components/RichTextEditor"; // Adjust path as needed

interface Props {
  initialData?: CSR | null;
  onSave: (data: FormData) => Promise<void>;
  onCancel: () => void;
}

type ImageState = {
  url?: string;
  file?: File;
  alt: string;
};

const requiredMark = <span className="text-red-600">*</span>;

const CsrForm: React.FC<Props> = ({ initialData, onSave, onCancel }) => {
  const [author, setAuthor] = useState(initialData?.author || "");
  const [title, setTitle] = useState(initialData?.title || "");
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || "");
  const [blogsubtitle, setBlogsubtitle] = useState(
    initialData?.blogsubtitle || "",
  );

  // Rich text editor states
  const [shortdesc, setShortdesc] = useState(initialData?.shortdesc || "");
  const [longdesc, setLongdesc] = useState(initialData?.longdesc || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );

  // For plain text extraction (optional)
  const [_shortdescPlain, setShortdescPlain] = useState("");
  const [_longdescPlain, setLongdescPlain] = useState("");
  const [_descriptionPlain, setDescriptionPlain] = useState("");

  // Translation states
  const [descriptionTranslations, setDescriptionTranslations] = useState({
    fr: initialData?.description_fr || "",
    es: initialData?.description_es || "",
    zh: initialData?.description_zh || "",
    ru: initialData?.description_ru || "",
  });

  const [shortdescTranslations, setShortdescTranslations] = useState({
    fr: initialData?.shortdesc_fr || "",
    es: initialData?.shortdesc_es || "",
    zh: initialData?.shortdesc_zh || "",
    ru: initialData?.shortdesc_ru || "",
  });

  const [longdescTranslations, setLongdescTranslations] = useState({
    fr: initialData?.longdesc_fr || "",
    es: initialData?.longdesc_es || "",
    zh: initialData?.longdesc_zh || "",
    ru: initialData?.longdesc_ru || "",
  });

  // Track which translation panel is open
  const [openTranslation, setOpenTranslation] = useState<
    "description" | "shortdesc" | "longdesc" | null
  >(null);

  const toggleTranslation = (
    field: "description" | "shortdesc" | "longdesc",
  ) => {
    setOpenTranslation((prev) => (prev === field ? null : field));
  };

  // Cover image (UPLOAD)
  const [coverImage, setCoverImage] = useState<ImageState | null>(
    initialData?.coverImage
      ? {
          url: initialData.coverImage,
          alt: (initialData as any).cover_image_alt || "",
        }
      : null,
  );
  const [deleteCoverImage, setDeleteCoverImage] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ author?: string; title?: string }>({});

  const validate = () => {
    const errs: any = {};
    if (!author.trim()) errs.author = "Author is required";
    if (!title.trim()) errs.title = "Title is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const renderImage = (
    label: string,
    image: ImageState | null,
    setImage: (img: ImageState | null) => void,
    setDelete: (val: boolean) => void,
    inputId: string,
  ) => (
    <div>
      <label className="font-semibold">{label}</label>

      {image && (
        <div className="flex gap-2 items-center mt-2">
          <img
            src={image.url || (image.file && URL.createObjectURL(image.file))}
            className="w-20 h-20 object-cover border"
            alt="Preview"
          />
          <input
            className="border p-2 grow"
            placeholder="Alt text"
            value={image.alt}
            onChange={(e) => setImage({ ...image, alt: e.target.value })}
          />
          <button
            type="button"
            className="text-red-500"
            onClick={() => {
              setDelete(true);
              setImage(null);
            }}
          >
            ✕
          </button>
        </div>
      )}

      <input
        type="file"
        hidden
        accept="image/*"
        id={inputId}
        onChange={(e) => {
          if (!e.target.files?.length) return;
          setDelete(false);
          setImage({ file: e.target.files[0], alt: "" });
          e.target.value = "";
        }}
      />

      <button
        type="button"
        className="text-blue-600 underline text-sm mt-2"
        onClick={() => document.getElementById(inputId)?.click()}
      >
        + Add Image
      </button>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return toast.error("Fix form errors");

    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("author", author);
      fd.append("title", title);
      fd.append("subtitle", subtitle);
      fd.append("blogsubtitle", blogsubtitle);

      // Append rich text fields
      fd.append("shortdesc", shortdesc);
      fd.append("longdesc", longdesc);
      fd.append("description", description);

      // Append translations
      fd.append("description_fr", descriptionTranslations.fr);
      fd.append("description_es", descriptionTranslations.es);
      fd.append("description_zh", descriptionTranslations.zh);
      fd.append("description_ru", descriptionTranslations.ru);

      fd.append("shortdesc_fr", shortdescTranslations.fr);
      fd.append("shortdesc_es", shortdescTranslations.es);
      fd.append("shortdesc_zh", shortdescTranslations.zh);
      fd.append("shortdesc_ru", shortdescTranslations.ru);

      fd.append("longdesc_fr", longdescTranslations.fr);
      fd.append("longdesc_es", longdescTranslations.es);
      fd.append("longdesc_zh", longdescTranslations.zh);
      fd.append("longdesc_ru", longdescTranslations.ru);

      // Optionally, you can also append plain text versions
      // fd.append("shortdesc_plain", shortdescPlain);
      // fd.append("longdesc_plain", longdescPlain);
      // fd.append("description_plain", descriptionPlain);

      // Cover image handling
      if (coverImage?.file) {
        fd.append("cover_image_file", coverImage.file);
        fd.append("cover_image_alt", coverImage.alt);
      } else if (coverImage?.url && !deleteCoverImage) {
        fd.append("cover_image_alt", coverImage.alt);
      }

      if (deleteCoverImage) {
        fd.append("cover_image_delete", "true");
      }

      await onSave(fd);
      toast.success("CSR saved successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save CSR");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="font-semibold">Author {requiredMark}</label>
        <input
          className="border p-2 w-full"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        {errors.author && (
          <p className="text-red-600 text-sm">{errors.author}</p>
        )}
      </div>

      <div>
        <label className="font-semibold">Title {requiredMark}</label>
        <input
          className="border p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
      </div>

      <input
        className="border p-2 w-full"
        placeholder="Subtitle"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Blog Subtitle"
        value={blogsubtitle}
        onChange={(e) => setBlogsubtitle(e.target.value)}
      />

      {/* Short Description - Rich Text Editor */}
      <div>
        <label className="font-semibold">Short Description</label>
        <RichTextEditor
          value={shortdesc}
          onChange={(html, plainText) => {
            setShortdesc(html);
            setShortdescPlain(plainText); // Optional: store plain text
          }}
          placeholder="Enter short description..."
          minHeight="150px"
        />
        <button
          type="button"
          className="text-blue-600 text-sm underline mt-3 block"
          onClick={() => toggleTranslation("shortdesc")}
        >
          {openTranslation === "shortdesc"
            ? "Hide Translations"
            : "Show Short Description Translations"}
        </button>

        {openTranslation === "shortdesc" && (
          <div className="space-y-3 mt-3">
            {(["fr", "es", "zh", "ru"] as const).map((lang) => (
              <div key={lang}>
                <label className="text-sm font-medium mb-1 block">
                  Short Description ({lang})
                </label>
                <RichTextEditor
                  value={shortdescTranslations[lang]}
                  onChange={(html, plainText) => {
                    setShortdescTranslations((prev) => ({
                      ...prev,
                      [lang]: html,
                    }));
                  }}
                  placeholder={`Enter short description in ${lang}...`}
                  minHeight="120px"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Long Description - Rich Text Editor */}
      <div>
        <label className="font-semibold">Long Description</label>
        <RichTextEditor
          value={longdesc}
          onChange={(html, plainText) => {
            setLongdesc(html);
            setLongdescPlain(plainText); // Optional: store plain text
          }}
          placeholder="Enter long description..."
          minHeight="200px"
        />
        <button
          type="button"
          className="text-blue-600 text-sm underline mt-3 block"
          onClick={() => toggleTranslation("longdesc")}
        >
          {openTranslation === "longdesc"
            ? "Hide Translations"
            : "Show Long Description Translations"}
        </button>

        {openTranslation === "longdesc" && (
          <div className="space-y-3 mt-3">
            {(["fr", "es", "zh", "ru"] as const).map((lang) => (
              <div key={lang}>
                <label className="text-sm font-medium mb-1 block">
                  Long Description ({lang})
                </label>
                <RichTextEditor
                  value={longdescTranslations[lang]}
                  onChange={(html, plainText) => {
                    setLongdescTranslations((prev) => ({
                      ...prev,
                      [lang]: html,
                    }));
                  }}
                  placeholder={`Enter long description in ${lang}...`}
                  minHeight="150px"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Description - Rich Text Editor */}
      <div>
        <label className="font-semibold">Description</label>
        <RichTextEditor
          value={description}
          onChange={(html, plainText) => {
            setDescription(html);
            setDescriptionPlain(plainText); // Optional: store plain text
          }}
          placeholder="Enter description..."
          minHeight="200px"
        />
        <button
          type="button"
          className="text-blue-600 text-sm underline mt-3 block"
          onClick={() => toggleTranslation("description")}
        >
          {openTranslation === "description"
            ? "Hide Translations"
            : "Show Description Translations"}
        </button>

        {openTranslation === "description" && (
          <div className="space-y-3 mt-3">
            {(["fr", "es", "zh", "ru"] as const).map((lang) => (
              <div key={lang}>
                <label className="text-sm font-medium mb-1 block">
                  Description ({lang})
                </label>
                <RichTextEditor
                  value={descriptionTranslations[lang]}
                  onChange={(html, plainText) => {
                    setDescriptionTranslations((prev) => ({
                      ...prev,
                      [lang]: html,
                    }));
                  }}
                  placeholder={`Enter description in ${lang}...`}
                  minHeight="150px"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {renderImage(
        "Cover Image",
        coverImage,
        setCoverImage,
        setDeleteCoverImage,
        "csr-cover-upload",
      )}

      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default CsrForm;
