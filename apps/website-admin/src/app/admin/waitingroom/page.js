"use client";
import Navbar from "@/component/Navbar/Navbar";
import { useEffect, useState } from "react";

export default function Home() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/v1/user/bulk");
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                const data = await response.json();
                setUsers(data.data.filter((user) => user.userIsVerified === false));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const allowUser = (id) => {
        return async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/user/allow/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to allow user");
                }
                setUsers(users.filter((user) => user._id !== id));
            } catch (error) {
                console.error(error);
            }
        }
    }

    const removeUser = (id) => {
        return async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/user/delete/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to delete user");
                }
                setUsers(users.filter((user) => user._id !== id));
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <>
            <Navbar />
            <main className="p-6 bg-gray-50 min-h-screen">

                <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">User Management</h1>
                {users.length > 0 ? (
                    <div className="overflow-x-auto">
                        <div className="inline-block min-w-full shadow-lg rounded-lg overflow-hidden bg-white">
                            <table className="min-w-full leading-normal">
                                <thead className="bg-gradient-to-r from-purple-600 to-blue-500 text-white">
                                    <tr>
                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                            Sr no.
                                        </th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                            Avatar
                                        </th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                            Username
                                        </th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                            First Name
                                        </th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                            Last Name
                                        </th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                            Phone Number
                                        </th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                            Allow
                                        </th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map((user, index) => (
                                        <tr key={user._id} className="hover:bg-gray-100">
                                            <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {index + 1}
                                            </td>
                                            <td className="px-5 py-4 whitespace-nowrap">
                                                <img
                                                    src={user.avatar}  // Adjust according to your API response field for avatar
                                                    alt={`${user.firstname} ${user.lastname}`}
                                                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
                                                />
                                            </td>
                                            <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {user.username}
                                            </td>
                                            <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {user.firstname}
                                            </td>
                                            <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {user.lastname}
                                            </td>
                                            <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {user.phone_number}
                                            </td>
                                            <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {user.email}
                                            </td>
                                            <td className="px-5 py-4 whitespace-nowrap text-sm">
                                                <button
                                                    type="button"
                                                    onClick={allowUser(user._id)}
                                                    className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-semibold rounded-lg text-sm px-4 py-2 transition duration-300 ease-in-out"
                                                >
                                                    Allow
                                                </button>
                                            </td>
                                            <td className="px-5 py-4 whitespace-nowrap text-sm">
                                                <button
                                                    type="button"
                                                    onClick={removeUser(user._id)}
                                                    className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-semibold rounded-lg text-sm px-4 py-2 transition duration-300 ease-in-out"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-600 mt-8 text-lg">No users found.</p>
                )}
            </main>
        </>
    );
}
