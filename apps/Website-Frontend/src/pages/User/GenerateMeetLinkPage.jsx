import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const GenerateMeetLinkPage = () => {
  const { register, handleSubmit } = useForm();
  const [meetLink, setMeetLink] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/api/generate-meet-link', data);
      setMeetLink(response.data.meetLink);
      setError('');
    } catch (error) {
      console.error('Error generating meet link:', error);
      if (error.response) {
        // Server responded with a status other than 200 range
        setError(`Server responded with status ${error.response.status}: ${error.response.data.error}`);
      } else if (error.request) {
        // Request was made but no response received
        setError('No response received from server');
      } else {
        // Something else went wrong
        setError('An error occurred: ' + error.message);
      }
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-8">Generate Google Meet Link</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-lg">Summary:</label>
          <input
            type="text"
            {...register('summary')}
            className="p-2 rounded text-black"
            required
          />
        </div>
        <div>
          <label className="block text-lg">Description:</label>
          <input
            type="text"
            {...register('description')}
            className="p-2 rounded text-black"
            required
          />
        </div>
        <div>
          <label className="block text-lg">Start Time:</label>
          <input
            type="datetime-local"
            {...register('start')}
            className="p-2 rounded text-black"
            required
          />
        </div>
        <div>
          <label className="block text-lg">End Time:</label>
          <input
            type="datetime-local"
            {...register('end')}
            className="p-2 rounded text-black"
            required
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-full text-lg font-medium transition"
        >
          Generate Link
        </button>
      </form>
      {meetLink && (
        <div className="mt-8">
          <p className="text-xl">Your Google Meet link:</p>
          <a href={meetLink} className="text-blue-300 hover:underline" target="_blank" rel="noopener noreferrer">
            {meetLink}
          </a>
        </div>
      )}
      {error && (
        <div className="mt-8 text-red-300">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default GenerateMeetLinkPage;
