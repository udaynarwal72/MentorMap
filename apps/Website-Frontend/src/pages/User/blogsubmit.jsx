import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar"; 

const BlogSubmitForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Corrected: Added useNavigate for redirection

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!title) newErrors.title = "Title is required.";
    if (!content) newErrors.content = "Content is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setSuccessMessage("");

    try {
      // Make API call to submit the blog post
      const response = await axios.post("http://localhost:3000/api/v1/blog/postblog", {
        title,
        description: content,
      },{
        withCredentials: true // Corrected: Changed credentials:true to withCredentials: true
      });

      if (response.data.success) {
        setSuccessMessage("Blog post submitted successfully!");
        // Clear the form
        setTitle("");
        setContent("");
        navigate("/blogpage"); // Corrected: Use navigate for redirection
      } else {
        setErrors({ apiError: response.data.message || "Failed to submit the blog post." });
      }
    } catch (error) {
      setErrors({ apiError: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
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

            {errors.apiError && (
              <p className="text-red-500 text-xs mt-1 mb-4">{errors.apiError}</p>
            )}

            {successMessage && (
              <p className="text-green-500 text-xs mt-1 mb-4">{successMessage}</p>
            )}

            <button
              type="submit"
              className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BlogSubmitForm;
