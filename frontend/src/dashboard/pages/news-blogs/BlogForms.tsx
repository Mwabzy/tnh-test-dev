import { useState } from "react";

const BlogForms = () => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    shortdesc: "",
    longdesc: "",
    image: "",
    coverImage: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting blog:", form);
    // later: POST to API
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow space-y-4 max-w-3xl"
    >
      <h2 className="text-2xl font-bold">Create Blog Post</h2>

      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
        className="input"
      />
      <input
        name="author"
        placeholder="Author"
        onChange={handleChange}
        className="input"
      />
      <input
        name="category"
        placeholder="Category"
        onChange={handleChange}
        className="input"
      />

      <textarea
        name="shortdesc"
        placeholder="Short Description"
        onChange={handleChange}
        className="input h-24"
      />

      <textarea
        name="longdesc"
        placeholder="Full Content"
        onChange={handleChange}
        className="input h-40"
      />

      <button className="bg-red-900 text-white px-6 py-2 rounded">
        Save Post
      </button>
    </form>
  );
};

export default BlogForms;
