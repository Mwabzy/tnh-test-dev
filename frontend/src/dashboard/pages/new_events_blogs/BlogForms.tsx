import { useState, useRef } from "react";
import toast from "react-hot-toast";
import type { Blog } from "@/types";

interface Props {
  initialData?: Blog | null;
  group: "ARTICLES" | "EVENTS" | "NEWS";
  onSave: (data: FormData) => Promise<any>;
  onCancel: () => void;
}

type ImageState = {
  file?: File;
  url?: string;
  alt: string;
};

type FormErrors = {
  title?: string;
  author?: string;
};

const BlogForm: React.FC<Props> = ({
  initialData,
  group,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [subtitle, setSubtitle] = useState(initialData?.subtitle ?? "");
  const [author, setAuthor] = useState(initialData?.author ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "");
  const [shortdesc, setShortdesc] = useState(initialData?.shortdesc ?? "");
  const [longdesc, setLongdesc] = useState(initialData?.longdesc ?? "");
  const [isFeatured, setIsFeatured] = useState(
    initialData?.isFeatured ?? false,
  );

  // Translation states
  const [subtitleTranslations, setSubtitleTranslations] = useState({
    fr: initialData?.subtitle_fr || "",
    es: initialData?.subtitle_es || "",
    zh: initialData?.subtitle_zh || "",
    ru: initialData?.subtitle_ru || "",
  });

  const [categoryTranslations, setCategoryTranslations] = useState({
    fr: initialData?.category_fr || "",
    es: initialData?.category_es || "",
    zh: initialData?.category_zh || "",
    ru: initialData?.category_ru || "",
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

  // Toggle translations visibility
  const [openTranslation, setOpenTranslation] = useState<
    "subtitle" | "category" | "shortdesc" | "longdesc" | null
  >(null);

  const toggleTranslation = (
    field: "subtitle" | "category" | "shortdesc" | "longdesc",
  ) => {
    setOpenTranslation((prev) => (prev === field ? null : field));
  };

  const [coverImage, setCoverImage] = useState<ImageState | null>(
    initialData?.cover_image
      ? {
          url: initialData.cover_image,
          alt: (initialData as any)?.cover_image_alt ?? "",
        }
      : null,
  );
  const [deleteCoverImage, setDeleteCoverImage] = useState(false);

  const [mainImage, setMainImage] = useState<ImageState | null>(
    initialData?.image
      ? {
          url: initialData.image,
          alt: (initialData as any)?.image_alt ?? "",
        }
      : null,
  );
  const [deleteMainImage, setDeleteMainImage] = useState(false);
  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const mainInputRef = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs: FormErrors = {};
    if (!title.trim()) errs.title = "Title is required";
    if (!author.trim()) errs.author = "Author is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const renderImageField = (
    label: string,
    image: ImageState | null,
    setImage: (img: ImageState | null) => void,
    setDelete: (v: boolean) => void,
    inputRef: React.RefObject<HTMLInputElement | null>,
  ) => (
    <div className="space-y-2">
      <label className="font-semibold">{label}</label>

      {image && (
        <div className="flex gap-3 items-center">
          <img
            src={image.url}
            alt={image.alt || "Preview"}
            className="w-20 h-20 object-cover border rounded"
          />

          <input
            className="border p-2 flex-1"
            placeholder="Alt text"
            value={image.alt}
            onChange={(e) =>
              setImage({
                ...image,
                alt: e.target.value,
              })
            }
          />

          <button
            type="button"
            className="text-red-600 text-sm"
            onClick={() => {
              setDelete(true);
              setImage(null);
            }}
          >
            Remove
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => {
          if (!e.target.files?.length) return;
          const file = e.target.files[0];
          setDelete(false);
          setImage({
            file,
            url: URL.createObjectURL(file),
            alt: "",
          });
          e.target.value = "";
        }}
      />

      <button
        type="button"
        className="text-blue-600 text-sm underline"
        onClick={() => inputRef.current?.click()}
      >
        + Add Image
      </button>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Fix form errors");
      return;
    }

    setLoading(true);

    try {
      const fd = new FormData();

      // Basic fields - match Django model
      fd.append("title", title);
      fd.append("author", author);
      fd.append("is_featured", String(isFeatured));
      fd.append("subtitle", subtitle);
      fd.append("category", category);
      fd.append("short_desc", shortdesc);
      fd.append("long_desc", longdesc);

      // Store translations in blog_subtitle as JSON
      const translationsData = {
        subtitle: subtitleTranslations,
        category: categoryTranslations,
        short_desc: shortdescTranslations,
        long_desc: longdescTranslations,
      };
      fd.append("blog_subtitle", JSON.stringify(translationsData));

      // Handle images according to serializer
      // Note: The serializer has bugs (coverImage vs cover_image)
      // but we're sending what it expects based on the code

      // Cover image - using serializer field names
      if (coverImage?.file) {
        fd.append("cover_image_file", coverImage.file);
      }
      // Always send alt text and delete flag
      fd.append("cover_image_alt", coverImage?.alt || "");
      fd.append("cover_image_delete", deleteCoverImage.toString());

      // Main image - using serializer field names
      if (mainImage?.file) {
        fd.append("image_file", mainImage.file);
      }
      // Always send alt text and delete flag
      fd.append("image_alt", mainImage?.alt || "");
      fd.append("image_delete", deleteMainImage.toString());

      // Debug: Log what's being sent
      console.log("=== FormData being sent ===");
      console.log("Operation:", initialData?.id ? "EDIT" : "CREATE");
      console.log("Initial ID:", initialData?.id);

      for (const [key, value] of fd.entries()) {
        if (value instanceof File) {
          console.log(
            `${key}: File - ${value.name} (${value.type}, ${value.size} bytes)`,
          );
        } else if (key === "blog_subtitle") {
          try {
            const parsed = JSON.parse(value as string);
            console.log(`${key}: JSON object with keys:`, Object.keys(parsed));
          } catch {
            console.log(`${key}: ${value}`);
          }
        } else {
          console.log(`${key}: ${value}`);
        }
      }
      console.log("=== End FormData ===");

      await onSave(fd);
      toast.success("Saved successfully");
    } catch (err: any) {
      console.error("Save error details:", err);

      // Try to get more error info
      if (err.response?.data) {
        console.error("Server response error:", err.response.data);
        toast.error(`Server error: ${JSON.stringify(err.response.data)}`);
      } else if (err.message) {
        toast.error(`Error: ${err.message}`);
      } else {
        toast.error("Failed to save blog");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 border rounded">
      {/* GROUP BADGE - Informational only */}
      <div className="flex items-center gap-2 mb-4 p-2 bg-gray-50 rounded">
        <span className="text-sm text-gray-500 font-semibold">Group:</span>
        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
          {group}
        </span>
      </div>

      {/* Title */}
      <div>
        <label className="font-medium block mb-1">Title *</label>
        <input
          className="border p-2 w-full rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && (
          <p className="text-red-600 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      {/* Subtitle */}
      <div>
        <label className="font-medium block mb-1">Subtitle</label>
        <input
          className="border p-2 w-full rounded"
          placeholder="Subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
        <button
          type="button"
          className="text-blue-600 text-sm underline mt-1 block"
          onClick={() => toggleTranslation("subtitle")}
        >
          {openTranslation === "subtitle"
            ? "Hide Subtitle Translations"
            : "Show Subtitle Translations"}
        </button>

        {openTranslation === "subtitle" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            {(["fr", "es", "zh", "ru"] as const).map((lang) => (
              <input
                key={lang}
                type="text"
                placeholder={`Subtitle (${lang})`}
                className="border p-2 w-full rounded"
                value={subtitleTranslations[lang]}
                onChange={(e) =>
                  setSubtitleTranslations((prev) => ({
                    ...prev,
                    [lang]: e.target.value,
                  }))
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Author */}
      <div>
        <label className="font-medium block mb-1">Author *</label>
        <input
          className="border p-2 w-full rounded"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        {errors.author && (
          <p className="text-red-600 text-sm mt-1">{errors.author}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="font-medium block mb-1">Category</label>
        <input
          className="border p-2 w-full rounded"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button
          type="button"
          className="text-blue-600 text-sm underline mt-1 block"
          onClick={() => toggleTranslation("category")}
        >
          {openTranslation === "category"
            ? "Hide Category Translations"
            : "Show Category Translations"}
        </button>

        {openTranslation === "category" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            {(["fr", "es", "zh", "ru"] as const).map((lang) => (
              <input
                key={lang}
                type="text"
                placeholder={`Category (${lang})`}
                className="border p-2 w-full rounded"
                value={categoryTranslations[lang]}
                onChange={(e) =>
                  setCategoryTranslations((prev) => ({
                    ...prev,
                    [lang]: e.target.value,
                  }))
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Short Description */}
      <div>
        <label className="font-medium block mb-1">Short Description</label>
        <textarea
          className="border p-2 w-full rounded"
          placeholder="Short description"
          value={shortdesc}
          onChange={(e) => setShortdesc(e.target.value)}
        />
        <button
          type="button"
          className="text-blue-600 text-sm underline mt-1 block"
          onClick={() => toggleTranslation("shortdesc")}
        >
          {openTranslation === "shortdesc"
            ? "Hide Short Description Translations"
            : "Show Short Description Translations"}
        </button>

        {openTranslation === "shortdesc" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            {(["fr", "es", "zh", "ru"] as const).map((lang) => (
              <textarea
                key={lang}
                placeholder={`Short description (${lang})`}
                className="border p-2 w-full rounded"
                value={shortdescTranslations[lang]}
                onChange={(e) =>
                  setShortdescTranslations((prev) => ({
                    ...prev,
                    [lang]: e.target.value,
                  }))
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Long Description */}
      <div>
        <label className="font-medium block mb-1">Full Content</label>
        <textarea
          className="border p-2 w-full h-40 rounded"
          placeholder="Full content"
          value={longdesc}
          onChange={(e) => setLongdesc(e.target.value)}
        />
        <button
          type="button"
          className="text-blue-600 text-sm underline mt-1 block"
          onClick={() => toggleTranslation("longdesc")}
        >
          {openTranslation === "longdesc"
            ? "Hide Full Content Translations"
            : "Show Full Content Translations"}
        </button>

        {openTranslation === "longdesc" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            {(["fr", "es", "zh", "ru"] as const).map((lang) => (
              <textarea
                key={lang}
                placeholder={`Full content (${lang})`}
                className="border p-2 w-full h-40 rounded"
                value={longdescTranslations[lang]}
                onChange={(e) =>
                  setLongdescTranslations((prev) => ({
                    ...prev,
                    [lang]: e.target.value,
                  }))
                }
              />
            ))}
          </div>
        )}
      </div>

      {renderImageField(
        "Cover Image",
        coverImage,
        setCoverImage,
        setDeleteCoverImage,
        coverInputRef,
      )}

      {renderImageField(
        "Main Image",
        mainImage,
        setMainImage,
        setDeleteMainImage,
        mainInputRef,
      )}

      <label className="flex items-center gap-2 p-2 border rounded">
        <input
          type="checkbox"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
          className="w-4 h-4"
        />
        <span className="font-medium">Mark as Featured</span>
      </label>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2 border rounded hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
        >
          {loading && (
            <svg
              className="animate-spin h-4 w-4 text-white"
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

export default BlogForm;
