import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/NavBar/Footer";

const MentorList = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/user/bulk");
        if (!response.ok) {
          throw new Error("Failed to fetch mentors");
        }
        const result = await response.json();
        setMentors(result.data.filter((user) => user.user_role === "mentor"));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-100 to-gray-200">
      <NavBar />

      <section className="py-12 px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Meet Our Mentors
        </h1>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {mentors.map((mentor) => (
            <div
              key={mentor._id} // Use _id as the key
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center border border-blue-600"
            >
              <img
                src={mentor.avatar || "https://via.placeholder.com/150"} // Replace with a default avatar URL if mentor.avatar is null
                alt={`${mentor.firstname || 'Mentor'} ${mentor.lastname || ''}`}
                className="rounded-full w-32 h-32 object-cover mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-900">
                {mentor.firstname || 'First Name'} {mentor.lastname || 'Last Name'}
              </h2>
              <p className="text-gray-600">{mentor.username || 'Username'}</p>
              <p className="text-gray-600 text-center mt-4">
                Interests: {Array.isArray(mentor.interest) ? mentor.interest.join(", ") : 'N/A'}
              </p>

              {/* Optional: Display email, phone number, or other fields */}
              <p className="text-gray-600">Email: {mentor.email || 'N/A'}</p>
              <p className="text-gray-600">Phone: {mentor.phone_number || 'N/A'}</p>

              {/* Book Now Button */}
              <button
                onClick={() => window.location.href = mentor.calendly_link || `https://${mentor.usercalendlyurl}`}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MentorList;