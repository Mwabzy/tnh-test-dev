import { FunctionComponent, ReactNode } from "react";
import { Link } from "react-router";
import { Blog } from "@/types";
import { fetchBlogPosts } from "@/api/api";
import { useEffect, useState } from "react";
import { sanitizePlainText } from "@/lib/sanitizeHtml";

export type Post = {
  description: ReactNode;
  id: number;
  author: string;
  title: string;
  date?: string;
  isFeatured?: boolean;
  subtitle: string;
  shortdesc: string;
  longdesc: string;
  category: string;
  coverImage: string;
  image: string;
};

type PostLike = {
  id: string | number;
  title: string;
  category?: string;
  shortdesc?: string;
  short_desc?: string;
  longdesc?: string;
  long_desc?: string;
  image?: string;
  cover_image?: string;
  coverImage?: string;
};

interface PostsProps {
  posts?: PostLike[];
  group?: Blog["group"];
}

const truncateText = (value: string, maxLength: number) => {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trimEnd()}...`;
};

const Posts: FunctionComponent<PostsProps> = ({ posts, group }) => {
  const [data, setData] = useState<PostLike[]>(posts ?? []);
  const [loading, setLoading] = useState(!posts);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (posts) {
      setData(posts);
      setLoading(false);
      return;
    }

    let isMounted = true;

    const loadServices = async () => {
      try {
        setLoading(true);
        const services = await fetchBlogPosts();
        const hasGroup =
          group &&
          services.some(
            (post: Blog) => typeof post.group === "string" && post.group.length,
          );
        const filtered = hasGroup
          ? services.filter((post: Blog) => post.group === group)
          : services;
        if (!isMounted) return;
        setData(filtered);
      } catch (err) {
        console.error("Error fetching services:", err);
        if (!isMounted) return;
        setError("Unable to load services.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    loadServices();
    return () => {
      isMounted = false;
    };
  }, [posts, group]);

  if (loading) {
    return <div className="py-10 text-center text-gray-600">Loading posts...</div>;
  }

  if (error) {
    return <div className="py-10 text-center text-red-600">{error}</div>;
  }

  if (data.length === 0) {
    return <div className="py-10 text-center text-gray-600">No posts available.</div>;
  }

  return (
    <div className="grid md:grid-cols-3 gap-8 w-full">
      {data.map((post) => (
        <div
          key={post.id}
          className="rounded-lg overflow-hidden shadow hover:shadow-md transition"
        >
          <img
            src={post.image || post.cover_image || post.coverImage || ""}
            alt={post.title}
            className="w-full h-56 rounded-lg transform transition duration-300 hover:scale-105 hover:brightness-90 object-cover"
          />
          <div className="p-4">
            <p className="text-sm text-red-900 font-semibold">
              {post.category}
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-2">
              {post.title}
            </h3>
            <p className="text-gray-600 mt-2 text-sm">
              {truncateText(
                sanitizePlainText(
                  post.shortdesc ||
                    post.short_desc ||
                    post.longdesc ||
                    post.long_desc ||
                    "",
                ),
                180,
              )}
            </p>
            <Link
              to={`/blog/${post.id}`}
              className="inline-flex items-center text-red-900 font-medium mt-4 hover:underline"
            >
              Read More <span className="ml-1">-&gt;</span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
