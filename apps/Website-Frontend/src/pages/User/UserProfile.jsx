import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/user/findbyid/${userId}`, {
                    withCredentials: true, // Include cookies with the request
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUser(response.data.user);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, [userId]);

    return (
        <>
            <NavBar />
            {user && (
                <div className="bg-gradient-to-r from-blue-100 to-blue-300 min-h-screen flex justify-center items-center py-12">
                <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg border border-blue-200">
                  <div className="flex flex-col items-center">
                    {/* Placeholder Profile Photo */}
                    <img
                      src={user.avatar} // Dummy photo URL
                      alt="User Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 mb-6"
                    />
                    <h2 className="text-3xl font-bold text-blue-900 mb-4">User Profile</h2>
                  </div>
                  <div className="space-y-6">
                    <div className="text-lg text-gray-800">
                      <span className="font-semibold text-blue-600">First Name: </span>{user.firstname}
                    </div>
                    <div className="text-lg text-gray-800">
                      <span className="font-semibold text-blue-600">Last Name: </span>{user.lastname}
                    </div>
                    <div className="text-lg text-gray-800">
                      <span className="font-semibold text-blue-600">Email: </span>{user.email}
                    </div>
                    <div className="text-lg text-gray-800">
                      <span className="font-semibold text-blue-600">Phone Number: </span>{user.phone_number}
                    </div>
                    <div className="text-lg text-gray-800">
                      <span className="font-semibold text-blue-600">Username: </span>{user.username}
                    </div>
                    <div className="text-lg text-gray-800">
                      <span className="font-semibold text-blue-600">User Role: </span>{user.user_role}
                    </div>
                    {user.interest && (
                      <div className="text-lg text-gray-800">
                        <span className="font-semibold text-blue-600">Interests: </span>
                        <ul className="list-disc list-inside pl-5">
                          {user.interest.map((interest, index) => (
                            <li key={index} className="text-blue-700">{interest}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
        </>
    );
};

export default UserProfile;
