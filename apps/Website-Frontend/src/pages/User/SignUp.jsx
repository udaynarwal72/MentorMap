import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import Cookies from "js-cookie";

const UserSignUp = () => {
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userRole, setUserRole] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [interest, setInterest] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState(null); 
    const [avatarPreview, setAvatarPreview] = useState('');


    const onHandleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/api/v1/user/usersignup', {
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password,
                    firstname,
                    lastname,
                    phone_number: phoneNumber,
                    email,
                    userRole,
                    interest: interest.split(','),
                    avatar: avatar
                }),
            });
            if (response.data.success) {
                Cookies.set('accessToken', `${response.data.data.accessToken}`, { expires: 7 });
                window.location.href = '/';
            } else {
                setErrorMessage(response.data.data.message);
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please try again.");
            console.log('Signup Error' ,error);
        } finally {
            setLoading(false);
        }
    };
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setAvatar(file);
          setAvatarPreview(URL.createObjectURL(file));
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
                    {avatarPreview && <img src={avatarPreview} alt="Avatar Preview"  />}

                       <input
                            type="file"
                            id="avatar"
                            accept="image/*"
                            onChange={(handleAvatarChange)}
                            placeholder="avatar"
                            value={avatar}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            name="username"
                            placeholder="username"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex space-x-4">
                        <input
                            type="text"
                            id="firstname"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            placeholder="firstname"
                            name="firstname"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="text"
                            id="lastname"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            name="lastname"
                            placeholder="lastname"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        </div>
                        <input
                            type="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            placeholder="email"
                            value={email}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            placeholder="password"
                            value={password}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            id="confirmPassword"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            name="confirmPassword"
                            placeholder="confirmpassword"
                            value={confirmPassword}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            id="interest"
                            value={interest}
                            onChange={(e) => setInterest(e.target.value)}
                            name="interest"
                            placeholder="interest"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                       <input
                            type="text"
                            id="phone_number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            name="phone_number"
                            placeholder="phoneNumber"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="text"
                            id="user_role"
                            value={userRole}
                            onChange={(e) => setUserRole(e.target.value)}
                            name="userRole"
                            placeholder="userRole"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
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
