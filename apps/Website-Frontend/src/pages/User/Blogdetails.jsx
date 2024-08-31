import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/NavBar/Footer";
import axios from "axios";


const BlogDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/blog/getblogbyid/${id}`);
        setArticle(response.data.data);
      } catch (err) {
        const dummyArticle = dummyArticles.find((a) => a._id === id);
        if (dummyArticle) {
          setArticle(dummyArticle);
          setError("Failed to load the article from the server. Displaying fallback data.");
        } else {
          setError("Article not found.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 flex flex-col">
      <NavBar />
      <main className="flex-grow py-12 px-6 flex justify-center items-center overflow-y-auto">
        <div className="max-w-3xl w-full p-8 bg-white text-gray-900 rounded-lg shadow-lg mt-8">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <p className="text-lg mb-4">{article.description}</p>
          <div className="flex flex-wrap mt-4">
            {article.tags?.map((tag, index) => (
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
