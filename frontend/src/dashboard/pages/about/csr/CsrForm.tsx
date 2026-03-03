import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CSR } from "@/types";
import RegenerateTranslationsButton from "@/dashboard/components/RegenerateTranslationsButton";
import RichTextEditor from "@/components/RichTextEditor";
import { fetchCsrTranslationPreview } from "@/api/api";
import { sanitizeHtml, sanitizePlainText } from "@/lib/sanitizeHtml";

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

type ExistingImage = {
  id: number;
  url: string;
  alt: string;
};

type NewImage = {
  file: File;
  alt: string;
};

const requiredMark = <span className="text-red-600">*</span>;

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

const CsrForm: React.FC<Props> = ({ initialData, onSave, onCancel }) => {
  const [author, setAuthor] = useState(initialData?.author || "");
  const [title, setTitle] = useState(initialData?.title || "");
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || "");
  const [blogsubtitle, setBlogsubtitle] = useState(
    initialData?.blogsubtitle || initialData?.blog_subtitle || "",
  );

  const [shortdesc, setShortdesc] = useState(
    initialData?.shortdesc || initialData?.short_desc || "",
  );
  const [longdesc, setLongdesc] = useState(
    initialData?.longdesc || initialData?.long_desc || "",
  );
  const [description, setDescription] = useState(initialData?.description || "");

  const [descriptionTranslations, setDescriptionTranslations] = useState<TranslationMap>({
    fr: initialData?.description_fr || "",
    es: initialData?.description_es || "",
    zh: initialData?.description_zh || "",
    ru: initialData?.description_ru || "",
  });

  const [shortdescTranslations, setShortdescTranslations] = useState<TranslationMap>({
    fr: initialData?.shortdesc_fr || initialData?.short_desc_fr || "",
    es: initialData?.shortdesc_es || initialData?.short_desc_es || "",
    zh: initialData?.shortdesc_zh || initialData?.short_desc_zh || "",
    ru: initialData?.shortdesc_ru || initialData?.short_desc_ru || "",
  });

  const [longdescTranslations, setLongdescTranslations] = useState<TranslationMap>({
    fr: initialData?.longdesc_fr || initialData?.long_desc_fr || "",
    es: initialData?.longdesc_es || initialData?.long_desc_es || "",
    zh: initialData?.longdesc_zh || initialData?.long_desc_zh || "",
    ru: initialData?.longdesc_ru || initialData?.long_desc_ru || "",
  });

  const [openTranslation, setOpenTranslation] = useState<
    "description" | "shortdesc" | "longdesc" | null
  >(null);

  const toggleTranslation = (
    field: "description" | "shortdesc" | "longdesc",
  ) => {
    setOpenTranslation((prev) => (prev === field ? null : field));
  };

  const [coverImage, setCoverImage] = useState<ImageState | null>(
    initialData?.coverImage || initialData?.cover_image
      ? {
          url: initialData.coverImage || initialData.cover_image,
          alt: (initialData as any).cover_image_alt || "",
        }
      : null,
  );
  const [deleteCoverImage, setDeleteCoverImage] = useState(false);

  const [images, setImages] = useState<ExistingImage[]>(
    Array.isArray(initialData?.image)
      ? initialData.image
          .map((img) => ({
            id: Number(img.id),
            url: img.url,
            alt: img.alt || "",
          }))
          .filter((img) => Number.isFinite(img.id) && Boolean(img.url))
      : [],
  );
  const [newImages, setNewImages] = useState<NewImage[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);

  const [loading, setLoading] = useState(false);
  const [isRegeneratingTranslations, setIsRegeneratingTranslations] =
    useState(false);
  const [errors, setErrors] = useState<{ author?: string; title?: string }>({});

  useEffect(() => {
    const payload: {
      description?: string;
      short_desc?: string;
      long_desc?: string;
    } = {};

    if (!isBlank(description) && hasMissingTranslation(descriptionTranslations)) {
      payload.description = sanitizeHtml(description);
    }
    if (!isBlank(shortdesc) && hasMissingTranslation(shortdescTranslations)) {
      payload.short_desc = sanitizeHtml(shortdesc);
    }
    if (!isBlank(longdesc) && hasMissingTranslation(longdescTranslations)) {
      payload.long_desc = sanitizeHtml(longdesc);
    }

    if (Object.keys(payload).length === 0) return;

    let cancelled = false;
    const timer = window.setTimeout(async () => {
      try {
        const translations = await fetchCsrTranslationPreview(payload);
        if (cancelled) return;

        if (translations.description) {
          setDescriptionTranslations((prev) =>
            fillOnlyEmptyTranslations(prev, translations.description),
          );
        }
        if (translations.short_desc) {
          setShortdescTranslations((prev) =>
            fillOnlyEmptyTranslations(prev, translations.short_desc),
          );
        }
        if (translations.long_desc) {
          setLongdescTranslations((prev) =>
            fillOnlyEmptyTranslations(prev, translations.long_desc),
          );
        }
      } catch (error) {
        console.error("Failed to auto-fill CSR translations:", error);
      }
    }, 700);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [
    description,
    descriptionTranslations,
    shortdesc,
    shortdescTranslations,
    longdesc,
    longdescTranslations,
  ]);

  const validate = () => {
    const errs: { author?: string; title?: string } = {};
    if (!author.trim()) errs.author = "Author is required";
    if (!title.trim()) errs.title = "Title is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const renderCoverImage = (
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
            placeholder="Cover image alt text"
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
            x
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
        + Add Cover Image
      </button>
    </div>
  );

  const handleGalleryImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const selected = Array.from(e.target.files).map((file) => ({
      file,
      alt: "",
    }));
    setNewImages((prev) => [...prev, ...selected]);
    e.target.value = "";
  };

  const updateExistingAlt = (index: number, alt: string) => {
    setImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, alt } : img)),
    );
  };

  const removeExistingImage = (index: number) => {
    setImages((prev) => {
      const target = prev[index];
      if (target?.id != null) {
        setImagesToDelete((ids) => [...ids, target.id]);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const removeNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRegenerateAllTranslations = async () => {
    const payload: {
      description?: string;
      short_desc?: string;
      long_desc?: string;
    } = {};

    if (!isBlank(description)) payload.description = sanitizeHtml(description);
    if (!isBlank(shortdesc)) payload.short_desc = sanitizeHtml(shortdesc);
    if (!isBlank(longdesc)) payload.long_desc = sanitizeHtml(longdesc);

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
      const translations = await fetchCsrTranslationPreview(payload);

      if (payload.description) {
        setDescriptionTranslations((prev) => ({
          fr: translations.description?.fr ?? prev.fr,
          es: translations.description?.es ?? prev.es,
          zh: translations.description?.zh ?? prev.zh,
          ru: translations.description?.ru ?? prev.ru,
        }));
      }

      if (payload.short_desc) {
        setShortdescTranslations((prev) => ({
          fr: translations.short_desc?.fr ?? prev.fr,
          es: translations.short_desc?.es ?? prev.es,
          zh: translations.short_desc?.zh ?? prev.zh,
          ru: translations.short_desc?.ru ?? prev.ru,
        }));
      }

      if (payload.long_desc) {
        setLongdescTranslations((prev) => ({
          fr: translations.long_desc?.fr ?? prev.fr,
          es: translations.long_desc?.es ?? prev.es,
          zh: translations.long_desc?.zh ?? prev.zh,
          ru: translations.long_desc?.ru ?? prev.ru,
        }));
      }

      toast.success("Translations regenerated.");
    } catch (error) {
      console.error("Failed to regenerate CSR translations:", error);
      toast.error("Failed to regenerate translations.");
    } finally {
      setIsRegeneratingTranslations(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return toast.error("Fix form errors");

    setLoading(true);

    try {
      let nextDescriptionTranslations = { ...descriptionTranslations };
      let nextShortdescTranslations = { ...shortdescTranslations };
      let nextLongdescTranslations = { ...longdescTranslations };

      const previewPayload: {
        description?: string;
        short_desc?: string;
        long_desc?: string;
      } = {};
      if (!isBlank(description) && hasMissingTranslation(nextDescriptionTranslations)) {
        previewPayload.description = sanitizeHtml(description);
      }
      if (!isBlank(shortdesc) && hasMissingTranslation(nextShortdescTranslations)) {
        previewPayload.short_desc = sanitizeHtml(shortdesc);
      }
      if (!isBlank(longdesc) && hasMissingTranslation(nextLongdescTranslations)) {
        previewPayload.long_desc = sanitizeHtml(longdesc);
      }

      if (Object.keys(previewPayload).length > 0) {
        try {
          const translations = await fetchCsrTranslationPreview(previewPayload);
          if (translations.description) {
            nextDescriptionTranslations = fillOnlyEmptyTranslations(
              nextDescriptionTranslations,
              translations.description,
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
        } catch (error) {
          console.error("Failed to backfill CSR translations:", error);
        }
      }

      setDescriptionTranslations(nextDescriptionTranslations);
      setShortdescTranslations(nextShortdescTranslations);
      setLongdescTranslations(nextLongdescTranslations);

      const fd = new FormData();
      fd.append("author", sanitizePlainText(author));
      fd.append("title", sanitizePlainText(title));
      fd.append("subtitle", sanitizePlainText(subtitle));
      fd.append("blog_subtitle", sanitizePlainText(blogsubtitle));

      fd.append("short_desc", sanitizeHtml(shortdesc));
      fd.append("long_desc", sanitizeHtml(longdesc));
      fd.append("description", sanitizeHtml(description));

      fd.append("description_fr", sanitizeHtml(nextDescriptionTranslations.fr));
      fd.append("description_es", sanitizeHtml(nextDescriptionTranslations.es));
      fd.append("description_zh", sanitizeHtml(nextDescriptionTranslations.zh));
      fd.append("description_ru", sanitizeHtml(nextDescriptionTranslations.ru));

      fd.append("short_desc_fr", sanitizeHtml(nextShortdescTranslations.fr));
      fd.append("short_desc_es", sanitizeHtml(nextShortdescTranslations.es));
      fd.append("short_desc_zh", sanitizeHtml(nextShortdescTranslations.zh));
      fd.append("short_desc_ru", sanitizeHtml(nextShortdescTranslations.ru));

      fd.append("long_desc_fr", sanitizeHtml(nextLongdescTranslations.fr));
      fd.append("long_desc_es", sanitizeHtml(nextLongdescTranslations.es));
      fd.append("long_desc_zh", sanitizeHtml(nextLongdescTranslations.zh));
      fd.append("long_desc_ru", sanitizeHtml(nextLongdescTranslations.ru));

      if (coverImage?.file) {
        fd.append("cover_image_file", coverImage.file);
        fd.append("cover_image_alt", coverImage.alt);
      } else if (coverImage?.url && !deleteCoverImage) {
        fd.append("cover_image_alt", coverImage.alt);
      }

      if (deleteCoverImage) {
        fd.append("cover_image_delete", "true");
      }

      images.forEach((img, index) => {
        fd.append(`images[${index}][id]`, String(img.id));
        fd.append(`images[${index}][alt]`, img.alt || "");
      });

      newImages.forEach((img) => {
        fd.append("images_files", img.file);
        fd.append("images_files_alt", img.alt || "");
      });

      imagesToDelete.forEach((id) => {
        fd.append("images_to_delete", String(id));
      });

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
      <div className="flex justify-end">
        <RegenerateTranslationsButton
          onClick={handleRegenerateAllTranslations}
          disabled={loading || isRegeneratingTranslations}
          isLoading={isRegeneratingTranslations}
        />
      </div>

      <div>
        <label className="font-semibold">Author {requiredMark}</label>
        <input
          className="border p-2 w-full"
          placeholder="Enter author name"
          value={author}
          onChange={(e) => setAuthor(sanitizePlainText(e.target.value))}
        />
        {errors.author && <p className="text-red-600 text-sm">{errors.author}</p>}
      </div>

      <div>
        <label className="font-semibold">Title {requiredMark}</label>
        <input
          className="border p-2 w-full"
          placeholder="Enter CSR title"
          value={title}
          onChange={(e) => setTitle(sanitizePlainText(e.target.value))}
        />
        {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
      </div>

      <div>
        <label className="font-semibold">Subtitle</label>
        <input
          className="border p-2 w-full"
          placeholder="Enter subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(sanitizePlainText(e.target.value))}
        />
      </div>

      <div>
        <label className="font-semibold">Blog Subtitle</label>
        <input
          className="border p-2 w-full"
          placeholder="Enter blog subtitle"
          value={blogsubtitle}
          onChange={(e) => setBlogsubtitle(sanitizePlainText(e.target.value))}
        />
      </div>

      <div>
        <label className="font-semibold">Short Description</label>
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
                  onChange={(html) => {
                    setShortdescTranslations((prev) => ({
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
        <label className="font-semibold">Long Description</label>
        <RichTextEditor
          value={longdesc}
          onChange={(html) => {
            setLongdesc(sanitizeHtml(html));
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
                  onChange={(html) => {
                    setLongdescTranslations((prev) => ({
                      ...prev,
                      [lang]: sanitizeHtml(html),
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

      <div>
        <label className="font-semibold">Description</label>
        <RichTextEditor
          value={description}
          onChange={(html) => {
            setDescription(sanitizeHtml(html));
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
                  onChange={(html) => {
                    setDescriptionTranslations((prev) => ({
                      ...prev,
                      [lang]: sanitizeHtml(html),
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

      {renderCoverImage(
        "Cover Image",
        coverImage,
        setCoverImage,
        setDeleteCoverImage,
        "csr-cover-upload",
      )}

      <div>
        <label className="font-semibold">Gallery Images</label>

        {images.map((img, i) => (
          <div key={`existing-${img.id}-${i}`} className="flex gap-2 items-center mt-2">
            <img
              src={img.url}
              className="w-20 h-20 object-cover border"
              alt={img.alt || "Preview"}
            />
            <input
              className="border p-2 grow"
              placeholder="Image alt text"
              value={img.alt}
              onChange={(e) => updateExistingAlt(i, e.target.value)}
            />
            <button
              type="button"
              className="text-red-500"
              onClick={() => removeExistingImage(i)}
            >
              x Remove
            </button>
          </div>
        ))}

        {newImages.map((img, i) => (
          <div key={`new-${i}`} className="flex gap-2 items-center mt-2">
            <img
              src={URL.createObjectURL(img.file)}
              className="w-20 h-20 object-cover border"
              alt={img.alt || "Preview"}
            />
            <input
              className="border p-2 grow"
              placeholder="Image alt text"
              value={img.alt}
              onChange={(e) =>
                setNewImages((prev) =>
                  prev.map((entry, idx) =>
                    idx === i ? { ...entry, alt: e.target.value } : entry,
                  ),
                )
              }
            />
            <button
              type="button"
              className="text-red-500"
              onClick={() => removeNewImage(i)}
            >
              x Remove
            </button>
          </div>
        ))}

        <input
          type="file"
          hidden
          id="csr-gallery-upload"
          accept="image/*"
          multiple
          onChange={handleGalleryImageSelect}
        />

        <button
          type="button"
          className="text-blue-600 underline text-sm mt-2"
          onClick={() => document.getElementById("csr-gallery-upload")?.click()}
        >
          + Add Images
        </button>
      </div>

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
