import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";

const BlogPage = () => {
  // Sample data for articles
  const articles = [
    {
      id: 1,
      title: "Deep Dive into Machine Learning",
      summary: "An insightful article on the latest trends and techniques in machine learning.",
      link: "/articles/deep-dive-into-machine-learning",
    },
    {
      id: 2,
      title: "Mastering JavaScript: Tips and Tricks",
      summary: "A comprehensive guide to improving your JavaScript skills.",
      link: "/articles/mastering-javascript-tips-and-tricks",
    },
    // Add more articles here
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300">
      {/* Navigation Bar */}
      <NavBar />

      <main className="flex-grow py-12 px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Blogs
        </h1>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {article.title}
              </h2>
              <p className="text-gray-600 mb-4">{article.summary}</p>
              <Link
                to={article.link}
                className="text-blue-500 hover:text-blue-400 font-medium"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 bg-gray-800 w-full text-center text-white text-sm">
        © 2024 MentorConnect. All rights reserved.
      </footer>
    </div>
  );
};

export default BlogPage;
