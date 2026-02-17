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
    ? row.image.map((img: string) => toMediaUrl(img)).filter(Boolean)
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

  const galleryImages = useMemo(() => {
    if (!csrItem) return [] as string[];
    if (csrItem.image.length > 0) return csrItem.image;
    return csrItem.coverImage ? [csrItem.coverImage] : [];
  }, [csrItem]);

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

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
        <div className="bg-white rounded-2xl shadow p-8">
          <h1 className="text-3xl font-serif text-gray-900 mb-3">
            {csrItem.title}
          </h1>

          {csrItem.author && (
            <p className="text-sm text-gray-500 mb-6">By {csrItem.author}</p>
          )}

          {csrItem.shortdesc && (
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  addClassesToDescription(csrItem.shortdesc) ?? "",
                ),
              }}
              className="prose prose-gray max-w-none text-gray-700 mb-6 prose-ul:list-disc prose-ol:list-decimal prose-ul:pl-6 prose-ol:pl-6"
            ></div>
          )}

          {csrItem.longdesc && (
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  addClassesToDescription(csrItem.longdesc) ?? "",
                ),
              }}
              className="prose prose-gray max-w-none text-gray-700 prose-ul:list-disc prose-ol:list-decimal prose-ul:pl-6 prose-ol:pl-6"
            ></div>
          )}
        </div>

        {galleryImages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((imageUrl, index) => (
              <div
                key={`${csrItem.id}-${index}`}
                className="bg-white rounded-2xl overflow-hidden shadow"
              >
                <img
                  src={imageUrl}
                  alt={`${csrItem.title} ${index + 1}`}
                  className="w-full h-56 object-cover"
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
