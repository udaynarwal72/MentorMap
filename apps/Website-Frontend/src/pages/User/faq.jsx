import React from "react";
import NavBar from "../../components/NavBar/NavBar"; // Adjust the path based on your file structure
import Footer from "../../components/NavBar/Footer";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col text-gray-800">
      {/* Navigation Bar */}
      <NavBar />

      {/* FAQ Section */}
      <section className="flex-grow px-6 py-16 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 text-center mb-12">
          Frequently Asked Questions
        </h1>

        <div className="space-y-8">
          {/* Question 1 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800">
              What is Mentorsync?
            </h2>
            <p className="mt-2 text-gray-700">
              Mentorsync is a platform designed to sync students with mentors in
              their field of interest, providing guidance, support, and valuable
              insights to help them achieve their goals.
            </p>
          </div>

          {/* Question 2 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800">
              How do I become a mentor?
            </h2>
            <p className="mt-2 text-gray-700">
              To become a mentor, you can sign up on our platform and complete
              your profile. Once your profile is reviewed and approved, you can
              start mentoring students.
            </p>
          </div>

          {/* Question 3 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800">
              Is there a fee for using Mentorsync?
            </h2>
            <p className="mt-2 text-gray-700">
              Mentorsync offers both free and paid mentorship options. Mentors
              set their own rates for paid sessions, and students can choose
              according to their budget.
            </p>
          </div>

          {/* Question 4 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800">
              How do I schedule a meeting with a mentor?
            </h2>
            <p className="mt-2 text-gray-700">
              You can schedule a meeting by visiting the mentor's profile and
              selecting an available time slot that suits you. Our platform will
              automatically manage the scheduling process.
            </p>
          </div>

          {/* New Question 5 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800">
              How is my data kept secure on Mentorsync?
            </h2>
            <p className="mt-2 text-gray-700">
              We prioritize the security and privacy of our users. All data is
              encrypted and we follow strict data protection protocols to ensure
              your information is safe.
            </p>
          </div>

          {/* New Question 6 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800">
              What if I need to cancel or reschedule a session?
            </h2>
            <p className="mt-2 text-gray-700">
              You can cancel or reschedule a session from your dashboard. Please
              note that our refund policy may apply depending on the timing of
              your cancellation.
            </p>
          </div>

          {/* New Question 7 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800">
              What are the benefits of becoming a mentor?
            </h2>
            <p className="mt-2 text-gray-700">
              Becoming a mentor allows you to share your expertise, help shape
              the careers of upcoming professionals, and earn income. It's also
              a great way to give back to the community.
            </p>
          </div>

          {/* New Question 8 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800">
              How do I choose the right mentor for me?
            </h2>
            <p className="mt-2 text-gray-700">
              You can browse mentor profiles, read reviews, and view their areas
              of expertise to find the right mentor that fits your needs and
              goals.
            </p>
          </div>

          {/* New Question 9 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800">
              Can I contact a mentor before booking a session?
            </h2>
            <p className="mt-2 text-gray-700">
              Yes, you can send a message to a mentor to discuss your needs and
              see if they are the right fit for you before booking a session.
            </p>
          </div>

          {/* New Question 10 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800">
              How does the rating system work?
            </h2>
            <p className="mt-2 text-gray-700">
              After each session, mentees can rate their experience with the
              mentor. The ratings are averaged to provide an overall rating for
              each mentor, helping other users make informed choices.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
