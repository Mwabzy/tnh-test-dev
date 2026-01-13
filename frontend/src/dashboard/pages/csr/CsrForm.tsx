import { useState } from "react";
import toast from "react-hot-toast";
import { CSR } from "@/types";

interface Props {
  initialData?: CSR | null;
  onSave: (csr: CSR) => Promise<any>;
  onCancel: () => void;
}

const requiredMark = <span className="text-red-600">*</span>;

const CsrForm: React.FC<Props> = ({ initialData, onSave, onCancel }) => {
  const [author, setAuthor] = useState(initialData?.author || "");
  const [title, setTitle] = useState(initialData?.title || "");
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || "");
  const [blogsubtitle, setBlogsubtitle] = useState(
    initialData?.blogsubtitle || ""
  );
  const [shortdesc, setShortdesc] = useState(initialData?.shortdesc || "");
  const [longdesc, setLongdesc] = useState(initialData?.longdesc || "");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ author?: string; title?: string }>({});

  const validate = () => {
    const newErrors: any = {};
    if (!author.trim()) newErrors.author = "Author is required";
    if (!title.trim()) newErrors.title = "Title is required";
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

    const csrData: CSR = {
      id: initialData?.id || Date.now(),
      author,
      title,
      subtitle,
      blogsubtitle,
      description,
      shortdesc,
      longdesc,
      coverImage,
      image: initialData?.image || [],
    };

    try {
      await onSave(csrData);
      toast.success("CSR content saved successfully!");
    } catch {
      toast.error("Failed to save CSR content.");
    } finally {
      setLoading(false);
    }
  };

  const disabledClass = loading ? "opacity-50 pointer-events-none" : "";

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${disabledClass}`}>
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

      <div>
        <label className="font-semibold">Subtitle</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
      </div>

      <div>
        <label className="font-semibold">Blog Subtitle</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={blogsubtitle}
          onChange={(e) => setBlogsubtitle(e.target.value)}
        />
      </div>

      <div>
        <label className="font-semibold">Short Description</label>
        <textarea
          className="border p-2 w-full"
          value={shortdesc}
          onChange={(e) => setShortdesc(e.target.value)}
        />
      </div>

      <div>
        <label className="font-semibold">Long Description</label>
        <textarea
          className="border p-2 w-full"
          value={longdesc}
          onChange={(e) => setLongdesc(e.target.value)}
        />
      </div>

      <div>
        <label className="font-semibold">Cover Image URL</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
        />
      </div>

      <div>
        <label className="font-semibold">Description</label>
        <textarea
          className="border p-2 w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

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

export default CsrForm;
