import { useEffect, useState } from "react";
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
import {
  fetchClinicalServiceTranslationPreview,
  fetchOutpatientCenter,
  updateClinicalServiceImageMeta,
  type ClinicalServiceTranslationPreviewPayload,
} from "@/api/api";
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

const TRANSLATION_LANGS = ["fr", "es", "zh", "ru"] as const;
type TranslationLanguage = (typeof TRANSLATION_LANGS)[number];
type TranslationMap = Record<TranslationLanguage, string>;

const requiredMark = <span className="text-red-600">*</span>;

const clampPercent = (value: number) => Math.max(0, Math.min(100, value));

const toPercentOrDefault = (value: unknown, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? clampPercent(parsed) : fallback;
};

const objectPositionFromFocal = (focalX: number, focalY: number) =>
  `${focalX}% ${focalY}%`;

const isBlank = (value?: string | null) => !value || value.trim() === "";

const hasMissingTranslation = (translations: TranslationMap) =>
  TRANSLATION_LANGS.some((lang) => isBlank(translations[lang]));

const fillOnlyEmptyTranslations = (
  current: TranslationMap,
  incoming?: Partial<Record<TranslationLanguage, string>>,
): TranslationMap => {
  if (!incoming) return current;

  const next: TranslationMap = { ...current };
  for (const lang of TRANSLATION_LANGS) {
    const translatedValue = incoming[lang];
    if (isBlank(next[lang]) && !isBlank(translatedValue)) {
      next[lang] = translatedValue as string;
    }
  }
  return next;
};

const getFeatureTranslationValue = (
  feature: FeatureForm,
  field: "title" | "description",
  lang: TranslationLanguage,
) => feature[`${field}_${lang}` as keyof FeatureForm] as string | undefined;

interface FocalPointEditorProps {
  src: string;
  alt: string;
  focalX: number;
  focalY: number;
  onChange: (focalX: number, focalY: number) => void;
}

const FocalPointEditor: React.FC<FocalPointEditorProps> = ({
  src,
  alt,
  focalX,
  focalY,
  onChange,
}) => {
  const updateFromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const nextX = clampPercent(((event.clientX - rect.left) / rect.width) * 100);
    const nextY = clampPercent(
      ((event.clientY - rect.top) / rect.height) * 100,
    );
    onChange(nextX, nextY);
  };

  return (
    <div className="space-y-2">
      <div
        className="relative w-full max-w-[28rem] aspect-[5/2] rounded border overflow-hidden bg-gray-100 cursor-crosshair touch-none"
        onPointerDown={(event) => {
          event.preventDefault();
          event.currentTarget.setPointerCapture(event.pointerId);
          updateFromPointer(event);
        }}
        onPointerMove={(event) => {
          if (event.pointerType !== "touch" && event.buttons !== 1) return;
          updateFromPointer(event);
        }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover pointer-events-none select-none"
          style={{ objectPosition: objectPositionFromFocal(focalX, focalY) }}
          draggable={false}
        />
        <div
          className="absolute w-3 h-3 rounded-full border-2 border-white bg-red-600 shadow pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${focalX}%`, top: `${focalY}%` }}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
        <label className="block">
          Horizontal ({Math.round(focalX)}%)
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={Math.round(focalX)}
            onChange={(event) => onChange(Number(event.target.value), focalY)}
            className="w-full"
          />
        </label>
        <label className="block">
          Vertical ({Math.round(focalY)}%)
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={Math.round(focalY)}
            onChange={(event) => onChange(focalX, Number(event.target.value))}
            className="w-full"
          />
        </label>
      </div>
      <p className="text-[11px] text-gray-500">
        Horizontal movement is subtle on wide card crops; vertical movement is
        usually more visible.
      </p>
    </div>
  );
};

