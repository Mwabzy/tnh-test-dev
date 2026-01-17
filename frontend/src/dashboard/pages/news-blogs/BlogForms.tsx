import { useState } from "react";
import toast from "react-hot-toast";
import { Blog } from "@/types";

interface Props {
  initialData?: Blog | null;
  onSave: (data: FormData) => Promise<any>;
  onCancel: () => void;
}

type ImageState = {
  url?: string;
  file?: File;
  alt: string;
};

const BlogForm: React.FC<Props> = ({ initialData, onSave, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || "");
  const [author, setAuthor] = useState(initialData?.author || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [shortdesc, setShortdesc] = useState(initialData?.shortdesc || "");
  const [longdesc, setLongdesc] = useState(initialData?.longdesc || "");
  const [isFeatured, setIsFeatured] = useState(
    initialData?.isFeatured || false
  );

  // Cover Image
  const [coverImage, setCoverImage] = useState<ImageState | null>(
    initialData?.cover_image
      ? {
          url: initialData.cover_image,
          alt: (initialData as any).cover_image_alt || "",
        }
      : null
  );
  const [deleteCoverImage, setDeleteCoverImage] = useState(false);

  // Main Image
  const [mainImage, setMainImage] = useState<ImageState | null>(
    initialData?.image
      ? { url: initialData.image, alt: (initialData as any).image_alt || "" }
      : null
  );
  const [deleteMainImage, setDeleteMainImage] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; author?: string }>({});

  // Validation
  const validate = () => {
    const errs: any = {};
    if (!title.trim()) errs.title = "Title is required";
    if (!author.trim()) errs.author = "Author is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Generic image input renderer
  const renderImage = (
    label: string,
    image: ImageState | null,
    setImage: (img: ImageState | null) => void,
    setDelete: (val: boolean) => void,
    inputId: string
  ) => (
    <div>
      <label className="font-semibold">{label}</label>
      <div className="flex flex-col gap-2 mt-2">
        {image && (
          <div className="flex gap-2 items-center">
            <img
              src={image.url || (image.file && URL.createObjectURL(image.file))}
              className="w-20 h-20 object-cover border"
              alt="Preview"
            />
            <input
              className="border p-2 grow"
              placeholder="Alt text"
              value={image.alt}
              onChange={(e) => setImage({ ...image, alt: e.target.value })}
            />
            <button
              type="button"
              className="text-red-500"
              onClick={() => {
                setDelete(true);
                setImage(null);
              }}
            >
              ✕ Remove
            </button>
          </div>
        )}

        <input
          type="file"
          hidden
          accept="image/*"
          id={inputId}
          onChange={(e) => {
            if (!e.target.files?.length) return;
            setDelete(false);
            setImage({ file: e.target.files[0], alt: "" });
            e.target.value = "";
          }}
        />

        <button
          type="button"
          className="text-blue-600 underline text-sm"
          onClick={() => document.getElementById(inputId)?.click()}
        >
          + Add Image
        </button>
      </div>
    </div>
  );

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return toast.error("Fix form errors");

    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("subtitle", subtitle);
      fd.append("author", author);
      fd.append("category", category);
      fd.append("shortdesc", shortdesc);
      fd.append("longdesc", longdesc);
      fd.append("isFeatured", String(isFeatured));

      // Cover Image
      if (coverImage?.file) {
        fd.append("cover_image_file", coverImage.file);
        fd.append("cover_image_alt", coverImage.alt);
      } else if (coverImage?.url && !deleteCoverImage) {
        fd.append("cover_image_alt", coverImage.alt);
      }
      if (deleteCoverImage) fd.append("cover_image_delete", "true");

      // Main Image
      if (mainImage?.file) {
        fd.append("image_file", mainImage.file);
        fd.append("image_alt", mainImage.alt);
      } else if (mainImage?.url && !deleteMainImage) {
        fd.append("image_alt", mainImage.alt);
      }
      if (deleteMainImage) fd.append("image_delete", "true");

      await onSave(fd);
      toast.success("Blog saved successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        className="border p-2 w-full"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}

      <input
        className="border p-2 w-full"
        placeholder="Subtitle"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      {errors.author && <p className="text-red-600 text-sm">{errors.author}</p>}

      <input
        className="border p-2 w-full"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <textarea
        className="border p-2 w-full"
        placeholder="Short description"
        value={shortdesc}
        onChange={(e) => setShortdesc(e.target.value)}
      />

      <textarea
        className="border p-2 w-full h-40"
        placeholder="Full content"
        value={longdesc}
        onChange={(e) => setLongdesc(e.target.value)}
      />

      {renderImage(
        "Cover Image",
        coverImage,
        setCoverImage,
        setDeleteCoverImage,
        "cover-upload"
      )}
      {renderImage(
        "Main Image",
        mainImage,
        setMainImage,
        setDeleteMainImage,
        "main-upload"
      )}

      <label className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
        />
        Featured
      </label>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
        <button type="submit" className="bg-green-600 text-white px-4 py-2">
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
