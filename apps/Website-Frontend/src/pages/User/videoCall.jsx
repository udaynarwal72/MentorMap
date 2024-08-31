import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/NavBar/Footer";

const VideoCall = () => {  // Capitalized the component name
  const [isConfirmed, setIsConfirmed] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = () => {
    setIsConfirmed(true);
    // Redirect to the WebRTC video call page
    navigate('/start-video-call');
  };

  return (
  <>
    <NavBar/>
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 flex flex-col items-center justify-center text-white">
      
      {!isConfirmed ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Do you wish to start a video call?</h1>
          <button
            onClick={handleConfirm}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-full text-lg font-medium transition transform hover:scale-105"
          >
            Yes, Connect
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Connecting...</h1>
          {/* Optionally, add a loader or a transition effect here */}
        </div>
      )}
    </div>
    <Footer/>
  </>
  );
};

export default VideoCall;
