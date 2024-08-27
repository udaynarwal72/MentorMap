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
                    headers: {
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
            {user && <div className="bg-gray-100 min-h-screen flex justify-center items-center">
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-4">User Profile</h2>
                    <div className="space-y-4">
                        <div className="text-lg text-gray-700">
                            <span className="font-bold">First Name: </span>{user.firstname}
                        </div>
                        <div className="text-lg text-gray-700">
                            <span className="font-bold">Last Name: </span>{user.lastname}
                        </div>
                        <div className="text-lg text-gray-700">
                            <span className="font-bold">Email: </span>{user.email}
                        </div>
                        <div className="text-lg text-gray-700">
                            <span className="font-bold">Phone Number: </span>{user.phone_number}
                        </div>
                        <div className="text-lg text-gray-700">
                            <span className="font-bold">Username: </span>{user.username}
                        </div>
                        <div className="text-lg text-gray-700">
                            <span className="font-bold">User Role: </span>{user.user_role}
                        </div>
                        {user.interest && (
                            <div className="text-lg text-gray-700">
                                <span className="font-bold">Interests: </span>
                                <ul className="list-disc list-inside">
                                    {user.interest.map((interest, index) => (
                                        <li key={index}>{interest}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>}
        </>
    );
};

export default UserProfile;
