import { FC } from "react";
import { Blog } from "@/types";

interface BlogTableProps {
  data: Blog[];
  onEdit: (blog: Blog) => void;
  onDelete: (id: string) => void;
  deletingId?: string | null;
}

const BlogTable: FC<BlogTableProps> = ({
  data,
  onEdit,
  onDelete,
  deletingId = null,
}) => {
  if (data.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
        No blog posts available. Create your first post.
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Blog Posts</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Title</th>
            <th className="p-3">Author</th>
            <th className="p-3">Category</th>
            <th className="p-3">Featured</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((blog) => (
            <tr key={blog.id} className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium">{blog.title}</td>
              <td className="p-3">{blog.author}</td>
              <td className="p-3">{blog.category}</td>
              <td className="p-3">{blog.isFeatured ? "Yes" : "No"}</td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => onEdit(blog)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  disabled={deletingId === blog.id}
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(blog.id || "")}
                  className={`px-3 py-1 rounded text-white ${
                    deletingId === blog.id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                  disabled={deletingId === blog.id}
                >
                  {deletingId === blog.id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogTable;
