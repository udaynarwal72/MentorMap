import React, { useState } from 'react';

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

            // Check if reply is available in the response
            const reply = data.reply || 'No reply from server';
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
        <div className="w-full max-w-md mx-auto mt-10 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col">
            <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={`p-2 mb-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white text-right' : 'bg-gray-200 text-gray-800'}`}>
                        {msg.content}
                    </div>
                ))}
            </div>
            <div className="p-2 border-t border-gray-300 flex items-center">
                <input
                    type="text"
                    value={message}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message here..."
                    className="flex-1 p-2 border border-gray-300 rounded-l-lg"
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 text-white px-4 py-2 rounded-r-lg ml-2 hover:bg-blue-600"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
