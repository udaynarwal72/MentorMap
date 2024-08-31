import React from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaComments } from "react-icons/fa";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/NavBar/Footer";

const Community = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 flex flex-col items-center text-white relative">
      {/* Navigation Bar */}
      <NavBar />

      {/* Header Section */}
      <header className="flex flex-col items-center justify-center space-y-4 pt-32 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold">Community</h1>
        <p className="text-lg md:text-xl text-blue-200 max-w-2xl">
          Engage with peers, share knowledge, and connect with mentors in our vibrant student community.
        </p>
      </header>

      {/* Community Features */}
      <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-lg px-6">
        <Link
          to="/s2s"
          className="flex flex-col items-center p-6 bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg text-lg font-medium transition transform hover:scale-105"
        >
          <FaComments className="text-5xl mb-3 text-blue-300" />
          Student - Student
          <p className="text-sm text-blue-200 mt-2">
            Join conversations, ask questions, and help others in the forums.
          </p>
        </Link>

        <Link
          to="/s2m"
          className="flex flex-col items-center p-6 bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg text-lg font-medium transition transform hover:scale-105"
        >
          <FaUsers className="text-5xl mb-3 text-blue-300" />
          Student - Mentor
          <p className="text-sm text-blue-200 mt-2">
            Interact with experienced mentors to receive guidance and support.
          </p>
        </Link>
      </section>

      <Footer/>
    </div>
  );
};

export default Community;
