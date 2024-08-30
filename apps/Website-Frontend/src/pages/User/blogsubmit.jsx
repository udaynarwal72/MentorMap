import React, { useState } from "react";

const BlogSubmitForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!title) newErrors.title = "Title is required.";
    if (!content) newErrors.content = "Content is required.";
    if (!tags) newErrors.tags = "Tags are required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Handle form submission logic here
    console.log("Blog submitted:", { title, content, tags });

    // Clear the form
    setTitle("");
    setContent("");
    setTags("");
    setErrors({});
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Submit a New Blog Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3 py-2 border ${errors.title ? "border-red-500" : "border-gray-300"} rounded-lg`}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="content">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="6"
              className={`w-full px-3 py-2 border ${errors.content ? "border-red-500" : "border-gray-300"} rounded-lg`}
            />
            {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="tags">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., React, JavaScript, Web Development"
              className={`w-full px-3 py-2 border ${errors.tags ? "border-red-500" : "border-gray-300"} rounded-lg`}
            />
            {errors.tags && <p className="text-red-500 text-xs mt-1">{errors.tags}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default BlogSubmitForm;
