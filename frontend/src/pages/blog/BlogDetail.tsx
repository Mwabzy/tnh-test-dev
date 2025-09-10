import { blogPosts } from "./BlogList";
import { useParams } from "react-router";

const BlogDetail = () => {
  const { id } = useParams();

  const blogItem = blogPosts.find((blog) => blog.id === Number(id))!;
  const heroItem = blogPosts.find((blog) => blog.id === Number(id))!;
  return (
    <div>
      <div
        className="relative h-[40vh] bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${heroItem.coverImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50 bg-opacity-70"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <div className="mb-6">
            <a
              href="#"
              className="inline-flex items-center bg-white bg-opacity-10 hover:bg-opacity-20 text-sm text-bold text-black px-4 py-1 rounded-full transition"
            >
              HEALTH & AWARENESS
            </a>
          </div>

          {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
  {blogItem.blogsubtitle
    .split(' ')
    .map((word, i) => (i > 0 && i % 6 === 0 ? <><br key={i} /> {word} </> : ` ${word}`))}
</h1>

          <h2 className=" text-lg md:text-xl ">{blogItem.author}</h2>

          {/* Subtext */}
        </div>
      </div>
      <div className="max-w-3xl md:max-w-6xl mx-auto px-4 py-16 space-y-16 text-gray-800">
        {/* Section 1 */}
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            {blogItem.title}
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">
            {blogItem.shortdesc}
          </p>
        </div>

        {/* Section 2 */}
        <div>
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Relationship Dynamics
          </h3>
          <p className="text-lg leading-relaxed text-gray-700">
            {blogItem.longdesc}
          </p>
        </div>

        {/* Section 3 - Image + List */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Image */}
          <div className="overflow-hidden rounded-xl shadow-lg">
            <img
              src={blogItem.image}
              alt="Mental Health Discussion"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Research List */}
          <div>
            <h4 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
              Spotlight on Mental Health Research
            </h4>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
              <li>Mindful Living</li>
              <li>Decoding Dreams</li>
              <li>The Science of Stress</li>
              <li>The Psychology of Habits</li>
              <li>Cultural Psychology</li>
            </ul>
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default BlogDetail;
