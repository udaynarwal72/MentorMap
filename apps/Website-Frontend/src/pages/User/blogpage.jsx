import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/NavBar/Footer";
import axios from "axios";

const BlogPage = () => {
  const [articles, setArticles] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/blog/bulk");
        setArticles(response.data.data);
      } catch (err) {
        setError("Failed to load blog posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 flex flex-col">
      <NavBar />

      <main className="flex-grow py-12 px-6 overflow-y-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-10">Blogs</h1>

        {articles.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <div key={article._id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{article.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-5">{article.description}</p>

                <Link
                  to={`/blogdetails/${article._id}`}
                  className="text-blue-500 hover:text-blue-400 font-medium"
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-white">No articles found.</p>
        )}

        <div className="text-center mt-8">
          <Link
            to="/blogsubmit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Write a Blog
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
