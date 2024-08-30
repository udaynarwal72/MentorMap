import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { authState, checkAuthSelector } from "../../recoil/Authuser";
import { useEffect, useState } from "react";
import { FaUserCircle, FaSearch } from 'react-icons/fa'; // Importing icons from react-icons

const NavBar = () => {
    const authStatus = useRecoilValueLoadable(checkAuthSelector);
    const [auth, setAuth] = useRecoilState(authState);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (authStatus.state === "hasValue") {
            setAuth(authStatus.contents);
        }
    }, [authStatus.state, authStatus.contents, setAuth]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Handle search logic here
        console.log("Searching for mentors with query:", searchQuery);
    };

    const handleLogout = () => {
        // Clear auth state and navigate to login or home page
        setAuth(null);
        localStorage.removeItem('token'); 
        navigate("/login");
    };

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 shadow-lg backdrop-blur-md w-full">
            <div className="flex justify-between items-center max-w-screen-xl mx-auto px-4">
                {/* Logo or Brand Name */}
                <div className="text-white text-2xl font-bold">
                    MentorConnect
                </div>

                {/* Navigation Links */}
                <ul className="flex items-center space-x-6 md:space-x-8">
                    <li>
                        <Link to="/home" className="text-white font-medium hover:text-blue-300 transition duration-200">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="text-white font-medium hover:text-blue-300 transition duration-200">
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="text-white font-medium hover:text-blue-300 transition duration-200">
                            Contact Us
                        </Link>
                    </li>
                </ul>

                {/* Search Bar */}
                <form onSubmit={handleSearchSubmit} className="relative w-full max-w-xs hidden md:flex">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search for mentors..."
                        className="w-full p-3 pl-12 border border-blue-300 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                </form>

                {/* User Profile or Login */}
                <div className="flex items-center space-x-4 md:space-x-6">
                    {!auth?.user ? (
                        <Link to="/login" className="text-white font-medium hover:text-blue-300 transition duration-200">
                            Login
                        </Link>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Link to={`/user/${auth?.user._id}`} className="flex items-center text-white font-medium hover:text-blue-300 transition duration-200">
                                <FaUserCircle className="text-2xl" />
                                <span className="ml-2">Hello, {auth.user.firstname}</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-white font-medium hover:text-blue-300 transition duration-200"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
