import React from "react";
import { FaStar } from "react-icons/fa";
import NavBar from "../../components/NavBar/NavBar";

const MentorList = () => {
  // Sample data for mentors
  const mentors = [
    {
      id: 1,
      name: "ABCDEF",
      title: "Senior Software Engineer",
      bio: "10+ years of experience in full-stack development.",
      photo: "https://via.placeholder.com/150",
      rating: 4.5,
    },
    {
      id: 2,
      name: "QWIQWD",
      title: "Data Scientist",
      bio: "Expert in machine learning and data analytics.",
      photo: "https://via.placeholder.com/150",
      rating: 4.7,
    },
    // Add more mentors here
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-100 to-gray-200">
      {/* Navigation Bar */}
      <NavBar />

      <section className="py-12 px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Meet Our Mentors
        </h1>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center"
            >
              <img
                src={mentor.photo}
                alt={mentor.name}
                className="rounded-full w-32 h-32 object-cover mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-900">
                {mentor.name}
              </h2>
              <p className="text-gray-600">{mentor.title}</p>
              <p className="text-gray-600 text-center mt-4">{mentor.bio}</p>
              
              {/* Rating */}
              <div className="flex items-center mt-4">
                {Array.from({ length: 5 }, (_, index) => (
                  <FaStar
                    key={index}
                    className={`text-xl ${
                      index < Math.floor(mentor.rating)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-600">{mentor.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-800 w-full text-center text-white text-sm mt-auto">
        © 2024 MentorConnect. All rights reserved.
      </footer>
    </div>
  );
};

export default MentorList;
