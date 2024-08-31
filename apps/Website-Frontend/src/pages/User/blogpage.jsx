import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/NavBar/Footer";
import axios from "axios";

const dummyArticles = [
  {
    _id: "1",
    title: "Deep Dive into Machine Learning",
    summary: "An insightful article on the latest trends and techniques in machine learning.",
    link: "/articles/1",
  },
  {
    _id: "2",
    title: "Mastering JavaScript: Tips and Tricks",
    summary: "A comprehensive guide to improving your JavaScript skills.",
    link: "/articles/2",
  },
  {
    _id: "3",
    title: "Introduction to React Hooks",
    summary: "Explore the power of React Hooks and how they simplify state management.",
    link: "/articles/3",
  },
];

const BlogPage = () => {
  const [articles, setArticles] = useState(dummyArticles); // Initialize with dummy data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   // Fetch blog posts from the server
  //   const fetchArticles = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/api/v1/blog/bulk");
  //       const fetchedArticles = response.data;
  //       setArticles([...dummyArticles, ...fetchedArticles]);
  //     } catch (err) {
  //       setError("Failed to load blog posts.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchArticles();
  // }, []);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 flex flex-col">
      <NavBar />

      <main className="flex-grow py-12 px-6 overflow-y-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-10">Blogs</h1>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <div key={article._id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{article.title}</h2>
              <p className="text-gray-600 mb-4">{article.summary}</p>
              <Link
                to={`/articles/${article._id}`}
                className="text-blue-500 hover:text-blue-400 font-medium"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
      </main>
      <div className="text-center mb-8">
  <Link
    to="/blogsubmit"
    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
  >
    Write a Blog
  </Link>
</div>

      <Footer />
    </div>
  );
};

export default BlogPage;
