import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import NavBar from "../../components/NavBar/NavBar"; 
import Footer from "../../components/NavBar/Footer";
import axios from "axios"; // Import axios for API calls

const StudentCommunityPage = () => {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState("");

    useEffect(() => {
      const initialQuestions = [
          {
              id: 1,
              username: "@ME21sachin",
              content: "Should I watch Code with Harry or Striver for DSA?",
              answers: [
                  { content: "Striver worked for me personally", username: "@EE23akash" },
                  { content: "Go with CodewithHarry.", username: "@CS22sneha" },
              ],
              timestamp: new Date(),
          },
          {
              id: 2,
              username: "@EE23akash",
              content: "Why do you think the NIRF of VIT is drastically falling day by day?",
              answers: [
                  { content: "Maybe due to changes in faculty or administration.", username: "@ME21sachin" },
                  { content: "It's important to address this issue with the college authorities.", username: "@CE22ravi" },
              ],
              timestamp: new Date(),
          },
      ];
  
      setQuestions(initialQuestions);
  }, []);
  

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (newQuestion.trim()) {
        const question = {
            id: questions.length + 1,
            username: "@currentUser", // Replace with actual current user username
            content: newQuestion,
            answers: [],
            timestamp: new Date(),
        };

        try {
            // Make a POST request to your backend API to save the question
            await axios.post("http://localhost:3000/api/v1/questions", question);
            setQuestions([question, ...questions]);
            setNewQuestion("");
        } catch (error) {
            console.error("Error submitting question:", error);
        }
    }
};


    const handleAnswerSubmit = async (questionId, answer, username) => {
        const updatedQuestions = questions.map((q) =>
            q.id === questionId
                ? { ...q, answers: [...q.answers, { content: answer, username }] }
                : q
        );
    
        try {
            // Make a POST request to your backend API to save the answer
            await axios.post(`/api/questions/${questionId}/answers`, { content: answer, username }); // Update the URL based on your API route
            setQuestions(updatedQuestions);
        } catch (error) {
            console.error("Error submitting answer:", error);
        }
    };
    

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* NavBar */}
            <NavBar />

            {/* Title */}
            <div className="text-center py-6 bg-blue-600 text-white">
                <h1 className="text-4xl font-bold">Student Community</h1>
            </div>

            <div className="max-w-4xl mx-auto p-4">
                {/* Question Form */}
                <form onSubmit={handleQuestionSubmit} className="mb-6">
                    <input
                        type="text"
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        placeholder="Ask a Question"
                        className="w-full p-3 border border-blue-300 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="mt-3 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Submit
                    </button>
                </form>

                {/* Question List */}
                <div>
                    {questions.map((question) => (
                        <div
                            key={question.id}
                            className="bg-white shadow-md p-4 mb-4 rounded-lg"
                        >
                            <div className="flex items-center mb-2">
                                <FaUserCircle className="text-3xl text-gray-500" />
                                <div className="ml-4">
                                    <p className="font-bold text-gray-700">
                                        {question.username}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {question.timestamp.toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-700">{question.content}</p>
                            <button
                                className="text-blue-500 mt-2 hover:underline"
                                onClick={() => {
                                    /* Show answer form */
                                }}
                            >
                            </button>

                            {/* Answer Section */}
                            <div className="mt-4">
                                {question.answers.map((answer, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-100 p-3 rounded-lg mb-2"
                                    >
                                        <p><strong>{answer.username}:</strong> {answer.content}</p>
                                    </div>
                                ))}
                                <input
                                    type="text"
                                    placeholder="Your answer"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleAnswerSubmit(
                                                question.id,
                                                e.target.value,
                                                "@currentUser" // Replace with actual current user username
                                            );
                                            e.target.value = "";
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default StudentCommunityPage;
