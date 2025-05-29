import { FunctionComponent } from "react";
import { Link } from "react-router";

export type Post = {
  id: number;
  author: string;
  title: string;
  subtitle: string;
  blogsubtitle: string;
  description: string;
  shortdesc: string;
  longdesc: string;
  category: string;
  coverImage: string;
  image: string;
};

interface PostsProps {
  posts: Post[];
}

const Posts: FunctionComponent<PostsProps> = ({ posts }) => {
  return (
    <div className="grid md:grid-cols-3 gap-8 w-full">
      {posts.map((post) => (
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
            <p className="text-gray-600 mt-2 text-sm">{post.description}</p>
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
