import { useState } from "react";
import toast from "react-hot-toast";
import { CSR } from "@/types";

interface Props {
  initialData?: CSR | null;
  onSave: (data: CSR) => void;
  onCancel: () => void;
}

type ImageState = {
  url?: string;
  file?: File;
  alt: string;
};

const requiredMark = <span className="text-red-600">*</span>;

const CsrForm: React.FC<Props> = ({ initialData, onSave, onCancel }) => {
  const [author, setAuthor] = useState(initialData?.author || "");
  const [title, setTitle] = useState(initialData?.title || "");
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || "");
  const [blogsubtitle, setBlogsubtitle] = useState(
    initialData?.blogsubtitle || "",
  );
  const [shortdesc, setShortdesc] = useState(initialData?.shortdesc || "");
  const [longdesc, setLongdesc] = useState(initialData?.longdesc || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );

  // Cover image (UPLOAD)
  const [coverImage, setCoverImage] = useState<ImageState | null>(
    initialData?.coverImage
      ? {
          url: initialData.coverImage,
          alt: (initialData as any).cover_image_alt || "",
        }
      : null,
  );
  const [deleteCoverImage, setDeleteCoverImage] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ author?: string; title?: string }>({});

  const validate = () => {
    const errs: any = {};
    if (!author.trim()) errs.author = "Author is required";
    if (!title.trim()) errs.title = "Title is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const renderImage = (
    label: string,
    image: ImageState | null,
    setImage: (img: ImageState | null) => void,
    setDelete: (val: boolean) => void,
    inputId: string,
  ) => (
    <div>
      <label className="font-semibold">{label}</label>

      {image && (
        <div className="flex gap-2 items-center mt-2">
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
            ✕
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
        className="text-blue-600 underline text-sm mt-2"
        onClick={() => document.getElementById(inputId)?.click()}
      >
        + Add Image
      </button>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return toast.error("Fix form errors");

    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("author", author);
      fd.append("title", title);
      fd.append("subtitle", subtitle);
      fd.append("blogsubtitle", blogsubtitle);
      fd.append("shortdesc", shortdesc);
      fd.append("longdesc", longdesc);
      fd.append("description", description);

      // Cover image handling (same logic as Blog)
      if (coverImage?.file) {
        fd.append("cover_image_file", coverImage.file);
        fd.append("cover_image_alt", coverImage.alt);
      } else if (coverImage?.url && !deleteCoverImage) {
        fd.append("cover_image_alt", coverImage.alt);
      }

      if (deleteCoverImage) {
        fd.append("cover_image_delete", "true");
      }

      await onSave(fd);
      toast.success("CSR saved successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save CSR");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="font-semibold">Author {requiredMark}</label>
        <input
          className="border p-2 w-full"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        {errors.author && (
          <p className="text-red-600 text-sm">{errors.author}</p>
        )}
      </div>

      <div>
        <label className="font-semibold">Title {requiredMark}</label>
        <input
          className="border p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
      </div>

      <input
        className="border p-2 w-full"
        placeholder="Subtitle"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Blog Subtitle"
        value={blogsubtitle}
        onChange={(e) => setBlogsubtitle(e.target.value)}
      />

      <textarea
        className="border p-2 w-full"
        placeholder="Short description"
        value={shortdesc}
        onChange={(e) => setShortdesc(e.target.value)}
      />

      <textarea
        className="border p-2 w-full"
        placeholder="Long description"
        value={longdesc}
        onChange={(e) => setLongdesc(e.target.value)}
      />

      <textarea
        className="border p-2 w-full"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {renderImage(
        "Cover Image",
        coverImage,
        setCoverImage,
        setDeleteCoverImage,
        "csr-cover-upload",
      )}

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

export default CsrForm;
