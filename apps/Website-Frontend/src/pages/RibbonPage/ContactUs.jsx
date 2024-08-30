import { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/NavBar/Footer';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    return (
        <>
            <NavBar />
            <div className="bg-gradient-to-r from-blue-200 to-blue-400 min-h-screen flex flex-col items-center py-8 px-4">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
                    <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Contact Us</h2>
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-blue-700 mb-4">Our Team</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <h4 className="text-lg font-semibold text-blue-600">Uday Narwal</h4>
                                <p className="text-gray-700">Email: uday@example.com</p>
                                <p className="text-gray-700">Phone: (123) 456-7890</p>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <h4 className="text-lg font-semibold text-blue-600">Raghvi Gupta</h4>
                                <p className="text-gray-700">Email: raghvi@example.com</p>
                                <p className="text-gray-700">Phone: (234) 567-8901</p>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <h4 className="text-lg font-semibold text-blue-600">Nishika Aggarwal</h4>
                                <p className="text-gray-700">Email: nishika@example.com</p>
                                <p className="text-gray-700">Phone: (345) 678-9012</p>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <h4 className="text-lg font-semibold text-blue-600">Nancy Goel</h4>
                                <p className="text-gray-700">Email: nancy@example.com</p>
                                <p className="text-gray-700">Phone: (456) 789-0123</p>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <h4 className="text-lg font-semibold text-blue-600">Suryansh Rathore</h4>
                                <p className="text-gray-700">Email: suryansh@example.com</p>
                                <p className="text-gray-700">Phone: (567) 890-1234</p>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <h4 className="text-lg font-semibold text-blue-600">Piyush Raj</h4>
                                <p className="text-gray-700">Email: piyush@example.com</p>
                                <p className="text-gray-700">Phone: (678) 901-2345</p>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-blue-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Your Name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-blue-700">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-blue-700">Message</label>
                            <textarea
                                name="message"
                                id="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="mt-1 w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Your message here"
                                rows="4"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ContactUs;
