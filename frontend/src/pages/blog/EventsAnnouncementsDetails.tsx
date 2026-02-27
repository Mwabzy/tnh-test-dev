import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { addClassesToDescription } from "@/components/services/utilities";
import { fetchBlogPostById } from "@/api/api";
import { sanitizeHtml } from "@/lib/sanitizeHtml";

type EventAnnouncementDetail = {
  title?: string;
  subtitle?: string;
  blog_subtitle?: string;
  author?: string;
  category?: string;
  spotlight_title?: string;
  image?: string;
  cover_image?: string;
  shortdesc?: string;
  short_desc?: string;
  longdesc?: string;
  long_desc?: string;
};

const EventsAnnouncementsDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState<EventAnnouncementDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItem = async () => {
      if (!id) {
        setItem(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchBlogPostById(id);
        setItem(data ?? null);
      } catch {
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    loadItem();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center text-gray-600">
        Loading event or announcement...
      </div>
    );
  }

  if (!item) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-3">
          Event or announcement not found
        </h1>
        <p className="text-gray-600 mb-6">
          The requested item does not exist or has been removed.
        </p>
        <Link
          to="/events-announcements"
          className="inline-flex items-center px-4 py-2 rounded-md bg-red-900 text-white hover:bg-red-800"
        >
          Back to Events & Announcements
        </Link>
      </div>
    );
  }

  const heroImage = item.cover_image || item.image || "";
  const subtitleText = String(item.subtitle || item.title || "");
  const shortDescription = item.shortdesc || item.short_desc || "";
  const longDescription = item.longdesc || item.long_desc || "";
  const contentTitle = String(
    item.blog_subtitle || item.spotlight_title || "Content Title",
  );

  return (
    <div>
      <div
        className="relative h-[40vh] bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage: heroImage ? `url(${heroImage})` : undefined,
        }}
      >
        <div className="absolute inset-0 bg-black/50 bg-opacity-70"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <div className="mb-6">
            <span className="inline-flex items-center bg-white bg-opacity-10 text-sm font-bold text-black px-4 py-1 rounded-full">
              {item.category || "Events & Announcements"}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {subtitleText.split(" ").map((word, i) =>
              i > 0 && i % 6 === 0 ? (
                <>
                  <br key={i} /> {word}{" "}
                </>
              ) : (
                ` ${word}`
              ),
            )}
          </h1>

          <h2 className="text-lg md:text-xl">{item.author}</h2>
        </div>
      </div>

      <div className="max-w-3xl md:max-w-6xl mx-auto px-4 py-16 space-y-16 text-gray-800">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            {item.title}
          </h2>
          <div
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(
                addClassesToDescription(shortDescription || "") ?? "",
              ),
            }}
            className="prose prose-gray max-w-none text-lg text-gray-700 leading-relaxed prose-ul:list-disc prose-ol:list-decimal prose-ul:pl-6 prose-ol:pl-6"
          ></div>
        </div>

        <div>
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            {contentTitle}
          </h3>
          <div
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(
                addClassesToDescription(longDescription || "") ?? "",
              ),
            }}
            className="prose prose-gray max-w-none text-lg text-gray-700 leading-relaxed prose-ul:list-disc prose-ol:list-decimal prose-ul:pl-6 prose-ol:pl-6"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default EventsAnnouncementsDetails;
