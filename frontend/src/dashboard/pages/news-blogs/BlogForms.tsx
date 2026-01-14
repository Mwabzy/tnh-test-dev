import { useState } from "react";
import toast from "react-hot-toast";
import { Blog } from "@/types";

interface Props {
  initialData?: Blog | null;
  onSave: (blog: Blog) => Promise<any>;
  onCancel: () => void;
}

const requiredMark = <span className="text-red-600">*</span>;

const BlogForm: React.FC<Props> = ({ initialData, onSave, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || "");
  const [author, setAuthor] = useState(initialData?.author || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [shortdesc, setShortdesc] = useState(initialData?.shortdesc || "");
  const [longdesc, setLongdesc] = useState(initialData?.longdesc || "");
  const [coverImage, setCoverImage] = useState(initialData?.cover_image || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [isFeatured, setIsFeatured] = useState(
    initialData?.isFeatured || false
  );

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; author?: string }>({});

  const validate = () => {
    const newErrors: any = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!author.trim()) newErrors.author = "Author is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix errors in the form.");
      return;
    }

    setLoading(true);

    const blogData: Blog = {
      id: initialData?.id,
      title,
      subtitle,
      author,
      category,
      shortdesc,
      longdesc,
      cover_image: coverImage,
      image,
      isFeatured: isFeatured,
    };

    try {
      await onSave(blogData);
      toast.success("Blog post saved successfully!");
    } catch {
      toast.error("Failed to save blog post.");
    } finally {
      setLoading(false);
    }
  };

  const disabledClass = loading ? "opacity-50 pointer-events-none" : "";

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${disabledClass}`}>
      {/* Title */}
      <div>
        <label className="font-semibold">
          Title {requiredMark}
          <input
            type="text"
            className="border p-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
      </div>

      {/* Subtitle */}
      <div>
        <label className="font-semibold">Subtitle</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
      </div>

      {/* Author */}
      <div>
        <label className="font-semibold">
          Author {requiredMark}
          <input
            type="text"
            className="border p-2 w-full"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        {errors.author && (
          <p className="text-red-600 text-sm">{errors.author}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="font-semibold">Category</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      {/* Short Description */}
      <div>
        <label className="font-semibold">Short Description</label>
        <textarea
          className="border p-2 w-full"
          value={shortdesc}
          onChange={(e) => setShortdesc(e.target.value)}
        />
      </div>

      {/* Full Content */}
      <div>
        <label className="font-semibold">Full Content</label>
        <textarea
          className="border p-2 w-full h-40"
          value={longdesc}
          onChange={(e) => setLongdesc(e.target.value)}
        />
      </div>

      {/* Cover Image */}
      <div>
        <label className="font-semibold">Cover Image URL</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
        />
      </div>

      {/* Image */}
      <div>
        <label className="font-semibold">Secondary Image URL</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      {/* Featured */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
        />
        <label className="font-semibold">Featured Post</label>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded"
          disabled={loading}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={`px-4 py-2 rounded text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600"
          }`}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
