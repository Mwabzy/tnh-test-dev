import { Link, useParams } from "react-router";
import { addClassesToDescription } from "@/components/services/utilities";
import { useEffect, useState } from "react";
import { fetchBlogPostById } from "@/api/api";
import { sanitizeHtml } from "@/lib/sanitizeHtml";
import { BlogDetailSkeleton } from "@/components/layout/page-skeletons";
import { applyDocumentSeo, trimMetaDescription } from "@/lib/seoDom";

type BlogPostDetail = {
  id?: string;
  title?: string;
  subtitle?: string;
  blog_subtitle?: string;
  author?: string;
  category?: string;
  image?: string;
  cover_image?: string;
  shortdesc?: string;
  short_desc?: string;
  longdesc?: string;
  long_desc?: string;
  spotlight_title?: string;
  spotlight_title_fr?: string;
  spotlight_title_es?: string;
  spotlight_title_zh?: string;
  spotlight_title_ru?: string;
  spotlight_points?: string;
  spotlight_points_fr?: string;
  spotlight_points_es?: string;
  spotlight_points_zh?: string;
  spotlight_points_ru?: string;
};

const BlogDetail = () => {
  const { id } = useParams();
  const [blogItem, setBlogItem] = useState<BlogPostDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogPost = async () => {
      if (!id) {
        setBlogItem(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchBlogPostById(id);
        setBlogItem(data ?? null);
      } catch {
        setBlogItem(null);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPost();
  }, [id]);

  if (loading) {
    return <BlogDetailSkeleton />;
  }

  if (!blogItem) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-3">
          Blog post not found
        </h1>
        <p className="text-gray-600 mb-6">
          The requested post does not exist or has been removed.
        </p>
        <Link
          to="/blogs"
          className="inline-flex items-center px-4 py-2 rounded-md bg-red-900 text-white hover:bg-red-800"
        >
          Back to Blogs
        </Link>
      </div>
    );
  }

  const heroImage = blogItem.cover_image || blogItem.image || "";
  const shortDescription = blogItem.shortdesc || blogItem.short_desc || "";
  const longDescription = blogItem.longdesc || blogItem.long_desc || "";
  const spotlightTitle = blogItem.spotlight_title || "";
  const spotlightPoints = blogItem.spotlight_points || "";
  const detailsImage = blogItem.image || heroImage;
  const showSpotlightContent = Boolean(spotlightTitle || spotlightPoints);
  const subtitleText = String(blogItem.subtitle || blogItem.title || "");
  const contentTitle = String(
    blogItem.blog_subtitle || spotlightTitle || "Content Title",
  );

  useEffect(() => {
    if (!blogItem) return;

    applyDocumentSeo({
      title: `${blogItem.title || subtitleText} | The Nairobi Hospital`,
      description: trimMetaDescription(
        shortDescription || longDescription,
        "Read this article from The Nairobi Hospital.",
      ),
      canonicalPath: window.location.pathname,
      image: heroImage || detailsImage || undefined,
    });
  }, [
    blogItem,
    detailsImage,
    heroImage,
    longDescription,
    shortDescription,
    subtitleText,
  ]);

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
              {blogItem.category || "Blog"}
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

          <h2 className="text-lg md:text-xl">{blogItem.author}</h2>
        </div>
      </div>

      <div className="max-w-3xl md:max-w-6xl mx-auto px-4 py-16 space-y-16 text-gray-800">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            {blogItem.title}
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

        {(detailsImage || showSpotlightContent) && (
          <div
            className={`grid gap-8 items-start ${
              detailsImage && showSpotlightContent ? "md:grid-cols-2" : ""
            }`}
          >
            {detailsImage && (
              <div className="overflow-hidden rounded-xl shadow-lg">
                <img
                  src={detailsImage}
                  alt={blogItem.title || "Blog image"}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {showSpotlightContent && (
              <div>
                {spotlightTitle && (
                  <h4 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                    {spotlightTitle}
                  </h4>
                )}
                {spotlightPoints && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(
                        addClassesToDescription(spotlightPoints) ?? "",
                      ),
                    }}
                    className="prose prose-gray max-w-none text-lg text-gray-700 leading-relaxed prose-ul:list-disc prose-ol:list-decimal prose-ul:pl-6 prose-ol:pl-6"
                  ></div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
