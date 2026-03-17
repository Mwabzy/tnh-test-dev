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

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
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

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
        <div className="bg-white rounded-2xl shadow p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-start">
            <div className="relative overflow-hidden rounded-2xl bg-slate-100 aspect-[4/3] lg:aspect-[5/6]">
              {coverImage ? (
                <img
                  src={coverImage}
                  alt={csrItem.title || "CSR cover"}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200" />
              )}
            </div>

            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.25em] text-red-700 font-semibold">
                CSR Story
              </p>
              <h1 className="text-3xl font-serif text-gray-900">
                {csrItem.title}
              </h1>

              {csrItem.author && (
                <p className="text-sm text-gray-500">By {csrItem.author}</p>
              )}

              {csrItem.shortdesc && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      addClassesToDescription(csrItem.shortdesc) ?? "",
                    ),
                  }}
                  className="prose prose-gray max-w-none text-gray-700 prose-ul:list-disc prose-ol:list-decimal prose-ul:pl-6 prose-ol:pl-6"
                ></div>
              )}
            </div>
          </div>

          {csrItem.longdesc && (
            <div className="mt-8 pt-8 border-t border-slate-200">
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    addClassesToDescription(csrItem.longdesc) ?? "",
                  ),
                }}
                className="prose prose-gray max-w-none text-gray-700 prose-ul:list-disc prose-ol:list-decimal prose-ul:pl-6 prose-ol:pl-6"
              ></div>
            </div>
          )}
        </div>

        {galleryImages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((imageUrl, index) => (
              <div
                key={`${csrItem.id}-${index}`}
                className={`bg-white rounded-2xl overflow-hidden shadow ${
                  index === 0 ? "sm:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <img
                  src={imageUrl}
                  alt={`${csrItem.title} ${index + 1}`}
                  className="w-full h-full object-cover aspect-[4/3]"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CsrDetail;
