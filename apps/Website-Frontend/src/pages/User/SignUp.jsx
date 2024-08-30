import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Tags from "@yaireo/tagify/dist/react.tagify";
import "@yaireo/tagify/dist/tagify.css";

const UserSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userRole, setUserRole] = useState('');
  const [interests, setInterests] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/usersignup', {
        email,
        password,
        username,
        firstName,
        lastName,
        phoneNumber,
        userRole,
        interests
      });
      if (response.data.success) {
        Cookies.set('accessToken', `${response.data.data.accessToken}`, { expires: 7 });
        window.location.href = '/';
      } else {
        setErrorMessage(response.data.data.message);
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="bg-gray-100 flex justify-center items-center min-h-screen">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign Up</h2>
          <p className="text-gray-600 mb-6">Create a new account</p>
          <form className="space-y-4" onSubmit={onHandleSubmit}>
            <div className="flex space-x-4">
              <input
                type="text"
                id="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                name="firstName"
                placeholder="First Name"
                value={firstName}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                id="lastName"
                onChange={(e) => setLastName(e.target.value)}
                name="lastName"
                placeholder="Last Name"
                value={lastName}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              placeholder="Username"
              value={username}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="Email"
              value={email}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              id="phoneNumber"
              onChange={(e) => setPhoneNumber(e.target.value)}
              name="phoneNumber"
              placeholder="Phone Number"
              value={phoneNumber}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              id="userRole"
              onChange={(e) => setUserRole(e.target.value)}
              name="userRole"
              value={userRole}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select User Role</option>
              <option value="mentor">Mentor</option>
              <option value="student">Student</option>
            </select>
            <div className="overflow-y-auto max-h-48">
              <Tags
                tagifyRef={(el) => el && el.DOM.scope.setAttribute('style', 'max-height: 300px; overflow-y: auto;')}
                value={interests}
                onChange={(e) => setInterests(e.detail.tagify.value.map(tag => tag.value))}
                settings={{
                  maxTags: 10,
                  placeholder: 'Select multiple skills',
                  dropdown: {
                    enabled: 1, // show suggestions on focus
                    maxItems: 20, // maximum items to show in the suggestions dropdown
                    classname: 'tagify__dropdown__custom',
                    closeOnSelect: false,
                    highlightFirst: true,
                  },
                }}
              />
            </div>
            <input
              type="file"
              id="image"
              name="image"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex space-x-4">
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                placeholder="Password"
                value={password}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                id="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {errorMessage && (
              <div className="text-red-500 text-sm">
                {errorMessage}
              </div>
            )}
            <button
              type="submit"
              className={`w-full py-2 text-white rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center">
                  <span className="mr-2">Loading...</span>
                  <div className="animate-spin h-5 w-5 border-4 border-t-transparent border-white rounded-full"></div>
                </div>
              ) : 'Sign Up'}
            </button>
          </form>
          <div className="mt-4 text-sm text-center">
            <p className="text-gray-600">Already have an account? <a href="/Login" className="text-blue-500 hover:underline">Log In</a></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSignUp;
