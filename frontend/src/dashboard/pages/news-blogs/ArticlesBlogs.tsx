import { useEffect, useState } from "react";
import Posts, { Post } from "@/components/blog/Posts";
import {
  fetchBlogPosts,
  createBlogPosts,
  updateBlogPosts,
  deleteBlogPosts,
} from "@/api/api";
import { motion } from "framer-motion";

const ArticlesBlogs = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchBlogPosts();

        // filter only blog articles if needed
        const articles = data.filter(
          (item: Post) => item.category === "Health & Awareness"
        );

        setPosts(articles);
      } catch (error) {
        console.error("Failed to load blog posts", error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading articles...</p>;
  }

  return (
    <section className="px-6 py-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Articles & Blogs
        </h1>

        <p className="text-gray-600 mb-8">
          Insights, medical articles, and health awareness content.
        </p>

        {posts.length === 0 ? (
          <p>No articles available.</p>
        ) : (
          <Posts posts={posts} />
        )}
      </motion.div>
    </section>
  );
};

export default ArticlesBlogs;
