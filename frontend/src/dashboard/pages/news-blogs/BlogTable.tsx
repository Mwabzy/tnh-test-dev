import { Post } from "@/components/blog/Posts";

interface Props {
  posts: Post[];
}

const BlogTable = ({ posts }: Props) => {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Title</th>
            <th className="p-3">Author</th>
            <th className="p-3">Category</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-t">
              <td className="p-3">{post.title}</td>
              <td className="p-3">{post.author}</td>
              <td className="p-3">{post.category}</td>
              <td className="p-3 space-x-2">
                <button className="text-blue-600">Edit</button>
                <button className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogTable;
