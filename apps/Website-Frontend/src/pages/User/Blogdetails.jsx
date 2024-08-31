import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/NavBar/Footer";
import axios from "axios";

const dummyArticles = [
  {
    _id: "1",
    title: "Deep Dive into Machine Learning",
    content: "Machine Learning (ML) is a branch of artificial intelligence (AI) that focuses on building systems that learn from data and improve their performance over time without being explicitly programmed. This article provides a comprehensive overview of recent advancements in ML, including supervised learning, unsupervised learning, reinforcement learning, and deep learning. Key techniques discussed include neural networks, decision trees, and clustering algorithms.",
    tags: ["Machine Learning", "AI", "Data Science"],
  },
  {
    _id: "2",
    title: "Mastering JavaScript: Tips and Tricks",
    content: "JavaScript is a versatile programming language widely used for creating interactive web applications. This guide covers various tips and tricks to help you master JavaScript, including understanding closures, promises, async/await, and best practices for writing clean and efficient code. Learn about advanced concepts such as prototypal inheritance, the event loop, and optimizing performance for large-scale applications.",
    tags: ["JavaScript", "Web Development", "Programming"],
  },
  {
    _id: "3",
    title: "Introduction to React Hooks",
    content: "React Hooks are a new addition to React that allow you to use state and other React features without writing a class. This article introduces the concept of hooks, including useState, useEffect, and custom hooks. Understand how hooks help you manage state and side effects in functional components, and explore real-world examples to see how they can be applied to improve your React applications.",
    tags: ["React", "JavaScript", "Web Development"],
  },
];

const BlogDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch blog details from the server
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/blog/${id}`);
        setArticle(response.data);
      } catch (err) {
        // Fallback to dummy data
        const dummyArticle = dummyArticles.find((a) => a._id === id);
        setArticle(dummyArticle);
        setError("Failed to load the article.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error || !article) return <div>Error: {error || "Article not found"}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 flex flex-col">
      <NavBar />

      <main className="flex-grow py-12 px-6 overflow-y-auto">
        <div className="max-w-3xl w-full p-8 bg-white text-gray-900 rounded-lg shadow-lg mt-8">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <p className="text-lg mb-4">{article.content}</p>
          <div className="flex flex-wrap mt-4">
            {article.tags.map((tag, index) => (
              <span key={index} className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetails;
