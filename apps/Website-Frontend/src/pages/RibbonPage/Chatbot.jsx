import React, { useState } from 'react';
import { FaUser, FaRobot } from 'react-icons/fa'; // Import icons for user and bot
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/NavBar/Footer';

const Chatbot = () => {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // State to manage loading

    const handleSendMessage = async () => {
        if (message.trim() === '') return;

        // Add user's message to the chat
        setMessages([...messages, { content: message, sender: 'user' }]);
        setMessage('');
        setIsLoading(true); // Start loading when the user sends a message

        try {
            const response = await fetch('http://localhost:3000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const reply = data.message || 'No reply from server';

            setMessages([...messages, { content: message, sender: 'user' }, { content: reply, sender: 'bot' }]);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages([...messages, { content: message, sender: 'user' }, { content: 'Sorry, something went wrong. Please try again later.', sender: 'bot' }]);
        } finally {
            setIsLoading(false); // Stop loading after the message is received
        }
    };

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 flex flex-col items-center text-white relative py-20">
                <div className="w-full max-w-2xl mx-auto mt-10 bg-blue-50 border border-blue-200 rounded-3xl shadow-2xl flex flex-col h-[85vh] overflow-hidden">
                    {/* Chat Header */}
                    <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-5 rounded-t-3xl text-center font-extrabold text-2xl">
                        MentorSync Chatbot
                    </div>

                    {/* Chat Messages Area */}
                    <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-gradient-to-b from-blue-50 to-blue-100 relative">
                        {/* Placeholder for empty chat */}
                        {messages.length === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-blue-700 bg-blue-300 bg-opacity-90 p-4 rounded-3xl text-center shadow-md">
                                    Ask me your queries and doubts!
                                </p>
                            </div>
                        )}

                        {/* Chat Messages */}
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex items-start transition-transform duration-300 ease-out transform ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} hover:scale-105`}
                            >
                                {msg.sender === 'bot' && <FaRobot className="text-blue-500 mr-3 mt-1" size={24} />}
                                <div
                                    className={`max-w-sm p-4 rounded-3xl shadow-lg ${msg.sender === 'user' ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white' : 'bg-gradient-to-r from-white to-blue-50 text-blue-900 border border-blue-200'}`}
                                >
                                    {msg.content}
                                </div>
                                {msg.sender === 'user' && <FaUser className="text-blue-500 ml-3 mt-1" size={24} />}
                            </div>
                        ))}

                        {/* Loading Dots */}
                        {isLoading && (
                            <div className="flex items-start justify-start transition-transform duration-300 ease-out transform">
                                <FaRobot className="text-blue-500 mr-3 mt-1 animate-bounce" size={24} />
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-75"></div>
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Enhanced Input Area */}
                    <div className="p-4 border-t border-blue-200 flex items-center bg-gradient-to-r from-blue-50 to-blue-100 shadow-inner">
                        <input
                            type="text"
                            value={message}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message here..."
                            className="flex-1 p-3 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-blue-900 placeholder-blue-400 shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-3 rounded-full ml-4 shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out hover:from-blue-700 hover:to-blue-800 hover:-translate-y-1"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Chatbot;