const ClinicalServiceForm: React.FC<Props> = ({
  initialData,
  onSave,
  onCancel,
  availableDoctors,
}) => {
  type NewImage = {
    file: File;
    alt: string;
    focalX: number;
    focalY: number;
  };

  const [title, setTitle] = useState(initialData?.title || "");
  const [path, setPath] = useState(initialData?.path || "");
  const [tagline, setTagline] = useState(initialData?.tagline || "");
  const [overview, setOverview] = useState(initialData?.overview || "");
  const [detailedDescription, setDetailedDescription] = useState(
    initialData?.detailedDescription || "",
  );

  // Translation states
  const [titleTranslations, setTitleTranslations] = useState<TranslationMap>({
    fr: initialData?.title_fr || "",
    es: initialData?.title_es || "",
    zh: initialData?.title_zh || "",
    ru: initialData?.title_ru || "",
  });

  const [taglineTranslations, setTaglineTranslations] = useState<TranslationMap>({
    fr: initialData?.tagline_fr || "",
    es: initialData?.tagline_es || "",
    zh: initialData?.tagline_zh || "",
    ru: initialData?.tagline_ru || "",
  });

  const [overviewTranslations, setOverviewTranslations] = useState<TranslationMap>({
    fr: initialData?.overview_fr || "",
    es: initialData?.overview_es || "",
    zh: initialData?.overview_zh || "",
    ru: initialData?.overview_ru || "",
  });

  const [detailedDescriptionTranslations, setDetailedDescriptionTranslations] =
    useState<TranslationMap>({
      fr: initialData?.detailedDescription_fr || "",
      es: initialData?.detailedDescription_es || "",
      zh: initialData?.detailedDescription_zh || "",
      ru: initialData?.detailedDescription_ru || "",
    });

  // Track which translation panel is open
  const [openTranslation, setOpenTranslation] = useState<
    "title" | "tagline" | "overview" | "detailedDescription" | null
  >(null);

  const toggleTranslation = (
    field: "title" | "tagline" | "overview" | "detailedDescription",
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
  const [ftOnHomepage, setFtOnHomepage] = useState(
    initialData?.ftOnHomepage ?? false,
  );
  const [images, setImages] = useState<Image[]>(
    (initialData?.images || []).map((img) => ({
      ...img,
      alt: img.alt || "",
      focalX: toPercentOrDefault(img.focalX, 50),
      focalY: toPercentOrDefault(img.focalY, 20),
    })),
  );

  const [locations, setLocations] = useState<string[]>(
    initialData?.locations || [],
  );
  const [locationOptions, setLocationOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const [loading, setLoading] = useState(false);
  const [isAutoFillingTranslations, setIsAutoFillingTranslations] =
    useState(false);
  const [isRegeneratingTranslations, setIsRegeneratingTranslations] =
    useState(false);
  const [errors, setErrors] = useState<{ title?: string; tagline?: string }>(
    {},
  );
  const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);
  const [newImages, setNewImages] = useState<NewImage[]>([]);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const data = await fetchOutpatientCenter();
        const centers = Array.isArray(data)
          ? data
          : (data?.results ?? data?.data ?? []);
        const seen = new Set<string>();
        const options = centers
          .map((center: any) => {
            const name =
              center?.name ??
              center?.title ??
              center?.location ??
              center?.slug ??
              "";
            const label = String(name).trim();
            if (!label || seen.has(label)) return null;
            seen.add(label);
            return { value: label, label };
          })
          .filter(Boolean) as { value: string; label: string }[];
        setLocationOptions(options);

        // Prefill service locations from OPC timings linked to this service id.
        if (initialData?.id) {
          const inferredFromTimings = centers
            .filter((center: any) => {
              const timings = Array.isArray(center?.timings) ? center.timings : [];
              return timings.some((t: any) => {
                const clinicId =
                  t?.clinic ?? t?.clinicId ?? t?.clinic_id ?? t?.clinic?.id;
                return String(clinicId ?? "") === String(initialData.id);
              });
            })
            .map((center: any) =>
              String(
                center?.name ??
                  center?.title ??
                  center?.location ??
                  center?.slug ??
                  "",
              ).trim(),
            )
            .filter((label: string) => label.length > 0);

          if (inferredFromTimings.length > 0) {
            setLocations((prev) => Array.from(new Set([...prev, ...inferredFromTimings])));
          }
        }
      } catch {
        toast.error("Failed to load outpatient centers");
      }
    };

    loadLocations();
  }, [initialData?.id]);

  useEffect(() => {
    const payload: ClinicalServiceTranslationPreviewPayload = {};

    if (!isBlank(title) && hasMissingTranslation(titleTranslations)) {
      payload.title = title;
    }
    if (!isBlank(tagline) && hasMissingTranslation(taglineTranslations)) {
      payload.tagline = tagline;
    }
    if (!isBlank(overview) && hasMissingTranslation(overviewTranslations)) {
      payload.overview = overview;
    }
    if (
      !isBlank(detailedDescription) &&
      hasMissingTranslation(detailedDescriptionTranslations)
    ) {
      payload.detailedDescription = detailedDescription;
    }

    const featuresPayload = features.map((feature) => {
      const featurePayload: { title?: string; description?: string } = {};

      if (
        !isBlank(feature.title) &&
        TRANSLATION_LANGS.some((lang) =>
          isBlank(getFeatureTranslationValue(feature, "title", lang)),
        )
      ) {
        featurePayload.title = feature.title;
      }

      if (
        !isBlank(feature.description) &&
        TRANSLATION_LANGS.some((lang) =>
          isBlank(getFeatureTranslationValue(feature, "description", lang)),
        )
      ) {
        featurePayload.description = feature.description;
      }

      return featurePayload;
    });

    if (featuresPayload.some((feature) => feature.title || feature.description)) {
      payload.features = featuresPayload;
    }

    if (Object.keys(payload).length === 0) {
      return;
    }

    let cancelled = false;
    const timer = window.setTimeout(async () => {
      setIsAutoFillingTranslations(true);
      try {
        const translations =
          await fetchClinicalServiceTranslationPreview(payload);
        if (cancelled) return;

        if (translations.title) {
          setTitleTranslations((prev) =>
            fillOnlyEmptyTranslations(prev, translations.title),
          );
        }
        if (translations.tagline) {
          setTaglineTranslations((prev) =>
            fillOnlyEmptyTranslations(prev, translations.tagline),
          );
        }
        if (translations.overview) {
          setOverviewTranslations((prev) =>
            fillOnlyEmptyTranslations(prev, translations.overview),
          );
        }
        if (translations.detailedDescription) {
          setDetailedDescriptionTranslations((prev) =>
            fillOnlyEmptyTranslations(prev, translations.detailedDescription),
          );
        }

        if (translations.features) {
          setFeatures((prev) =>
            prev.map((feature, index) => {
              const translatedFeature = translations.features?.[index];
              if (!translatedFeature) return feature;

              const nextFeature = { ...feature };
              for (const lang of TRANSLATION_LANGS) {
                const titleKey = `title_${lang}` as keyof FeatureForm;
                const descriptionKey = `description_${lang}` as keyof FeatureForm;
                const translatedTitle = translatedFeature.title?.[lang];
                const translatedDescription =
                  translatedFeature.description?.[lang];

                if (
                  isBlank(nextFeature[titleKey] as string | undefined) &&
                  !isBlank(translatedTitle)
                ) {
                  (nextFeature[titleKey] as string | undefined) =
                    translatedTitle;
                }

                if (
                  isBlank(nextFeature[descriptionKey] as string | undefined) &&
                  !isBlank(translatedDescription)
                ) {
                  (nextFeature[descriptionKey] as string | undefined) =
                    translatedDescription;
                }
              }

              return nextFeature;
            }),
          );
        }
      } catch (error) {
        console.error("Failed to fetch translation preview:", error);
      } finally {
        if (!cancelled) {
          setIsAutoFillingTranslations(false);
        }
      }
    }, 700);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [
    detailedDescription,
    detailedDescriptionTranslations,
    overview,
    overviewTranslations,
    tagline,
    taglineTranslations,
    title,
    titleTranslations,
    features,
  ]);

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
    value: string | number,
  ) => {
    setImages(
      images.map((img, i) => (i === index ? { ...img, [key]: value } : img)),
    );
  };

  const handleImageFocalChange = (
    index: number,
    focalX: number,
    focalY: number,
  ) => {
    setImages((prev) =>
      prev.map((img, i) =>
        i === index ? { ...img, focalX, focalY } : img,
      ),
    );
  };

  const handleNewImageFocalChange = (
    index: number,
    focalX: number,
    focalY: number,
  ) => {
    setNewImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, focalX, focalY } : img)),
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

  const handleRegenerateAllTranslations = async () => {
    const payload: ClinicalServiceTranslationPreviewPayload = {};

    if (!isBlank(title)) payload.title = title;
    if (!isBlank(tagline)) payload.tagline = tagline;
    if (!isBlank(overview)) payload.overview = overview;
    if (!isBlank(detailedDescription)) {
      payload.detailedDescription = detailedDescription;
    }

    const featuresPayload = features.map((feature) => ({
      title: isBlank(feature.title) ? undefined : feature.title,
      description: isBlank(feature.description)
        ? undefined
        : feature.description,
    }));
    if (featuresPayload.some((feature) => feature.title || feature.description)) {
      payload.features = featuresPayload;
    }

    if (Object.keys(payload).length === 0) {
      toast.error("Enter English content first before regenerating.");
      return;
    }

    const shouldContinue = window.confirm(
      "Regenerate all translations from current English content? This will replace existing translated values.",
    );
    if (!shouldContinue) {
      return;
    }

    setIsRegeneratingTranslations(true);
    try {
      const translations =
        await fetchClinicalServiceTranslationPreview(payload);

      if (payload.title) {
        setTitleTranslations((prev) => ({
          fr: translations.title?.fr ?? prev.fr,
          es: translations.title?.es ?? prev.es,
          zh: translations.title?.zh ?? prev.zh,
          ru: translations.title?.ru ?? prev.ru,
        }));
      }

      if (payload.tagline) {
        setTaglineTranslations((prev) => ({
          fr: translations.tagline?.fr ?? prev.fr,
          es: translations.tagline?.es ?? prev.es,
          zh: translations.tagline?.zh ?? prev.zh,
          ru: translations.tagline?.ru ?? prev.ru,
        }));
      }

      if (payload.overview) {
        setOverviewTranslations((prev) => ({
          fr: translations.overview?.fr ?? prev.fr,
          es: translations.overview?.es ?? prev.es,
          zh: translations.overview?.zh ?? prev.zh,
          ru: translations.overview?.ru ?? prev.ru,
        }));
      }

      if (payload.detailedDescription) {
        setDetailedDescriptionTranslations((prev) => ({
          fr: translations.detailedDescription?.fr ?? prev.fr,
          es: translations.detailedDescription?.es ?? prev.es,
          zh: translations.detailedDescription?.zh ?? prev.zh,
          ru: translations.detailedDescription?.ru ?? prev.ru,
        }));
      }

      if (payload.features && translations.features) {
        setFeatures((prev) =>
          prev.map((feature, index) => {
            const translatedFeature = translations.features?.[index];
            if (!translatedFeature) return feature;

            const nextFeature = { ...feature };
            for (const lang of TRANSLATION_LANGS) {
              const titleKey = `title_${lang}` as keyof FeatureForm;
              const descriptionKey = `description_${lang}` as keyof FeatureForm;

              const translatedTitle = translatedFeature.title?.[lang];
              const translatedDescription = translatedFeature.description?.[lang];

              if (!isBlank(translatedTitle)) {
                (nextFeature[titleKey] as string | undefined) = translatedTitle;
              }
              if (!isBlank(translatedDescription)) {
                (nextFeature[descriptionKey] as string | undefined) =
                  translatedDescription;
              }
            }

            return nextFeature;
          }),
        );
      }

      toast.success("Translations regenerated.");
    } catch (error) {
      console.error("Failed to regenerate translations:", error);
      toast.error("Failed to regenerate translations.");
    } finally {
      setIsRegeneratingTranslations(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix errors in the form.");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("title_fr", titleTranslations.fr);
    formData.append("title_es", titleTranslations.es);
    formData.append("title_zh", titleTranslations.zh);
    formData.append("title_ru", titleTranslations.ru);
    formData.append("path", path.trim());
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
    formData.append("ftOnHomepage", String(ftOnHomepage));
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
      formData.append("images_files_focal_x", String(img.focalX));
      formData.append("images_files_focal_y", String(img.focalY));
    });

    // Append IDs of images to delete
    imagesToDelete.forEach((id) => {
      formData.append("images_to_delete", String(id));
    });

    setLoading(true);
    try {
      // Save the service (backend handles new images & deletions)
      const savedService = await onSave(formData);

      // Reflect server-filled translations in the open form immediately.
      if (savedService && typeof savedService === "object") {
        setTitleTranslations((prev) =>
          fillOnlyEmptyTranslations(prev, {
            fr: savedService.title_fr,
            es: savedService.title_es,
            zh: savedService.title_zh,
            ru: savedService.title_ru,
          }),
        );
        setTaglineTranslations((prev) =>
          fillOnlyEmptyTranslations(prev, {
            fr: savedService.tagline_fr,
            es: savedService.tagline_es,
            zh: savedService.tagline_zh,
            ru: savedService.tagline_ru,
          }),
        );
        setOverviewTranslations((prev) =>
          fillOnlyEmptyTranslations(prev, {
            fr: savedService.overview_fr,
            es: savedService.overview_es,
            zh: savedService.overview_zh,
            ru: savedService.overview_ru,
          }),
        );
        setDetailedDescriptionTranslations((prev) =>
          fillOnlyEmptyTranslations(prev, {
            fr: savedService.detailedDescription_fr,
            es: savedService.detailedDescription_es,
            zh: savedService.detailedDescription_zh,
            ru: savedService.detailedDescription_ru,
          }),
        );

        if (Array.isArray(savedService.features_read)) {
          setFeatures((prev) =>
            prev.map((feature, index) => {
              const savedFeature = savedService.features_read?.[index];
              if (!savedFeature) return feature;

              const nextFeature = { ...feature };
              for (const lang of TRANSLATION_LANGS) {
                const titleKey = `title_${lang}` as keyof FeatureForm;
                const descriptionKey = `description_${lang}` as keyof FeatureForm;

                const savedTitle = savedFeature[titleKey] as string | undefined;
                const savedDescription = savedFeature[descriptionKey] as
                  | string
                  | undefined;

                if (
                  isBlank(nextFeature[titleKey] as string | undefined) &&
                  !isBlank(savedTitle)
                ) {
                  (nextFeature[titleKey] as string | undefined) = savedTitle;
                }
                if (
                  isBlank(nextFeature[descriptionKey] as string | undefined) &&
                  !isBlank(savedDescription)
                ) {
                  (nextFeature[descriptionKey] as string | undefined) =
                    savedDescription;
                }
              }

              return nextFeature;
            }),
          );
        }
      }

      // Update metadata for existing images (alt + focal point)
      for (const img of images) {
        if (img.id && img.alt !== undefined) {
          try {
            await updateClinicalServiceImageMeta(img.id, {
              alt: img.alt,
              focalX: toPercentOrDefault(img.focalX, 50),
              focalY: toPercentOrDefault(img.focalY, 20),
            });
          } catch (err) {
            console.error("Failed to update image metadata:", img.id);
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
      {isAutoFillingTranslations && (
        <p className="text-xs text-blue-600">
          Auto-filling empty translation fields...
        </p>
      )}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleRegenerateAllTranslations}
          disabled={loading || isRegeneratingTranslations}
          className={`px-3 py-2 text-sm rounded border ${
            loading || isRegeneratingTranslations
              ? "text-gray-400 border-gray-300 cursor-not-allowed"
              : "text-blue-700 border-blue-300 hover:bg-blue-50"
          }`}
        >
          {isRegeneratingTranslations
            ? "Regenerating translations..."
            : "Regenerate all translations"}
        </button>
      </div>

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

        <button
          type="button"
          className="text-blue-600 text-sm underline mt-1 block"
          onClick={() => toggleTranslation("title")}
        >
          {openTranslation === "title"
            ? "Hide Title Translations"
            : "Show Title Translations"}
        </button>

        {openTranslation === "title" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            {(["fr", "es", "zh", "ru"] as const).map((lang) => (
              <input
                key={`title-${lang}`}
                type="text"
                className="border p-2 w-full"
                placeholder={`Title (${lang})`}
                value={titleTranslations[lang]}
                onChange={(e) =>
                  setTitleTranslations((prev) => ({
                    ...prev,
                    [lang]: e.target.value,
                  }))
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Path */}
      <div>
        <label className="font-semibold">
          Path (URL slug)
          <input
            type="text"
            className="border p-2 w-full"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            placeholder="e.g. accident-emergency or /clinical-services/accident-emergency"
          />
        </label>
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

        <button
          type="button"
          className="text-blue-600 text-sm underline mt-1 block"
          onClick={() => toggleTranslation("tagline")}
        >
          {openTranslation === "tagline"
            ? "Hide Tagline Translations"
            : "Show Tagline Translations"}
        </button>

        {openTranslation === "tagline" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            {(["fr", "es", "zh", "ru"] as const).map((lang) => (
              <input
                key={`tagline-${lang}`}
                type="text"
                className="border p-2 w-full"
                placeholder={`Tagline (${lang})`}
                value={taglineTranslations[lang]}
                onChange={(e) =>
                  setTaglineTranslations((prev) => ({
                    ...prev,
                    [lang]: e.target.value,
                  }))
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Overview */}
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
              <RichTextEditor
                value={f.description || ""}
                onChange={(html) => {
                  handleFeatureChange(i, "description", html);
                }}
                placeholder="Enter feature description here..."
                minHeight="200px"
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
          <div key={`existing-${i}`} className="border rounded p-3 mb-3">
            <div className="flex flex-col md:flex-row gap-3 md:items-start">
              {img.url && (
                <FocalPointEditor
                  src={img.url}
                  alt={img.alt || ""}
                  focalX={toPercentOrDefault(img.focalX, 50)}
                  focalY={toPercentOrDefault(img.focalY, 20)}
                  onChange={(focalX, focalY) =>
                    handleImageFocalChange(i, focalX, focalY)
                  }
                />
              )}

              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  placeholder="Alt text"
                  className="border p-2 w-full"
                  value={img.alt}
                  onChange={(e) => handleImageChange(i, "alt", e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  Drag on preview to set image focus.
                </p>
              </div>

              <button
                type="button"
                onClick={() => removeImage(i)}
                className="text-red-500 cursor-pointer"
              >
                ✕ Remove
              </button>
            </div>
          </div>
        ))}

        {/* New images (not yet saved) */}
        {newImages.map((img, idx) => (
          <div key={`new-${idx}`} className="border rounded p-3 mb-3">
            <div className="flex flex-col md:flex-row gap-3 md:items-start">
              <FocalPointEditor
                src={URL.createObjectURL(img.file)}
                alt={img.alt || ""}
                focalX={img.focalX}
                focalY={img.focalY}
                onChange={(focalX, focalY) =>
                  handleNewImageFocalChange(idx, focalX, focalY)
                }
              />

              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  placeholder="Alt text"
                  className="border p-2 w-full"
                  value={img.alt}
                  onChange={(e) =>
                    setNewImages((prev) =>
                      prev.map((ni, i) =>
                        i === idx ? { ...ni, alt: e.target.value } : ni,
                      ),
                    )
                  }
                />
                <p className="text-xs text-gray-500">
                  Drag on preview to set image focus.
                </p>
              </div>

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
              focalX: 50,
              focalY: 20,
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

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={ftOnHomepage}
            onChange={(e) => setFtOnHomepage(e.target.checked)}
          />
          FT on homepage
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
