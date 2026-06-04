import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import Heading from "@/components/Heading";
import { fetchCsrById } from "@/api/api";
import DOMPurify from "dompurify";
import { addClassesToDescription } from "@/components/services/utilities";

type CsrItem = {
  id: string;
  author: string;
  title: string;
  subtitle: string;
  blogsubtitle: string;
  description: string;
  shortdesc: string;
  longdesc: string;
  coverImage: string;
  image: string[];
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

const toMediaUrl = (url?: string | null) => {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  try {
    if (apiBaseUrl) return new URL(url, apiBaseUrl).toString();
  } catch {
    // no-op
  }
  return url;
};

const normalizeCsr = (row: any): CsrItem => {
  const coverImage = toMediaUrl(row?.coverImage || row?.cover_image || "");
  const images = Array.isArray(row?.image)
    ? row.image
        .map((img: string | { url?: string }) =>
          typeof img === "string" ? toMediaUrl(img) : toMediaUrl(img?.url),
        )
        .filter(Boolean)
    : coverImage
      ? [coverImage]
      : [];

  return {
    id: String(row?.id ?? ""),
    author: row?.author ?? "",
    title: row?.title ?? "",
    subtitle: row?.subtitle ?? "",
    blogsubtitle: row?.blogsubtitle ?? row?.blog_subtitle ?? "",
    description: row?.description ?? "",
    shortdesc: row?.shortdesc ?? row?.short_desc ?? "",
    longdesc: row?.longdesc ?? row?.long_desc ?? "",
    coverImage,
    image: images,
  };
};

const GalleryGrid = ({
  images,
  title,
}: {
  images: string[];
  title: string;
}) => {
  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="max-w-2xl mx-auto">
        <img
          src={images[0]}
          alt={`${title} 1`}
          className="w-full rounded-xl object-cover max-h-[520px]"
        />
      </div>
    );
  }

  if (images.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {images.map((url, i) => (
          <img
            key={i}
            src={url}
            alt={`${title} ${i + 1}`}
            className="w-full rounded-xl object-cover aspect-[4/3]"
          />
        ))}
      </div>
    );
  }

  if (images.length === 3) {
    return (
      <div className="grid grid-cols-2 gap-3">
        <img
          src={images[0]}
          alt={`${title} 1`}
          className="col-span-2 w-full rounded-xl object-cover aspect-[16/7]"
        />
        {images.slice(1).map((url, i) => (
          <img
            key={i}
            src={url}
            alt={`${title} ${i + 2}`}
            className="w-full rounded-xl object-cover aspect-[4/3]"
          />
        ))}
      </div>
    );
  }

  if (images.length === 4) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {images.map((url, i) => (
          <img
            key={i}
            src={url}
            alt={`${title} ${i + 1}`}
            className="w-full rounded-xl object-cover aspect-[4/3]"
          />
        ))}
      </div>
    );
  }

  // 5+ images: first spans full width, rest fill a 3-col grid
  return (
    <div className="space-y-3">
      <img
        src={images[0]}
        alt={`${title} 1`}
        className="w-full rounded-xl object-cover aspect-[16/7]"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.slice(1).map((url, i) => (
          <img
            key={i}
            src={url}
            alt={`${title} ${i + 2}`}
            className="w-full rounded-xl object-cover aspect-square"
          />
        ))}
      </div>
    </div>
  );
};

const CsrDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [csrItem, setCsrItem] = useState<CsrItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("CSR post not found.");
      setLoading(false);
      return;
    }

    const loadCsrDetail = async () => {
      try {
        setLoading(true);
        const data = await fetchCsrById(id);
        setCsrItem(normalizeCsr(data));
        setError(null);
      } catch (err: any) {
        setError(err?.message || "Failed to load CSR post.");
      } finally {
        setLoading(false);
      }
    };

    loadCsrDetail();
  }, [id]);

  const coverImage = csrItem?.coverImage ?? "";

  const galleryImages = useMemo(() => {
    if (!csrItem) return [] as string[];
    const images = Array.isArray(csrItem.image) ? csrItem.image : [];
    // include all images; cover will show in article hero so exclude it from gallery
    return images.filter((url) => Boolean(url) && url !== coverImage);
  }, [csrItem, coverImage]);

  if (loading) {
    return <div className="py-20 text-center text-gray-600">Loading...</div>;
  }

  if (error || !csrItem) {
    return (
      <div className="py-20 text-center text-red-600">
        {error || "CSR post not found."}
      </div>
    );
  }

  const hasBody = Boolean(csrItem.shortdesc || csrItem.longdesc);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <Heading
        image_url={csrItem.coverImage || undefined}
        title={csrItem.title || "Corporate Social Responsibility"}
        description={
          csrItem.blogsubtitle ||
          csrItem.subtitle ||
          "Prioritizing initiatives that create measurable social impact."
        }
        style="background"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {/* Article meta */}
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-red-700 font-semibold">
            CSR Story
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
            {csrItem.title}
          </h1>
          {csrItem.author && (
            <p className="text-sm text-gray-500">By {csrItem.author}</p>
          )}
        </div>

        {/* Cover image hero — only shown when no gallery images so it isn't duplicated */}
        {coverImage && galleryImages.length === 0 && (
          <div className="w-full overflow-hidden rounded-2xl">
            <img
              src={coverImage}
              alt={csrItem.title || "CSR cover"}
              className="w-full object-cover max-h-[480px]"
            />
          </div>
        )}

        {/* Article body */}
        {hasBody && (
          <div className="space-y-6">
            {csrItem.shortdesc && (
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    addClassesToDescription(csrItem.shortdesc) ?? "",
                  ),
                }}
                className="text-lg leading-relaxed text-gray-700 prose prose-gray max-w-none prose-ul:list-disc prose-ol:list-decimal prose-ul:pl-6 prose-ol:pl-6"
              />
            )}

            {csrItem.shortdesc && csrItem.longdesc && (
              <hr className="border-gray-200" />
            )}

            {csrItem.longdesc && (
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    addClassesToDescription(csrItem.longdesc) ?? "",
                  ),
                }}
                className="prose prose-gray max-w-none text-gray-700 leading-relaxed prose-ul:list-disc prose-ol:list-decimal prose-ul:pl-6 prose-ol:pl-6"
              />
            )}
          </div>
        )}

        {/* Photo gallery */}
        {galleryImages.length > 0 && (
          <div className="space-y-4 pt-2">
            <h2 className="text-lg font-semibold text-gray-900">
              Photo Gallery
            </h2>
            <GalleryGrid images={galleryImages} title={csrItem.title} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CsrDetail;
