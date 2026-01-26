import { FunctionComponent, ReactNode } from "react";
import { Link } from "react-router";
import { Blog } from "@/types";
import { fetchBlogPosts } from "@/api/api";
import { useEffect, useState } from "react";

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

interface PostsProps {
  posts: Post[];
}

const Posts: FunctionComponent<PostsProps> = () => {
  const [data, setData] = useState<Blog[]>([]);
  const [_loading, setLoading] = useState(true);
  const [_error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const services = await fetchBlogPosts();
        setData(services);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Unable to load services.");
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-8 w-full">
      {data.map((post) => (
        <div
          key={post.id}
          className="rounded-lg overflow-hidden shadow hover:shadow-md transition"
        >
          <img
            src={post.image}
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
            <p className="text-gray-600 mt-2 text-sm">{post.longdesc}</p>
            <Link
              to={`/blog/${post.id}`}
              className="inline-flex items-center text-red-900 font-medium mt-4 hover:underline"
            >
              Read More <span className="ml-1 ">→</span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
