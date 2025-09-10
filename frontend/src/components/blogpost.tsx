import { motion } from "framer-motion";
import { Link } from "react-router";
import { blogPosts } from "@/pages/blog/BlogList";
import Posts, { Post } from "./blog/Posts";

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Blogpost = () => {
  const blogsToShow = blogPosts.slice(0, 3) as Post[];
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
              Latest News
            </h2>
            <p className="text-2xl md:text-gray-600 mt-2">
              Stay informed about the Nairobi Hospital.
            </p>
          </div>
          <Link
            to="/bloglist"
            className=" md:bg-red-900 text-white px-5 py-2 rounded-md hover:bg-yellow-600"
          >
            View All Posts
          </Link>
        </div>

        <div className="">
          <Posts posts={blogsToShow} />
        </div>
      </motion.div>
    </section>
  );
};

export default Blogpost;
