import Posts from "@/components/blog/Posts";
import { motion } from "framer-motion";

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Bloglist = () => {
  return (
    <>
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
                Latest Articles
              </h2>
              <p className="text-2xl md:text-gray-600 mt-2">
                Explore health insights and stories from The Nairobi Hospital.
              </p>
            </div>
          </div>
          <div className="">
            <Posts group="ARTICLES" />
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Bloglist;
