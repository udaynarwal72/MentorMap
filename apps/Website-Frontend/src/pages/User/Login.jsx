import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
    const [email, setEmail] = useState(''); // Added state for email
    const [password, setPassword] = useState(''); // Added state for password
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/api/v1/user/userlogin', {
                email,
                password
            });
            if (response.data.success) {
                localStorage.setItem('token', response.data.data.accessToken);
                navigate('/');
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
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome</h2>
                    <p className="text-gray-600 mb-6">We are happy to have you</p>
                    <form className="space-y-4" onSubmit={onHandleSubmit}>
                        <input
                            type="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            placeholder="Email"
                            value={email} // Added value prop for controlled component
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            placeholder="Password"
                            value={password} // Added value prop for controlled component
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errorMessage && (
                            <div className="text-red-500 text-sm">
                                {errorMessage}
                            </div>
                        )}
                        <div className="flex justify-between items-center text-sm">
                            <a href="/entermail" className="text-blue-500 hover:underline">Forgot Password?</a>
                        </div>
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
                            ) : 'Login'}
                        </button>
                    </form>
                    <div className="mt-4 text-sm text-center">
                        <p className="text-gray-600">Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserLogin;
