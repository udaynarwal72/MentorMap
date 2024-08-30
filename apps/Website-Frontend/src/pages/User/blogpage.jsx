import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/NavBar/Footer";
const BlogPage = () => {
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
    {
      id: 2,
      title: "Mastering JavaScript: Tips and Tricks",
      summary: "A comprehensive guide to improving your JavaScript skills.",
      link: "/articles/mastering-javascript-tips-and-tricks",
    },
    {
      id: 2,
      title: "Mastering JavaScript: Tips and Tricks",
      summary: "A comprehensive guide to improving your JavaScript skills.",
      link: "/articles/mastering-javascript-tips-and-tricks",
    },
    {
      id: 2,
      title: "Mastering JavaScript: Tips and Tricks",
      summary: "A comprehensive guide to improving your JavaScript skills.",
      link: "/articles/mastering-javascript-tips-and-tricks",
    },

  ];

    // const BlogPage = () => {
  
    // const [articles, setarticles] = useState([]);
    // const [loading, setLoading] = useState(true); 
    // const [error, setError] = useState(null); 
  
    
    // useEffect(() => {
    //   const fetcharticles = async () => {
    //     try {
    //       const response = await fetch("/blogpage");
    //       if (!response.ok) {
    //         throw new Error("Failed to fetch mentors");
    //       }
    //       const data = await response.json();
    //       setarticles(data);
    //     } catch (err) {
    //       setError(err.message);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
  
    //   fetcharticles();
    // }, []);
  
    // if (loading) return <div>Loading...</div>; 
    // if (error) return <div>Error: {error}</div>;  

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 flex flex-col items-center text-white relative">
    
      {/* Navigation Bar */}
      <NavBar />

      <main className="flex-grow py-12 px-6">
        <h1 className="text-4xl font-bold text-center text-white-800 mb-10">
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

      <Footer />
    </div>
  );
};

export default BlogPage;
