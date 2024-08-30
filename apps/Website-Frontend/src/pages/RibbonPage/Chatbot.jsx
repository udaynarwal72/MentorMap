import React, { useState } from 'react';
import { FaUser, FaRobot } from 'react-icons/fa'; // Import icons for user and bot
import NavBar from '../../components/NavBar/NavBar';

const Chatbot = () => {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSendMessage = async () => {
        if (message.trim() === '') return;

        // Add user's message to the chat
        setMessages([...messages, { content: message, sender: 'user' }]);
        setMessage('');

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
        <NavBar/>
        <div className="w-full max-w-2xl mx-auto mt-10 bg-blue-50 border border-blue-200 rounded-lg shadow-xl flex flex-col h-[85vh]">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-5 rounded-t-lg text-center font-bold text-xl">
            Mentor Connect Chatbot
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-gradient-to-b from-blue-50 to-blue-100 relative">
            {/* Placeholder for empty chat */}
            {messages.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-blue-700 bg-blue-280 bg-opacity-90 p-4 rounded-xl text-center shadow-md">
                        Ask me your queries and doubts!
                    </p>
                </div>
            )}

            {/* Chat Messages */}
            {messages.map((msg, index) => (
                <div key={index} className={`flex items-start ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender === 'bot' && <FaRobot className="text-blue-500 mr-3 mt-1" size={24} />}
                    <div className={`max-w-sm p-4 rounded-3xl shadow-lg ${msg.sender === 'user' ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white' : 'bg-gradient-to-r from-white to-blue-50 text-blue-900 border border-blue-200'}`}>
                        {msg.content}
                    </div>
                    {msg.sender === 'user' && <FaUser className="text-blue-500 ml-3 mt-1" size={24} />}
                </div>
            ))}
        </div>

        {/* Improved Input Area */}
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
    <div>
    {/* Footer */}
    <footer className="mt-16 py-6 bg-blue-900 w-full text-center text-blue-300 text-sm">
        © 2024 MentorConnect. All rights reserved.
      </footer>
    </div>
            </>
    );
};

export default Chatbot;
