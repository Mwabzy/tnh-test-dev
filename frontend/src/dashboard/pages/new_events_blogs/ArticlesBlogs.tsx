import { useState, useEffect } from "react";
import BlogTable from "./BlogTable";
import BlogForm from "./BlogForms";
import { Blog } from "@/types";
import {
  fetchBlogPosts,
  createBlogPosts,
  updateBlogPosts,
  deleteBlogPosts,
} from "@/api/api";
import toast from "react-hot-toast";

const ArticlesBlog = () => {
  const group = "ARTICLES"; // unique identifier for this section
  const title = "Articles & Blog";

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Load blogs
  useEffect(() => {
    async function loadBlogs() {
      setLoading(true);
      try {
        const data = await fetchBlogPosts();
        setBlogs(data.filter((item: Blog) => item.group === group));
        setError(null);
      } catch (err: any) {
        setError(err.message || "Error loading blogs");
      } finally {
        setLoading(false);
      }
    }

    loadBlogs();
  }, []);

  const handleAdd = () => {
    setEditingBlog(null);
    setShowForm(true);
  };

  const handleSave = async (data: FormData) => {
    try {
      data.set("group", group);
      data.set("type", "article");

      if (editingBlog?.id) {
        const updated = await updateBlogPosts(editingBlog.id, data);
        setBlogs((prev) =>
          prev.map((b) => (b.id === updated.id ? updated : b)),
        );
      } else {
        const created = await createBlogPosts(data);
        setBlogs((prev) => [created, ...prev]);
      }

      setShowForm(false);
      setEditingBlog(null);
      toast.success("Blog saved successfully!");
    } catch (err: any) {
      toast.error(`Error saving blog: ${err.message}`);
    }
  };

  const handleDeleteClick = (id: string) => setDeleteConfirmId(id);

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;

    try {
      setDeletingId(deleteConfirmId);
      await deleteBlogPosts(deleteConfirmId);
      setBlogs((prev) => prev.filter((b) => b.id !== deleteConfirmId));
      setDeleteConfirmId(null);
      toast.success("Blog deleted successfully!");
    } catch (err: any) {
      toast.error(`Error deleting blog: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        {!showForm && !loading && (
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add Blog
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading blogs...</p>
      ) : error ? (
        <p className="text-red-500 mb-4">{error}</p>
      ) : showForm ? (
        <BlogForm
          initialData={editingBlog}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
          group={"ARTICLES"}
        />
      ) : (
        <BlogTable
          data={blogs}
          onEdit={(blog) => {
            setEditingBlog(blog);
            setShowForm(true);
          }}
          onDelete={handleDeleteClick}
          deletingId={deletingId}
        />
      )}

      {deleteConfirmId &&
        (() => {
          const blog = blogs.find((b) => b.id === deleteConfirmId);
          return (
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
              <div className="bg-white p-6 rounded shadow-lg w-96">
                <p className="text-lg mb-4">
                  Are you sure you want to delete <strong>{blog?.title}</strong>
                  ?
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded"
                  >
                    {deletingId ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
    </div>
  );
};

export default ArticlesBlog;
