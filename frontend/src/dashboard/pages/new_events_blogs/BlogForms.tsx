import { useState, useRef } from "react";
import toast from "react-hot-toast";
import type { Blog } from "@/types";
import RichTextEditor from "@/components/RichTextEditor";

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
  const [author, setAuthor] = useState(initialData?.author ?? "");
  const [publishDate, setPublishDate] = useState(
    initialData?.date?.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
  );
  const [shortdesc, setShortdesc] = useState(
    initialData?.shortdesc ?? initialData?.short_desc ?? "",
  );
  const [longdesc, setLongdesc] = useState(
    initialData?.longdesc ?? initialData?.long_desc ?? "",
  );
  const [contentTitle, setContentTitle] = useState(
    initialData?.blog_subtitle ?? "",
  );
  const [spotlightTitle, setSpotlightTitle] = useState(
    initialData?.spotlight_title ?? "",
  );
  const [spotlightPoints, setSpotlightPoints] = useState(
    initialData?.spotlight_points ?? "",
  );
  const [isFeatured, setIsFeatured] = useState(
    initialData?.isFeatured ?? initialData?.is_featured ?? false,
  );

  // Toggle translations visibility
  const [openTranslation, setOpenTranslation] = useState<
    | "shortdesc"
    | "longdesc"
    | "contentTitle"
    | "spotlightTitle"
    | "spotlightPoints"
    | null
  >(null);

  const toggleTranslation = (
    field:
      | "shortdesc"
      | "longdesc"
      | "contentTitle"
      | "spotlightTitle"
      | "spotlightPoints",
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

  // New state for rich text translations
  const [shortdescHTMLTranslations, setShortdescHTMLTranslations] = useState({
    fr: initialData?.shortdesc_fr || initialData?.short_desc_fr || "",
    es: initialData?.shortdesc_es || initialData?.short_desc_es || "",
    zh: initialData?.shortdesc_zh || initialData?.short_desc_zh || "",
    ru: initialData?.shortdesc_ru || initialData?.short_desc_ru || "",
  });

  const [longdescHTMLTranslations, setLongdescHTMLTranslations] = useState({
    fr: initialData?.longdesc_fr || initialData?.long_desc_fr || "",
    es: initialData?.longdesc_es || initialData?.long_desc_es || "",
    zh: initialData?.longdesc_zh || initialData?.long_desc_zh || "",
    ru: initialData?.longdesc_ru || initialData?.long_desc_ru || "",
  });

  const [spotlightTitleTranslations, setSpotlightTitleTranslations] = useState({
    fr: initialData?.spotlight_title_fr || "",
    es: initialData?.spotlight_title_es || "",
    zh: initialData?.spotlight_title_zh || "",
    ru: initialData?.spotlight_title_ru || "",
  });

  const [contentTitleTranslations, setContentTitleTranslations] = useState({
    fr: initialData?.blog_subtitle_fr || "",
    es: initialData?.blog_subtitle_es || "",
    zh: initialData?.blog_subtitle_zh || "",
    ru: initialData?.blog_subtitle_ru || "",
  });

  const [spotlightPointsTranslations, setSpotlightPointsTranslations] =
    useState({
      fr: initialData?.spotlight_points_fr || "",
      es: initialData?.spotlight_points_es || "",
      zh: initialData?.spotlight_points_zh || "",
      ru: initialData?.spotlight_points_ru || "",
    });

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
      const categoryByGroup: Record<Props["group"], string> = {
        ARTICLES: "Articles",
        EVENTS: "Events & Announcements",
        NEWS: "News",
      };

      // Basic fields - match Django model
      fd.append("title", title);
      fd.append("author", author);
      fd.append("date", publishDate);
      fd.append("is_featured", String(isFeatured));
      // Hidden compatibility fields required by backend model.
      fd.append("subtitle", title);
      fd.append("category", categoryByGroup[group]);
      fd.append("blog_subtitle", contentTitle);
      fd.append("spotlight_title", spotlightTitle);
      fd.append("spotlight_points", spotlightPoints);
      fd.append("short_desc", shortdesc);
      fd.append("long_desc", longdesc);
      fd.append("blog_subtitle_fr", contentTitleTranslations.fr);
      fd.append("blog_subtitle_es", contentTitleTranslations.es);
      fd.append("blog_subtitle_zh", contentTitleTranslations.zh);
      fd.append("blog_subtitle_ru", contentTitleTranslations.ru);
      fd.append("short_desc_fr", shortdescHTMLTranslations.fr);
      fd.append("short_desc_es", shortdescHTMLTranslations.es);
      fd.append("short_desc_zh", shortdescHTMLTranslations.zh);
      fd.append("short_desc_ru", shortdescHTMLTranslations.ru);
      fd.append("long_desc_fr", longdescHTMLTranslations.fr);
      fd.append("long_desc_es", longdescHTMLTranslations.es);
      fd.append("long_desc_zh", longdescHTMLTranslations.zh);
      fd.append("long_desc_ru", longdescHTMLTranslations.ru);
      fd.append("spotlight_title_fr", spotlightTitleTranslations.fr);
      fd.append("spotlight_title_es", spotlightTitleTranslations.es);
      fd.append("spotlight_title_zh", spotlightTitleTranslations.zh);
      fd.append("spotlight_title_ru", spotlightTitleTranslations.ru);
      fd.append("spotlight_points_fr", spotlightPointsTranslations.fr);
      fd.append("spotlight_points_es", spotlightPointsTranslations.es);
      fd.append("spotlight_points_zh", spotlightPointsTranslations.zh);
      fd.append("spotlight_points_ru", spotlightPointsTranslations.ru);

      // Handle images according to serializer
      if (coverImage?.file) {
        fd.append("cover_image_file", coverImage.file);
      }
      fd.append("cover_image_alt", coverImage?.alt || "");
      fd.append("cover_image_delete", deleteCoverImage.toString());

      if (mainImage?.file) {
        fd.append("image_file", mainImage.file);
      }
      fd.append("image_alt", mainImage?.alt || "");
      fd.append("image_delete", deleteMainImage.toString());

      await onSave(fd);
      toast.success("Saved successfully");
    } catch (err: any) {
      console.error("Save error details:", err);
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

      <div>
        <label className="font-medium block mb-1">Date</label>
        <input
          type="date"
          className="border p-2 w-full rounded"
          value={publishDate}
          onChange={(e) => setPublishDate(e.target.value)}
        />
      </div>

      {/* Short Description - Replaced with Rich Text Editor */}
      <div>
        <label className="font-medium block mb-1">Short Description</label>
        <RichTextEditor
          value={shortdesc}
          onChange={(html) => {
            setShortdesc(html);
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
            ? "Hide Short Description Translations"
            : "Show Short Description Translations"}
        </button>

        {openTranslation === "shortdesc" && (
          <div className="space-y-4 mt-3">
            {(["fr", "es", "zh", "ru"] as const).map((lang) => (
              <div key={lang} className="border p-3 rounded bg-gray-50">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Short Description ({lang.toUpperCase()})
                </label>
                <RichTextEditor
                  value={shortdescHTMLTranslations[lang]}
                  onChange={(html) => {
                    setShortdescHTMLTranslations((prev) => ({
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

      <div>
        <label className="font-medium block mb-1">Content Title</label>
        <input
          className="border p-2 w-full rounded"
          placeholder="Content title"
          value={contentTitle}
          onChange={(e) => setContentTitle(e.target.value)}
        />
        <button
          type="button"
          className="text-blue-600 text-sm underline mt-1 block"
          onClick={() => toggleTranslation("contentTitle")}
        >
          {openTranslation === "contentTitle"
            ? "Hide Content Title Translations"
            : "Show Content Title Translations"}
        </button>

        {openTranslation === "contentTitle" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            {(["fr", "es", "zh", "ru"] as const).map((lang) => (
              <input
                key={lang}
                type="text"
                placeholder={`Content title (${lang})`}
                className="border p-2 w-full rounded"
                value={contentTitleTranslations[lang]}
                onChange={(e) =>
                  setContentTitleTranslations((prev) => ({
                    ...prev,
                    [lang]: e.target.value,
                  }))
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Long Description - Replaced with Rich Text Editor */}
      <div>
        <label className="font-medium block mb-1">Full Content</label>
        <RichTextEditor
          value={longdesc}
          onChange={(html) => {
            setLongdesc(html);
          }}
          placeholder="Enter full content..."
          minHeight="300px"
        />
        <button
          type="button"
          className="text-blue-600 text-sm underline mt-3 block"
          onClick={() => toggleTranslation("longdesc")}
        >
          {openTranslation === "longdesc"
            ? "Hide Full Content Translations"
            : "Show Full Content Translations"}
        </button>

        {openTranslation === "longdesc" && (
          <div className="space-y-4 mt-3">
            {(["fr", "es", "zh", "ru"] as const).map((lang) => (
              <div key={lang} className="border p-3 rounded bg-gray-50">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Full Content ({lang.toUpperCase()})
                </label>
                <RichTextEditor
                  value={longdescHTMLTranslations[lang]}
                  onChange={(html) => {
                    setLongdescHTMLTranslations((prev) => ({
                      ...prev,
                      [lang]: html,
                    }));
                  }}
                  placeholder={`Enter full content in ${lang}...`}
                  minHeight="200px"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="font-medium block mb-1">Spotlight Title</label>
        <input
          className="border p-2 w-full rounded"
          placeholder="Spotlight title"
          value={spotlightTitle}
          onChange={(e) => setSpotlightTitle(e.target.value)}
        />
        <button
          type="button"
          className="text-blue-600 text-sm underline mt-1 block"
          onClick={() => toggleTranslation("spotlightTitle")}
        >
          {openTranslation === "spotlightTitle"
            ? "Hide Spotlight Title Translations"
            : "Show Spotlight Title Translations"}
        </button>

        {openTranslation === "spotlightTitle" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            {(["fr", "es", "zh", "ru"] as const).map((lang) => (
              <input
                key={lang}
                type="text"
                placeholder={`Spotlight title (${lang})`}
                className="border p-2 w-full rounded"
                value={spotlightTitleTranslations[lang]}
                onChange={(e) =>
                  setSpotlightTitleTranslations((prev) => ({
                    ...prev,
                    [lang]: e.target.value,
                  }))
                }
              />
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="font-medium block mb-1">Spotlight Points</label>
        <RichTextEditor
          value={spotlightPoints}
          onChange={(html) => setSpotlightPoints(html)}
          placeholder="Enter spotlight points..."
          minHeight="140px"
        />
        <button
          type="button"
          className="text-blue-600 text-sm underline mt-3 block"
          onClick={() => toggleTranslation("spotlightPoints")}
        >
          {openTranslation === "spotlightPoints"
            ? "Hide Spotlight Points Translations"
            : "Show Spotlight Points Translations"}
        </button>

        {openTranslation === "spotlightPoints" && (
          <div className="space-y-4 mt-3">
            {(["fr", "es", "zh", "ru"] as const).map((lang) => (
              <div key={lang} className="border p-3 rounded bg-gray-50">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Spotlight Points ({lang.toUpperCase()})
                </label>
                <RichTextEditor
                  value={spotlightPointsTranslations[lang]}
                  onChange={(html) => {
                    setSpotlightPointsTranslations((prev) => ({
                      ...prev,
                      [lang]: html,
                    }));
                  }}
                  placeholder={`Enter spotlight points in ${lang}...`}
                  minHeight="120px"
                />
              </div>
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
