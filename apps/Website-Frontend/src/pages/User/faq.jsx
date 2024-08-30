import React from "react";
import NavBar from "../../components/NavBar/NavBar"; // Adjust the path based on your file structure

const FAQ = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col text-gray-800">
      {/* Navigation Bar */}
      <NavBar />

      {/* FAQ Section */}
      <section className="flex-grow px-6 py-16 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 text-center mb-12">Frequently Asked Questions</h1>

        <div className="space-y-8">
          {/* Question 1 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800">What is Mentorsync?</h2>
            <p className="mt-2 text-gray-700">
              Mentorsync is a platform designed to sync students with mentors in their field of interest, 
              providing guidance, support, and valuable insights to help them achieve their goals.
            </p>
          </div>

          {/* Question 2 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800">How do I become a mentor?</h2>
            <p className="mt-2 text-gray-700">
              To become a mentor, you can sign up on our platform and complete your profile. 
              Once your profile is reviewed and approved, you can start mentoring students.
            </p>
          </div>

          {/* Question 3 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800">Is there a fee for using Mentorsync?</h2>
            <p className="mt-2 text-gray-700">
              Mentorsync offers both free and paid mentorship options. 
              Mentors set their own rates for paid sessions, and students can choose according to their budget.
            </p>
          </div>

          {/* Question 4 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800">How do I schedule a meeting with a mentor?</h2>
            <p className="mt-2 text-gray-700">
              You can schedule a meeting by visiting the mentor's profile and selecting an available time slot 
              that suits you. Our platform will automatically manage the scheduling process.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-blue-800 w-full text-center text-white text-sm mt-auto">
        © 2024 Mentorsync. All rights reserved.
      </footer>
    </div>
  );
};

export default FAQ;
