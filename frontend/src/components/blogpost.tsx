import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useIntlayer } from "react-intlayer";
import { fetchBlogPosts } from "@/api/api";
import type { Blog } from "@/types";
import { sanitizePlainText } from "@/lib/sanitizeHtml";

const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const formatDisplayDate = (value?: string) => {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
};

const getContentTitle = (post: Blog) =>
  sanitizePlainText(post.blog_subtitle || post.spotlight_title || post.title);

const Blogpost = () => {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const content = useIntlayer("heroContent");

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchBlogPosts();
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load homepage news:", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const sortedPosts = useMemo(() => {
    const newsOnly = posts.filter((post) => {
      const group = String((post as any).group || "").toUpperCase();
      const type = String((post as any).type || "").toLowerCase();
      return group === "NEWS" || type === "news";
    });

    const source = newsOnly.length > 0 ? newsOnly : posts;

    return [...source].sort((a, b) => {
      const aDate = new Date((a as any).date || (a as any).created_at || 0);
      const bDate = new Date((b as any).date || (b as any).created_at || 0);
      return bDate.getTime() - aDate.getTime();
    });
  }, [posts]);

  const featuredIndex = sortedPosts.findIndex((post) =>
    Boolean((post as any).is_featured ?? post.isFeatured),
  );

  const featuredPost =
    sortedPosts[featuredIndex >= 0 ? featuredIndex : 0] ?? null;

  const otherPosts = sortedPosts
    .filter((_, index) => index !== (featuredIndex >= 0 ? featuredIndex : 0))
    .slice(0, 3);

  return (
    <section className="px-6 py-12 max-w-7xl mx-auto">
      <motion.div
        variants={slideUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-serif md:text-4xl font-bold text-red-900">
              {content.bloglatest}
            </h2>
            <p className="text-lg text-gray-600 mt-2">
              {content.blogdescription}
            </p>
          </div>
          <Link
            to="/news"
            className="mt-4 md:mt-0 shrink-0 bg-red-900 text-white px-5 py-3 rounded-md hover:bg-yellow-600 transition-colors duration-300"
          >
            {content.viewallposts}
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2 md:row-span-2 h-80 rounded-lg bg-gray-200 animate-pulse" />
            <div className="md:col-span-2 h-36 rounded-lg bg-gray-200 animate-pulse" />
            <div className="h-36 rounded-lg bg-gray-200 animate-pulse" />
            <div className="h-36 rounded-lg bg-gray-200 animate-pulse" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-auto gap-6">
            {featuredPost && (
              <div className="md:col-span-2 md:row-span-2 relative rounded-lg overflow-hidden group">
                {(featuredPost.image || featuredPost.cover_image) && (
                  <img
                    src={featuredPost.image || featuredPost.cover_image || ""}
                    alt={featuredPost.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0"></div>
                <div className="relative h-full flex flex-col justify-end p-6 text-white">
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-red-900 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {featuredPost.title}
                    </span>
                  </div>

                  <div className="bg-gray-100 border border-red-900 text-red-900 bg-opacity-70 p-4 rounded-2xl">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 break-words">
                      <Link
                        to={`/blog/${featuredPost.id}`}
                        className="hover:underline"
                      >
                        {getContentTitle(featuredPost)}
                      </Link>
                    </h3>
                    <p className="text-xs text-red-900">
                      {formatDisplayDate((featuredPost as any).date)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {otherPosts.map((post, index) => (
              <div
                key={post.id}
                className={`bg-gray-50/80 p-6 rounded-lg flex flex-col border border-red-900 hover:shadow-xl transition-shadow duration-300 ${
                  index === 0 ? "md:col-span-2" : "md:col-span-1"
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-red-900 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {post.title}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-red-900 mb-2 wrap-break-word">
                    {getContentTitle(post)}
                  </h3>
                </div>
                <div className="mt-4">
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-red-900 font-semibold inline-flex items-center group"
                  >
                    Read More
                    <svg
                      className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      ></path>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Blogpost;
