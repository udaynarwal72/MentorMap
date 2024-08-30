import React from "react";
import { Link } from "react-router-dom";
import { FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';
import { HiOutlineInformationCircle, HiOutlineMail } from 'react-icons/hi';
import NavBar from "../../components/NavBar/NavBar";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 flex flex-col items-center text-white relative">
      {/* Navigation Bar */}
      <NavBar/>

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center space-y-4 pt-32 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold">Connect, Learn, Grow</h1>
        <p className="text-lg md:text-xl text-blue-200 max-w-2xl">
          Join MentorSync to find your perfect mentor or guide eager students on their learning journey.
        </p>
      </header>

      {/* Mentor and Student Options */}
      <div className="mt-10 flex space-x-8">
        <Link
          to="/Signup"
          className="flex flex-col items-center p-6 bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg text-lg font-medium transition transform hover:scale-105"
        >
          <FaChalkboardTeacher className="text-5xl mb-3 text-blue-300" />
          Become a Mentor
        </Link>
        <Link
          to="/mentorlist"
          className="flex flex-col items-center p-6 bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg text-lg font-medium transition transform hover:scale-105"
        >
          <FaUserGraduate className="text-5xl mb-3 text-blue-300" />
          Find a Mentor
        </Link>
      </div>

      {/* Why Choose Us Section */}
      <section className="mt-16 max-w-screen-lg px-6 text-center space-y-8">
        <h2 className="text-3xl font-bold text-blue-100">Why Choose MentorConnect?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center bg-blue-600 p-4 rounded-lg shadow-md ">
            <FaChalkboardTeacher className="text-4xl text-blue-300 mb-2" />
            <p className="text-blue-200">Expert Mentors</p>
          </div>
          <div className="flex flex-col items-center bg-blue-600 p-4 rounded-lg shadow-md ">
            <FaUserGraduate className="text-4xl text-blue-300 mb-2" />
            <p className="text-blue-200">Tailored Guidance</p>
          </div>
          <div className="flex flex-col items-center bg-blue-600 p-4 rounded-lg shadow-md ">
            <HiOutlineInformationCircle className="text-4xl text-blue-300 mb-2" />
            <p className="text-blue-200">Build Connections</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 py-6 bg-blue-900 w-full text-center text-blue-300 text-sm">
        © 2024 MentorSync. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
