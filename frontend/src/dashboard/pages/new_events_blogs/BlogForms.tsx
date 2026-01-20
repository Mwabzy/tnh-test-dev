import { useState, useRef } from "react";
import toast from "react-hot-toast";
import type { Blog } from "@/types";

interface Props {
  initialData?: Blog | null;
  group: "ARTICLES" | "EVENTS" | "NEWS";
  onSave: (data: FormData) => Promise<any>;
  onCancel: () => void;
}

type ImageState = {
  file?: File;
  url?: string;
  alt: string;
};

type FormErrors = {
  title?: string;
  author?: string;
};

const BlogForm: React.FC<Props> = ({
  initialData,
  group,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [subtitle, setSubtitle] = useState(initialData?.subtitle ?? "");
  const [author, setAuthor] = useState(initialData?.author ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "");
  const [shortdesc, setShortdesc] = useState(initialData?.shortdesc ?? "");
  const [longdesc, setLongdesc] = useState(initialData?.longdesc ?? "");
  const [isFeatured, setIsFeatured] = useState(
    initialData?.isFeatured ?? false,
  );

  const [coverImage, setCoverImage] = useState<ImageState | null>(
    initialData?.cover_image
      ? {
          url: initialData.cover_image,
          alt: (initialData as any)?.cover_image_alt ?? "",
        }
      : null,
  );
  const [deleteCoverImage, setDeleteCoverImage] = useState(false);

  const [mainImage, setMainImage] = useState<ImageState | null>(
    initialData?.image
      ? {
          url: initialData.image,
          alt: (initialData as any)?.image_alt ?? "",
        }
      : null,
  );
  const [deleteMainImage, setDeleteMainImage] = useState(false);
  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const mainInputRef = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs: FormErrors = {};
    if (!title.trim()) errs.title = "Title is required";
    if (!author.trim()) errs.author = "Author is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const renderImageField = (
    label: string,
    image: ImageState | null,
    setImage: (img: ImageState | null) => void,
    setDelete: (v: boolean) => void,
    inputRef: React.RefObject<HTMLInputElement | null>,
  ) => (
    <div className="space-y-2">
      <label className="font-semibold">{label}</label>

      {image && (
        <div className="flex gap-3 items-center">
          <img
            src={image.url}
            alt={image.alt || "Preview"}
            className="w-20 h-20 object-cover border rounded"
          />

          <input
            className="border p-2 flex-1"
            placeholder="Alt text"
            value={image.alt}
            onChange={(e) =>
              setImage({
                ...image,
                alt: e.target.value,
              })
            }
          />

          <button
            type="button"
            className="text-red-600 text-sm"
            onClick={() => {
              setDelete(true);
              setImage(null);
            }}
          >
            Remove
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => {
          if (!e.target.files?.length) return;
          const file = e.target.files[0];
          setDelete(false);
          setImage({
            file,
            url: URL.createObjectURL(file),
            alt: "",
          });
          e.target.value = "";
        }}
      />

      <button
        type="button"
        className="text-blue-600 text-sm underline"
        onClick={() => inputRef.current?.click()}
      >
        + Add Image
      </button>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Fix form errors");
      return;
    }

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

      // enforce group
      fd.append("group", initialData?.group ?? group);

      // cover image
      if (coverImage?.file) {
        fd.append("cover_image_file", coverImage.file);
        fd.append("cover_image_alt", coverImage.alt);
      } else if (coverImage?.url && !deleteCoverImage) {
        fd.append("cover_image_alt", coverImage.alt);
      }
      if (deleteCoverImage) fd.append("cover_image_delete", "true");

      // main image
      if (mainImage?.file) {
        fd.append("image_file", mainImage.file);
        fd.append("image_alt", mainImage.alt);
      } else if (mainImage?.url && !deleteMainImage) {
        fd.append("image_alt", mainImage.alt);
      }
      if (deleteMainImage) fd.append("image_delete", "true");

      await onSave(fd);
      toast.success("Saved successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* GROUP BADGE */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 font-semibold">Group:</span>
        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
          {group}
        </span>
      </div>

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

      {renderImageField(
        "Cover Image",
        coverImage,
        setCoverImage,
        setDeleteCoverImage,
        coverInputRef,
      )}

      {renderImageField(
        "Main Image",
        mainImage,
        setMainImage,
        setDeleteMainImage,
        mainInputRef,
      )}

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
        />
        Featured
      </label>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
