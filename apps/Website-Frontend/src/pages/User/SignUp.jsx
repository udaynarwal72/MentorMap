import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const UserSignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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
                password
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
