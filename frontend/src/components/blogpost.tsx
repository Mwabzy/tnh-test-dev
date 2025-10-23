import { Link } from "react-router"; // Assuming you are using react-router-dom
import { motion } from "framer-motion"; // Assuming you are using framer-motion

// A placeholder for your animation variants
const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

// You can replace this with your actual content object
const content = {
    bloglatest: "Latest News & Updates",
    blogdescription: "Stay informed about our latest developments and healthcare insights.",
    viewallposts: "View All News",
};

// Dummy data based on your image. Replace this with your 'blogsToShow' prop.
const posts = [
  {
    id: 1,
    isFeatured: true,
    tag: "Hospital Times",
    date: "December 15, 2024",
    title: "New State-of-the-Art Cardiac Surgery Wing Opens",
    description: "The Nairobi Hospital unveils its new cardiac surgery facility, featuring the latest in cardiovascular technology and expanding our capacity to serve more patients.",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=6000", // Replace with your actual image
  },
  {
    id: 2,
    tag: "Achievements",
    date: "December 10, 2024",
    title: "International Accreditation Renewed",
    description: "The hospital successfully renews its JCI accreditation, maintaining our commitment to international quality standards.",
  },
  {
    id: 3,
    tag: "Community Health",
    date: "December 5, 2024",
    title: "Health Screening Campaign Launches",
    description: "Free health screenings available for diabetes, hypertension, and heart disease throughout December.",
  },
  {
    id: 4,
    tag: "Research",
    date: "November 28, 2024",
    title: "Medical Research Partnership Announced",
    description: "New collaboration with international medical institutions to advance healthcare research in East Africa.",
  },
];


const Blogpost = () => {
  const featuredPost = posts.find((p) => p.isFeatured);
  const otherPosts = posts.filter((p) => !p.isFeatured);

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
            to="/bloglist"
            className="mt-4 md:mt-0 shrink-0 bg-red-900 text-white px-5 py-3 rounded-md hover:bg-yellow-600 transition-colors duration-300"
          >
            {content.viewallposts}
          </Link>
        </div>

        {/* --- Bento Grid Layout Starts Here --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-6">
          
          {/* Featured Post */}
          {featuredPost && (
            <div className="md:col-span-2 md:row-span-2 relative rounded-lg overflow-hidden group">
                <img 
                    src={featuredPost.imageUrl} 
                    alt={featuredPost.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0"></div>
                <div className="relative h-full   flex flex-col justify-end p-6  text-white">

                       <div className="flex justify-between items-center mb-4">
                    <span className="bg-red-900 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">Featured</span>
                    </div>

                    <div className="bg-gray-100 border-1 border-red-900  text-red-900 max-w-full bg-opacity-70 p-4 rounded-2xl">
                    <h3 className="text-xl md:text-2xl font-bold mb-2  ">
                        <Link to={`/blog/${featuredPost.id}`} className="hover:underline ">{featuredPost.title}</Link>
                    </h3>
                    <p className="text-black text-sm hidden sm:block mb-4">{featuredPost.description}</p>
                    <p className="text-xs text-red-900">{featuredPost.date}</p>
                    </div>
                </div>
            </div>
          )}

          {/* Other Posts */}
          {otherPosts.map((post, index) => (
             <div key={post.id} className={`bg-gray-50/80 p-6 rounded-lg flex flex-col justify-between border-1 border-red-900  hover:shadow-xl transition-shadow duration-300 ${index === 0 ? 'md:col-span-2' : 'md:col-span-1'}`}>
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <span className="bg-red-900 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">{post.tag}</span>
                        <span className="text-xs text-gray-500">{post.date}</span>
                    </div>
                    <h3 className="font-bold text-lg text-red-900 mb-2">
                        {post.title} 
                    </h3>
                    <p className="text-gray-600 text-sm">
                        {post.description}
                    </p>
                </div>
                <Link to={`/blog/${post.id}`} className="text-red-900 font-semibold mt-4 inline-flex items-center group">
                    Read More
                    <svg className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </Link>
             </div>
          ))}
        </div>
        {/* --- Bento Grid Layout Ends Here --- */}

      </motion.div>
    </section>
  );
};

export default Blogpost;