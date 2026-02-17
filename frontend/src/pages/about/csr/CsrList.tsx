import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router";
import { fetchCsr } from "@/api/api";

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

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
    description: row?.description ?? row?.shortdesc ?? row?.short_desc ?? "",
    shortdesc: row?.shortdesc ?? row?.short_desc ?? "",
    longdesc: row?.longdesc ?? row?.long_desc ?? "",
    coverImage,
    image: images,
  };
};

const CsrList: FC = () => {
  const [posts, setPosts] = useState<CsrItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCsr = async () => {
      try {
        setLoading(true);
        const data = await fetchCsr();
        const list: unknown[] = Array.isArray(data)
          ? data
          : (data?.results ?? data?.data ?? []);
        setPosts(list.map(normalizeCsr).filter((item) => item.id));
        setError(null);
      } catch (err: any) {
        setError(err?.message || "Failed to load CSR posts.");
      } finally {
        setLoading(false);
      }
    };

    loadCsr();
  }, []);

  return (
    <section className="px-6 py-12 max-w-7xl mx-auto">
      <motion.div
        variants={slideUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Corporate Social Responsibility (CSR)
            </h2>
            <p className="text-2xl md:text-gray-600 mt-2">
              Our commitment is to positively impact society beyond its core
              business operations.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="py-10 text-center text-gray-600">
            Loading CSR posts...
          </div>
        ) : error ? (
          <div className="py-10 text-center text-red-600">{error}</div>
        ) : posts.length === 0 ? (
          <div className="py-10 text-center text-gray-600">
            No CSR posts available.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 w-full">
            {posts.map((post) => {
              const cardImage = post.image[0] || post.coverImage;
              return (
                <div
                  key={post.id}
                  className="rounded-lg overflow-hidden shadow hover:shadow-md transition"
                >
                  {cardImage ? (
                    <img
                      src={cardImage}
                      alt={post.title}
                      className="w-full h-56 rounded-lg transform transition duration-300 hover:scale-105 hover:brightness-90 object-cover"
                    />
                  ) : (
                    <div className="w-full h-56 rounded-lg bg-gray-100" />
                  )}
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 mt-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mt-2 text-sm line-clamp-4">
                      {post.description}
                    </p>
                    <Link
                      to={`/csr-detail/${post.id}`}
                      className="inline-flex items-center text-red-900 font-medium mt-4 hover:underline"
                    >
                      Read More <span className="ml-1">→</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default CsrList;
