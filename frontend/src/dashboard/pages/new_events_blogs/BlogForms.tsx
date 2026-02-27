import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import type { Blog } from "@/types";
import RichTextEditor from "@/components/RichTextEditor";
import { fetchBlogTranslationPreview } from "@/api/api";
import { sanitizeHtml, sanitizePlainText } from "@/lib/sanitizeHtml";

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

const TRANSLATION_LANGS = ["fr", "es", "zh", "ru"] as const;
type TranslationLanguage = (typeof TRANSLATION_LANGS)[number];
type TranslationMap = Record<TranslationLanguage, string>;

const isBlank = (value?: string | null) => !value || value.trim() === "";

const hasMissingTranslation = (translations: TranslationMap) =>
  TRANSLATION_LANGS.some((lang) => isBlank(translations[lang]));

const fillOnlyEmptyTranslations = (
  current: TranslationMap,
  incoming?: Partial<Record<TranslationLanguage, string>>,
) => {
  if (!incoming) return current;

  const next = { ...current };
  for (const lang of TRANSLATION_LANGS) {
    const translatedValue = incoming[lang];
    if (isBlank(next[lang]) && !isBlank(translatedValue)) {
      next[lang] = translatedValue as string;
    }
  }
  return next;
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
  const [isRegeneratingTranslations, setIsRegeneratingTranslations] =
    useState(false);

  // New state for rich text translations
  const [shortdescHTMLTranslations, setShortdescHTMLTranslations] =
    useState<TranslationMap>({
    fr: initialData?.shortdesc_fr || initialData?.short_desc_fr || "",
    es: initialData?.shortdesc_es || initialData?.short_desc_es || "",
    zh: initialData?.shortdesc_zh || initialData?.short_desc_zh || "",
    ru: initialData?.shortdesc_ru || initialData?.short_desc_ru || "",
  });

  const [longdescHTMLTranslations, setLongdescHTMLTranslations] =
    useState<TranslationMap>({
    fr: initialData?.longdesc_fr || initialData?.long_desc_fr || "",
    es: initialData?.longdesc_es || initialData?.long_desc_es || "",
    zh: initialData?.longdesc_zh || initialData?.long_desc_zh || "",
    ru: initialData?.longdesc_ru || initialData?.long_desc_ru || "",
  });

  const [spotlightTitleTranslations, setSpotlightTitleTranslations] =
    useState<TranslationMap>({
    fr: initialData?.spotlight_title_fr || "",
    es: initialData?.spotlight_title_es || "",
    zh: initialData?.spotlight_title_zh || "",
    ru: initialData?.spotlight_title_ru || "",
  });

  const [contentTitleTranslations, setContentTitleTranslations] =
    useState<TranslationMap>({
    fr: initialData?.blog_subtitle_fr || "",
    es: initialData?.blog_subtitle_es || "",
    zh: initialData?.blog_subtitle_zh || "",
    ru: initialData?.blog_subtitle_ru || "",
  });

  const [spotlightPointsTranslations, setSpotlightPointsTranslations] =
    useState<TranslationMap>({
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

  useEffect(() => {
    const payload: {
      short_desc?: string;
      long_desc?: string;
      blog_subtitle?: string;
      spotlight_title?: string;
      spotlight_points?: string;
    } = {};

    if (!isBlank(shortdesc) && hasMissingTranslation(shortdescHTMLTranslations)) {
      payload.short_desc = sanitizeHtml(shortdesc);
    }
    if (!isBlank(longdesc) && hasMissingTranslation(longdescHTMLTranslations)) {
      payload.long_desc = sanitizeHtml(longdesc);
    }
    if (!isBlank(contentTitle) && hasMissingTranslation(contentTitleTranslations)) {
      payload.blog_subtitle = sanitizePlainText(contentTitle);
    }
    if (
      !isBlank(spotlightTitle) &&
      hasMissingTranslation(spotlightTitleTranslations)
    ) {
      payload.spotlight_title = sanitizePlainText(spotlightTitle);
    }
    if (
      !isBlank(spotlightPoints) &&
      hasMissingTranslation(spotlightPointsTranslations)
    ) {
      payload.spotlight_points = sanitizeHtml(spotlightPoints);
    }

    if (Object.keys(payload).length === 0) return;

    let cancelled = false;
    const timer = window.setTimeout(async () => {
      try {
        const translations = await fetchBlogTranslationPreview(payload);
        if (cancelled) return;

        if (translations.short_desc) {
          setShortdescHTMLTranslations((prev) =>
            fillOnlyEmptyTranslations(prev, translations.short_desc),
          );
        }
        if (translations.long_desc) {
          setLongdescHTMLTranslations((prev) =>
            fillOnlyEmptyTranslations(prev, translations.long_desc),
          );
        }
        if (translations.blog_subtitle) {
          setContentTitleTranslations((prev) =>
            fillOnlyEmptyTranslations(prev, translations.blog_subtitle),
          );
        }
        if (translations.spotlight_title) {
          setSpotlightTitleTranslations((prev) =>
            fillOnlyEmptyTranslations(prev, translations.spotlight_title),
          );
        }
        if (translations.spotlight_points) {
          setSpotlightPointsTranslations((prev) =>
            fillOnlyEmptyTranslations(prev, translations.spotlight_points),
          );
        }
      } catch (error) {
        console.error("Failed to auto-fill blog translations:", error);
      }
    }, 700);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [
    shortdesc,
    shortdescHTMLTranslations,
    longdesc,
    longdescHTMLTranslations,
    contentTitle,
    contentTitleTranslations,
    spotlightTitle,
    spotlightTitleTranslations,
    spotlightPoints,
    spotlightPointsTranslations,
  ]);

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

  const handleRegenerateAllTranslations = async () => {
    const payload: {
      short_desc?: string;
      long_desc?: string;
      blog_subtitle?: string;
      spotlight_title?: string;
      spotlight_points?: string;
    } = {};

    if (!isBlank(shortdesc)) payload.short_desc = sanitizeHtml(shortdesc);
    if (!isBlank(longdesc)) payload.long_desc = sanitizeHtml(longdesc);
    if (!isBlank(contentTitle)) {
      payload.blog_subtitle = sanitizePlainText(contentTitle);
    }
    if (!isBlank(spotlightTitle)) {
      payload.spotlight_title = sanitizePlainText(spotlightTitle);
    }
    if (!isBlank(spotlightPoints)) {
      payload.spotlight_points = sanitizeHtml(spotlightPoints);
    }

    if (Object.keys(payload).length === 0) {
      toast.error("Enter English content first before regenerating.");
      return;
    }

    const shouldContinue = window.confirm(
      "Regenerate all translations from current English content? This will replace existing translated values.",
    );
    if (!shouldContinue) return;

    setIsRegeneratingTranslations(true);
    try {
      const translations = await fetchBlogTranslationPreview(payload);

      if (payload.short_desc) {
        setShortdescHTMLTranslations((prev) => ({
          fr: translations.short_desc?.fr ?? prev.fr,
          es: translations.short_desc?.es ?? prev.es,
          zh: translations.short_desc?.zh ?? prev.zh,
          ru: translations.short_desc?.ru ?? prev.ru,
        }));
      }
      if (payload.long_desc) {
        setLongdescHTMLTranslations((prev) => ({
          fr: translations.long_desc?.fr ?? prev.fr,
          es: translations.long_desc?.es ?? prev.es,
          zh: translations.long_desc?.zh ?? prev.zh,
          ru: translations.long_desc?.ru ?? prev.ru,
        }));
      }
      if (payload.blog_subtitle) {
        setContentTitleTranslations((prev) => ({
          fr: translations.blog_subtitle?.fr ?? prev.fr,
          es: translations.blog_subtitle?.es ?? prev.es,
          zh: translations.blog_subtitle?.zh ?? prev.zh,
          ru: translations.blog_subtitle?.ru ?? prev.ru,
        }));
      }
      if (payload.spotlight_title) {
        setSpotlightTitleTranslations((prev) => ({
          fr: translations.spotlight_title?.fr ?? prev.fr,
          es: translations.spotlight_title?.es ?? prev.es,
          zh: translations.spotlight_title?.zh ?? prev.zh,
          ru: translations.spotlight_title?.ru ?? prev.ru,
        }));
      }
      if (payload.spotlight_points) {
        setSpotlightPointsTranslations((prev) => ({
          fr: translations.spotlight_points?.fr ?? prev.fr,
          es: translations.spotlight_points?.es ?? prev.es,
          zh: translations.spotlight_points?.zh ?? prev.zh,
          ru: translations.spotlight_points?.ru ?? prev.ru,
        }));
      }

      toast.success("Translations regenerated.");
    } catch (error) {
      console.error("Failed to regenerate blog translations:", error);
      toast.error("Failed to regenerate translations.");
    } finally {
      setIsRegeneratingTranslations(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Fix form errors");
      return;
    }

    setLoading(true);

    try {
      let nextContentTitleTranslations = { ...contentTitleTranslations };
      let nextShortdescTranslations = { ...shortdescHTMLTranslations };
      let nextLongdescTranslations = { ...longdescHTMLTranslations };
      let nextSpotlightTitleTranslations = { ...spotlightTitleTranslations };
      let nextSpotlightPointsTranslations = { ...spotlightPointsTranslations };

      const previewPayload: {
        short_desc?: string;
        long_desc?: string;
        blog_subtitle?: string;
        spotlight_title?: string;
        spotlight_points?: string;
      } = {};

      if (!isBlank(shortdesc) && hasMissingTranslation(nextShortdescTranslations)) {
        previewPayload.short_desc = sanitizeHtml(shortdesc);
      }
      if (!isBlank(longdesc) && hasMissingTranslation(nextLongdescTranslations)) {
        previewPayload.long_desc = sanitizeHtml(longdesc);
      }
      if (!isBlank(contentTitle) && hasMissingTranslation(nextContentTitleTranslations)) {
        previewPayload.blog_subtitle = sanitizePlainText(contentTitle);
      }
      if (
        !isBlank(spotlightTitle) &&
        hasMissingTranslation(nextSpotlightTitleTranslations)
      ) {
        previewPayload.spotlight_title = sanitizePlainText(spotlightTitle);
      }
      if (
        !isBlank(spotlightPoints) &&
        hasMissingTranslation(nextSpotlightPointsTranslations)
      ) {
        previewPayload.spotlight_points = sanitizeHtml(spotlightPoints);
      }

      if (Object.keys(previewPayload).length > 0) {
        try {
          const translations = await fetchBlogTranslationPreview(previewPayload);

          if (translations.blog_subtitle) {
            nextContentTitleTranslations = fillOnlyEmptyTranslations(
              nextContentTitleTranslations,
              translations.blog_subtitle,
            );
          }
          if (translations.short_desc) {
            nextShortdescTranslations = fillOnlyEmptyTranslations(
              nextShortdescTranslations,
              translations.short_desc,
            );
          }
          if (translations.long_desc) {
            nextLongdescTranslations = fillOnlyEmptyTranslations(
              nextLongdescTranslations,
              translations.long_desc,
            );
          }
          if (translations.spotlight_title) {
            nextSpotlightTitleTranslations = fillOnlyEmptyTranslations(
              nextSpotlightTitleTranslations,
              translations.spotlight_title,
            );
          }
          if (translations.spotlight_points) {
            nextSpotlightPointsTranslations = fillOnlyEmptyTranslations(
              nextSpotlightPointsTranslations,
              translations.spotlight_points,
            );
          }
        } catch (error) {
          console.error("Failed to backfill blog translations:", error);
        }
      }

      setContentTitleTranslations(nextContentTitleTranslations);
      setShortdescHTMLTranslations(nextShortdescTranslations);
      setLongdescHTMLTranslations(nextLongdescTranslations);
      setSpotlightTitleTranslations(nextSpotlightTitleTranslations);
      setSpotlightPointsTranslations(nextSpotlightPointsTranslations);

      const fd = new FormData();
      const categoryByGroup: Record<Props["group"], string> = {
        ARTICLES: "Articles",
        EVENTS: "Events & Announcements",
        NEWS: "News",
      };

      // Basic fields - match Django model
      fd.append("title", sanitizePlainText(title));
      fd.append("author", sanitizePlainText(author));
      fd.append("date", publishDate);
      fd.append("is_featured", String(isFeatured));
      // Hidden compatibility fields required by backend model.
      fd.append("subtitle", sanitizePlainText(title));
      fd.append("category", sanitizePlainText(categoryByGroup[group]));
      fd.append("blog_subtitle", sanitizePlainText(contentTitle));
      fd.append("spotlight_title", sanitizePlainText(spotlightTitle));
      fd.append("spotlight_points", sanitizeHtml(spotlightPoints));
      fd.append("short_desc", sanitizeHtml(shortdesc));
      fd.append("long_desc", sanitizeHtml(longdesc));
      fd.append("blog_subtitle_fr", sanitizePlainText(nextContentTitleTranslations.fr));
      fd.append("blog_subtitle_es", sanitizePlainText(nextContentTitleTranslations.es));
      fd.append("blog_subtitle_zh", sanitizePlainText(nextContentTitleTranslations.zh));
      fd.append("blog_subtitle_ru", sanitizePlainText(nextContentTitleTranslations.ru));
      fd.append("short_desc_fr", sanitizeHtml(nextShortdescTranslations.fr));
      fd.append("short_desc_es", sanitizeHtml(nextShortdescTranslations.es));
      fd.append("short_desc_zh", sanitizeHtml(nextShortdescTranslations.zh));
      fd.append("short_desc_ru", sanitizeHtml(nextShortdescTranslations.ru));
      fd.append("long_desc_fr", sanitizeHtml(nextLongdescTranslations.fr));
      fd.append("long_desc_es", sanitizeHtml(nextLongdescTranslations.es));
      fd.append("long_desc_zh", sanitizeHtml(nextLongdescTranslations.zh));
      fd.append("long_desc_ru", sanitizeHtml(nextLongdescTranslations.ru));
      fd.append(
        "spotlight_title_fr",
        sanitizePlainText(nextSpotlightTitleTranslations.fr),
      );
      fd.append(
        "spotlight_title_es",
        sanitizePlainText(nextSpotlightTitleTranslations.es),
      );
      fd.append(
        "spotlight_title_zh",
        sanitizePlainText(nextSpotlightTitleTranslations.zh),
      );
      fd.append(
        "spotlight_title_ru",
        sanitizePlainText(nextSpotlightTitleTranslations.ru),
      );
      fd.append("spotlight_points_fr", sanitizeHtml(nextSpotlightPointsTranslations.fr));
      fd.append("spotlight_points_es", sanitizeHtml(nextSpotlightPointsTranslations.es));
      fd.append("spotlight_points_zh", sanitizeHtml(nextSpotlightPointsTranslations.zh));
      fd.append("spotlight_points_ru", sanitizeHtml(nextSpotlightPointsTranslations.ru));

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
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleRegenerateAllTranslations}
          disabled={loading || isRegeneratingTranslations}
          className="px-3 py-2 text-sm rounded border bg-white disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isRegeneratingTranslations
            ? "Regenerating..."
            : "Regenerate All Translations"}
        </button>
      </div>

      {/* Title */}
      <div>
        <label className="font-medium block mb-1">Title *</label>
        <input
          className="border p-2 w-full rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(sanitizePlainText(e.target.value))}
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
          onChange={(e) => setAuthor(sanitizePlainText(e.target.value))}
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
            setShortdesc(sanitizeHtml(html));
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
                      [lang]: sanitizeHtml(html),
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
          onChange={(e) => setContentTitle(sanitizePlainText(e.target.value))}
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
                    [lang]: sanitizePlainText(e.target.value),
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
            setLongdesc(sanitizeHtml(html));
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
                      [lang]: sanitizeHtml(html),
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
          onChange={(e) => setSpotlightTitle(sanitizePlainText(e.target.value))}
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
                    [lang]: sanitizePlainText(e.target.value),
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
          onChange={(html) => setSpotlightPoints(sanitizeHtml(html))}
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
                      [lang]: sanitizeHtml(html),
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
