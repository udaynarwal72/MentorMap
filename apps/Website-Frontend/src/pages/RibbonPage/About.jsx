import { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';

const About = () => {
    return (
        <>
            <NavBar />
            <div className="bg-gradient-to-r from-blue-50 to-blue-200 min-h-screen p-8">
                <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-blue-600 mb-6">About Us</h1>
                    <p className="text-lg text-gray-600 mb-4">
                        Welcome to Mentor Connect, the platform designed to bridge the gap between students and mentors. Our mission is to facilitate meaningful connections and provide valuable guidance to help students achieve their academic and career goals.
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                        At Mentor Connect, we understand that every student has unique needs and aspirations. That's why we’ve created a platform where mentors and students can connect based on their specific interests and goals. Our mentors are experienced professionals and experts in various fields, ready to provide personalized advice and support.
                    </p>
                    <h2 className="text-3xl font-bold text-blue-600 mb-6">Our Vision</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Our vision is to empower students by providing them with access to a network of knowledgeable mentors who can offer guidance, share experiences, and help navigate their educational and professional journeys. We believe that mentorship can play a crucial role in shaping a successful future.
                    </p>
                </div>
            </div>
        </>
    );
};

export default About;
