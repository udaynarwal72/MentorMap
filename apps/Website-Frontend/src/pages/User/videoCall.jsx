import React from "react";
import { FaVideoSlash, FaMicrophoneSlash } from "react-icons/fa";
import { HiOutlineChat } from "react-icons/hi";
import { MdScreenShare, MdOutlineDraw } from "react-icons/md"; // Icons for screen share and whiteboard

const VideoCall = () => {
  return (
    <div className="min-h-screen bg-blue-900 flex flex-col text-gray-800">
      {/* Video Call Section */}
      <section className="flex flex-col items-center justify-center flex-grow px-6 mt-16">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <video className="w-full h-72 object-cover bg-gray-200" autoPlay muted>
              {/* Video stream should be inserted here */}
            </video>
            <div className="absolute top-4 right-4 flex space-x-4">
              <button className="p-2 bg-indigo-500 rounded-full hover:bg-indigo-400 transition">
                <MdScreenShare className="text-xl text-white" />
              </button>
              <button className="p-2 bg-teal-500 rounded-full hover:bg-teal-400 transition">
                <MdOutlineDraw className="text-xl text-white" />
              </button>
              <button className="p-2 bg-purple-500 rounded-full hover:bg-purple-400 transition">
                <HiOutlineChat className="text-xl text-white" />
              </button>
            </div>
          </div>

          {/* Call Controls */}
          <div className="flex justify-between mt-4 px-4 py-2 bg-gray-100 rounded-b-lg">
            <button className="flex items-center space-x-2 bg-red-500 p-2 rounded-lg hover:bg-red-400 transition">
              <FaVideoSlash className="text-xl text-white" />
              <span>Turn Off Video</span>
            </button>
            <button className="flex items-center space-x-2 bg-yellow-500 p-2 rounded-lg hover:bg-yellow-400 transition">
              <FaMicrophoneSlash className="text-xl text-white" />
              <span>Mute</span>
            </button>
            <button className="flex items-center space-x-2 bg-red-600 p-2 rounded-lg hover:bg-red-500 transition">
              <span>End Call</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-blue-800 w-full text-center text-white text-sm mt-auto">
        © 2024 MentorConnect. All rights reserved.
      </footer>
    </div>
  );
};

export default VideoCall;
